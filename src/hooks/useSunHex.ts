import { useState } from 'react';
import { FormData, DecodeData, ApiResult } from '@/types';

/**
 * Professional SunHex Unified Hook
 * Handles loading states, API orchestration, and result management.
 */
export function useSunHex() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ApiResult | null>(null);

    const generateSin = async (formData: FormData) => {
        setIsLoading(true);
        setResult(null);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setResult(data);
            return data;
        } catch (error) {
            const errorResult: ApiResult = {
                status: 'error',
                message: 'Internal connection error. Please try again later.'
            };
            setResult(errorResult);
            return errorResult;
        } finally {
            setIsLoading(false);
        }
    };

    const decodeSin = async (decodeData: DecodeData) => {
        setIsLoading(true);
        setResult(null);
        try {
            const response = await fetch('/api/decode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(decodeData),
            });
            const data = await response.json();
            setResult(data);
            return data;
        } catch (error) {
            const errorResult: ApiResult = {
                status: 'error',
                message: 'Failed to communicate with the SunHex Quantum Engine.'
            };
            setResult(errorResult);
            return errorResult;
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setResult(null);
        setIsLoading(false);
    };

    return {
        isLoading,
        result,
        generateSin,
        decodeSin,
        reset
    };
}
