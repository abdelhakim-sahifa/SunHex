'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Code2, Key, Lock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import ComponentPreview from '@/components/ComponentPreview';

export default function DocsPage() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string>('');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const ENCODE_EXAMPLE = `// Encode user data to SIN
const response = await fetch('https://sunhex.vercel.app/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    countryCode: 'US',
    birthYear: 1990,
    birthMonth: 1,
    birthDay: 1,
    gender: 'M',
    pin: '1234'
  })
});

const data = await response.json();
console.log(data);
// {
//   "status": "success",
//   "hexCode": "0C8F2B1A9D4E"
// }`;

  const DECODE_EXAMPLE = `// Decode SIN to user data
const response = await fetch('https://sunhex.vercel.app/api/decode', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    hexCode: '0C8F2B1A9D4E',
    pin: '1234'
  })
});

const data = await response.json();
console.log(data);
// {
//   "status": "success",
//   "data": {
//     "firstName": "John",
//     "lastName": "Doe",
//     "countryCode": "US",
//     "birthYear": 1990,
//     "birthMonth": 1,
//     "birthDay": 1,
//     "gender": "M"
//   }
// }`;

  const CURL_ENCODE = `curl -X POST https://sunhex.vercel.app/api/generate \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "countryCode": "US",
    "birthYear": 1990,
    "birthMonth": 1,
    "birthDay": 1,
    "gender": "M",
    "pin": "1234"
  }'`;

  return (
    <>
      <div className="bg-animation">
        <ClientBackgroundAnimation />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-bg-primary/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push('/')} className="flex items-center gap-2">
              <Image src="/favicon.png" alt="SunHex" width={32} height={32} className="w-8 h-8" />
              <span className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-accent-gradient">
                SunHex
              </span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-text-secondary hover:text-text-primary transition-colors font-medium"
              >
                Dashboard
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

      <main className="container mx-auto px-4 md:px-8 pt-24 pb-12">
        {/* Header */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 text-accent-primary text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>API Documentation</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-accent-gradient">
            Developer Documentation
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Everything you need to integrate SunHex into your application
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-bg-secondary border border-border rounded-xl p-4">
              <nav className="space-y-2">
                <a href="#getting-started" className="block px-3 py-2 text-text-primary hover:bg-accent-primary/10 rounded-md transition-colors font-medium">
                  Getting Started
                </a>
                <a href="#authentication" className="block px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-accent-primary/10 rounded-md transition-colors">
                  Authentication
                </a>
                <a href="#endpoints" className="block px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-accent-primary/10 rounded-md transition-colors">
                  API Endpoints
                </a>
                <a href="#errors" className="block px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-accent-primary/10 rounded-md transition-colors">
                  Error Codes
                </a>
                <a href="#examples" className="block px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-accent-primary/10 rounded-md transition-colors">
                  Code Examples
                </a>
                <a href="#frameworks" className="block px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-accent-primary/10 rounded-md transition-colors">
                  Frameworks
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Getting Started */}
            <section id="getting-started">
              <h2 className="text-3xl font-bold mb-6 text-text-primary border-b border-border pb-3">
                Getting Started
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">1. Get Your API Key</h3>
                  <p className="text-text-secondary mb-4">
                    Sign up for a free account to receive your API key. You'll need this to authenticate all requests.
                  </p>
                  <button
                    onClick={() => router.push('/signup')}
                    className="px-6 py-3 rounded-md bg-accent-gradient text-bg-primary font-bold transition-all hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                  >
                    Create Free Account
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">2. Base URL</h3>
                  <div className="bg-bg-tertiary border border-border rounded-lg p-4">
                    <code className="text-accent-primary font-mono">https://sunhex.vercel.app/api</code>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">3. Make Your First Request</h3>
                  <p className="text-text-secondary mb-4">
                    All requests require your API key in the Authorization header.
                  </p>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication">
              <h2 className="text-3xl font-bold mb-6 text-text-primary border-b border-border pb-3 flex items-center gap-2">
                <Key className="w-7 h-7 text-accent-primary" />
                Authentication
              </h2>

              <div className="bg-bg-secondary border border-accent-primary/30 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-accent-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-text-primary mb-2">API Key Authentication</h4>
                    <p className="text-text-secondary mb-4">
                      Include your API key in the <code className="text-accent-primary bg-bg-tertiary px-2 py-1 rounded">Authorization</code> header of every request:
                    </p>
                    <pre className="bg-bg-tertiary border border-border rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-text-primary">Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-2">Keep Your API Key Secure</h4>
                    <p className="text-text-secondary text-sm">
                      Never expose your API key in client-side code or public repositories. Always use environment variables and server-side requests.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* API Endpoints */}
            <section id="endpoints">
              <h2 className="text-3xl font-bold mb-6 text-text-primary border-b border-border pb-3 flex items-center gap-2">
                <Code2 className="w-7 h-7 text-accent-primary" />
                API Endpoints
              </h2>

              {/* Encode Endpoint */}
              <div className="mb-8">
                <div
                  className="bg-bg-secondary border border-border rounded-xl p-6 cursor-pointer hover:border-accent-primary/30 transition-colors"
                  onClick={() => toggleSection('encode')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 font-mono text-sm font-bold rounded">POST</span>
                      <code className="text-text-primary font-mono">/generate</code>
                    </div>
                    {expandedSection === 'encode' ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
                  </div>
                  <p className="text-text-secondary mt-2">Encode user data into a secure SIN code</p>
                </div>

                {expandedSection === 'encode' && (
                  <div className="bg-bg-tertiary border border-border border-t-0 rounded-b-xl p-6 space-y-6">
                    <div>
                      <h4 className="font-bold text-text-primary mb-3">Request Body</h4>
                      <pre className="bg-bg-secondary border border-border rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-text-primary">{`{
  "firstName": "string",      // Required
  "lastName": "string",       // Required
  "countryCode": "string",    // Required (2-letter code)
  "birthYear": number,        // Required (1900-current)
  "birthMonth": number,       // Required (1-12)
  "birthDay": number,         // Required (1-31)
  "gender": "M" | "F",        // Required
  "pin": "string"             // Required (4-6 digits)
}`}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-bold text-text-primary mb-3">Response</h4>
                      <pre className="bg-bg-secondary border border-border rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-text-primary">{`{
  "status": "success",
  "hexCode": "0C8F2B1A9D4E"
}`}</code>
                      </pre>
                    </div>

                    <ComponentPreview title="JavaScript Example" code={ENCODE_EXAMPLE}>
                      <div className="p-4 bg-bg-secondary rounded-lg">
                        <p className="text-text-secondary text-sm">Click "Code" tab to view the example →</p>
                      </div>
                    </ComponentPreview>
                  </div>
                )}
              </div>

              {/* Decode Endpoint */}
              <div className="mb-8">
                <div
                  className="bg-bg-secondary border border-border rounded-xl p-6 cursor-pointer hover:border-accent-primary/30 transition-colors"
                  onClick={() => toggleSection('decode')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 font-mono text-sm font-bold rounded">POST</span>
                      <code className="text-text-primary font-mono">/decode</code>
                    </div>
                    {expandedSection === 'decode' ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
                  </div>
                  <p className="text-text-secondary mt-2">Decode a SIN code back to user data</p>
                </div>

                {expandedSection === 'decode' && (
                  <div className="bg-bg-tertiary border border-border border-t-0 rounded-b-xl p-6 space-y-6">
                    <div>
                      <h4 className="font-bold text-text-primary mb-3">Request Body</h4>
                      <pre className="bg-bg-secondary border border-border rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-text-primary">{`{
  "hexCode": "string",  // Required (SIN code)
  "pin": "string"       // Required (4-6 digits)
}`}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-bold text-text-primary mb-3">Response</h4>
                      <pre className="bg-bg-secondary border border-border rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-text-primary">{`{
  "status": "success",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "countryCode": "US",
    "birthYear": 1990,
    "birthMonth": 1,
    "birthDay": 1,
    "gender": "M"
  }
}`}</code>
                      </pre>
                    </div>

                    <ComponentPreview title="JavaScript Example" code={DECODE_EXAMPLE}>
                      <div className="p-4 bg-bg-secondary rounded-lg">
                        <p className="text-text-secondary text-sm">Click "Code" tab to view the example →</p>
                      </div>
                    </ComponentPreview>
                  </div>
                )}
              </div>
            </section>

            {/* Error Codes */}
            <section id="errors">
              <h2 className="text-3xl font-bold mb-6 text-text-primary border-b border-border pb-3">
                Error Codes
              </h2>

              <div className="space-y-4">
                <div className="bg-bg-secondary border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="text-red-500 font-mono font-bold">400</code>
                    <span className="text-text-primary font-medium">Bad Request</span>
                  </div>
                  <p className="text-text-secondary text-sm">Invalid request parameters or malformed data.</p>
                </div>

                <div className="bg-bg-secondary border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="text-red-500 font-mono font-bold">401</code>
                    <span className="text-text-primary font-medium">Unauthorized</span>
                  </div>
                  <p className="text-text-secondary text-sm">Missing or invalid API key.</p>
                </div>

                <div className="bg-bg-secondary border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="text-red-500 font-mono font-bold">500</code>
                    <span className="text-text-primary font-medium">Internal Server Error</span>
                  </div>
                  <p className="text-text-secondary text-sm">Something went wrong on our end. Please try again.</p>
                </div>
              </div>
            </section>

            {/* Code Examples */}
            <section id="examples">
              <h2 className="text-3xl font-bold mb-6 text-text-primary border-b border-border pb-3">
                More Examples
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">cURL</h3>
                  <ComponentPreview title="cURL Encode Example" code={CURL_ENCODE}>
                    <div className="p-4 bg-bg-secondary rounded-lg">
                      <p className="text-text-secondary text-sm">Click "Code" tab to view the cURL example →</p>
                    </div>
                  </ComponentPreview>
                </div>
              </div>
            </section>

            {/* Framework Examples */}
            <section id="frameworks">
              <h2 className="text-3xl font-bold mb-6 text-text-primary border-b border-border pb-3">
                Framework Integration
              </h2>

              <p className="text-text-secondary mb-8">
                See how to integrate SunHex with popular frameworks and platforms
              </p>

              <div className="space-y-8">
                {/* Next.js */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-text-primary flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 180 180" fill="none">
                      <mask id="mask0_408_134" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                        <circle cx="90" cy="90" r="90" fill="black" />
                      </mask>
                      <g mask="url(#mask0_408_134)">
                        <circle cx="90" cy="90" r="90" fill="currentColor" className="text-text-primary" />
                        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)" />
                        <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)" />
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    Next.js
                  </h3>
                  <ComponentPreview
                    title="Next.js Server Component Example"
                    code={`// app/api/auth/encode/route.ts
export async function POST(request: Request) {
  const userData = await request.json();
  
  const response = await fetch('https://sunhex.vercel.app/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${process.env.SUNHEX_API_KEY}\`
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();
  return Response.json(data);
}

// app/login/page.tsx
'use client';

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    const res = await fetch('/api/auth/encode', {
      method: 'POST',
      body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        // ... other fields
      })
    });
    const { hexCode } = await res.json();
    console.log('SIN Code:', hexCode);
  }
  
  return <form action={handleLogin}>...</form>;
}`}
                  >
                    <div className="p-4 bg-bg-secondary rounded-lg">
                      <p className="text-text-secondary text-sm">Server-side API route in Next.js →</p>
                    </div>
                  </ComponentPreview>
                </div>

                {/* React (Vite) */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-text-primary flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 410 404" fill="none">
                      <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#paint0_linear)" />
                      <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#paint1_linear)" />
                      <defs>
                        <linearGradient id="paint0_linear" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#41D1FF" />
                          <stop offset="1" stopColor="#BD34FE" />
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFEA83" />
                          <stop offset="0.0833333" stopColor="#FFDD35" />
                          <stop offset="1" stopColor="#FFA800" />
                        </linearGradient>
                      </defs>
                    </svg>
                    Vite + React
                  </h3>
                  <ComponentPreview
                    title="React with Vite Example"
                    code={`// src/services/sunhex.ts
const API_KEY = import.meta.env.VITE_SUNHEX_API_KEY;

export async function encodeSIN(userData) {
  const response = await fetch('https://sunhex.vercel.app/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${API_KEY}\`
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
}

// src/components/AuthForm.tsx
import { useState } from 'react';
import { encodeSIN } from '../services/sunhex';

export function AuthForm() {
  const [sinCode, setSinCode] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await encodeSIN({
      firstName: 'John',
      lastName: 'Doe',
      countryCode: 'US',
      birthYear: 1990,
      birthMonth: 1,
      birthDay: 1,
      gender: 'M',
      pin: '1234'
    });
    
    setSinCode(data.hexCode);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}`}
                  >
                    <div className="p-4 bg-bg-secondary rounded-lg">
                      <p className="text-text-secondary text-sm">React component with Vite →</p>
                    </div>
                  </ComponentPreview>
                </div>

                {/* Svelte */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-text-primary flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 98.1 118" fill="none">
                      <path d="M91.8,15.6C80.9,-0.1,59.2,-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6" fill="#FF3E00" />
                      <path d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4-1.7,0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9" fill="white" />
                    </svg>
                    Svelte
                  </h3>
                  <ComponentPreview
                    title="Svelte Example"
                    code={`<script lang="ts">
  import { writable } from 'svelte/store';
  
  const sinCode = writable('');
  const apiKey = import.meta.env.VITE_SUNHEX_API_KEY;
  
  async function encodeSIN(userData: any) {
    const response = await fetch('https://sunhex.vercel.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${apiKey}\`
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    sinCode.set(data.hexCode);
  }
  
  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    await encodeSIN({
      firstName: 'John',
      lastName: 'Doe',
      countryCode: 'US',
      birthYear: 1990,
      birthMonth: 1,
      birthDay: 1,
      gender: 'M',
      pin: '1234'
    });
  }
</script>

<form on:submit={handleSubmit}>
  <!-- Form fields -->
  <button type="submit">Encode</button>
</form>

{#if $sinCode}
  <p>SIN Code: {$sinCode}</p>
{/if}`}
                  >
                    <div className="p-4 bg-bg-secondary rounded-lg">
                      <p className="text-text-secondary text-sm">Svelte component example →</p>
                    </div>
                  </ComponentPreview>
                </div>

                {/* React Native */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-text-primary flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
                      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                      <g stroke="#61dafb" strokeWidth="1" fill="none">
                        <ellipse rx="11" ry="4.2" />
                        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                      </g>
                    </svg>
                    React Native
                  </h3>
                  <ComponentPreview
                    title="React Native Example"
                    code={`// services/sunhex.ts
import { SUNHEX_API_KEY } from '@env';

export const encodeSIN = async (userData: any) => {
  try {
    const response = await fetch('https://sunhex.vercel.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${SUNHEX_API_KEY}\`
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SunHex Error:', error);
    throw error;
  }
};

// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { encodeSIN } from '../services/sunhex';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await encodeSIN({
        firstName: 'John',
        lastName: 'Doe',
        countryCode: 'US',
        birthYear: 1990,
        birthMonth: 1,
        birthDay: 1,
        gender: 'M',
        pin: '1234'
      });
      
      Alert.alert('Success', \`SIN Code: \${result.hexCode}\`);
    } catch (error) {
      Alert.alert('Error', 'Failed to encode SIN');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View>
      <Button 
        title={loading ? 'Loading...' : 'Login'} 
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}`}
                  >
                    <div className="p-4 bg-bg-secondary rounded-lg">
                      <p className="text-text-secondary text-sm">React Native mobile app →</p>
                    </div>
                  </ComponentPreview>
                </div>

                {/* Flutter */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-text-primary flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 256 317" fill="none">
                      <defs>
                        <linearGradient x1="3.9517088%" y1="26.9930287%" x2="75.8970734%" y2="52.9192657%" id="gradient-1">
                          <stop stopColor="#000000" offset="0%"></stop>
                          <stop stopColor="#000000" stopOpacity="0" offset="100%"></stop>
                        </linearGradient>
                      </defs>
                      <polygon fill="#47C5FB" points="157.665785 0.000549356223 0.000549356223 157.665785 48.8009614 206.466197 255.267708 0.000549356223"></polygon>
                      <polygon fill="#47C5FB" points="156.567183 145.396793 72.1487107 229.815265 121.132608 279.530905 169.842925 230.820587 255.267818 145.396793"></polygon>
                      <polygon fill="#00569E" points="121.133047 279.531124 158.214592 316.61267 255.267159 316.61267 169.842266 230.820807"></polygon>
                      <polygon fill="#00B5F8" points="71.5995742 230.364072 120.401085 181.562561 169.842046 230.821136 121.132827 279.531454"></polygon>
                      <polygon fillOpacity="0.85" fill="url(#gradient-1)" points="121.132827 279.531454 161.692896 266.072227 165.721875 234.941308"></polygon>
                    </svg>
                    Flutter
                  </h3>
                  <ComponentPreview
                    title="Flutter Example"
                    code={`// lib/services/sunhex_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class SunHexService {
  static const String apiKey = String.fromEnvironment('SUNHEX_API_KEY');
  static const String baseUrl = 'https://sunhex.vercel.app/api';
  
  Future<Map<String, dynamic>> encodeSIN(Map<String, dynamic> userData) async {
    final response = await http.post(
      Uri.parse('\$baseUrl/generate'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer \$apiKey',
      },
      body: jsonEncode(userData),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to encode SIN');
    }
  }
  
  Future<Map<String, dynamic>> decodeSIN(String hexCode, String pin) async {
    final response = await http.post(
      Uri.parse('\$baseUrl/decode'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer \$apiKey',
      },
      body: jsonEncode({'hexCode': hexCode, 'pin': pin}),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to decode SIN');
    }
  }
}

// lib/screens/login_screen.dart
import 'package:flutter/material.dart';
import '../services/sunhex_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _sunhexService = SunHexService();
  bool _loading = false;
  
  Future<void> _handleLogin() async {
    setState(() => _loading = true);
    
    try {
      final result = await _sunhexService.encodeSIN({
        'firstName': 'John',
        'lastName': 'Doe',
        'countryCode': 'US',
        'birthYear': 1990,
        'birthMonth': 1,
        'birthDay': 1,
        'gender': 'M',
        'pin': '1234'
      });
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('SIN Code: \${result['hexCode']}')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: \$e')),
      );
    } finally {
      setState(() => _loading = false);
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: _loading ? null : _handleLogin,
          child: Text(_loading ? 'Loading...' : 'Login'),
        ),
      ),
    );
  }
}`}
                  >
                    <div className="p-4 bg-bg-secondary rounded-lg">
                      <p className="text-text-secondary text-sm">Flutter Dart service →</p>
                    </div>
                  </ComponentPreview>
                </div>
              </div>
            </section>
          </div>
        </div >
      </main >
    </>
  );
}
