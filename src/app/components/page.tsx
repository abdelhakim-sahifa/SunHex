'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Copy, Check, Layout, User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import ComponentPreview from '@/components/ComponentPreview';

export default function ComponentsPage() {
    const router = useRouter();

    const SIGNUP_FORM = `import React, { useState } from 'react';
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [sinCode, setSinCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    // Add default test values for required fields not in form
    const payload = {
      ...userData,
      birthYear: 1990,
      birthMonth: 1,
      birthDay: 1,
      gender: 'M'
    };

    try {
      const res = await fetch('https://sunhex.vercel.app/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setSinCode(data.hexCode);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#0B1221] border border-[#1E2D4A] rounded-xl shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-400">Securely encoded with SunHex</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <div className="grid grid-cols-2 gap-2">
              <input 
                name="firstName" 
                placeholder="First Name"
                className="w-full pl-10 pr-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]"
                required
              />
              <input 
                name="lastName" 
                placeholder="Last Name"
                className="w-full px-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Country & PIN</label>
          <div className="grid grid-cols-2 gap-2">
            <input 
              name="countryCode" 
              placeholder="Country (e.g. US)"
              maxLength={2}
              className="w-full px-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]"
              required
            />
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input 
                name="pin" 
                type="password"
                placeholder="4-6 Digit PIN"
                pattern="\\d{4,6}"
                className="w-full pl-9 pr-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]"
                required
              />
            </div>
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full py-3 mt-6 bg-gradient-to-r from-[#00FFB3] to-[#00CC8E] text-[#050911] font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,179,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up with SunHex'}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </form>

      {sinCode && (
        <div className="mt-6 p-4 bg-[#0F192D] border border-[#00FFB3]/30 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Your Unique SIN Code</p>
          <code className="text-xl font-mono text-[#00FFB3]">{sinCode}</code>
        </div>
      )}
    </div>
  );
}`;

    const LOGIN_FORM = `import React, { useState } from 'react';
import { Lock, Fingerprint, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);

    try {
      const res = await fetch('https://sunhex.vercel.app/api/decode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      const data = await res.json();
      if(data.data) setUser(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="w-full max-w-sm mx-auto p-6 bg-[#0B1221] border border-[#00FFB3] rounded-xl text-center">
        <div className="w-16 h-16 bg-[#00FFB3]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Fingerprint className="w-8 h-8 text-[#00FFB3]" />
        </div>
        <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
        <p className="text-[#00FFB3] text-lg mt-2">{user.firstName} {user.lastName}</p>
        <p className="text-gray-400 text-sm mt-1">{user.countryCode} • Born {user.birthYear}</p>
        <button onClick={() => setUser(null)} className="mt-6 text-sm text-gray-400 hover:text-white underline">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-[#0B1221] border border-[#1E2D4A] rounded-xl shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-gray-400">Enter your SIN Code & PIN</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">SIN Code</label>
          <div className="relative">
            <Fingerprint className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input 
              name="hexCode" 
              placeholder="e.g. 0C8F2B1A9D4E"
              className="w-full pl-10 pr-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white font-mono focus:outline-none focus:border-[#00FFB3]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Security PIN</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input 
              name="pin" 
              type="password"
              placeholder="••••"
              pattern="\\d{4,6}"
              className="w-full pl-10 pr-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]"
              required
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full py-3 mt-6 bg-[#162438] hover:bg-[#1E2D4A] text-white font-bold rounded-lg border border-[#00FFB3]/30 hover:border-[#00FFB3] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authenticate'}
        </button>
      </form>
    </div>
  );
}`;

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
                                onClick={() => router.push('/docs')}
                                className="text-text-secondary hover:text-text-primary transition-colors font-medium"
                            >
                                Documentation
                            </button>
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="px-6 py-2 rounded-md bg-accent-gradient text-bg-primary font-bold transition-transform hover:scale-105 active:scale-95"
                            >
                                Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 md:px-8 pt-24 pb-12">
                {/* Header */}
                <section className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 text-accent-primary text-sm font-medium mb-6">
                        <Layout className="w-4 h-4" />
                        <span>Ready-to-use Components</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-accent-gradient">
                        SunHex Component Library
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                        Copy and paste beautiful, secure authentication components directly into your application.
                    </p>
                </section>

                <div className="space-y-20 max-w-5xl mx-auto">
                    {/* Sign Up Component */}
                    <section id="signup" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center border border-accent-primary/30">
                                <User className="w-5 h-5 text-accent-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">Sign Up Component</h2>
                                <p className="text-text-secondary">Registration form that encodes user data to SIN</p>
                            </div>
                        </div>

                        <ComponentPreview title="SignUpForm.tsx" code={SIGNUP_FORM}>
                            <div className="p-8 bg-[#050911] flex items-center justify-center min-h-[500px]">
                                {/* Live Preview of the Form */}
                                <div className="w-full max-w-md p-6 bg-[#0B1221] border border-[#1E2D4A] rounded-xl shadow-2xl relative">
                                    <div className="absolute top-4 right-4 text-xs text-[#00FFB3] border border-[#00FFB3]/30 px-2 py-1 rounded bg-[#00FFB3]/10">Live Preview</div>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                                        <p className="text-gray-400">Securely encoded with SunHex</p>
                                    </div>

                                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input placeholder="First Name" className="w-full pl-10 pr-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]" />
                                                    <input placeholder="Last Name" className="w-full px-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Country & PIN</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input placeholder="Country (e.g. US)" className="w-full px-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]" />
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                                    <input type="password" placeholder="4-6 Digit PIN" className="w-full pl-9 pr-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full py-3 mt-6 bg-gradient-to-r from-[#00FFB3] to-[#00CC8E] text-[#050911] font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,179,0.3)] transition-all flex items-center justify-center gap-2">
                                            Sign Up with SunHex <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </ComponentPreview>
                    </section>

                    {/* Login Component */}
                    <section id="login" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center border border-accent-primary/30">
                                <Lock className="w-5 h-5 text-accent-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">Login Component</h2>
                                <p className="text-text-secondary">Authentication form that decodes SIN to verify user</p>
                            </div>
                        </div>

                        <ComponentPreview title="LoginForm.tsx" code={LOGIN_FORM}>
                            <div className="p-8 bg-[#050911] flex items-center justify-center min-h-[500px]">
                                {/* Live Preview of the Login Form */}
                                <div className="w-full max-w-sm mx-auto p-6 bg-[#0B1221] border border-[#1E2D4A] rounded-xl shadow-2xl relative">
                                    <div className="absolute top-4 right-4 text-xs text-[#00FFB3] border border-[#00FFB3]/30 px-2 py-1 rounded bg-[#00FFB3]/10">Live Preview</div>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
                                        <p className="text-gray-400">Enter your SIN Code & PIN</p>
                                    </div>

                                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">SIN Code</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-3 w-5 h-5 text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.07.93 2 2.07 1.93.94-.06 1.93-1.06 1.93-2.07a2 2 0 0 0-2-2z" /><path d="M2 12h.01" /><path d="M22 12h.01" /><path d="m4.93 19.07.01-.01" /><path d="m19.07 4.93.01-.01" /><path d="m19.07 19.07.01-.01" /><path d="m4.93 4.93.01-.01" /></svg>
                                                </div>
                                                <input placeholder="e.g. 0C8F2B1A9D4E" className="w-full pl-10 pr-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white font-mono focus:outline-none focus:border-[#00FFB3]" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Security PIN</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                                <input type="password" placeholder="••••" className="w-full pl-10 pr-4 py-2 bg-[#0F192D] border border-[#1E2D4A] rounded-lg text-white focus:outline-none focus:border-[#00FFB3]" />
                                            </div>
                                        </div>
                                        <button className="w-full py-3 mt-6 bg-[#162438] hover:bg-[#1E2D4A] text-white font-bold rounded-lg border border-[#00FFB3]/30 hover:border-[#00FFB3] transition-all flex items-center justify-center gap-2">
                                            Authenticate
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </ComponentPreview>
                    </section>
                </div>
            </main>
        </>
    );
}
