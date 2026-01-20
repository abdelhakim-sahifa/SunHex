'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="border-t border-border bg-bg-secondary/50">
            <div className="container mx-auto px-4 md:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-2">
                            <Image src="/favicon.png" alt="SunHex" width={24} height={24} className="w-6 h-6" />
                            <span className="font-mono font-bold text-text-primary text-xl">SunHex</span>
                        </div>
                        <p className="text-text-muted text-sm max-w-xs text-center md:text-left">
                            The world's most secure, decentralized identity standard.
                            Zero-Trust by design.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                        <p className="text-text-muted text-sm italic">
                            "Privacy is not an option, it's a human right."
                        </p>
                        <p className="text-text-muted text-sm mt-4">
                            © 2026 SunHex Protocol. Developed by <a href="https://github.com/abdelhakim-sahifa" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors font-bold underline">Abdelhakim Sahifa</a>.
                        </p>
                        <div className="flex items-center gap-2 text-text-muted text-sm">
                            <span>Powered by</span>
                            <a href="https://x.com/zeaitoun" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors font-bold">
                                <Image src="/zeaitoun.png" alt="Zeaitoun" width={14} height={14} className="inline-block mr-1" />
                                Zeaitoun
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
