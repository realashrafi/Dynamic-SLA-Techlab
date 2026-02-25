// components/AnalysisMethod.tsx
'use client'

import { motion } from 'framer-motion'

export default function AnalysisMethod() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 bg-[#0A1F44]/30 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* هدر */}
                <div className="flex items-center gap-5 md:gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FFB74D] rounded-full origin-left"
                    />
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
                        چارچوب روش تحلیل
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
                    {/* متن سمت چپ - شیشه‌ای */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1 }}
                        className="lg:col-span-5 backdrop-blur-2xlbg-[#0A1F44]/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40"
                    >
                        <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/95 mb-10">
                            مبنای این تحلیل، نمای کلی SLA قابل تحقق تحت تاثیر محیط پویا و داده‌محور شبکه لجستیک تیپاکس است.
                        </p>

                        <ul className="space-y-8">
                            {[
                                'تمرکز بر مسیرها با بیشترین تعداد مرسوله',
                                'استفاده از مُد زمان تحویل به‌عنوان نماینده الگوی غالب عملکرد شبکه',
                                'بازه تحلیل: هفته‌های ۱ تا ۳۲ سال ۱۴۰۴',
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-5 group"
                                >
                                    <div className={`
                    flex-shrink-0 w-10 h-10 rounded-xl backdrop-blur-md 
                    bg-white/10 border border-white/20 text-[#FF6B00] 
                    font-bold text-xl flex items-center justify-center 
                    shadow-md group-hover:scale-110 transition-transform
                  `}>
                                        {i + 1}
                                    </div>
                                    <p className="text-lg md:text-xl leading-relaxed pt-1.5 text-white/90">
                                        {item}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>

                        <p className="mt-12 text-[#FF6B00] text-xl font-bold tracking-wide">
                            نتیجه: SLA داینامیک مبتنی بر واقعیت اجرایی + عوامل خارجی
                        </p>
                    </motion.div>

                    {/* بخش تصویر - سمت راست، شیشه‌ای + overlay مدرن */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: 0.3 }}
                        className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-sm"
                    >
                        <img
                            src="/TpaxSla.png"
                            alt="Dynamic SLA Tipax - تحلیل داده‌محور شبکه لجستیک"
                            className="w-full h-auto aspect-[4/3] md:aspect-[16/9] object-cover brightness-[0.85] contrast-[1.15] grayscale-[0.2]"
                        />

                        {/* overlay شیشه‌ای + متن مرکزی */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className=" backdrop-blur-[1px] rounded-2xl px-10 py-8 md:px-16 md:py-12 text-center max-w-lg mx-auto">
                                <h3 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-[#FF6B00] to-white bg-clip-text text-transparent tracking-wider drop-shadow-2xl">
                                    DYNAMIC SLA
                                </h3>
                                <p className="mt-4 text-lg md:text-3xl font-medium text-white/90">
                                    پویا • واقعی • داده‌محور
                                </p>
                            </div>
                        </div>

                        {/* برندینگ پایین */}
                        <div className="absolute bottom-6 left-6 text-white/80 text-xl font-bold drop-shadow-md">
                            nona
                        </div>
                        <div className="absolute bottom-6 right-6 text-[#FF6B00]/90 text-2xl font-black tracking-widest opacity-90">
                            TIPAX
                        </div>
                    </motion.div>

                    {/* خط اتصال ظریف بین دو بخش (اختیاری - حس جریان می‌ده) */}
                    <div className="hidden lg:block absolute top-1/2 left-[42%] w-[8%] h-0.5 bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent transform -translate-y-1/2" />
                </div>
            </div>
        </section>
    )
}