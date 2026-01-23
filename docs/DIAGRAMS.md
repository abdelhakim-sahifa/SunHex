# System Diagrams Documentation

This document contains Mermaid diagrams visualizing the SunHex Quantum Protocol API architecture, data flows, and request sequences.

## 1. System Architecture Diagram

### Component Overview

```mermaid
graph TB
    subgraph "Client Layer"
        Client[HTTP Client]
    end
    
    subgraph "Next.js API Layer"
        Router[Next.js App Router]
        Generate["/api/generate<br/>route.ts"]
        Decode["/api/decode<br/>route.ts"]
        Countries["/api/countries<br/>route.ts"]
        Health["/api/health<br/>route.ts"]
    end
    
    subgraph "Validation Layer"
        ZodGenerate["QuantumSinSchema<br/>(Zod)"]
        ZodDecode["DecodeSchema<br/>(Zod)"]
    end
    
    subgraph "Service Layer"
        QuantumService["quantum.ts<br/>generateQuantumSin()<br/>decodeQuantumSin()"]
    end
    
    subgraph "Core Libraries"
        Protocol["protocol.ts<br/>pack() / unpack()"]
        Crypto["crypto.ts<br/>deriveKey()<br/>encrypt() / decrypt()"]
        Constants["constants.ts<br/>COUNTRY_CODES"]
    end
    
    subgraph "Browser APIs"
        WebCrypto["Web Crypto API<br/>PBKDF2 + AES-GCM"]
    end
    
    Client --> Router
    Router --> Generate
    Router --> Decode
    Router --> Countries
    Router --> Health
    
    Generate --> ZodGenerate
    Decode --> ZodDecode
    
    ZodGenerate --> QuantumService
    ZodDecode --> QuantumService
    
    QuantumService --> Protocol
    QuantumService --> Crypto
    
    Protocol --> Constants
    Crypto --> WebCrypto
    
    Countries --> Constants
    
    style Generate fill:#e1f5ff
    style Decode fill:#e1f5ff
    style Countries fill:#f0f0f0
    style Health fill:#f0f0f0
    style QuantumService fill:#fff4e1
    style Protocol fill:#ffe1f5
    style Crypto fill:#ffe1f5
```

## 2. Request Flow Sequence Diagrams

### Generate Quantum SIN Sequence

```mermaid
sequenceDiagram
    participant Client
    participant Route as /api/generate
    participant Zod as QuantumSinSchema
    participant Service as quantum.ts
    participant Protocol as protocol.ts
    participant Crypto as crypto.ts
    participant WebCrypto as Web Crypto API
    
    Client->>Route: POST { firstName, lastName, ... }
    Route->>Route: Parse JSON body
    Route->>Zod: safeParse(body)
    
    alt Validation Fails
        Zod-->>Route: validation.success = false
        Route-->>Client: 400 { status: "error", errors: [...] }
    else Validation Succeeds
        Zod-->>Route: validation.success = true
        Route->>Service: generateQuantumSin(info, pin)
        
        Service->>Protocol: pack(personalInfo)
        Protocol->>Protocol: Encode to binary format
        Protocol-->>Service: Uint8Array (packed data)
        
        Service->>WebCrypto: getRandomValues(8 bytes)
        WebCrypto-->>Service: salt
        
        Service->>Crypto: deriveKey(pin, salt)
        Crypto->>WebCrypto: PBKDF2 (100k iterations)
        WebCrypto-->>Crypto: CryptoKey
        Crypto-->>Service: key
        
        Service->>WebCrypto: getRandomValues(12 bytes)
        WebCrypto-->>Service: iv
        
        Service->>Crypto: encrypt(packed, key)
        Crypto->>WebCrypto: AES-GCM encrypt
        WebCrypto-->>Crypto: ciphertext + tag
        Crypto-->>Service: { ciphertext, iv }
        
        Service->>Service: Construct payload<br/>[VERSION|SALT|IV|CIPHERTEXT]
        Service->>Crypto: uint8ArrayToHex(payload)
        Crypto-->>Service: hexCode
        
        Service-->>Route: { status: "success", hexCode }
        Route-->>Client: 200 { status: "success", hexCode }
    end
```

### Decode Quantum SIN Sequence

```mermaid
sequenceDiagram
    participant Client
    participant Route as /api/decode
    participant Zod as DecodeSchema
    participant Service as quantum.ts
    participant Crypto as crypto.ts
    participant WebCrypto as Web Crypto API
    participant Protocol as protocol.ts
    
    Client->>Route: POST { hexCode, pin }
    Route->>Route: Parse JSON body
    Route->>Zod: safeParse(body)
    
    alt Validation Fails
        Zod-->>Route: validation.success = false
        Route-->>Client: 400 { status: "error", errors: [...] }
    else Validation Succeeds
        Zod-->>Route: validation.success = true
        Route->>Service: decodeQuantumSin(hexCode, pin)
        
        Service->>Crypto: hexToUint8Array(hexCode)
        Crypto-->>Service: fullBuffer
        
        Service->>Service: Validate protocol version<br/>(buffer[0] === 2)
        
        alt Invalid Version
            Service-->>Route: { status: "error", message: "Invalid..." }
            Route-->>Client: 400 { status: "error", ... }
        else Valid Version
            Service->>Service: Extract salt, iv, ciphertext
            
            Service->>Crypto: deriveKey(pin, salt)
            Crypto->>WebCrypto: PBKDF2 (100k iterations)
            WebCrypto-->>Crypto: CryptoKey
            Crypto-->>Service: key
            
            Service->>Crypto: decrypt(ciphertext, key, iv)
            Crypto->>WebCrypto: AES-GCM decrypt
            
            alt Decryption Fails (wrong PIN/corrupted data)
                WebCrypto-->>Crypto: Error
                Crypto-->>Service: Error
                Service-->>Route: { status: "error", message: "Invalid PIN..." }
                Route-->>Client: 400 { status: "error", ... }
            else Decryption Succeeds
                WebCrypto-->>Crypto: decrypted bytes
                Crypto-->>Service: Uint8Array
                
                Service->>Protocol: unpack(decrypted)
                Protocol->>Protocol: Decode binary to PersonalInfo
                Protocol-->>Service: personalInfo object
                
                Service-->>Route: { status: "success", personalInfo }
                Route-->>Client: 200 { status: "success", personalInfo }
            end
        end
    end
```

### Countries Request Sequence

```mermaid
sequenceDiagram
    participant Client
    participant Route as /api/countries
    participant Constants as constants.ts
    
    Client->>Route: GET /api/countries
    Route->>Constants: Access COUNTRY_CODES
    Constants-->>Route: { 'US': '...', 'FR': '...', ... }
    Route->>Route: Object.keys().sort()
    Route-->>Client: 200 { status: "success", countries: [...] }
```

### Health Check Sequence

```mermaid
sequenceDiagram
    participant Client
    participant Route as /api/health
    
    Client->>Route: GET /api/health
    
    alt No Errors
        Route->>Route: new Date().toISOString()
        Route-->>Client: 200 { status: "success", message, timestamp }
    else Exception Occurs
        Route-->>Client: 503 { status: "error", message, timestamp }
    end
```

## 3. Data Flow Diagrams

### Encryption Data Flow

```mermaid
flowchart LR
    subgraph Input
        A["PersonalInfo Object<br/>{firstName, lastName, ...}"]
    end
    
    subgraph Serialization
        B["Binary Protocol<br/>pack()"]
        C["Uint8Array<br/>[VERSION|GENDER|COUNTRY|DATE|NAME]"]
    end
    
    subgraph "Key Derivation"
        D["PIN + Random Salt"]
        E["PBKDF2<br/>100k iterations"]
        F["256-bit AES Key"]
    end
    
    subgraph Encryption
        G["Random IV<br/>12 bytes"]
        H["AES-GCM<br/>Encrypt"]
        I["Ciphertext + Tag"]
    end
    
    subgraph "Payload Construction"
        J["Combine:<br/>[VERSION|SALT|IV|CIPHERTEXT]"]
        K["Convert to Hex"]
        L["Hex String Output"]
    end
    
    A --> B
    B --> C
    C --> H
    D --> E
    E --> F
    F --> H
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    
    style A fill:#e1f5ff
    style L fill:#c8e6c9
```

### Decryption Data Flow

```mermaid
flowchart LR
    subgraph Input
        A["Hex String + PIN"]
    end
    
    subgraph Parsing
        B["Hex to Bytes"]
        C["Extract Components"]
        D["Version<br/>Salt<br/>IV<br/>Ciphertext"]
    end
    
    subgraph "Key Derivation"
        E["PIN + Extracted Salt"]
        F["PBKDF2<br/>100k iterations"]
        G["256-bit AES Key"]
    end
    
    subgraph Decryption
        H["AES-GCM<br/>Decrypt"]
        I["Decrypted Bytes"]
    end
    
    subgraph Deserialization
        J["Binary Protocol<br/>unpack()"]
        K["PersonalInfo Object"]
    end
    
    A --> B
    B --> C
    C --> D
    D --> H
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
    
    style A fill:#e1f5ff
    style K fill:#c8e6c9
```

## 4. Cryptographic Process Diagram

### PBKDF2 Key Derivation + AES-GCM Encryption

```mermaid
flowchart TB
    subgraph "Step 1: Key Derivation"
        PIN["User PIN<br/>(4-6 digits)"]
        Salt["Random Salt<br/>(8 bytes)"]
        PBKDF2["PBKDF2-SHA256<br/>100,000 iterations"]
        Key["AES-256 Key<br/>(32 bytes)"]
        
        PIN --> PBKDF2
        Salt --> PBKDF2
        PBKDF2 --> Key
    end
    
    subgraph "Step 2: Encryption"
        Plaintext["Packed Personal Data<br/>(Uint8Array)"]
        IV["Random IV<br/>(12 bytes)"]
        AES["AES-GCM<br/>256-bit"]
        Ciphertext["Ciphertext + Auth Tag<br/>(Variable length)"]
        
        Plaintext --> AES
        Key --> AES
        IV --> AES
        AES --> Ciphertext
    end
    
    subgraph "Step 3: Payload Assembly"
        Version["Protocol Version<br/>(1 byte: 0x02)"]
        Final["Final Payload"]
        
        Version --> Final
        Salt --> Final
        IV --> Final
        Ciphertext --> Final
    end
    
    subgraph "Step 4: Encoding"
        Hex["Hex String<br/>(Uppercase)"]
        
        Final --> Hex
    end
    
    style PIN fill:#fff4e1
    style Key fill:#ffe1e1
    style Ciphertext fill:#e1ffe1
    style Hex fill:#c8e6c9
```

## 5. Error Handling Flow

```mermaid
flowchart TD
    Start["API Request"] --> Parse["Parse JSON Body"]
    
    Parse -->|Success| Validate["Zod Validation"]
    Parse -->|Fail| JsonError["Return: Invalid JSON"]
    
    Validate -->|"validation.success = false"| ValError["Return 400:<br/>VALIDATION_ERROR<br/>with errors array"]
    Validate -->|"validation.success = true"| Process["Process Request"]
    
    Process --> TryCatch{"Try/Catch"}
    
    TryCatch -->|Exception| CatchError["Return 400:<br/>Error message"]
    TryCatch -->|Success| ServiceResult["Service Layer Result"]
    
    ServiceResult --> CheckStatus{"Check result.status"}
    
    CheckStatus -->|"error"| ServiceError["Return 400:<br/>Service error message"]
    CheckStatus -->|"success"| Success["Return 200:<br/>Success response"]
    
    style ValError fill:#ffcccc
    style CatchError fill:#ffcccc
    style ServiceError fill:#ffcccc
    style Success fill:#ccffcc
```

## 6. Binary Protocol Structure

### Encrypted Payload Layout

```mermaid
graph LR
    subgraph "Encrypted Quantum SIN Structure"
        V["VERSION<br/>1 byte<br/>Value: 2"]
        S["SALT<br/>8 bytes<br/>Random"]
        I["IV<br/>12 bytes<br/>Random"]
        C["CIPHERTEXT + TAG<br/>Variable length<br/>Encrypted data"]
    end
    
    V --> S
    S --> I
    I --> C
    
    style V fill:#e3f2fd
    style S fill:#fff3e0
    style I fill:#f3e5f5
    style C fill:#e8f5e9
```

### Personal Info Binary Format (Before Encryption)

```mermaid
graph LR
    subgraph "Packed PersonalInfo Structure"
        DV["VERSION<br/>1 byte<br/>Value: 1"]
        G["GENDER<br/>1 byte<br/>1/2/3"]
        CI["COUNTRY IDX<br/>2 bytes<br/>Big-endian"]
        BD["BIRTH DATE<br/>2 bytes<br/>Days since 1900"]
        NL["NAME LEN<br/>1 byte<br/>Length"]
        NB["NAME BYTES<br/>Variable<br/>UTF-8 encoded"]
    end
    
    DV --> G
    G --> CI
    CI --> BD
    BD --> NL
    NL --> NB
    
    style DV fill:#e3f2fd
    style G fill:#fce4ec
    style CI fill:#fff3e0
    style BD fill:#e1f5fe
    style NL fill:#f3e5f5
    style NB fill:#e8f5e9
```

## 7. State Diagram

### API Request States

```mermaid
stateDiagram-v2
    [*] --> Received: HTTP Request
    
    Received --> Parsing: Parse body
    
    Parsing --> Validating: Parse success
    Parsing --> Error: Parse fail
    
    Validating --> Processing: Validation pass
    Validating --> Error: Validation fail
    
    Processing --> Success: Process complete
    Processing --> Error: Process fail
    
    Success --> [*]: Return 200
    Error --> [*]: Return 400/503
    
    note right of Processing
        - Encryption/Decryption
        - Data transformation
        - Service layer calls
    end note
```

## Diagram Notes

### Rendering

All diagrams use **Mermaid** syntax and should render in:
- GitHub
- GitLab
- Markdown viewers with Mermaid support
- Documentation platforms (Docusaurus, MkDocs, etc.)

### Accuracy

All diagrams are based on **actual code implementation**. They reflect:
- Real file structure (`src/app/api/`, `src/lib/`, etc.)
- Actual function names (`pack()`, `encrypt()`, etc.)
- True data flows and transformations
- Correct cryptographic parameters (iterations, sizes, etc.)

### Not Included

These diagrams do **not** show:
- Authentication flows (not implemented)
- Database interactions (not applicable)
- Caching layers (not present)
- External API calls (none made)
- Deployment architecture (not determinable from code)

---

**Note**: All diagrams are generated based solely on the codebase implementation. No speculative or assumed components are included.
