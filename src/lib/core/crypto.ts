/**
 * SunHex Quantum Protocol - Cryptographic Layer
 * Uses Web Crypto API for secure key derivation and encryption.
 */

const ITERATIONS = 100000;
const KEY_LEN = 32; // 256 bits

/**
 * Derives a cryptographic key from a numeric PIN using PBKDF2.
 */
export async function deriveKey(pin: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(pin),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );

    return await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt as any,
            iterations: ITERATIONS,
            hash: "SHA-256"
        },
        passwordKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

/**
 * Encrypts data using AES-GCM.
 * @returns { ciphertext: Uint8Array, iv: Uint8Array }
 */
export async function encrypt(data: Uint8Array, key: CryptoKey): Promise<{ ciphertext: Uint8Array; iv: Uint8Array }> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv as any },
        key,
        data as any
    );

    return {
        ciphertext: new Uint8Array(encrypted),
        iv: iv
    };
}

/**
 * Decrypts data using AES-GCM.
 */
export async function decrypt(ciphertext: Uint8Array, key: CryptoKey, iv: Uint8Array): Promise<Uint8Array> {
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv as any },
        key,
        ciphertext as any
    );

    return new Uint8Array(decrypted);
}

/**
 * Utility to convert hex string to Uint8Array
 */
export function hexToUint8Array(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return bytes;
}

/**
 * Utility to convert Uint8Array to hex string
 */
export function uint8ArrayToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
}
