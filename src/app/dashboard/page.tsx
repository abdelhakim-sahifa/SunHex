'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Key, Copy, Check, LogOut, Code2, Play, BookOpen } from 'lucide-react';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { getCurrentDeveloper, logout } from '@/lib/auth';
import { DeveloperSession } from '@/lib/storage';
import CodeBlock from '@/components/CodeBlock';

function DashboardContent() {
    const router = useRouter();
    const [developer, setDeveloper] = useState<DeveloperSession | null>(null);
    const [copied, setCopied] = useState(false);
    const [testData, setTestData] = useState({
        name: 'John Doe',
        country: 'US'
    });
    const [testResult, setTestResult] = useState<string>('');
    const [isTestingEncode, setIsTestingEncode] = useState(false);

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

    const handleTestEncode = async () => {
        if (!developer) return;

        setIsTestingEncode(true);
        setTestResult('');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${developer.apiKey}`
                },
                body: JSON.stringify({
                    firstName: testData.name.split(' ')[0] || 'John',
                    lastName: testData.name.split(' ')[1] || 'Doe',
                    countryCode: testData.country,
                    birthYear: 1990,
                    birthMonth: 1,
                    birthDay: 1,
                    gender: 'M',
                    pin: '1234'
                })
            });

            const data = await response.json();
            setTestResult(data.hexCode || 'Error: ' + data.message);
        } catch (error) {
            setTestResult('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setIsTestingEncode(false);
        }
    };

    if (!developer) return null;

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
                                className="text-text-secondary hover:text-text-primary transition-colors font-medium flex items-center gap-2"
                            >
                                <BookOpen className="w-4 h-4" />
                                Docs
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-text-secondary hover:text-error-color transition-colors font-medium flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 md:px-8 pt-24 pb-12">
                {/* Welcome Header */}
                <section className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-text-primary">
                        Welcome back, {developer.userData.firstName}! 👋
                    </h1>
                    <p className="text-lg text-text-secondary">
                        Here's your developer dashboard. Your API key is ready to use.
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* API Key Section */}
                        <div className="bg-bg-secondary border border-accent-primary/30 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Key className="w-5 h-5 text-accent-primary" />
                                <h2 className="text-xl font-bold text-text-primary">Your API Key</h2>
                            </div>

                            <div className="flex items-center gap-2 bg-bg-tertiary border border-border rounded-lg p-4">
                                <code className="flex-1 font-mono text-sm text-accent-primary overflow-x-auto">
                                    {developer.apiKey}
                                </code>
                                <button
                                    onClick={handleCopyApiKey}
                                    className="px-4 py-2 bg-accent-gradient text-bg-primary text-sm font-medium rounded-md hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            <p className="text-xs text-text-muted mt-3">
                                Include this key in the Authorization header for all API requests.
                            </p>
                        </div>

                        {/* Quick Start */}
                        <div className="bg-bg-secondary border border-border rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Code2 className="w-5 h-5 text-accent-primary" />
                                <h2 className="text-xl font-bold text-text-primary">Quick Start</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-text-primary mb-2">Encode User Data</h3>
                                    <CodeBlock
                                        language="javascript"
                                        code={`const response = await fetch('https://sunhex.vercel.app/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${developer.apiKey}'
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

const { hexCode } = await response.json();
console.log(hexCode); // "0C8F2B1A9D4E"`}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-medium text-text-primary mb-2">Decode SIN</h3>
                                    <CodeBlock
                                        language="javascript"
                                        code={`const response = await fetch('https://sunhex.vercel.app/api/decode', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${developer.apiKey}'
  },
  body: JSON.stringify({
    hexCode: '0C8F2B1A9D4E',
    pin: '1234'
  })
});

const { data } = await response.json();
console.log(data); // { firstName: 'John', lastName: 'Doe', ... }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Test Playground */}
                        <div className="bg-bg-secondary border border-border rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Play className="w-5 h-5 text-accent-primary" />
                                <h2 className="text-xl font-bold text-text-primary">Test Playground</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={testData.name}
                                            onChange={(e) => setTestData({ ...testData, name: e.target.value })}
                                            className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">Country</label>
                                        <input
                                            type="text"
                                            value={testData.country}
                                            onChange={(e) => setTestData({ ...testData, country: e.target.value })}
                                            className="w-full p-3 bg-bg-tertiary border border-border rounded-md text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                            placeholder="US"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleTestEncode}
                                    disabled={isTestingEncode}
                                    className="w-full p-3 rounded-md bg-accent-gradient text-bg-primary font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isTestingEncode ? 'Testing...' : 'Test Encode'}
                                </button>

                                {testResult && (
                                    <div className="bg-bg-tertiary border border-accent-primary/30 rounded-lg p-4">
                                        <p className="text-xs text-text-muted mb-1">Result:</p>
                                        <code className="text-accent-primary font-mono">{testResult}</code>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Account Info */}
                        <div className="bg-bg-secondary border border-border rounded-xl p-6">
                            <h3 className="font-bold text-text-primary mb-4">Account Info</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-text-muted">Name</p>
                                    <p className="text-text-primary font-medium">
                                        {developer.userData.firstName} {developer.userData.lastName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-text-muted">Country</p>
                                    <p className="text-text-primary font-medium">{developer.userData.countryCode}</p>
                                </div>
                                <div>
                                    <p className="text-text-muted">SIN Code</p>
                                    <code className="text-accent-primary font-mono text-xs">{developer.sinCode}</code>
                                </div>
                            </div>
                        </div>

                        {/* Resources */}
                        <div className="bg-bg-secondary border border-border rounded-xl p-6">
                            <h3 className="font-bold text-text-primary mb-4">Resources</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push('/docs')}
                                    className="w-full text-left px-4 py-3 bg-bg-tertiary hover:bg-accent-primary/10 border border-border hover:border-accent-primary/30 rounded-lg transition-colors"
                                >
                                    <p className="font-medium text-text-primary">API Documentation</p>
                                    <p className="text-xs text-text-muted mt-1">Complete API reference</p>
                                </button>
                                <button
                                    onClick={() => router.push('/components')}
                                    className="w-full text-left px-4 py-3 bg-bg-tertiary hover:bg-accent-primary/10 border border-border hover:border-accent-primary/30 rounded-lg transition-colors"
                                >
                                    <p className="font-medium text-text-primary">Components Library</p>
                                    <p className="text-xs text-text-muted mt-1">Ready-to-use Auth forms</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
