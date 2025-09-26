export function secureSin(sin: string, pin: number): string {
    const effectivePin = pin + 2025;
    return sin.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(charCode + effectivePin);
    }).join('');
}

export function resolveSin(securedSin: string, pin: number): string {
    const effectivePin = pin + 2025;
    return securedSin.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(charCode - effectivePin);
    }).join('');
}