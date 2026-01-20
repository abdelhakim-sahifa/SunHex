'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-bg-primary/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/favicon.png" alt="SunHex" width={32} height={32} className="w-8 h-8" />
                        <span className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-accent-gradient">
                            SunHex
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/docs" className="text-text-secondary hover:text-text-primary transition-colors font-medium">
                            Protocol
                        </Link>
                        <Link href="/vision" className="text-text-secondary hover:text-text-primary transition-colors font-medium">
                            Vision
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/docs')}
                            className="hidden sm:inline-flex"
                        >
                            Documentation
                        </Button>
                        <Button onClick={() => router.push('/signup')}>
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
