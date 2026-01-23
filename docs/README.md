# SunHex API Documentation

Welcome to the comprehensive documentation for the **SunHex Quantum Protocol API** - a cryptographic service for securely encoding and decoding personal information.

## Overview

SunHex is a Next.js-based API that provides quantum-grade encryption services for personal identification data. It uses advanced cryptographic techniques (PBKDF2 key derivation and AES-GCM encryption) combined with a custom binary serialization protocol to create secure, compact representations of personal information.

**Key Features:**
- PIN-based encryption and decryption
- Support for 195+ countries
- Quantum-resistant cryptographic protocols
- Binary data serialization for efficiency
- Zero-knowledge architecture (no data storage)

## Documentation Structure

This documentation folder contains the following files:

### Core Documentation

- **[README.md](README.md)** - This file, providing an overview and navigation guide
- **[API_FLOW.md](API_FLOW.md)** - Complete request/response flow through the system
- **[ENDPOINTS.md](ENDPOINTS.md)** - Detailed documentation of all API endpoints

### Technical Specifications

- **[AUTH.md](AUTH.md)** - Authentication and authorization details
- **[DATA_MODEL.md](DATA_MODEL.md)** - Data structures, schemas, and validation rules
- **[ERRORS.md](ERRORS.md)** - Comprehensive error handling documentation

### Developer Resources

- **[EXAMPLES.md](EXAMPLES.md)** - Real-world API usage examples
- **[OPENAPI.md](OPENAPI.md)** - OpenAPI 3.0 specification
- **[DIAGRAMS.md](DIAGRAMS.md)** - System architecture and flow diagrams

### Project Management

- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes
- **[VERSIONING.md](VERSIONING.md)** - Versioning scheme and strategy

## Quick Start

### 1. Understand the Flow

Start with [API_FLOW.md](API_FLOW.md) to understand how requests travel through the system, from entry point to response.

### 2. Explore Endpoints

Review [ENDPOINTS.md](ENDPOINTS.md) to see all available API endpoints, their parameters, and response formats.

### 3. See Examples

Check [EXAMPLES.md](EXAMPLES.md) for real-world usage examples of encoding and decoding operations.

### 4. Review Technical Details

- For cryptographic details, see [DATA_MODEL.md](DATA_MODEL.md)
- For error handling, see [ERRORS.md](ERRORS.md)
- For visual representations, see [DIAGRAMS.md](DIAGRAMS.md)

## API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/generate` | POST | Generate encrypted quantum SIN from personal information |
| `/api/decode` | POST | Decode encrypted quantum SIN back to personal information |
| `/api/countries` | GET | List all supported country codes |
| `/api/health` | GET | Check API health status |

## Technology Stack

- **Framework**: Next.js 13.5.4 (App Router)
- **Runtime**: Node.js
- **Validation**: Zod 4.3.6
- **Cryptography**: Web Crypto API (PBKDF2 + AES-GCM)
- **Language**: TypeScript 5.2.2

## Security Model

The SunHex API uses a **PIN-based security model**:
- No authentication required for API access (public endpoints)
- Security relies on user-provided PINs (4-6 digits)
- PBKDF2 with 100,000 iterations for key derivation
- AES-GCM for authenticated encryption
- Random salt and IV for each encryption operation

See [AUTH.md](AUTH.md) for complete security details.

## How to Use This Documentation

1. **New Users**: Start with this README, then read [API_FLOW.md](API_FLOW.md) and [EXAMPLES.md](EXAMPLES.md)
2. **Integration**: Use [ENDPOINTS.md](ENDPOINTS.md) and [OPENAPI.md](OPENAPI.md) for API integration
3. **Troubleshooting**: Refer to [ERRORS.md](ERRORS.md) for error codes and solutions
4. **Architecture**: Review [DIAGRAMS.md](DIAGRAMS.md) for visual system architecture

## Version Information

- **API Version**: v0.1.0
- **Protocol Version**: 2
- **Data Format Version**: 1

For version history, see [CHANGELOG.md](CHANGELOG.md).

## Support

For questions or issues, please refer to:
- [ERRORS.md](ERRORS.md) - Common errors and solutions
- [EXAMPLES.md](EXAMPLES.md) - Usage examples
- Project repository issues

---

**Note**: This documentation is generated based on the actual codebase implementation. All information reflects the exact behavior of the API as coded.
