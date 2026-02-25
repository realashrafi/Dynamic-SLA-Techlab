// components/PathChartsSection.tsx
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
    TooltipProps,
    ReferenceLine,
} from 'recharts'

// داده‌ها (دقیقاً همان چیزی که فرستادی)
const pathData = [
    {
        title: 'رشت → تهران',
        ticks: [0, 1, 2],
        data: [
            { week: 0, Actual_SLA: 1.19 },
            { week: 5, Actual_SLA: 1.58 },
            { week: 6, Actual_SLA: 1.70 },
            { week: 7, Actual_SLA: 1.66 },
            { week: 8, Actual_SLA: 1.60 },
            { week: 9, Actual_SLA: 1.61 },
            { week: 10, Actual_SLA: 1.72 },
            { week: 11, Actual_SLA: 1.69 },
            { week: 12, Actual_SLA: 1.90 },
            { week: 13, Actual_SLA: 1.86 },
            { week: 14, Actual_SLA: 1.82 },
            { week: 15, Actual_SLA: 1.81 },
            { week: 16, Actual_SLA: 1.69 },
            { week: 17, Actual_SLA: 1.72 },
            { week: 18, Actual_SLA: 1.76 },
            { week: 19, Actual_SLA: 1.82 },
            { week: 20, Actual_SLA: 1.82 },
            { week: 21, Actual_SLA: 1.84 },
            { week: 22, Actual_SLA: 1.89 },
            { week: 23, Actual_SLA: 1.93 },
            { week: 24, Actual_SLA: 1.98 },
            { week: 25, Actual_SLA: 1.84 },
            { week: 26, Actual_SLA: 1.78 },
            { week: 27, Actual_SLA: 1.87 },
            { week: 28, Actual_SLA: 1.87 },
            { week: 29, Actual_SLA: 1.84 },
            { week: 30, Actual_SLA: 1.87 },
            { week: 31, Actual_SLA: 1.84 },
            { week: 32, Actual_SLA: 1.80 },
        ],
        color: '#FF6B00',
        minTarget: 1,
        maxTarget: 2,
    },
    {
        title: 'اصفهان → تهران',
        ticks: [0, 1, 2, 3],
        data: [
            { week: 0, Actual_SLA: 1.72 },
            { week: 1, Actual_SLA: 2.48 },
            { week: 2, Actual_SLA: 2.48 },
            { week: 3, Actual_SLA: 2.06 },
            { week: 4, Actual_SLA: 1.62 },
            { week: 5, Actual_SLA: 1.61 },
            { week: 6, Actual_SLA: 1.90 },
            { week: 7, Actual_SLA: 1.85 },
            { week: 8, Actual_SLA: 1.74 },
            { week: 9, Actual_SLA: 1.64 },
            { week: 10, Actual_SLA: 1.88 },
            { week: 11, Actual_SLA: 2.14 },
            { week: 12, Actual_SLA: 2.04 },
            { week: 13, Actual_SLA: 2.03 },
            { week: 14, Actual_SLA: 2.03 },
            { week: 15, Actual_SLA: 2.03 },
            { week: 16, Actual_SLA: 1.84 },
            { week: 17, Actual_SLA: 1.77 },
            { week: 18, Actual_SLA: 1.91 },
            { week: 19, Actual_SLA: 2.06 },
            { week: 20, Actual_SLA: 1.85 },
            { week: 21, Actual_SLA: 2.01 },
            { week: 22, Actual_SLA: 2.13 },
            { week: 23, Actual_SLA: 2.25 },
            { week: 24, Actual_SLA: 2.05 },
            { week: 25, Actual_SLA: 2.01 },
            { week: 26, Actual_SLA: 2.00 },
            { week: 27, Actual_SLA: 1.81 },
            { week: 28, Actual_SLA: 1.93 },
            { week: 29, Actual_SLA: 1.89 },
            { week: 30, Actual_SLA: 1.83 },
            { week: 31, Actual_SLA: 1.72 },
            { week: 32, Actual_SLA: 1.86 },
        ],
        color: '#60A5FA',
        minTarget: 1,
        maxTarget: 2,
    },
    {
        title: 'کرمانشاه → تهران',
        ticks: [0, 1, 2, 3],
        data: [
            { week: 0, Actual_SLA: 1.27 },
            { week: 1, Actual_SLA: 1.76 },
            { week: 2, Actual_SLA: 2.03 },
            { week: 3, Actual_SLA: 1.77 },
            { week: 4, Actual_SLA: 1.55 },
            { week: 5, Actual_SLA: 1.42 },
            { week: 6, Actual_SLA: 2.03 },
            { week: 7, Actual_SLA: 1.95 },
            { week: 8, Actual_SLA: 1.75 },
            { week: 9, Actual_SLA: 1.90 },
            { week: 10, Actual_SLA: 1.98 },
            { week: 11, Actual_SLA: 2.08 },
            { week: 12, Actual_SLA: 2.50 },
            { week: 13, Actual_SLA: 2.25 },
            { week: 14, Actual_SLA: 1.95 },
            { week: 15, Actual_SLA: 1.94 },
            { week: 16, Actual_SLA: 1.80 },
            { week: 17, Actual_SLA: 1.87 },
            { week: 18, Actual_SLA: 2.20 },
            { week: 19, Actual_SLA: 2.30 },
            { week: 20, Actual_SLA: 2.27 },
            { week: 21, Actual_SLA: 2.42 },
            { week: 22, Actual_SLA: 2.55 },
            { week: 23, Actual_SLA: 2.60 },
            { week: 24, Actual_SLA: 2.78 },
            { week: 25, Actual_SLA: 2.52 },
            { week: 26, Actual_SLA: 2.35 },
            { week: 27, Actual_SLA: 1.63 },
            { week: 28, Actual_SLA: 2.08 },
            { week: 29, Actual_SLA: 2.10 },
            { week: 30, Actual_SLA: 1.97 },
            { week: 31, Actual_SLA: 1.72 },
            { week: 32, Actual_SLA: 1.76 },
        ],
        color: '#34D399',
        minTarget: 1,
        maxTarget: 2,
    },
    {
        title: 'تهران → بندرعباس',
        ticks: [0, 1, 2, 3, 4, 5, 6],
        data: [
            { week: 1, Actual_SLA: 4.45 },
            { week: 2, Actual_SLA: 3.30 },
            { week: 3, Actual_SLA: 3.30 },
            { week: 4, Actual_SLA: 3.00 },
            { week: 5, Actual_SLA: 3.00 },
            { week: 6, Actual_SLA: 3.02 },
            { week: 7, Actual_SLA: 2.95 },
            { week: 8, Actual_SLA: 3.02 },
            { week: 9, Actual_SLA: 2.98 },
            { week: 10, Actual_SLA: 3.40 },
            { week: 11, Actual_SLA: 3.32 },
            { week: 12, Actual_SLA: 5.55 },
            { week: 13, Actual_SLA: 4.55 },
            { week: 14, Actual_SLA: 3.75 },
            { week: 15, Actual_SLA: 3.28 },
            { week: 16, Actual_SLA: 3.50 },
            { week: 17, Actual_SLA: 3.58 },
            { week: 18, Actual_SLA: 3.85 },
            { week: 19, Actual_SLA: 3.75 },
            { week: 20, Actual_SLA: 3.25 },
            { week: 21, Actual_SLA: 3.55 },
            { week: 22, Actual_SLA: 3.82 },
            { week: 23, Actual_SLA: 4.12 },
            { week: 24, Actual_SLA: 3.62 },
            { week: 25, Actual_SLA: 3.35 },
            { week: 26, Actual_SLA: 4.05 },
            { week: 27, Actual_SLA: 2.98 },
            { week: 28, Actual_SLA: 2.92 },
            { week: 29, Actual_SLA: 2.90 },
            { week: 30, Actual_SLA: 3.38 },
            { week: 31, Actual_SLA: 3.45 },
            { week: 32, Actual_SLA: 3.20 },
        ],
        color: '#FBBF24',
        minTarget: 2,
        maxTarget: 3,
    },
]

// Tooltip سفارشی
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="
        backdrop-blur-xl bg-[#0A1F44]/90 border border-white/20
        rounded-xl p-5 shadow-2xl shadow-black/70 min-w-[220px] text-sm
      ">
                <p className="font-bold text-white mb-3 pb-2 border-b border-white/30">
                    هفته {label}
                </p>
                {payload.map((entry:any, index:any) =>
                        entry.value !== undefined && (
                            <div key={`item-${index}`} className="flex justify-between py-1.5">
              <span className="font-medium" style={{ color: entry.color || '#FFFFFF' }}>
                {entry.name || 'Actual SLA'}:
              </span>
                                <span className="text-white font-semibold">
                {entry.value.toFixed(2)} روز
              </span>
                            </div>
                        )
                )}
            </div>
        )
    }
    return null
}

const chartVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            delay: i * 0.18,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
}

export default function PathChartsSection() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 bg-[#0A1F44]/30 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* عنوان */}
                <div className="flex items-center gap-5 md:gap-6 mb-10 md:mb-14">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full origin-left"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight">
                        نمودار تغییرات SLA در مسیرهای منتخب
                    </h2>
                </div>

                {/* گرید نمودارها */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {pathData.map((path, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            //@ts-ignore
                            variants={chartVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="
                group relative bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
                rounded-2xl md:rounded-3xl shadow-2xl shadow-black/50
                overflow-hidden p-5 md:p-6 transition-all duration-500
                hover:shadow-[#FF6B00]/20 hover:border-[#FF6B00]/30
              "
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-white group-hover:text-[#FF6B00] transition-colors">
                                {path.title}
                            </h3>

                            <div className="h-72 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={path.data}
                                        margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="4 4"
                                            stroke="#FFFFFF12"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="week"
                                            stroke="#FFFFFF50"
                                            tick={{ fill: '#FFFFFFA0', fontSize: 12 }}
                                            tickLine={false}
                                            axisLine={{ stroke: '#FFFFFF20' }}
                                            label={{
                                                value: 'شماره هفته',
                                                position: 'insideBottom',
                                                offset: -15,
                                                fill: '#FFFFFFC0',
                                                fontSize: 13,
                                            }}
                                        />

                                        <YAxis
                                            stroke="#FFFFFF50"
                                            domain={[path.minTarget - 0.5, path.maxTarget + 1]}
                                            tick={{ fill: '#FFFFFFA0', fontSize: 12 }}
                                            tickLine={false}
                                            axisLine={{ stroke: '#FFFFFF20' }}
                                            ticks={path.ticks}
                                            label={{
                                                value: 'زمان تحویل (روز)',
                                                angle: -90,
                                                position: 'insideLeft',
                                                offset: -10,
                                                fill: '#FFFFFFC0',
                                                fontSize: 13,
                                            }}
                                        />

                                        <Tooltip
                                            content={<CustomTooltip />}
                                            cursor={{ stroke: path.color, strokeWidth: 1.5, strokeDasharray: '5 5' }}
                                        />

                                        {/* خط اصلی Actual SLA */}
                                        <Line
                                            type="monotone"
                                            dataKey="Actual_SLA"
                                            stroke={path.color}
                                            strokeWidth={3}
                                            dot={{ r: 3, strokeWidth: 2, fill: path.color, stroke: '#00000040' }}
                                            activeDot={{ r: 8, stroke: '#ffffff', strokeWidth: 3 }}
                                            name="Actual SLA"
                                        />

                                        {/* خطوط هدف ثابت با ReferenceLine */}
                                        <ReferenceLine
                                            y={path.minTarget}
                                            stroke="#ef4444"
                                            strokeDasharray="6 4"
                                            strokeWidth={2.5}
                                            label={{
                                                value: `Plan SLA (${path.minTarget})`,
                                                position: 'right',
                                                fill: '#ef4444',
                                                fontSize: 12,
                                                dx: 10,
                                            }}
                                        />

                                        <ReferenceLine
                                            y={path.maxTarget}
                                            stroke="#22c55e"
                                            strokeDasharray="6 4"
                                            strokeWidth={2.5}
                                            label={{
                                                value: `Mode (${path.maxTarget})`,
                                                position: 'right',
                                                fill: '#22c55e',
                                                fontSize: 12,
                                                dx: 10,
                                            }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/*<p className="mt-12 text-center text-white/50 text-base md:text-lg tracking-wide">*/}
                {/*    nona – مقایسه عملکرد واقعی SLA با اهداف در مسیرهای کلیدی*/}
                {/*</p>*/}
            </div>
        </section>
    )
}