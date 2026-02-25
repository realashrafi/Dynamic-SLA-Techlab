// lib/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// ──────────────────────────────────────────────
// اول چک کنیم که secret حتما وجود داشته باشه
// این چک runtime است و اگر env لود نشده باشه، اپ کرش می‌کنه (بهتر از silent fail)
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    console.error('JWT_SECRET در محیط لود نشده است');
    throw new Error('JWT_SECRET تعریف نشده است. لطفاً فایل .env.local را چک کنید.');
}

// حالا TypeScript می‌داند که JWT_SECRET حتماً string است
// (چون اگر undefined بود، throw شده بود)

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(
    password: string,
    hashed: string,
): Promise<boolean> {
    return bcrypt.compare(password, hashed);
}

interface TokenPayload {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
}

export function signToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h',
    });
}

export function verifyToken(token: string): TokenPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // چک اضافی برای اطمینان از شکل payload
        if (
            typeof decoded === 'object' &&
            decoded !== null &&
            'id' in decoded &&
            'email' in decoded
        ) {
            return decoded as TokenPayload;
        }

        return null;
    } catch (err) {
        console.error('خطا در verify توکن:', err);
        return null;
    }
}