'use client';

import React, { useState } from 'react';
import { Shield, Zap, AlertTriangle, CheckCircle2, XCircle, Play, Replay } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TestCase {
    name: string;
    description: string;
    payload: any;
    expectedStatus: 'success' | 'error';
    expectedCode?: string;
    category: 'Logical' | 'Security' | 'Schema' | 'Success';
}

const TEST_CASES: TestCase[] = [
    {
        name: "Valid Generation",
        category: 'Success',
        description: "Standard valid identity fragment creation",
        expectedStatus: 'success',
        payload: {
            firstName: "John",
            lastName: "Doe",
            countryCode: "US",
            birthYear: 1990,
            birthMonth: 5,
            birthDay: 15,
            gender: "Male",
            pin: "1234"
        }
    },
    {
        name: "Logical Date: Feb 31",
        category: 'Logical',
        description: "Checking calendar consistency (Zod refine)",
        expectedStatus: 'error',
        expectedCode: 'VALIDATION_ERROR',
        payload: {
            firstName: "Jane",
            lastName: "Smith",
            countryCode: "FR",
            birthYear: 1990,
            birthMonth: 2,
            birthDay: 31,
            gender: "Female",
            pin: "5555"
        }
    },
    {
        name: "Security: Short PIN",
        category: 'Security',
        description: "PIN less than 4 digits",
        expectedStatus: 'error',
        expectedCode: 'VALIDATION_ERROR',
        payload: {
            firstName: "Security",
            lastName: "Test",
            countryCode: "GB",
            birthYear: 1985,
            birthMonth: 10,
            birthDay: 10,
            gender: "Other",
            pin: "123"
        }
    },
    {
        name: "Security: Long PIN",
        category: 'Security',
        description: "PIN more than 6 digits",
        expectedStatus: 'error',
        expectedCode: 'VALIDATION_ERROR',
        payload: {
            firstName: "Security",
            lastName: "Test",
            countryCode: "DE",
            birthYear: 1985,
            birthMonth: 10,
            birthDay: 10,
            gender: "Other",
            pin: "1234567"
        }
    },
    {
        name: "Schema: Future Year",
        category: 'Schema',
        description: "Birth year in the future",
        expectedStatus: 'error',
        expectedCode: 'VALIDATION_ERROR',
        payload: {
            firstName: "Future",
            lastName: "Man",
            countryCode: "JP",
            birthYear: 2050,
            birthMonth: 1,
            birthDay: 1,
            gender: "Male",
            pin: "9999"
        }
    },
    {
        name: "Schema: Invalid Country",
        category: 'Schema',
        description: "Non-existent country code",
        expectedStatus: 'error',
        expectedCode: 'VALIDATION_ERROR',
        payload: {
            firstName: "Invalid",
            lastName: "Country",
            countryCode: "XX",
            birthYear: 1990,
            birthMonth: 1,
            birthDay: 1,
            gender: "Female",
            pin: "1111"
        }
    }
];

export default function TestPage() {
    const [results, setResults] = useState<Record<number, any>>({});
    const [isRunning, setIsRunning] = useState(false);

    const runTest = async (index: number) => {
        const test = TEST_CASES[index];
        setResults(prev => ({ ...prev, [index]: { status: 'running' } }));

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(test.payload)
            });
            const data = await response.json();

            const isPassing = data.status === test.expectedStatus &&
                (!test.expectedCode || data.code === test.expectedCode);

            setResults(prev => ({
                ...prev,
                [index]: {
                    status: 'done',
                    passed: isPassing,
                    data
                }
            }));
            return isPassing;
        } catch (error) {
            setResults(prev => ({
                ...prev,
                [index]: { status: 'done', passed: false, error }
            }));
            return false;
        }
    };

    const runAll = async () => {
        setIsRunning(true);
        for (let i = 0; i < TEST_CASES.length; i++) {
            await runTest(i);
        }
        setIsRunning(false);
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary pt-32 pb-20">
            <Navbar />
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold italic mb-2">Protocol <span className="text-accent-primary">Test Bench.</span></h1>
                        <p className="text-text-secondary">Verifying the Triple-Lock validation architecture.</p>
                    </div>
                    <Button
                        size="lg"
                        onClick={runAll}
                        disabled={isRunning}
                        className="bg-accent-primary hover:bg-accent-secondary"
                    >
                        {isRunning ? <Zap className="w-5 h-5 animate-pulse mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                        Run All Scenarios
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {TEST_CASES.map((test, i) => (
                        <Card key={i} className={`border-accent-primary/20 transition-all ${results[i]?.status === 'running' ? 'ring-2 ring-accent-primary animate-pulse' : ''}`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${test.category === 'Success' ? 'bg-green-500/10 text-green-500' :
                                                test.category === 'Logical' ? 'bg-purple-500/10 text-purple-500' :
                                                    test.category === 'Security' ? 'bg-red-500/10 text-red-500' :
                                                        'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {test.category}
                                        </span>
                                        <CardTitle className="text-lg font-bold">{test.name}</CardTitle>
                                    </div>
                                    <CardDescription>{test.description}</CardDescription>
                                </div>
                                {results[i]?.status === 'done' && (
                                    results[i].passed ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-500" />
                                    )
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-bg-tertiary rounded-lg p-3 font-mono text-[11px] overflow-hidden">
                                    <div className="text-text-muted mb-1">// Payload</div>
                                    <div className="text-accent-primary">{JSON.stringify(test.payload, null, 2)}</div>
                                </div>

                                {results[i]?.status === 'done' && (
                                    <div className="p-3 rounded-lg bg-bg-secondary border border-border">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">API Response</span>
                                            <span className={`text-xs font-bold ${results[i].data?.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                                HTTP {results[i].data?.status === 'success' ? '200' : '400'}
                                            </span>
                                        </div>
                                        <pre className="text-[10px] text-text-primary whitespace-pre-wrap">
                                            {JSON.stringify(results[i].data, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
