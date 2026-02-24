// components/DynamicSlaDataModel.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function DynamicSlaDataModel() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* عنوان با خط گرادیان نارنجی */}
                <div className="flex items-center justify-center gap-5 md:gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full origin-left"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight text-center">
                        مبنای تاثیرگذاری و استفاده از داده می‌تواند از مسیر زیر باشد
                    </h2>
                </div>

                {/* کارت شیشه‌ای بزرگ دور تصویر مدل داده */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="
            relative bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60 
            overflow-hidden p-4 md:p-6 mx-auto max-w-5xl
            hover:shadow-[#FF6B00]/25 hover:border-[#FF6B00]/25 transition-all duration-500
          "
                >
                    <Image
                        src="/DynamicSlaDataModelImage.png"
                        alt="مدل داده‌ای SLA داینامیک - جریان تاثیرگذاری و استفاده از داده"
                        width={1400}
                        height={900}
                        className="w-full h-auto rounded-xl object-contain"
                        priority
                    />

                    {/* لایه گرادیان ملایم برای عمق بیشتر */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                    {/* کپشن کوچک داخل کارت (اختیاری - می‌تونی حذف کنی) */}
                    <div className="absolute bottom-6 left-6 right-6 text-center">
                        <p className="text-white/80 text-base md:text-lg font-medium bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full inline-block">
                            جریان داده → تحلیل → پیشنهاد SLA پویا → تصمیم‌گیری عملیاتی
                        </p>
                    </div>
                </motion.div>

                {/* توضیح کوتاه پایین (اگر بخوای اضافه کنی) */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.6 }}
                    className="mt-12 text-center text-white/75 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
                >
                    از جمع‌آوری داده‌های واقعی شبکه تا تولید SLA داینامیک و توصیه‌های عملیاتی
                </motion.p>

                {/*<p className="mt-8 text-center text-white/40 text-base md:text-lg tracking-wide">*/}
                {/*    nona – مدل داده‌محور SLA داینامیک تیپاکس*/}
                {/*</p>*/}
            </div>
        </section>
    )
}