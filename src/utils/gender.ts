export function encodeGender(gender: string): string {
    return ["male", "m", "1"].includes(gender.toLowerCase()) ? "1" : "0";
}

export function decodeGender(encodedGender: string): string {
    return encodedGender === "1" ? "Male" : "Female";
}