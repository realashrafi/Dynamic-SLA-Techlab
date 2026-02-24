// components/AnalysisMethod.tsx
'use client'

import {motion} from 'framer-motion'
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

// داده نمونه (از توضیحات اسلاید + داده‌های واقعی تقریبی)
const chartData = [
    {week: 2, time: 4.43},
    {week: 3, time: 3.28},
    {week: 4, time: 3.27},
    {week: 5, time: 2.96},
    {week: 6, time: 3.98},
    {week: 7, time: 4.98},
    {week: 8, time: 4.53},
    {week: 9, time: 4.30},
    {week: 10, time: 3.93},
    {week: 11, time: 3.38},
    {week: 12, time: 3.25},
    {week: 13, time: 5.45},
    {week: 14, time: 7.78},
    {week: 15, time: 4.40},
    {week: 16, time: 3.28},
    {week: 17, time: 3.74},
    {week: 18, time: 4.38},
    {week: 19, time: 3.85},
    {week: 20, time: 3.82},
    {week: 21, time: 3.43},
    {week: 22, time: 3.74},
    {week: 23, time: 4.88},
    {week: 24, time: 4.10},
    {week: 25, time: 3.72},
    {week: 26, time: 3.30},
    {week: 27, time: 4.05},
    {week: 28, time: 2.97},
    {week: 29, time: 2.89},
    {week: 30, time: 2.88},
    {week: 31, time: 4.43},
    {week: 32, time: 4.46},
]

const colors = {
    tehran: '#FF6B00',
}

export default function RealTime() {
    return (
        <section
            className="py-70 px-6 md:px-12 text-white overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* عنوان با فلش */}
                <div className="flex items-center gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{scaleX: 0, originX: 0}}
                        whileInView={{scaleX: 1}}
                        transition={{duration: 0.9, ease: 'easeOut'}}
                        className="w-20 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                    />
                    <h2 className="text-4xl md:text-6xl font-black text-[#FF6B00] drop-shadow-lg">
                        SLA (Real-time Monitoring)
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16 items-center">
                    {/* ستون متن - کوچک‌تر (1/5 عرض در دسکتاپ) */}
                    <motion.div
                        initial={{opacity: 0, x: -80}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 1, ease: 'easeOut'}}
                        className="lg:col-span-2 space-y-8 text-lg md:text-xl leading-relaxed"
                    >
                        {/*<p className="font-medium">*/}
                        {/*    مبنای این تحلیل، نمای کلی SLA قابل تحقق تحت تاثیر محیط پویا و داده‌محور شبکه لجستیک تیپاکس*/}
                        {/*    است.*/}
                        {/*</p>*/}

                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  ۱
                </span>
                                تعریف SLA به‌عنوان یک شاخص کیفیت قابل پایش، مشابه سیستم‌های کنترل کیفیت (SPC)
                            </li>
                            <li className="flex items-start gap-4">
                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  ۲
                </span>
                                پایش بلادرنگ عملکرد شبکه و رفتار SLA در طول زمان
                            </li>
                            <li className="flex items-start gap-4">
                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  ۳
                </span>
                                مقایسه مداوم SLA واقعی با محدوده‌های کنترل تعریف‌شده (Control Limits)
                            </li>
                            <li className="flex items-start gap-4">
                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  4
                </span>
                                شناسایی سریع انحرافات و نقاط خارج از کنترل (Out of Control Points)
                            </li>
                            <li className="flex items-start gap-4">
                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  5
                </span>
                                تولید هشدار خودکار در صورت عبور از آستانه‌های مجاز
                            </li>
                            <li className="flex items-start gap-4">
                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  6
                </span>
                                امکان مداخله عملیاتی پیش از نقض SLA و وقوع تأخیر سهای پرهزینه
                            </li>
                            <li className="flex items-start gap-4">
                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  7
                </span>
                                تبدیل مدیریت SLA از رویکرد واکنشی به رویکرد پیشگیرانه (Proactive)
                            </li>
                            {/*            <li className="flex items-start gap-4">*/}
                            {/*<span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">*/}
                            {/*  4*/}
                            {/*</span>*/}
                            {/*                داده های موجود از جنگ 12 روزه به دلیل متفاوت بودن رفتار درون یابی شده اند.*/}
                            {/*            </li>*/}
                        </ul>

                        {/*<p className="text-[#FF6B00] font-medium pt-4">*/}
                        {/*    نتیجه: SLA داینامیک مبتنی بر واقعیت اجرایی + عوامل خارجی*/}
                        {/*</p>*/}
                    </motion.div>

                    {/* ستون تصویر - غالب (4/5 عرض در دسکتاپ) */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.85, rotate: -3}}
                        whileInView={{opacity: 1, scale: 1, rotate: 0}}
                        transition={{duration: 1.3, ease: 'easeOut'}}
                        className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FF6B00]/50"
                    >
                        {/* تصویر اصلی (ترکیب کامیون + برج آزادی) */}
                        <motion.div
                            initial={{opacity: 0, y: 40}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            className="h-96 w-full rounded-xl overflow-hidden border border-[#FF6B00]/30 shadow-2xl bg-[#001F3F]/50 backdrop-blur-sm p-4"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF20"/>
                                    <XAxis dataKey="week" stroke="#FFFFFF80" label={{
                                        value: 'شماره هفته',
                                        position: 'insideBottomLeft',
                                        fill: '#FFFFFF',
                                        offset: -2,
                                        dx: 80
                                    }}/>
                                    <YAxis stroke="#FFFFFF80" domain={[2, 8]} tick={false}           // ← اعداد رو مخفی می‌کنه
                                            label={{
                                        value: 'درصد پایبندی به تعهد',
                                        angle: -90,
                                        position: 'insideLeft',
                                        fill: '#FFFFFF'
                                    }}/>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0A2540',
                                            border: '1px solid #FF6B00',
                                            borderRadius: '8px',
                                            color: 'white'
                                        }}
                                        labelStyle={{color: '#FF6B00'}}
                                    />
                                    <Legend wrapperStyle={{color: 'white'}}/>

                                    <Line type="monotone" dataKey="time" stroke={colors.tehran} strokeWidth={3}
                                          dot={{r: 2, fill: colors.tehran}} name="SLA"/>
                                    <Line
                                        type="monotone"
                                        dataKey={() => 4.25}
                                        stroke="#07b727"
                                        strokeDasharray="5 5"
                                        strokeWidth={2}
                                        dot={false}
                                        name={`sigma-1`}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey={() => 3.75}
                                        stroke="#ff0000"
                                        strokeDasharray="5 5"
                                        strokeWidth={2}
                                        dot={false}
                                        name={`sigma-2`}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* overlay گرادیان نارنجی + لوگو مرکزی */}
                        {/*<div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/70 via-[#FF6B00]/20 to-transparent flex items-center justify-center">*/}
                        {/*    <div className="text-center px-8">*/}
                        {/*        <h3 className="text-5xl md:text-7xl font-black text-white tracking-wider drop-shadow-2xl">*/}
                        {/*            DYNAMIC SLA*/}
                        {/*        </h3>*/}
                        {/*        <p className="text-2xl md:text-4xl text-white/90 mt-4 font-medium">*/}
                        {/*            پویا و واقعی*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/* لوگوی nona پایین سمت چپ */}
                        {/*<div className="absolute bottom-6 left-6 text-white/90 text-xl font-bold drop-shadow-md">*/}
                        {/*    nona*/}
                        {/*</div>*/}

                        {/*/!* آیکون کوچک تیپاکس پایین سمت راست (اختیاری) *!/*/}
                        {/*<div className="absolute bottom-6 right-6 opacity-80">*/}
                        {/*    <div className="text-[#FF6B00] text-3xl font-black">TIPAX</div>*/}
                        {/*</div>*/}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}