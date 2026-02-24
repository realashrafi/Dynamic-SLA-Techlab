// components/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DynamicSlaIcon from "@/app/components/DynamicSlaIcon";

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1F44]/30 backdrop-blur-lg border-b border-white/10 shadow-sm">
            <div className="mx-auto px-20 md:px-10 py-4 flex items-center justify-between">
                {/* لوگو / عنوان */}
                <Link href="/" className="text-2xl flex items-center font-bold tracking-tight">
                    <DynamicSlaIcon className=" ml-4" />
                    Dynamic<span className="text-[#FF6B00]">SLA</span>
                </Link>
            </div>
        </header>
    )
}