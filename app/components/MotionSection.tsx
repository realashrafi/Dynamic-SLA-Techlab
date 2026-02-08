// components/MotionSection.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionSectionProps {
    children: ReactNode
    className?: string
    delay?: number
    id?: string
}

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut" as const,          // ← فیکس اصلی
            delay: custom * 0.15,
        },
    }),
}

export default function MotionSection({
                                          children,
                                          className = '',
                                          delay = 0,
                                          id,
                                      }: MotionSectionProps) {
    return (
        <motion.section
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            custom={delay}
            className={`min-h-screen py-16 md:py-24 px-5 sm:px-8 lg:px-12 ${className}`}
        >
            {children}
        </motion.section>
    )
}