import { NextRequest, NextResponse } from 'next/server';
import { decodeQuantumSin } from '../../../services/quantum';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { hexCode, pin } = body;

        // Validate required fields
        if (!hexCode || !pin) {
            return NextResponse.json({
                status: 'error',
                message: 'Missing required fields: hexCode and pin'
            }, { status: 400 });
        }

        const result = await decodeQuantumSin(hexCode, pin.toString());

        if (result.status === 'error') {
            return NextResponse.json(result, { status: 400 });
        } else {
            return NextResponse.json(result);
        }
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 400 });
    }
}