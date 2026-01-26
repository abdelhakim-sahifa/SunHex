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
        gender: 'Male' | 'Female' | 'Other';
    };
    createdAt: number;
}

const SESSION_KEY = 'sunhex_dev_session';
const IDENTITY_LIST_KEY = 'sunhex_identities';

export const storage = {
    // Save developer session to localStorage
    saveSession(session: DeveloperSession): void {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            this.addIdentity(session);
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

    // Multi-identity support
    addIdentity(session: DeveloperSession): void {
        try {
            const identities = this.getAllIdentities();
            // Check if already exists (by sinCode/fragment)
            if (!identities.find(id => id.sinCode === session.sinCode)) {
                identities.push(session);
                localStorage.setItem(IDENTITY_LIST_KEY, JSON.stringify(identities));
            }
        } catch (error) {
            console.error('Failed to add identity:', error);
        }
    },

    getAllIdentities(): DeveloperSession[] {
        try {
            const data = localStorage.getItem(IDENTITY_LIST_KEY);
            if (!data) return [];
            return JSON.parse(data);
        } catch (error) {
            console.error('Failed to get identities:', error);
            return [];
        }
    }
};
