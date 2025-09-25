function encodeDate(year, month, day) {
    return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
}

function decodeDate(encodedDate) {
    if (encodedDate.length !== 8) {
        return ["????", "??", "??"];
    }
    return [
        encodedDate.substr(0, 4),
        encodedDate.substr(4, 2),
        encodedDate.substr(6, 2)
    ];
}

module.exports = {
    encodeDate,
    decodeDate
};