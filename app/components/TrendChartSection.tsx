// components/TrendChartSection.tsx
'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// داده نمونه (از توضیحات اسلاید + داده‌های واقعی تقریبی)
const chartData = [
    {'week': 1, 'average': 88, 'tehran': 89, 'tabriz': null, 'qom': 100},
    {'week': 2, 'average': 74, 'tehran': 80, 'tabriz': 89, 'qom': 65},
    {'week': 3, 'average': 79, 'tehran': 83, 'tabriz': 88, 'qom': 67},
    {'week': 4, 'average': 81, 'tehran': 82, 'tabriz': 93, 'qom': 66},
    {'week': 5, 'average': 84, 'tehran': 88, 'tabriz': 98, 'qom': 69},
    {'week': 6, 'average': 85, 'tehran': 90, 'tabriz': 98, 'qom': 70},
    {'week': 7, 'average': 78, 'tehran': 81, 'tabriz': 86, 'qom': 65},
    {'week': 8, 'average': 82, 'tehran': 85, 'tabriz': 92, 'qom': 65},
    {'week': 9, 'average': 84, 'tehran': 86, 'tabriz': 100, 'qom': 67},
    {'week': 10, 'average': 85, 'tehran': 87, 'tabriz': 99, 'qom': 68},
    {'week': 11, 'average': 79, 'tehran': 82, 'tabriz': 90, 'qom': 69},
    {'week': 12, 'average': 77, 'tehran': 78, 'tabriz': 87, 'qom': 66},
    {'week': 13, 'average': 74, 'tehran': 77, 'tabriz': 81, 'qom': 59},
    {'week': 14, 'average': 61, 'tehran': 62, 'tabriz': 69, 'qom': 53},
    {'week': 15, 'average': 83, 'tehran': 90, 'tabriz': 96, 'qom': 68},
    {'week': 16, 'average': 78, 'tehran': 78, 'tabriz': 91, 'qom': 64},
    {'week': 17, 'average': 82, 'tehran': 85, 'tabriz': 93, 'qom': 67},
    {'week': 18, 'average': 80, 'tehran': 82, 'tabriz': 93, 'qom': 68},
    {'week': 19, 'average': 80, 'tehran': 82, 'tabriz': 92, 'qom': 67},
    {'week': 20, 'average': 77, 'tehran': 77, 'tabriz': 88, 'qom': 66},
    {'week': 21, 'average': 76, 'tehran': 76, 'tabriz': 86, 'qom': 66},
    {'week': 22, 'average': 79, 'tehran': 79, 'tabriz': 85, 'qom': 71},
    {'week': 23, 'average': 73, 'tehran': 72, 'tabriz': 84, 'qom': 63},
    {'week': 24, 'average': 75, 'tehran': 75, 'tabriz': 88, 'qom': 69},
    {'week': 25, 'average': 69, 'tehran': 68, 'tabriz': 77, 'qom': 61},
    {'week': 26, 'average': 76, 'tehran': 75, 'tabriz': 84, 'qom': 70},
    {'week': 27, 'average': 77, 'tehran': 77, 'tabriz': 86, 'qom': 72},
    {'week': 28, 'average': 82, 'tehran': 81, 'tabriz': 92, 'qom': 75},
    {'week': 29, 'average': 80, 'tehran': 79, 'tabriz': 89, 'qom': 74},
    {'week': 30, 'average': 79, 'tehran': 78, 'tabriz': 91, 'qom': 74},
    {'week': 31, 'average': 80, 'tehran': 80, 'tabriz': 92, 'qom': 75},
    {'week': 32, 'average': 82, 'tehran': 83, 'tabriz': 95, 'qom': 78}
]

const colors = {
    tehran: '#FF6B00',
    tabriz: '#00BFFF',
    qom: '#32CD32',
    average: '#FFD700',
}

export default function TrendChartSection() {
    return (
        <section className="py-60 px-6 md:px-12 bg-[#001F3F] text-white">
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
                            <XAxis dataKey="week" stroke="#FFFFFF80" label={{ value: 'شماره هفته', position: 'insideBottomLeft', fill: '#FFFFFF', offset: -2,dx:80 }} />
                            <YAxis stroke="#FFFFFF80" domain={[50,100]} label={{ value: 'درصد پایبندی به تعهد', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0A2540', border: '1px solid #FF6B00', borderRadius: '8px', color: 'white' }}
                                labelStyle={{ color: '#FF6B00' }}
                            />
                            <Legend wrapperStyle={{ color: 'white' }} />

                            <Line type="monotone" dataKey="tehran" stroke={colors.tehran} strokeWidth={3} dot={{ r: 2, fill: colors.tehran }} name="تهران" />
                            <Line type="monotone" dataKey="tabriz" stroke={colors.tabriz} strokeWidth={3} dot={{ r: 2, fill: colors.tabriz }} name="تبریز" />
                            <Line type="monotone" dataKey="qom" stroke={colors.qom} strokeWidth={3} dot={{ r: 2, fill: colors.qom }} name="قم" />
                            <Line type="monotone" dataKey="average"  stroke={colors.average} strokeWidth={3} strokeDasharray="2 2" dot={{ r: 2 }} name="کل" />
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