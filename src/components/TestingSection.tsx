'use client';

import { useState } from 'react';
import { COUNTRIES_LIST } from '@/data/countries';
import { FormData, DecodeData, ApiResult } from '@/types';

export default function TestingSection() {
    const [activeTab, setActiveTab] = useState<'generate' | 'decode'>('generate');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ApiResult | null>(null);

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        countryCode: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: '',
        pin: ''
    });

    const [decodeData, setDecodeData] = useState<DecodeData>({
        hexCode: '',
        pin: ''
    });

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({
                status: 'error',
                message: 'Failed to generate SIN code. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDecode = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/decode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(decodeData),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({
                status: 'error',
                message: 'Failed to decode SIN code. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="testing" className="py-20">
            <div className="text-center mb-16 px-4">
                <h2 className="section-title">Try It Out</h2>
                <p className="text-lg text-text-secondary">
                    Test our API with this interactive demo
                </p>
            </div>
            <div className="max-w-[800px] mx-auto px-4 md:px-8">
                <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden shadow-lg backdrop-blur-md">
                    <div className="flex border-b border-border bg-bg-tertiary">
                        <button
                            className={`flex-1 py-4 px-6 text-base font-medium cursor-pointer transition-all duration-300 ${activeTab === 'generate' ? 'text-accent-primary bg-bg-secondary border-b-2 border-accent-primary' : 'text-text-primary hover:text-accent-primary'}`}
                            onClick={() => setActiveTab('generate')}
                        >
                            Generate SIN
                        </button>
                        <button
                            className={`flex-1 py-4 px-6 text-base font-medium cursor-pointer transition-all duration-300 ${activeTab === 'decode' ? 'text-accent-primary bg-bg-secondary border-b-2 border-accent-primary' : 'text-text-primary hover:text-accent-primary'}`}
                            onClick={() => setActiveTab('decode')}
                        >
                            Decode SIN
                        </button>
                    </div>

                    {activeTab === 'generate' ? (
                        <div className="p-8 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="mb-6 w-full">
                                    <label htmlFor="firstName" className="block mb-2 font-medium text-text-primary text-sm">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="form-input"
                                        autoComplete="given-name"
                                    />
                                </div>
                                <div className="mb-6 w-full">
                                    <label htmlFor="lastName" className="block mb-2 font-medium text-text-primary text-sm">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="form-input"
                                    />
                                </div>
                                <div className="mb-6 w-full">
                                    <label htmlFor="countryCode" className="block mb-2 font-medium text-text-primary text-sm">Country</label>
                                    <select
                                        id="countryCode"
                                        value={formData.countryCode}
                                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                        className="form-select"
                                    >
                                        <option value="">Select Country</option>
                                        {COUNTRIES_LIST.map(country => (
                                            <option key={country.code} value={country.code}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-6 w-full">
                                    <label htmlFor="gender" className="block mb-2 font-medium text-text-primary text-sm">Gender</label>
                                    <select
                                        id="gender"
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="form-select"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                                <div className="mb-6 w-full col-span-1 md:col-span-2">
                                    <label htmlFor="birthDate" className="block mb-2 font-medium text-text-primary text-sm">Birth Date</label>
                                    <div className="flex flex-col md:flex-row gap-2">
                                        <select
                                            value={formData.birthYear}
                                            onChange={(e) => setFormData({ ...formData, birthYear: parseInt(e.target.value) })}
                                            className="form-select w-full"
                                        >
                                            <option value="">Year</option>
                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={formData.birthMonth}
                                            onChange={(e) => setFormData({ ...formData, birthMonth: parseInt(e.target.value) })}
                                            className="form-select w-full"
                                        >
                                            <option value="">Month</option>
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={formData.birthDay}
                                            onChange={(e) => setFormData({ ...formData, birthDay: parseInt(e.target.value) })}
                                            className="form-select w-full"
                                        >
                                            <option value="">Day</option>
                                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-6 w-full col-span-1 md:col-span-2">
                                    <label htmlFor="pin" className="block mb-2 font-medium text-text-primary text-sm">PIN (4 digits)</label>
                                    <input
                                        type="tel"
                                        id="pin"
                                        maxLength={4}
                                        value={formData.pin}
                                        onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, '') })}
                                        className="form-input"
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <button
                                className="submit-button w-full p-4 border-none rounded-md relative bg-accent-gradient text-base font-bold cursor-pointer transition-all duration-300 overflow-hidden"
                                onClick={handleGenerate}
                                disabled={isLoading}
                            >
                                <div className="absolute top-0 left-0 w-full h-full bg-bg-primary opacity-90 z-[1] rounded-md transition-opacity duration-300 hover:opacity-0 active:opacity-0"></div>
                                <span className="relative z-[2] text-accent-primary group-hover:text-bg-primary">{isLoading ? 'Generating...' : 'Generate SIN'}</span>
                            </button>
                        </div>
                    ) : (
                        <div className="p-8 animate-fade-in">
                            <div className="mb-6 w-full">
                                <label htmlFor="hexCode" className="block mb-2 font-medium text-text-primary text-sm">SIN Code</label>
                                <input
                                    type="text"
                                    id="hexCode"
                                    value={decodeData.hexCode}
                                    onChange={(e) => setDecodeData({ ...decodeData, hexCode: e.target.value })}
                                    className="form-input"
                                    placeholder="Enter your SIN code"
                                />
                            </div>
                            <div className="mb-6 w-full">
                                <label htmlFor="decodePin" className="block mb-2 font-medium text-text-primary text-sm">PIN</label>
                                <input
                                    type="password"
                                    id="decodePin"
                                    maxLength={4}
                                    value={decodeData.pin}
                                    onChange={(e) => setDecodeData({ ...decodeData, pin: e.target.value.replace(/\D/g, '') })}
                                    className="form-input"
                                    placeholder="Enter your PIN"
                                />
                            </div>
                            <button
                                className="submit-button w-full p-4 border-none rounded-md relative bg-accent-gradient text-base font-bold cursor-pointer transition-all duration-300 overflow-hidden"
                                onClick={handleDecode}
                                disabled={isLoading}
                            >
                                <div className="absolute top-0 left-0 w-full h-full bg-bg-primary opacity-90 z-[1] rounded-md transition-opacity duration-300 hover:opacity-0 active:opacity-0"></div>
                                <span className="relative z-[2] text-accent-primary">{isLoading ? 'Decoding...' : 'Decode SIN'}</span>
                            </button>
                        </div>
                    )}

                    {result && (
                        <div className={`p-4 ${result ? 'animate-slide-up' : ''}`}>
                            <h3 className={`text-xl font-bold mb-4 ${result.status === 'success' ? 'text-success-color' : 'text-error-color'}`}>{result.status === 'success' ? 'Success!' : 'Error'}</h3>
                            {result.status === 'success' ? (
                                activeTab === 'generate' ? (
                                    <div className="bg-success-color/10 border border-success-color rounded-lg p-6">
                                        <p className="font-bold mb-2">Your SIN code:</p>
                                        <div className="flex items-center gap-2 bg-code p-3 rounded overflow-x-auto">
                                            <code className="font-mono text-sm break-all flex-1">{result.hexCode}</code>
                                            <button
                                                className="bg-transparent border-none text-text-primary cursor-pointer p-1 min-w-[32px] h-8 flex items-center justify-center rounded hover:bg-bg-tertiary transition-colors"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(result.hexCode || '');
                                                }}
                                                aria-label="Copy SIN code"
                                            >
                                                <i className="fas fa-copy"></i>
                                            </button>
                                        </div>
                                        <p className="text-text-muted text-sm mt-3">Save this code and your PIN securely!</p>
                                    </div>
                                ) : (
                                    <div className="bg-bg-primary p-6 rounded-lg">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="bg-bg-secondary p-4 rounded border border-border">
                                                <label className="block font-bold mb-1">Name:</label>
                                                <span className="text-text-secondary">{result.personalInfo?.firstName} {result.personalInfo?.lastName}</span>
                                            </div>
                                            <div className="bg-bg-secondary p-4 rounded border border-border">
                                                <label className="block font-bold mb-1">Country:</label>
                                                <span className="text-text-secondary">{COUNTRIES_LIST.find(c => c.code === result.personalInfo?.countryCode)?.name || result.personalInfo?.countryCode}</span>
                                            </div>
                                            <div className="bg-bg-secondary p-4 rounded border border-border">
                                                <label className="block font-bold mb-1">Birth Date:</label>
                                                <span className="text-text-secondary">{result.personalInfo?.birthYear}/{result.personalInfo?.birthMonth}/{result.personalInfo?.birthDay}</span>
                                            </div>
                                            <div className="bg-bg-secondary p-4 rounded border border-border">
                                                <label className="block font-bold mb-1">Gender:</label>
                                                <span className="text-text-secondary">{result.personalInfo?.gender}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <p className="text-error-color">{result.message}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
