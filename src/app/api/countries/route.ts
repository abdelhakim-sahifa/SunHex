import { NextResponse } from 'next/server';
import { COUNTRY_CODES } from '../../../utils/constants';

export async function GET() {
    return NextResponse.json({
        status: 'success',
        countries: Object.keys(COUNTRY_CODES).sort()
    });
}