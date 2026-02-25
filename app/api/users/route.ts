// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        // فقط فیلدهای مهم رو برگردون (رمز عبور رو هرگز نفرست!)
        const users = await User.find({})
            .select('_id name email createdAt updatedAt') 
            .sort({ createdAt: -1 }) // جدیدترین اول
            .lean(); // سریع‌تر می‌شه (اختیاری)

        return NextResponse.json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error('خطا در گرفتن لیست کاربران:', error);
        return NextResponse.json(
            { success: false, error: 'خطای سرور' },
            { status: 500 }
        );
    }
}