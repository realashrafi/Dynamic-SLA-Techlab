// components/RealTime.tsx
'use client'

import { motion } from 'framer-motion'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts'

// داده‌ها (همان داده‌های شما)
const chartData = [
    { week: 2, time: 4.43 },
    { week: 3, time: 3.28 },
    { week: 4, time: 3.27 },
    { week: 5, time: 2.96 },
    { week: 6, time: 3.98 },
    { week: 7, time: 4.98 },
    { week: 8, time: 4.53 },
    { week: 9, time: 4.30 },
    { week: 10, time: 3.93 },
    { week: 11, time: 3.38 },
    { week: 12, time: 3.25 },
    { week: 13, time: 5.45 },
    { week: 14, time: 7.78 },
    { week: 15, time: 4.40 },
    { week: 16, time: 3.28 },
    { week: 17, time: 3.74 },
    { week: 18, time: 4.38 },
    { week: 19, time: 3.85 },
    { week: 20, time: 3.82 },
    { week: 21, time: 3.43 },
    { week: 22, time: 3.74 },
    { week: 23, time: 4.88 },
    { week: 24, time: 4.10 },
    { week: 25, time: 3.72 },
    { week: 26, time: 3.30 },
    { week: 27, time: 4.05 },
    { week: 28, time: 2.97 },
    { week: 29, time: 2.89 },
    { week: 30, time: 2.88 },
    { week: 31, time: 4.43 },
    { week: 32, time: 4.46 },
]

const colors = {
    main: '#FF6B00',
    sigma1: '#22c55e', // سبز برای sigma-1
    sigma2: '#ef4444', // قرمز برای sigma-2
}

// Custom Tooltip شیشه‌ای
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="
        backdrop-blur-xl bg-[#0A1F44]/80 border border-white/20
        rounded-xl p-5 shadow-2xl shadow-black/70 min-w-[220px] text-sm
      ">
                <p className="font-bold text-white mb-3 pb-2 border-b border-white/30">
                    هفته {label}
                </p>
                {payload.map((entry: any, index: number) => (
                    <div key={`item-${index}`} className="flex justify-between py-1.5">
            <span className="font-medium" style={{ color: entry.color || '#FFFFFF' }}>
              {entry.name}:
            </span>
                        <span className="text-white font-semibold">
              {entry.value.toFixed(2)} روز
            </span>
                    </div>
                ))}
            </div>
        )
    }
    return null
}

export default function RealTime() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 bg-[#0A1F44]/30 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* عنوان با خط گرادیان */}
                <div className="flex items-center gap-5 md:gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full origin-left"
                    />
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight">
                        SLA (Real-time Monitoring)
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* ستون متن - سمت راست در RTL */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1 }}
                        className="lg:col-span-5 space-y-6 text-right"
                    >
                        <ul className="space-y-5">
                            {[
                                'تعریف SLA به‌عنوان یک شاخص کیفیت قابل پایش، مشابه سیستم‌های کنترل کیفیت (SPC)',
                                'پایش بلادرنگ عملکرد شبکه و رفتار SLA در طول زمان',
                                'مقایسه مداوم SLA واقعی با محدوده‌های کنترل تعریف‌شده (Control Limits)',
                                'شناسایی سریع انحرافات و نقاط خارج از کنترل (Out of Control Points)',
                                'تولید هشدار خودکار در صورت عبور از آستانه‌های مجاز',
                                'امکان مداخله عملیاتی پیش از نقض SLA و وقوع تأخیرهای پرهزینه',
                                'تبدیل مدیریت SLA از رویکرد واکنشی به رویکرد پیشگیرانه (Proactive)',
                            ].map((text, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: i * 0.12 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-5 group"
                                >
                                    <div className="
                    flex-shrink-0 w-10 h-10 rounded-xl backdrop-blur-md
                    bg-white/10 border border-white/20 text-[#FF6B00]
                    font-bold text-xl flex items-center justify-center
                    shadow-md group-hover:scale-110 transition-transform
                  ">
                                        {i + 1}
                                    </div>
                                    <p className="text-lg md:text-xl leading-relaxed text-white/90 pt-1">
                                        {text}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* ستون نمودار - سمت چپ در RTL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: 0.3 }}
                        className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-[#0A1F44]/30 border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-sm"
                    >
                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                                <CartesianGrid strokeDasharray="4 4" stroke="#FFFFFF12" vertical={false} />

                                <XAxis
                                    dataKey="week"
                                    stroke="#FFFFFF50"
                                    tick={{ fill: '#FFFFFFA0', fontSize: 13 }}
                                    tickLine={false}
                                    axisLine={{ stroke: '#FFFFFF20' }}
                                    label={{
                                        value: 'شماره هفته',
                                        position: 'insideBottom',
                                        offset: -20,
                                        fill: '#FFFFFFC0',
                                        fontSize: 14,
                                    }}
                                />

                                <YAxis
                                    stroke="#FFFFFF50"
                                    domain={[2, 8]}
                                    tick={{ fill: '#FFFFFFA0', fontSize: 13 }}
                                    tickLine={false}
                                    axisLine={{ stroke: '#FFFFFF20' }}
                                    label={{
                                        value: 'زمان تحویل میانگین (روز)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: 10,
                                        fill: '#FFFFFFC0',
                                        fontSize: 14,
                                    }}
                                />

                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.main, strokeWidth: 1.5, strokeDasharray: '5 5' }} />

                                {/* خط اصلی زمان واقعی */}
                                <Line
                                    type="monotone"
                                    dataKey="time"
                                    stroke={colors.main}
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2, fill: colors.main, stroke: '#00000040' }}
                                    activeDot={{ r: 9, stroke: '#ffffff', strokeWidth: 3 }}
                                    name="زمان واقعی میانگین"
                                />

                                {/* خطوط کنترل (ReferenceLine) */}
                                <ReferenceLine
                                    y={4.25}
                                    stroke={colors.sigma1}
                                    strokeDasharray="6 4"
                                    strokeWidth={2.5}
                                    label={{
                                        value: 'حد کنترل بالا (UCL)',
                                        position: 'right',
                                        fill: colors.sigma1,
                                        fontSize: 13,
                                        dx: 10,
                                    }}
                                />

                                <ReferenceLine
                                    y={3.75}
                                    stroke={colors.sigma2}
                                    strokeDasharray="6 4"
                                    strokeWidth={2.5}
                                    label={{
                                        value: 'حد کنترل پایین (LCL)',
                                        position: 'right',
                                        fill: colors.sigma2,
                                        fontSize: 13,
                                        dx: 10,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* کپشن پایین */}
                <p className="mt-12 text-center text-white/60 text-lg md:text-xl">
                    پایش بلادرنگ SLA با رویکرد کنترل کیفیت آماری (SPC) — تبدیل واکنشی به پیشگیرانه
                </p>

            </div>
        </section>
    )
}