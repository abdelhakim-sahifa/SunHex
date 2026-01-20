# SIN (Sun Identification Number) Specification

This document details the encoding and decoding processes for SunHex SIN codes, used to identify if there are any conflicts in the logic.

## 1. SIN Structure (Internal Representation)

Before being converted to Hexadecimal, a SIN is represented as a **66-character numeric string**.

| Segment | Length | Description | Format |
| :--- | :--- | :--- | :--- |
| **Verifier** | 1 | Integrity check | Always `1` |
| **First Name** | 26 | Encoded first name | 2-digit pairs per letter (max 13 letters) |
| **Last Name** | 26 | Encoded last name | 2-digit pairs per letter (max 13 letters) |
| **Country** | 4 | Encoded country code | 4-digit numeric code |
| **Date** | 8 | Birth date | `YYYYMMDD` |
| **Gender** | 1 | Gender bit | `1` for Male, `0` for Female |

---

## 2. Component Encoding Details

### A. Names (First/Last)
- **Mapping**: Each letter is converted to a 2-digit number using `LETTER_TO_NUMBER`.
  - `A` -> `01`, `B` -> `02`, ..., `Z` -> `26`
  - `-` -> `00`
- **Normalization**: Names are trimmed, lowercased, and only the first word is used.
- **Length Constraint**: If the encoded string exceeds 26 digits (13 letters), it returns a special `OVERFLOW` string: `15220518061215230000000000`.
- **Padding**: Strings shorter than 26 digits are padded with `0` at the end until they reach 26.

### B. Country
- **Mapping**: ISO 2-letter codes are mapped to 4-digit numbers.
  - Examples: `AF` -> `0106`, `DZ` -> `0426`, `US` -> `2119`.

### C. Date
- **Format**: Simple concatenation of Year (4 digits), Month (2 digits, padded), and Day (2 digits, padded).
  - Example: `2000-01-01` -> `20000101`.

### D. Gender
- **Mapping**: 
  - `Male`, `M`, or `1` -> `1`
  - `Female`, `F`, or `0` -> `0` 

---

## 3. Security & Hex Transformation

Once the 66-digit numeric SIN is generated, it undergoes a security transformation using a **PIN**.

### Encoding Flow
1. **Raw SIN**: `sin_string` (66 digits).
2. **Effective PIN**: `effective_pin = pin + 2025`.
3. **Secured SIN**: `secured = (BigInt(sin_string) + 1) * BigInt(effective_pin)`.
4. **Hex Conversion**: The `secured` numeric string is converted to Hexadecimal (Uppercase).
   - Result: **The final SIN Code**.

### Decoding Flow
1. **Hex to Numeric**: Convert SIN Code from Hex back to a numeric string (`secured`).
2. **Reverse Math**: `original = (BigInt(secured) / BigInt(pin + 2025)) - 1`.
3. **Verification**: If the resulting `original` string doesn't start with `1` or isn't 66 characters long, the PIN or code is invalid.
4. **Slicing**: The 66 digits are sliced into their original segments for component decoding.

---

## 4. Potential Conflicts & Observations

> [!WARNING]
> ### Hyphen Termination in Names
> In `LETTER_TO_NUMBER`, the hyphen `-` is mapped to `00`. However, the decoder is programmed to stop reading a name immediately when it encounters `00` (treating it as padding).
> - **Result**: If a user has a hyphenated name (e.g., "Jean-Pierre"), the decoder will only see "Jean" and stop. The `-` and everything after it will be lost during decoding.

> [!CAUTION]
> ### Name Padding Logic
> The `padEnd(26, '0')` logic adds single `0` characters. If an encoded name has an odd number of digits before padding (which shouldn't happen with 2-digit pairs, but worth noting), the 2-digit chunking in the decoder might shift.
> However, since every letter is 2 digits, the length will always be even before padding. The issue is that `padEnd` fills with `0`, but the decoder looks for `00`. 
> - If a name encodes to 25 digits (impossible with 2-digit pairs), padding with one `0` would create a `X0` chunk at the end.
> - Current implementation safely uses 2-digit pairs, so this is mostly a theoretical concern unless the mapping changes.

> [!IMPORTANT]
> ### Name Truncation
> `trimName` splits by space and only takes the first part.
> - **Result**: Middle names or multi-word last names are discarded before encoding even begins.

---

## 5. Summary Table for Verification

| Step | Example Data |
| :--- | :--- |
| **Input** | John, Doe, US, 1995-05-15, Male, PIN: 1234 |
| **Component Encoding** | `10150814...` (John), `041505...` (Doe), `2119` (US), `19950515` (Date), `1` (Gender) |
| **Raw SIN (66 chars)** | `11015081400000000000000000004150500000000000000000002119199505151` |
| **Effective PIN** | `1234 + 2025 = 3259` |
| **Secured SIN** | `(RawSIN + 1) * 3259` |
| **Final Hex** | `30E7...` (Converted to Hex) |
