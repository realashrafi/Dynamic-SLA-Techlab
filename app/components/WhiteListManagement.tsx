
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import DynamicSlaIcon from "@/app/components/DynamicSlaIcon";


interface WhiteListEntry {
    _id: string
    email: string
    name: string
    createdAt: string
}

export default function WhiteListManagement() {
    const router = useRouter()
    const [entries, setEntries] = useState<WhiteListEntry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [form, setForm] = useState({ email: '', name: '' })
    const [editingId, setEditingId] = useState<string | null>(null)

    // چک لاگین + لود داده‌ها
    useEffect(() => {
        const token = localStorage.getItem('auth_token')
        if (!token) {
            router.replace('/login')
            return
        }

        fetchEntries()
    }, [router])

    const fetchEntries = async () => {
        try {
            setLoading(true)
            setError('')

            const res = await fetch('/api/whitelist-signup', {
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
                },
            })

            if (!res.ok) {
                if (res.status === 401) {
                    localStorage.removeItem('auth_token')
                    router.replace('/login')
                    return
                }
                throw new Error('خطا در بارگذاری لیست')
            }

            const data = await res.json()
            setEntries(data.data || [])
        } catch (err: any) {
            setError(err.message || 'خطایی رخ داد')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const url = editingId ? `/api/whitelist-signup/${editingId}` : '/api/whitelist-signup'
            const method = editingId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.error || 'عملیات ناموفق')
            }

            setForm({ email: '', name: '' })
            setEditingId(null)
            fetchEntries()
        } catch (err: any) {
            setError(err.message || 'خطا در ذخیره')
        }
    }

    const handleEdit = (entry: WhiteListEntry) => {
        setForm({ email: entry.email, name: entry.name })
        setEditingId(entry._id)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('مطمئن هستید که می‌خواهید این رکورد را حذف کنید؟')) return

        try {
            const res = await fetch(`/api/whitelist-signup/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
                },
            })

            if (!res.ok) throw new Error('حذف ناموفق')

            fetchEntries()
        } catch (err: any) {
            setError(err.message || 'خطا در حذف')
        }
    }

    const resetForm = () => {
        setForm({ email: '', name: '' })
        setEditingId(null)
    }

    return (
        <div className="min-h-screen text-white py-12 px-5 sm:px-8">
            <div className="max-w-5xl mx-auto ">
                {/* عنوان صفحه با آیکون */}
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-12">
                    <DynamicSlaIcon className="w-12 h-12 md:w-16 md:h-16" />
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight">
                        مدیریت لیست سفید ثبت‌نام
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

                {/* فرم اضافه/ویرایش - کارت شیشه‌ای */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
            backdrop-blur-2xl bg-white/5 border border-white/10
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60
            p-6 md:p-10 mb-12
          "
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">
                        {editingId ? 'ویرایش رکورد' : 'اضافه کردن ایمیل جدید'}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">ایمیل</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="
                  w-full px-5 py-3 bg-white/5 border border-white/20 rounded-xl
                  text-white placeholder-white/40 focus:outline-none
                  focus:border-[#FF6B00]/50 focus:ring-2 focus:ring-[#FF6B00]/30
                  transition-all duration-300
                "
                                placeholder="example@domain.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">نام و نام خانوادگی</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="
                  w-full px-5 py-3 bg-white/5 border border-white/20 rounded-xl
                  text-white placeholder-white/40 focus:outline-none
                  focus:border-[#FF6B00]/50 focus:ring-2 focus:ring-[#FF6B00]/30
                  transition-all duration-300
                "
                                placeholder="نام و نام خانوادگی"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
                            <button
                                type="submit"
                                className="
                  flex-1 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]
                  text-white font-bold rounded-xl shadow-lg
                  hover:from-[#FF8A3D] hover:to-[#FF6B00]
                  transition-all duration-300 transform hover:scale-[1.02]
                "
                            >
                                {editingId ? 'بروزرسانی' : 'اضافه کردن به لیست سفید'}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="
                    flex-1 py-3.5 bg-gray-700/60 text-white font-medium rounded-xl
                    hover:bg-gray-600 transition-all duration-300
                  "
                                >
                                    انصراف
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>

                {/* لیست رکوردها */}
                {loading ? (
                    <div className="text-center py-12 text-white/70 text-xl">در حال بارگذاری لیست سفید...</div>
                ) : entries.length === 0 ? (
                    <div className="text-center py-12 text-white/50 text-lg">
                        هیچ ایمیلی در لیست سفید ثبت نشده است
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-2xl">
                        <table className="min-w-full">
                            <thead className="bg-white/5 backdrop-blur-sm">
                            <tr>
                                <th className="px-6 py-4 text-right font-medium text-white/90">ایمیل</th>
                                <th className="px-6 py-4 text-right font-medium text-white/90">نام</th>
                                <th className="px-6 py-4 text-right font-medium text-white/90">تاریخ ثبت</th>
                                <th className="px-6 py-4 text-right font-medium text-white/90">عملیات</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                            {entries.map((entry) => (
                                <motion.tr
                                    key={entry._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4 text-white/90">{entry.email}</td>
                                    <td className="px-6 py-4 text-white/90">{entry.name}</td>
                                    <td className="px-6 py-4 text-white/70 text-sm">
                                        {new Date(entry.createdAt).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-6 py-4 flex gap-4">
                                        <button
                                            onClick={() => handleEdit(entry)}
                                            className="text-[#FF6B00] hover:text-[#FF8A3D] font-medium transition-colors"
                                        >
                                            ویرایش
                                        </button>
                                        <button
                                            onClick={() => handleDelete(entry._id)}
                                            className="text-red-400 hover:text-red-300 font-medium transition-colors"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    )
}