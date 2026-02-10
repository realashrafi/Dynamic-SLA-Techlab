// components/BenefitsSection.tsx
'use client'

import { motion } from 'framer-motion'

export default function BenefitsSection() {
    return (
        <section className="py-60 px-6 md:px-12 bg-gradient-to-b from-[#001F3F] via-[#FF8C00] to-[#001F3F] text-white relative overflow-hidden">
            {/* الگوی subtle نارنجی */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_30%_70%,#ffffff22_0%,transparent_60%)]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* عنوان اصلی */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-1.5 bg-white rounded-full" />
                        <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                            SLA در  کدام لایه می تواند بهبود ایجاد کند؟
                            <div className="text-xl font-bold mt-2 text-white/90 tracking-wide">
                                مسئله و راهکار در سه لایه تعریف می شود
                            </div>
                        </h2>
                    </div>
                </div>

                {/* mind-map اصلی */}
                <div className="relative">
                    {/* خط مرکزی نارنجی */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/40 transform -translate-x-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
                        {/* لایه ۱: تجربه مشتری */}
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-2xl hover:translate-y-8 hover:scale-110 transition-all duration-200 ease-in-out"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
                                لایه تجربه مشتری
                            </h3>
                            <ul className="space-y-5 text-lg leading-relaxed">
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">•</span>
                                    هم‌راستاسازی تعهد زمانی با واقعیت عملیاتی
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">•</span>
                                    کاهش نارضایتی ناشی از اختلاف SLA و زمان تحویل
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">•</span>
                                    افزایش قابلیت کنترل در طول سفر مرسوله
                                </li>
                            </ul>
                        </motion.div>

                        {/* لایه ۲: برند و فروش (وسط، کمی برجسته‌تر) */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="bg-white/25 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/40 shadow-2xl md:scale-110 md:z-10 hover:translate-y-8 hover:scale-110 transition-all duration-200 ease-in-out"
                        >
                            <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-white">
                                لایه برند و فروش تیپاکس
                            </h3>
                            <ul className="space-y-6 text-xl leading-relaxed">
                                <li className="flex items-start gap-4">
                                    <span className="text-2xl">•</span>
                                    تقویت اعتبار برند با تعهدات داده‌محور و واقع‌بینانه
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-2xl">•</span>
                                    ارتقای SLA به ابزار فروش و مزیت رقابتی
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-2xl">•</span>
                                    بهبود درآمد از طریق قیمت‌گذاری متناسب خدمات Same-Day
                                </li>
                            </ul>
                        </motion.div>

                        {/* لایه ۳: سازمان و عملیات */}
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-2xl hover:translate-y-8 hover:scale-110 transition-all duration-200 ease-in-out"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
                                لایه سازمان و عملیات
                            </h3>
                            <ul className="space-y-5 text-lg leading-relaxed">
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">•</span>
                                    نظام‌مند شدن تحلیل و پایش SLA
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">•</span>
                                    افزایش پویایی تصمیم‌گیری عملیاتی
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">•</span>
                                    هم‌راستاسازی KPIها با واقعیت اجرا
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">•</span>
                                    کاهش ریسک زیان مالی ناشی از عدم تحقق SLA
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* خطوط اتصال ساده (اختیاری - می‌تونی با SVG پیچیده‌تر کنی) */}
                    <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-1 bg-white/30 transform -translate-y-1/2" />
                    <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-1 bg-white/30 transform -translate-y-1/2" />
                </div>

                {/*<div className="mt-16 text-center text-sm md:text-base opacity-80">*/}
                {/*    ارائه شده توسط nona*/}
                {/*</div>*/}
            </div>
        </section>
    )
}