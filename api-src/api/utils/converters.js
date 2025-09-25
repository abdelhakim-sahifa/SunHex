function toHex(number) {
    return number.toString(16).toUpperCase();
}

function toInt(hexStr) {
    return parseInt(hexStr, 16);
}

module.exports = {
    toHex,
    toInt
};