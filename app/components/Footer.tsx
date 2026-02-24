// components/Footer.tsx

export default function Footer() {
    return (
        <footer className="bg-[#0A1F44]/30 backdrop-blur-lg border-t border-white/10 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6 text-center md:text-right">
                <div className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Techlab – Dynamic SLA Analyzer
                </div>
                <div className="mt-3 text-xs text-gray-500">
                    ساخته شده با Next.js • تحلیل و مانیتورینگ SLA پیشرفته
                </div>
                <div className="mt-4 flex justify-center md:justify-end gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition">
                        تلگرام
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                        لینکدین
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                        گیت‌هاب
                    </a>
                </div>
            </div>
        </footer>
    )
}