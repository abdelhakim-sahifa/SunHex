# Versioning Documentation

This document explains the versioning scheme and strategy used for the SunHex Quantum Protocol API.

## Current Versions

### API Version: 0.1.0

**Source**: `package.json`

The overall API release version following Semantic Versioning (SemVer).

**Format**: `MAJOR.MINOR.PATCH`

### Protocol Version: 2

**Source**: `src/services/quantum.ts` (constant `PROTOCOL_VERSION`)

The internal encryption protocol version embedded in encrypted data.

**Format**: Single integer

**Location in Data**: First byte of encrypted payload (offset 0)

### Data Format Version: 1

**Source**: `src/lib/core/protocol.ts` (hardcoded in `pack()` function)

The binary serialization format version.

**Format**: Single integer

**Location in Data**: First byte of packed PersonalInfo (before encryption)

## Versioning Scheme

### Semantic Versioning (SemVer)

The SunHex API follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

**Format**: `MAJOR.MINOR.PATCH`

- **MAJOR** version: Incompatible API changes
- **MINOR** version: Add functionality (backward-compatible)
- **PATCH** version: Backward-compatible bug fixes

### Version Number Rules

Given a version number `MAJOR.MINOR.PATCH`:

1. **MAJOR** is incremented when:
   - Breaking changes to API endpoints
   - Changes to request/response formats (non-backward-compatible)
   - Removal of endpoints or features
   - Changes to encryption algorithms
   - Incompatible protocol version changes

2. **MINOR** is incremented when:
   - New endpoints are added
   - New optional parameters are added
   - New features are introduced (backward-compatible)
   - Performance improvements
   - Internal refactoring (no external impact)

3. **PATCH** is incremented when:
   - Bug fixes
   - Security patches
   - Documentation updates
   - Dependency updates (no breaking changes)
   - Error message improvements

### Pre-release Versions

**Not currently used**, but would follow SemVer format:

- `0.1.0-alpha.1` - Alpha releases
- `0.1.0-beta.1` - Beta releases
- `0.1.0-rc.1` - Release candidates

### Version Compatibility

#### API Compatibility

| Change Type | Example | Version Bump |
|-------------|---------|--------------|
| Add new endpoint | `GET /api/status` | MINOR |
| Add optional parameter | `?format=json` | MINOR |
| Change required parameter | `pin` → `password` | MAJOR |
| Remove endpoint | Delete `/api/generate` | MAJOR |
| Fix response bug | Correct field type | PATCH |
| Change encryption | AES → ChaCha20 | MAJOR |

#### Protocol Compatibility

The **Protocol Version** is independent of the API version and changes when:

- Encryption algorithm changes
- Key derivation parameters change
- Payload structure changes

**Current Protocol (v2)**:
```
[VERSION:1][SALT:8][IV:12][CIPHERTEXT:variable]
```

**Backward Compatibility**: The decode function checks protocol version and rejects incompatible versions.

```typescript
if (fullBuffer[0] !== PROTOCOL_VERSION) {
  throw new Error(`Invalid protocol version: ${fullBuffer[0]}`);
}
```

#### Data Format Compatibility

The **Data Format Version** changes when the binary serialization of PersonalInfo changes.

**Current Format (v1)**:
```
[VERSION:1][GENDER:1][COUNTRY_IDX:2][BIRTH_DATE:2][NAME_LEN:1][NAME:variable]
```

**Backward Compatibility**: The unpack function checks data format version and rejects incompatible versions.

```typescript
if (version !== 1) throw new Error(`Unsupported protocol version: ${version}`);
```

## Version Management

### Where Versions are Defined

| Version | Location | Type | Update Method |
|---------|----------|------|---------------|
| API Version | `package.json` | String | Manual edit |
| Protocol Version | `src/services/quantum.ts` | Constant | Manual edit |
| Data Format Version | `src/lib/core/protocol.ts` | Hardcoded | Manual edit |

### Version Update Process

**Not determinable from code** - No automated versioning workflow is present.

Recommended process:

1. **Determine change type** (MAJOR, MINOR, PATCH)
2. **Update `package.json`** version number
3. **Update `CHANGELOG.md`** with changes
4. **Update protocol/data versions if needed**
5. **Commit and tag** the release
6. **Deploy** to production

### Version Communication

#### In API Responses

**API version is NOT included in API responses** (not determinable from code).

To include version in responses, you would need to add it manually to relevant endpoints.

#### In Documentation

API version is documented in:
- `README.md`
- `CHANGELOG.md`
- `OPENAPI.md` (OpenAPI spec)
- This file (VERSIONING.md)

## Version History

| Version | Release Date | Notes |
|---------|--------------|-------|
| 0.1.0 | 2026-01-23 | Initial release |

For detailed changes, see [CHANGELOG.md](CHANGELOG.md).

## Deprecation Policy

**Not determinable from code** - No formal deprecation policy is documented.

Recommended policy:

1. **Announce deprecation** in changelog (MINOR version)
2. **Mark as deprecated** in documentation
3. **Maintain for N versions** (e.g., 2 MAJOR versions)
4. **Remove** in future MAJOR version

## Version Negotiation

**Not implemented** - The API does not support version negotiation.

Current behavior:
- All clients use the same API version
- No URL versioning (e.g., `/v1/api/generate`)
- No header-based versioning (e.g., `Accept: application/vnd.api+json;version=1`)

**Future consideration**: If multiple API versions are needed, use URL-based versioning:
- `/v1/api/generate` (current)
- `/v2/api/generate` (future)

## Protocol Evolution

### Protocol Version History

| Version | Changes | Compatibility |
|---------|---------|---------------|
| 2 | Current protocol (AES-GCM, PBKDF2 100k iterations) | Active |
| 1 | Legacy protocol (not present in codebase) | Rejected |

### Data Format Version History

| Version | Changes | Compatibility |
|---------|---------|---------------|
| 1 | Current binary serialization format | Active |

### Forward Compatibility

**Not implemented** - The API does not support forward compatibility.

Future versions may:
- Add optional fields (backward-compatible)  
- Support multiple protocol versions in decode
- Provide migration tools for old data

## Version in URLs

**Not used** - The API does not include version numbers in URLs.

Current endpoints:
- `/api/generate`
- `/api/decode`
- `/api/countries`
- `/api/health`

**Not**:
- ❌ `/v1/api/generate`
- ❌ `/api/v1/generate`

## NPM Package Versioning

**Not applicable** - This is not an NPM package (it's an API service).

If published as a package, it would follow NPM's SemVer conventions.

## Git Tagging

**Not determinable from code** - Git tagging strategy is not defined.

Recommended tagging:
- `v0.1.0` - Tag releases with `v` prefix
- `v0.2.0-beta.1` - Tag pre-releases

## Version Stability

### Pre-1.0 Versions

**Current state**: 0.1.0 (pre-1.0)

Per SemVer:
- Major version zero (0.y.z) is for initial development
- Anything may change at any time
- The API should not be considered stable

### 1.0.0 and Beyond

When releasing 1.0.0:
- The API is considered **stable**
- Public API is defined
- Breaking changes require MAJOR version bump
- Backward compatibility is maintained within MAJOR versions

## Breaking Changes

### What Constitutes a Breaking Change?

- ✅ Removing or renaming endpoints
- ✅ Removing or renaming request/response fields
- ✅ Changing field types
- ✅ Making optional fields required
- ✅ Changing error response format
- ✅ Changing encryption algorithms
- ✅ Changing HTTP status codes
- ✅ Changing authentication requirements

### What is NOT a Breaking Change?

- ✅ Adding new endpoints
- ✅ Adding new optional fields
- ✅ Adding new error codes
- ✅ Fixing bugs
- ✅ Performance improvements
- ✅ Documentation updates

## Migration Guides

When MAJOR version changes occur, migration guides should be provided in:
- `CHANGELOG.md` - Summary of breaking changes
- `MIGRATION.md` - Detailed migration steps (create when needed)
- Documentation updates

**Current Status**: No migrations needed (initial version).

## Summary

| Aspect | Current State | Scheme |
|--------|---------------|--------|
| API Versioning | 0.1.0 | Semantic Versioning 2.0.0 |
| Protocol Versioning | 2 | Integer |
| Data Format Versioning | 1 | Integer |
| URL Versioning | Not used | N/A |
| Deprecation Policy | Not defined | TBD |
| Breaking Change Policy | Follows SemVer | MAJOR version bump |

---

**Note**: This versioning documentation reflects the current state of the codebase. Versioning practices should be followed as the project evolves.
