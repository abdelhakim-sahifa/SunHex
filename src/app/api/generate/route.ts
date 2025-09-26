import { NextRequest, NextResponse } from 'next/server';
import { generateSin } from '../../../services/sinGenerator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, countryCode, birthYear, birthMonth, birthDay, gender, pin } = body;
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'countryCode', 'birthYear', 'birthMonth', 'birthDay', 'gender', 'pin'];
        const missingFields = requiredFields.filter(field => !body[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json({
                status: 'error',
                message: `Missing required fields: ${missingFields.join(', ')}`
            }, { status: 400 });
        }
        
        // Validate PIN is numeric
        if (isNaN(pin)) {
            return NextResponse.json({
                status: 'error',
                message: 'PIN must be a number'
            }, { status: 400 });
        }
        
        const result = generateSin(firstName, lastName, countryCode, birthYear, birthMonth, birthDay, gender, parseInt(pin));
        
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