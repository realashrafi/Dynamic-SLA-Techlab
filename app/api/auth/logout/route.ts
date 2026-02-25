// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'با موفقیت خارج شدید' });

    // پاک کردن کوکی از سمت سرور
    response.cookies.delete('auth_token');

    return response;
}