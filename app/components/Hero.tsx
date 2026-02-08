// components/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { easeOut } from 'framer-motion'

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-b from-[#FF6B00] via-[#0A2540] to-[#001F3F]">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_30%_70%,#FF6B0011_0%,transparent_50%)]" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: easeOut }}
                className="relative z-10 max-w-5xl"
            >
                {/* لوگو nona – اگر svg داری جایگزین کن */}
                <div className="text-8xl md:text-9xl font-black tracking-tight mb-8">
                    n<span className="text-[#FF6B00]">o</span>na
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
                    پیشنهاد راهکار SLA داینامیک
                    <br />
                    <span className="text-[#FF6B00] block mt-4">در شبکه لجستیک تیپاکس</span>
                </h1>

                <p className="text-2xl md:text-4xl font-medium mb-4 opacity-90">
                    «از چالش تا راه‌حل!»
                </p>

                <p className="text-xl md:text-2xl italic opacity-80">
                    "Start with pain end in pleasure"
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, ease: easeOut }}
                className="absolute bottom-16"
            >
                <svg className="w-12 h-12 text-[#FF6B00] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </motion.div>
        </section>
    )
}