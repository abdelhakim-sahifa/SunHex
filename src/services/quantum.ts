/**
 * SunHex Quantum Protocol - Orchestration Service
 * Connects crystallization and encryption into the final SunHex experience.
 */

import * as Crypto from "../lib/core/crypto";
import * as Protocol from "../lib/core/protocol";

const PROTOCOL_VERSION = 2; // Modern Quantum Protocol

export interface QuantumSinResponse {
    status: "success" | "error";
    hexCode?: string;
    personalInfo?: Protocol.PersonalInfo;
    message?: string;
}

/**
 * Generates a Quantum SIN from personal information and a PIN.
 */
export async function generateQuantumSin(
    info: Protocol.PersonalInfo,
    pin: string
): Promise<QuantumSinResponse> {
    try {
        // 1. Pack data
        const packed = Protocol.pack(info);

        // 2. Generate Salt and derive Key
        const salt = crypto.getRandomValues(new Uint8Array(8));
        const key = await Crypto.deriveKey(pin, salt);

        // 3. Encrypt
        const { ciphertext, iv } = await Crypto.encrypt(packed, key);

        // 4. Construct final payload
        // Format: [VERSION:1][SALT:8][IV:12][CIPHERTEXT+TAG:?]
        const finalBuffer = new Uint8Array(1 + 8 + 12 + ciphertext.length);
        finalBuffer[0] = PROTOCOL_VERSION;
        finalBuffer.set(salt, 1);
        finalBuffer.set(iv, 9);
        finalBuffer.set(ciphertext, 21);

        return {
            status: "success",
            hexCode: Crypto.uint8ArrayToHex(finalBuffer)
        };
    } catch (error) {
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Failed to generate SIN"
        };
    }
}

/**
 * Decodes a Quantum SIN using a PIN.
 */
export async function decodeQuantumSin(
    hexCode: string,
    pin: string
): Promise<QuantumSinResponse> {
    try {
        const fullBuffer = Crypto.hexToUint8Array(hexCode);

        // 1. Validate version
        if (fullBuffer[0] !== PROTOCOL_VERSION) {
            throw new Error(`Invalid protocol version: ${fullBuffer[0]}`);
        }

        // 2. Extract components
        const salt = fullBuffer.slice(1, 9);
        const iv = fullBuffer.slice(9, 21);
        const ciphertext = fullBuffer.slice(21);

        // 3. Derive Key
        const key = await Crypto.deriveKey(pin, salt);

        // 4. Decrypt
        const decrypted = await Crypto.decrypt(ciphertext, key, iv);

        // 5. Unpack
        const personalInfo = Protocol.unpack(decrypted);

        return {
            status: "success",
            personalInfo
        };
    } catch (error) {
        return {
            status: "error",
            message: "Invalid PIN or corrupted SIN code" // Generic error for security
        };
    }
}
