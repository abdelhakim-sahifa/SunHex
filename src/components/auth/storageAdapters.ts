// Example storage adapter using local storage
import { StorageAdapter } from './types';

export class LocalStorageAdapter implements StorageAdapter {
  private readonly storageKey = 'sunhex_user_data';

  async saveUserData(hexCode: string, userData: any): Promise<void> {
    const storage = this.getStorage();
    storage[hexCode] = userData;
    localStorage.setItem(this.storageKey, JSON.stringify(storage));
  }

  async getUserData(hexCode: string): Promise<any> {
    const storage = this.getStorage();
    return storage[hexCode] || null;
  }

  private getStorage(): Record<string, any> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }
}

// Example storage adapter using a REST API
export class ApiStorageAdapter implements StorageAdapter {
  constructor(private apiBaseUrl: string) {}

  async saveUserData(hexCode: string, userData: any): Promise<void> {
    await fetch(`${this.apiBaseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hexCode,
        ...userData,
      }),
    });
  }

  async getUserData(hexCode: string): Promise<any> {
    const response = await fetch(`${this.apiBaseUrl}/users/${hexCode}`);
    if (!response.ok) return null;
    return response.json();
  }
}