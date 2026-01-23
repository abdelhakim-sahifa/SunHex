# API Flow Documentation

This document describes the complete request/response flow through the SunHex Quantum Protocol API, from entry point to final response.

## System Architecture Overview

The SunHex API is built on Next.js 13 using the App Router pattern. The architecture consists of three main layers:

```
┌─────────────────────────────────────────┐
│         API Routes (Entry Point)        │
│    src/app/api/*/route.ts               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Service Layer                    │
│    src/services/quantum.ts              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Core Libraries                   │
│    - lib/core/crypto.ts                 │
│    - lib/core/protocol.ts               │
│    - lib/core/constants.ts              │
└─────────────────────────────────────────┘
```

## Request Flow Overview

### Entry Point

All API requests enter through Next.js App Router route handlers located in:
- `src/app/api/generate/route.ts`
- `src/app/api/decode/route.ts`
- `src/app/api/countries/route.ts`
- `src/app/api/health/route.ts`

### Routing Logic

**Framework**: Next.js App Router (file-system based routing)

Routes are defined by the folder structure:
- `/api/generate` → `src/app/api/generate/route.ts`
- `/api/decode` → `src/app/api/decode/route.ts`
- `/api/countries` → `src/app/api/countries/route.ts`
- `/api/health` → `src/app/api/health/route.ts`

**No custom routing logic** - Next.js handles all routing automatically based on file structure.

### Middleware

**Note**: This API does not implement any custom middleware.

The following middleware is provided by Next.js framework defaults:
- Request parsing (body, headers, query params)
- Response compression
- Static file serving
- Development error overlay

**No custom middleware for:**
- CORS handling
- Rate limiting
- Request logging
- Authentication/authorization

## Detailed Flow: Generate Quantum SIN

### Step-by-Step Flow (`POST /api/generate`)

```
1. Request Received
   ↓
2. Next.js Route Handler (src/app/api/generate/route.ts)
   ↓
3. Parse JSON Body (await request.json())
   ↓
4. Zod Schema Validation (QuantumSinSchema.safeParse)
   ├─ FAIL → Return 400 with validation errors
   └─ PASS → Continue
   ↓
5. Service Layer (generateQuantumSin)
   │
   ├─ Protocol Layer: Pack personal info to binary
   │  └─ protocol.pack(info) → Uint8Array
   │
   ├─ Crypto Layer: Generate encryption components
   │  ├─ Generate random salt (8 bytes)
   │  ├─ Derive key from PIN using PBKDF2
   │  │  └─ deriveKey(pin, salt) → CryptoKey
   │  └─ Encrypt packed data with AES-GCM
   │     └─ encrypt(packed, key) → {ciphertext, iv}
   │
   └─ Construct Final Payload
      └─ [VERSION:1][SALT:8][IV:12][CIPHERTEXT+TAG:?]
   ↓
6. Convert to Hex String
   ↓
7. Return Success Response (200)
   └─ { status: "success", hexCode: "..." }
```

### Code Path Trace

1. **Entry**: `src/app/api/generate/route.ts` → `POST()` function
2. **Validation**: `src/lib/schemas/quantum.ts` → `QuantumSinSchema`
3. **Service**: `src/services/quantum.ts` → `generateQuantumSin()`
4. **Protocol**: `src/lib/core/protocol.ts` → `pack()`
5. **Crypto**: `src/lib/core/crypto.ts` → `deriveKey()`, `encrypt()`
6. **Response**: Return formatted JSON

### Data Transformations

```
PersonalInfo (JSON)
  ↓ [Validation]
PersonalInfo (Validated)
  ↓ [pack()]
Uint8Array (Binary)
  ↓ [deriveKey() + encrypt()]
Encrypted Uint8Array
  ↓ [Construct Payload]
[VERSION|SALT|IV|CIPHERTEXT]
  ↓ [uint8ArrayToHex()]
Hex String
  ↓ [Response]
JSON { status, hexCode }
```

## Detailed Flow: Decode Quantum SIN

### Step-by-Step Flow (`POST /api/decode`)

```
1. Request Received
   ↓
2. Next.js Route Handler (src/app/api/decode/route.ts)
   ↓
3. Parse JSON Body (await request.json())
   ↓
4. Zod Schema Validation (DecodeSchema.safeParse)
   ├─ FAIL → Return 400 with validation errors
   └─ PASS → Continue
   ↓
5. Service Layer (decodeQuantumSin)
   │
   ├─ Convert Hex to Binary
   │  └─ hexToUint8Array(hexCode) → Uint8Array
   │
   ├─ Validate Protocol Version
   │  └─ Check buffer[0] === 2
   │     ├─ FAIL → Throw error
   │     └─ PASS → Continue
   │
   ├─ Extract Components
   │  ├─ salt = bytes[1:9]
   │  ├─ iv = bytes[9:21]
   │  └─ ciphertext = bytes[21:]
   │
   ├─ Crypto Layer: Decrypt
   │  ├─ Derive key from PIN
   │  │  └─ deriveKey(pin, salt) → CryptoKey
   │  └─ Decrypt ciphertext
   │     └─ decrypt(ciphertext, key, iv) → Uint8Array
   │
   └─ Protocol Layer: Unpack binary to PersonalInfo
      └─ protocol.unpack(decrypted) → PersonalInfo
   ↓
6. Return Success Response (200)
   └─ { status: "success", personalInfo: {...} }
```

### Code Path Trace

1. **Entry**: `src/app/api/decode/route.ts` → `POST()` function
2. **Validation**: `src/lib/schemas/quantum.ts` → `DecodeSchema`
3. **Service**: `src/services/quantum.ts` → `decodeQuantumSin()`
4. **Crypto**: `src/lib/core/crypto.ts` → `hexToUint8Array()`, `deriveKey()`, `decrypt()`
5. **Protocol**: `src/lib/core/protocol.ts` → `unpack()`
6. **Response**: Return formatted JSON

### Data Transformations

```
{ hexCode, pin } (JSON)
  ↓ [Validation]
{ hexCode, pin } (Validated)
  ↓ [hexToUint8Array()]
Uint8Array (Full Buffer)
  ↓ [Extract Components]
{ version, salt, iv, ciphertext }
  ↓ [deriveKey() + decrypt()]
Uint8Array (Decrypted Binary)
  ↓ [unpack()]
PersonalInfo Object
  ↓ [Response]
JSON { status, personalInfo }
```

## Detailed Flow: List Countries

### Step-by-Step Flow (`GET /api/countries`)

```
1. Request Received
   ↓
2. Next.js Route Handler (src/app/api/countries/route.ts)
   ↓
3. Access COUNTRY_CODES constant
   ↓
4. Extract and sort country codes
   └─ Object.keys(COUNTRY_CODES).sort()
   ↓
5. Return Success Response (200)
   └─ { status: "success", countries: [...] }
```

**No validation, processing, or database access** - simple constant retrieval.

### Code Path Trace

1. **Entry**: `src/app/api/countries/route.ts` → `GET()` function
2. **Constants**: `src/lib/core/constants.ts` → `COUNTRY_CODES`
3. **Response**: Return formatted JSON

## Detailed Flow: Health Check

### Step-by-Step Flow (`GET /api/health`)

```
1. Request Received
   ↓
2. Next.js Route Handler (src/app/api/health/route.ts)
   ↓
3. Generate timestamp
   └─ new Date().toISOString()
   ↓
4. Return Success Response (200)
   └─ { status: "success", message: "API is healthy", timestamp }
```

**No actual health checks performed** - simple status endpoint.

### Code Path Trace

1. **Entry**: `src/app/api/health/route.ts` → `GET()` function
2. **Response**: Return formatted JSON

**Note**: The code includes a comment suggesting database or external service checks could be added, but none are currently implemented.

## Error Handling Flow

### Validation Errors

```
Request
  ↓
Schema.safeParse()
  ↓ [validation.success = false]
Extract errors from validation.error.issues
  ↓
Map to { path, message } format
  ↓
Return 400 Response
  └─ { status: "error", code: "VALIDATION_ERROR", message, errors: [...] }
```

### Processing Errors

```
try {
  // Service layer processing
} catch (error) {
  ↓
  Extract error message
  ↓
  Return 400 Response
    └─ { status: "error", message: error.message }
}
```

### Service Layer Errors

Service functions return error responses rather than throwing:

```javascript
return {
  status: "error",
  message: "Invalid PIN or corrupted SIN code"
};
```

These are passed through and returned with appropriate HTTP status codes.

## Database Access

**Not Applicable** - This is a stateless API with no database connections.

All data is:
- Provided in requests
- Processed in memory
- Returned in responses
- Not persisted anywhere

## Response Formatting

All responses follow a consistent format:

### Success Response
```json
{
  "status": "success",
  "hexCode": "...",        // For generate
  "personalInfo": {...},   // For decode
  "countries": [...],      // For countries
  "message": "...",        // For health
  "timestamp": "..."       // For health
}
```

### Error Response
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",  // Optional
  "message": "Error description",
  "errors": [                   // Optional, for validation errors
    {
      "path": "field.name",
      "message": "Field error"
    }
  ]
}
```

## Performance Considerations

### Cryptographic Operations

The most computationally intensive operations are:
1. **PBKDF2 Key Derivation**: 100,000 iterations (intentionally slow for security)
2. **AES-GCM Encryption/Decryption**: Fast, hardware-accelerated on most systems

Both operations are asynchronous and non-blocking.

### Request Processing Time

Typical processing times (estimated):
- `/api/generate`: 100-200ms (dominated by PBKDF2)
- `/api/decode`: 100-200ms (dominated by PBKDF2)
- `/api/countries`: <1ms (constant access)
- `/api/health`: <1ms (timestamp generation)

## Concurrency Model

- **Framework**: Next.js handles request concurrency
- **No shared state**: Each request is independent
- **Stateless**: No session management or request correlation
- **Thread-safe**: No global mutable state

---

**Note**: All flow descriptions are based on the actual implementation in the codebase. No assumptions or speculative features are included.
