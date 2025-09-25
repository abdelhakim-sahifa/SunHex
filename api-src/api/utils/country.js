const { COUNTRY_CODES } = require("./constants");

function encodeCountry(countryCode) {
    const code = countryCode.toUpperCase();
    if (!(code in COUNTRY_CODES)) {
        throw new Error(`Invalid country code: ${countryCode}`);
    }
    return COUNTRY_CODES[code];
}

function decodeCountry(encodedCountry) {
    for (const [code, number] of Object.entries(COUNTRY_CODES)) {
        if (number === encodedCountry) {
            return code;
        }
    }
    return "??";
}

module.exports = {
    encodeCountry,
    decodeCountry
};