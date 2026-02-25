// components/Sidebar.tsx
'use client'

import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {
    Menu, X,
    Home, HelpCircle, ShieldUser, Route, ChartCandlestick,
    ChartPie
} from 'lucide-react'

const navItems = [
    {label: 'نمای کلی', href: '/', icon: Home},
    {label: 'تحلیل', href: '/analysis-method', icon: ChartPie},
    {label: 'پلتفرم (دمو)', href: '/dashboard', icon: ChartCandlestick},
    {label: 'نقشه راه', href: '/road-map', icon: Route},
    {label: 'سوالات', href: '/questions', icon: HelpCircle},
    {label: 'پروفایل', href: '/me', icon: ShieldUser},
]

const sidebarVariants = {
    hidden: {x: '100%'},
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
        transition: {duration: 0.4, ease: 'easeInOut'},
    },
}

const itemVariants = {
    hidden: {opacity: 0, x: 30},
    visible: {opacity: 1, x: 0},
    exit: {opacity: 0, x: 20},
}

export default function Sidebar() {
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token')
        setToken(storedToken)
    }, [pathname])

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])
    const isLoggedIn = !!token

    return (
        <>
            {isLoggedIn && (
                <>
                    {/* دکمه همبرگر - فقط موبایل */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="fixed top-1.5 right-3 z-50 md:hidden p-3 bg-[#0A1F44]/10 backdrop-blur-lg border border-white/10 rounded-full text-white shadow-xl hover:bg-[#FF6B00]/40 transition-all duration-300"
                        aria-label="باز و بسته کردن منو"
                    >
                        {isOpen ? <X size={28}/> : <Menu size={28}/>}
                    </button>

                    {/* سایدبار دسکتاپ */}
                    <aside
                        className="hidden md:block w-64 lg:w-72 fixed top-16 right-0 h-screen bg-[#0A1F44]/30 backdrop-blur-xl border-l border-white/10 z-40 overflow-y-auto">
                        <div className="p-6 lg:p-8">
                            <h2 className="text-2xl lg:text-3xl font-extrabold mb-10 text-center lg:text-right bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]">
                                منو
                            </h2>
                            <nav className="space-y-1.5">
                                {navItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.href

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`
                    group flex items-center gap-4 px-5 py-3.5 rounded-xl text-base transition-all duration-300
                    ${isActive
                                                ? 'bg-[#FF6B00]/20 text-[#FF6B00] font-medium shadow-inner'
                                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }
                  `}
                                        >
                                            <Icon
                                                size={22}
                                                className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                                            />
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* منوی موبایل */}
                    <AnimatePresence>
                        {isOpen && (
                            <>
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 0.7}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3}}
                                    className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
                                    onClick={() => setIsOpen(false)}
                                />

                                <motion.div
                                    //@ts-ignore
                                    variants={sidebarVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-[#0A1F44]/40 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col md:hidden shadow-2xl"
                                >
                                    <div
                                        className="flex items-center justify-between p-2 px-5 border-b border-white/10">
                                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B00]">
                                            منو
                                        </h2>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <X size={32}/>
                                        </button>
                                    </div>

                                    <nav className="flex-1 p-6 space-y-5 overflow-y-auto">
                                        {navItems.map((item) => {
                                            const Icon = item.icon
                                            const isActive = pathname === item.href

                                            return (
                                                <motion.div key={item.href} variants={itemVariants}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`
                          flex items-center gap-4 text-xl font-medium transition-all duration-300
                          ${isActive
                                                            ? 'text-[#FF6B00]'
                                                            : 'text-white hover:text-[#FF6B00]'
                                                        }
                        `}
                                                    >
                                                        <Icon size={26} className={isActive ? 'scale-110' : ''}/>
                                                        {item.label}
                                                    </Link>
                                                </motion.div>
                                            )
                                        })}
                                    </nav>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </>
            )}
        </>
    )
}