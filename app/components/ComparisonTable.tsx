// components/ComparisonTable.tsx
'use client'

import { motion } from 'framer-motion'

const tableData = [
    { rank: 1, origin: 'تهران', dest: 'اصفهان', plan: 1, actual: 38.6, count: 325871, avgTime: 2, improved: 83.2 },
    { rank: 2, origin: 'تهران', dest: 'رشت', plan: 1, actual: 39.5, count: 206913, avgTime: 2, improved: 89.3 },
    { rank: 3, origin: 'اصفهان', dest: 'تهران', plan: 1, actual: 35.5, count: 138468, avgTime: 2, improved: 79.2 },
    { rank: 4, origin: 'بندرعباس', dest: 'تهران', plan: 2, actual: 26.7, count: 135573, avgTime: 3, improved: 62.7 },
    { rank: 5, origin: 'تهران', dest: 'کرمانشاه', plan: 1, actual: 30.6, count: 117741, avgTime: 2, improved: 78.2 },
    { rank: 6, origin: 'رشت', dest: 'تهران', plan: 1, actual: 39.2, count: 97732, avgTime: 2, improved: 81.9 },
    { rank: 7, origin: 'تهران', dest: 'گرگان', plan: 1, actual: 37.5, count: 87485, avgTime: 2, improved: 88.6 },
    { rank: 8, origin: 'زاهدان', dest: 'تهران', plan: 2, actual: 17.5, count: 78344, avgTime: 3, improved: 57.5 },
    { rank: 9, origin: 'قم', dest: 'تهران', plan: 1, actual: 33.0, count: 63788, avgTime: 2, improved: 79.7 },
    { rank: 10, origin: 'تهران', dest: 'سنندج', plan: 1, actual: 38.6, count: 63714, avgTime: 2, improved: 86.5 },
    { rank: 11, origin: 'تهران', dest: 'زاهدان', plan: 2, actual: 34.0, count: 54409, avgTime: 3, improved: 67.2 },
    { rank: 12, origin: 'ساری', dest: 'تهران', plan: 1, actual: 32.6, count: 50255, avgTime: 2, improved: 77.8 },
    { rank: 13, origin: 'تهران', dest: 'ایلام', plan: 1, actual: 27.1, count: 49387, avgTime: 2, improved: 71.6 },
    { rank: 14, origin: 'گرگان', dest: 'تهران', plan: 1, actual: 21.8, count: 45293, avgTime: 2, improved: 77.7 },
    { rank: 15, origin: 'تهران', dest: 'شاهین شهر', plan: 1, actual: 37.7, count: 39451, avgTime: 2, improved: 84.9 },
    { rank: 16, origin: 'تهران', dest: 'بندرانزلی', plan: 1, actual: 35.7, count: 38174, avgTime: 2, improved: 86.5 },
    { rank: 17, origin: 'یزد', dest: 'تهران', plan: 1, actual: 25.8, count: 37576, avgTime: 2, improved: 77.0 },
    { rank: 18, origin: 'سنندج', dest: 'تهران', plan: 1, actual: 19.1, count: 37251, avgTime: 2, improved: 71.8 },
    { rank: 19, origin: 'تهران', dest: 'لاهیجان', plan: 1, actual: 35.8, count: 37049, avgTime: 2, improved: 85.7 },
    { rank: 20, origin: 'تهران', dest: 'شهرکرد', plan: 1, actual: 24.0, count: 35606, avgTime: 2, improved: 69.4 }
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
        <section className="py-20 md:py-28 lg:py-32 px-5 sm:px-8 lg:px-16 bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* هدر */}
                <div className="flex items-center gap-5 md:gap-6 mb-10 md:mb-14">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FFB74D] rounded-full origin-left"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight">
                        مشخصات SLA بین ۲۰ مبدا و مقصد کاندیدای SLA Dynamic
                    </h2>
                </div>

                <p className="text-lg md:text-xl text-white/80 mb-10 md:mb-12 max-w-3xl">
                    تمرکز بر مسیرهای با بیشترین حجم مرسوله — مبنا: مد زمان تحویل — بازه: هفته‌های ۱ تا ۳۲ سال ۱۴۰۴
                </p>

                {/* کارت شیشه‌ای اصلی جدول */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className={`
            backdrop-blur-2xl bg-white/4 border border-white/10 
            rounded-2xl md:rounded-3xl shadow-2xl shadow-black/50 
            overflow-hidden
          `}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse min-w-[900px] lg:min-w-full">
                            <thead>
                            <tr className="bg-gradient-to-r from-[#FF6B00]/20 via-[#FF8A3D]/10 to-transparent text-white/95">
                                <th className="p-5 md:p-6 font-bold text-base md:text-lg border-b border-white/10">شهر فرستنده</th>
                                <th className="p-5 md:p-6 font-bold text-base md:text-lg border-b border-white/10">شهر گیرنده</th>
                                <th className="p-5 md:p-6 font-bold text-base md:text-lg border-b border-white/10">Plan SLA</th>
                                <th className="p-5 md:p-6 font-bold text-base md:text-lg border-b border-white/10">% پایبندی فعلی</th>
                                <th className="p-5 md:p-6 font-bold text-base md:text-lg border-b border-white/10">تعداد مرسوله</th>
                                <th className="p-5 md:p-6 font-bold text-base md:text-lg border-b border-white/10">میانگین زمان (روز)</th>
                                <th className="p-5 md:p-6 font-extrabold text-lg md:text-xl bg-[#FF6B00]/30 text-[#FFEBB3] border-b border-white/10">
                                    درصد بهبود یافته
                                </th>
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
                                    className={`
                      border-b border-white/5 last:border-b-0
                      hover:bg-white/8 transition-colors duration-300
                      ${index % 2 === 0 ? 'bg-white/3' : 'bg-transparent'}
                    `}
                                >
                                    <td className="p-5 md:p-6 border-l border-white/10">{row.origin}</td>
                                    <td className="p-5 md:p-6 border-l border-white/10">{row.dest}</td>
                                    <td className="p-5 md:p-6 border-l border-white/10 text-center">{row.plan}</td>
                                    <td className="p-5 md:p-6 border-l border-white/10 text-center text-red-300/90 font-medium">
                                        {row.actual.toFixed(1)}%
                                    </td>
                                    <td className="p-5 md:p-6 border-l border-white/10 text-center font-medium">
                                        {row.count.toLocaleString('fa-IR')}
                                    </td>
                                    <td className="p-5 md:p-6 border-l border-white/10 text-center">{row.avgTime}</td>
                                    <td className="p-5 md:p-6 font-bold text-center text-[#FFEBB3] text-lg md:text-xl">
                                        +{row.improved.toFixed(1)}%
                                    </td>
                                </motion.tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/*/!* کپشن پایین *!/*/}
                {/*<p className="mt-10 text-center text-white/50 text-base md:text-lg">*/}
                {/*    nona – اولویت‌بندی مسیرها برای بیشترین تاثیر SLA داینامیک*/}
                {/*</p>*/}
            </div>
        </section>
    )
}