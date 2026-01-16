'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap, Code2, Lock, BookOpen, Shield, Layout, Check, Copy } from 'lucide-react';
import Image from 'next/image';
import CodeBlock from '@/components/CodeBlock';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <div className="bg-animation">
        <ClientBackgroundAnimation />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-bg-primary/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/favicon.png" alt="SunHex" width={32} height={32} className="w-8 h-8" />
              <span className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-accent-gradient">
                SunHex
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/docs')}
                className="text-text-secondary hover:text-text-primary transition-colors font-medium"
              >
                Documentation
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="px-6 py-2 rounded-md bg-accent-gradient text-bg-primary font-bold transition-transform hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-8 pt-32 pb-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 text-accent-primary text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Secure Identity Encoding as a Service</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-accent-gradient leading-tight">
              Backend Authentication,
              <br />
              Simplified.
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
              Transform user data into secure, reversible identity codes.
              One API call. Zero complexity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push('/signup')}
                className="group px-8 py-4 rounded-md bg-accent-gradient text-bg-primary font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] flex items-center gap-2"
              >
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push('/docs')}
                className="px-8 py-4 rounded-md bg-bg-secondary border border-border text-text-primary font-bold text-lg hover:border-accent-primary/50 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                View Documentation
              </button>
            </div>

            {/* Code Preview */}
            <div className="mt-16 bg-bg-secondary border border-border rounded-xl p-6 text-left max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-auto text-xs text-text-muted font-mono">Quick Start</span>
              </div>
              <CodeBlock
                language="javascript"
                code={`// Encode user data to SIN
const response = await fetch('/api/encode', {
  headers: { 
    'Authorization': 'Bearer YOUR_API_KEY' 
  },
  method: 'POST',
  body: JSON.stringify({ userData })
});

const { sinCode } = await response.json();
// Returns: "0C8F2B1A9D4E"`}
              />
            </div>
          </div>
        </section>

        {/* Components Library Showcase */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent-primary/5 -skew-y-3 transform origin-top-left scale-110" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 text-accent-primary text-sm font-medium">
                  <Layout className="w-4 h-4" />
                  <span>Ready-to-use Library</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-transparent bg-clip-text bg-accent-gradient">
                    Drop-in Authentication Components
                  </span>
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Don't build from scratch. Use our pre-built, secure, and beautiful React components for Sign Up and Login. Just copy, paste, and configure.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => router.push('/components')}
                    className="group px-8 py-4 bg-bg-tertiary border border-accent-primary/30 hover:border-accent-primary rounded-lg font-bold text-text-primary transition-all hover:shadow-[0_0_30px_rgba(0,255,179,0.15)] flex items-center justify-center gap-2"
                  >
                    View Component Library
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="flex gap-6 pt-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Check className="w-5 h-5 text-accent-primary" />
                    <span>React / Next.js</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Check className="w-5 h-5 text-accent-primary" />
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Check className="w-5 h-5 text-accent-primary" />
                    <span>Fully Type-Safe</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 w-full perspective-1000">
                <div className="relative transform rotate-y-12 transition-transform hover:rotate-y-0 duration-700">
                  <div className="absolute -inset-4 bg-accent-gradient opacity-20 blur-2xl rounded-xl" />
                  <div className="bg-[#0B1221] border border-[#1E2D4A] rounded-xl shadow-2xl p-6 relative overflow-hidden">
                    {/* Mock Login Component UI */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#00FFB3]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-[#00FFB3]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Sign In</h3>
                      <p className="text-gray-400">Enter your SIN Code & PIN</p>
                    </div>
                    <div className="space-y-4 pointer-events-none opacity-80">
                      <div className="h-10 bg-[#0F192D] border border-[#1E2D4A] rounded-lg w-full" />
                      <div className="h-10 bg-[#0F192D] border border-[#1E2D4A] rounded-lg w-full" />
                      <div className="h-12 bg-gradient-to-r from-[#00FFB3] to-[#00CC8E] rounded-lg w-full mt-6" />
                    </div>

                    <div className="absolute bottom-4 right-4 bg-[#00FFB3] text-[#050911] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Copy className="w-3 h-3" />
                      Click to Copy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 md:px-8 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-text-primary">
            Everything you need to build secure auth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card group">
              <div className="w-14 h-14 rounded-lg bg-accent-primary/20 flex items-center justify-center mb-6 text-accent-primary group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-accent-primary transition-colors">
                Military-Grade Security
              </h3>
              <p className="text-text-secondary">
                Your user data is encrypted with PIN-based protection. Only you can decode it.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card group">
              <div className="w-14 h-14 rounded-lg bg-accent-primary/20 flex items-center justify-center mb-6 text-accent-primary group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-accent-primary transition-colors">
                Lightning Fast
              </h3>
              <p className="text-text-secondary">
                Sub-100ms response times. Encode and decode user identities in a single API call.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card group">
              <div className="w-14 h-14 rounded-lg bg-accent-primary/20 flex items-center justify-center mb-6 text-accent-primary group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-accent-primary transition-colors">
                Simple API
              </h3>
              <p className="text-text-secondary">
                RESTful endpoints, clear documentation, and SDKs. Get started in minutes, not days.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 md:px-8 py-20 bg-bg-secondary/30">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-text-primary">
            How It Works
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center text-bg-primary font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">Sign Up & Get Your API Key</h3>
                <p className="text-text-secondary">
                  Create your developer account in seconds. You'll receive a unique API key instantly.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center text-bg-primary font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">Encode User Data</h3>
                <p className="text-text-secondary">
                  Send user information to our API. We'll return a compact, secure SIN code.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center text-bg-primary font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">Decode When Needed</h3>
                <p className="text-text-secondary">
                  Verify users by decoding their SIN with their PIN. Instant authentication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-8 py-20 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-accent-primary/30 rounded-2xl p-12">
            <Lock className="w-16 h-16 text-accent-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
              Ready to secure your app?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Join developers building the future of authentication.
            </p>
            <button
              onClick={() => router.push('/signup')}
              className="px-8 py-4 rounded-md bg-accent-gradient text-bg-primary font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] inline-flex items-center gap-2"
            >
              Get Your Free API Key
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/favicon.png" alt="SunHex" width={24} height={24} className="w-6 h-6" />
              <span className="font-mono font-bold text-text-primary">SunHex</span>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
              <p className="text-text-muted text-sm">
                © 2026 SunHex. Secure identity encoding made simple.
              </p>
              <p className="text-text-muted text-sm">
                Developed by <a href="https://github.com/abdelhakim-sahifa" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Abdelhakim Sahifa</a> at <a href="https://x.com/zeaitoun" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors"><Image src="/zeaitoun.png" alt="Zeaitoun Logo" width={14} height={14} className="inline-block align-middle mr-1" />Zeaitoun.</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
