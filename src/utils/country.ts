import { COUNTRY_CODES } from "./constants";

export function encodeCountry(countryCode: string): string {
    const code = countryCode.toUpperCase();
    if (!(code in COUNTRY_CODES)) {
        throw new Error(`Invalid country code: ${countryCode}`);
    }
    return COUNTRY_CODES[code];
}

export function decodeCountry(encodedCountry: string): string {
    for (const [code, number] of Object.entries(COUNTRY_CODES)) {
        if (number === encodedCountry) {
            return code;
        }
    }
    return "??";
}