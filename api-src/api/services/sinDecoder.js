const {
    decodeName
} = require("../utils/name");
const {
    decodeCountry
} = require("../utils/country");
const {
    decodeDate
} = require("../utils/date");
const {
    decodeGender
} = require("../utils/gender");
const {
    resolveSin
} = require("../utils/security");

function decodeSin(hexCode, pin) {
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
                firstName: firstName,
                lastName: lastName,
                countryCode: countryCode,
                birthYear: year,
                birthMonth: month,
                birthDay: day,
                gender: gender
            },
            debugInfo: {
                hexCode: hexCode,
                securedSin: securedSin,
                originalSin: originalSin,
                rawComponents: {
                    verifier: verifier,
                    firstNameEncoded: firstNameEncoded,
                    lastNameEncoded: lastNameEncoded,
                    countryEncoded: countryEncoded,
                    dateEncoded: dateEncoded,
                    genderEncoded: genderEncoded
                }
            }
        };
    } catch (error) {
        return {
            status: "error",
            message: error.message
        };
    }
}

module.exports = {
    decodeSin
};