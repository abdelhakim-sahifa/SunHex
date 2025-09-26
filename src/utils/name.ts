import { LETTER_TO_NUMBER, NUMBER_TO_LETTER } from "./constants";

function trimName(name: string): string {
    try {
        return name.trim().toLowerCase().split(' ')[0];
    } catch (e) {
        return "";
    }
}

export function encodeName(name: string): string {
    const trimmed = trimName(name);
    let result = "";
    
    for (const char of trimmed.toUpperCase()) {
        if (char in LETTER_TO_NUMBER) {
            result += LETTER_TO_NUMBER[char];
        } else {
            throw new Error(`Invalid character in name: ${char}`);
        }
    }
    
    // Handle overflow
    if (result.length > 26) {
        return "15220518061215230000000000";  // "OVERFLOW" + padding
    }
    
    // Pad with zeros
    return result.padEnd(26, '0');
}

export function decodeName(encodedName: string): string {
    const chunks = [];
    for (let i = 0; i < encodedName.length; i += 2) {
        chunks.push(encodedName.substr(i, 2));
    }
    
    const letters = [];
    for (const chunk of chunks) {
        if (chunk === "00") break;  // Stop at padding
        const letter = NUMBER_TO_LETTER[chunk] || "?";
        letters.push(letter);
    }
    
    return letters.join("").replace("-", "").toLowerCase()
        .replace(/^\w/, c => c.toUpperCase());
}