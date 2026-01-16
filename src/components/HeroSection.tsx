'use client';

import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="h-screen flex items-center justify-center text-center relative overflow-hidden px-4 md:px-8">
            <div className="max-w-[800px] z-[2]">
                <div className="flex justify-center mb-8 gap-6 animate-fade-in-up">
                    <Image
                        src="/favicon.png"
                        alt="SunHex Logo"
                        width={96}
                        height={96}
                        priority
                        className="w-16 h-16 md:w-24 md:h-24 animate-[fadeInRotate_1.2s_ease-out]"
                    />
                    <h1 className="text-5xl md:text-7xl font-bold m-0 inline-flex items-center bg-accent-gradient bg-clip-text text-transparent">
                        <i>SunHex</i>
                    </h1>
                </div>
                <h2 className="text-xl md:text-3xl text-text-secondary mb-8 font-normal animate-fade-in-up [animation-delay:0.2s] opacity-0 fill-mode-forwards">
                    Serverless Universal Number in Hexadecimal
                </h2>
                <p className="text-lg text-text-muted mb-12 animate-fade-in-up [animation-delay:0.4s] opacity-0 fill-mode-forwards max-w-[600px] mx-auto">
                    Sign up and sign in instantly without servers or third-party accounts. All your essential personal data is securely encoded in a single hexadecimal string, unlocked only with your personal PIN. Fast, private, and self-contained identity management.
                </p>
                <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up [animation-delay:0.6s] opacity-0 fill-mode-forwards">
                    <a href="#testing" className="btn btn-primary">Try it now</a>
                    <a href="#docs" className="btn btn-secondary">View Documentation</a>
                </div>
            </div>
        </section>
    );
}
