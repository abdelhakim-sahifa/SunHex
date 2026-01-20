# SunHex Platform: Professional Specification

This document is the absolute reference for the SunHex platform evolution. It defines the architecture, standards, and implementation requirements for the "Quantum Edition" of the platform.

## 1. Core Architecture

The platform is designed as a **Hybrid Identity Engine**, separating the visual presentation from the mathematical core.

### A. The Engine (`src/lib`)
- **Stateless & Deterministic**: The core logic must never rely on external state or non-deterministic variables (unless explicitly creating a Salt).
- **Web-First Cryptography**: Must use the native `Standard Web Crypto API` for maximum performance and security in both Browser and Server environments.
- **Binary-First Protocol**: All data serialization must use the **Quantum Binary Protocol** (Bit-packing) to minimize payload size.

### B. The API Layer (`src/app/api`)
- **Standardized Responses**: Every API endpoint must return a consistent `QuantumSinResponse` object.
- **Asynchronous by Design**: All cryptographic operations must be non-blocking.
- **Validation-Strict**: Use Zod or similar for schema validation on all inputs.

### C. The Presentation Layer (`src/components`)
- **The "Neon-Clean" Aesthetic**: Maintain the glassmorphism, accent-primary gradients, and dark-mode default that defines SunHex.
- **Logical Decoupling**: Components should be "pure" wrappers around hooks or services. They should not contain cryptographic math.
- **Accessibility (a11y)**: Every component must be fully accessible and keyboard-navigable.

---

## 2. Platform Improvements (The To-Do)

### I. Developer SDK
- [ ] **Unified Hook**: Create a `useSunHex()` hook that handles state, loading, and crypto orchestration for developers.
- [ ] **Type-Safe Components**: Refactor the component library to be fully generic and prop-driven.

### II. Code Quality & Professionalism
- [ ] **Standardized Error Handling**: Replace generic "error" strings with a structured `ErrorCode` system.
- [ ] **Directory Re-org**: Group utilities strictly by responsibility (e.g., `src/lib/binary`, `src/lib/crypto`).
- [ ] **Documentation Parity**: Ensure the `/docs` page perfectly reflects the new Quantum Protocol binary structure.

### III. Deployment & Scalability
- [ ] **Edge Compatibility**: Optimized for Next.js Edge Runtime to reduce latency to the absolute minimum.
- [ ] **Rate Limiting**: Implementation of rate limiting to protect the `deriveKey` function from brute-force attempts.

---

## 3. Implementation Standards

### Naming Conventions
- Files: `camelCase` for utilities, `PascalCase` for components.
- Functions: `verbNoun` (e.g., `generateSin`, `verifyPin`).
- Constants: `SCREAMING_SNAKE_CASE`.

### Security Mandate
- **No Plaintext PII**: Plaintext personally identifiable information must NEVER touch the database.
- **No Salt Reuse**: Every generated SIN must have a cryptographically secure random 8-byte salt.
- **KDF Hardening**: PBKDF2 iterations must remain at 100,000+ to ensure hardware resistance.

---

## 4. The Future Reference
Any feature added to SunHex must first be validated against this `platform.md`. If a feature breaks the **Stateless** or **Binary-First** rule, it must be rejected. 

**SunHex is the bridge between human identity and machine-readable certainty.**
