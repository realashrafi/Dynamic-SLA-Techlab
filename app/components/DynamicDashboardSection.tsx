// components/DynamicDashboardSection.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { easeOut } from 'framer-motion'

// ماک دیتا برای ۴ تب (می‌تونی گسترش بدی)
const mockCases = [
    {
        origin: 'تهران',
        destination: 'اصفهان',
        range: '۱۴۰۳/۱۱/۱۰ - ۱۴۰۳/۱۱/۱۸',
        overview: { compliance: 82, avgTime: 2.1, parcels: 325871 },
        performance: { current: 38.6, improved: 83.2 },
        risk: { highRiskPaths: 1, warning: 'مسیر بندرعباس' },
        report: { score: 85, trend: 'بهبود ۴۶٪' },
    },
    // کیس دوم، سوم، ...
]

export default function DynamicDashboardSection() {
    const [activeTab, setActiveTab] = useState('overview')
    const [selectedCase, setSelectedCase] = useState(0) // فعلاً فقط یکی، بعداً می‌تونی چندتا کیس داشته باشی

    const currentData = mockCases[selectedCase]

    const tabs = [
        { id: 'overview', label: 'نمای کلی' },
        { id: 'performance', label: 'عملکرد SLA' },
        { id: 'risk', label: 'ریسک SLA' },
        { id: 'report', label: 'گزارش نتیجه' },
    ]

    return (
        <section className="py-20 px-4 md:px-12 bg-gradient-to-b from-[#001F3F] to-[#001F3F] min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* عنوان سکشن */}
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-[#FF6B00] text-center mb-12"
                >
                    داشبورد داینامیک SLA (دمو)
                </motion.h2>

                {/* فرم ورودی ثابت (sticky در این سکشن) */}
                <div className="sticky top-4 z-40 bg-[#001F3F]/95 backdrop-blur-lg border border-[#FF6B00]/40 rounded-xl p-6 mb-12 shadow-2xl">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm opacity-80 mb-1">مبدا</label>
                            <select className="w-full bg-[#0A2540] border border-[#FF6B00]/50 rounded-lg px-4 py-3 text-white">
                                <option>تهران</option>
                                <option>اصفهان</option>
                                <option>رشت</option>
                                <option>کرمانشاه</option>
                            </select>
                        </div>

                        <div className="flex items-center self-end text-[#FF6B00] text-2xl mx-2">→</div>

                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm opacity-80 mb-1">مقصد</label>
                            <select className="w-full bg-[#0A2540] border border-[#FF6B00]/50 rounded-lg px-4 py-3 text-white">
                                <option>اصفهان</option>
                                <option>تهران</option>
                                <option>بندرعباس</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[220px]">
                            <label className="block text-sm opacity-80 mb-1">بازه زمانی</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="از"
                                    className="flex-1 bg-[#0A2540] border border-[#FF6B00]/50 rounded-lg px-4 py-3 text-white"
                                    defaultValue="۱۴۰۳/۱۱/۱۰"
                                />
                                <span className="self-center text-[#FF6B00]">-</span>
                                <input
                                    type="text"
                                    placeholder="تا"
                                    className="flex-1 bg-[#0A2540] border border-[#FF6B00]/50 rounded-lg px-4 py-3 text-white"
                                    defaultValue="۱۴۰۳/۱۱/۱۸"
                                />
                            </div>
                        </div>

                        <button className="bg-[#FF6B00] hover:bg-[#FF8C00] text-black font-bold px-8 py-3 rounded-lg transition-colors">
                            اعمال فیلتر
                        </button>
                    </div>
                </div>

                {/* تب‌ها */}
                <div className="flex border-b border-[#FF6B00]/30 mb-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                                activeTab === tab.id
                                    ? 'border-b-4 border-[#FF6B00] text-[#FF6B00]'
                                    : 'text-white/70 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* محتوای تب */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#001F3F]/60 backdrop-blur-md border border-[#FF6B00]/30 rounded-xl p-6 md:p-10 min-h-[500px]"
                >
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-6 rounded-lg border border-[#FF6B00]/20">
                                <h4 className="text-xl font-bold text-[#FF6B00] mb-4">پایبندی کلی</h4>
                                <p className="text-5xl font-black">{currentData.overview.compliance}%</p>
                            </div>
                            {/* کارت‌های دیگر ... */}
                        </div>
                    )}

                    {activeTab === 'performance' && (
                        <div>
                            <h3 className="text-2xl font-bold text-[#FF6B00] mb-6">عملکرد SLA</h3>
                            <p className="text-xl">پایبندی فعلی: {currentData.performance.current}%</p>
                            <p className="text-xl text-green-400">پایبندی بهبودیافته: {currentData.performance.improved}%</p>
                            {/* اینجا می‌تونی نمودار اضافه کنی */}
                        </div>
                    )}

                    {activeTab === 'risk' && (
                        <div>
                            <h3 className="text-2xl font-bold text-[#FF6B00] mb-6">ریسک SLA</h3>
                            <p className="text-xl text-red-400">مسیرهای پرریسک: {currentData.risk.highRiskPaths}</p>
                            <p>{currentData.risk.warning}</p>
                        </div>
                    )}

                    {activeTab === 'report' && (
                        <div>
                            <h3 className="text-2xl font-bold text-[#FF6B00] mb-6">گزارش نتیجه</h3>
                            <p className="text-3xl font-bold text-green-400">{currentData.report.score}%</p>
                            <p className="text-xl">{currentData.report.trend}</p>
                        </div>
                    )}
                </motion.div>

                {/* لوگوی پایین */}
                <div className="mt-16 text-center opacity-70 text-sm">
                    ارائه شده توسط nona
                </div>
            </div>
        </section>
    )
}