'use client';

import React, { useState } from 'react';
import CodeBlock from '@/components/CodeBlock'; // Assuming CodeBlock is in this path

interface ComponentPreviewProps {
    children: React.ReactNode;
    code: string;
    title: string;
}

export default function ComponentPreview({ children, code, title }: ComponentPreviewProps) {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="border border-border rounded-xl overflow-hidden bg-bg-secondary shadow-sm mb-8">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-bg-tertiary/50">
                <h3 className="font-bold text-text-primary text-sm">{title}</h3>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-bg-tertiary rounded-lg p-1 border border-border">
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'preview'
                                ? 'bg-bg-secondary text-text-primary shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            Preview
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'code'
                                ? 'bg-bg-secondary text-text-primary shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            Code
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative">
                {activeTab === 'preview' ? (
                    <div className="p-8 min-h-[200px] flex items-center justify-center bg-grid-pattern bg-bg-secondary">
                        <div className="w-full max-w-full overflow-x-auto">
                            {children}
                        </div>
                    </div>
                ) : (
                    <div className="relative group">
                        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={handleCopy}
                                className="bg-bg-primary border border-border text-text-secondary hover:text-text-primary p-2 rounded-md shadow-sm transition-colors text-xs"
                            >
                                {isCopied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <CodeBlock code={code} />
                    </div>
                )}
            </div>
        </div>
    );
}
