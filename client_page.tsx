"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SunHex } from "@sunhex/protocol";
import { db, UserIdentity } from "@/lib/db";

export default function SunHexCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [pin, setPin] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [status, setStatus] = React.useState<string | null>(null);
    const [fragment, setFragment] = React.useState<string | null>(null);

    React.useEffect(() => {
        const s = searchParams.get("status");
        const f = searchParams.get("fragment");

        if (s && f) {
            setStatus(s);
            setFragment(f);
        }
    }, [searchParams]);

    const handlePinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pin || !fragment) return;

        setIsLoading(true);
        setError("");

        try {
            const sunhex = new SunHex();
            const identity = await sunhex.resolveLocal(fragment, pin);

            if (!identity) {
                throw new Error("Failed to resolve identity. Check PIN.");
            }

            const uid = `sunhex_${fragment.substring(0, 10)}`;
            const displayName = `${identity.firstName} ${identity.lastName}`;

            const newUser: UserIdentity = {
                uid: uid,
                username: identity.firstName?.toLowerCase() || "user",
                displayName: displayName,
                photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`,
                createdAt: Date.now(),
                firstName: identity.firstName,
                lastName: identity.lastName,
                countryCode: identity.countryCode,
                birthYear: identity.birthYear,
                birthMonth: identity.birthMonth,
                birthDay: identity.birthDay,
                gender: identity.gender,
                // @ts-ignore
                fragment: fragment
            };

            await db.saveUser(newUser);
            localStorage.setItem("aecipher_uid", uid);
            window.location.href = "/";

        } catch (err: any) {
            console.error("SunHex Error:", err);
            setError(err.message || "Identity verification failed");
        } finally {
            setIsLoading(false);
        }
    };

    if (!status && !fragment) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0f1115',
                color: '#e6e6e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Space Mono", monospace'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}>
                    <div style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        border: '2px solid rgba(0, 255, 157, 0.3)',
                        borderTopColor: '#00ff9d',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p style={{
                        color: '#888888',
                        fontSize: '0.75rem',
                        textTransform: 'lowercase'
                    }}>Initializing secure connection...</p>
                </div>
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0f1115',
            color: '#e6e6e6',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            fontFamily: '"Space Mono", monospace',
            position: 'relative'
        }}>
            {/* Background Gradient Effect */}
            <div style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 0
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(0, 255, 157, 0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)'
                }} />
            </div>

            <div style={{
                width: '100%',
                maxWidth: '480px',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Partnership Logos */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <img
                            src="/icon.svg"
                            alt="Client Logo"
                            style={{
                                height: '40px',
                                width: 'auto',
                                filter: 'drop-shadow(0 4px 12px rgba(0, 255, 157, 0.15))'
                            }}
                        />
                    </div>

                    <div style={{
                        fontSize: '1.5rem',
                        color: '#00ff9d',
                        fontWeight: 'bold'
                    }}>×</div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <img
                            src="/sunhex.svg"
                            alt="SunHex Logo"
                            style={{
                                height: '40px',
                                width: 'auto',
                                filter: 'drop-shadow(0 4px 12px rgba(0, 255, 157, 0.15))'
                            }}
                        />
                    </div>
                </div>

                {/* Header Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0, 255, 157, 0.2)',
                        background: 'rgba(0, 255, 157, 0.05)',
                        color: '#00ff9d',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        letterSpacing: '0.05em',
                        marginBottom: '1.5rem'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>POWERED BY SUNHEX PROTOCOL</span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                        fontWeight: 'bold',
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, #00ff9d, #00ffea)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '0.75rem'
                    }}>
                        Identity Verification
                    </h1>

                    <p style={{
                        color: '#888888',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                    }}>
                        Enter your private PIN to decrypt and access your identity
                    </p>
                </div>

                {/* Main Card */}
                <div style={{
                    background: 'rgba(26, 28, 34, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1.5rem',
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
                }}>
                    <form onSubmit={handlePinSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.625rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#888888',
                                marginBottom: '0.5rem',
                                marginLeft: '0.25rem'
                            }}>
                                Private PIN
                            </label>

                            <div style={{ position: 'relative' }}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#888888"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        transition: 'stroke 0.2s'
                                    }}
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>

                                <input
                                    type="password"
                                    placeholder="••••"
                                    required
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    maxLength={8}
                                    autoFocus
                                    style={{
                                        width: '100%',
                                        height: '3.5rem',
                                        paddingLeft: '2.75rem',
                                        paddingRight: '1rem',
                                        background: 'rgba(15, 17, 21, 0.8)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '0.75rem',
                                        color: '#e6e6e6',
                                        fontSize: '1.125rem',
                                        letterSpacing: '0.5em',
                                        textAlign: 'center',
                                        fontFamily: '"Space Mono", monospace',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(0, 255, 157, 0.5)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 157, 0.1)';
                                        const svg = e.target.previousElementSibling as SVGElement;
                                        if (svg) svg.style.stroke = '#00ff9d';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.boxShadow = 'none';
                                        const svg = e.target.previousElementSibling as SVGElement;
                                        if (svg) svg.style.stroke = '#888888';
                                    }}
                                />
                            </div>
                        </div>

                        {error && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1rem',
                                background: 'rgba(248, 113, 113, 0.1)',
                                border: '1px solid rgba(248, 113, 113, 0.2)',
                                borderRadius: '0.75rem',
                                color: '#f87171',
                                fontSize: '0.875rem',
                                marginBottom: '1.5rem',
                                animation: 'slideDown 0.3s ease-out'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                height: '3.5rem',
                                background: 'linear-gradient(135deg, #00ff9d, #00ffea)',
                                color: '#0f1115',
                                border: 'none',
                                borderRadius: '0.75rem',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                fontFamily: '"Space Mono", monospace',
                                letterSpacing: '-0.01em',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 0 30px rgba(0, 255, 157, 0.3)',
                                opacity: isLoading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 157, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 157, 0.3)';
                            }}
                            onMouseDown={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.transform = 'scale(0.98)';
                                }
                            }}
                            onMouseUp={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            {isLoading ? (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        animation: 'spin 1s linear infinite',
                                        margin: '0 auto',
                                        display: 'block'
                                    }}
                                >
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                            ) : (
                                "Decrypt & Access"
                            )}
                        </button>
                    </form>

                    {/* Security Footer */}
                    <div style={{
                        marginTop: '2rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                        color: '#888888'
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>AES-256-GCM Encrypted • Zero-Knowledge Architecture</span>
                    </div>
                </div>

                {/* Bottom Info */}
                <div style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#666666'
                }}>
                    <p style={{ marginBottom: '0.5rem' }}>
                        Secured by <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>SunHex Protocol</span>
                    </p>
                    <p style={{ fontSize: '0.625rem' }}>
                        Your data is encrypted client-side. We never store your PIN.
                    </p>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                input::placeholder {
                    letter-spacing: normal;
                    color: #888888;
                    opacity: 0.5;
                }

                @media (max-width: 640px) {
                    /* Responsive adjustments for mobile */
                }
            `}</style>
        </div>
    );
}
