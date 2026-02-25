import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        JWT_SECRET_exists: !!process.env.JWT_SECRET,
        JWT_SECRET_length: process.env.JWT_SECRET?.length || 0,
        MONGODB_URI_exists: !!process.env.MONGODB_URI,
        NODE_ENV: process.env.NODE_ENV,
    });
}