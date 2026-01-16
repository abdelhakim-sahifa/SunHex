'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            setIsAuth(authenticated);
            setIsChecking(false);

            if (!authenticated) {
                router.push('/signup');
            }
        };

        checkAuth();
    }, [router]);

    if (isChecking) {
        return (
            fallback || (
                <div className="min-h-screen flex items-center justify-center bg-bg-primary">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
                        <p className="text-text-secondary">Loading...</p>
                    </div>
                </div>
            )
        );
    }

    if (!isAuth) {
        return null;
    }

    return <>{children}</>;
}
