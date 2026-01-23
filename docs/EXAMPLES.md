# API Examples Documentation

This document provides real-world examples of API requests and responses for all endpoints in the SunHex Quantum Protocol API.

## Example Conventions

- **Base URL**: `http://localhost:3000` (adjust for your deployment)
- **Format**: JSON for all requests and responses
- **Tools**: Examples use `curl` but any HTTP client works
- **Data**: Placeholder data but realistic formats

---

## POST /api/generate

Generate an encrypted Quantum SIN from personal information.

### Example 1: Successful Generation

#### Request

```bash
curl -X POST http://localhost:3000/api/generate \
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

#### Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "countryCode": "US",
  "birthYear": 1990,
  "birthMonth": 5,
  "birthDay": 15,
  "gender": "Male",
  "pin": "1234"
}
```

#### Response (200 OK)

```json
{
  "status": "success",
  "hexCode": "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4F6"
}
```

**Notes**:
- The `hexCode` will be different each time due to random salt and IV
- Typical hex code length: 60-100 characters (varies by name length)
- Hex codes are uppercase hexadecimal strings

### Example 2: Different Country and Gender

#### Request Body

```json
{
  "firstName": "Marie",
  "lastName": "Dubois",
  "countryCode": "FR",
  "birthYear": 1985,
  "birthMonth": 12,
  "birthDay": 25,
  "gender": "Female",
  "pin": "789012"
}
```

#### Response (200 OK)

```json
{
  "status": "success",
  "hexCode": "02F4E6D8C0A2B4C6E8F0D2A4B6C8E0F2A4B6D8C0E2F4A6B8D0C2E4F6A8B0D2E4F6A8C0B2D4E6F8A0C2E4F6B8D0A2C4E6F8B0D2"
}
```

### Example 3: Validation Error - Invalid PIN

#### Request Body

```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "countryCode": "GB",
  "birthYear": 2000,
  "birthMonth": 1,
  "birthDay": 1,
  "gender": "Female",
  "pin": "abc"
}
```

#### Response (400 Bad Request)

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

### Example 4: Validation Error - Invalid Date

#### Request Body

```json
{
  "firstName": "Bob",
  "lastName": "Johnson",
  "countryCode": "CA",
  "birthYear": 1995,
  "birthMonth": 2,
  "birthDay": 31,
  "gender": "Male",
  "pin": "5555"
}
```

#### Response (400 Bad Request)

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

### Example 5: Validation Error - Multiple Errors

#### Request Body

```json
{
  "firstName": "",
  "lastName": "Lee",
  "countryCode": "XX",
  "birthYear": 1980,
  "birthMonth": 13,
  "birthDay": 10,
  "gender": "Unknown",
  "pin": "12"
}
```

#### Response (400 Bad Request)

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
      "path": "countryCode",
      "message": "Invalid country code"
    },
    {
      "path": "birthMonth",
      "message": "Number must be less than or equal to 12"
    },
    {
      "path": "gender",
      "message": "Invalid enum value. Expected 'Male' | 'Female' | 'Other', received 'Unknown'"
    },
    {
      "path": "pin",
      "message": "PIN must be 4-6 digits"
    }
  ]
}
```

### Example 6: With "Other" Gender

#### Request Body

```json
{
  "firstName": "Alex",
  "lastName": "Taylor",
  "countryCode": "AU",
  "birthYear": 1992,
  "birthMonth": 7,
  "birthDay": 20,
  "gender": "Other",
  "pin": "999999"
}
```

#### Response (200 OK)

```json
{
  "status": "success",
  "hexCode": "02C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4"
}
```

---

## POST /api/decode

Decode an encrypted Quantum SIN back to personal information.

### Example 1: Successful Decoding

#### Request

```bash
curl -X POST http://localhost:3000/api/decode \
  -H "Content-Type: application/json" \
  -d '{
    "hexCode": "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4F6",
    "pin": "1234"
  }'
```

#### Request Body

```json
{
  "hexCode": "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4F6",
  "pin": "1234"
}
```

#### Response (200 OK)

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

**Note**: PIN is NOT included in the response (it's only used for decryption).

### Example 2: Wrong PIN

#### Request Body

```json
{
  "hexCode": "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4F6",
  "pin": "0000"
}
```

#### Response (400 Bad Request)

```json
{
  "status": "error",
  "message": "Invalid PIN or corrupted SIN code"
}
```

**Note**: The error message is intentionally generic for security.

### Example 3: Invalid Hex Format

#### Request Body

```json
{
  "hexCode": "INVALID_HEX_CODE",
  "pin": "1234"
}
```

#### Response (400 Bad Request)

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

### Example 4: Empty Hex Code

#### Request Body

```json
{
  "hexCode": "",
  "pin": "1234"
}
```

#### Response (400 Bad Request)

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid request data",
  "errors": [
    {
      "path": "hexCode",
      "message": "Hex code is required"
    }
  ]
}
```

### Example 5: Corrupted Hex Code

#### Request Body

```json
{
  "hexCode": "02A3B5",
  "pin": "1234"
}
```

#### Response (400 Bad Request)

```json
{
  "status": "error",
  "message": "Invalid PIN or corrupted SIN code"
}
```

**Note**: A truncated hex code will fail decryption with the generic error message.

---

## GET /api/countries

Retrieve all supported country codes.

### Example: Get Countries List

#### Request

```bash
curl http://localhost:3000/api/countries
```

#### Response (200 OK)

```json
{
  "status": "success",
  "countries": [
    "AD",
    "AE",
    "AF",
    "AG",
    "AL",
    "AM",
    "AO",
    "AR",
    "AT",
    "AU",
    "AZ",
    "BA",
    "BB",
    "BD",
    "BE",
    "BF",
    "BG",
    "BH",
    "BI",
    "BJ",
    "BN",
    "BO",
    "BR",
    "BS",
    "BT",
    "BW",
    "BY",
    "BZ",
    "CA",
    "CD",
    "CF",
    "CG",
    "CH",
    "CL",
    "CM",
    "CN",
    "CO",
    "CR",
    "CU",
    "CV",
    "CY",
    "CZ",
    "DE",
    "DJ",
    "DK",
    "DM",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "ER",
    "ES",
    "ET",
    "FI",
    "FJ",
    "FM",
    "FR",
    "GA",
    "GB",
    "GD",
    "GE",
    "GH",
    "GM",
    "GN",
    "GQ",
    "GR",
    "GT",
    "GW",
    "GY",
    "HN",
    "HR",
    "HT",
    "HU",
    "ID",
    "IE",
    "IL",
    "IN",
    "IQ",
    "IR",
    "IS",
    "IT",
    "JM",
    "JO",
    "JP",
    "KE",
    "KG",
    "KH",
    "KI",
    "KM",
    "KN",
    "KP",
    "KR",
    "KW",
    "KZ",
    "LA",
    "LB",
    "LC",
    "LI",
    "LK",
    "LR",
    "LS",
    "LT",
    "LU",
    "LV",
    "LY",
    "MA",
    "MC",
    "MD",
    "ME",
    "MG",
    "MH",
    "MK",
    "ML",
    "MM",
    "MN",
    "MR",
    "MT",
    "MU",
    "MV",
    "MW",
    "MX",
    "MY",
    "MZ",
    "NA",
    "NE",
    "NG",
    "NI",
    "NL",
    "NO",
    "NP",
    "NR",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PG",
    "PH",
    "PK",
    "PL",
    "PS",
    "PT",
    "PW",
    "PY",
    "QA",
    "RO",
    "RS",
    "RU",
    "RW",
    "SA",
    "SB",
    "SC",
    "SD",
    "SE",
    "SG",
    "SI",
    "SK",
    "SL",
    "SM",
    "SN",
    "SO",
    "SR",
    "SS",
    "ST",
    "SZ",
    "SY",
    "TD",
    "TG",
    "TH",
    "TJ",
    "TL",
    "TM",
    "TN",
    "TO",
    "TR",
    "TT",
    "TV",
    "TW",
    "TZ",
    "UA",
    "UG",
    "US",
    "UY",
    "UZ",
    "VA",
    "VC",
    "VE",
    "VN",
    "VU",
    "WS",
    "YE",
    "ZA",
    "ZM",
    "ZW"
  ]
}
```

**Notes**:
- Total: 195 countries
- Alphabetically sorted
- ISO 3166-1 alpha-2 codes

---

## GET /api/health

Check API health status.

### Example: Health Check

#### Request

```bash
curl http://localhost:3000/api/health
```

#### Response (200 OK)

```json
{
  "status": "success",
  "message": "API is healthy",
  "timestamp": "2026-01-23T17:15:48.123Z"
}
```

**Note**: Timestamp format is ISO 8601.

---

## Complete Workflow Example

### Workflow: Encrypt and Decrypt Personal Information

#### Step 1: Generate Quantum SIN

**Request**:
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Sarah",
    "lastName": "Connor",
    "countryCode": "US",
    "birthYear": 1965,
    "birthMonth": 11,
    "birthDay": 13,
    "gender": "Female",
    "pin": "841123"
  }'
```

**Response**:
```json
{
  "status": "success",
  "hexCode": "02D4E6F8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8"
}
```

**Action**: Store the `hexCode` value.

#### Step 2: Decode Quantum SIN

**Request**:
```bash
curl -X POST http://localhost:3000/api/decode \
  -H "Content-Type: application/json" \
  -d '{
    "hexCode": "02D4E6F8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8",
    "pin": "841123"
  }'
```

**Response**:
```json
{
  "status": "success",
  "personalInfo": {
    "firstName": "Sarah",
    "lastName": "Connor",
    "countryCode": "US",
    "birthYear": 1965,
    "birthMonth": 11,
    "birthDay": 13,
    "gender": "Female"
  }
}
```

**Result**: Original data successfully recovered.

---

## JavaScript/Fetch Examples

### Generate Quantum SIN

```javascript
const response = await fetch('http://localhost:3000/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    countryCode: 'US',
    birthYear: 1990,
    birthMonth: 5,
    birthDay: 15,
    gender: 'Male',
    pin: '1234',
  }),
});

const data = await response.json();

if (data.status === 'success') {
  console.log('Hex Code:', data.hexCode);
} else {
  console.error('Error:', data.message);
  if (data.errors) {
    data.errors.forEach(err => {
      console.error(`${err.path}: ${err.message}`);
    });
  }
}
```

### Decode Quantum SIN

```javascript
const response = await fetch('http://localhost:3000/api/decode', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    hexCode: '02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B2C4D6E8A0B2C4D6E8F0A2B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4F6',
    pin: '1234',
  }),
});

const data = await response.json();

if (data.status === 'success') {
  console.log('Personal Info:', data.personalInfo);
} else {
  console.error('Error:', data.message);
}
```

### Get Countries

```javascript
const response = await fetch('http://localhost:3000/api/countries');
const data = await response.json();

if (data.status === 'success') {
  console.log('Countries:', data.countries);
}
```

---

**Note**: All examples use realistic data formats based on the actual API implementation. Hex codes shown are placeholders (actual values will differ due to cryptographic randomness).
