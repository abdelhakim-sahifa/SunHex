'use client';

import { useState } from 'react';
import Image from "next/image";
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 w-full bg-bg-primary/95 backdrop-blur-xl border-b border-border z-50 py-4 transition-all duration-300">
            <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center flex-wrap md:flex-nowrap">
                <div className="flex items-center gap-3 font-bold text-2xl">
                    <Image src="/favicon.png" alt="SunHex Logo" width={32} height={32} />
                    <span className="bg-accent-gradient bg-clip-text text-transparent"><i>SunHex</i></span>
                </div>
                <button
                    className="md:hidden p-2 text-text-primary bg-none border-none cursor-pointer ml-auto"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {isMobileMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
                <ul className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto flex-col md:flex-row gap-4 md:gap-8 list-none mt-4 md:mt-0 p-4 md:p-0 bg-bg-secondary md:bg-transparent shadow-lg md:shadow-none rounded-lg md:rounded-none absolute top-[60px] left-0 right-0 md:static`}>
                    <li><a href="#features" className="text-text-secondary hover:text-accent-primary font-medium transition-colors no-underline block py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</a></li>
                    <li><a href="#docs" className="text-text-secondary hover:text-accent-primary font-medium transition-colors no-underline block py-2" onClick={() => setIsMobileMenuOpen(false)}>Documentation</a></li>
                    <li><a href="#testing" className="text-text-secondary hover:text-accent-primary font-medium transition-colors no-underline block py-2" onClick={() => setIsMobileMenuOpen(false)}>Try it</a></li>
                    <li><a href="#security" className="text-text-secondary hover:text-accent-primary font-medium transition-colors no-underline block py-2" onClick={() => setIsMobileMenuOpen(false)}>Security</a></li>
                    <li><a href="/auth-example" className="text-text-secondary hover:text-accent-primary font-medium transition-colors no-underline block py-2" onClick={() => setIsMobileMenuOpen(false)}>Auth Components</a></li>
                </ul>
                <div className="hidden md:block">
                    <ThemeToggle />
                </div>
                {/* Mobile Theme Toggle integration if needed, usually separate or in menu */}
            </div>
        </nav>
    );
}
