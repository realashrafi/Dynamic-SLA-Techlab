// components/ProblemSection.tsx
'use client'

import { motion } from 'framer-motion'

const problems = [
    'تصمیم‌گیری ایستا در محیطی ذاتاً پویا',
    'فقدان SLA داده محور و تطبیقی',
    'ناترازی تعهد زمانی با واقعیت اجرایی شبکه',
    'کاهش اعتبار SLA به عنوان ابزار مدیریت عملکرد',
    'بی‌ثباتی تحقق تعهد حتی در مسیرهای ثابت',
]

export default function ProblemSection() {
    return (
        <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#001F3F] to-[#001F3F] text-white">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-1.5 bg-[#FF6B00] rounded-full" />
                    <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B00]">
                        What is the Problem
                    </h2>
                </div>

                <div className="space-y-10 relative pl-10 md:pl-16">
                    {/* خط‌چین عمودی */}
                    <div className="absolute -right-4 top-0 bottom-0 w-0.5 bg-[#FF6B00]/40 border-l-2 border-dashed border-[#FF6B00]/60" />

                    {problems.map((text, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="flex items-start gap-6"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF6B00] text-black font-black text-2xl flex items-center justify-center shadow-lg">
                                {String(i + 1).padStart(2, '')}
                            </div>
                            <p className="text-xl md:text-2xl leading-relaxed pt-2">{text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}