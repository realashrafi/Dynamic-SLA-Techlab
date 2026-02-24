
// components/FactorsSection.tsx
'use client'

import {easeOut, motion} from 'framer-motion'

const factors = [
    { text: 'پاندمی‌های خاص مانند کرونا', icon: '🦠' },
    { text: 'تاثیرات فصلی (seasonal effect) مانند سال نو یا ماه رمضان', icon: '🍂' },
    { text: 'رفتارهای همسو با اتفاقات اجتماعی نظیر خرید سال جدید تحصیلی', icon: '🎒' },
    { text: ' تعداد مرسوله های دریافتی در طول روز و کشش تیم عملیات', icon: '📦' },
    { text: 'نوسانات قیمت ارز در سال ۱۴۰۴ و پیامدهای آن نظیر نوسانات پس از جنگ ۱۲ روزه', icon: '💹' },
    { text: 'شرایط اقلیمی و آب و هوایی مناطق تحویل و جابجایی مرسوله‌ها', icon: '🌧️' },
]

const factorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.12 + 0.4,
            ease: easeOut,
        },
    }),
}

export default function FactorsSection() {
    return (
        <section className="py-60 px-6 md:px-12 text-white relative overflow-hidden">
            {/* گرادیان ملایم برای عمق */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-br from-[#FF6B00]/10 to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* عنوان */}
                <div className="flex items-center justify-center gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.9 }}
                        className="w-16 h-1.5 bg-[#FF6B00] rounded-full"
                    />
                    <h2 className="text-3xl md:text-4xl font-bold text-[#FF6B00] text-center">
                        فاکتورهایی که بیشترین اثر را بر تحقق SLA دارند
                    </h2>
                </div>

                {/* مرکز mind-map */}
                <div className="relative flex justify-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="bg-[#FF6B00] text-black font-bold text-2xl md:text-3xl px-10 py-6 rounded-full shadow-2xl border-4 border-white/30"
                    >
                        تحلیل داده‌محور SLA
                    </motion.div>
                </div>

                {/* شاخه‌ها */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {factors.map((factor, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={factorVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-md border border-[#FF6B00]/40 rounded-xl p-6 md:p-8 text-center hover:border-[#FF6B00]/70 hover:bg-white/15 transition-all duration-300 shadow-lg"
                        >
                            <div className="text-4xl md:text-5xl mb-4">{factor.icon}</div>
                            <p className="text-lg md:text-xl leading-relaxed">
                                {factor.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center opacity-80 text-base">
                    این عوامل خارجی بیشترین نوسان را در عملکرد SLA ایجاد می‌کنند و مدل داینامیک باید آن‌ها را پیش‌بینی کند.
                </div>

                {/*<div className="mt-8 text-center opacity-70 text-sm">*/}
                {/*    nona*/}
                {/*</div>*/}
            </div>
        </section>
    )
}