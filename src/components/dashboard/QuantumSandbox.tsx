'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Zap, Terminal as TerminalIcon, ShieldCheck, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TerminalLog, LogEntry } from './TerminalLog';
import { useSunHex } from '@/hooks/useSunHex';
import { COUNTRY_CODES } from '@/lib/core/constants';
import { COUNTRY_NAMES } from '@/data/countries';
import { FormData } from '@/types';

type Mode = 'encode' | 'decode';

export function QuantumSandbox({ apiKey }: { apiKey: string }) {
    const [mode, setMode] = useState<Mode>('encode');
    const [formData, setFormData] = useState<FormData>({
        firstName: 'Satoshi',
        lastName: 'Nakamoto',
        countryCode: 'JP',
        birthYear: 1975,
        birthMonth: 4,
        birthDay: 5,
        gender: 'Male',
        pin: '1234'
    });
    const [decodeData, setDecodeData] = useState({
        hexCode: '',
        pin: ''
    });
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const { isLoading, generateSin, decodeSin } = useSunHex();

    const addLog = (message: string, type: LogEntry['type'] = 'info') => {
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        setLogs(prev => [...prev, { message, type, timestamp }]);
    };

    const handleRandomize = () => {
        const firstNames = ['Satoshi', 'Ada', 'Linus', 'Grace', 'Alan', 'Margaret', 'Guido'];
        const lastNames = ['Nakamoto', 'Lovelace', 'Torvalds', 'Hopper', 'Turing', 'Hamilton', 'van Rossum'];
        const countries = Object.keys(COUNTRY_CODES);
        const genders = ['Male', 'Female', 'Other'] as const;

        const randomData: FormData = {
            firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
            countryCode: countries[Math.floor(Math.random() * countries.length)],
            birthYear: 1950 + Math.floor(Math.random() * 60),
            birthMonth: 1 + Math.floor(Math.random() * 12),
            birthDay: 1 + Math.floor(Math.random() * 28),
            gender: genders[Math.floor(Math.random() * genders.length)],
            pin: Math.floor(1000 + Math.random() * 8999).toString()
        };
        setFormData(randomData);
        addLog(`Subject randomized: ${randomData.firstName} ${randomData.lastName}`, 'info');
    };

    const handleTest = async () => {
        if (!formData.firstName || formData.pin.length < 4) {
            addLog('Validation failed: First Name and PIN required', 'error');
            return;
        }

        addLog('Signal received. Initializing Protocol Sandbox...', 'processing');

        try {
            // Start coordinated progress logs
            setTimeout(() => addLog('Salt sequence generated (8-byte entropy)', 'info'), 300);
            setTimeout(() => addLog(`Deriving 256-bit key using PBKDF2 (User PIN: ${"*".repeat(formData.pin.length)})`, 'security'), 600);
            setTimeout(() => addLog('Packing bio-data into Quantum Binary Buffer...', 'processing'), 900);

            const result = await generateSin(formData);
            console.log('Generate result:', result);

            if (result.status === 'success') {
                setTimeout(() => {
                    addLog('AES-256-GCM Encryption Complete.', 'success');
                    addLog(`Protocol Crystallization Successful: ${result.hexCode?.substring(0, 16)}...`, 'success');
                }, 1200);
            } else if (result.code === 'VALIDATION_ERROR' && Array.isArray(result.errors)) {
                setTimeout(() => {
                    addLog('❌ Consensus Rejected: Logical Validation Failure', 'error');
                    result.errors?.forEach((err: any) => {
                        addLog(`FAULT [${err.path}]: ${err.message}`, 'error');
                    });
                }, 1200);
            } else {
                setTimeout(() => {
                    addLog(`Protocol Fault: ${result.message || 'Unknown error'}`, 'error');
                }, 1200);
            }
        } catch (err) {
            addLog('Consensus Failure: Kernel Interrupted', 'error');
            console.error('Generate error:', err);
        }
    };

    const handleDecode = async () => {
        if (!decodeData.hexCode || decodeData.pin.length < 4) {
            addLog('Validation failed: HexCode and PIN required', 'error');
            return;
        }

        addLog('Decode signal received. Initializing reverse protocol...', 'processing');

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        try {
            // Start progress logs
            setTimeout(() => addLog(`Deriving decryption key using PBKDF2 (User PIN: ${"*".repeat(decodeData.pin.length)})`, 'security'), 300);
            setTimeout(() => addLog('Attempting AES-256-GCM Decryption...', 'processing'), 600);

            const result = await decodeSin(decodeData);
            console.log('Decode result:', result);

            if (result.status === 'success') {
                if (result.personalInfo) {
                    setTimeout(() => {
                        addLog('✓ Decryption Successful. Identity Fragment Recovered.', 'success');
                        addLog(`Name: ${result.personalInfo?.firstName} ${result.personalInfo?.lastName}`, 'info');
                        addLog(`Birth: ${result.personalInfo?.birthYear}-${String(result.personalInfo?.birthMonth).padStart(2, '0')}-${String(result.personalInfo?.birthDay).padStart(2, '0')}`, 'info');
                        addLog(`Country: ${COUNTRY_NAMES[result.personalInfo?.countryCode as keyof typeof COUNTRY_NAMES] || result.personalInfo?.countryCode} | Gender: ${result.personalInfo?.gender}`, 'info');
                    }, 900);
                } else if (result.data) {
                    // Fallback in case the API uses 'data' wrapper
                    const p = (result as any).data;
                    setTimeout(() => {
                        addLog('✓ Decryption Successful (via legacy data).', 'success');
                        addLog(`Name: ${p.firstName} ${p.lastName}`, 'info');
                    }, 900);
                } else {
                    setTimeout(() => addLog('Protocol sync mismatch: Status success but no identity data recovered.', 'error'), 900);
                }
            } else if (result.code === 'VALIDATION_ERROR' && Array.isArray(result.errors)) {
                setTimeout(() => {
                    addLog('❌ Decode Failed: Validation Error', 'error');
                    result.errors?.forEach((err: any) => {
                        addLog(`FAULT [${err.path}]: ${err.message}`, 'error');
                    });
                }, 900);
            } else {
                setTimeout(() => {
                    addLog(`Decryption Fault: ${result.message || 'Invalid PIN or corrupted hex code'}`, 'error');
                }, 900);
            }
        } catch (err) {
            addLog('Decode Failure: Kernel Interrupted', 'error');
            console.error('Decode error:', err);
        }
    };

    const clearLogs = () => setLogs([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (mode === 'encode') {
            setFormData(prev => ({
                ...prev,
                [name]: ['birthYear', 'birthMonth', 'birthDay'].includes(name) ? Number(value) : value
            }));
        } else {
            setDecodeData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Card className="border-accent-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xl italic flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent-primary" />
                        Quantum Sandbox
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
                            className={`text-text-muted ${mode === 'encode' ? 'hover:text-accent-secondary' : 'hover:text-accent-primary'}`}
                        >
                            {mode === 'encode' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </Button>
                        {mode === 'encode' && (
                            <Button variant="ghost" size="sm" onClick={handleRandomize} className="text-text-muted hover:text-accent-primary">
                                <RotateCcw className="w-4 h-4" />
                            </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={clearLogs} className="text-text-muted hover:text-red-500">
                            <TerminalIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                    {mode === 'encode' ? (
                        <>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">First Name</label>
                                        <Input name="firstName" value={formData.firstName} onChange={handleChange} className="font-mono text-xs" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Last Name</label>
                                        <Input name="lastName" value={formData.lastName} onChange={handleChange} className="font-mono text-xs" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Year</label>
                                        <Input type="number" name="birthYear" value={formData.birthYear} onChange={handleChange} className="font-mono text-xs" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Month</label>
                                        <Input type="number" name="birthMonth" value={formData.birthMonth} onChange={handleChange} className="font-mono text-xs" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Day</label>
                                        <Input type="number" name="birthDay" value={formData.birthDay} onChange={handleChange} className="font-mono text-xs" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Country</label>
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleChange}
                                            className="w-full h-9 rounded-md border border-border bg-bg-tertiary px-3 py-1 text-xs text-text-primary outline-none"
                                        >
                                            {Object.keys(COUNTRY_CODES).sort((a, b) => (COUNTRY_NAMES[a] || a).localeCompare(COUNTRY_NAMES[b] || b)).map(code => (
                                                <option key={code} value={code}>{COUNTRY_NAMES[code as keyof typeof COUNTRY_NAMES] || code}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full h-9 rounded-md border border-border bg-bg-tertiary px-3 py-1 text-xs text-text-primary outline-none"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2 pb-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Secret Key (PIN)</label>
                                    <Input
                                        name="pin"
                                        type="password"
                                        value={formData.pin}
                                        onChange={handleChange}
                                        placeholder="****"
                                        className="text-center tracking-widest text-xl h-12"
                                    />
                                </div>
                            </div>

                            <Button onClick={handleTest} disabled={isLoading} className="w-full h-14 group">
                                {isLoading ? (
                                    <Zap className="w-5 h-5 animate-pulse" />
                                ) : (
                                    <>
                                        Initialize Consensus
                                        <Play className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </>
                    ) : (
                        <>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Identity Fragment (Hex Code)</label>
                                    <Input
                                        name="hexCode"
                                        value={decodeData.hexCode}
                                        onChange={handleChange}
                                        placeholder="Enter hex code to decode..."
                                        className="font-mono text-xs"
                                    />
                                </div>

                                <div className="space-y-2 pb-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Secret Key (PIN)</label>
                                    <Input
                                        name="pin"
                                        type="password"
                                        value={decodeData.pin}
                                        onChange={handleChange}
                                        placeholder="****"
                                        className="text-center tracking-widest text-xl h-12"
                                    />
                                </div>
                            </div>

                            <Button onClick={handleDecode} disabled={isLoading} className="w-full h-14 group bg-accent-secondary hover:bg-accent-secondary/80">
                                {isLoading ? (
                                    <Zap className="w-5 h-5 animate-pulse" />
                                ) : (
                                    <>
                                        Decrypt Identity
                                        <ShieldCheck className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>

            <TerminalLog logs={logs} className="h-full border-accent-secondary/20 shadow-[0_0_30px_rgba(0,255,157,0.05)]" />
        </div>
    );
}
