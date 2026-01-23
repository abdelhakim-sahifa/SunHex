# Authentication and Authorization Documentation

This document describes the authentication and authorization mechanisms (or lack thereof) in the SunHex Quantum Protocol API.

## Current Authentication State

**The SunHex API does not implement any authentication or authorization mechanisms.**

All API endpoints are **publicly accessible** without requiring:
- API keys
- Bearer tokens
- Session cookies
- OAuth tokens
- Basic authentication
- Any other form of credentials

## Endpoint Access Control

| Endpoint | Authentication Required | Authorization Required |
|----------|------------------------|------------------------|
| POST `/api/generate` | ❌ No | ❌ No |
| POST `/api/decode` | ❌ No | ❌ No |
| GET `/api/countries` | ❌ No | ❌ No |
| GET `/api/health` | ❌ No | ❌ No |

**All endpoints are public and unrestricted.**

## Security Model

Instead of traditional authentication/authorization, the SunHex API relies on a **PIN-based encryption security model**:

### PIN-Based Security

The security of the system is based on:

1. **User-Provided PINs**: Users must provide a 4-6 digit PIN when encrypting data
2. **Cryptographic Protection**: Data is encrypted using the PIN-derived key
3. **Zero-Knowledge Architecture**: The API never stores or has access to:
   - User PINs
   - Personal information
   - Encrypted data
   - Decryption keys

### How PIN Security Works

#### Encryption (Generate)
```
User PIN (4-6 digits)
  ↓
PBKDF2 Key Derivation (100,000 iterations + random salt)
  ↓
AES-GCM Encryption Key
  ↓
Encrypted Data (only decryptable with correct PIN)
```

#### Decryption (Decode)
```
User provides: Encrypted Data + PIN
  ↓
Extract salt from encrypted data
  ↓
PBKDF2 Key Derivation (same 100,000 iterations + extracted salt)
  ↓
Attempt AES-GCM Decryption
  ├─ Correct PIN → Successful decryption
  └─ Wrong PIN → Decryption fails (error returned)
```

### PIN Validation Rules

PINs are validated using Zod schema:

```typescript
pin: z.coerce.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits")
```

**Requirements**:
- Must be numeric digits only (0-9)
- Must be 4, 5, or 6 digits in length
- Leading zeros are allowed

**Examples**:
- ✅ Valid: `"1234"`, `"0000"`, `"123456"`
- ❌ Invalid: `"123"`, `"12345678"`, `"abcd"`, `"12a4"`

## Cryptographic Security Details

### Key Derivation

**Algorithm**: PBKDF2 (Password-Based Key Derivation Function 2)

**Parameters**:
- **Iterations**: 100,000 (defined in `lib/core/crypto.ts`)
- **Hash Function**: SHA-256
- **Salt**: 8 bytes of cryptographically secure random data
- **Output**: 256-bit (32-byte) AES key

**Implementation**: Web Crypto API (`crypto.subtle.deriveBits()`)

**Location**: `src/lib/core/crypto.ts` → `deriveKey()`

### Encryption

**Algorithm**: AES-GCM (Advanced Encryption Standard - Galois/Counter Mode)

**Parameters**:
- **Key Size**: 256 bits
- **IV (Initialization Vector)**: 12 bytes of cryptographically secure random data
- **Authentication**: Built-in authentication tag (GCM provides authenticated encryption)

**Properties**:
- Confidentiality: Data cannot be read without the key
- Integrity: Data tampering is detected
- Authenticity: Data origin is verified

**Location**: `src/lib/core/crypto.ts` → `encrypt()` and `decrypt()`

## Security Considerations

### Strengths

✅ **No Central Secret Storage**: The API never stores PINs or personal data
✅ **Strong Encryption**: AES-GCM with 256-bit keys
✅ **Key Derivation**: PBKDF2 with 100,000 iterations makes brute-force attacks expensive
✅ **Unique Salts**: Each encryption uses a new random salt (prevents rainbow table attacks)
✅ **Unique IVs**: Each encryption uses a new random IV (prevents pattern analysis)
✅ **Authenticated Encryption**: GCM mode provides both confidentiality and authentication

### Limitations

⚠️ **No Access Control**: Anyone can call any endpoint
⚠️ **No Rate Limiting**: No protection against brute-force attempts (not implemented in code)
⚠️ **PIN Strength**: 4-6 digit PINs have limited entropy (10,000 to 1,000,000 possibilities)
⚠️ **No Account System**: No user accounts, sessions, or identity management
⚠️ **No Audit Trail**: No logging of who encrypts or decrypts data

### Potential Vulnerabilities

🔴 **Brute-Force Attacks**: Without rate limiting, an attacker with an encrypted SIN could attempt all PIN combinations
- 4-digit PIN: 10,000 attempts
- 5-digit PIN: 100,000 attempts
- 6-digit PIN: 1,000,000 attempts

However, PBKDF2 with 100,000 iterations makes each attempt expensive (~100-200ms), providing some protection.

🔴 **No Usage Tracking**: No way to detect or prevent abuse of the API

## Authentication Infrastructure

**Not determinable from code**: The following authentication/authorization features are NOT present in the codebase:

- User registration/login system
- API key management
- Token generation/validation
- Session management
- Role-based access control (RBAC)
- Permission systems
- OAuth/OIDC integration
- JWT token handling
- Middleware for authentication checks

## Request Authentication Flow

**There is no request authentication flow.** All requests are processed without credential verification.

```
Request → Parse → Validate (data only) → Process → Respond
```

No authentication middleware intercepts requests at any point.

## Protected Endpoints

**None.** All endpoints are unprotected and publicly accessible.

## Token Mechanism

**Not applicable.** No token-based authentication is implemented.

## Session Management

**Not applicable.** The API is stateless with no session management.

## Role-Based Access Control

**Not implemented.** There are no user roles or permissions.

## API Security Best Practices

If you are deploying this API, consider implementing:

1. **Rate Limiting**: Prevent brute-force attacks on encrypted SINs
2. **API Keys**: Require authentication to use the API
3. **Request Logging**: Track API usage and detect abuse
4. **IP Whitelisting**: Restrict access to trusted sources
5. **CORS Configuration**: Control which domains can call the API
6. **HTTPS Only**: Enforce encrypted transport (not determinable from code if this is configured)

**Note**: None of the above are implemented in the current codebase.

## Middleware

**No custom authentication middleware is present.**

The codebase does not contain:
- `src/middleware.ts` (Next.js middleware file)
- Any custom authentication logic in route handlers
- Any auth-related npm packages (e.g., NextAuth, Passport, etc.)

Only Next.js default middleware is active (request parsing, compression, etc.).

## Conclusion

The SunHex API uses a **zero-knowledge, PIN-based security model** where:
- No authentication is required to access endpoints
- Security relies entirely on cryptographic protection of data
- Users are responsible for choosing strong PINs
- The API never has access to unencrypted personal information

This model is suitable for:
- ✅ Self-service encryption/decryption tools
- ✅ Privacy-focused applications where the server should never see plaintext data
- ✅ Situations where users manage their own security (PINs)

This model may NOT be suitable for:
- ❌ Enterprise applications requiring access control
- ❌ Multi-user systems with different permission levels
- ❌ Applications requiring audit trails
- ❌ Situations where brute-force protection is critical

---

**Note**: All information in this document is based solely on the current codebase implementation. Features marked as "Not determinable from code" or "Not implemented" are not present in the source code.
