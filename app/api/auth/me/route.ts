import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        let token: string | null = null;

        const authHeader = req.headers.get('authorization');
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1] ?? null;
        }

        // اگر Bearer Token نبود → fallback به cookie
        if (!token) {
            token = req.cookies.get('auth_token')?.value ?? null;
        }

        if (!token) {
            return NextResponse.json({ error: 'لطفاً وارد شوید' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'توکن نامعتبر است' }, { status: 401 });
        }

        const user = await User.findById(payload.id).select('-password');
        if (!user) {
            return NextResponse.json({ error: 'کاربر یافت نشد' }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
    }
}