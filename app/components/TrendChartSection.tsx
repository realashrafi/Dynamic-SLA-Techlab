// components/TrendChartSection.tsx
'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// داده نمونه (از توضیحات اسلاید + داده‌های واقعی تقریبی)
const chartData = [
    { week: 1, tehran: 90, rasht: 85, esfahan: 78, average: 84 },
    { week: 5, tehran: 95, rasht: 88, esfahan: 75, average: 86 },
    { week: 10, tehran: 92, rasht: 90, esfahan: 72, average: 85 },
    { week: 15, tehran: 98, rasht: 95, esfahan: 80, average: 91 },
    { week: 20, tehran: 88, rasht: 82, esfahan: 68, average: 79 },
    { week: 25, tehran: 90, rasht: 85, esfahan: 75, average: 83 },
    { week: 30, tehran: 95, rasht: 92, esfahan: 82, average: 90 },
    { week: 33, tehran: 97, rasht: 94, esfahan: 85, average: 92 },
]

const colors = {
    tehran: '#FF6B00',
    rasht: '#00BFFF',
    esfahan: '#32CD32',
    average: '#FFD700',
}

export default function TrendChartSection() {
    return (
        <section className="py-20 px-6 md:px-12 bg-[#001F3F] text-white">
            <div className="max-w-6xl mx-auto">
                {/* عنوان */}
                <div className="flex items-center gap-6 mb-12">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.9 }}
                        className="w-16 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                    />
                    <h2 className="text-3xl md:text-5xl font-bold text-[#FF6B00]">
                        نمودار تعهد زمانی تحقیقی یافته در ۳۳ هفته اول سال ۱۴۰۴
                    </h2>
                </div>

                {/* توضیح کوتاه */}
                <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
                    روند تغییر SLA در طول زمان بین شهرهای مختلف الگوی نزدیک به هم دارد. نتایج نشان می‌دهد که تغییرات پویا هستند اما نسبت به وقایع خارجی (مانند فصلی، اقتصادی) حساس‌اند.
                </p>

                {/* نمودار */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="h-96 w-full rounded-xl overflow-hidden border border-[#FF6B00]/30 shadow-2xl bg-[#001F3F]/50 backdrop-blur-sm p-4"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF20" />
                            <XAxis dataKey="week" stroke="#FFFFFF80" label={{ value: 'شماره هفته', position: 'insideBottom', fill: '#FFFFFF', offset: -5 }} />
                            <YAxis stroke="#FFFFFF80" label={{ value: 'درصد پایبندی به تعهد', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0A2540', border: '1px solid #FF6B00', borderRadius: '8px', color: 'white' }}
                                labelStyle={{ color: '#FF6B00' }}
                            />
                            <Legend wrapperStyle={{ color: 'white' }} />

                            <Line type="monotone" dataKey="tehran" stroke={colors.tehran} strokeWidth={3} dot={{ r: 5, fill: colors.tehran }} name="تهران" />
                            <Line type="monotone" dataKey="rasht" stroke={colors.rasht} strokeWidth={3} dot={{ r: 5, fill: colors.rasht }} name="رشت" />
                            <Line type="monotone" dataKey="esfahan" stroke={colors.esfahan} strokeWidth={3} dot={{ r: 5, fill: colors.esfahan }} name="اصفهان" />
                            <Line type="monotone" dataKey="average" stroke={colors.average} strokeWidth={4} strokeDasharray="5 5" dot={{ r: 6 }} name="میانگین" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/*<div className="mt-10 text-center opacity-70 text-sm">*/}
                {/*    nona*/}
                {/*</div>*/}
            </div>
        </section>
    )
}