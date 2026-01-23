# Data Model Documentation

This document describes all data structures, schemas, validation rules, and data formats used in the SunHex Quantum Protocol API.

## Overview

The SunHex API is **stateless** with **no database persistence**. All data models represent:
- Request/response payloads (TypeScript interfaces)
- Validation schemas (Zod schemas)
- Binary protocol structures
- In-memory data transformations

## Database Models

**Not applicable** - This API does not use a database. No data is persisted.

## TypeScript Interfaces

### PersonalInfo

Core data structure representing a person's identification information.

**Location**: `src/lib/core/protocol.ts` and `src/types/index.ts`

```typescript
interface PersonalInfo {
  firstName: string;
  lastName: string;
  countryCode: string;      // ISO 2-letter code
  birthYear: number;
  birthMonth: number;        // 1-12
  birthDay: number;          // 1-31
  gender: "Male" | "Female" | "Other";
}
```

**Field Descriptions**:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `firstName` | string | Person's first name | `"John"` |
| `lastName` | string | Person's last name | `"Doe"` |
| `countryCode` | string | ISO 3166-1 alpha-2 country code | `"US"` |
| `birthYear` | number | Four-digit year of birth | `1990` |
| `birthMonth` | number | Month (1=January, 12=December) | `5` |
| `birthDay` | number | Day of month | `15` |
| `gender` | string | Gender identity (enum) | `"Male"` |

### FormData

Frontend form data interface (may include strings for number fields).

**Location**: `src/types/index.ts`

```typescript
interface FormData {
  firstName: string;
  lastName: string;
  countryCode: string;
  birthYear: string | number;
  birthMonth: string | number;
  birthDay: string | number;
  gender: 'Male' | 'Female' | 'Other';
  pin: string;
}
```

**Note**: Birth fields can be strings or numbers to accommodate form inputs. Zod validation coerces them to numbers.

### DecodeData

Data structure for decode requests.

**Location**: `src/types/index.ts`

```typescript
interface DecodeData {
  hexCode: string;
  pin: string;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `hexCode` | string | Encrypted quantum SIN (hexadecimal) |
| `pin` | string | 4-6 digit PIN for decryption |

### ApiError

Individual validation error structure.

**Location**: `src/types/index.ts`

```typescript
interface ApiError {
  path: string;
  message: string;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `path` | string | Dot-separated field path (e.g., `"birthDay"`) |
| `message` | string | Human-readable error message |

### ApiResult

Generic API response structure.

**Location**: `src/types/index.ts`

```typescript
interface ApiResult {
  status: 'success' | 'error';
  code?: string;
  message?: string;
  errors?: ApiError[];
  hexCode?: string;
  personalInfo?: PersonalInfo;
}
```

**Field Usage by Endpoint**:

| Field | Generate Success | Generate Error | Decode Success | Decode Error |
|-------|-----------------|----------------|----------------|--------------|
| `status` | ✅ "success" | ✅ "error" | ✅ "success" | ✅ "error" |
| `hexCode` | ✅ Present | ❌ | ❌ | ❌ |
| `personalInfo` | ❌ | ❌ | ✅ Present | ❌ |
| `code` | ❌ | ⚠️ Optional | ❌ | ⚠️ Optional |
| `message` | ❌ | ✅ Present | ❌ | ✅ Present |
| `errors` | ❌ | ⚠️ Optional | ❌ | ⚠️ Optional |

### QuantumSinResponse

Service layer response type.

**Location**: `src/services/quantum.ts`

```typescript
interface QuantumSinResponse {
  status: "success" | "error";
  hexCode?: string;
  personalInfo?: PersonalInfo;
  message?: string;
}
```

Similar to `ApiResult` but used internally by service functions.

### Country

Country data structure (frontend).

**Location**: `src/types/index.ts`

```typescript
interface Country {
  code: string;
  name: string;
}
```

**Note**: The API only returns country codes, not full country objects. This interface is for frontend use.

## Zod Validation Schemas

### QuantumSinSchema

Validates data for generating encrypted quantum SINs.

**Location**: `src/lib/schemas/quantum.ts`

```typescript
const QuantumSinSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name too long"),
  countryCode: z.string().toUpperCase().refine((code) => code in COUNTRY_CODES, {
    message: "Invalid country code",
  }),
  birthYear: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  birthMonth: z.coerce.number().int().min(1).max(12),
  birthDay: z.coerce.number().int().min(1).max(31),
  gender: z.enum(["Male", "Female", "Other"]),
  pin: z.coerce.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits"),
}).refine((data) => isValidDate(data.birthYear, data.birthMonth, data.birthDay), {
  message: "Invalid birth date (e.g., February 31st)",
  path: ["birthDay"],
});
```

**Validation Rules**:

| Field | Validation | Error Message |
|-------|-----------|---------------|
| `firstName` | Trimmed, 1-50 chars | "First name is required" / "First name too long" |
| `lastName` | Trimmed, 1-50 chars | "Last name is required" / "Last name too long" |
| `countryCode` | Uppercase, must exist in COUNTRY_CODES | "Invalid country code" |
| `birthYear` | Integer, 1900 to current year | (Default Zod message) |
| `birthMonth` | Integer, 1-12 | (Default Zod message) |
| `birthDay` | Integer, 1-31 | (Default Zod message) |
| `gender` | Must be "Male", "Female", or "Other" | (Default Zod message) |
| `pin` | 4-6 digits (regex) | "PIN must be 4-6 digits" |
| (Composite) | Valid calendar date | "Invalid birth date (e.g., February 31st)" |

**Date Validation Function**:

```typescript
const isValidDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};
```

This ensures that dates like February 31st or April 31st are rejected.

**TypeScript Type**:
```typescript
type QuantumSinInput = z.infer<typeof QuantumSinSchema>;
```

### DecodeSchema

Validates data for decoding encrypted quantum SINs.

**Location**: `src/lib/schemas/quantum.ts`

```typescript
const DecodeSchema = z.object({
  hexCode: z.string().min(1, "Hex code is required").regex(/^[0-9a-fA-F]+$/, "Invalid hex format"),
  pin: z.coerce.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits"),
});
```

**Validation Rules**:

| Field | Validation | Error Message |
|-------|-----------|---------------|
| `hexCode` | Non-empty, hexadecimal characters only | "Hex code is required" / "Invalid hex format" |
| `pin` | 4-6 digits | "PIN must be 4-6 digits" |

**TypeScript Type**:
```typescript
type DecodeInput = z.infer<typeof DecodeSchema>;
```

## Binary Protocol Format

### Encrypted Payload Structure

The final encrypted quantum SIN has the following binary structure:

```
[VERSION:1 byte][SALT:8 bytes][IV:12 bytes][CIPHERTEXT+TAG:variable]
```

**Layout**:

| Offset | Size | Field | Description |
|--------|------|-------|-------------|
| 0 | 1 byte | Protocol Version | Currently `2` |
| 1 | 8 bytes | Salt | Random salt for PBKDF2 |
| 9 | 12 bytes | IV | Initialization vector for AES-GCM |
| 21 | Variable | Ciphertext + Tag | AES-GCM encrypted data with authentication tag |

**Total Minimum Size**: 21 + ciphertext length

**Example Construction** (`src/services/quantum.ts`):

```typescript
const finalBuffer = new Uint8Array(1 + 8 + 12 + ciphertext.length);
finalBuffer[0] = PROTOCOL_VERSION;  // 2
finalBuffer.set(salt, 1);
finalBuffer.set(iv, 9);
finalBuffer.set(ciphertext, 21);
```

### Personal Information Binary Format

Before encryption, personal information is serialized to binary using a custom protocol.

**Location**: `src/lib/core/protocol.ts` → `pack()`

```
[VERSION:1 byte][GENDER:1 byte][COUNTRY_IDX:2 bytes][DAYS_SINCE_EPOCH:2 bytes][NAME_LEN:1 byte][NAME_BYTES:variable]
```

**Layout**:

| Offset | Size | Field | Description |
|--------|------|-------|-------------|
| 0 | 1 byte | Data Format Version | Currently `1` |
| 1 | 1 byte | Gender | 1=Male, 2=Female, 3=Other |
| 2 | 2 bytes | Country Index | Index into COUNTRY_CODES (big-endian) |
| 4 | 2 bytes | Birth Date | Days since 1900-01-01 (big-endian) |
| 6 | 1 byte | Name Length | Length of full name in bytes |
| 7 | Variable | Name Bytes | UTF-8 encoded "FirstName LastName" |

**Epoch**: `1900-01-01T00:00:00Z`

**Gender Encoding**:
```typescript
const genderMap = { "Male": 1, "Female": 2, "Other": 3 };
```

**Country Encoding**:
- Country codes are stored as indices into the sorted `COUNTRY_CODES` object
- Example: If `"US"` is at index 180 in the sorted keys, it's stored as `0x00B4`

**Date Encoding**:
```typescript
const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}T00:00:00Z`).getTime();
const daysSinceEpoch = Math.floor((birthDate - EPOCH) / MS_PER_DAY);
```

**Name Encoding**:
- Full name is `firstName + " " + lastName`
- Encoded as UTF-8 bytes
- Length prefix allows variable-length names

## Constants

### COUNTRY_CODES

Mapping of ISO 2-letter country codes to internal numeric codes.

**Location**: `src/lib/core/constants.ts`

```typescript
const COUNTRY_CODES: { [key: string]: string } = {
  'AF': '0106', 'AL': '0112', 'DZ': '0426', 'AD': '0104', // ...
  // ... 195 total entries
};
```

**Total Countries**: 195

**Usage**:
- Validation: Check if provided country code exists
- Encoding: Get index for binary serialization
- Decoding: Reverse lookup from index to code

### MAX_NAME_LENGTH

Maximum allowed name length in the protocol.

**Location**: `src/lib/core/constants.ts`

```typescript
const MAX_NAME_LENGTH = 26;
```

**Note**: While this constant is defined, the actual validation in Zod limits first and last names to 50 characters each. The protocol layer does not enforce this limit in the visible code.

### LETTER_TO_NUMBER & NUMBER_TO_LETTER

Character encoding mappings.

**Location**: `src/lib/core/constants.ts`

```typescript
const LETTER_TO_NUMBER: { [key: string]: string } = {
  "-": "00", "A": "01", "B": "02", "C": "03", // ...
};

const NUMBER_TO_LETTER: { [key: string]: string } = {
  "00": "-", "01": "A", "02": "B", // ...
};
```

**Note**: These constants are defined but not used in the current encryption/decryption flow. They may be legacy code or reserved for future use.

## Data Relationships

### Generate Flow

```
FormData (Frontend)
  ↓ [Validation]
QuantumSinInput (Validated)
  ↓ [Type Alignment]
PersonalInfo (Service Layer)
  ↓ [pack()]
Uint8Array (Binary Personal Data)
  ↓ [encrypt()]
Uint8Array (Encrypted)
  ↓ [Construct Payload]
Uint8Array (Full Payload)
  ↓ [uint8ArrayToHex()]
string (Hex Code)
  ↓ [API Response]
ApiResult { status, hexCode }
```

### Decode Flow

```
DecodeData (Frontend)
  ↓ [Validation]
DecodeInput (Validated)
  ↓ [hexToUint8Array()]
Uint8Array (Full Payload)
  ↓ [Extract Components]
{ version, salt, iv, ciphertext }
  ↓ [decrypt()]
Uint8Array (Decrypted Binary)
  ↓ [unpack()]
PersonalInfo
  ↓ [API Response]
ApiResult { status, personalInfo }
```

## Field Constraints Summary

| Field | Type | Min | Max | Pattern | Special Rules |
|-------|------|-----|-----|---------|---------------|
| firstName | string | 1 char | 50 chars | - | Trimmed |
| lastName | string | 1 char | 50 chars | - | Trimmed |
| countryCode | string | 2 chars | 2 chars | [A-Z]{2} | Must exist in COUNTRY_CODES |
| birthYear | number | 1900 | Current year | - | Integer |
| birthMonth | number | 1 | 12 | - | Integer |
| birthDay | number | 1 | 31 | - | Integer, valid date |
| gender | string | - | - | Enum | "Male", "Female", or "Other" |
| pin | string | 4 chars | 6 chars | ^\d{4,6}$ | Numeric only |
| hexCode | string | 1 char | - | ^[0-9a-fA-F]+$ | Hexadecimal |

## Data Validation Flow

```
1. Request arrives with JSON body
2. Zod schema validation
   ├─ Type coercion (string to number)
   ├─ Field-level validation
   ├─ Cross-field validation (date check)
   └─ Error collection
3. If validation fails:
   └─ Return { status: "error", code: "VALIDATION_ERROR", errors: [...] }
4. If validation succeeds:
   └─ Proceed to service layer with validated data
```

## Data Storage

**Not applicable** - The API is completely stateless:

- ❌ No database
- ❌ No file storage
- ❌ No caching
- ❌ No session storage
- ❌ No persistent state

All data exists only:
- In requests (client → server)
- In memory during processing
- In responses (server → client)

---

**Note**: All data models and schemas are documented based on the actual codebase implementation. No assumed or speculative structures are included.
