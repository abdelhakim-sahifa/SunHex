'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Check, Loader2, ArrowRight, Zap, AlertTriangle, Key, Globe, User, Clock, LogIn } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { getCurrentDeveloper, createSession, getAllIdentities } from '@/lib/auth';
import { isTimestampValid, buildRedirectUrl } from '@/lib/url-utils';
import { COUNTRY_NAMES } from '@/data/countries';
import { DeveloperSession } from '@/lib/storage';
import { PersonalInfo } from '@/lib/core/protocol';

/**
 * Main OAuth Page Content
 */
function NewAuthContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // OAuth Params
    const callbackUrl = searchParams.get('url') + "/sunhex";
    const port = searchParams.get('port');
    const timestampStr = searchParams.get('timestamp');

    // State
    const [mode, setMode] = useState<'loading' | 'expired' | 'consent' | 'signup' | 'error'>('loading');
    const [currentUser, setCurrentUser] = useState<DeveloperSession | null>(null);
    const [allIdentities, setAllIdentities] = useState<DeveloperSession[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [clientDomain, setClientDomain] = useState<string>('');
    const [clientOrigin, setClientOrigin] = useState<string>('');

    // Sign-up form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        countryCode: '',
        birthYear: new Date().getFullYear() - 25,
        birthMonth: 1,
        birthDay: 1,
        gender: 'Male' as any,
        pin: ''
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [countries, setCountries] = useState<string[]>([]);

    useEffect(() => {
        // 1. Initial validation
        if (!callbackUrl) {
            setMode('error');
            setError('Missing callback URL (url parameter)');
            return;
        }

        try {
            const urlObj = new URL(callbackUrl);
            setClientDomain(urlObj.hostname);
            setClientOrigin(urlObj.origin);
        } catch (e) {
            console.error('Invalid callback URL:', callbackUrl);
        }

        // 2. Timing validation
        if (!isTimestampValid(timestampStr)) {
            setMode('expired');
            return;
        }

        // 3. fetch countries
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

        // 4. Session check
        const session = getCurrentDeveloper();
        const storedIdentities = getAllIdentities();
        setAllIdentities(storedIdentities);

        if (session) {
            setCurrentUser(session);
            setMode('consent');
        } else if (storedIdentities.length > 0) {
            // Default to the most recent one if no active session but we have history
            setCurrentUser(storedIdentities[storedIdentities.length - 1]);
            setMode('consent');
        } else {
            setMode('signup');
        }
    }, [callbackUrl, timestampStr]);

    const handleRedirect = (status: number, fragment?: string, errorMessage?: string) => {
        if (!callbackUrl) return;
        const redirect = buildRedirectUrl(callbackUrl, status, fragment, errorMessage);
        window.location.href = redirect;
    };

    const handleConsent = () => {
        if (!currentUser || !currentUser.sinCode) return;
        setIsLoading(true);
        // Simulate a small processing delay for UX
        setTimeout(() => {
            handleRedirect(200, currentUser.sinCode);
        }, 800);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setIsLoading(true);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === 'success' && data.hexCode) {
                // Persist the new identity locally so it shows up in future requests
                const { pin, ...userData } = formData;
                createSession(data.hexCode, userData as any);

                // Return to client immediately with the generated fragment
                handleRedirect(200, data.hexCode);
            } else if (data.code === 'VALIDATION_ERROR' && data.errors) {
                const errors: Record<string, string> = {};
                data.errors.forEach((err: any) => {
                    errors[err.path] = err.message;
                });
                setFieldErrors(errors);
                setIsLoading(false);
            } else {
                throw new Error(data.message || 'Failed to initialize protocol');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during fragment generation');
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

    // Render logic
    if (mode === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-10 h-10 text-accent-primary animate-spin" />
                <p className="text-text-muted font-mono animate-pulse">Establishing Quantum Link...</p>
            </div>
        );
    }

    if (mode === 'expired') {
        return (
            <main className="container mx-auto px-4 py-32 flex items-center justify-center">
                <Card className="max-w-md w-full border-red-500/30 p-8 text-center animate-fade-in-up">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                        <Clock className="w-8 h-8 text-red-500" />
                    </div>
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl text-red-500">Access Link Expired</CardTitle>
                        <CardDescription>
                            The authentication link is no longer valid (exceeded 30s limit).
                            The redirect fragment has expired because the request was made more than 3 minutes ago.
                            Please return to the client website and try again.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                        <Button variant="secondary" onClick={() => handleRedirect(408, undefined, 'link_expired')}>
                            Return to Website
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        );
    }

    if (mode === 'error') {
        return (
            <main className="container mx-auto px-4 py-32 flex items-center justify-center">
                <Card className="max-w-md w-full border-red-500/30 p-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-4">{error}</h2>
                    <Button onClick={() => router.push('/')}>Go to Homepage</Button>
                </Card>
            </main>
        );
    }

    if (mode === 'consent') {
        return (
            <main className="container mx-auto px-4 pt-32 pb-20 flex flex-col items-center justify-center">
                <Card className="max-w-xl w-full border-accent-primary/30 p-8 animate-fade-in-up">
                    <CardHeader className="text-center p-0 mb-8 border-b border-border pb-6">
                        <div className="flex justify-center mb-6 gap-6 items-center">
                            <div className="relative">
                                <Image src="/favicon.png" alt="SunHex" width={48} height={48} className="rounded-xl border border-accent-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]" />
                                <div className="absolute -right-2 -bottom-2 bg-accent-primary text-bg-primary rounded-full p-1 border-2 border-bg-primary">
                                    <Shield className="w-3 h-3" />
                                </div>
                            </div>
                            <div className="text-accent-primary font-bold text-2xl">×</div>
                            <div className="relative">
                                <img
                                    src={`${clientOrigin}/favicon.ico`}
                                    alt={clientDomain}
                                    width={48}
                                    height={48}
                                    className="rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] bg-white/5 p-1"
                                    onError={(e) => {
                                        (e.target as any).src = `https://www.google.com/s2/favicons?domain=${clientDomain}&sz=128`;
                                    }}
                                />
                            </div>
                        </div>

                        <CardTitle className="text-3xl font-bold tracking-tighter">Authorize Identity</CardTitle>
                        <CardDescription className="text-text-secondary mt-2">
                            <span className="text-accent-secondary font-bold font-mono">{clientDomain}</span> wants to access your SunHex Identity fragment.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-6">
                        {/* Selected Identity Display */}
                        <div className="p-6 rounded-2xl bg-accent-primary/5 border border-accent-primary/20 shadow-[0_0_30px_rgba(0,255,157,0.03)] space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                                    <User className="w-6 h-6 text-accent-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-accent-primary uppercase font-bold tracking-widest">Selected Fragment</p>
                                    <p className="text-lg font-bold text-text-primary">{currentUser?.userData.firstName} {currentUser?.userData.lastName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Origin</p>
                                    <div className="flex items-center gap-1 justify-end text-sm text-text-secondary">
                                        <Globe className="w-3 h-3" />
                                        <span>{currentUser?.userData.countryCode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Identities Selection List */}
                        {allIdentities.length > 1 && (
                            <div className="space-y-3">
                                <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest ml-1">Choose Identity</p>
                                <div className="grid grid-cols-1 gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                                    {allIdentities.map((identity, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentUser(identity)}
                                            className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left group ${currentUser?.sinCode === identity.sinCode
                                                ? 'bg-accent-primary/10 border-accent-primary/50 text-accent-primary'
                                                : 'bg-bg-secondary/40 border-border hover:border-text-muted text-text-secondary'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${currentUser?.sinCode === identity.sinCode
                                                    ? 'bg-accent-primary/20 border-accent-primary/30'
                                                    : 'bg-bg-tertiary border-border'
                                                    }`}>
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{identity.userData.firstName} {identity.userData.lastName}</p>
                                                    <p className="text-[10px] opacity-70 italic">{identity.sinCode.substring(0, 20)}...</p>
                                                </div>
                                            </div>
                                            {currentUser?.sinCode === identity.sinCode && <Check className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-bg-tertiary/30 border border-border/50 rounded-xl p-4 text-[11px] text-text-muted space-y-2">
                            <div className="flex items-start gap-2">
                                <Check className="w-3 h-3 text-accent-primary mt-0.5" />
                                <span>No personal details or PIN are shared with the client.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="w-3 h-3 text-accent-primary mt-0.5" />
                                <span>You will need your **PIN** on the next page to reveal your data locally.</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 mt-6">
                        <Button
                            className="w-full h-14 text-lg bg-accent-primary text-bg-primary hover:bg-accent-primary/90 shadow-[0_0_30px_rgba(0,255,157,0.2)]"
                            onClick={handleConsent}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Authorize Access
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                        <div className="flex items-center gap-4 w-full">
                            <Button
                                variant="secondary"
                                className="flex-1 bg-white/5 border-white/10 hover:bg-white/10"
                                onClick={() => setMode('signup')}
                                disabled={isLoading}
                            >
                                <Zap className="w-4 h-4 mr-2" />
                                New Identity
                            </Button>
                            <Button
                                variant="ghost"
                                className="px-6 text-red-500 hover:bg-red-500/10"
                                onClick={() => handleRedirect(403, undefined, 'user_denied')}
                                disabled={isLoading}
                            >
                                Deny
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </main>
        );
    }

    // Default: Sign-up mode
    return (
        <main className="container mx-auto px-4 pt-32 pb-20">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8 animate-fade-in-up">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary text-[10px] font-bold tracking-[0.2em] uppercase">
                            <Zap className="w-3 h-3" />
                            OAuth Activation
                        </div>
                        <h1 className="text-4xl font-bold text-text-primary">
                            Initialize <br />
                            <span className="italic text-transparent bg-clip-text bg-accent-gradient">New Identity.</span>
                        </h1>
                        <p className="text-text-secondary leading-relaxed">
                            Create a secure SunHex fragment for <span className="text-accent-primary font-bold">{clientDomain}</span>.
                            Join the protocol in seconds.
                        </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border/50">
                        <div className="flex gap-4 p-4 rounded-xl border border-border bg-bg-secondary/40">
                            <Shield className="w-6 h-6 text-accent-primary flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm text-text-primary">Zero-Trust Architecture</h4>
                                <p className="text-xs text-text-muted">The client website never sees your PIN or data.</p>
                            </div>
                        </div>
                    </div>
                    {allIdentities.length > 0 && (
                        <Button variant="ghost" onClick={() => setMode('consent')} className="text-accent-secondary border border-accent-secondary/20 bg-accent-secondary/5">
                            <LogIn className="w-4 h-4 mr-2" />
                            Use Existing Identity ({allIdentities.length})
                        </Button>
                    )}
                </div>

                <Card className="animate-fade-in delay-200">
                    <form onSubmit={handleSignup}>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">First Name</label>
                                    <Input name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John" />
                                    {fieldErrors.firstName && <p className="text-[10px] text-red-500">{fieldErrors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Last Name</label>
                                    <Input name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                                    {fieldErrors.lastName && <p className="text-[10px] text-red-500">{fieldErrors.lastName}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Country</label>
                                <select
                                    name="countryCode"
                                    required
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="w-full h-12 rounded-md border border-border bg-bg-tertiary px-4 py-2 text-text-primary focus:ring-2 focus:ring-accent-primary outline-none transition-all"
                                >
                                    <option value="">Select Origin</option>
                                    {countries.sort((a, b) => (COUNTRY_NAMES[a] || a).localeCompare(COUNTRY_NAMES[b] || b)).map(code => (
                                        <option key={code} value={code}>{COUNTRY_NAMES[code as keyof typeof COUNTRY_NAMES] || code}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Birth Year</label>
                                    <Input type="number" name="birthYear" required value={formData.birthYear} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Month</label>
                                    <Input type="number" name="birthMonth" required value={formData.birthMonth} onChange={handleChange} min="1" max="12" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Day</label>
                                    <Input type="number" name="birthDay" required value={formData.birthDay} onChange={handleChange} min="1" max="31" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Biological Gender</label>
                                <select
                                    name="gender"
                                    required
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full h-12 rounded-md border border-border bg-bg-tertiary px-4 py-2 text-text-primary focus:ring-2 focus:ring-accent-primary outline-none"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Private PIN (4-6 digits)</label>
                                <Input type="password" name="pin" required value={formData.pin} onChange={handleChange} placeholder="••••" className="text-center text-2xl tracking-[1em]" />
                                {fieldErrors.pin && <p className="text-[10px] text-red-500">{fieldErrors.pin}</p>}
                            </div>

                            {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm">{error}</div>}
                        </CardContent>
                        <CardFooter className="p-8 pt-0">
                            <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm & Sign In"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main>
    );
}

/**
 * Page Shell with Suspense and Shared UI
 */
export default function NewAuthPage() {
    return (
        <div className="min-h-screen font-mono bg-bg-primary overflow-x-hidden">
            <div className="bg-animation">
                <ClientBackgroundAnimation />
            </div>

            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-10 h-10 text-accent-primary animate-spin" />
                </div>
            }>
                <NewAuthContent />
            </Suspense>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 255, 157, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 255, 157, 0.4);
                }
            `}</style>
        </div>
    );
}
