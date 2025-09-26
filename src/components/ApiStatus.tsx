import { useEffect } from 'react';
import { useApiHealth } from '@/hooks/useApiHealth';

export const ApiStatus = () => {
    const { isHealthy, isLoading } = useApiHealth();

    // Don't show anything while initially loading
    if (isLoading) return null;

    // Only show when there's a problem
    if (isHealthy) return null;

    return (
        <div className="api-announcement" role="alert">
            <span> The API is currently experiencing issues and may not be available. We are working on a fix.</span>
        </div>
    );
};

// Add styles
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        .api-announcement {
            background-color: var(--error-color);
            color: white;
            text-align: center;
            padding: 0.75rem;
            font-size: 0.875rem;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1001;
            animation: slideDown 0.3s ease-out;
        }

        .api-announcement span {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        @keyframes slideDown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}