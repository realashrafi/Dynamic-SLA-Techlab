// components/QuestionsAndThankYou.tsx
'use client'

import { motion, easeOut } from 'framer-motion'

const questions = [
    'SLA چگونه و بر چه مبنایی تعریف می‌شود؟',
    'چه عواملی بیشترین اثر را بر تحقق SLA دارند؟',
    'SLA داینامیک در شرایط بحرانی چه ارزشی ایجاد می‌کند؟',
    'مالک تصمیم SLA در سازمان کیست؟',
    'آمادگی سازمان برای اجرای dynamic SLA چقدر است؟',
    'پیامد قراردادی و حقوقی SLA داینامیک چیست؟',
]

const questionVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.92 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            delay: i * 0.15,
            ease: easeOut,
        },
    }),
}

export default function QuestionsAndThankYou() {
    return (
        <>
            {/* بخش سوالات پروژه */}
            <section className="py-20 md:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 text-white overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    {/* عنوان */}
                    <div className="flex items-center justify-center gap-5 md:gap-6 mb-12 md:mb-16">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="w-20 h-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full origin-left"
                        />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white tracking-tight text-center">
                            سوالات پروژه
                        </h2>
                    </div>

                    {/* لیست سوالات - کارت‌های شیشه‌ای */}
                    <div className="space-y-6 md:space-y-8">
                        {questions.map((q, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={questionVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="
                  group relative bg-[#0A1F44]/30 backdrop-blur-lg border border-white/10
                  rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl shadow-black/50
                  hover:shadow-[#FF6B00]/25 hover:border-[#FF6B00]/30 hover:scale-[1.02]
                  transition-all duration-500 overflow-hidden
                "
                            >
                                {/* افکت glow نارنجی ملایم موقع hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/0 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

                                <div className="flex items-start gap-5 md:gap-6">
                                    <div className="
                    flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl backdrop-blur-md
                    bg-white/10 border border-white/20 text-[#FF6B00]
                    font-bold text-2xl flex items-center justify-center
                    shadow-md group-hover:scale-110 transition-transform
                  ">
                                        {String(index + 1).padStart(2, '')}
                                    </div>

                                    <p className="text-xl md:text-2xl leading-relaxed text-white/95 pt-2">
                                        {q}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/*<p className="mt-12 text-center text-white/70 text-lg md:text-xl">*/}
                    {/*    آماده پاسخ دقیق و داده‌محور به هر یک از این سوالات هستیم!*/}
                    {/*</p>*/}
                </div>
            </section>

            {/* بخش تشکر / پایان - فعال شده و مدرن */}
            {/*<section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white px-5 sm:px-8 py-20">*/}
            {/*    <motion.div*/}
            {/*        initial={{ opacity: 0, scale: 0.85, y: 40 }}*/}
            {/*        animate={{ opacity: 1, scale: 1, y: 0 }}*/}
            {/*        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}*/}
            {/*        className="text-center max-w-4xl mx-auto"*/}
            {/*    >*/}
            {/*        /!* لوگو nona بزرگ و زیبا *!/*/}
            {/*        <div className="mb-12 md:mb-16">*/}
            {/*            <div className="text-8xl md:text-10xl font-black tracking-widest drop-shadow-2xl">*/}
            {/*                <span className="text-white">n</span>*/}
            {/*                <span className="text-[#FF6B00]">o</span>*/}
            {/*                <span className="text-white">na</span>*/}
            {/*            </div>*/}
            {/*            <p className="mt-4 text-xl md:text-2xl text-white/70 font-medium">*/}
            {/*                راهکار SLA داینامیک*/}
            {/*            </p>*/}
            {/*        </div>*/}

            {/*        /!* پیام تشکر اصلی *!/*/}
            {/*        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-10 md:mb-14 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">*/}
            {/*            ممنون از توجه و وقتی که گذاشتید!*/}
            {/*        </h2>*/}

            {/*        /!* ایموجی بزرگ و شاد *!/*/}
            {/*        <div className="text-6xl md:text-9xl mb-10 md:mb-14 animate-pulse-slow">*/}
            {/*            😊✨🙏*/}
            {/*        </div>*/}

            {/*        /!* متن نهایی *!/*/}
            {/*        <p className="text-xl md:text-3xl opacity-90 max-w-3xl mx-auto leading-relaxed">*/}
            {/*            منتظر همکاری نزدیک‌تر و بحث‌های عمیق‌تر در مورد SLA داینامیک در شبکه تیپاکس هستیم.*/}
            {/*            <br className="hidden md:block" />*/}
            {/*            با کمال میل در خدمت شما هستیم.*/}
            {/*        </p>*/}

            {/*        /!* فوتر کوچک *!/*/}
            {/*        <div className="mt-16 md:mt-20 text-lg md:text-xl opacity-70">*/}
            {/*            ارائه شده توسط <span className="text-[#FF6B00] font-bold">nona</span> – ۱۴۰۴*/}
            {/*        </div>*/}
            {/*    </motion.div>*/}
            {/*</section>*/}
        </>
    )
}