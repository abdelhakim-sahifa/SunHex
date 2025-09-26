'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignUpForm, SignInForm, LocalStorageAdapter, DecodeResponse } from '@/components/auth';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import ThemeToggle from '@/components/ThemeToggle';
import './auth.css';

const storageAdapter = new LocalStorageAdapter();

export default function AuthExample() {
  const handleSignUpSuccess = (hexCode: string) => {
    console.log('Registration successful! SIN:', hexCode);
  };

  const handleSignInSuccess = (userData: DecodeResponse['data']) => {
    console.log('Authentication successful!', userData);
  };

  return (
    <>
      <div className="bg-animation">
        <ClientBackgroundAnimation />
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Image src="/favicon.png" alt="SunHex Logo" width={32} height={32} />
            <span><i>SunHex Auth</i></span>
          </div>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#installation">Installation</a></li>
            <li><a href="#examples">Examples</a></li>
            <li><a href="#api">API Reference</a></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>

      <main className="container">
        <section id="overview" className="section">
          <div className="section-header">
            <h1 className="section-title">Authentication Documentation</h1>
            <p className="section-subtitle">
              Learn how to implement secure authentication using SunHex
            </p>
          </div>

          <div className="content-grid">
            <div className="doc-card">
              <h2>What is SunHex Authentication?</h2>
              <p>
                SunHex provides a serverless authentication solution that enables instant user registration
                and login without the need for traditional databases or third-party services. All user data
                is securely encoded in hexadecimal format and protected by a user-defined PIN.
              </p>
            </div>
          </div>
        </section>

        <section id="installation" className="section">
          <div className="section-header">
            <h2 className="section-title">Installation</h2>
            <p className="section-subtitle">Get started with SunHex authentication in your project</p>
          </div>

          <div className="code-block">
            <pre><code>{`npm install @sunhex/auth
# or
yarn add @sunhex/auth`}</code></pre>
          </div>
        </section>

        <section id="examples" className="section">
          <div className="section-header">
            <h2 className="section-title">Implementation Examples</h2>
            <p className="section-subtitle">Step-by-step guide to implement authentication</p>
          </div>

          <div className="implementation-grid">
            <div className="code-example">
              <h3>Sign Up Implementation</h3>
              <pre><code>{`import { SignUpForm } from '@sunhex/auth';

const MySignUpComponent = () => {
  const handleSignUpSuccess = (hexCode) => {
    // Store the hexCode securely or prompt user to save it
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

            <div className="code-example">
              <h3>Sign In Implementation</h3>
              <pre><code>{`import { SignInForm } from '@sunhex/auth';

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

        <section id="demo" className="section">
          <div className="section-header">
            <h2 className="section-title">Live Demo</h2>
            <p className="section-subtitle">Try out the authentication components</p>
          </div>

          <div className="testing-container">
            <div className="test-panel">
              <div className="demo-grid">
                <div className="demo-component">
                  <h3>Sign Up Demo</h3>
                  <SignUpForm
                    onSignUpSuccess={handleSignUpSuccess}
                    storageAdapter={storageAdapter}
                  />
                </div>

                <div className="demo-component">
                  <h3>Sign In Demo</h3>
                  <SignInForm
                    onSignInSuccess={handleSignInSuccess}
                    storageAdapter={storageAdapter}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="api" className="section">
          <div className="section-header">
            <h2 className="section-title">API Reference</h2>
            <p className="section-subtitle">Detailed documentation of available components and props</p>
          </div>

          <div className="api-docs">
            <div className="api-component">
              <h3>SignUpForm Component</h3>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>onSignUpSuccess</td>
                    <td>{`(hexCode: string) => void`}</td>
                    <td>Callback function called after successful registration</td>
                  </tr>
                  <tr>
                    <td>storageAdapter</td>
                    <td>StorageAdapter</td>
                    <td>Adapter for handling data persistence</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="api-component">
              <h3>SignInForm Component</h3>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>onSignInSuccess</td>
                    <td>{`(userData: any) => void`}</td>
                    <td>Callback function called after successful authentication</td>
                  </tr>
                  <tr>
                    <td>storageAdapter</td>
                    <td>StorageAdapter</td>
                    <td>Adapter for handling data persistence</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p className="copyright">© {new Date().getFullYear()} SunHex API. All rights reserved.</p>
            <p className="disclaimer">This is a documentation page for the SunHex authentication system.</p>
          </div>
        </div>
      </footer>
    </>
  );
}