import React, { useEffect, useState } from 'react';
import { GenerateRequest, GenerateResponse, CountriesResponse, StorageAdapter } from './types';

interface SignUpFormProps {
  onSignUpSuccess?: (hexCode: string) => void;
  storageAdapter?: StorageAdapter;
  customEndpoint?: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ 
  onSignUpSuccess, 
  storageAdapter,
  customEndpoint = 'https://sunhex.vercel.app/api'
}) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<GenerateRequest>({
    firstName: '',
    lastName: '',
    countryCode: '',
    birthYear: new Date().getFullYear(),
    birthMonth: 1,
    birthDay: 1,
    gender: 'M',
    pin: ''
  });

  // Fetch available countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${customEndpoint}/countries`);
        const data: CountriesResponse = await response.json();
        if (data.status === 'success' && data.countries) {
          setCountries(data.countries);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };

    fetchCountries();
  }, [customEndpoint]);

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
      const response = await fetch(`${customEndpoint}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: GenerateResponse = await response.json();

      if (data.status === 'success' && data.hexCode) {
        // If custom storage adapter is provided, save user data
        if (storageAdapter) {
          const { pin, ...userData } = formData;
          await storageAdapter.saveUserData(data.hexCode, userData);
        }

        // Call success callback if provided
        onSignUpSuccess?.(data.hexCode);
      } else {
        throw new Error(data.message || 'Failed to generate SIN code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['birthYear', 'birthMonth', 'birthDay'].includes(name) ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="countryCode"
            name="countryCode"
            required
            value={formData.countryCode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a country</option>
            {countries.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="number"
              id="birthYear"
              name="birthYear"
              required
              min="1900"
              max={new Date().getFullYear()}
              value={formData.birthYear}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700">
              Month
            </label>
            <input
              type="number"
              id="birthMonth"
              name="birthMonth"
              required
              min="1"
              max="12"
              value={formData.birthMonth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="birthDay" className="block text-sm font-medium text-gray-700">
              Day
            </label>
            <input
              type="number"
              id="birthDay"
              name="birthDay"
              required
              min="1"
              max="31"
              value={formData.birthDay}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
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
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};