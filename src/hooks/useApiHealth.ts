import { useState, useEffect } from 'react';

export const useApiHealth = () => {
    const [isHealthy, setIsHealthy] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const response = await fetch('/api/health');
                const data = await response.json();
                setIsHealthy(data.status === 'success');
            } catch (error) {
                setIsHealthy(false);
            } finally {
                setIsLoading(false);
            }
        };

        // Initial check
        checkHealth();

        // Set up periodic health checks every 30 seconds
        const interval = setInterval(checkHealth, 30000);

        return () => clearInterval(interval);
    }, []);

    return { isHealthy, isLoading };
};