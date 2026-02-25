'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {motion} from 'framer-motion'
import {
    LayoutDashboard, Users, ListChecks,
    BarChart3, Settings, ShieldCheck,
    FileText, AlertTriangle, Lock
} from 'lucide-react'
import DynamicSlaIcon from "@/app/components/DynamicSlaIcon"
import WhiteListManagement from "@/app/components/WhiteListManagement"
import UsersTestPage from "@/app/components/UsersTestPage"

type Tab = 'overview' | 'users' | 'whitelist' | 'analytics' | 'settings' | 'security' | 'reports' | 'alerts'

const tabs: { id: Tab; label: string; icon: any }[] = [
    {id: 'users', label: 'کاربران', icon: Users},
    {id: 'whitelist', label: 'لیست سفید', icon: ListChecks},
]

// لیست ایمیل‌های ادمین (هاردکد شده)
const ADMIN_EMAILS = [
    'alibu1816@gmail.com',
    'admin@admin.com'
]

export default function AdminDashboard() {
    const router = useRouter()
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null) // null = در حال چک
    const [activeTab, setActiveTab] = useState<Tab>('users')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // چک کردن ایمیل کاربر از /api/auth/me
    useEffect(() => {
        const checkAdminAccess = async () => {
            try {
                const res = await fetch('/api/auth/me', {
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
                    throw new Error('خطا در دریافت اطلاعات کاربر')
                }

                const data = await res.json()
                const email = data.user?.email?.toLowerCase().trim()

                if (!email) {
                    throw new Error('ایمیل کاربر یافت نشد')
                }

                setUserEmail(email)
                const isAllowed = ADMIN_EMAILS.includes(email)
                setIsAdmin(isAllowed)

                if (!isAllowed) {
                    setError('شما دسترسی به پنل مدیریت را ندارید.')
                }
            } catch (err: any) {
                console.error(err)
                setError(err.message || 'خطا در بررسی دسترسی')
                // می‌تونی اینجا ریدایرکت کنی
                // router.replace('/')
            } finally {
                setLoading(false)
            }
        }

        checkAdminAccess()
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-xl">در حال بررسی دسترسی...</div>
            </div>
        )
    }

    if (error || isAdmin === false) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white ">
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    className="text-center p-10 bg-red-900/30 border border-red-600/50 rounded-2xl max-w-md"
                >
                    <Lock size={64} className="mx-auto mb-6 text-red-400"/>
                    <h2 className="text-2xl font-bold mb-4">دسترسی غیرمجاز</h2>
                    <p className="text-gray-300 mb-8">
                        {error || 'این بخش فقط برای ادمین‌های مجاز قابل دسترسی است.'}
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition"
                    >
                        بازگشت به خانه
                    </button>
                </motion.div>
            </div>
        )
    }

    // اگر اینجا رسیدیم یعنی کاربر ادمین است
    return (
        <div className="min-h-screen text-white pb-20 pr-0 md:pr-64 lg:pr-70 mx-auto">
            {/* هدر پنل */}
            <div className="mt-20 sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <DynamicSlaIcon className="w-10 h-10"/>
                        <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]">
                            پنل مدیریت Dynamic SLA
                        </h1>
                    </div>
                    <div className="text-sm opacity-70">
                        خوش آمدید، {userEmail?.split('@')[0] || 'ادمین'}
                    </div>
                </div>
            </div>

            {/* تب‌ها */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6">
                <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 md:gap-3">
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  group flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300
                  ${isActive
                                    ? 'bg-[#FF6B00]/20 text-[#FF6B00] shadow-inner border border-[#FF6B00]/30'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                                }
                `}
                            >
                                <Icon size={20}
                                      className={isActive ? 'scale-110' : 'group-hover:scale-110 transition-transform'}/>
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* محتوای تب فعال */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
                <motion.div
                    key={activeTab}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="space-y-8"
                >
                    {activeTab === 'users' && <UsersTestPage/>}
                    {activeTab === 'whitelist' && <WhiteListManagement/>}
                    {/* تب‌های دیگر */}
                </motion.div>
            </div>
        </div>
    )
}