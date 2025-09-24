function secureSin(sin, pin) {
    const effectivePin = pin + 2025;
    const sinInt = BigInt(sin);
    const effectivePinBig = BigInt(effectivePin);
    const secured = (sinInt * effectivePinBig) + effectivePinBig;
    return secured.toString();
}

function resolveSin(securedSin, pin) {
    const effectivePin = pin + 2025;
    const securedInt = BigInt(securedSin);
    const effectivePinBig = BigInt(effectivePin);
    const original = (securedInt - effectivePinBig) / effectivePinBig;
    return original.toString();
}

module.exports = {
    secureSin,
    resolveSin
};