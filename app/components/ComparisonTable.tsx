// components/ComparisonTable.tsx
'use client'

import { motion } from 'framer-motion'

const tableData = [
    { rank: 1, origin: 'تهران', dest: 'اصفهان', plan: 1, actual: 38.6, count: 325871, avgTime: 2, improved: 83.2 },
    { rank: 2, origin: 'تهران', dest: 'رشت', plan: 1, actual: 39.5, count: 206913, avgTime: 2, improved: 89.3 },
    { rank: 3, origin: 'اصفهان', dest: 'تهران', plan: 1, actual: 35.5, count: 138468, avgTime: 2, improved: 79.2 },
    { rank: 4, origin: 'بندرعباس', dest: 'تهران', plan: 2, actual: 26.7, count: 155573, avgTime: 3, improved: 62.7 },
    { rank: 5, origin: 'تهران', dest: 'کرمانشاه', plan: 1, actual: 30.6, count: 117741, avgTime: 2, improved: 78.2 },
    { rank: 6, origin: 'رشت', dest: 'تهران', plan: 1, actual: 39.2, count: 97732, avgTime: 2, improved: 81.9 },
    { rank: 7, origin: 'تهران', dest: 'گنجان', plan: 1, actual: 37.5, count: 87485, avgTime: 2, improved: 88.6 },
    { rank: 8, origin: 'زاهدان', dest: 'تهران', plan: 2, actual: 17.5, count: 78344, avgTime: 3, improved: 57.5 },
    { rank: 9, origin: 'قم', dest: 'تهران', plan: 1, actual: 33.0, count: 63788, avgTime: 2, improved: 79.7 },
    { rank: 10, origin: 'تهران', dest: 'سنندج', plan: 1, actual: 38.6, count: 63714, avgTime: 2, improved: 86.5 },
    // ... می‌توانید ۱۰ ردیف دیگر را اضافه کنید یا فقط ۱۰ تای برتر را نگه دارید
]

const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.08,
        },
    }),
}

export default function ComparisonTable() {
    return (
        <section className="py-20 px-6 md:px-12 bg-[#001F3F] text-white">
            <div className="max-w-[1400px] mx-auto">
                {/* عنوان */}
                <div className="flex items-center gap-6 mb-12">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.9 }}
                        className="w-20 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                    />
                    <h2 className="text-3xl md:text-5xl font-bold text-[#FF6B00]">
                        مقایسه SLA برنامه‌ریزی شده و عملکرد واقعی در ۲۰ مسیر پرتکرار شبکه
                    </h2>
                </div>

                <p className="text-lg md:text-xl opacity-90 mb-10">
                    تمرکز بر مسیرهای با بیشترین حجم مرسوله — مبنا: مد زمان تحویل — بازه: هفته‌های ۱ تا ۳۲ سال ۱۴۰۳
                </p>

                {/* جدول */}
                <div className="overflow-x-auto rounded-xl border border-[#FF6B00]/30 shadow-2xl">
                    <table className="w-full text-right min-w-[1200px]">
                        <thead>
                        <tr className="bg-[#FF6B00] text-black">
                            <th className="p-4 font-bold border-l border-black/20">ردیف</th>
                            <th className="p-4 font-bold border-l border-black/20">شهر فرستنده</th>
                            <th className="p-4 font-bold border-l border-black/20">شهر گیرنده</th>
                            <th className="p-4 font-bold border-l border-black/20">Plan SLA</th>
                            <th className="p-4 font-bold border-l border-black/20">% پایبندی فعلی</th>
                            <th className="p-4 font-bold border-l border-black/20">تعداد مرسوله</th>
                            <th className="p-4 font-bold border-l border-black/20">میانگین زمان</th>
                            <th className="p-4 font-bold bg-[#FF8C00] text-white">درصد بهبود یافته</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((row, index) => (
                            <motion.tr
                                key={index}
                                custom={index}
                                variants={rowVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className={`border-b border-[#FF6B00]/20 ${
                                    index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'
                                } hover:bg-[#FF6B00]/20 transition-colors`}
                            >
                                <td className="p-4 border-l border-[#FF6B00]/20">{row.rank}</td>
                                <td className="p-4 border-l border-[#FF6B00]/20">{row.origin}</td>
                                <td className="p-4 border-l border-[#FF6B00]/20">{row.dest}</td>
                                <td className="p-4 border-l border-[#FF6B00]/20">{row.plan}</td>
                                <td className="p-4 border-l border-[#FF6B00]/20">{row.actual.toFixed(1)}%</td>
                                <td className="p-4 border-l border-[#FF6B00]/20">{row.count.toLocaleString()}</td>
                                <td className="p-4 border-l border-[#FF6B00]/20">{row.avgTime}</td>
                                <td className="p-4 font-bold text-[#FF6B00]">{row.improved.toFixed(1)}%</td>
                            </motion.tr>
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