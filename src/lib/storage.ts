// Storage utilities for managing developer sessions in localStorage

export interface DeveloperSession {
    sinCode: string;
    apiKey: string;
    userData: {
        firstName: string;
        lastName: string;
        countryCode: string;
        birthYear: number;
        birthMonth: number;
        birthDay: number;
        gender: 'M' | 'F';
    };
    createdAt: number;
}

const SESSION_KEY = 'sunhex_dev_session';

export const storage = {
    // Save developer session to localStorage
    saveSession(session: DeveloperSession): void {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch (error) {
            console.error('Failed to save session:', error);
        }
    },

    // Get current developer session
    getSession(): DeveloperSession | null {
        try {
            const data = localStorage.getItem(SESSION_KEY);
            if (!data) return null;
            return JSON.parse(data);
        } catch (error) {
            console.error('Failed to get session:', error);
            return null;
        }
    },

    // Clear developer session
    clearSession(): void {
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch (error) {
            console.error('Failed to clear session:', error);
        }
    },

    // Check if developer is authenticated
    isAuthenticated(): boolean {
        return this.getSession() !== null;
    },
};
