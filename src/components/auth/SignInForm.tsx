import React, { useState } from 'react';
import { DecodeRequest, DecodeResponse, StorageAdapter } from './types';

interface SignInFormProps {
  onSignInSuccess?: (userData: DecodeResponse['data']) => void;
  storageAdapter?: StorageAdapter;
  customEndpoint?: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({ 
  onSignInSuccess, 
  storageAdapter,
  customEndpoint = 'https://sunhex.vercel.app/api'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<DecodeRequest>({
    hexCode: '',
    pin: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate PIN
      if (!/^\\d{4,6}$/.test(formData.pin)) {
        throw new Error('PIN must be 4-6 digits');
      }

      // Send request to SunHex API
      const response = await fetch(`${customEndpoint}/decode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: DecodeResponse = await response.json();

      if (data.status === 'success' && data.data) {
        // If custom storage adapter is provided, get additional user data
        if (storageAdapter) {
          const storedData = await storageAdapter.getUserData(formData.hexCode);
          if (storedData) {
            // Merge API response with stored data if needed
            // You can extend this based on your needs
          }
        }

        // Call success callback if provided
        onSignInSuccess?.(data.data);
      } else {
        throw new Error(data.message || 'Failed to authenticate');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="hexCode" className="block text-sm font-medium text-gray-700">
            SIN Code
          </label>
          <input
            type="text"
            id="hexCode"
            name="hexCode"
            required
            value={formData.hexCode}
            onChange={handleChange}
            placeholder="Enter your SIN code"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
            PIN (4-6 digits)
          </label>
          <input
            type="password"
            id="pin"
            name="pin"
            required
            pattern="\\d{4,6}"
            value={formData.pin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};