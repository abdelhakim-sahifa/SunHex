'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Key, ArrowRight, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { createSession, isAuthenticated } from '@/lib/auth';
import { GenerateRequest, GenerateResponse, CountriesResponse } from '@/components/auth/types';

export default function SignUpPage() {
    const router = useRouter();
    const [countries, setCountries] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [apiKey, setApiKey] = useState<string>('');

    const [formData, setFormData] = useState<GenerateRequest>({
        firstName: '',
        lastName: '',
        countryCode: '',
        birthYear: new Date().getFullYear() - 25,
        birthMonth: 1,
        birthDay: 1,
        gender: 'M',
        pin: ''
    });

    // Check if already authenticated
    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/dashboard');
        }
    }, [router]);

    // Fetch available countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('/api/countries');
                const data: CountriesResponse = await response.json();
                if (data.status === 'success' && data.countries) {
                    setCountries(data.countries);
                }
            } catch (err) {
                console.error('Error fetching countries:', err);
            }
        };

        fetchCountries();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Validate PIN
            if (!/^\d{4,6}$/.test(formData.pin)) {
                throw new Error('PIN must be 4-6 digits');
            }

            // Call API to generate SIN
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data: GenerateResponse = await response.json();

            if (data.status === 'success' && data.hexCode) {
                // Create session with API key
                const { pin, ...userData } = formData;
                const session = createSession(data.hexCode, userData);

                setApiKey(session.apiKey);
                setStep('success');
            } else {
                throw new Error(data.message || 'Failed to create account');
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

    const handleContinueToDashboard = () => {
        router.push('/dashboard');
    };

    if (step === 'success') {
        return (
            <>
                <div className="bg-animation">
                    <ClientBackgroundAnimation />
                </div>

                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full bg-bg-secondary border border-accent-primary/30 rounded-2xl p-8 md:p-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-accent-primary/20 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-accent-primary" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
                            Welcome to SunHex! 🎉
                        </h1>

                        <p className="text-lg text-text-secondary mb-8">
                            Your developer account has been created successfully.
                        </p>

                        <div className="bg-bg-tertiary border border-border rounded-xl p-6 mb-8">
                            <div className="flex items-center gap-2 mb-4 text-text-secondary">
                                <Key className="w-5 h-5" />
                                <span className="text-sm font-medium">Your API Key</span>
                            </div>
                            <div className="flex items-center gap-2 bg-bg-primary border border-accent-primary/30 rounded-lg p-4">
                                <code className="flex-1 font-mono text-sm text-accent-primary overflow-x-auto">
                                    {apiKey}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(apiKey);
                                    }}
                                    className="px-4 py-2 bg-accent-gradient text-bg-primary text-sm font-medium rounded-md hover:shadow-lg transition-shadow"
                                >
                                    Copy
                                </button>
                            </div>
                            <p className="text-xs text-text-muted mt-3">
                                Keep this key secure. You'll need it to make API calls.
                            </p>
                        </div>

                        <button
                            onClick={handleContinueToDashboard}
                            className="group px-8 py-4 rounded-md bg-accent-gradient text-bg-primary font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] inline-flex items-center gap-2"
                        >
                            Continue to Dashboard
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="bg-animation">
                <ClientBackgroundAnimation />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-bg-primary/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button onClick={() => router.push('/')} className="flex items-center gap-2">
                            <Image src="/favicon.png" alt="SunHex" width={32} height={32} className="w-8 h-8" />
                            <span className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-accent-gradient">
                                SunHex
                            </span>
                        </button>
                        <button
                            onClick={() => router.push('/docs')}
                            className="text-text-secondary hover:text-text-primary transition-colors font-medium"
                        >
                            Documentation
                        </button>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen flex items-center justify-center p-4 pt-24">
                <div className="max-w-2xl w-full bg-bg-secondary border border-border rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-text-primary">
                            Create Your Developer Account
                        </h1>
                        <p className="text-text-secondary">
                            Get your API key in seconds and start building.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                    placeholder="John"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="countryCode" className="block text-sm font-medium text-text-primary mb-2">
                                Country
                            </label>
                            <select
                                id="countryCode"
                                name="countryCode"
                                required
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                            >
                                <option value="">Select your country</option>
                                {countries.map(code => (
                                    <option key={code} value={code}>{code}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="birthYear" className="block text-sm font-medium text-text-primary mb-2">
                                    Birth Year
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
                                    className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="birthMonth" className="block text-sm font-medium text-text-primary mb-2">
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
                                    className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="birthDay" className="block text-sm font-medium text-text-primary mb-2">
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
                                    className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-text-primary mb-2">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                required
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                            >
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="pin" className="block text-sm font-medium text-text-primary mb-2">
                                Create a PIN (4-6 digits)
                            </label>
                            <input
                                type="password"
                                id="pin"
                                name="pin"
                                required
                                pattern="\d{4,6}"
                                value={formData.pin}
                                onChange={handleChange}
                                className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-mono tracking-widest text-center text-2xl"
                                placeholder="••••"
                            />
                            <p className="text-xs text-text-muted mt-1">
                                This PIN secures your account. Don't forget it!
                            </p>
                        </div>

                        {error && (
                            <div className="text-error-color text-sm p-3 bg-red-500/10 border border-error-color rounded-md">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full p-4 rounded-md bg-accent-gradient text-bg-primary font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <Key className="w-5 h-5" />
                                    Get My API Key
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
