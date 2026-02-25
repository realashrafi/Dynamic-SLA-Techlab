// app/admin/users-test/page.tsx  (یا هر مسیری که می‌خوای)
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import DynamicSlaIcon from "@/app/components/DynamicSlaIcon";


interface User {
    _id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
}

export default function UsersTestPage() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('auth_token')
        if (!token) {
            router.replace('/login')
            return
        }
        fetchUsers()
    }, [router])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            setError('')

            const res = await fetch('/api/users', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
                },
                credentials: 'include',
            })

            if (!res.ok) {
                if (res.status === 401) {
                    localStorage.removeItem('auth_token')
                    router.replace('/login')
                    return
                }
                const err = await res.json()
                throw new Error(err.error || 'خطا در دریافت لیست کاربران')
            }

            const data = await res.json()
            setUsers(data.data || [])
        } catch (err: any) {
            setError(err.message || 'خطایی رخ داد')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen  text-white py-12 px-5 sm:px-8">
            <div className="max-w-6xl mx-auto">
                {/* عنوان صفحه */}
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-12">
                    <DynamicSlaIcon className="w-12 h-12 md:w-16 md:h-16" />
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight text-center">
                         لیست کاربران
                    </h1>
                </div>

                {/* پیام خطا */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-900/40 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-8 text-center"
                    >
                        {error}
                    </motion.div>
                )}

                {/* کارت شیشه‌ای اصلی جدول */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="
            backdrop-blur-2xl bg-white/5 border border-white/10
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60
            overflow-hidden
          "
                >
                    {loading ? (
                        <div className="py-16 text-center text-xl text-white/70 flex items-center justify-center gap-3">
                            <svg className="animate-spin h-6 w-6 text-[#FF6B00]" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            در حال بارگذاری کاربران...
                        </div>
                    ) : users.length === 0 ? (
                        <div className="py-16 text-center text-lg text-white/60">
                            هیچ کاربری در سیستم ثبت نشده است
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/5">
                                <thead className="bg-white/5 backdrop-blur-sm">
                                <tr>
                                    <th className="px-6 py-5 text-right text-sm font-medium text-white/80">شناسه</th>
                                    <th className="px-6 py-5 text-right text-sm font-medium text-white/80">نام</th>
                                    <th className="px-6 py-5 text-right text-sm font-medium text-white/80">ایمیل</th>
                                    <th className="px-6 py-5 text-right text-sm font-medium text-white/80">تاریخ ایجاد</th>
                                    <th className="px-6 py-5 text-right text-sm font-medium text-white/80">آخرین بروزرسانی</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                {users.map((user, index) => (
                                    <motion.tr
                                        key={user._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-5 text-sm text-gray-400 font-mono">
                                            {user._id.slice(-8)}
                                        </td>
                                        <td className="px-6 py-5 font-medium">{user.name || '—'}</td>
                                        <td className="px-6 py-5 text-[#FF8A3D]">{user.email}</td>
                                        <td className="px-6 py-5 text-sm text-gray-400">
                                            {new Date(user.createdAt).toLocaleString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-400">
                                            {new Date(user.updatedAt).toLocaleString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>

                {/* دکمه بروزرسانی */}
                <div className="mt-10 text-center">
                    <button
                        onClick={fetchUsers}
                        disabled={loading}
                        className="
              px-8 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]
              text-white font-bold rounded-xl shadow-lg
              hover:from-[#FF8A3D] hover:to-[#FF6B00]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 transform hover:scale-[1.02]
            "
                    >
                        {loading ? 'در حال بروزرسانی...' : 'بروزرسانی لیست کاربران'}
                    </button>
                </div>

            </div>
        </div>
    )
}