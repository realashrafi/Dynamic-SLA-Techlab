// models/WhiteListSignup.ts
import { Schema, model, models } from 'mongoose';

const whiteListSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'ایمیل الزامی است'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'فرمت ایمیل معتبر نیست'],
        },
        name: {
            type: String,
            required: [true, 'نام الزامی است'],
            trim: true,
            minlength: [2, 'نام حداقل ۲ کاراکتر باید باشد'],
        },
    },
    {
        timestamps: true, // createdAt و updatedAt اتوماتیک
    }
);

// جلوگیری از تعریف چندباره مدل در hot-reload
export const WhiteListSignup = models.WhiteListSignup || model('WhiteListSignup', whiteListSchema);