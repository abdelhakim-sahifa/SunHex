'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Zap, Terminal as TerminalIcon, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TerminalLog, LogEntry } from './TerminalLog';
import { useSunHex } from '@/hooks/useSunHex';

export function QuantumSandbox({ apiKey }: { apiKey: string }) {
    const [name, setName] = useState('Abdelhakim Sahifa');
    const [pin, setPin] = useState('1234');
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

    const handleTest = async () => {
        if (!name || pin.length < 4) {
            addLog('Validation failed: Name and PIN required', 'error');
            return;
        }

        addLog('Signal received. Initializing Protocol Sandbox...', 'processing');

        // Simulate steps for visualization
        setTimeout(() => addLog('Salt sequence generated (8-byte entropy)', 'info'), 300);
        setTimeout(() => addLog(`Deriving 256-bit key using PBKDF2 (User PIN: ${"*".repeat(pin.length)})`, 'security'), 600);
        setTimeout(() => addLog('Packing bio-data into Quantum Binary Buffer...', 'processing'), 900);

        try {
            const parts = name.split(' ');
            const result = await generateSin({
                firstName: parts[0] || 'John',
                lastName: parts.slice(1).join(' ') || 'Doe',
                countryCode: 'US',
                birthYear: 1990,
                birthMonth: 1,
                birthDay: 1,
                gender: 'Male',
                pin: pin
            });

            if (result.status === 'success') {
                setTimeout(() => {
                    addLog('AES-256-GCM Encryption Complete.', 'success');
                    addLog(`Protocol Crystallization Successful: ${result.hexCode?.substring(0, 16)}...`, 'success');
                }, 1200);
            } else {
                addLog(`Protocol Fault: ${result.message}`, 'error');
            }
        } catch (err) {
            addLog('Consensus Failure: Kernel Interrupted', 'error');
        }
    };

    const clearLogs = () => setLogs([]);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Card className="border-accent-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xl italic flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent-primary" />
                        Quantum Sandbox
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={clearLogs} className="text-text-muted hover:text-red-500">
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Subject Identifier</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Subject Name"
                                className="font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Secret Key (PIN)</label>
                            <Input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="****"
                                className="text-center tracking-widest text-xl h-14"
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

                    <div className="pt-4 border-t border-border/50">
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-accent-primary/5 border border-accent-primary/10">
                            <ShieldCheck className="w-5 h-5 text-accent-primary" />
                            <p className="text-[11px] text-text-secondary leading-relaxed uppercase tracking-wider">
                                Every fragment is mathematically unique. No database storage occurs during resolution.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <TerminalLog logs={logs} className="h-full border-accent-secondary/20 shadow-[0_0_30px_rgba(0,255,157,0.05)]" />
        </div>
    );
}
