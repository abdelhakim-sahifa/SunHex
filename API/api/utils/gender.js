function encodeGender(gender) {
    return ["male", "m", "1"].includes(gender.toLowerCase()) ? "1" : "0";
}

function decodeGender(encodedGender) {
    return encodedGender === "1" ? "Male" : "Female";
}

module.exports = {
    encodeGender,
    decodeGender
};