// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { User } from '@/models/User';

// لیست سفید ایمیل‌های مجاز
// می‌تونی این لیست را بعداً از env یا فایل json بخوانی
const ALLOWED_EMAILS = [
    'admin@example.com',
    'manager@company.ir',
    'user1@domain.com',
    'test@yourcompany.com',
];

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'همه فیلدها الزامی هستند' }, { status: 400 });
        }

        // چک کردن وایت‌لیست
        const normalizedEmail = email.toLowerCase().trim();
        if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
            return NextResponse.json(
                { error: 'این ایمیل اجازه ثبت‌نام ندارد. با مدیر سیستم تماس بگیرید.' },
                { status: 403 }
            );
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return NextResponse.json({ error: 'این ایمیل قبلاً ثبت شده' }, { status: 409 });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            email: normalizedEmail,
            password: hashedPassword,
            name,
        });

        return NextResponse.json(
            {
                message: 'کاربر با موفقیت ثبت شد',
                userId: user._id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('خطا در ثبت‌نام:', error);
        return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
    }
}