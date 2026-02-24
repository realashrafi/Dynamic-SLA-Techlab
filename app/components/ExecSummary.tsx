// components/ExecSummary.tsx
'use client'

import { motion } from 'framer-motion'

const rows = [
    {
        title: 'وضعیت فعلی',
        desc: ['وجود شکاف بین SLA اعلام شده و عملکرد واقعی شبکه در بخشی از مسیرها'],
    },
    {
        title: 'مسئله اصلی',
        desc: [
            'کاهش رضایتمندی مشتری به دلیل تاخیر در SLA تعهد شده',
            'کاهش سود از دست رفته در اثر از دست رفتن خدمات same day',
            'آسیب به برند تیپاکس',
        ],
    },
    {
        title: 'راهکار',
        desc: ['طراحی مدل SLA دینامیک مبتنی بر تحلیل پیشرفته داده های تیپاکس'],
    },
]

export default function ExecSummary() {
    return (
        <section className="py-20 md:py-28 lg:py-32 px-5 sm:px-8 lg:px-16  text-white overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* هدر با انیمیشن خط */}
                <div className="flex items-center gap-5 md:gap-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FFB74D] rounded-full origin-left"
                    />
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
                        Executive Summary
                    </h2>
                </div>

                {/* کارت شیشه‌ای اصلی دور جدول */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2 }}
                    className={`
            backdrop-blur-2xl bg-white/5 border border-white/10 
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/40 
            overflow-hidden
          `}
                >
                    <table className="w-full text-right border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r from-[#FF6B00]/20 to-[#FF8A3D]/10 text-white/90">
                            <th className="p-6 md:p-8 font-bold text-lg border-b border-white/10">عنوان</th>
                            <th className="p-6 md:p-8 font-bold text-lg border-b border-white/10">توضیح</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className={`
                    border-b border-white/5 last:border-b-0
                    hover:bg-white/8 transition-colors duration-300
                    ${i % 2 === 0 ? 'bg-white/3' : 'bg-transparent'}
                  `}
                            >
                                <td className="p-6 md:p-8 font-semibold text-[#FF6B00] text-base md:text-lg border-l border-white/10">
                                    {row.title}
                                </td>
                                <td className="p-6 md:p-8 leading-relaxed text-white/90 text-base md:text-lg">
                                    <ul className="list-none space-y-2.5 marker:text-[#FF6B00]/70">
                                        {row.desc.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF6B00]/70 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* فوتر کوچک اختیاری */}
                {/*<p className="mt-10 text-center text-white/40 text-sm tracking-wide">*/}
                {/*    nona – راهکار SLA داینامیک*/}
                {/*</p>*/}
            </div>
        </section>
    )
}