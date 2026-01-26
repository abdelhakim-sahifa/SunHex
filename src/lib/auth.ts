// Authentication utilities for the BaaS platform

import { storage, DeveloperSession } from './storage';

// Generate a unique API key (UUID v4 format)
export function generateApiKey(): string {
    return 'sk_' + crypto.randomUUID().replace(/-/g, '');
}

// Create a new developer session
export function createSession(
    sinCode: string,
    userData: DeveloperSession['userData']
): DeveloperSession {
    const session: DeveloperSession = {
        sinCode,
        apiKey: generateApiKey(),
        userData,
        createdAt: Date.now(),
    };

    storage.saveSession(session);
    return session;
}

// Get current authenticated developer
export function getCurrentDeveloper(): DeveloperSession | null {
    return storage.getSession();
}

// Logout developer
export function logout(): void {
    storage.clearSession();
}

// Check if developer is authenticated
export function isAuthenticated(): boolean {
    return storage.isAuthenticated();
}

// Validate API key format
export function isValidApiKey(apiKey: string): boolean {
    return /^sk_[a-f0-9]{32}$/.test(apiKey);
}

// OAuth Helpers

/**
 * Retrieves the fragment (sinCode) from the current session
 */
export function getSessionFragment(): string | null {
    const session = storage.getSession();
    return session ? session.sinCode : null;
}

/**
 * Retrieves all stored identities
 */
export function getAllIdentities(): DeveloperSession[] {
    return storage.getAllIdentities();
}
