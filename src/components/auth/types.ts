// Types for SunHex API requests and responses
export interface GenerateRequest {
  firstName: string;
  lastName: string;
  countryCode: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: "M" | "F";
  pin: string;
}

export interface GenerateResponse {
  status: "success" | "error";
  hexCode?: string;
  message?: string;
}

export interface DecodeRequest {
  hexCode: string;
  pin: string;
}

export interface DecodeResponse {
  status: "success" | "error";
  data?: {
    firstName: string;
    lastName: string;
    countryCode: string;
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    gender: "M" | "F";
  };
  message?: string;
}

export interface CountriesResponse {
  status: "success" | "error";
  countries?: string[];
  message?: string;
}

// Interface for custom storage implementation
export interface StorageAdapter {
  saveUserData: (hexCode: string, userData: Omit<GenerateRequest, "pin">) => Promise<void>;
  getUserData: (hexCode: string) => Promise<Omit<GenerateRequest, "pin"> | null>;
}