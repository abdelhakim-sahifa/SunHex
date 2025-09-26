import { encodeName } from "../utils/name";
import { encodeCountry } from "../utils/country";
import { encodeDate } from "../utils/date";
import { encodeGender } from "../utils/gender";
import { secureSin } from "../utils/security";

export function toHex(bigInt: bigint): string {
    return bigInt.toString(16).toUpperCase();
}

interface DebugInfo {
    originalSin: string;
    securedSin: string;
    components: {
        firstName: string;
        lastName: string;
        country: string;
        date: string;
        gender: string;
    };
}

interface SuccessResponse {
    status: "success";
    hexCode: string;
    debugInfo: DebugInfo;
}

interface ErrorResponse {
    status: "error";
    message: string;
}

type GenerateSinResponse = SuccessResponse | ErrorResponse;

export function generateSin(
    firstName: string,
    lastName: string,
    countryCode: string,
    birthYear: number | string,
    birthMonth: number | string,
    birthDay: number | string,
    gender: string,
    pin: number
): GenerateSinResponse {
    try {
        // Encode all components
        const encodedFirst = encodeName(firstName);
        const encodedLast = encodeName(lastName);
        const encodedCountry = encodeCountry(countryCode);
        const encodedDate = encodeDate(birthYear, birthMonth, birthDay);
        const encodedGender = encodeGender(gender);

        // Build SIN: verifier(1) + first_name(26) + last_name(26) + country(4) + date(8) + gender(1)
        const sin = "1" + encodedFirst + encodedLast + encodedCountry + encodedDate + encodedGender;

        // Secure with PIN FIRST, then convert to HEX
        const securedSin = secureSin(sin, pin);
        const hexCode = toHex(BigInt(securedSin));

        return {
            status: "success",
            hexCode: hexCode,
            debugInfo: {
                originalSin: sin,
                securedSin: securedSin,
                components: {
                    firstName: encodedFirst,
                    lastName: encodedLast,
                    country: encodedCountry,
                    date: encodedDate,
                    gender: encodedGender
                }
            }
        };
    } catch (error) {
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}