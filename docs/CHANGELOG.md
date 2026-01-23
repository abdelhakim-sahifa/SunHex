# Changelog

All notable changes to the SunHex Quantum Protocol API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Rate limiting implementation
- API authentication/authorization
- Request logging and monitoring
- Extended error codes
- Additional country metadata

## [0.1.0] - 2026-01-23

### Added
- Initial API implementation with Next.js 13 App Router
- POST `/api/generate` endpoint for encrypting personal information
- POST `/api/decode` endpoint for decrypting quantum SINs
- GET `/api/countries` endpoint to list supported country codes (195 countries)
- GET `/api/health` endpoint for API health checks
- PBKDF2 key derivation with 100,000 iterations
- AES-GCM 256-bit authenticated encryption
- Custom binary serialization protocol for efficient data packing
- Zod schema validation for all inputs
- Support for 195 country codes (ISO 3166-1 alpha-2)
- Comprehensive error handling with field-specific validation messages
- Zero-knowledge architecture (no data storage)
- PIN-based security model (4-6 digit PINs)
- Protocol version 2 with backward compatibility checks
- Data format version 1 for binary serialization
- TypeScript type safety throughout the codebase
- Gender support (Male, Female, Other)
- Birth date validation (real calendar dates only)

### Security
- Random salt generation (8 bytes) for each encryption
- Random IV generation (12 bytes) for each encryption
- Generic error messages for failed decryptions (security through obscurity)
- Input sanitization and validation via Zod

### Technical
- Next.js 13.5.4 framework
- TypeScript 5.2.2
- Zod 4.3.6 for validation
- Web Crypto API for cryptographic operations
- Stateless API design
- No external dependencies for core cryptography

### Documentation
- Comprehensive API documentation
- OpenAPI 3.0 specification
- Mermaid system architecture diagrams
- Request/response examples
- Error handling documentation
- Data model schemas

## Version History Notes

### Version Numbering

This project uses **Semantic Versioning (SemVer)**:
- **Major version** (X.0.0): Breaking changes to API contracts
- **Minor version** (0.X.0): New features, backward compatible
- **Patch version** (0.0.X): Bug fixes, backward compatible

### Breaking Changes

Any breaking changes will be clearly marked in the changelog with:
- **[BREAKING]** prefix in the changelog entry
- Detailed migration guide in the entry
- Advance notice in the "Unreleased" section when possible

### Protocol Versions

The API maintains multiple version numbers:
- **API Version** (0.1.0): Overall API release version
- **Protocol Version** (2): Internal encryption protocol version
- **Data Format Version** (1): Binary serialization format version

Protocol and data format versions are embedded in encrypted data and validated during decryption.

## Historical Notes

### Initial Release (0.1.0)

This is the initial release of the SunHex Quantum Protocol API. The API was designed from the ground up with:
- Privacy-first architecture
- Cryptographic best practices
- Modern web standards (Web Crypto API)
- Type-safe development (TypeScript)
- Comprehensive validation (Zod)

## Future Considerations

### Potential Major Version Changes (2.0.0)

The following changes would constitute a major version bump:
- Changing encryption algorithms
- Modifying binary protocol format (breaking backward compatibility)
- Significant changes to API endpoints or request/response formats
- Introduction of authentication requirements (breaking public access)

### Potential Minor Version Changes (0.X.0)

The following changes would be minor version bumps:
- Adding new endpoints
- Adding optional request parameters
- Extending data models with optional fields
- Performance improvements
- New validation rules (non-breaking)

### Potential Patch Version Changes (0.0.X)

The following changes would be patch version bumps:
- Bug fixes
- Security patches
- Documentation updates
- Dependency updates (no breaking changes)
- Performance optimizations

## Changelog Maintenance

This changelog is **manually maintained** and updated with each release. All notable changes should be documented here.

### Categories Used

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements or patches

---

**Note**: This changelog represents the current state of the project as of the initial documentation generation. Future releases should update this file following the Keep a Changelog format.
