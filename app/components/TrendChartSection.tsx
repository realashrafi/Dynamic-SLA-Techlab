// components/TrendChartSection.tsx
'use client'

import { motion } from 'framer-motion'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    TooltipProps,
} from 'recharts'

// داده‌ها (دقیقاً همان داده‌های شما بدون تغییر)
const chartData = [
    { week: 1, average: 88, tehran: 89, tabriz: null, qom: 100 },
    { week: 2, average: 74, tehran: 80, tabriz: 89, qom: 65 },
    { week: 3, average: 79, tehran: 83, tabriz: 88, qom: 67 },
    { week: 4, average: 81, tehran: 82, tabriz: 93, qom: 66 },
    { week: 5, average: 84, tehran: 88, tabriz: 98, qom: 69 },
    { week: 6, average: 85, tehran: 90, tabriz: 98, qom: 70 },
    { week: 7, average: 78, tehran: 81, tabriz: 86, qom: 65 },
    { week: 8, average: 82, tehran: 85, tabriz: 92, qom: 65 },
    { week: 9, average: 84, tehran: 86, tabriz: 100, qom: 67 },
    { week: 10, average: 85, tehran: 87, tabriz: 99, qom: 68 },
    { week: 11, average: 79, tehran: 82, tabriz: 90, qom: 69 },
    { week: 12, average: 77, tehran: 78, tabriz: 87, qom: 66 },
    { week: 13, average: 74, tehran: 77, tabriz: 81, qom: 59 },
    { week: 14, average: 61, tehran: 62, tabriz: 69, qom: 53 },
    { week: 15, average: 83, tehran: 90, tabriz: 96, qom: 68 },
    { week: 16, average: 78, tehran: 78, tabriz: 91, qom: 64 },
    { week: 17, average: 82, tehran: 85, tabriz: 93, qom: 67 },
    { week: 18, average: 80, tehran: 82, tabriz: 93, qom: 68 },
    { week: 19, average: 80, tehran: 82, tabriz: 92, qom: 67 },
    { week: 20, average: 77, tehran: 77, tabriz: 88, qom: 66 },
    { week: 21, average: 76, tehran: 76, tabriz: 86, qom: 66 },
    { week: 22, average: 79, tehran: 79, tabriz: 85, qom: 71 },
    { week: 23, average: 73, tehran: 72, tabriz: 84, qom: 63 },
    { week: 24, average: 75, tehran: 75, tabriz: 88, qom: 69 },
    { week: 25, average: 69, tehran: 68, tabriz: 77, qom: 61 },
    { week: 26, average: 76, tehran: 75, tabriz: 84, qom: 70 },
    { week: 27, average: 77, tehran: 77, tabriz: 86, qom: 72 },
    { week: 28, average: 82, tehran: 81, tabriz: 92, qom: 75 },
    { week: 29, average: 80, tehran: 79, tabriz: 89, qom: 74 },
    { week: 30, average: 79, tehran: 78, tabriz: 91, qom: 74 },
    { week: 31, average: 80, tehran: 80, tabriz: 92, qom: 75 },
    { week: 32, average: 82, tehran: 83, tabriz: 95, qom: 78 },
]

const colors = {
    tehran: '#FF6B00',     // نارنجی اصلی
    tabriz: '#60A5FA',     // آبی روشن
    qom: '#34D399',        // سبز زمردی
    average: '#F3F4F6',    // سفید خاکستری برای میانگین
}

// Tooltip سفارشی با glassmorphism
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="
        bg-[#0A1F44]/90  border border-white/10
        rounded-xl p-5 shadow-2xl shadow-black/70 min-w-[260px] text-sm
      ">
                <p className="font-bold text-white mb-3 pb-2 border-b border-white/30">
                    هفته {label}
                </p>
                {payload.map((entry:any, index:any) =>
                        entry.value !== null && (
                            <div key={`item-${index}`} className="flex justify-between py-1.5">
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name}:
              </span>
                                <span className="text-white font-semibold">
                {entry.value.toFixed(1)}%
              </span>
                            </div>
                        )
                )}
            </div>
        )
    }
    return null
}

// Legend سفارشی افقی + hover interactive
const renderCustomLegend = (props: any) => {
    const { payload } = props
    return (
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-6 px-4">
            {payload.map((entry: any, index: number) => (
                <div
                    key={`legend-${index}`}
                    className="flex items-center gap-3 group cursor-default"
                >
                    <div
                        className="
              w-5 h-5 rounded-full transition-all duration-300
              group-hover:scale-125 group-hover:ring-4 group-hover:ring-offset-2
              group-hover:ring-offset-black
            "
                        style={{
                            backgroundColor: entry.color,
                            boxShadow: `0 0 12px ${entry.color}60`
                        }}
                    />
                    <span className="text-white/90 text-base font-medium group-hover:text-white transition-colors">
            {entry.value}
          </span>
                </div>
            ))}
        </div>
    )
}

export default function TrendChartSection() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16  text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* عنوان با خط گرادیان */}
                <div className="flex items-center gap-5 md:gap-6 mb-10 md:mb-14">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full origin-left"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight">
                        نمودار تعهد زمانی تحقق یافته در ۳۲ هفته اول سال ۱۴۰۴
                    </h2>
                </div>

                {/* توضیح کوتاه */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/80 mb-12 max-w-4xl leading-relaxed"
                >
                    روند تغییر SLA در طول زمان بین شهرهای مختلف الگوی نزدیک به هم دارد. نتایج نشان می‌دهد که تغییرات پویا هستند اما نسبت به وقایع خارجی (مانند فصلی، اقتصادی، تعطیلات) حساس‌اند.
                </motion.p>

                {/* کارت شیشه‌ای اصلی نمودار */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="
            bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60
            overflow-hidden p-4 md:p-6
          "
                >
                    <ResponsiveContainer width="100%" height={480}>
                        <LineChart
                            data={chartData}
                            margin={{ top: 20, right: 40, left: 20, bottom: 40 }}
                        >
                            <CartesianGrid
                                strokeDasharray="4 4"
                                stroke="#FFFFFF12"
                                vertical={false}
                            />

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
                                domain={[50, 100]}
                                tick={{ fill: '#FFFFFFA0', fontSize: 13 }}
                                tickLine={false}
                                axisLine={{ stroke: '#FFFFFF20' }}
                                label={{
                                    value: 'درصد پایبندی به تعهد',
                                    angle: -90,
                                    position: 'insideLeft',
                                    offset: -15,
                                    fill: '#FFFFFFC0',
                                    fontSize: 14,
                                }}
                            />

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: '#FF6B00', strokeWidth: 1.5, strokeDasharray: '5 5' }}
                            />

                            <Legend content={renderCustomLegend} />

                            <Line
                                type="monotone"
                                dataKey="tehran"
                                stroke={colors.tehran}
                                strokeWidth={3}
                                dot={{ r: 3, strokeWidth: 2, fill: colors.tehran, stroke: '#00000040' }}
                                activeDot={{ r: 8, stroke: '#ffffff', strokeWidth: 3 }}
                                name="تهران"
                            />
                            <Line
                                type="monotone"
                                dataKey="tabriz"
                                stroke={colors.tabriz}
                                strokeWidth={3}
                                dot={{ r: 3, strokeWidth: 2, fill: colors.tabriz, stroke: '#00000040' }}
                                activeDot={{ r: 8, stroke: '#ffffff', strokeWidth: 3 }}
                                name="تبریز"
                            />
                            <Line
                                type="monotone"
                                dataKey="qom"
                                stroke={colors.qom}
                                strokeWidth={3}
                                dot={{ r: 3, strokeWidth: 2, fill: colors.qom, stroke: '#00000040' }}
                                activeDot={{ r: 8, stroke: '#ffffff', strokeWidth: 3 }}
                                name="قم"
                            />
                            <Line
                                type="monotone"
                                dataKey="average"
                                stroke={colors.average}
                                strokeWidth={4}
                                strokeDasharray="6 4"
                                dot={false}
                                activeDot={{ r: 9, stroke: colors.average, strokeWidth: 4 }}
                                name="میانگین کل شبکه"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

            </div>
        </section>
    )
}