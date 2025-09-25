const {
    encodeName
} = require("../utils/name");
const {
    encodeCountry
} = require("../utils/country");
const {
    encodeDate
} = require("../utils/date");
const {
    encodeGender
} = require("../utils/gender");
const {
    secureSin
} = require("../utils/security");
const {
    toHex
} = require("../utils/converters");

function generateSin(firstName, lastName, countryCode, birthYear, birthMonth, birthDay, gender, pin) {
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
            message: error.message
        };
    }
}

module.exports = {
    generateSin
};