import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyPassword, signToken } from '@/lib/auth';
import {User} from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json({ error: 'ایمیل یا رمزعبور اشتباه است' }, { status: 401 });
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'ایمیل یا رمزعبور اشتباه است' }, { status: 401 });
        }

        const token = signToken({ id: user._id.toString(), email: user.email });

        const response = NextResponse.json({
            message: 'ورود موفق',
            token,
            user: { id: user._id, email: user.email, name: user.name },
        });
        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,   // ۷ روز
            path: '/',
        });
        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
    }
}