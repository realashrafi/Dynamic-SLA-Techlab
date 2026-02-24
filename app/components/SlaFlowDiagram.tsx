// components/SlaFlowDiagram.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function SlaFlowDiagram() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* عنوان با خط گرادیان نارنجی */}
                <div className="flex items-center justify-center gap-5 md:gap-6 mb-10 md:mb-14">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full origin-left"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight text-center">
                        معماری SLA چندسطحی (Frame SLA & Specific SLA)
                    </h2>
                </div>

                {/* توضیحات کوتاه با انیمیشن ورود */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="max-w-4xl mx-auto text-center mb-12 md:mb-16 space-y-6"
                >
                    <p className="text-lg md:text-xl text-white/85 leading-relaxed font-medium">
                        <span className="text-[#FF6B00] font-semibold">Frame SLA:</span> توافق بلندمدت و چارچوب قراردادی شامل سیاست‌ها، حدود مجاز، و شرایط کلی سطح خدمت
                    </p>
                    <p className="text-lg md:text-xl text-white/85 leading-relaxed font-medium">
                        <span className="text-[#FF6B00] font-semibold">Specific SLA:</span> تعهد سطح خدمت برای هر حمل/سفارش به‌صورت موردی و عملیاتی، در چارچوب Frame SLA
                    </p>
                </motion.div>

                {/* کارت شیشه‌ای دور تصویر فلوچارت */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="
            relative bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60 
            overflow-hidden p-4 md:p-6 mx-auto max-w-5xl
            hover:shadow-[#FF6B00]/20 hover:border-[#FF6B00]/20 transition-all duration-500
          "
                >
                    <Image
                        src="/SLAFlowChart.png"
                        alt="معماری چندسطحی SLA - Frame SLA و Specific SLA"
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-xl object-contain"
                        priority
                    />

                    {/* افکت overlay ملایم برای عمق بیشتر */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
                </motion.div>

                {/* کپشن پایین */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-10 md:mt-14 text-center text-white/60 text-base md:text-lg"
                >
                    مدل دوسطحی SLA: چارچوب کلی + تعهدات عملیاتی پویا برای هر مرسوله
                </motion.p>

                {/*<p className="mt-6 text-center text-white/40 text-sm md:text-base tracking-wide">*/}
                {/*    nona – معماری SLA داینامیک تیپاکس*/}
                {/*</p>*/}
            </div>
        </section>
    )
}