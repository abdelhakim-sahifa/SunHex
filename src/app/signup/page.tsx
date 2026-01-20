'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Key, ArrowRight, Check, Loader2, Shield, Info, Zap } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { createSession, isAuthenticated } from '@/lib/auth';

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [apiKey, setApiKey] = useState<string>('');
    const [countries, setCountries] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        countryCode: '',
        birthYear: new Date().getFullYear() - 25,
        birthMonth: 1,
        birthDay: 1,
        gender: 'Male',
        pin: ''
    });

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/dashboard');
        }
    }, [router]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('/api/countries');
                const data = await response.json();
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
            if (!/^\d{4,6}$/.test(formData.pin)) {
                throw new Error('PIN must be 4-6 digits');
            }

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === 'success' && data.hexCode) {
                const { pin, ...userData } = formData;
                const session = createSession(data.hexCode, userData as any);
                setApiKey(session.apiKey);
                setStep('success');
            } else {
                throw new Error(data.message || 'Failed to initialize protocol');
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

    if (step === 'success') {
        return (
            <div className="min-h-screen">
                <div className="bg-animation">
                    <ClientBackgroundAnimation />
                </div>
                <Navbar />
                <main className="container mx-auto px-4 pt-40 pb-20 flex items-center justify-center">
                    <Card className="max-w-xl w-full border-accent-primary/30 p-8 text-center animate-fade-in-up">
                        <div className="w-20 h-20 rounded-full bg-accent-primary/10 flex items-center justify-center mx-auto mb-8 border border-accent-primary/20">
                            <Check className="w-10 h-10 text-accent-primary" />
                        </div>
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-3xl italic text-transparent bg-clip-text bg-accent-gradient">Protocol Active.</CardTitle>
                            <CardDescription className="text-lg">Your master identity fragment has been crystallized.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-0">
                            <div className="bg-bg-tertiary border border-border rounded-xl p-6 text-left space-y-4">
                                <div className="flex items-center gap-2 text-text-muted text-sm uppercase tracking-widest font-bold">
                                    <Key className="w-4 h-4" />
                                    <span>Master API Key</span>
                                </div>
                                <div className="bg-bg-primary border border-accent-primary/30 rounded-lg p-4 font-mono text-accent-primary break-all">
                                    {apiKey}
                                </div>
                                <p className="text-xs text-text-muted">
                                    Store this key securely. It is your only link to the SunHex API layer.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <Button size="lg" onClick={() => router.push('/dashboard')}>
                                Access Dashboard
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </CardFooter>
                    </Card>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="bg-animation">
                <ClientBackgroundAnimation />
            </div>
            <Navbar />
            <main className="container mx-auto px-4 pt-40 pb-20">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <div className="space-y-8 animate-fade-in-up">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                                Protocol <br />
                                <span className="italic text-transparent bg-clip-text bg-accent-gradient">Activation.</span>
                            </h1>
                            <p className="text-text-secondary text-lg leading-relaxed">
                                Join the sovereign identity network. Initialize your master fragment and obtain your API key in seconds.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 p-4 rounded-xl border border-border bg-bg-secondary/40 backdrop-blur-sm">
                                <Shield className="w-6 h-6 text-accent-primary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-text-primary">End-to-End Privacy</h4>
                                    <p className="text-sm text-text-muted">Your data is never stored in plaintext on our servers.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-xl border border-border bg-bg-secondary/40 backdrop-blur-sm">
                                <Info className="w-6 h-6 text-accent-primary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-text-primary">Strictly Stateless</h4>
                                    <p className="text-sm text-text-muted">We verify mathematics, not your history.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="animate-fade-in delay-200">
                        <form onSubmit={handleSubmit}>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary uppercase">First Name</label>
                                        <Input name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary uppercase">Last Name</label>
                                        <Input name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-secondary uppercase">Identity Origin (Country)</label>
                                    <select
                                        name="countryCode"
                                        required
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        className="w-full h-12 rounded-md border border-border bg-bg-tertiary px-4 py-2 text-text-primary focus:ring-2 focus:ring-accent-primary outline-none transition-all"
                                    >
                                        <option value="">Select Origin</option>
                                        {countries.sort().map(code => (
                                            <option key={code} value={code}>{code}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary uppercase">Birth Year</label>
                                        <Input type="number" name="birthYear" required value={formData.birthYear} onChange={handleChange} min="1900" max={new Date().getFullYear()} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary uppercase">Month</label>
                                        <Input type="number" name="birthMonth" required value={formData.birthMonth} onChange={handleChange} min="1" max="12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary uppercase">Day</label>
                                        <Input type="number" name="birthDay" required value={formData.birthDay} onChange={handleChange} min="1" max="31" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-secondary uppercase">Biological Gender</label>
                                    <select
                                        name="gender"
                                        required
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full h-12 rounded-md border border-border bg-bg-tertiary px-4 py-2 text-text-primary focus:ring-2 focus:ring-accent-primary outline-none transition-all"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-secondary uppercase">Create Master PIN (4-6 digits)</label>
                                    <Input type="password" name="pin" required value={formData.pin} onChange={handleChange} pattern="\d{4,6}" placeholder="••••" className="text-center text-2xl tracking-[1em]" />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm font-medium">
                                        {error}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="p-8 pt-0">
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Initializing...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 mr-2" />
                                            Activate My Protocol
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
