export function encodeDate(year: number | string, month: number | string, day: number | string): string {
    return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
}

export function decodeDate(encodedDate: string): [string, string, string] {
    if (encodedDate.length !== 8) {
        return ["????", "??", "??"];
    }
    return [
        encodedDate.substr(0, 4),
        encodedDate.substr(4, 2),
        encodedDate.substr(6, 2)
    ];
}