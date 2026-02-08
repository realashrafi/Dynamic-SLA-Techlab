// components/ExecSummary.tsx
'use client'

import { motion } from 'framer-motion'

const rows = [
    { title: 'وضعیت فعلی', desc: 'وجود شکاف بین SLA اعلام شده و عملکرد واقعی شبکه در بخشی از مسیرها' },
    { title: 'مسئله اصلی', desc: 'کاهش تضعیف تجربه مشتری + کاهش اتکاپذیری SLA + افزایش ریسک زیان مالی و آسیب برند' },
    { title: 'علت ریشه‌ای (Root Cause)', desc: 'اتکای فعلی به SLA ایستا و عدم انطباق مستمر تعهد زمانی با واقعیت اجرایی شبکه' },
    { title: 'راهکار (Solution)', desc: 'طراحی مدل SLA دینامیک مبتنی بر تحلیل پیشرفته داده های عملیاتی تیپاکس' },
]

export default function ExecSummary() {
    return (
        <section className="py-20 px-6 md:px-12 bg-[#001F3F] text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-6 mb-12">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-16 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                    />
                    <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B00]">
                        Executive Summary
                    </h2>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#FF6B00]/30">
                    <table className="w-full text-right">
                        <thead>
                        <tr className="bg-[#FF6B00]/80 text-black">
                            <th className="p-5 font-bold border-l border-black/20">عنوان</th>
                            <th className="p-5 font-bold">توضیح</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, i) => (
                            <tr key={i} className={`${i % 2 ? 'bg-white/5' : 'bg-white/10'} border-b border-[#FF6B00]/20 hover:bg-white/15 transition-colors`}>
                                <td className="p-5 border-l border-[#FF6B00]/20 font-semibold">{row.title}</td>
                                <td className="p-5 leading-relaxed">{row.desc}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/*<div className="mt-10 text-center opacity-70 text-sm">*/}
                {/*    nona*/}
                {/*</div>*/}
            </div>
        </section>
    )
}