# Error Documentation

This document provides comprehensive information about all error cases, HTTP status codes, error messages, causes, and resolutions for the SunHex Quantum Protocol API.

## Error Response Format

All API errors follow a consistent JSON structure:

```json
{
  "status": "error",
  "code": "ERROR_CODE",           // Optional, machine-readable
  "message": "Error description",  // Always present
  "errors": [                      // Optional, for validation errors
    {
      "path": "field.name",
      "message": "Field-specific error"
    }
  ]
}
```

## HTTP Status Codes

| Status Code | Meaning | Used By |
|------------|---------|---------|
| 200 | Success | All endpoints (success responses) |
| 400 | Bad Request | `/api/generate`, `/api/decode` |
| 503 | Service Unavailable | `/api/health` (error case) |

**Note**: The API does not use other HTTP status codes (401, 403, 404, 500, etc.) in the current implementation.

## Error Categories

### 1. Validation Errors (HTTP 400)

Errors that occur when request data fails Zod schema validation.

#### Error Format

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "fieldName",
      "message": "Specific validation error"
    }
  ]
}
```

#### Common Validation Errors

##### First Name Errors

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "First name is required" | Empty or whitespace-only first name | Provide a non-empty first name |
| "First name too long" | First name exceeds 50 characters | Use a shorter first name (max 50 chars) |

**Example**:
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "firstName",
      "message": "First name is required"
    }
  ]
}
```

##### Last Name Errors

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "Last name is required" | Empty or whitespace-only last name | Provide a non-empty last name |
| "Last name too long" | Last name exceeds 50 characters | Use a shorter last name (max 50 chars) |

##### Country Code Errors

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "Invalid country code" | Country code not in COUNTRY_CODES | Use a valid ISO 2-letter country code (check `/api/countries`) |

**Example**:
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "countryCode",
      "message": "Invalid country code"
    }
  ]
}
```

**Valid Codes**: Call `GET /api/countries` to see all 195 supported codes (e.g., "US", "FR", "JP", "DZ").

##### Birth Date Errors

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "Expected number, received..." | Non-numeric birth field | Provide numeric values for year/month/day |
| "Number must be greater than or equal to 1900" | Birth year < 1900 | Use a year from 1900 onwards |
| "Number must be less than or equal to [year]" | Birth year > current year | Use a past or current year |
| "Number must be greater than or equal to 1" | Month < 1 or day < 1 | Use valid month (1-12) and day (1-31) |
| "Number must be less than or equal to 12" | Month > 12 | Use a month between 1 and 12 |
| "Number must be less than or equal to 31" | Day > 31 | Use a day between 1 and 31 |
| "Invalid birth date (e.g., February 31st)" | Date doesn't exist in calendar | Use a real calendar date |

**Invalid Date Examples**:
- February 31st (February only has 28/29 days)
- April 31st (April only has 30 days)
- February 29th on non-leap years

**Example**:
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "birthDay",
      "message": "Invalid birth date (e.g., February 31st)"
    }
  ]
}
```

##### Gender Errors

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "Invalid enum value..." | Gender not "Male", "Female", or "Other" | Use one of the three allowed values |

**Example**:
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "gender",
      "message": "Invalid enum value. Expected 'Male' | 'Female' | 'Other', received 'male'"
    }
  ]
}
```

**Note**: Values are case-sensitive.

##### PIN Errors

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "PIN must be 4-6 digits" | PIN is not 4-6 numeric digits | Use a 4, 5, or 6 digit PIN (e.g., "1234", "123456") |

**Invalid PINs**:
- ❌ "123" (too short)
- ❌ "1234567" (too long)
- ❌ "abcd" (not numeric)
- ❌ "12a4" (contains letters)

**Valid PINs**:
- ✅ "1234"
- ✅ "0000"
- ✅ "123456"

**Example**:
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

##### Hex Code Errors (`/api/decode` only)

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "Hex code is required" | Empty hex code | Provide the hex code from `/api/generate` |
| "Invalid hex format" | Hex code contains non-hexadecimal characters | Use only characters 0-9, A-F, a-f |

**Example**:
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

#### Multiple Validation Errors

When multiple fields fail validation, all errors are returned:

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "firstName",
      "message": "First name is required"
    },
    {
      "path": "pin",
      "message": "PIN must be 4-6 digits"
    },
    {
      "path": "birthDay",
      "message": "Invalid birth date (e.g., February 31st)"
    }
  ]
}
```

### 2. Processing Errors (HTTP 400)

Errors that occur during encryption/decryption processing after validation passes.

#### Generate Errors (`POST /api/generate`)

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "Failed to generate SIN" | Unexpected error during encryption | Check input data; retry request |
| "Critical Error: Invalid country code detected at protocol layer: [code]" | Country code passed validation but not found in protocol layer | This should not occur; contact support |

**Example**:
```json
{
  "status": "error",
  "message": "Failed to generate SIN"
}
```

**Note**: Processing errors during generation are rare and typically indicate:
- Browser/environment Web Crypto API issues
- Unexpected data corruption
- Programming bugs

#### Decode Errors (`POST /api/decode`)

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "Invalid PIN or corrupted SIN code" | Wrong PIN, corrupted hex code, or invalid protocol version | Verify PIN is correct; verify hex code is complete and unmodified |

**Generic Error Message**: For security reasons, the API does not distinguish between:
- Incorrect PIN
- Corrupted data
- Invalid protocol version
- Tampered ciphertext

All decryption failures return the same error message to prevent information leakage.

**Example**:
```json
{
  "status": "error",
  "message": "Invalid PIN or corrupted SIN code"
}
```

**Possible Actual Causes**:

1. **Wrong PIN**: The PIN provided doesn't match the one used during encryption
2. **Corrupted Hex Code**: The hex code was truncated, modified, or contains errors
3. **Wrong Protocol Version**: The hex code was encrypted with a different protocol version (buffer[0] ≠ 2)
4. **AES-GCM Authentication Failure**: The ciphertext or authentication tag was tampered with
5. **Invalid Binary Structure**: The decrypted data cannot be unpacked

**Resolution Steps**:
1. Verify the PIN is exactly as used during encryption
2. Verify the hex code is complete (copy/paste errors)
3. Verify no modifications were made to the hex code
4. If encryption and decryption use different API versions, regenerate the SIN

### 3. Health Check Errors (HTTP 503)

| Error Message | Cause | Resolution |
|--------------|-------|-----------|
| "API health check failed" | Exception during health check | Check server logs; verify API is running |

**Example**:
```json
{
  "status": "error",
  "message": "API health check failed",
  "timestamp": "2026-01-23T17:15:48.123Z"
}
```

**Note**: In the current implementation, this error is unlikely to occur since no actual health checks are performed. It would only happen if the timestamp generation or JSON serialization fails.

### 4. Malformed Request Errors

While not explicitly handled by the API, Next.js will return errors for:

#### Invalid JSON (Next.js Default)

**Cause**: Request body is not valid JSON

**Example**: Sending `{invalid json}` as the body

**Response**: Varies by Next.js version, typically includes "Unexpected token" or similar message

**Resolution**: Ensure request body is valid JSON

#### Missing Content-Type

**Cause**: POST request without `Content-Type: application/json` header

**Impact**: Request may not be parsed correctly

**Resolution**: Always include `Content-Type: application/json` header for POST requests

## Error Handling by Endpoint

### POST /api/generate

| Error Type | Status | Response |
|-----------|--------|----------|
| Validation failure | 400 | `{ status: "error", code: "VALIDATION_ERROR", message, errors }` |
| Processing error | 400 | `{ status: "error", message }` |
| Unknown error | 400 | `{ status: "error", message: error.message }` |

### POST /api/decode

| Error Type | Status | Response |
|-----------|--------|----------|
| Validation failure | 400 | `{ status: "error", code: "VALIDATION_ERROR", message, errors }` |
| Decryption failure | 400 | `{ status: "error", message: "Invalid PIN or corrupted SIN code" }` |
| Unknown error | 400 | `{ status: "error", message: error.message }` |

### GET /api/countries

**No error cases** - This endpoint always returns successfully in the current implementation.

### GET /api/health

| Error Type | Status | Response |
|-----------|--------|----------|
| Exception during check | 503 | `{ status: "error", message: "API health check failed", timestamp }` |

## Debugging Errors

### Validation Errors

1. **Check the `errors` array**: Each error has a `path` and `message`
2. **Fix each field**: Address validation errors one by one
3. **Verify data types**: Ensure numbers are numbers, strings are strings
4. **Check constraints**: Min/max values, regex patterns, enums

### Decryption Errors

1. **Verify PIN exactly**: Check for typos, ensure same PIN as encryption
2. **Check hex code integrity**: Ensure complete, no truncation or modification
3. **Test with fresh generation**: Generate a new SIN and immediately decode it
4. **Check for copy/paste issues**: Ensure no extra whitespace or characters

### Processing Errors

1. **Check browser compatibility**: Ensure Web Crypto API is supported
2. **Verify HTTPS**: Some browsers require secure context for crypto operations
3. **Check console logs**: Look for JavaScript errors
4. **Retry the operation**: Transient errors may resolve

## Common Error Scenarios

### Scenario 1: "Invalid country code"

**Request**:
```json
{
  "countryCode": "XX",
  ...
}
```

**Error**:
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "countryCode",
      "message": "Invalid country code"
    }
  ]
}
```

**Solution**: Get valid codes from `/api/countries`

### Scenario 2: "Invalid birth date"

**Request**:
```json
{
  "birthYear": 2024,
  "birthMonth": 2,
  "birthDay": 31,
  ...
}
```

**Error**:
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "birthDay",
      "message": "Invalid birth date (e.g., February 31st)"
    }
  ]
}
```

**Solution**: February only has 28 or 29 days. Use a valid date.

### Scenario 3: "Invalid PIN or corrupted SIN code"

**Request**:
```json
{
  "hexCode": "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8",
  "pin": "0000"
}
```

**Error** (if PIN was "1234" during encryption):
```json
{
  "status": "error",
  "message": "Invalid PIN or corrupted SIN code"
}
```

**Solution**: Use the correct PIN ("1234" in this case)

## Error Prevention Best Practices

### For API Consumers

1. **Validate client-side**: Check data before sending to API
2. **Handle all error cases**: Check `status` field in responses
3. **Display field-specific errors**: Use `errors` array for form validation
4. **Store PINs securely**: Ensure users can retrieve their PIN
5. **Store hex codes completely**: No truncation or modification
6. **Use strong PINs**: Recommend 6-digit PINs for better security

### For API Developers

1. **Add rate limiting**: Prevent brute-force PIN attacks
2. **Add request logging**: Track errors for debugging
3. **Implement monitoring**: Alert on high error rates
4. **Add more specific errors**: While maintaining security

---

**Note**: All error information is based on the actual implementation in the codebase. Error messages and codes are quoted directly from the source code.
