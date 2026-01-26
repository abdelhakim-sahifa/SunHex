# SunHex Engineering: Stateless SK_KEY System

> **Status**: PROPOSAL  
> **Type**: Security Architecture  
> **Objective**: Offline Verification & Zero-Latency Auth

## 1. The Core Problem
Traditional API keys are random strings stored in a database. To verify them, the API must:
1.  Receive the key.
2.  Query the database (`SELECT * FROM api_keys WHERE key = ?`).
3.  Check if it's active.

**Flaws**:
*   **Latency**: Every request hits the DB.
*   **Availability**: If the DB is down, auth fails.
*   **Offline Impossible**: Cannot verify keys in air-gapped or edge environments.

## 2. The Solution: Cryptographically Signed Keys
We will turn the `SK_KEY` into a **self-validating token**. The key itself will carry all necessary information (Issuer, Environment, Permissions) and a cryptographic signature to prove it hasn't been tampered with.

This allows the API (or an SDK) to verify the key's legitimacy using only a **Master Secret**, without ever touching a database.

## 3. Key Anatomy
The key is a string composed of three parts joined by `_` or `.`.

**Format**: `sk_<env>_<payload>_<signature>`

| Part | Description | Example |
| :--- | :--- | :--- |
| **Prefix** | Identifies the key type and environment. | `sk_live` or `sk_test` |
| **Payload** | Base64-encoded metadata (ID, Scope, Expiry). | `eyJpZCI6...` |
| **Signature** | HMAC-SHA256 checksum of the payload. | `a9f8b7...` |

**Full Example**:
```
sk_live_dT8r3jK9sLq2_8f7e6d5c4b3a21...
```

### 3.1 The Payload (Decoded)
The middle part is a compact JSON object (minified & base64url encoded):
```json
{
  "oid": "org_123",       // Organization ID
  "s": ["read", "write"], // Scopes
  "v": 1                  // Key Version (for rotation)
}
```

## 4. Engineering Implementation

### 4.1 Generation (Issuer Side)
1.  **Secret**: Load `SUNHEX_MASTER_KEY` (32+ bytes, high entropy).
2.  **Payload**: Construct the JSON object with the user's data.
3.  **Encode**: `payload_str = base64url(json_stringify(data))`
4.  **Sign**: `sig = hmac_sha256(payload_str, SUNHEX_MASTER_KEY)`
5.  **Format**: `sig_str = base64url(sig)` (optionally truncated to ~16-32 chars for brevity if collision risk is acceptable, but full length is safer).
6.  **Combine**: `key = sk_live_${payload_str}_${sig_str}`

### 4.2 Verification (Offline / Edge)
To verify a key `sk_live_ABC_123`:
1.  **Parse**: Split by `_` -> `['sk', 'live', 'ABC', '123']`.
2.  **Environment Check**: Ensure `env` matches (e.g., don't accept `test` keys in `live`).
3.  **Sign Check**:
    *   Take `ABC` (the payload).
    *   Compute `expected_sig = hmac_sha256('ABC', SUNHEX_MASTER_KEY)`.
    *   Comparing `123` (provided sig) with `expected_sig` using a **constant-time comparison** function (to prevent timing attacks).
4.  **Result**:
    *   **Match**: Key is authentic. Decode `ABC` to get `org_id` and permissions. **Access Granted.**
    *   **Mismatch**: Key is a forgery. **Access Denied.**

**Zero DB calls required.**

## 5. Security & Rotation

### Key Rotation
Since we don't check a DB, we can't "revoke" a key instantly by deleting a row.
*   **Method 1 (Expiration)**: Include an `exp` (timestamp) in the payload. Reject if `now > exp`.
*   **Method 2 (Version)**: Include `v: 1` in payload. If keys are compromised, rotate the Master Secret or increment the required version in the API config. Old keys (signed with old secret or having old version) will fail verification.
*   **Method 3 (Hybrid)**: Use offline check for speed, but cache "revoked IDs" in memory (Bloom filter) for recently banned users.

### Efficiency
*   **Time Complexity**: O(1) - just hashing ~50 bytes of string.
*   **Space Complexity**: O(1) - no storage needed.
*   **Speed**: < 0.1ms per verification on standard CPU.

## 6. Code Example (TypeScript)

```typescript
import { createHmac, timingSafeEqual } from 'crypto';

const MASTER_SECRET = process.env.SUNHEX_MASTER_KEY || 'sup3r_s3cr3t_k3y_d0_n0t_sh4r3';

export function verifySkKey(key: string): boolean {
  try {
    const parts = key.split('_');
    if (parts.length !== 4) return false; // sk, env, payload, sig

    const [prefix, environment, payload, providedSig] = parts;
    
    if (prefix !== 'sk') return false;
    // Check environment if needed (e.g. process.env.NODE_ENV === environment)

    // Reconstruct the signature
    const hmac = createHmac('sha256', MASTER_SECRET);
    hmac.update(payload);
    const expectedSig = hmac.digest('hex'); // or base64url

    // Constant-time comparison
    const sigBuffer = Buffer.from(providedSig);
    const expectedBuffer = Buffer.from(expectedSig);
    
    if (sigBuffer.length !== expectedBuffer.length) return false;
    return timingSafeEqual(sigBuffer, expectedBuffer);
  } catch (e) {
    return false;
  }
}
```

This system ensures that **if it is wrong, it won't work**, and it does so instantaneously without network overhead.
