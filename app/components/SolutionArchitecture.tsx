// components/SolutionArchitecture.tsx
'use client'

import { motion, easeOut } from 'framer-motion'

const leftPoints = [
    {
        id: 1,
        title: 'پیشنهاد SLA بهینه برای هر مسیر',
        description: 'تعیین SLA پیشنهادی بر اساس رفتار واقعی شبکه و الگوهای تاریخی هر مبدا–مقصد',
    },
    {
        id: 2,
        title: 'پیش‌بینی عددی نرخ تحقق SLA',
        description: 'برآورد احتمال پایبندی به SLA برای تصمیم‌گیری دقیق‌تر در تعهددهی',
    },
    {
        id: 3,
        title: 'هشدار پیشگیرانه ریسک نقض SLA',
        description: 'شناسایی زودهنگام مسیرهای پرریسک قبل از وقوع تأخیر و نقض تعهد',
    },
    {
        id: 4,
        title: 'پیشنهاد اقدام عملیاتی مشخص',
        description: 'ارائه اقدام‌های قابل اجرا برای کاهش ریسک (اولویت‌دهی، تغییر سرویس، تخصیص ظرفیت)',
    },
    {
        id: 5,
        title: 'خروجی سیستم‌محور و قابل تزریق',
        description: 'تولید خروجی قابل استفاده در سیستم‌های عملیاتی از طریق داشبورد یا API',
    },
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
        transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

export default function SolutionArchitecture() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16  text-white overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* عنوان اصلی با گرادیان */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white tracking-tight drop-shadow-lg">
                        راهکار تک‌لب
                    </h2>
                    <p className="mt-4 text-xl md:text-2xl text-white/85 font-medium">
                        SLA داینامیک مبتنی بر داده + کنترل هوشمند + هشدار بلادرنگ
                    </p>
                </motion.div>

                {/* دو ستون اصلی با glassmorphism */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-12 items-start"
                >
                    {/* ستون چپ: تحلیل داده‌ای */}
                    <motion.div
                        variants={containerVariants}
                        className="
              bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
              rounded-2xl lg:rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/50
              hover:shadow-[#FF6B00]/20 hover:border-[#FF6B00]/20 transition-all duration-500
            "
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">
                            امکان طراحی SLA داینامیک مبتنی بر شواهد داده‌ای
                        </h3>

                        <ul className="space-y-6">
                            {leftPoints.map((item) => (
                                <motion.li
                                    key={item.id}
                                    variants={itemVariants}
                                    className="flex items-start gap-5 group"
                                >
                                    <div className="
                    flex-shrink-0 w-10 h-10 rounded-xl backdrop-blur-md
                    bg-white/10 border border-white/20 text-[#FF6B00]
                    font-bold text-xl flex items-center justify-center
                    shadow-md group-hover:scale-110 transition-transform
                  ">
                                        {item.id}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-lg md:text-xl text-white/95">
                                            {item.title}
                                        </p>
                                        <p className="text-base md:text-lg text-white/80 mt-1 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

            {/*        /!* ستون راست: کنترل انطباق + سامانه هشدار *!/*/}
            {/*        <motion.div*/}
            {/*            variants={containerVariants}*/}
            {/*            className="*/}
            {/*  backdrop-blur-2xl bg-white/5 border border-white/10*/}
            {/*  rounded-2xl lg:rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/50*/}
            {/*  hover:shadow-[#FF6B00]/20 hover:border-[#FF6B00]/20 transition-all duration-500*/}
            {/*"*/}
            {/*        >*/}
            {/*            <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">*/}
            {/*                کنترل انطباق چندسطحی + سامانه هشداردهنده SLA*/}
            {/*            </h3>*/}

            {/*            <ul className="space-y-6">*/}
            {/*                {rightPoints.map((point, i) => (*/}
            {/*                    <motion.li*/}
            {/*                        key={i}*/}
            {/*                        variants={itemVariants}*/}
            {/*                        custom={i}*/}
            {/*                        className="flex items-start gap-5 group"*/}
            {/*                    >*/}
            {/*                        <div className="*/}
            {/*        flex-shrink-0 w-10 h-10 rounded-xl backdrop-blur-md*/}
            {/*        bg-white/10 border border-white/20 text-[#FF6B00]*/}
            {/*        font-bold text-xl flex items-center justify-center*/}
            {/*        shadow-md group-hover:scale-110 transition-transform*/}
            {/*      ">*/}
            {/*                            {i + 1}*/}
            {/*                        </div>*/}
            {/*                        <p className="text-base md:text-lg text-white/90 leading-relaxed text-right">*/}
            {/*                            {point}*/}
            {/*                        </p>*/}
            {/*                    </motion.li>*/}
            {/*                ))}*/}
            {/*            </ul>*/}
            {/*        </motion.div>*/}
                </motion.div>

                {/*/!* فلش اتصال‌دهنده افقی (برای حس جریان بین دو ستون) *!/*/}
                {/*<div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">*/}
                {/*    <svg width="180" height="100" viewBox="0 0 180 100" fill="none">*/}
                {/*        <path*/}
                {/*            d="M0 50 H180 M160 30 L180 50 M160 70 L180 50"*/}
                {/*            stroke="#FF6B00"*/}
                {/*            strokeWidth="5"*/}
                {/*            strokeLinecap="round"*/}
                {/*            opacity="0.4"*/}
                {/*        />*/}
                {/*    </svg>*/}
                {/*</div>*/}

                {/* جمع‌بندی پایین */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 md:mt-20 text-center text-white/80 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
                >
                    ادغام با حداقل اختلال در فرآیندهای جاری + کاهش ریسک‌های عملیاتی و مالی تیپاکس
                </motion.p>

                {/*<p className="mt-10 text-center text-white/40 text-base md:text-lg tracking-wide">*/}
                {/*    nona – راهکار جامع SLA داینامیک*/}
                {/*</p>*/}
            </div>
        </section>
    )
}