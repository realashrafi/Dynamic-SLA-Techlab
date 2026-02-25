// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { User } from '@/models/User';
import { WhiteListSignup } from '@/models/WhiteListSignup'; // ← اضافه کردن مدل

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'همه فیلدها الزامی هستند' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // چک کردن وجود ایمیل در لیست سفید (کالکشن white-list-signup)
        const allowed = await WhiteListSignup.findOne({
            email: normalizedEmail,
        });

        if (!allowed) {
            return NextResponse.json(
                { error: 'این ایمیل اجازه ثبت‌نام ندارد. با مدیر سیستم تماس بگیرید.' },
                { status: 403 }
            );
        }

        // چک کردن اینکه قبلاً ثبت‌نام نکرده باشد
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return NextResponse.json({ error: 'این ایمیل قبلاً ثبت شده است' }, { status: 409 });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            email: normalizedEmail,
            password: hashedPassword,
            name: name.trim(),
        });

        // اختیاری: بعد از ثبت‌نام موفق می‌تونی رکورد whitelist رو حذف کنی (یک‌بار مصرف)
        // await WhiteListSignup.deleteOne({ email: normalizedEmail });

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