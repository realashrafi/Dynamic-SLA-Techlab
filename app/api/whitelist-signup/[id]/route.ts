import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { WhiteListSignup } from '@/models/WhiteListSignup';
import mongoose from 'mongoose';

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }  // ← نوع Promise
) {
    try {
        await connectDB();

        // await کردن params ← این خط مهم‌ترین بخش است
        const params = await context.params;
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'شناسه نامعتبر است' }, { status: 400 });
        }

        const deleted = await WhiteListSignup.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: 'رکورد یافت نشد' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'رکورد با موفقیت حذف شد',
            deletedId: id,
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        // await کردن params
        const params = await context.params;
        const { id } = params;

        const { email, name } = await req.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'شناسه نامعتبر است' }, { status: 400 });
        }

        if (!email && !name) {
            return NextResponse.json(
                { error: 'حداقل یکی از فیلدها (ایمیل یا نام) باید ارسال شود' },
                { status: 400 }
            );
        }

        const updateData: any = {};
        if (email) updateData.email = email.toLowerCase().trim();
        if (name) updateData.name = name.trim();

        // چک uniqueness ایمیل اگر تغییر کرده
        if (email) {
            const duplicate = await WhiteListSignup.findOne({
                email: updateData.email,
                _id: { $ne: id },
            });
            if (duplicate) {
                return NextResponse.json({ error: 'این ایمیل قبلاً استفاده شده است' }, { status: 409 });
            }
        }

        const updated = await WhiteListSignup.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return NextResponse.json({ error: 'رکورد یافت نشد' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'رکورد با موفقیت بروزرسانی شد',
            data: updated,
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message || 'خطای سرور' }, { status: 500 });
    }
}