# API Endpoints Documentation

This document provides detailed documentation for all API endpoints in the SunHex Quantum Protocol API.

## Endpoints Overview

| Endpoint | Method | Purpose | Authentication |
|----------|--------|---------|----------------|
| `/api/generate` | POST | Generate encrypted quantum SIN | None |
| `/api/decode` | POST | Decode encrypted quantum SIN | None |
| `/api/countries` | GET | List supported countries | None |
| `/api/health` | GET | Health check | None |

---

## POST /api/generate

Generate an encrypted Quantum SIN (Secure Identification Number) from personal information.

### URL
```
POST /api/generate
```

### Purpose
Encrypts personal information (name, birth date, country, gender) using a user-provided PIN into a compact hexadecimal string that can be safely stored or transmitted.

### Request Parameters
None (all data in request body)

### Request Headers
```
Content-Type: application/json
```

### Request Body Schema

```json
{
  "firstName": "string",
  "lastName": "string",
  "countryCode": "string",
  "birthYear": number,
  "birthMonth": number,
  "birthDay": number,
  "gender": "Male" | "Female" | "Other",
  "pin": "string"
}
```

### Field Validation Rules

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `firstName` | string | Required, 1-50 chars, trimmed | Person's first name |
| `lastName` | string | Required, 1-50 chars, trimmed | Person's last name |
| `countryCode` | string | Required, valid ISO 2-letter code, uppercase | Country code (e.g., "US", "FR") |
| `birthYear` | number | Integer, 1900 to current year | Year of birth |
| `birthMonth` | number | Integer, 1-12 | Month of birth |
| `birthDay` | number | Integer, 1-31, valid date | Day of birth |
| `gender` | string | Enum: "Male", "Female", "Other" | Gender identity |
| `pin` | string | 4-6 digits (regex: `^\d{4,6}$`) | Encryption PIN |

**Additional Validation:**
- The combination of `birthYear`, `birthMonth`, and `birthDay` must form a valid calendar date
- Invalid dates like February 31st will be rejected

### Response Schema

#### Success Response (HTTP 200)
```json
{
  "status": "success",
  "hexCode": "020A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6..."
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Always "success" |
| `hexCode` | string | Encrypted data as uppercase hexadecimal string |

#### Error Response (HTTP 400)

**Validation Error:**
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "pin",
      "message": "PIN must be 4-6 digits"
    }
  ]
}
```

**Processing Error:**
```json
{
  "status": "error",
  "message": "Failed to generate SIN"
}
```

### Status Codes

| Code | Meaning | Cause |
|------|---------|-------|
| 200 | Success | SIN generated successfully |
| 400 | Bad Request | Validation failed or processing error |

### Middleware Used
- Next.js default middleware (request parsing, compression)
- No custom middleware

### Example Request

```bash
curl -X POST https://sunhex.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "countryCode": "US",
    "birthYear": 1990,
    "birthMonth": 5,
    "birthDay": 15,
    "gender": "Male",
    "pin": "1234"
  }'
```

### Example Response

```json
{
  "status": "success",
  "hexCode": "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8"
}
```

### Implementation Details

**File**: `src/app/api/generate/route.ts`

**Process**:
1. Parse JSON body
2. Validate with Zod schema (`QuantumSinSchema`)
3. Call `generateQuantumSin()` from service layer
4. Return success or error response

**Cryptographic Operations**:
- PBKDF2 key derivation (100,000 iterations)
- AES-GCM encryption
- Random salt (8 bytes) and IV (12 bytes)

---

## POST /api/decode

Decode an encrypted Quantum SIN back to the original personal information using the correct PIN.

### URL
```
POST /api/decode
```

### Purpose
Decrypts a Quantum SIN hex code using the user-provided PIN to retrieve the original personal information.

### Request Parameters
None (all data in request body)

### Request Headers
```
Content-Type: application/json
```

### Request Body Schema

```json
{
  "hexCode": "string",
  "pin": "string"
}
```

### Field Validation Rules

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `hexCode` | string | Required, valid hex format (regex: `^[0-9a-fA-F]+$`) | Encrypted SIN from generate endpoint |
| `pin` | string | 4-6 digits (regex: `^\d{4,6}$`) | Decryption PIN (must match encryption PIN) |

### Response Schema

#### Success Response (HTTP 200)
```json
{
  "status": "success",
  "personalInfo": {
    "firstName": "string",
    "lastName": "string",
    "countryCode": "string",
    "birthYear": number,
    "birthMonth": number,
    "birthDay": number,
    "gender": "Male" | "Female" | "Other"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Always "success" |
| `personalInfo` | object | Decrypted personal information |

#### Error Response (HTTP 400)

**Validation Error:**
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "hexCode",
      "message": "Invalid hex format"
    }
  ]
}
```

**Decryption Error:**
```json
{
  "status": "error",
  "message": "Invalid PIN or corrupted SIN code"
}
```

**Note**: For security reasons, the API does not distinguish between an incorrect PIN, corrupted data, or invalid protocol version. All decryption failures return the same generic error message.

### Status Codes

| Code | Meaning | Cause |
|------|---------|-------|
| 200 | Success | SIN decoded successfully |
| 400 | Bad Request | Validation failed, wrong PIN, or corrupted data |

### Middleware Used
- Next.js default middleware (request parsing, compression)
- No custom middleware

### Example Request

```bash
curl -X POST https://sunhex.vercel.app/api/decode \
  -H "Content-Type: application/json" \
  -d '{
    "hexCode": "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8",
    "pin": "1234"
  }'
```

### Example Response

```json
{
  "status": "success",
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "countryCode": "US",
    "birthYear": 1990,
    "birthMonth": 5,
    "birthDay": 15,
    "gender": "Male"
  }
}
```

### Implementation Details

**File**: `src/app/api/decode/route.ts`

**Process**:
1. Parse JSON body
2. Validate with Zod schema (`DecodeSchema`)
3. Call `decodeQuantumSin()` from service layer
4. Return success or error response

**Cryptographic Operations**:
- Hex to binary conversion
- PBKDF2 key derivation (same parameters as encryption)
- AES-GCM decryption
- Protocol version validation

---

## GET /api/countries

Retrieve a list of all supported country codes.

### URL
```
GET /api/countries
```

### Purpose
Returns an alphabetically sorted list of ISO 2-letter country codes supported by the API.

### Request Parameters
None

### Request Headers
None required

### Request Body
None (GET request)

### Response Schema

#### Success Response (HTTP 200)
```json
{
  "status": "success",
  "countries": ["AD", "AE", "AF", "AG", "AL", "AM", "..."]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Always "success" |
| `countries` | string[] | Alphabetically sorted array of country codes |

**Total Countries**: 195 country codes are supported.

### Status Codes

| Code | Meaning | Cause |
|------|---------|-------|
| 200 | Success | Countries list retrieved |

### Middleware Used
- Next.js default middleware
- No custom middleware

### Example Request

```bash
curl https://sunhex.vercel.app/api/countries
```

### Example Response

```json
{
  "status": "success",
  "countries": [
    "AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU",
    "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ",
    "..."
  ]
}
```

### Implementation Details

**File**: `src/app/api/countries/route.ts`

**Process**:
1. Access `COUNTRY_CODES` constant from `lib/core/constants.ts`
2. Extract keys and sort alphabetically
3. Return success response

**Note**: This is a simple constant retrieval with no validation or processing required.

---

## GET /api/health

Health check endpoint to verify API availability.

### URL
```
GET /api/health
```

### Purpose
Provides a simple health check to verify that the API is running and responsive.

### Request Parameters
None

### Request Headers
None required

### Request Body
None (GET request)

### Response Schema

#### Success Response (HTTP 200)
```json
{
  "status": "success",
  "message": "API is healthy",
  "timestamp": "2026-01-23T17:15:48.123Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Always "success" |
| `message` | string | Health status message |
| `timestamp` | string | ISO 8601 timestamp |

#### Error Response (HTTP 503)

```json
{
  "status": "error",
  "message": "API health check failed",
  "timestamp": "2026-01-23T17:15:48.123Z"
}
```

**Note**: In the current implementation, the error response is only returned if an exception occurs. No actual health checks (database, external services, etc.) are performed.

### Status Codes

| Code | Meaning | Cause |
|------|---------|-------|
| 200 | Success | API is healthy |
| 503 | Service Unavailable | Exception during health check |

### Middleware Used
- Next.js default middleware
- No custom middleware

### Example Request

```bash
curl https://sunhex.vercel.app/api/health
```

### Example Response

```json
{
  "status": "success",
  "message": "API is healthy",
  "timestamp": "2026-01-23T17:15:48.123Z"
}
```

### Implementation Details

**File**: `src/app/api/health/route.ts`

**Process**:
1. Generate current timestamp
2. Return success response

**Notes**:
- The code includes a comment suggesting additional checks could be added (database, external services, etc.), but none are currently implemented
- This is a basic availability check only

---

## Common Response Patterns

### Success Response Structure
All successful responses include:
- `status: "success"`
- Endpoint-specific data fields

### Error Response Structure
All error responses include:
- `status: "error"`
- `message`: Human-readable error description
- Optional `code`: Machine-readable error code
- Optional `errors`: Array of field-specific validation errors

### Content Type
All responses use `application/json` content type.

### CORS
**Not determinable from code** - CORS headers are not explicitly configured. Default Next.js behavior applies.

---

**Note**: All endpoint documentation reflects the exact implementation in the codebase. No assumed or speculative features are included.
