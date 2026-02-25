// components/Header.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import DynamicSlaIcon from "@/app/components/DynamicSlaIcon"
import { motion } from 'framer-motion'
import {Cookie, LogOut} from "lucide-react"

export default function Header() {
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    // فقط روی کلاینت اجرا می‌شود
    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token')
        setToken(storedToken)
    }, [pathname])

    const handleLogout = async () => {
        try {
            // پاک کردن localStorage
            localStorage.removeItem('auth_token');

            // درخواست به سرور برای پاک کردن کوکی HttpOnly
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include', // مهم است تا کوکی ارسال شود
            });

            // به‌روزرسانی state
            setToken(null);

            // ریدایرکت
            router.replace('/login');
            router.refresh(); // برای اطمینان از به‌روزرسانی layout و middleware
        } catch (err) {
            console.error('خطا در خروج:', err);
            // حتی اگر خطا داد، بهتر است کاربر را به لاگین بفرستیم
            router.replace('/login');
        }
    };

    const isLoggedIn = !!token

    return (<>
            {isLoggedIn && (
                <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1F44]/30 backdrop-blur-lg border-b border-white/10 shadow-sm">
                    <div className="mx-auto px-20 md:px-10 py-4 flex items-center justify-between">
                        {/* لوگو / عنوان */}
                        <Link href="/" className="text-2xl flex items-center text-white font-bold tracking-tight">
                            <DynamicSlaIcon className="ml-4" />
                            Dynamic<span className="text-[#FF6B00]">SLA</span>
                        </Link>

                        {/* دکمه خروج – فقط وقتی لاگین هستیم نشون داده بشه */}
                        {isLoggedIn && (
                            <motion.button
                                whileTap={{ scale: 0.92 }}
                                onClick={handleLogout}
                                className="text-[#FF8C3A] gap-2 font-semibold bg-black/10 flex items-center justify-center hover:text-[#FFAA55] text-sm px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <LogOut size={20} strokeWidth={2} />
                                خروج
                            </motion.button>
                        )}
                    </div>
                </header>
            )}
        </>
    )
}