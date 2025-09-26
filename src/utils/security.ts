export function secureSin(sin: string, pin: number): string {
    const effectivePin = pin + 2025;
    const sinInt = BigInt(sin);
    const effectivePinBig = BigInt(effectivePin);
    const secured = (sinInt * effectivePinBig) + effectivePinBig;
    return secured.toString();
}

export function resolveSin(securedSin: string, pin: number): string {
    const effectivePin = pin + 2025;
    const securedInt = BigInt(securedSin);
    const effectivePinBig = BigInt(effectivePin);
    const original = (securedInt - effectivePinBig) / effectivePinBig;
    return original.toString();
}