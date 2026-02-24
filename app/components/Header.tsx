// components/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1F44]/30 backdrop-blur-lg border-b border-white/10 shadow-sm">
            <div className="mx-auto px-20 md:px-12 py-4 flex items-center justify-between">
                {/* لوگو / عنوان */}
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    <span className="text-blue-400">Dynamic</span>SLA
                </Link>

                {/* در دسکتاپ می‌تونی لینک‌های مهم بذاری، یا خالی بمونه چون سایدبار داریم */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link
                        href="/dashboard"
                        className={`text-sm font-medium transition ${
                            pathname.startsWith('/dashboard') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        داشبورد
                    </Link>
                    <Link
                        href="/questions"
                        className={`text-sm font-medium transition ${
                            pathname === '/questions' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        تماس / سوالات
                    </Link>
                </nav>

                {/* در موبایل، همبرگر توسط Sidebar مدیریت می‌شه، پس اینجا چیزی نمی‌ذاریم */}
            </div>
        </header>
    )
}