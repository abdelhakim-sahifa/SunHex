'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Shield, Zap, Lock, Cpu, Globe, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeBlock from '@/components/CodeBlock';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="bg-animation">
        <ClientBackgroundAnimation />
      </div>

      <Navbar />

      <main className="relative pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-8 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/20 bg-accent-primary/5 text-accent-primary text-sm font-medium tracking-wide">
              <Shield className="w-4 h-4" />
              <span>THE QUANTUM IDENTITY VISION</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              <span className="text-transparent bg-clip-text bg-accent-gradient">
                Digital
              </span>
              <br />
              <span className="text-text-primary">
                Sovereignty.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Eliminate databases. Secure every byte. Reclaim your identity with the unbreakable SunHex Quantum Protocol.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button size="lg" onClick={() => router.push('/signup')} className="w-full sm:w-auto">
                Activate Protocol
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => router.push('/docs')} className="w-full sm:w-auto">
                Protocol Specs
              </Button>
            </div>
          </div>

          {/* Core Code Preview */}
          <div className="mt-24 max-w-3xl mx-auto animate-fade-in delay-500">
            <div className="rounded-xl border border-border bg-bg-secondary/50 p-1 backdrop-blur-xl">
              <CodeBlock
                language="javascript"
                code={`// Initialize Quantum Identity
const sunhex = await SunHex.initialize({
  firstName: "Satoshi",
  lastName: "Nakamoto",
  pin: "****",
  options: { security: "High" }
});

// Output: Unbreakable Stateless Hex
console.log(sunhex.code); 
// "01A7F2D..."`}
              />
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="container mx-auto px-4 md:px-8 py-32 border-t border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
                The Honeypot <br />
                <span className="text-accent-primary">Problem.</span>
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed">
                Traditional databases are centralized liabilities. Storing sensitive user data makes you a target. SunHex changes the game: we don't store—we compute.
              </p>
              <ul className="space-y-4">
                {[
                  "No Centralized Database Leakage",
                  "Mathematical Insulation (AES-256-GCM)",
                  "Absolute User Sovereignty",
                  "Zero-Trust Architecture"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-primary font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-500 text-lg">Centralized Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">
                    Your users' names, birthdays, and origins are sitting in a SQL table waiting for a breach.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-accent-primary/20 bg-accent-primary/5">
                <CardHeader>
                  <CardTitle className="text-accent-primary text-lg">SunHex Logic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">
                    Data exists only as a Quantum Fragment. Decryption happens at the edge, triggered by the user.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="bg-bg-secondary/30 py-32 border-y border-border/50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">The Three Pillars</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Every line of the SunHex Protocol is guided by our oath of excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-bg-primary/50">
                <CardHeader>
                  <Cpu className="w-10 h-10 text-accent-primary mb-4" />
                  <CardTitle>Sovereignty</CardTitle>
                  <CardDescription>
                    The user is the only keyholder. PBKDF2 iterations ensure hardware-resistant security.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-bg-primary/50">
                <CardHeader>
                  <Zap className="w-10 h-10 text-accent-primary mb-4" />
                  <CardTitle>Efficiency</CardTitle>
                  <CardDescription>
                    Sub-millisecond serialization using our bit-packing binary protocol.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-bg-primary/50">
                <CardHeader>
                  <Globe className="w-10 h-10 text-accent-primary mb-4" />
                  <CardTitle>Universal</CardTitle>
                  <CardDescription>
                    Compact enough for QR, NFC, or plain text. Identity that travels with the user.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-8 py-32">
          <div className="max-w-4xl mx-auto bg-accent-gradient rounded-3xl p-12 text-center space-y-8 shadow-[0_0_50px_rgba(0,255,157,0.2)]">
            <Lock className="w-16 h-16 text-bg-primary mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold text-bg-primary italic">
              Ready to secure the future?
            </h2>
            <p className="text-xl text-bg-primary/80 font-medium">
              Join the developers building a zero-trust world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" onClick={() => router.push('/signup')} className="bg-bg-primary text-text-primary hover:bg-bg-secondary w-full sm:w-auto">
                Get Master API Key
              </Button>
              <Button size="lg" variant="ghost" onClick={() => router.push('/docs')} className="text-bg-primary hover:bg-bg-primary/10 w-full sm:w-auto">
                Read the Specs
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
