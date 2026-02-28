// components/ImplementationPhases.tsx
'use client'

import { motion, easeOut } from 'framer-motion'
import Image from 'next/image'

const phases = [
    {
        title: 'Data Discovery (کشف داده‌ها)',
        points: [
            'جمع‌آوری تمام داده‌های مرتبط با مسیرها، SLAها، ظرفیت هاب‌ها و فاکتورهای واقعی شبکه (ترافیک، آب و هوا، اثرات فصلی و غیره)',
            'نوع بسته (P/NP/NC) در این روند تاثیرگذار است',
            'هدف: شناسایی منابع داده و درک الگوهای عملیاتی شبکه',
        ],
    },
    {
        title: 'LSTM & SLM (مدل پیش‌بینی زمان تحویل)',
        points: [
            'داده‌های جمع‌آوری‌شده به مدل LSTM داده می‌شوند تا الگوهای زمانی و روندهای تحویل شناسایی شود',
            'این مدل امکان پیش‌بینی دقیق‌تر زمان واقعی تحویل و رفتار شبکه را فراهم می‌کند',
            'خروجی مدل LSTM به مرحله مدل‌سازی SLA منتقل می‌شود',
            'SLAها با واقعیت شبکه تیون می‌شوند و قابلیت پیش‌بینی و تصمیم‌گیری عملیاتی ایجاد می‌شود',
        ],
    },
    {
        title: 'Platform (پلتفرم نهایی)',
        points: [
            'مبنای تغییر و تاثیر آن در پلتفرم نمایش داده می‌شود',
            'کاربران مختلف (عملیات، فروش، مدیریت و قراردادها) می‌توانند تصمیمات مبتنی بر داده اتخاذ کنند',
            'هشدارها، گزارش‌ها و توصیه‌های عملیاتی در دسترس قرار می‌گیرد',
        ],
    },
]

const phaseVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.94 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.9,
            delay: i * 0.25,
            ease: easeOut,
        },
    }),
}

const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

export default function ImplementationPhases() {
    return (
        <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 bg-[#0A1F44]/30 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* عنوان اصلی */}
                <div className="flex items-center justify-center gap-5 md:gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full origin-left"
                    />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight text-center">
                        روش اجرا (Implementation Phases)
                    </h2>
                </div>

                {/* تصویر اصلی بالای فازها (اختیاری - اگر بخوای می‌تونی جابجا کنی) */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1 }}
                    className="
            bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60 
            overflow-hidden p-4 md:p-6 mx-auto max-w-5xl mb-16 md:mb-20
          "
                >
                    <img
                        src="https://kb.studionona.ir/index.php/s/ED7zqREzwqDQnQK/download"
                        alt="فازهای پیاده‌سازی SLA داینامیک"
                        className="w-full h-auto rounded-xl object-contain"
                    />
                </motion.div>

                {/* سه کارت فاز */}
                <div className="space-y-16 md:space-y-20">
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={phaseVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="
                bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
                rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/50 
                hover:shadow-[#FF6B00]/20 hover:border-[#FF6B00]/20 transition-all duration-500
              "
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">
                                {phase.title}
                            </h3>

                            <ul className="space-y-6">
                                {phase.points.map((point, i) => (
                                    <motion.li
                                        key={i}
                                        variants={itemVariants}
                                        className="flex items-start gap-5 group"
                                    >
                                        <div className="
                      flex-shrink-0 w-10 h-10 rounded-xl backdrop-blur-md 
                      bg-white/10 border border-white/20 text-[#FF6B00] 
                      font-bold text-xl flex items-center justify-center 
                      shadow-md group-hover:scale-110 transition-transform
                    ">
                                            {i + 1}
                                        </div>
                                        <p className="text-lg md:text-xl leading-relaxed text-white/90 text-right pt-1">
                                            {point}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* جمع‌بندی پایین */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-16 md:mt-20 text-center text-white/80 text-xl leading-relaxed max-w-4xl mx-auto"
                >
                    پیاده‌سازی گام‌به‌گام از کشف داده تا پلتفرم عملیاتی — با حداقل اختلال و حداکثر ارزش
                </motion.p>
            </div>
        </section>
    )
}