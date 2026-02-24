// components/AnalysisMethod.tsx
'use client'

import { motion } from 'framer-motion'

export default function AnalysisMethod() {
    return (
        <section className="py-70 px-6 md:px-12  text-white overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* عنوان با فلش */}
                <div className="flex items-center gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                    />
                    <h2 className="text-4xl md:text-6xl font-black text-[#FF6B00] drop-shadow-lg">
                        چارچوب روش تحلیل
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16 items-center">
                    {/* ستون متن - کوچک‌تر (1/5 عرض در دسکتاپ) */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="lg:col-span-2 space-y-8 text-lg md:text-xl leading-relaxed"
                    >
                        <p className="font-medium">
                            مبنای این تحلیل، نمای کلی SLA قابل تحقق تحت تاثیر محیط پویا و داده‌محور شبکه لجستیک تیپاکس است.
                        </p>

                        <ul className="space-y-10">
                            <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  ۱
                </span>
                                تمرکز بر مسیرها با بیشترین تعداد مرسوله است
                            </li>
                            <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  ۲
                </span>
                                استفاده از مُد زمان تحویل به‌عنوان نماینده الگوی غالب عملکرد شبکه
                            </li>
                            <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-lg">
                  ۳
                </span>
                                بازه تحلیل: هفته‌های ۱ تا ۳۲ سال ۱۴۰4
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
                        initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.3, ease: 'easeOut' }}
                        className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FF6B00]/50"
                    >
                        {/* تصویر اصلی (ترکیب کامیون + برج آزادی) */}
                        <img
                            src="/TpaxSla.png"
                            alt="Dynamic SLA Tipax - کامیون تیپاکس در مقابل برج آزادی"
                            className="w-full h-[400px] object-cover brightness-90 contrast-110"
                        />

                        {/* overlay گرادیان نارنجی + لوگو مرکزی */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/70 via-[#FF6B00]/20 to-transparent flex items-center justify-center">
                            <div className="text-center px-8">
                                <h3 className="text-5xl md:text-7xl font-black text-white tracking-wider drop-shadow-2xl">
                                    DYNAMIC SLA
                                </h3>
                                <p className="text-2xl md:text-4xl text-white/90 mt-4 font-medium">
                                      پویا و واقعی
                                </p>
                            </div>
                        </div>

                        {/* لوگوی nona پایین سمت چپ */}
                        <div className="absolute bottom-6 left-6 text-white/90 text-xl font-bold drop-shadow-md">
                            nona
                        </div>

                        {/* آیکون کوچک تیپاکس پایین سمت راست (اختیاری) */}
                        <div className="absolute bottom-6 right-6 opacity-80">
                            <div className="text-[#FF6B00] text-3xl font-black">TIPAX</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}