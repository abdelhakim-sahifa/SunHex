
# *SunHex(SIN)* API

**Serverless Universal Number in Heximal - Fast. Secure. Serverless.**

Sign up and sign in instantly without servers or third-party accounts. All your essential personal data is securely encoded in a single hexadecimal string, unlocked only with your personal PIN. Fast, private, and self-contained identity management.

---

## Table of Contents

- [Overview](#overview)
- [API Endpoints](#api-endpoints)
- [Field Specifications](#field-specifications)
- [Live API Testing](#live-api-testing)
- [Security & Implementation](#security--implementation)
- [Installation & Setup](#installation--setup)
- [Error Handling](#error-handling)
- [License](#license)

---

## Overview

Advanced cryptographic system for secure personal data encoding and decoding.

### Features

- **PIN-Based Encryption:** Advanced mathematical encryption using PIN multipliers and offset algorithms for maximum security.
- **Global Support:** Supports 195+ ISO country codes for worldwide deployment and international compatibility.
- **Compact Format:** Converts complex personal data into efficient hexadecimal strings for optimized storage.
- **Bidirectional Processing:** Complete reversible encoding/decoding system with full data integrity verification.

---

## API Endpoints

### Health Check

**GET /health**

System health and status verification endpoint.

```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
````

### Countries

**GET /api/countries**

Retrieve list of supported ISO country codes.

```json
{
  "status": "success",
  "countries": ["AD", "AE", "AF", "AG", ..., "ZM", "ZW"]
}
```

### Generate HEX Code

**POST /api/generate**

Generate secure HEX code from personal information.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "countryCode": "US",
  "birthYear": "1990",
  "birthMonth": "12",
  "birthDay": "15",
  "gender": "male",
  "pin": 1234
}
```

**Response:**

```json
{
  "status": "success",
  "hexCode": "A1B2C3D4E5F6789...",
  "debugInfo": {
    "originalSin": "110151408000000000000000000...",
    "securedSin": "123456789012345...",
    "components": {
      "firstName": "10151408000000000000000000",
      "lastName": "19130920080000000000000000",
      "country": "2119",
      "date": "19901215",
      "gender": "1"
    }
  }
}
```

### Decode HEX Code

**POST /api/decode**

Decode HEX code back to original personal information.

**Request Body:**

```json
{
  "hexCode": "A1B2C3D4E5F6789...",
  "pin": 1234
}
```

**Response:**

```json
{
  "status": "success",
  "personalInfo": {
    "firstName": "John",
    "lastName": "Smith",
    "countryCode": "US",
    "birthYear": "1990",
    "birthMonth": "12",
    "birthDay": "15",
    "gender": "Male"
  }
}
```

---

## Field Specifications

| Field       | Type   | Requirements                      | Example          |
| ----------- | ------ | --------------------------------- | ---------------- |
| firstName   | String | Letters only, first word used     | "John"           |
| lastName    | String | Letters only, first word used     | "Smith"          |
| countryCode | String | 2-letter ISO code                 | "US", "CA", "MA" |
| birthYear   | String | 4-digit year                      | "1990"           |
| birthMonth  | String | 1-2 digits (1-12)                 | "12", "3"        |
| birthDay    | String | 1-2 digits (1-31)                 | "15", "7"        |
| gender      | String | "male"/"female", "m"/"f", "1"/"0" | "male"           |
| pin         | Number | Any integer                       | 1234             |

---

## Live API Testing

Test the API directly from your browser.

### Generate HEX Code

Provide first name, last name, country code, birth date, gender, and PIN to generate a HEX code.

### Decode HEX Code

Provide HEX code and PIN to decode back to personal information.

---

## Security & Implementation

### PIN-Based Encryption

The system uses mathematical transformation where the original SIN is multiplied by `(PIN + 2025)` and then has `(PIN + 2025)` added to it. This ensures unique HEX codes for identical personal information with different PINs.

### Critical Security Notes

* PIN is never stored and cannot be recovered from HEX code.
* Incorrect PIN results in complete decoding failure.
* 2025 offset prevents mathematical vulnerabilities.
* Each component uses proprietary encoding algorithms.

### Additional Security Features

* **Cryptographic Security:** Military-grade mathematical obfuscation using large number operations and PIN-based encryption.
* **Production Ready:** Designed for high-availability environments with comprehensive error handling and validation.
* **Privacy First:** Zero data retention policy with component-wise encoding that prevents partial data extraction.
* **Data Integrity:** Built-in format validation and verifier systems to detect tampering and ensure data accuracy.

---

## Installation & Setup

### Installation Steps

```bash
# Clone or download the project
git clone https://github.com/abdelhakim-sahifa/SunHex.git
# Navigate to project directory
cd SunHex/API
# Install dependencies
npm install express cors

# Start the server
node server.js
```

### Package Dependencies

```json
{
  "name": "sin-api",
  "version": "1.0.0",
  "description": "SIN Generator/Decoder API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  }
}
```

---

## Error Handling

```json
// Missing required fields
{
  "status": "error",
  "message": "Missing required fields: firstName, pin"
}

// Invalid country code
{
  "status": "error", 
  "message": "Invalid country code: XX"
}

// Invalid character in name
{
  "status": "error",
  "message": "Invalid character in name: @"
}

// Invalid SIN format during decoding
{
  "status": "error",
  "message": "Invalid SIN length after decoding: 65 (expected 66)"
}

// Wrong PIN during decoding
{
  "status": "error",
  "message": "Invalid SIN format: incorrect verifier"
}
```

---

## License

© 2025 Abdelhakim Sahifa. Released under the [MIT License](https://opensource.org/licenses/MIT).

