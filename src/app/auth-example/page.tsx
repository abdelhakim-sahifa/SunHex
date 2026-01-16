'use client';

import React from 'react';
import Link from 'next/link';
import { SignUpForm, SignInForm, LocalStorageAdapter, DecodeResponse } from '@/components/auth';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import Navbar from '@/components/Navbar';

const storageAdapter = new LocalStorageAdapter();

export default function AuthExample() {
  const handleSignUpSuccess = (hexCode: string) => {
    console.log('Registration successful! SIN:', hexCode);
    alert(`Registration successful! Your SIN is: ${hexCode}`);
  };

  const handleSignInSuccess = (userData: DecodeResponse['data']) => {
    console.log('Authentication successful!', userData);
    if (userData) {
      alert(`Welcome back, ${userData.firstName}!`);
    }
  };

  return (
    <>
      <div className="bg-animation">
        <ClientBackgroundAnimation />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 md:px-8 pt-24 pb-12">
        <section id="overview" className="section mb-20 animate-fade-in-up">
          <div className="text-center mb-16">
            <h1 className="section-title">Authentication Documentation</h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Learn how to implement secure authentication using SunHex
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-bg-secondary border border-border rounded-xl p-8 backdrop-blur-md shadow-lg">
              <h2 className="text-2xl font-bold mb-4 font-mono text-accent-primary">What is SunHex Authentication?</h2>
              <p className="text-text-secondary leading-relaxed">
                SunHex provides a serverless authentication solution that enables instant user registration
                and login without the need for traditional databases or third-party services. All user data
                is securely encoded in hexadecimal format and protected by a user-defined PIN.
              </p>
            </div>
          </div>
        </section>

        <section id="installation" className="section mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title">Installation</h2>
            <p className="text-lg text-text-secondary">Get started with SunHex authentication in your project</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-code-bg p-6 rounded-lg border border-border overflow-x-auto">
              <pre className="text-text-primary font-mono text-sm"><code>{`npm install @sunhex/auth
# or
yarn add @sunhex/auth`}</code></pre>
            </div>
          </div>
        </section>

        <section id="demo" className="section mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title">Live Demo</h2>
            <p className="text-lg text-text-secondary">Try out the authentication components</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-bg-secondary border border-border rounded-xl p-8 backdrop-blur-md shadow-lg">
              <h3 className="text-xl font-bold mb-6 font-mono text-accent-primary">Sign Up Demo</h3>
              <SignUpForm
                onSignUpSuccess={handleSignUpSuccess}
                storageAdapter={storageAdapter}
              />
            </div>

            <div className="bg-bg-secondary border border-border rounded-xl p-8 backdrop-blur-md shadow-lg">
              <h3 className="text-xl font-bold mb-6 font-mono text-accent-primary">Sign In Demo</h3>
              <SignInForm
                onSignInSuccess={handleSignInSuccess}
                storageAdapter={storageAdapter}
              />
            </div>
          </div>
        </section>

        <section id="examples" className="section mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title">Implementation Examples</h2>
            <p className="text-lg text-text-secondary">Step-by-step guide to implement authentication</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-bg-secondary border border-border rounded-xl p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-4 text-accent-primary font-mono">Sign Up Implementation</h3>
              <pre className="bg-code-bg p-4 rounded border border-border overflow-x-auto text-sm"><code>{`import { SignUpForm } from '@sunhex/auth';

const MySignUpComponent = () => {
  const handleSignUpSuccess = (hexCode) => {
    // Store the hexCode securely
    console.log('Registration successful:', hexCode);
  };

  return (
    <SignUpForm
      onSignUpSuccess={handleSignUpSuccess}
      storageAdapter={new LocalStorageAdapter()}
    />
  );
};`}</code></pre>
            </div>

            <div className="bg-bg-secondary border border-border rounded-xl p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-4 text-accent-primary font-mono">Sign In Implementation</h3>
              <pre className="bg-code-bg p-4 rounded border border-border overflow-x-auto text-sm"><code>{`import { SignInForm } from '@sunhex/auth';

const MySignInComponent = () => {
  const handleSignInSuccess = (userData) => {
    // Handle successful authentication
    console.log('User authenticated:', userData);
  };

  return (
    <SignInForm
      onSignInSuccess={handleSignInSuccess}
      storageAdapter={new LocalStorageAdapter()}
    />
  );
};`}</code></pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-bg-secondary text-text-secondary py-8 text-center border-t border-border mt-16">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8 px-8">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-text-primary">© {new Date().getFullYear()} SunHex API. All rights reserved.</p>
            <p className="text-sm text-text-muted">This is a documentation page for the SunHex authentication system.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
