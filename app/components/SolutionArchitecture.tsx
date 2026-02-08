// components/SolutionArchitecture.tsx
'use client'

import { motion } from 'framer-motion'
import { easeOut } from 'framer-motion'

const leftPoints = [
    'اتکا به تحلیل سری‌های زمانی برای استخراج الگوهای رفتاری SLA',
    'استفاده از مدل‌های سبک تحلیلی (SLM) برای ارزیابی اثر متغیرها',
    'ارائه راهکار به صورت پلتفرم با افزونه در سیستم‌های سازمانی تیپاکس',
]

const rightPoints = [
    'بررسی خودکار سازگاری SLA حمل با SLA چارچوبی',
    'مدلسازی SLA به عنوان مسئله محدودیت‌محور',
    'جلوگیری از اعمال جریمه‌های اشتباه ناشی از تفسیر نادرست قرارداد',
    'پایش بلادرنگ عملکرد SLA + سامانه هشداردهنده',
    'اتصال به سیستم‌های موجود از طریق API استاندارد',
    'شناسایی زودهنگام انحراف + مداخله پیشگیرانه',
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
}

const boxVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
}

const rightBoxVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
}

export default function SolutionArchitecture() {
    return (
        <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-[#001F3F] to-[#001F3F] text-white relative overflow-hidden">
            {/* گرادیان پس‌زمینه ملایم */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-tr from-[#FF6B00]/5 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* عنوان اصلی */}
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-[#FF6B00] drop-shadow-lg">
                        راهکار تکلیف + معماری پیشنهادی
                    </h2>
                    <p className="text-xl md:text-2xl mt-4 opacity-90">
                        SLA داینامیک مبتنی بر داده + کنترل هوشمند + هشدار بلادرنگ
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start"
                >
                    {/* ستون چپ: تحلیل داده‌ای */}
                    <motion.div variants={boxVariants} className="bg-white/10 backdrop-blur-lg border border-[#FF6B00]/40 rounded-2xl p-8 md:p-10 shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">
                            امکان طراحی SLA داینامیک مبتنی بر شواهد داده‌ای
                        </h3>

                        <ul className="space-y-6 text-lg md:text-xl leading-relaxed">
                            {leftPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-xl">
                    {i + 1}
                  </span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* ستون راست: کنترل انطباق + سامانه هشدار */}
                    <motion.div variants={rightBoxVariants} className="bg-white/10 backdrop-blur-lg border border-[#FF6B00]/40 rounded-2xl p-8 md:p-10 shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">
                            کنترل انطباق چندسطحی + سامانه هشداردهنده SLA
                        </h3>

                        <ul className="space-y-6 text-lg md:text-xl leading-relaxed">
                            {rightPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-xl">
                    {i + 1}
                  </span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* فلش اتصال‌دهنده (اختیاری - برای حس جریان) */}
                <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
                        <path
                            d="M0 40 H160 M140 20 L160 40 M140 60 L160 40"
                            stroke="#FF6B00"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="mt-16 text-center opacity-80 text-base">
                    ادغام با حداقل اختلال در فرآیندهای جاری + کاهش ریسک‌های عملیاتی و مالی
                </div>

                {/*<div className="mt-10 text-center opacity-70 text-sm">*/}
                {/*    nona*/}
                {/*</div>*/}
            </div>
        </section>
    )
}