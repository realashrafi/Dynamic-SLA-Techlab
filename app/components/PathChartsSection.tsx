// components/PathChartsSection.tsx
'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// داده نمونه برای ۴ مسیر (می‌تونی داده‌های واقعی رو جایگزین کنی)
const pathData = [
    {
        title: 'تهران → رشت',
        data: [
            { week: 1, time: 1.2 },
            { week: 5, time: 1.8 },
            { week: 10, time: 1.5 },
            { week: 15, time: 2.1 },
            { week: 20, time: 1.9 },
            { week: 25, time: 1.7 },
            { week: 30, time: 1.6 },
            { week: 33, time: 1.4 },
        ],
        color: '#FF6B00',
        target: 1,
    },
    {
        title: 'تهران → اصفهان',
        data: [
            { week: 1, time: 2.5 },
            { week: 5, time: 3.0 },
            { week: 10, time: 2.8 },
            { week: 15, time: 3.2 },
            { week: 20, time: 2.9 },
            { week: 25, time: 2.7 },
            { week: 30, time: 2.6 },
            { week: 33, time: 2.4 },
        ],
        color: '#00BFFF',
        target: 1,
    },
    {
        title: 'تهران → کرمانشاه',
        data: [
            { week: 1, time: 2.0 },
            { week: 5, time: 2.4 },
            { week: 10, time: 2.2 },
            { week: 15, time: 2.6 },
            { week: 20, time: 2.3 },
            { week: 25, time: 2.1 },
            { week: 30, time: 2.0 },
            { week: 33, time: 1.9 },
        ],
        color: '#32CD32',
        target: 1,
    },
    {
        title: 'تهران → بندرعباس',
        data: [
            { week: 1, time: 3.5 },
            { week: 5, time: 4.0 },
            { week: 10, time: 3.8 },
            { week: 15, time: 4.2 },
            { week: 20, time: 3.9 },
            { week: 25, time: 3.7 },
            { week: 30, time: 3.6 },
            { week: 33, time: 3.4 },
        ],
        color: '#FFD700',
        target: 2,
    },
]

const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay: i * 0.15,
        },
    }),
}

export default function PathChartsSection() {
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
                        نمودار تغییرات مدت زمان تعهد شده در مسیرهای مختلف
                    </h2>
                </div>

                {/* grid نمودارها */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {pathData.map((path, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={chartVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-[#0A2540]/80 backdrop-blur-sm rounded-xl border border-[#FF6B00]/30 p-4 shadow-xl"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#FF6B00]">
                                {path.title}
                            </h3>

                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={path.data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF20" />
                                        <XAxis dataKey="week" stroke="#FFFFFF80" tick={{ fill: '#FFFFFF' }} />
                                        <YAxis stroke="#FFFFFF80" domain={[0, 'dataMax + 1']} tick={{ fill: '#FFFFFF' }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0A2540', border: '1px solid #FF6B00', borderRadius: '8px', color: 'white' }}
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="time"
                                            stroke={path.color}
                                            strokeWidth={3}
                                            dot={{ r: 5, stroke: path.color, fill: '#001F3F' }}
                                        />

                                        {/* خط هدف SLA */}
                                        <Line
                                            type="monotone"
                                            dataKey={() => path.target}
                                            stroke="#FFFFFF"
                                            strokeDasharray="5 5"
                                            strokeWidth={2}
                                            dot={false}
                                            name={`هدف SLA (${path.target} روز)`}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/*<div className="mt-12 text-center opacity-70 text-sm md:text-base">*/}
                {/*    nona*/}
                {/*</div>*/}
            </div>
        </section>
    )
}