// components/DynamicSlaIcon.tsx
export default function DynamicSlaIcon({ className = "" }: { className?: string }) {
    return (
        <div className={`w-8 h-8 relative ${className}`}>
            {/* دایره پس‌زمینه شیشه‌ای */}
            <div className="absolute inset-0 rounded-full bg-[#0A1F44]/40 backdrop-blur-sm border border-[#FF6B00]/20 shadow-inner" />

            {/* موج‌های متحرک */}
            <svg
                viewBox="0 0 40 40"
                className="absolute inset-0 w-full h-full"
                fill="none"
            >
                {/* موج اصلی - نارنجی قوی */}
                <path
                    d="M0 20 Q10 5 20 20 T40 20"
                    stroke="#FF6B00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="animate-[wave_7s_infinite_ease-in-out]"
                />

                {/* موج دوم - کمی روشن‌تر و سریع‌تر */}
                <path
                    d="M0 22 Q12 8 20 22 T40 22"
                    stroke="#FF8A3D"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    className="animate-[wave_5.5s_infinite_ease-in-out] opacity-80"
                />

                {/* موج سوم - خیلی ظریف و آهسته */}
                <path
                    d="M0 18 Q8 28 20 18 T40 18"
                    stroke="#FFB74D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-[wave_9s_infinite_ease-in-out] opacity-60"
                />
            </svg>

            {/* پالس خارجی ملایم */}
            <div className="absolute inset-0 rounded-full border-2 border-[#FF6B00]/30 animate-[pulse_6s_infinite_ease-in-out]" />
        </div>
    )
}