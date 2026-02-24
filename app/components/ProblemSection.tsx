// components/ProblemSection.tsx
'use client'

import { motion } from 'framer-motion'

const problems = [
    'تعریف SLA به‌صورت ایستا در محیطی با رفتار پویا و متغیر',
    'فاصله معنادار میان تعهد زمانی اعلام‌شده و عملکرد واقعی شبکه',
    'ناپایداری تحقق SLA حتی در مبدا–مقصد های ثابت در طول زمان',
    'تبدیل SLA از ابزار پایش عملکرد به عدد قراردادی',
    'افزایش زیان مالی و تضعیف اعتماد مشتری ناشی از بدقولی‌های موجود در زمان تحویل',
    'غالب بودن مشتریان B2B و وابستگی تصمیم آن‌ها به رضایت مشتری نهایی',
    'نقش زمان تحویل و عملکرد SLA به‌عنوان عامل غیرمستقیم در انتخاب تیپاکس توسط کسب‌وکارها'
]

export default function ProblemSection() {
    return (
        <section className="py-60 px-6 md:px-24 text-white">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-1.5 bg-[#FF6B00] rounded-full" />
                    <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B00]">
                        مسئله چیست؟
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