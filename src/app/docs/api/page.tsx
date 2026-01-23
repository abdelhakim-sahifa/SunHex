'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Code2, Database, Shield, AlertCircle, FileText, GitBranch, Settings, ChevronRight, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const sections = [
    {
        id: 'overview',
        title: 'Overview',
        icon: BookOpen,
        description: 'Introduction to SunHex API',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        id: 'api-flow',
        title: 'API Flow',
        icon: GitBranch,
        description: 'Request/response flow through the system',
        color: 'from-purple-500 to-pink-500',
    },
    {
        id: 'endpoints',
        title: 'Endpoints',
        icon: Code2,
        description: 'Complete API endpoint reference',
        color: 'from-green-500 to-emerald-500',
    },
    {
        id: 'authentication',
        title: 'Authentication',
        icon: Shield,
        description: 'Security and authentication details',
        color: 'from-orange-500 to-red-500',
    },
    {
        id: 'data-model',
        title: 'Data Models',
        icon: Database,
        description: 'Schemas and validation rules',
        color: 'from-indigo-500 to-purple-500',
    },
    {
        id: 'errors',
        title: 'Error Handling',
        icon: AlertCircle,
        description: 'Error codes and troubleshooting',
        color: 'from-red-500 to-pink-500',
    },
    {
        id: 'examples',
        title: 'Examples',
        icon: FileText,
        description: 'Real-world API usage examples',
        color: 'from-cyan-500 to-blue-500',
    },
    {
        id: 'versioning',
        title: 'Versioning',
        icon: Settings,
        description: 'API versioning strategy',
        color: 'from-yellow-500 to-orange-500',
    },
];

export default function ApiDocsPage() {
    const router = useRouter();
    const [selectedSection, setSelectedSection] = useState('overview');

    const Section = sections.find(s => s.id === selectedSection);
    const SectionIcon = Section?.icon || BookOpen;

    return (
        <div className="min-h-screen">
            <div className="bg-animation">
                <ClientBackgroundAnimation />
            </div>

            <Navbar />

            <main className="relative pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="mb-12 space-y-6 text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-text-primary tracking-tight">
                            API{' '}
                            <span className="text-transparent bg-clip-text bg-accent-gradient italic">
                                Documentation
                            </span>
                        </h1>
                        <p className="text-xl text-text-secondary leading-relaxed">
                            Complete technical reference for the SunHex Quantum Protocol API. All documentation is generated directly from the codebase.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Button onClick={() => router.push('/docs/quickstart')} variant="outline">
                                Quickstart Guide
                            </Button>
                            <a
                                href="https://github.com/abdelhakim-sahifa/sunhex"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-accent-primary transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                View on GitHub
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="lg:w-80 space-y-4">
                            <div className="sticky top-32 space-y-2">
                                <h3 className="text-sm font-bold text-accent-primary tracking-widest uppercase mb-4">
                                    Documentation
                                </h3>
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    const isActive = selectedSection === section.id;

                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setSelectedSection(section.id)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all ${isActive
                                                ? 'border-accent-primary bg-accent-primary/10'
                                                : 'border-border bg-bg-secondary/40 hover:border-accent-primary/50'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-accent-primary text-white' : 'bg-accent-primary/10 text-accent-primary'
                                                    }`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`font-semibold text-sm ${isActive ? 'text-accent-primary' : 'text-text-primary'
                                                        }`}>
                                                        {section.title}
                                                    </h4>
                                                    <p className="text-xs text-text-muted mt-1 line-clamp-2">
                                                        {section.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}

                                {/* Additional Resources */}
                                <div className="pt-6 mt-6 border-t border-border">
                                    <h3 className="text-sm font-bold text-accent-primary tracking-widest uppercase mb-4">
                                        Resources
                                    </h3>
                                    <div className="space-y-2">
                                        <a
                                            href="https://abdelhakim-sahifa.github.io/SunHex/OPENAPI.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors p-2 rounded-lg hover:bg-bg-secondary"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            OpenAPI Spec
                                        </a>
                                        <a
                                            href="https://abdelhakim-sahifa.github.io/SunHex/DIAGRAMS.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors p-2 rounded-lg hover:bg-bg-secondary"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            System Diagrams
                                        </a>
                                        <a
                                            href="https://abdelhakim-sahifa.github.io/SunHex/CHANGELOG.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors p-2 rounded-lg hover:bg-bg-secondary"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Changelog
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="flex-1">
                            <Card className="border-border bg-bg-secondary/40 backdrop-blur-sm">
                                <div className="p-8 border-b border-border">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${Section?.color} flex items-center justify-center`}>
                                            <SectionIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-text-primary">
                                                {Section?.title}
                                            </h2>
                                            <p className="text-text-muted text-sm mt-1">
                                                {Section?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    {selectedSection === 'overview' && <OverviewContent />}
                                    {selectedSection === 'api-flow' && <ApiFlowContent />}
                                    {selectedSection === 'endpoints' && <EndpointsContent />}
                                    {selectedSection === 'authentication' && <AuthenticationContent />}
                                    {selectedSection === 'data-model' && <DataModelContent />}
                                    {selectedSection === 'errors' && <ErrorsContent />}
                                    {selectedSection === 'examples' && <ExamplesContent />}
                                    {selectedSection === 'versioning' && <VersioningContent />}
                                </div>
                            </Card>

                            {/* Navigation Footer */}
                            <div className="flex items-center justify-between mt-8">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const currentIndex = sections.findIndex(s => s.id === selectedSection);
                                        if (currentIndex > 0) {
                                            setSelectedSection(sections[currentIndex - 1].id);
                                        }
                                    }}
                                    disabled={sections.findIndex(s => s.id === selectedSection) === 0}
                                >
                                    Previous
                                </Button>
                                <Button
                                    onClick={() => {
                                        const currentIndex = sections.findIndex(s => s.id === selectedSection);
                                        if (currentIndex < sections.length - 1) {
                                            setSelectedSection(sections[currentIndex + 1].id);
                                        }
                                    }}
                                    disabled={sections.findIndex(s => s.id === selectedSection) === sections.length - 1}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

// Content Components
function OverviewContent() {
    return (
        <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-bold text-text-primary mb-4">Welcome to SunHex API</h3>
            <p className="text-text-secondary mb-6">
                The SunHex Quantum Protocol API is a cryptographic service for securely encoding and decoding personal information using PIN-based encryption.
            </p>

            <h4 className="text-lg font-semibold text-text-primary mt-8 mb-4">Key Features</h4>
            <ul className="space-y-2 text-text-secondary">
                <li>- Quantum-grade encryption (AES-GCM 256-bit)</li>
                <li>- Support for 195+ countries</li>
                <li>- Binary data serialization for efficiency</li>
                <li>- Zero-knowledge architecture (no data storage)</li>
                <li>- PIN-based security model</li>
            </ul>

            <h4 className="text-lg font-semibold text-text-primary mt-8 mb-4">API Endpoints Summary</h4>
            <div className="grid grid-cols-1 gap-4">
                <EndpointCard method="POST" path="/api/generate" description="Generate encrypted quantum SIN from personal information" />
                <EndpointCard method="POST" path="/api/decode" description="Decode encrypted quantum SIN back to personal information" />
                <EndpointCard method="GET" path="/api/countries" description="List all supported country codes" />
                <EndpointCard method="GET" path="/api/health" description="Check API health status" />
            </div>

            <div className="mt-8 p-6 bg-accent-primary/10 border border-accent-primary/20 rounded-xl">
                <h4 className="text-lg font-semibold text-accent-primary mb-2">📚 Full Documentation</h4>
                <p className="text-text-secondary text-sm">
                    For complete technical details, browse through each section using the sidebar or view the
                    <a href="https://abdelhakim-sahifa.github.io/SunHex/" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline ml-1">
                        complete documentation folder
                    </a>.
                </p>
            </div>
        </div>
    );
}

function EndpointCard({ method, path, description }: { method: string; path: string; description: string }) {
    const methodColor = method === 'POST' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500';

    return (
        <div className="p-4 border border-border rounded-lg bg-bg-tertiary">
            <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${methodColor}`}>
                    {method}
                </span>
                <code className="text-text-primary font-mono text-sm">{path}</code>
            </div>
            <p className="text-text-muted text-sm">{description}</p>
        </div>
    );
}

function ApiFlowContent() {
    return (
        <div className="space-y-6 text-text-secondary">
            <p>
                Understanding the complete request/response flow through the SunHex API, from entry point to final response.
            </p>
            <div className="bg-bg-tertiary p-6 rounded-xl border border-border">
                <h4 className="text-text-primary font-semibold mb-4">System Architecture</h4>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-accent-primary">→</span>
                        <span>API Routes (Entry Point) - Next.js App Router</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-accent-primary">→</span>
                        <span>Validation Layer - Zod schema validation</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-accent-primary">→</span>
                        <span>Service Layer - Quantum encryption/decryption</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-accent-primary">→</span>
                        <span>Core Libraries - Crypto + Protocol + Constants</span>
                    </div>
                </div>
            </div>
            <a
                href="https://abdelhakim-sahifa.github.io/SunHex/API_FLOW.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-primary hover:underline"
            >
                View complete API flow documentation
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}

function EndpointsContent() {
    return (
        <div className="space-y-6 text-text-secondary">
            <p>
                Detailed documentation for all API endpoints including request/response schemas, validation rules, and status codes.
            </p>
            <div className="space-y-4">
                <EndpointCard method="POST" path="/api/generate" description="Generate encrypted quantum SIN from personal information" />
                <EndpointCard method="POST" path="/api/decode" description="Decode encrypted quantum SIN back to personal information" />
                <EndpointCard method="GET" path="/api/countries" description="List all supported country codes (195 total)" />
                <EndpointCard method="GET" path="/api/health" description="Simple health check endpoint" />
            </div>
            <a
                href="https://abdelhakim-sahifa.github.io/SunHex/ENDPOINTS.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-primary hover:underline"
            >
                View complete endpoints documentation
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}

function AuthenticationContent() {
    return (
        <div className="space-y-6 text-text-secondary">
            <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <h4 className="text-orange-500 font-semibold mb-2">⚠️ No Authentication Required</h4>
                <p className="text-sm">
                    The SunHex API does not implement authentication or authorization. All endpoints are publicly accessible.
                </p>
            </div>
            <p>
                Instead of traditional authentication, SunHex uses a <strong className="text-text-primary">PIN-based encryption security model</strong>:
            </p>
            <ul className="space-y-2 list-disc list-inside">
                <li>Users provide 4-6 digit PINs for encryption/decryption</li>
                <li>PBKDF2 key derivation with 100,000 iterations</li>
                <li>AES-GCM 256-bit authenticated encryption</li>
                <li>Zero-knowledge architecture (API never stores data)</li>
            </ul>
            <a
                href="https://abdelhakim-sahifa.github.io/SunHex/AUTH.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-primary hover:underline"
            >
                View complete authentication documentation
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}

function DataModelContent() {
    return (
        <div className="space-y-6 text-text-secondary">
            <p>
                All data structures, schemas, validation rules, and binary protocols used in the SunHex API.
            </p>
            <div className="bg-bg-tertiary p-6 rounded-xl border border-border">
                <h4 className="text-text-primary font-semibold mb-4">Key Data Structures</h4>
                <ul className="space-y-2 text-sm">
                    <li><code className="text-accent-primary">PersonalInfo</code> - Core identity data structure</li>
                    <li><code className="text-accent-primary">QuantumSinSchema</code> - Zod validation for generation</li>
                    <li><code className="text-accent-primary">DecodeSchema</code> - Zod validation for decoding</li>
                    <li><code className="text-accent-primary">Binary Protocol</code> - Custom serialization format</li>
                </ul>
            </div>
            <a
                href="https://abdelhakim-sahifa.github.io/SunHex/DATA_MODEL.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-primary hover:underline"
            >
                View complete data model documentation
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}

function ErrorsContent() {
    return (
        <div className="space-y-6 text-text-secondary">
            <p>
                Comprehensive error documentation including all error cases, HTTP status codes, causes, and resolutions.
            </p>
            <div className="space-y-4">
                <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-mono text-sm">400</span>
                        <span className="text-red-500 font-semibold">Validation Error</span>
                    </div>
                    <p className="text-sm text-text-muted">Request data failed Zod schema validation</p>
                </div>
                <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-mono text-sm">400</span>
                        <span className="text-red-500 font-semibold">Processing Error</span>
                    </div>
                    <p className="text-sm text-text-muted">Encryption/decryption failed (wrong PIN, corrupted data, etc.)</p>
                </div>
                <div className="p-4 border border-yellow-500/20 rounded-lg bg-yellow-500/10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500 font-mono text-sm">503</span>
                        <span className="text-yellow-500 font-semibold">Service Unavailable</span>
                    </div>
                    <p className="text-sm text-text-muted">Health check failed</p>
                </div>
            </div>
            <a
                href="https://abdelhakim-sahifa.github.io/SunHex/ERRORS.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-primary hover:underline"
            >
                View complete error documentation
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}

function ExamplesContent() {
    return (
        <div className="space-y-6 text-text-secondary">
            <p>
                Real-world API usage examples with actual request/response formats.
            </p>
            <div className="bg-bg-tertiary p-6 rounded-xl border border-border font-mono text-sm overflow-x-auto">
                <div className="text-accent-primary mb-2"># Generate Quantum SIN</div>
                <div className="text-text-muted">
                    {`curl -X POST https://sunhex.vercel.app/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "countryCode": "US",
    "birthYear": 1990,
    "birthMonth": 5,
    "birthDay": 15,
    "gender": "Male",
    "pin": "1234"
  }'`}
                </div>
            </div>
            <a
                href="https://abdelhakim-sahifa.github.io/SunHex/EXAMPLES.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-primary hover:underline"
            >
                View complete examples documentation
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}

function VersioningContent() {
    return (
        <div className="space-y-6 text-text-secondary">
            <p>
                API versioning scheme and strategy following Semantic Versioning (SemVer).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg bg-bg-tertiary">
                    <div className="text-accent-primary font-semibold mb-2">API Version</div>
                    <div className="text-2xl font-bold text-text-primary">v0.1.0</div>
                    <div className="text-xs text-text-muted mt-1">Semantic Versioning</div>
                </div>
                <div className="p-4 border border-border rounded-lg bg-bg-tertiary">
                    <div className="text-accent-primary font-semibold mb-2">Protocol Version</div>
                    <div className="text-2xl font-bold text-text-primary">2</div>
                    <div className="text-xs text-text-muted mt-1">Internal encryption protocol</div>
                </div>
                <div className="p-4 border border-border rounded-lg bg-bg-tertiary">
                    <div className="text-accent-primary font-semibold mb-2">Data Format</div>
                    <div className="text-2xl font-bold text-text-primary">1</div>
                    <div className="text-xs text-text-muted mt-1">Binary serialization</div>
                </div>
            </div>
            <a
                href="https://abdelhakim-sahifa.github.io/SunHex/VERSIONING.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-primary hover:underline"
            >
                View complete versioning documentation
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}
