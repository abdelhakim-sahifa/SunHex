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
      if (!/^\d{4,6}$/.test(formData.pin)) {
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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4">
        <div>
          <label htmlFor="hexCode" className="block text-sm font-medium text-text-primary mb-1">
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
            className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-mono"
          />
        </div>

        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-text-primary mb-1">
            PIN (4-6 digits)
          </label>
          <input
            type="password"
            id="pin"
            name="pin"
            required
            pattern="\d{4,6}"
            value={formData.pin}
            onChange={handleChange}
            className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-mono tracking-widest text-center"
          />
        </div>

        {error && (
          <div className="text-error-color text-sm p-3 bg-red-500/10 border border-error-color rounded-md">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-4 rounded-md bg-accent-gradient text-bg-primary font-bold text-base transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};
