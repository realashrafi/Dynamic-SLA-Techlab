// app/register/page.tsx  (یا components/RegisterPage.tsx)
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import DynamicSlaIcon from "@/app/components/DynamicSlaIcon";


export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.')
                return
            }

            setSuccess('ثبت‌نام با موفقیت انجام شد. در حال انتقال به صفحه ورود...')
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        } catch (err) {
            setError('اتصال به سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-5 py-12">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="
          backdrop-blur-2xl bg-white/5 border border-white/10
          rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60
          p-8 md:p-12 w-full max-w-md relative overflow-hidden
        "
            >
                {/* افکت گرادیان نارنجی ملایم در پس‌زمینه */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/5 via-transparent to-transparent pointer-events-none" />

                {/* لوگو و عنوان */}
                <div className="flex flex-col items-center mb-10">
                    <DynamicSlaIcon className="w-16 h-16 md:w-20 md:h-20 mb-4" />
                    <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white tracking-tight">
                        ثبت‌نام در Dynamic SLA
                    </h1>
                    <div className="flex items-center text-white text-sm ">
                        <span className="font-extrabold text-lg  text-[#FF8C3A]">تک</span>
                        <span className="font-extrabold text-lg  mr-0.5 text-[#0A5593]">‌لب</span>
                        <span className="mr-2 sm:mr-1 text-gray-300 hidden sm:inline">
              ، راه‌برد با تکنولوژی
            </span>
                    </div>
                </div>

                {/* پیام خطا */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-center text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {/* پیام موفقیت */}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-900/40 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl mb-6 text-center text-sm"
                    >
                        {success}
                    </motion.div>
                )}

                {/* فرم ثبت‌نام */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            نام و نام خانوادگی
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="
                w-full px-5 py-3 bg-white/5 border border-white/20
                rounded-xl text-white placeholder-white/40
                focus:outline-none focus:border-[#FF6B00]/50 focus:ring-2 focus:ring-[#FF6B00]/30
                transition-all duration-300
              "
                            placeholder="علی محمدی"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            ایمیل
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            className="
                w-full px-5 py-3 bg-white/5 border border-white/20
                rounded-xl text-white placeholder-white/40
                focus:outline-none focus:border-[#FF6B00]/50 focus:ring-2 focus:ring-[#FF6B00]/30
                transition-all duration-300
              "
                            placeholder="example@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            رمز عبور
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            autoComplete="new-password"
                            className="
                w-full px-5 py-3 bg-white/5 border border-white/20
                rounded-xl text-white placeholder-white/40
                focus:outline-none focus:border-[#FF6B00]/50 focus:ring-2 focus:ring-[#FF6B00]/30
                transition-all duration-300
              "
                            placeholder="حداقل ۶ کاراکتر"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
              w-full py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]
              text-white font-bold rounded-xl shadow-lg
              hover:from-[#FF8A3D] hover:to-[#FF6B00]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 transform hover:scale-[1.02]
            "
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                در حال ثبت‌نام...
              </span>
                        ) : (
                            'ثبت‌نام'
                        )}
                    </button>
                </form>

                {/* لینک ورود */}
                <p className="mt-8 text-center text-white/70 text-sm">
                    حساب کاربری دارید؟{' '}
                    <Link
                        href="/login"
                        className="text-[#FF6B00] hover:text-[#FF8A3D] font-medium transition-colors"
                    >
                        وارد شوید
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}