import { NextRequest, NextResponse } from 'next/server';
import { decodeQuantumSin } from '../../../services/quantum';
import { DecodeSchema } from '../../../lib/schemas/quantum';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Advanced validation using Zod
        const validation = DecodeSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                status: 'error',
                code: 'VALIDATION_ERROR',
                message: 'Invalid request data',
                errors: (validation.error.issues || []).map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }))
            }, { status: 400 });
        }

        const { hexCode, pin } = validation.data;

        const result = await decodeQuantumSin(hexCode, pin);

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