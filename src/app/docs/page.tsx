'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Code2, Lock, Shield, Cpu, Zap, AlertTriangle, Terminal, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeBlock from '@/components/CodeBlock';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function DocsPage() {
  const router = useRouter();

  const INITIALIZE_CODE = `// 1. Initialize the Master Protocol
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SK_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: "John",
    lastName: "Doe",
    countryCode: "US",
    birthYear: 1990,
    birthMonth: 1,
    birthDay: 1,
    gender: "Male",
    pin: "1234"
  })
});

const { hexCode } = await response.json();
// Result: A versioned, salted Quantum Fragment`;

  const RESOLVE_CODE = `// 2. Resolve Identity from Fragment
const response = await fetch('/api/decode', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SK_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    hexCode: "01A7F2D...", // The Quantum SIN
    pin: "1234"           // The User-Held Key
  })
});

const { personalInfo } = await response.json();
// Result: Pure, validated bio-data`;

  const SDK_INSTALL = `npm install @sunhex/protocol`;

  const SDK_INIT = `import { SunHex } from '@sunhex/protocol';

const sunhex = new SunHex();`;

  const SDK_RESOLVE = `// Resolve a Quantum Fragment
const identity = await sunhex.resolveLocal(
  "01A7F2D...", // The Fragment
  "1234"        // User Private PIN
);

console.log(identity.firstName); // "Abdelhakim"`;

  const SDK_CRYSTALLIZE = `// Securely pack and encrypt biological data
const fragment = await sunhex.crystallizeLocal({
  firstName: "Jane",
  lastName: "Doe",
  countryCode: "US",
  birthYear: 1995,
  birthMonth: 5,
  birthDay: 12,
  gender: "Female"
}, "pin_secret_99");

console.log(fragment); // "02F9A12..."`;

  return (
    <div className="min-h-screen">
      <div className="bg-animation">
        <ClientBackgroundAnimation />
      </div>

      <Navbar />

      <main className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Sidebar Navigation */}
            <aside className="lg:w-64 space-y-8 hidden lg:block h-fit sticky top-32">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-accent-primary tracking-widest uppercase">Protocol</h3>
                <nav className="flex flex-col gap-2">
                  {['Conceptual Shift', 'Binary Specification', 'Security Mandate', 'API Reference', 'SDK Reference'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-text-secondary hover:text-accent-primary transition-colors text-sm font-medium">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 space-y-24 max-w-4xl">

              {/* Header */}
              <section className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-text-primary tracking-tight">
                  Protocol <br />
                  <span className="text-transparent bg-clip-text bg-accent-gradient italic">Specification.</span>
                </h1>
                <p className="text-xl text-text-secondary leading-relaxed">
                  This document serves as the absolute reference for the SunHex Quantum Protocol. It defines the mathematical and architectural requirements for decentralized identity.
                </p>
              </section>

              {/* Conceptual Shift */}
              <section id="conceptual-shift" className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <Shield className="w-6 h-6 text-accent-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Conceptual Shift</h2>
                </div>
                <p className="text-text-secondary">
                  Unlike traditional authentication layers, SunHex does not require you to store a "User Profile". Instead, you compute an identity from a secure **Quantum Fragment** held by the user.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl border border-border bg-bg-secondary/40">
                    <h4 className="font-bold text-accent-primary mb-2 italic">01. Stateless</h4>
                    <p className="text-sm text-text-muted">No database lookups. Identity is derived directly from the code.</p>
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-bg-secondary/40">
                    <h4 className="font-bold text-accent-primary mb-2 italic">02. Sovereign</h4>
                    <p className="text-sm text-text-muted">The user holds the decryption key (PIN). You hold only the liability-free ciphertext.</p>
                  </div>
                </div>
              </section>

              {/* Binary Specification */}
              <section id="binary-specification" className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <Cpu className="w-6 h-6 text-accent-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Binary Specification</h2>
                </div>
                <p className="text-text-secondary">
                  Our protocol uses a custom bit-packing algorithm to minimize payload size while maximizing entropy. A standard SunHex fragment follows this structure:
                </p>
                <Card className="bg-[#1e1e1e] border-none font-mono text-sm overflow-hidden">
                  <div className="p-4 bg-bg-tertiary border-b border-border flex items-center justify-between">
                    <span className="text-text-muted italic">Fragment Layout</span>
                    <Terminal className="w-4 h-4 text-accent-primary" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex gap-4">
                      <span className="text-accent-primary w-24">[1 BYTE]</span>
                      <span className="text-text-primary">VERSION IDENTIFIER</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-accent-primary w-24">[8 BYTES]</span>
                      <span className="text-text-primary">CRYPTOGRAPHIC SALT</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-accent-primary w-24">[12 BYTES]</span>
                      <span className="text-text-primary">INITIALIZATION VECTOR (IV)</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-accent-primary w-24">[VAR]</span>
                      <span className="text-text-primary">AES-GCM AUTHENTICATED PAYLOAD</span>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Security Mandate */}
              <section id="security-mandate" className="space-y-8 border-l-4 border-accent-primary pl-8 py-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-accent-primary" />
                  <h2 className="text-3xl font-bold">Security Mandate</h2>
                </div>
                <div className="space-y-4 text-text-secondary">
                  <p>To maintain "Quantum Standard" status, implementations must adhere to:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><span className="text-text-primary font-bold">Key Derivation</span>: PBKDF2 iterations must remain at 100,000+.</li>
                    <li><span className="text-text-primary font-bold">Encryption</span>: Native Web Crypto API for AES-256-GCM only.</li>
                    <li><span className="text-text-primary font-bold">Privacy</span>: No plaintext PII must touch any database logs.</li>
                  </ul>
                </div>
              </section>

              {/* API Reference */}
              <section id="api-reference" className="space-y-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <Terminal className="w-6 h-6 text-accent-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">API Reference</h2>
                </div>

                {/* Initialization */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded font-bold text-xs">POST</span>
                    <code className="text-text-primary font-bold">/api/generate</code>
                  </div>
                  <p className="text-text-secondary">Generates a versioned, salted Quantum Fragment from user biological data.</p>
                  <CodeBlock language="javascript" code={INITIALIZE_CODE} />
                </div>

                {/* Resolution */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded font-bold text-xs">POST</span>
                    <code className="text-text-primary font-bold">/api/decode</code>
                  </div>
                  <p className="text-text-secondary">Resolves a Quantum Fragment back into biological data using the user's private PIN.</p>
                  <CodeBlock language="javascript" code={RESOLVE_CODE} />
                </div>
              </section>

              {/* SDK Reference */}
              <section id="sdk-reference" className="space-y-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <Code2 className="w-6 h-6 text-accent-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">SDK Reference</h2>
                </div>

                <p className="text-text-secondary">
                  The official SunHex Quantum Protocol SDK for decentralized, stateless identity resolution. Built for edge-native performance and maximum security.
                </p>

                {/* Installation */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-text-primary">Installation</h3>
                  <CodeBlock language="bash" code={SDK_INSTALL} />
                </div>

                {/* Initialization */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-text-primary">Initialization</h3>
                  <p className="text-text-secondary">Initialize the SDK to start performing local, secure operations.</p>
                  <CodeBlock language="javascript" code={SDK_INIT} />
                </div>

                {/* Local Resolution */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-text-primary">Local Resolution (Edge-native)</h3>
                  <p className="text-text-secondary">Resolution happens entirely on your machine. No data ever touches the SunHex servers.</p>
                  <CodeBlock language="javascript" code={SDK_RESOLVE} />
                </div>

                {/* Crystallization */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-text-primary">Crystallization (Fragment Generation)</h3>
                  <p className="text-text-secondary">Securely pack and encrypt biological data into a stateless code.</p>
                  <CodeBlock language="javascript" code={SDK_CRYSTALLIZE} />
                </div>
              </section>

              {/* Next Steps */}
              <section className="pt-12 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 bg-bg-secondary/40 p-8 rounded-2xl border border-border">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Ready to implement?</h3>
                    <p className="text-sm text-text-muted">Start by activating your master protocol key.</p>
                  </div>
                  <Button size="lg" onClick={() => router.push('/signup')}>
                    Activate Now
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
