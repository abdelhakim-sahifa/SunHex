import { z } from "zod";
import { COUNTRY_CODES } from "../core/constants";

/**
 * Validates that a date composition is a real calendar date.
 */
const isValidDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};

export const QuantumSinSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required").max(50, "First name too long"),
    lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name too long"),
    countryCode: z.string().toUpperCase().refine((code) => code in COUNTRY_CODES, {
        message: "Invalid country code",
    }),
    birthYear: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
    birthMonth: z.coerce.number().int().min(1).max(12),
    birthDay: z.coerce.number().int().min(1).max(31),
    gender: z.enum(["Male", "Female", "Other"]),
    pin: z.coerce.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits"),
}).refine((data) => isValidDate(data.birthYear, data.birthMonth, data.birthDay), {
    message: "Invalid birth date (e.g., February 31st)",
    path: ["birthDay"],
});

export const DecodeSchema = z.object({
    hexCode: z.string().min(1, "Hex code is required").regex(/^[0-9a-fA-F]+$/, "Invalid hex format"),
    pin: z.coerce.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits"),
});

export type QuantumSinInput = z.infer<typeof QuantumSinSchema>;
export type DecodeInput = z.infer<typeof DecodeSchema>;
