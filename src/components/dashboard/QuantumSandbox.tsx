'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Zap, Terminal as TerminalIcon, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TerminalLog, LogEntry } from './TerminalLog';
import { useSunHex } from '@/hooks/useSunHex';
import { COUNTRY_CODES } from '@/lib/core/constants';
import { FormData } from '@/types';

export function QuantumSandbox({ apiKey }: { apiKey: string }) {
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
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const { isLoading, generateSin } = useSunHex();

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

        setTimeout(() => addLog('Salt sequence generated (8-byte entropy)', 'info'), 300);
        setTimeout(() => addLog(`Deriving 256-bit key using PBKDF2 (User PIN: ${"*".repeat(formData.pin.length)})`, 'security'), 600);
        setTimeout(() => addLog('Packing bio-data into Quantum Binary Buffer...', 'processing'), 900);

        try {
            const result = await generateSin(formData);

            if (result.status === 'success') {
                setTimeout(() => {
                    addLog('AES-256-GCM Encryption Complete.', 'success');
                    addLog(`Protocol Crystallization Successful: ${result.hexCode?.substring(0, 16)}...`, 'success');
                }, 1200);
            } else if (result.code === 'VALIDATION_ERROR' && result.errors) {
                addLog('❌ Consensus Rejected: Logical Validation Failure', 'error');
                result.errors.forEach((err: any) => {
                    addLog(`FAULT [${err.path}]: ${err.message}`, 'error');
                });
            } else {
                addLog(`Protocol Fault: ${result.message}`, 'error');
            }
        } catch (err) {
            addLog('Consensus Failure: Kernel Interrupted', 'error');
        }
    };

    const clearLogs = () => setLogs([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['birthYear', 'birthMonth', 'birthDay'].includes(name) ? Number(value) : value
        }));
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
                        <Button variant="ghost" size="sm" onClick={handleRandomize} className="text-text-muted hover:text-accent-primary">
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={clearLogs} className="text-text-muted hover:text-red-500">
                            <TerminalIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
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
                                    {Object.keys(COUNTRY_CODES).sort().map(code => (
                                        <option key={code} value={code}>{code}</option>
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
                </CardContent>
            </Card>

            <TerminalLog logs={logs} className="h-full border-accent-secondary/20 shadow-[0_0_30px_rgba(0,255,157,0.05)]" />
        </div>
    );
}
