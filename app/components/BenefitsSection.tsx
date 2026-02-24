// components/BenefitsSection.tsx
'use client'

import { motion } from 'framer-motion'

export default function BenefitsSection() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 text-white relative overflow-hidden">
            {/* پس‌زمینه subtle گرادیان + radial نارنجی ملایم */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#FF6B0022_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#3b82f622_0%,transparent_60%)]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* عنوان */}
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white tracking-tight">
                        SLA در کدام لایه می‌تواند بهبود ایجاد کند؟
                    </h2>
                    <p className="mt-4 text-xl md:text-2xl text-white/80 font-medium">
                        مسئله و راهکار در سه لایه کلیدی تعریف می‌شود
                    </p>
                </motion.div>

                {/* mind-map / سه‌گانه متصل */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* خطوط اتصال افقی (SVG ساده برای اتصال بهتر) */}
                    <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* لایه ۱ */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40 hover:shadow-[#FF6B00]/20 hover:border-[#FF6B00]/30 transition-all duration-500 group"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white group-hover:text-[#FF6B00] transition-colors">
                            لایه تجربه مشتری
                        </h3>
                        <ul className="space-y-5 text-lg md:text-xl leading-relaxed text-white/90">
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                هم‌راستاسازی تعهد زمانی با واقعیت عملیاتی
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                کاهش نارضایتی ناشی از اختلاف SLA و زمان تحویل
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                افزایش قابلیت کنترل در طول سفر مرسوله
                            </li>
                        </ul>
                    </motion.div>

                    {/* لایه ۲ - مرکزی (کمی برجسته‌تر اما نه بیش از حد) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.4 }}
                        className="backdrop-blur-3xl bg-white/8 border-2 border-[#FF6B00]/30 rounded-3xl p-9 md:p-12 shadow-2xl shadow-[#FF6B00]/10 relative z-10 hover:shadow-[#FF6B00]/30 transition-all duration-500 group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00]/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-white to-[#FF6B00] bg-clip-text text-transparent">
                            لایه برند و فروش تیپاکس
                        </h3>
                        <ul className="space-y-6 text-xl leading-relaxed text-white/95">
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                تقویت اعتبار برند با تعهدات داده‌محور و واقع‌بینانه
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                ارتقای SLA به ابزار فروش و مزیت رقابتی
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                بهبود درآمد از طریق قیمت‌گذاری متناسب خدمات Same-Day
                            </li>
                        </ul>
                    </motion.div>

                    {/* لایه ۳ */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40 hover:shadow-[#FF6B00]/20 hover:border-[#FF6B00]/30 transition-all duration-500 group"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white group-hover:text-[#FF6B00] transition-colors">
                            لایه سازمان و عملیات
                        </h3>
                        <ul className="space-y-5 text-lg md:text-xl leading-relaxed text-white/90">
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                نظام‌مند شدن تحلیل و پایش SLA
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                افزایش پویایی تصمیم‌گیری عملیاتی
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                هم‌راستاسازی KPIها با واقعیت اجرا
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-[#FF6B00] text-2xl font-bold">•</span>
                                کاهش ریسک زیان مالی ناشی از عدم تحقق SLA
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/*/!* کپشن پایین *!/*/}
                {/*<p className="mt-16 text-center text-white/50 text-lg">*/}
                {/*    nona – تبدیل SLA به مزیت استراتژیک در تمام لایه‌ها*/}
                {/*</p>*/}
            </div>
        </section>
    )
}