// components/Sidebar.tsx   (یا SidebarNav.tsx - اسم رو خودت تنظیم کن)
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
    { label: 'خانه', href: '/' },
    { label: 'خلاصه اجرایی', href: '/exec-summary' },
    { label: 'مسئله و مشکل', href: '/problem' },
    { label: 'مزایا', href: '/benefits' },
    { label: 'روش تحلیل', href: '/analysis' },
    { label: 'جدول مقایسه', href: '/comparison' },
    { label: 'چارت‌ها', href: '/charts' },
    { label: 'عوامل کلیدی', href: '/factors' },
    { label: 'فلو SLA', href: '/sla-flow' },
    { label: 'داشبورد دینامیک', href: '/dashboard' },
    { label: 'معماری راه‌حل', href: '/architecture' },
    { label: 'مدل داده SLA', href: '/data-model' },
    { label: 'زمان واقعی', href: '/real-time' },
    { label: 'مراحل پیاده‌سازی', href: '/implementation' },
    { label: 'سوالات و تشکر', href: '/questions' },
]

const sidebarVariants = {
    hidden: { x: '100%' },
    visible: {
        x: 0,
        transition: {
            type: 'spring',
            damping: 25,
            stiffness: 200,
            when: 'beforeChildren',
            staggerChildren: 0.07,
        },
    },
    exit: {
        x: '100%',
        transition: { duration: 0.4, ease: 'easeInOut' },
    },
}

const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
}

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // بستن منو وقتی مسیر عوض شد (موبایل)
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <>
            {/* دکمه همبرگر - فقط موبایل */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-5 right-5 z-50 md:hidden p-3 bg-[#0A1F44]/70 backdrop-blur-md rounded-full text-white shadow-lg hover:bg-blue-900/50 transition-all"
                aria-label="باز و بسته کردن منو"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* سایدبار دسکتاپ - همیشه visible از md به بالا */}
            <aside className="hidden md:block w-64 lg:w-72 fixed top-0 right-0 h-screen bg-[#0A1F44]/85 backdrop-blur-lg border-l border-white/10 z-40 overflow-y-auto">
                <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-10 text-center md:text-right">منو</h2>
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  block px-5 py-3.5 rounded-xl text-base transition-all duration-300
                  ${
                                    pathname === item.href
                                        ? 'bg-blue-700/40 text-blue-300 font-medium shadow-inner'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }
                `}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* منوی موبایل - با AnimatePresence و motion.div */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* overlay تاریک - کلیک روش → بستن */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* خود منو - slide از راست */}
                        <motion.div
                            // @ts-ignore
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-[#0A1F44]/95 backdrop-blur-xl z-50 flex flex-col md:hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h2 className="text-xl font-bold">منو</h2>
                                <button onClick={() => setIsOpen(false)}>
                                    <X size={32} />
                                </button>
                            </div>

                            <nav className="flex-1 p-6 space-y-6 overflow-y-auto">
                                {navItems.map((item) => (
                                    <motion.div key={item.href} variants={itemVariants}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                        block text-2xl font-medium transition-colors
                        ${
                                                pathname === item.href
                                                    ? 'text-blue-400'
                                                    : 'text-white hover:text-blue-300'
                                            }
                      `}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}