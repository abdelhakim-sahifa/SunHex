'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Cpu, Zap, Globe, ArrowLeft, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { Button } from '@/components/ui/Button';

export default function VisionPage() {
    const router = useRouter();

    const PILLARS = [
        {
            title: "Cryptographic Sovereignty",
            desc: "By using PBKDF2 and AES-256-GCM, we ensure that identity codes are mathematically insulated. Without the user's PIN, a SunHex code is just noise.",
            icon: <Lock className="w-12 h-12 text-accent-primary" />
        },
        {
            title: "Universal Compact Standard",
            desc: "By moving to bit-level serialization, we've achieved the ultimate balance of data density and utility. Small enough for QR or NFC.",
            icon: <Cpu className="w-12 h-12 text-accent-primary" />
        },
        {
            title: "Radical Performance",
            desc: "Designed for the 'Instant Web'. Executed at the edge—in browsers, mobile apps, and IoT—with sub-millisecond latency.",
            icon: <Zap className="w-12 h-12 text-accent-primary" />
        }
    ];

    return (
        <div className="min-h-screen">
            <div className="bg-animation">
                <ClientBackgroundAnimation />
            </div>

            <Navbar />

            <main className="relative pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl">

                    {/* Manifesto Header */}
                    <section className="space-y-8 text-center mb-24 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 text-accent-primary font-bold tracking-widest uppercase text-sm">
                            <Shield className="w-5 h-5" />
                            <span>The Quantum Standard</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight">
                            The Evolution of <br />
                            <span className="italic text-transparent bg-clip-text bg-accent-gradient">Digital Sovereignty.</span>
                        </h1>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                            SunHex is no longer just a tool; it is a promise of unbreakable security, absolute privacy, and extreme efficiency.
                        </p>
                    </section>

                    {/* Pillars Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                        {PILLARS.map((pillar, i) => (
                            <div key={i} className="space-y-6 text-center animate-fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                                <div className="w-24 h-24 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,255,157,0.1)]">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary">{pillar.title}</h3>
                                <p className="text-text-muted leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Manifesto Content */}
                    <section className="bg-bg-secondary/40 border border-border p-12 rounded-3xl space-y-12 backdrop-blur-xl animate-fade-in delay-500">
                        <div className="space-y-6 text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-text-primary">Why SunHex Matters</h2>
                            <p>
                                In a world of massive data breaches, SunHex solves the "Identity Honeypot" problem. Instead of companies storing your sensitive data in vulnerable centralized databases, SunHex allows you to carry your identity in a compact, encrypted code.
                            </p>
                            <p>
                                The data only exists when you provide your PIN to "unlock" it. This is not just a technical improvement—it's a fundamental shift in how we carry ourselves in the digital world.
                            </p>
                            <blockquote className="border-l-4 border-accent-primary pl-8 py-4 italic text-2xl text-text-primary font-serif">
                                "Every line of code in the SunHex project going forward must adhere to the Quantum Standard: Zero Leakage. Fail-Fast Integrity. Aesthetic Excellence."
                            </blockquote>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <div className="mt-32 text-center space-y-8 animate-fade-in delay-700">
                        <h3 className="text-4xl font-bold">Ready to join the revolution?</h3>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" onClick={() => router.push('/signup')}>
                                Activate Protocol
                            </Button>
                            <Button variant="ghost" size="lg" onClick={() => router.push('/')}>
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Home
                            </Button>
                        </div>
                        <p className="text-text-muted flex items-center justify-center gap-2 text-sm">
                            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for the future of the web.
                        </p>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
