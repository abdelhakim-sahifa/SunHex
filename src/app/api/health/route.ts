import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Here you can add additional checks if needed
        // For example, checking database connection, external services, etc.
        
        return NextResponse.json({
            status: 'success',
            message: 'API is healthy',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'API health check failed',
            timestamp: new Date().toISOString()
        }, { status: 503 });
    }
}