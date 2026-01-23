'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Key, Copy, Check, LogOut, BookOpen,
    Shield, User, Cpu, Activity, Globe,
    ChevronRight, Zap
} from 'lucide-react';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { getCurrentDeveloper, logout } from '@/lib/auth';
import { DeveloperSession } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { QuantumSandbox } from '@/components/dashboard/QuantumSandbox';

function DashboardContent() {
    const router = useRouter();
    const [developer, setDeveloper] = useState<DeveloperSession | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const dev = getCurrentDeveloper();
        setDeveloper(dev);
    }, []);

    const handleCopyApiKey = () => {
        if (developer) {
            navigator.clipboard.writeText(developer.apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!developer) return null;

    return (
        <div className="min-h-screen">
            <div className="bg-animation">
                <ClientBackgroundAnimation />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-bg-primary/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image src="/favicon.png" alt="SunHex" width={28} height={28} />
                            <span className="text-xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-accent-gradient">
                                SunHex
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" onClick={() => router.push('/docs')}>
                                <BookOpen className="w-4 h-4 mr-2" />
                                Docs
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Terminate
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 md:px-8 pt-32 pb-20">
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
                    <header className="space-y-4">
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-primary uppercase tracking-[0.3em]">
                            <Activity className="w-3 h-3" />
                            System Active: Quantum Node
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary">
                            Welcome, <span className="italic text-transparent bg-clip-text bg-accent-gradient">{developer.userData.firstName}</span>.
                        </h1>
                    </header>
                    <div className="flex items-center gap-8 text-sm">
                        <div className="text-right">
                            <p className="text-text-muted font-bold uppercase tracking-widest text-[10px] mb-1">Heartbeat</p>
                            <p className="text-accent-primary font-mono tabular-nums">1.2ms LATENCY</p>
                        </div>
                        <div className="text-right">
                            <p className="text-text-muted font-bold uppercase tracking-widest text-[10px] mb-1">State</p>
                            <p className="text-accent-secondary font-mono tracking-widest italic">SYNCHRONIZED</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Top Row: API & Profile */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 border-accent-primary/30 shadow-[0_0_50px_rgba(0,255,157,0.05)] bg-accent-primary/[0.02]">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                                        <Key className="w-5 h-5 text-accent-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg uppercase tracking-[0.2em] text-accent-primary">Master Protocol Key</CardTitle>
                                        <CardDescription className="text-xs uppercase tracking-widest">Bearer authentication required for all calls</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4 bg-black/40 border border-border/50 rounded-xl p-6 font-mono text-accent-primary group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-accent-primary/3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <code className="flex-1 text-sm md:text-lg break-all select-all">{developer.apiKey}</code>
                                    <button
                                        onClick={handleCopyApiKey}
                                        className="p-3 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors border border-border group-active:scale-95 shadow-xl"
                                    >
                                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-bg-secondary/40">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
                                    <User className="w-4 h-4" />
                                    Subject Metadata
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-5 pt-0">
                                <div>
                                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Identity Label</p>
                                    <p className="font-bold text-lg">{developer.userData.firstName} {developer.userData.lastName}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Quantum Origin</p>
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-accent-secondary" />
                                            <p className="font-bold font-mono">{developer.userData.countryCode}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Security Score</p>
                                        <p className="font-bold text-accent-primary">9.8/10</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle Row: Quantum Sandbox */}
                    <div>
                        <QuantumSandbox apiKey={developer.apiKey} />
                    </div>

                    {/* Bottom Row: Integration & Resources */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-text-muted flex items-center gap-2">
                                <Cpu className="w-4 h-4" />
                                Core Integration
                            </h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => router.push('/docs')}
                                    className="w-full flex items-center justify-between p-6 rounded-2xl border border-border bg-bg-secondary/40 hover:border-accent-primary/50 hover:bg-bg-secondary transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-lg">Protocol SDK</h4>
                                            <p className="text-sm text-text-muted">Complete API documentation & examples.</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
                                </button>

                                <button
                                    onClick={() => router.push('/vision')}
                                    className="w-full flex items-center justify-between p-6 rounded-2xl border border-border bg-bg-secondary/40 hover:border-accent-secondary/50 hover:bg-bg-secondary transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center text-accent-secondary">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-lg">Identity Vision</h4>
                                            <p className="text-sm text-text-muted">The roadmap to digital sovereignty.</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-secondary group-hover:translate-x-1 transition-all" />
                                </button>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-text-muted flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Security Compliance
                            </h3>
                            <div className="p-8 rounded-2xl border border-accent-primary/10 bg-accent-primary/[0.01] space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(0,255,157,0.8)]" />
                                    <p className="text-sm font-medium text-text-primary">AES-256-GCM Deterministic Encryption</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(0,255,157,0.8)]" />
                                    <p className="text-sm font-medium text-text-primary">PBKDF2-SHA256 (100,000 Iterations)</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-secondary shadow-[0_0_8px_rgba(0,255,234,0.8)]" />
                                    <p className="text-sm font-medium text-text-primary">Stateless Identity Resolution Logic</p>
                                </div>
                                <div className="pt-4 mt-4 border-t border-border/50">
                                    <p className="text-xs text-text-muted italic leading-relaxed">
                                        "Your identity fragment is a crystallized instance of your biological data. It exists only when you provide the secret key."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
