# OpenAPI Specification

This document contains the complete OpenAPI 3.0 specification for the SunHex Quantum Protocol API.

## OpenAPI 3.0 YAML Specification

```yaml
openapi: 3.0.3

info:
  title: SunHex Quantum Protocol API
  description: |
    A cryptographic API for securely encoding and decoding personal information
    using PIN-based encryption. The API uses PBKDF2 key derivation and AES-GCM
    encryption to create compact, secure representations of identification data.
    
    **Security Model**: PIN-based encryption (no authentication required for API access)
    
    **Key Features**:
    - Quantum-grade encryption (AES-GCM 256-bit)
    - Support for 195+ countries
    - Binary data serialization for efficiency
    - Zero-knowledge architecture (no data storage)
  version: 0.1.0
  contact:
    name: SunHex API
  license:
    name: Not determinable from code

servers:
  - url: http://localhost:3000
    description: Local development server
  - url: https://sunhex.vercel.app
    description: Production server

paths:
  /api/generate:
    post:
      summary: Generate encrypted quantum SIN
      description: |
        Encrypts personal information using a user-provided PIN into a compact
        hexadecimal string. Uses PBKDF2 for key derivation (100,000 iterations)
        and AES-GCM for authenticated encryption.
      operationId: generateQuantumSin
      tags:
        - Encryption
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GenerateRequest'
            examples:
              basic:
                summary: Basic example
                value:
                  firstName: "John"
                  lastName: "Doe"
                  countryCode: "US"
                  birthYear: 1990
                  birthMonth: 5
                  birthDay: 15
                  gender: "Male"
                  pin: "1234"
              female:
                summary: Female with 6-digit PIN
                value:
                  firstName: "Marie"
                  lastName: "Dubois"
                  countryCode: "FR"
                  birthYear: 1985
                  birthMonth: 12
                  birthDay: 25
                  gender: "Female"
                  pin: "789012"
      responses:
        '200':
          description: Quantum SIN generated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenerateSuccess'
              examples:
                success:
                  value:
                    status: "success"
                    hexCode: "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8"
        '400':
          description: Validation or processing error
          content:
            application/json:
              schema:
                oneOf:
                  - $ref: '#/components/schemas/ValidationError'
                  - $ref: '#/components/schemas/ProcessingError'
              examples:
                validation:
                  summary: Validation error
                  value:
                    status: "error"
                    code: "VALIDATION_ERROR"
                    message: "Invalid request data"
                    errors:
                      - path: "pin"
                        message: "PIN must be 4-6 digits"
                processing:
                  summary: Processing error
                  value:
                    status: "error"
                    message: "Failed to generate SIN"

  /api/decode:
    post:
      summary: Decode encrypted quantum SIN
      description: |
        Decrypts a Quantum SIN hex code using the user-provided PIN to retrieve
        the original personal information. Returns a generic error for wrong PINs
        or corrupted data (for security).
      operationId: decodeQuantumSin
      tags:
        - Decryption
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DecodeRequest'
            examples:
              basic:
                summary: Basic decode request
                value:
                  hexCode: "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8"
                  pin: "1234"
      responses:
        '200':
          description: Quantum SIN decoded successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DecodeSuccess'
              examples:
                success:
                  value:
                    status: "success"
                    personalInfo:
                      firstName: "John"
                      lastName: "Doe"
                      countryCode: "US"
                      birthYear: 1990
                      birthMonth: 5
                      birthDay: 15
                      gender: "Male"
        '400':
          description: Validation or decryption error
          content:
            application/json:
              schema:
                oneOf:
                  - $ref: '#/components/schemas/ValidationError'
                  - $ref: '#/components/schemas/ProcessingError'
              examples:
                validation:
                  summary: Validation error
                  value:
                    status: "error"
                    code: "VALIDATION_ERROR"
                    message: "Invalid request data"
                    errors:
                      - path: "hexCode"
                        message: "Invalid hex format"
                decryption:
                  summary: Decryption error (wrong PIN or corrupted data)
                  value:
                    status: "error"
                    message: "Invalid PIN or corrupted SIN code"

  /api/countries:
    get:
      summary: List supported country codes
      description: |
        Returns an alphabetically sorted list of all supported ISO 3166-1 alpha-2
        country codes (195 total).
      operationId: getCountries
      tags:
        - Reference Data
      responses:
        '200':
          description: Countries list retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CountriesResponse'
              examples:
                success:
                  value:
                    status: "success"
                    countries: ["AD", "AE", "AF", "AG", "AL", "AM"]

  /api/health:
    get:
      summary: API health check
      description: |
        Simple health check endpoint to verify API availability. Returns current
        timestamp. No actual health checks (database, services) are performed.
      operationId: healthCheck
      tags:
        - System
      responses:
        '200':
          description: API is healthy
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HealthSuccess'
              examples:
                success:
                  value:
                    status: "success"
                    message: "API is healthy"
                    timestamp: "2026-01-23T17:15:48.123Z"
        '503':
          description: Service unavailable
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HealthError'
              examples:
                error:
                  value:
                    status: "error"
                    message: "API health check failed"
                    timestamp: "2026-01-23T17:15:48.123Z"

components:
  schemas:
    GenerateRequest:
      type: object
      required:
        - firstName
        - lastName
        - countryCode
        - birthYear
        - birthMonth
        - birthDay
        - gender
        - pin
      properties:
        firstName:
          type: string
          minLength: 1
          maxLength: 50
          description: Person's first name (trimmed)
          example: "John"
        lastName:
          type: string
          minLength: 1
          maxLength: 50
          description: Person's last name (trimmed)
          example: "Doe"
        countryCode:
          type: string
          pattern: '^[A-Z]{2}$'
          description: ISO 3166-1 alpha-2 country code (uppercase)
          example: "US"
        birthYear:
          type: integer
          minimum: 1900
          maximum: 2026
          description: Year of birth
          example: 1990
        birthMonth:
          type: integer
          minimum: 1
          maximum: 12
          description: Month of birth (1-12)
          example: 5
        birthDay:
          type: integer
          minimum: 1
          maximum: 31
          description: Day of birth (must form valid date with year/month)
          example: 15
        gender:
          type: string
          enum: ["Male", "Female", "Other"]
          description: Gender identity
          example: "Male"
        pin:
          type: string
          pattern: '^\d{4,6}$'
          description: 4-6 digit PIN for encryption
          example: "1234"

    DecodeRequest:
      type: object
      required:
        - hexCode
        - pin
      properties:
        hexCode:
          type: string
          pattern: '^[0-9a-fA-F]+$'
          minLength: 1
          description: Encrypted quantum SIN (hexadecimal string)
          example: "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8"
        pin:
          type: string
          pattern: '^\d{4,6}$'
          description: 4-6 digit PIN for decryption (must match encryption PIN)
          example: "1234"

    PersonalInfo:
      type: object
      properties:
        firstName:
          type: string
          example: "John"
        lastName:
          type: string
          example: "Doe"
        countryCode:
          type: string
          pattern: '^[A-Z]{2}$'
          example: "US"
        birthYear:
          type: integer
          example: 1990
        birthMonth:
          type: integer
          minimum: 1
          maximum: 12
          example: 5
        birthDay:
          type: integer
          minimum: 1
          maximum: 31
          example: 15
        gender:
          type: string
          enum: ["Male", "Female", "Other"]
          example: "Male"
      required:
        - firstName
        - lastName
        - countryCode
        - birthYear
        - birthMonth
        - birthDay
        - gender

    GenerateSuccess:
      type: object
      properties:
        status:
          type: string
          enum: ["success"]
          example: "success"
        hexCode:
          type: string
          pattern: '^[0-9A-F]+$'
          description: Encrypted data as uppercase hexadecimal string
          example: "02A3B5C7D9E1F2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8"
      required:
        - status
        - hexCode

    DecodeSuccess:
      type: object
      properties:
        status:
          type: string
          enum: ["success"]
          example: "success"
        personalInfo:
          $ref: '#/components/schemas/PersonalInfo'
      required:
        - status
        - personalInfo

    CountriesResponse:
      type: object
      properties:
        status:
          type: string
          enum: ["success"]
          example: "success"
        countries:
          type: array
          items:
            type: string
            pattern: '^[A-Z]{2}$'
          description: Alphabetically sorted array of country codes
          example: ["AD", "AE", "AF", "AG", "AL"]
      required:
        - status
        - countries

    HealthSuccess:
      type: object
      properties:
        status:
          type: string
          enum: ["success"]
          example: "success"
        message:
          type: string
          example: "API is healthy"
        timestamp:
          type: string
          format: date-time
          description: ISO 8601 timestamp
          example: "2026-01-23T17:15:48.123Z"
      required:
        - status
        - message
        - timestamp

    HealthError:
      type: object
      properties:
        status:
          type: string
          enum: ["error"]
          example: "error"
        message:
          type: string
          example: "API health check failed"
        timestamp:
          type: string
          format: date-time
          example: "2026-01-23T17:15:48.123Z"
      required:
        - status
        - message
        - timestamp

    ValidationError:
      type: object
      properties:
        status:
          type: string
          enum: ["error"]
          example: "error"
        code:
          type: string
          enum: ["VALIDATION_ERROR"]
          example: "VALIDATION_ERROR"
        message:
          type: string
          example: "Invalid request data"
        errors:
          type: array
          items:
            $ref: '#/components/schemas/FieldError'
          description: Array of field-specific validation errors
      required:
        - status
        - code
        - message
        - errors

    FieldError:
      type: object
      properties:
        path:
          type: string
          description: Dot-separated field path
          example: "birthDay"
        message:
          type: string
          description: Human-readable error message
          example: "Invalid birth date (e.g., February 31st)"
      required:
        - path
        - message

    ProcessingError:
      type: object
      properties:
        status:
          type: string
          enum: ["error"]
          example: "error"
        message:
          type: string
          description: Error description
          example: "Invalid PIN or corrupted SIN code"
      required:
        - status
        - message

  securitySchemes: {}

security: []

tags:
  - name: Encryption
    description: Endpoints for encrypting personal information
  - name: Decryption
    description: Endpoints for decrypting quantum SINs
  - name: Reference Data
    description: Static reference data endpoints
  - name: System
    description: System health and status endpoints
```

## Usage Notes

### Security

- **Authentication**: Not implemented. All endpoints are publicly accessible.
- **Authorization**: Not applicable.
- **API Keys**: Not required.

### Base URL
Production: https://sunhex.vercel.app
Development: http://localhost:3000

### Content Type

- **Request**: `application/json` for POST endpoints
- **Response**: `application/json` for all endpoints

### CORS

CORS configuration is **not determinable from code**. Default Next.js behavior applies.

### Rate Limiting

Rate limiting is **not implemented** in the codebase.

### Versioning

- **API Version**: v0.1.0 (from package.json)
- **Protocol Version**: 2 (internal, embedded in encrypted data)
- **URL Versioning**: Not implemented

### Validation

All request validation is performed using Zod schemas. See the schemas section above for detailed validation rules.

## Limitations and "Not Determinable from Code"

The following aspects are **not determinable from the codebase**:

1. **Production Server URL**: No deployment configuration found
2. **HTTPS Enforcement**: Not specified in code
3. **CORS Configuration**: Default Next.js behavior (not explicitly configured)
4. **Rate Limiting**: Not implemented
5. **API Keys/Authentication**: Not implemented
6. **Request Logging**: Not implemented
7. **License**: License file exists but type not specified in API metadata
8. **Contact Information**: No contact details in code
9. **Terms of Service**: Not present
10. **External Documentation Links**: Not present

## Validation from OpenAPI Tools

This specification should validate successfully with:
- Swagger Editor
- OpenAPI Validator
- Redoc
- Swagger UI

## Extending This Specification

If implementing additional features, update the following sections:

1. **Security**: Add `securitySchemes` and apply to paths
2. **Servers**: Add production server URL
3. **Error Codes**: Add new error response schemas
4. **Endpoints**: Add new paths as implemented

---

**Note**: This OpenAPI specification is generated solely from the codebase implementation. All schemas, validations, and examples match the actual API behavior.
