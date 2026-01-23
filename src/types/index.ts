export interface Country {
    code: string;
    name: string;
}

export interface FormData {
    firstName: string;
    lastName: string;
    countryCode: string;
    birthYear: string | number;
    birthMonth: string | number;
    birthDay: string | number;
    gender: 'Male' | 'Female' | 'Other';
    pin: string;
}

export interface DecodeData {
    hexCode: string;
    pin: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    countryCode: string;
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    gender: 'Male' | 'Female' | 'Other';
}

export interface ApiError {
    path: string;
    message: string;
}

export interface ApiResult {
    status: 'success' | 'error';
    code?: string;
    message?: string;
    errors?: ApiError[];
    hexCode?: string;
    personalInfo?: PersonalInfo;
}
