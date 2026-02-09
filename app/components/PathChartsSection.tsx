// components/PathChartsSection.tsx
'use client'

import {motion} from 'framer-motion'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

// داده نمونه برای ۴ مسیر (می‌تونی داده‌های واقعی رو جایگزین کنی)
const pathData = [
    {
        title: 'رشت → تهران',
        ticks: [0, 1, 2],
        data: [
            {week: 0, Actual_SLA: 1.19},
            {week: 5, Actual_SLA: 1.58},
            {week: 6, Actual_SLA: 1.70},
            {week: 7, Actual_SLA: 1.66},
            {week: 8, Actual_SLA: 1.60},
            {week: 9, Actual_SLA: 1.61},
            {week: 10, Actual_SLA: 1.72},
            {week: 11, Actual_SLA: 1.69},
            {week: 12, Actual_SLA: 1.90},
            {week: 13, Actual_SLA: 1.86},
            {week: 14, Actual_SLA: 1.82},
            {week: 15, Actual_SLA: 1.81},
            {week: 16, Actual_SLA: 1.69},
            {week: 17, Actual_SLA: 1.72},
            {week: 18, Actual_SLA: 1.76},
            {week: 19, Actual_SLA: 1.82},
            {week: 20, Actual_SLA: 1.82},
            {week: 21, Actual_SLA: 1.84},
            {week: 22, Actual_SLA: 1.89},
            {week: 23, Actual_SLA: 1.93},
            {week: 24, Actual_SLA: 1.98},
            {week: 25, Actual_SLA: 1.84},
            {week: 26, Actual_SLA: 1.78},
            {week: 27, Actual_SLA: 1.87},
            {week: 28, Actual_SLA: 1.87},
            {week: 29, Actual_SLA: 1.84},
            {week: 30, Actual_SLA: 1.87},
            {week: 31, Actual_SLA: 1.84},
            {week: 32, Actual_SLA: 1.80},
        ],
        color: '#FF6B00',
        minTarget: 1,
        maxTarget: 2
    },
    {
        title: 'اصفهان → تهران',
        ticks: [0, 1, 2, 3],
        data: [
            {week: 0, Actual_SLA: 1.72},
            {week: 1, Actual_SLA: 2.48},
            {week: 2, Actual_SLA: 2.48},
            {week: 3, Actual_SLA: 2.06},
            {week: 4, Actual_SLA: 1.62},
            {week: 5, Actual_SLA: 1.61},
            {week: 6, Actual_SLA: 1.90},
            {week: 7, Actual_SLA: 1.85},
            {week: 8, Actual_SLA: 1.74},
            {week: 9, Actual_SLA: 1.64},
            {week: 10, Actual_SLA: 1.88},
            {week: 11, Actual_SLA: 2.14},
            {week: 12, Actual_SLA: 2.04},
            {week: 13, Actual_SLA: 2.03},
            {week: 14, Actual_SLA: 2.03},
            {week: 15, Actual_SLA: 2.03},
            {week: 16, Actual_SLA: 1.84},
            {week: 17, Actual_SLA: 1.77},
            {week: 18, Actual_SLA: 1.91},
            {week: 19, Actual_SLA: 2.06},
            {week: 20, Actual_SLA: 1.85},
            {week: 21, Actual_SLA: 2.01},
            {week: 22, Actual_SLA: 2.13},
            {week: 23, Actual_SLA: 2.25},
            {week: 24, Actual_SLA: 2.05},
            {week: 25, Actual_SLA: 2.01},
            {week: 26, Actual_SLA: 2.00},
            {week: 27, Actual_SLA: 1.81},
            {week: 28, Actual_SLA: 1.93},
            {week: 29, Actual_SLA: 1.89},
            {week: 30, Actual_SLA: 1.83},
            {week: 31, Actual_SLA: 1.72},
            {week: 32, Actual_SLA: 1.86},
        ],
        color: '#00BFFF',
        minTarget: 1,
        maxTarget: 2
    },
    {
        title: 'کرمانشاه → تهران',
        ticks: [0, 1, 2, 3],
        data: [
            {week: 0, Actual_SLA: 1.27},
            {week: 1, Actual_SLA: 1.76},
            {week: 2, Actual_SLA: 2.03},
            {week: 3, Actual_SLA: 1.77},
            {week: 4, Actual_SLA: 1.55},
            {week: 5, Actual_SLA: 1.42},
            {week: 6, Actual_SLA: 2.03},
            {week: 7, Actual_SLA: 1.95},
            {week: 8, Actual_SLA: 1.75},
            {week: 9, Actual_SLA: 1.90},
            {week: 10, Actual_SLA: 1.98},
            {week: 11, Actual_SLA: 2.08},
            {week: 12, Actual_SLA: 2.50},
            {week: 13, Actual_SLA: 2.25},
            {week: 14, Actual_SLA: 1.95},
            {week: 15, Actual_SLA: 1.94},
            {week: 16, Actual_SLA: 1.80},
            {week: 17, Actual_SLA: 1.87},
            {week: 18, Actual_SLA: 2.20},
            {week: 19, Actual_SLA: 2.30},
            {week: 20, Actual_SLA: 2.27},
            {week: 21, Actual_SLA: 2.42},
            {week: 22, Actual_SLA: 2.55},
            {week: 23, Actual_SLA: 2.60},
            {week: 24, Actual_SLA: 2.78},
            {week: 25, Actual_SLA: 2.52},
            {week: 26, Actual_SLA: 2.35},
            {week: 27, Actual_SLA: 1.63},
            {week: 28, Actual_SLA: 2.08},
            {week: 29, Actual_SLA: 2.10},
            {week: 30, Actual_SLA: 1.97},
            {week: 31, Actual_SLA: 1.72},
            {week: 32, Actual_SLA: 1.76}
        ],
        color: '#32CD32',
        minTarget: 1,
        maxTarget: 2
    },
    {
        title: 'تهران → بندرعباس',
        ticks: [0, 1, 2, 3, 4, 5, 6],
        data: [
            {week: 1, Actual_SLA: 4.45},
            {week: 2, Actual_SLA: 3.30},
            {week: 3, Actual_SLA: 3.30},
            {week: 4, Actual_SLA: 3.00},
            {week: 5, Actual_SLA: 3.00},
            {week: 6, Actual_SLA: 3.02},
            {week: 7, Actual_SLA: 2.95},
            {week: 8, Actual_SLA: 3.02},
            {week: 9, Actual_SLA: 2.98},
            {week: 10, Actual_SLA: 3.40},
            {week: 11, Actual_SLA: 3.32},
            {week: 12, Actual_SLA: 5.55},
            {week: 13, Actual_SLA: 4.55},
            {week: 14, Actual_SLA: 3.75},
            {week: 15, Actual_SLA: 3.28},
            {week: 16, Actual_SLA: 3.50},
            {week: 17, Actual_SLA: 3.58},
            {week: 18, Actual_SLA: 3.85},
            {week: 19, Actual_SLA: 3.75},
            {week: 20, Actual_SLA: 3.25},
            {week: 21, Actual_SLA: 3.55},
            {week: 22, Actual_SLA: 3.82},
            {week: 23, Actual_SLA: 4.12},
            {week: 24, Actual_SLA: 3.62},
            {week: 25, Actual_SLA: 3.35},
            {week: 26, Actual_SLA: 4.05},
            {week: 27, Actual_SLA: 2.98},
            {week: 28, Actual_SLA: 2.92},
            {week: 29, Actual_SLA: 2.90},
            {week: 30, Actual_SLA: 3.38},
            {week: 31, Actual_SLA: 3.45},
            {week: 32, Actual_SLA: 3.20},
        ],
        color: '#FFD700',
        minTarget: 2,
        maxTarget: 3
    },
]

const chartVariants = {
    hidden: {opacity: 0, y: 30},
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
        <section className="py-60 px-6 md:px-12 bg-[#001F3F] text-white">
            <div className="max-w-6xl mx-auto">
                {/* عنوان */}
                <div className="flex items-center gap-6 mb-12">
                    <motion.div
                        initial={{scaleX: 0}}
                        whileInView={{scaleX: 1}}
                        transition={{duration: 0.9}}
                        className="w-16 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                    />
                    <h2 className="text-3xl md:text-5xl font-bold text-[#FF6B00]">
                        نمودار تغییرات SLA در مسیرهای مختلف
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
                            viewport={{once: true}}
                            className="bg-[#0A2540]/80 backdrop-blur-sm rounded-xl border border-[#FF6B00]/30 p-4 shadow-xl"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#FF6B00]">
                                {path.title}
                            </h3>

                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={path.data} margin={{top: 10, right: 10, left: 0, bottom: 20}}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF20"/>
                                        <XAxis dataKey="week" stroke="#FFFFFF80" tick={{fill: '#FFFFFF'}}/>
                                        <YAxis stroke="#FFFFFF80" tick={{fill: '#FFFFFF'}} ticks={path.ticks}/>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#0A2540',
                                                border: '1px solid #FF6B00',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }}
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="Actual_SLA"
                                            stroke={path.color}
                                            strokeWidth={3}
                                            dot={{r: 1, stroke: path.color, fill: '#001F3F'}}
                                        />

                                        {/* خط هدف SLA */}
                                        <Line
                                            type="monotone"
                                            dataKey={() => path.minTarget}
                                            stroke="#ff0000"
                                            strokeDasharray="5 5"
                                            strokeWidth={2}
                                            dot={false}
                                            name={`Plan SLA`}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey={() => path.maxTarget}
                                            stroke="#07b727"
                                            strokeDasharray="5 5"
                                            strokeWidth={2}
                                            dot={false}
                                            name={`Mode`}
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