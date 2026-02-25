import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { WhiteListSignup } from '@/models/WhiteListSignup';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, name } = await req.json();

        if (!email || !name) {
            return NextResponse.json({ error: 'ایمیل و نام الزامی هستند' }, { status: 400 });
        }

        const existing = await WhiteListSignup.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return NextResponse.json({ error: 'این ایمیل قبلاً در لیست سفید وجود دارد' }, { status: 409 });
        }

        const newEntry = await WhiteListSignup.create({
            email: email.toLowerCase().trim(),
            name: name.trim(),
        });

        return NextResponse.json(
            {
                message: 'رکورد با موفقیت اضافه شد',
                data: newEntry,
            },
            { status: 201 }
        );
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { error: err.message || 'خطای سرور' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const entries = await WhiteListSignup.find({})
            .sort({ createdAt: -1 }) // جدیدترین اول
            .select('-__v'); // فیلدهای غیرضروری حذف

        return NextResponse.json({
            count: entries.length,
            data: entries,
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
    }
}