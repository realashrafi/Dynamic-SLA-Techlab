// components/ProblemSection.tsx
'use client'

import { motion } from 'framer-motion'

const problems = [
    'تعریف SLA به‌صورت ایستا در محیطی با رفتار پویا و متغیر',
    'فاصله معنادار میان تعهد زمانی اعلام‌شده و عملکرد واقعی شبکه',
    'ناپایداری تحقق SLA حتی در مبدا–مقصد های ثابت در طول زمان',
    'تبدیل SLA از ابزار پایش عملکرد به عدد قراردادی',
    'افزایش زیان مالی و تضعیف اعتماد مشتری ناشی از بدقولی‌های موجود در زمان تحویل',
    'غالب بودن مشتریان B2B و وابستگی تصمیم آن‌ها به رضایت مشتری نهایی',
    'نقش زمان تحویل و عملکرد SLA به‌عنوان عامل غیرمستقیم در انتخاب تیپاکس توسط کسب‌وکارها',
]

export default function ProblemSection() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 bg-[#0A1F44]/30 border border-white/10 text-white overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* هدر */}
                <div className="flex items-center gap-5 md:gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] via-[#FF8A3D] to-[#FFB74D] rounded-full origin-left"
                    />
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                        مسئله چیست؟
                    </h2>
                </div>

                {/* کانتینر شیشه‌ای اصلی */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1 }}
                    className={`
            relative backdrop-blur-xl bg-white/4 border border-white/8 
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/50 
            p-6 md:p-10 lg:p-12
          `}
                >
                    {/* خط عمودی شیشه‌ای/گرادیان (جایگزین dashed) */}
                    <div className="absolute right-8 md:right-12 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#FF6B00]/30 via-[#FF6B00]/10 to-transparent pointer-events-none" />

                    <div className="space-y-8 md:space-y-10 relative">
                        {problems.map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.12 }}
                                className={`
                  flex items-start gap-5 md:gap-6 pl-2 md:pl-4
                  hover:bg-white/5 rounded-xl p-4 md:p-5 transition-all duration-300
                `}
                            >
                                {/* دایره شماره شیشه‌ای */}
                                <div className={`
                  flex-shrink-0 w-10 h-10 md:w-12 md:h-12 
                  rounded-full backdrop-blur-md bg-white/8 border border-white/15 
                  text-[#FF6B00] font-bold text-xl md:text-2xl 
                  flex items-center justify-center shadow-lg shadow-black/40
                `}>
                                    {i + 1}
                                </div>

                                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 pt-1.5">
                                    {text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/*/!* کپشن کوچک اختیاری *!/*/}
                {/*<p className="mt-10 text-center text-white/40 text-sm md:text-base tracking-wide">*/}
                {/*    چالش‌های کلیدی شبکه لجستیک فعلی تیپاکس*/}
                {/*</p>*/}
            </div>
        </section>
    )
}