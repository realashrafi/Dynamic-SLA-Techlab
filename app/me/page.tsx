// app/me/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import DynamicSlaIcon from "@/app/components/DynamicSlaIcon";

export default function MePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('auth_token')

        if (!token) {
            router.replace('/login')
            return
        }

        fetch('/api/auth/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json()
                    throw new Error(err.error || 'Unauthorized')
                }
                return res.json()
            })
            .then((data) => {
                setUser(data.user)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setErrorMsg(err.message)
                localStorage.removeItem('auth_token')
                router.replace('/login')
            })
    }, [router])

    const handleLogout = async () => {
        try {
            // پاک کردن localStorage
            localStorage.removeItem('auth_token');

            // درخواست به سرور برای پاک کردن کوکی HttpOnly
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include', // مهم است تا کوکی ارسال شود
            });

            // ریدایرکت
            router.replace('/login');
            router.refresh(); // برای اطمینان از به‌روزرسانی layout و middleware
        } catch (err) {
            console.error('خطا در خروج:', err);
            // حتی اگر خطا داد، بهتر است کاربر را به لاگین بفرستیم
            router.replace('/login');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center ">

                    <DynamicSlaIcon className="w-16 h-16" />

            </div>
        )
    }

    if (errorMsg) {
        return (
            <div className="min-h-screen flex items-center justify-center  text-white p-6">
                <div className="text-center max-w-md">
                    <p className="text-2xl text-red-400 mb-4">خطا</p>
                    <p className="text-lg opacity-80 mb-6">{errorMsg}</p>
                    <Link
                        href="/login"
                        className="inline-block px-6 py-3 bg-[#FF6B00] text-white rounded-xl hover:bg-[#FF8A3D] transition-colors"
                    >
                        بازگشت به ورود
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen  text-white p-6 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-2xl mx-auto"
            >
                {/* کارت پروفایل شیشه‌ای */}
                <div className="
          backdrop-blur-2xl mt-20 bg-white/5 border border-white/10
          rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60
          p-8 md:p-12 relative overflow-hidden
        ">
                    {/* گرادیان نارنجی ملایم */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/5 via-transparent to-transparent pointer-events-none" />

                    {/* آیکون بزرگ در بالا */}
                    <div className="flex flex-col items-center mb-10">
                        <DynamicSlaIcon className="w-20 h-20 md:w-24 md:h-24 mb-4" />
                        <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                            خوش آمدید، {user?.name || 'کاربر'}
                        </h1>
                    </div>

                    {/* اطلاعات کاربر */}
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10">
                            <span className="text-[#FF6B00] text-xl">📧</span>
                            <div>
                                <p className="text-sm text-white/60">ایمیل</p>
                                <p className="font-medium">{user?.email || '—'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10">
                            <span className="text-[#FF6B00] text-xl">🆔</span>
                            <div>
                                <p className="text-sm text-white/60">شناسه کاربر</p>
                                <p className="text-sm font-mono">{user?._id || '—'}</p>
                            </div>
                        </div>

                        {/* اگر فیلدهای بیشتری مثل تاریخ ثبت‌نام یا نقش داری، اینجا اضافه کن */}
                    </div>

                    {/* دکمه خروج */}
                    <button
                        onClick={handleLogout}
                        className="
              mt-10 w-full py-3.5 bg-gradient-to-r from-red-600/80 to-red-500/80
              text-white font-bold rounded-xl shadow-lg
              hover:from-red-700 hover:to-red-600
              transition-all duration-300 transform hover:scale-[1.02]
            "
                    >
                        خروج از حساب
                    </button>
                </div>

            </motion.div>
        </div>
    )
}