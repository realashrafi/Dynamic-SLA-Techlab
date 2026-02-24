'use client'
import React from 'react';
import Image from "next/image";
import {easeOut, motion} from "framer-motion";

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.2, delayChildren: 0.3},
    },
}

const boxVariants = {
    hidden: {opacity: 0, y: -60},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8, ease: easeOut}},
}

const points1 = [
    {
        id: 1,
        description: 'ابتدا تمام داده‌های مرتبط با مسیرها، SLAها، ظرفیت هاب‌ها و فاکتورهای واقعی شبکه (ترافیک، آب و هوا، اثرات فصلی و غیره) جمع‌آوری و تحلیل می‌شوند. نوع بسته (P/NP/NC) در این روند تاثیرگذار است.\n',
    },
    {
        id: 2,
        description: ' هدف این مرحله شناسایی منابع داده و درک الگوهای عملیاتی است.\n',
    },
]
const points2 = [
    {
        id: 1,
        description: 'داده‌های جمع‌آوری‌شده به مدل LSTM (Long Short-Term Memory) داده می‌شوند تا الگوهای زمانی و روندهای تحویل بسته‌ها شناسایی شود.\n',
    },
    {
        id: 2,
        description: ' این مدل امکان پیش‌بینی دقیق‌تر زمان واقعی تحویل بسته‌ها و رفتار شبکه را فراهم می‌کند.\n',
    }, {
        id: 3,
        description: 'خروجی مدل LSTM به مرحله مدل‌سازی SLA منتقل می‌شود تا SLA داینامیک و عملیاتی استخراج شود.\n',
    }, {
        id: 4,
        description: 'در این مرحله SLAها با واقعیت شبکه تیون می‌شوند و قابلیت پیش‌بینی و تصمیم‌گیری عملیاتی فراهم می‌شود.\n',
    },
]
const points3 = [
    {
        id: 1,
        description: 'مبنای تغییر و تاثیر آن در پلتفرم نمایش داده می‌شوند.\n',
    },
    {
        id: 2,
        description: 'کاربران مختلف (عملیات، فروش، مدیریت و قراردادها) می‌توانند تصمیمات مبتنی بر داده‌ها اتخاذ کنند و هشدارها و گزارش‌ها را مشاهده کنند.\n',
    },
]

function ImplementationPhases() {
    return (
        <div className={' py-60 px-6 '}>
            <div className={' flex items-center justify-center flex-col max-w-5xl mx-auto '}>
                <div className="flex items-center gap-6 mb-12">
                    <motion.div
                        initial={{scaleX: 0}}
                        whileInView={{scaleX: 1}}
                        transition={{duration: 0.9}}
                        className="w-16 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                    />
                    <h2 className="text-3xl md:text-5xl font-bold text-[#FF6B00]">
                        روش اجرا
                    </h2>
                </div>

                {/* توضیح کوتاه */}
                <Image src={'/ImplementationPhasesImage.png'} width={700} height={100} className={'rounded-2xl'}
                       alt={'SlaFlowDiagram'}/>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="grid grid-cols-1 mt-20 px-10 lg:grid-cols-1 gap-12 md:gap-20 items-start max-w-7xl"
                >
                    {/* ستون چپ: تحلیل داده‌ای */}
                    <motion.div variants={boxVariants}
                                className="bg-white/10 backdrop-blur-lg border border-[#FF6B00]/40 rounded-2xl p-8 md:p-10 shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">
                            Data Discovery (کشف داده‌ها)
                        </h3>

                        <ul className="space-y-6 text-lg md:text-xl leading-relaxed">
                            {points1.map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                  <span
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-xl">
                    {i + 1}
                  </span>
                                    <div className={'flex items-start justify-center flex-col text-right'}>
                                        <span className={'text-[15px] mt-3'}>{item.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="grid grid-cols-1 mt-20 px-10 lg:grid-cols-1 gap-12 md:gap-20 items-start max-w-7xl"
                >
                    {/* ستون چپ: تحلیل داده‌ای */}
                    <motion.div variants={boxVariants}
                                className="bg-white/10 backdrop-blur-lg border border-[#FF6B00]/40 rounded-2xl p-8 md:p-10 shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">
                            LSTM & SLM (مدل پیش‌بینی زمان تحویل)
                        </h3>

                        <ul className="space-y-6 text-lg md:text-xl leading-relaxed">
                            {points2.map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                  <span
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-xl">
                    {i + 1}
                  </span>
                                    <div className={'flex items-start justify-center flex-col text-right'}>
                                        <span className={'text-[15px] mt-3'}>{item.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="grid grid-cols-1 mt-20 px-10 lg:grid-cols-1 gap-12 md:gap-20 items-start max-w-7xl"
                >
                    {/* ستون چپ: تحلیل داده‌ای */}
                    <motion.div variants={boxVariants}
                                className="bg-white/10 backdrop-blur-lg border border-[#FF6B00]/40 rounded-2xl p-8 md:p-10 shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-8 text-center">
                            Platform
                        </h3>

                        <ul className="space-y-6 text-lg md:text-xl leading-relaxed">
                            {points3.map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                  <span
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF6B00]/80 text-black font-bold flex items-center justify-center text-xl">
                    {i + 1}
                  </span>
                                    <div className={'flex items-start justify-center flex-col text-right'}>
                                        <span className={'text-[15px] mt-3'}>{item.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default ImplementationPhases;