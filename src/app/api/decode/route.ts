import { NextRequest, NextResponse } from 'next/server';
import { decodeSin } from '../../../services/sinDecoder';

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
        
        // Validate PIN is numeric
        if (isNaN(pin)) {
            return NextResponse.json({
                status: 'error',
                message: 'PIN must be a number'
            }, { status: 400 });
        }
        
        const result = decodeSin(hexCode, parseInt(pin));
        
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