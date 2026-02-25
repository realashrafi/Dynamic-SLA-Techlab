// components/FactorsSection.tsx
'use client'

import { motion, easeOut } from 'framer-motion'

const factors = [
    { text: 'پاندمی‌های خاص مانند کرونا', icon: '🦠' },
    { text: 'تاثیرات فصلی (seasonal effect) مانند سال نو یا ماه رمضان', icon: '🍂' },
    { text: 'رفتارهای همسو با اتفاقات اجتماعی نظیر خرید سال جدید تحصیلی', icon: '🎒' },
    { text: 'تعداد مرسوله های دریافتی در طول روز و کشش تیم عملیات', icon: '📦' },
    { text: 'نوسانات قیمت ارز در سال ۱۴۰۴ و پیامدهای آن نظیر نوسانات پس از جنگ ۱۲ روزه', icon: '💹' },
    { text: 'شرایط اقلیمی و آب و هوایی مناطق تحویل و جابجایی مرسوله‌ها', icon: '🌧️' },
]

const factorVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            delay: i * 0.15 + 0.4,
            ease: easeOut,
        },
    }),
}

export default function FactorsSection() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 bg-[#0A1F44]/30 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* عنوان با خط گرادیان */}
                <div className="flex items-center justify-center gap-5 md:gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full origin-center"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight text-center">
                        فاکتورهایی که بیشترین اثر را بر تحقق SLA دارند
                    </h2>
                </div>

                {/* مرکز mind-map شیشه‌ای */}
                <div className="flex justify-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.3 }}
                        className="
              backdrop-blur-2xl bg-white/8 border border-white/15
              rounded-full px-10 py-6 md:px-16 md:py-10 shadow-2xl shadow-black/50
              text-center text-xl md:text-3xl font-bold text-white
            "
                    >
                        تحلیل داده‌محور SLA
                    </motion.div>
                </div>

                {/* شاخه‌ها با افکت hover قوی‌تر */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                    {factors.map((factor, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={factorVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="
                group relative bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
                rounded-2xl md:rounded-3xl p-6 md:p-8 text-center
                shadow-xl shadow-black/40 overflow-hidden
                transition-all duration-500 hover:shadow-[#FF6B00]/30 hover:border-[#FF6B00]/30 hover:scale-[1.03]
              "
                        >
                            {/* افکت glow نارنجی ملایم موقع hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/0 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

                            <div className="text-5xl md:text-6xl mb-5 transform group-hover:scale-110 transition-transform duration-300">
                                {factor.icon}
                            </div>

                            <p className="text-lg md:text-xl leading-relaxed text-white/95">
                                {factor.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* توضیح پایین */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 1 }}
                    className="mt-16 text-center text-white/70 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
                >
                    این عوامل خارجی بیشترین نوسان را در عملکرد SLA ایجاد می‌کنند و مدل داینامیک باید آن‌ها را پیش‌بینی و در محاسبات لحاظ کند.
                </motion.p>

                {/*<p className="mt-10 text-center text-white/40 text-base md:text-lg tracking-wide">*/}
                {/*    nona – شناسایی عوامل کلیدی نوسان SLA*/}
                {/*</p>*/}
            </div>
        </section>
    )
}