## API Endpoints

All endpoints are prefixed with `/api`.

### GET /api/countries

Returns a list of supported countries.

### POST /api/generate

Generates a SIN.

**Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "countryCode": "string",
  "birthYear": "number",
  "birthMonth": "number",
  "birthDay": "number",
  "gender": "string",
  "pin": "number"
}
```

### POST /api/decode

Decodes a SIN.

**Body:**

```json
{
  "hexCode": "string",
  "pin": "number"
}
```

### GET /api/health

Health check endpoint.

**Example:**

```
http://localhost:3000/api/health
```