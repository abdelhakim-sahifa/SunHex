import { decodeName } from "../utils/name";
import { decodeCountry } from "../utils/country";
import { decodeDate } from "../utils/date";
import { decodeGender } from "../utils/gender";
import { resolveSin } from "../utils/security";

interface PersonalInfo {
    firstName: string;
    lastName: string;
    countryCode: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    gender: string;
}

interface DebugInfo {
    hexCode: string;
    securedSin: string;
    originalSin: string;
    rawComponents: {
        verifier: string;
        firstNameEncoded: string;
        lastNameEncoded: string;
        countryEncoded: string;
        dateEncoded: string;
        genderEncoded: string;
    };
}

interface SuccessResponse {
    status: "success";
    personalInfo: PersonalInfo;
    debugInfo: DebugInfo;
}

interface ErrorResponse {
    status: "error";
    message: string;
}

type DecodeSinResponse = SuccessResponse | ErrorResponse;

export function decodeSin(hexCode: string, pin: number): DecodeSinResponse {
    try {
        // Convert HEX to secured SIN
        const securedSin = BigInt(`0x${hexCode}`).toString();

        // Resolve the secured SIN with PIN
        const originalSin = resolveSin(securedSin, pin);

        // Validate format (should be 66 characters)
        if (originalSin.length !== 66) {
            return {
                status: "error",
                message: `Invalid SIN length after decoding: ${originalSin.length} (expected 66)`
            };
        }

        // Check verifier
        if (originalSin[0] !== "1") {
            return {
                status: "error",
                message: "Invalid SIN format: incorrect verifier"
            };
        }

        // Extract components
        const verifier = originalSin[0];
        const firstNameEncoded = originalSin.substr(1, 26);
        const lastNameEncoded = originalSin.substr(27, 26);
        const countryEncoded = originalSin.substr(53, 4);
        const dateEncoded = originalSin.substr(57, 8);
        const genderEncoded = originalSin.substr(65, 1);

        // Decode components
        const firstName = decodeName(firstNameEncoded);
        const lastName = decodeName(lastNameEncoded);
        const countryCode = decodeCountry(countryEncoded);
        const [year, month, day] = decodeDate(dateEncoded);
        const gender = decodeGender(genderEncoded);

        return {
            status: "success",
            personalInfo: {
                firstName,
                lastName,
                countryCode,
                birthYear: year,
                birthMonth: month,
                birthDay: day,
                gender
            },
            debugInfo: {
                hexCode,
                securedSin,
                originalSin,
                rawComponents: {
                    verifier,
                    firstNameEncoded,
                    lastNameEncoded,
                    countryEncoded,
                    dateEncoded,
                    genderEncoded
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