// components/QuestionsAndThankYou.tsx
'use client'

import { motion } from 'framer-motion'
import { easeOut } from 'framer-motion'

const questions = [
    'SLA آیا مال چگونگی و بر چه مبنایی تعریف می‌شود؟',
    'چه عواملی بیشترین اثر را بر تحقق SLA دارند؟',
    'SLA داینامیک در شرایط بحرانی چه ارزشی ایجاد می‌کند؟',
    'مالک تصمیم SLA در سازمان کیست؟',
    'وضعیت بلوغ فعلی سازمان در SLA داینامیک چگونه است؟',
    'پیامد قراردادن و حقوقی SLA داینامیک چیست؟',
]

const questionVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.15,
            ease: easeOut,
        },
    }),
}

export default function QuestionsAndThankYou() {
    return (
        <>
            {/* بخش سوالات پروره */}
            <section className="py-20 px-6 md:px-12 bg-[#001F3F] text-white">
                <div className="max-w-5xl mx-auto">
                    {/* عنوان */}
                    <div className="flex items-center gap-6 mb-12">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.9 }}
                            className="w-16 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                        />
                        <h2 className="text-3xl md:text-5xl font-bold text-[#FF6B00]">
                            سوالات پروره
                        </h2>
                    </div>

                    {/* لیست سوالات */}
                    <div className="space-y-8">
                        {questions.map((q, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={questionVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex items-start gap-6 bg-white/5 backdrop-blur-sm border border-[#FF6B00]/30 rounded-xl p-6 md:p-8 hover:border-[#FF6B00]/60 transition-all duration-300"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF6B00] text-black font-bold text-xl flex items-center justify-center shadow-md">
                                    {String(index + 1).padStart(2, '')}
                                </div>
                                <p className="text-xl md:text-2xl leading-relaxed pt-2">
                                    {q}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center opacity-80 text-base">
                        آماده پاسخگویی به تمام سوالات شما هستیم!
                    </div>
                </div>
            </section>

            {/* صفحه تشکر / پایان */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001F3F] to-[#001F3F] text-white px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: easeOut }}
                    className="text-center"
                >
                    <div className="mb-12">
                        <div className="text-8xl md:text-10xl font-black tracking-wider drop-shadow-2xl">
                            <span className="text-white">n</span>
                            <span className="text-[#FF6B00]">o</span>
                            <span className="text-white">na</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
                        ممنون از نگاهتون!
                    </h2>

                    <div className="text-6xl md:text-9xl mb-10">
                        😊✨
                    </div>

                    <p className="text-xl md:text-3xl opacity-90 max-w-3xl mx-auto">
                        منتظر همکاری و بحث‌های بیشتر در مورد SLA داینامیک در شبکه تیپاکس هستیم.
                        <br />
                        با تشکر از توجه شما
                    </p>

                    <div className="mt-16 text-lg opacity-70">
                        ارائه شده توسط nona – ۱۴۰۴
                    </div>
                </motion.div>
            </section>
        </>
    )
}