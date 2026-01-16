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
    gender: string;
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
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    gender: string;
}

export interface ApiResult {
    status: 'success' | 'error';
    message?: string;
    hexCode?: string;
    personalInfo?: PersonalInfo;
}
