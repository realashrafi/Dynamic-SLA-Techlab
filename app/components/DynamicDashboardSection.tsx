//@ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Line,
    Legend,
    ReferenceLine,
} from 'recharts'
import { dataModel } from '@/app/components/dataModel'
import RouteMap from '@/app/components/RouteMap'

const cities = ['تهران', 'اصفهان', 'رشت', 'کرمانشاه', 'ارومیه', 'مهاباد', 'ابوموسی']

// ---------------- Jalali date helpers (NO Gregorian conversion) ----------------

// leap year check (jalaali-js style)
function div(a: number, b: number) { return Math.floor(a / b) }
function mod(a: number, b: number) { return a - Math.floor(a / b) * b }

function jalCal(jy: number) {
    const breaks = [
        -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
        1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178,
    ]

    const bl = breaks.length
    let leapJ = -14
    let jp = breaks[0]
    let jm = 0
    let jump = 0
    let n = 0

    if (jy < jp || jy >= breaks[bl - 1]) {
        throw new Error('Invalid Jalali year ' + jy)
    }

    for (let i = 1; i < bl; i += 1) {
        jm = breaks[i]
        jump = jm - jp
        if (jy < jm) break
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
        jp = jm
    }

    n = jy - jp
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)

    if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1

    let leap = mod(mod(n + 1, 33) - 1, 4)
    if (leap === -1) leap = 4

    return { leap }
}

function isJalaliLeapYear(jy: number) {
    return jalCal(jy).leap === 0
}

function jalaliMonthLength(jy: number, jm: number) {
    if (jm <= 6) return 31
    if (jm <= 11) return 30
    return isJalaliLeapYear(jy) ? 30 : 29
}

function pad2(n: number) {
    return String(n).padStart(2, '0')
}

// add days in Jalali calendar (safe, deterministic)
function addDaysJalali(jy: number, jm: number, jd: number, deltaDays: number) {
    let y = jy
    let m = jm
    let d = jd
    let remaining = deltaDays

    while (remaining > 0) {
        const ml = jalaliMonthLength(y, m)
        const leftInMonth = ml - d

        if (remaining <= leftInMonth) {
            d += remaining
            remaining = 0
        } else {
            remaining -= (leftInMonth + 1)
            d = 1
            m += 1

            if (m > 12) {
                m = 1
                y += 1
            }
        }
    }

    return { jy: y, jm: m, jd: d }
}

function formatJalali(j: { jy: number; jm: number; jd: number }) {
    return `${j.jy}/${pad2(j.jm)}/${pad2(j.jd)}`
}

// ------------------------------------------------------------------
// Week logic (Calendar Week: Saturday -> Friday)
// week 1 may have less than 7 days depending on weekday of Farvardin 1
// ------------------------------------------------------------------

// DayOfWeekIndex: Shanbeh=0 ... Jomeh=6
type DayOfWeekIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

function makeWeekLabelFromTimeKey(wk: string) {
    const m = String(wk).match(/\d+/)
    const weekNum = m ? parseInt(m[0], 10) : 1

    // ===============================
    // CONFIG (Based on your calendar)
    // ===============================

    // Start of year for label system
    const yearStart = { jy: 1404, jm: 1, jd: 1 }

    // Weekday of 1404/01/01 (طبق تقویم شما)
    // شنبه = 0 ... جمعه = 6
    const yearStartDayIndex: DayOfWeekIndex = 6

    // ===============================
    // CALCULATION
    // ===============================

    // how many days left until friday in week 1
    const daysToFriday = 6 - yearStartDayIndex

    // week 1 length (could be 1..7)
    const week1Length = daysToFriday + 1

    let start
    let end

    if (weekNum === 1) {
        start = yearStart
        end = addDaysJalali(yearStart.jy, yearStart.jm, yearStart.jd, daysToFriday)
    } else {
        // days passed from start of year to start of weekNum
        const daysPassed = week1Length + (weekNum - 2) * 7

        start = addDaysJalali(yearStart.jy, yearStart.jm, yearStart.jd, daysPassed)
        end = addDaysJalali(start.jy, start.jm, start.jd, 6)
    }

    return `Week ${weekNum} (${formatJalali(start)} - ${formatJalali(end)})`
}

export default function DynamicSlaDashboardSection() {
    const [origin, setOrigin] = useState<string | null>(null)
    const [destination, setDestination] = useState<string | null>(null)

    // ✅ به جای time1/time2 ثابت، کلید هفته انتخابی از آرایه weeks می‌آید (مثل time2/time3/time4)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const [activeTab, setActiveTab] = useState('overview')

    const selectedPath = dataModel.find(
        (path) => path.origin === origin && path.destination === destination
    )

    // ✅ weeks داخل مسیر فیلتر شده
    const availableWeeks = selectedPath?.weeks ?? []

    // ✅ اگر مسیر عوض شد، یک هفته پیش‌فرض انتخاب کن
    useEffect(() => {
        if (!selectedPath) {
            setSelectedTime(null)
            return
        }

        const weeks = selectedPath.weeks ?? []
        if (!weeks.length) {
            setSelectedTime(null)
            return
        }

        if (!selectedTime || !weeks.includes(selectedTime)) {
            setSelectedTime(weeks[0])
        }
    }, [selectedPath])

    // ✅ دیتای فعلی بر اساس هفته انتخابی (کلیدهای time2/time3/time4)
    const currentData = selectedPath && selectedTime ? selectedPath[selectedTime] : null

    const availableDestinations = origin
        ? dataModel.filter((path) => path.origin === origin).map((path) => path.destination)
        : cities

    const tabs = [
        { id: 'overview', label: 'نمای کلی' },
        { id: 'performance', label: 'عملکرد' },
        { id: 'risk', label: 'ریسک' },
    ]

    return (
        <section className="py-20 px-4 md:px-12 bg-[#0A1F44]/30">
            <div className="max-w-5xl mx-auto">
                {/* عنوان */}
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-bold text-[#FF6B00] text-center mb-10"
                >
                    پلتفرم پویای SLA (دمو)
                </motion.h2>

                {/* فرم ثابت */}
                <div className="sticky top-20 z-40 bg-[#0A1F44]/30 backdrop-blur-lg  border border-[#FF6B00]/40 rounded-xl p-5 md:p-6 mb-10 shadow-2xl">
                    <div className="flex flex-wrap gap-4 md:gap-6 items-end">
                        <div className="flex-1 min-w-[160px]">
                            <label className="block text-sm opacity-80 mb-1">مبدا</label>
                            <select
                                value={origin || ''}
                                onChange={(e) => {
                                    setOrigin(e.target.value)
                                    setDestination(null)
                                    setSelectedTime(null) // ✅ ریست بازه زمانی
                                }}
                                className="w-full bg-[#0A2540] border border-[#FF6B00]/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                            >
                                <option value="" disabled>انتخاب مبدا</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="self-end text-[#FF6B00] text-2xl mx-2 hidden md:block">→</div>

                        <div className="flex-1 min-w-[160px]">
                            <label className="block text-sm opacity-80 mb-1">مقصد</label>
                            <select
                                value={destination || ''}
                                onChange={(e) => {
                                    setDestination(e.target.value)
                                    setSelectedTime(null) // ✅ ریست بازه زمانی
                                }}
                                disabled={!origin}
                                className="w-full bg-[#0A2540] border border-[#FF6B00]/50 rounded-lg px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                            >
                                <option value="" disabled>انتخاب مقصد</option>
                                {availableDestinations.map((dest) => (
                                    <option key={dest} value={dest}>
                                        {dest}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* ✅ انتخاب بازه زمانی از weeks */}
                        <div className="flex-1 min-w-[280px]">
                            <label className="block text-sm opacity-80 mb-1">بازه زمانی</label>
                            <select
                                value={selectedTime || ''}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                disabled={!selectedPath || availableWeeks.length === 0}
                                className="w-full bg-[#0A2540] border border-[#FF6B00]/50 rounded-lg px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                            >
                                <option value="" disabled>
                                    {selectedPath ? 'انتخاب هفته' : 'ابتدا مبدا و مقصد را انتخاب کنید'}
                                </option>

                                {availableWeeks.map((wk) => (
                                    <option key={wk} value={wk}>
                                        {makeWeekLabelFromTimeKey(wk)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* تب‌ها */}
                    <div className="flex  overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-b-4 border-[#FF6B00] text-[#FF6B00]'
                                        : 'text-white/70 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>


                {/* محتوای تب */}
                <motion.div
                    key={`${activeTab}-${selectedTime}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#0A1F44]/30 backdrop-blur-lg border border-[#FF6B00]/30 rounded-2xl p-6 md:p-8 shadow-2xl min-h-[500px]"
                >
                    {activeTab === 'overview' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-7 lg:gap-10">
                            {/* کارت Current SLA */}
                            <div className="lg:col-span-6 flex items-stretch">
                                {currentData ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="w-full relative overflow-hidden rounded-3xl border border-[#FF6B00]/45 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-7 lg:p-9 shadow-[0_18px_60px_rgba(0,0,0,0.55)] group"
                                    >
                                        {/* Glow / Glass */}
                                        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#FF6B00]/16 blur-3xl" />
                                        <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />

                                        {/* Decorative grid */}
                                        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:28px_28px]" />

                                        <div className="relative z-10 h-full flex flex-col">
                                            {/* Header */}
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h4 className="text-xl md:text-2xl font-black text-[#FF6B00] tracking-tight">
                                                        Current SLA
                                                    </h4>
                                                    <p className="text-white/60 text-sm mt-1">
                                                        وضعیت تعهد سرویس • Overview
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1.5 rounded-full bg-[#0A2540]/70 border border-white/10 text-white/70 text-xs font-bold">
                                                        SLA
                                                    </span>
                                                    <span className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/25 text-[#FF6B00] text-xs font-bold">
                                                        {currentData.overview.currentSla} روز
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                                {/* Ring */}
                                                <div className="flex justify-center sm:justify-start">
                                                    <div className="relative">
                                                        <div
                                                            className="h-40 w-40 rounded-full"
                                                            style={{
                                                                background: `conic-gradient(#FF6B00 ${(currentData.overview.meetSla ?? 0) * 3.6}deg, rgba(255,255,255,0.10) 0deg)`,
                                                            }}
                                                        />
                                                        <div className="absolute inset-[10px] rounded-full bg-[#0A1F44] border border-white/10 flex flex-col items-center justify-center text-center shadow-inner">
                                                            <div className="text-3xl font-black text-white drop-shadow">
                                                                {currentData.overview.meetSla ?? 0}%
                                                            </div>
                                                            <div className="text-xs text-white/60 mt-1">
                                                                پایبندی
                                                            </div>
                                                        </div>

                                                        {/* small glow */}
                                                        <div className="pointer-events-none absolute -inset-6 rounded-full bg-[#FF6B00]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>

                                                {/* Big SLA */}
                                                <div className="text-center sm:text-right">
                                                    <div className="text-white/60 text-sm font-semibold mb-2">
                                                        Current SLA (روز)
                                                    </div>

                                                    <div className="leading-none">
                                                        <span className="text-6xl md:text-7xl font-black text-[#FF6B00] drop-shadow-[0_10px_30px_rgba(255,107,0,0.25)]">
                                                            {currentData.overview.currentSla}
                                                        </span>
                                                        <span className="text-white/60 text-base md:text-lg font-bold mr-2">
                                                            روز
                                                        </span>
                                                    </div>

                                                    <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-end">
                                                        <span className="px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-white/70 text-xs">
                                                            Progress: {currentData.overview.meetSla ?? 0}%
                                                        </span>
                                                        <span className="px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-white/70 text-xs">
                                                            Commitments
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Linear Progress (به عنوان زیرنویس/جزئیات) */}
                                            <div className="mt-auto pt-8">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-white/80 text-sm font-semibold">پایبندی به تعهد</span>
                                                    <span className="text-[#FF6B00] text-sm font-bold">
                                                        {currentData.overview.meetSla ?? 0}%
                                                    </span>
                                                </div>

                                                <div className="overflow-hidden h-10 rounded-full bg-white/10 border border-[#FF6B00]/25 shadow-inner">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${currentData.overview.meetSla ?? 0}%` }}
                                                        transition={{ duration: 1.5, ease: 'easeOut' }}
                                                        className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] rounded-full flex items-center justify-end pr-4"
                                                    >
                                                        <span className="text-white font-black text-base md:text-lg drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                                                            {currentData.overview.meetSla ?? 0}%
                                                        </span>
                                                    </motion.div>
                                                </div>

                                                <p className="text-center text-white/55 text-xs mt-3">
                                                    نمایش درصد انجام تعهد نسبت به SLA
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="w-full relative overflow-hidden rounded-3xl border border-[#FF6B00]/35 bg-[#0A2540]/80 p-10 text-center shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                        <div className="relative z-10">
                                            <div className="text-5xl mb-4 opacity-80">🧭</div>
                                            <div className="text-xl text-white/80 font-bold">مبدا و مقصد را انتخاب کنید</div>
                                            <p className="text-white/50 mt-2">برای مشاهده SLA و نمودار تحویل</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* چارت */}
                            <div className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/35 bg-gradient-to-br from-[#0A2540]  to-[#0A1F44] p-6 lg:p-2 shadow-[0_18px_60px_rgba(0,0,0,0.55)] h-full"
                                >
                                    {/* Glow / Glass */}
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#FF6B00]/10 blur-3xl" />
                                    <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

                                    <div className="relative z-10 h-full flex flex-col">
                                        {/* Header */}
                                        <div className="flex mx-6 mt-6 items-center justify-between gap-4 mb-6">
                                            <div>
                                                <h4 className="text-2xl md:text-3xl font-black text-[#FF6B00] tracking-tight">
                                                    Actual Delivery Times
                                                </h4>
                                                <p className="text-white/60 text-sm mt-1">
                                                    روند تحویل
                                                </p>
                                            </div>

                                            <div className="px-4 py-2 rounded-2xl bg-[#0A2540]/70 border border-white/10 text-white/70 text-xs font-bold">
                                                Overview Chart
                                            </div>
                                        </div>

                                        {/* Chart Body */}
                                        <div className="h-[380px] md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden">
                                            {currentData ? (
                                                <div className="w-full h-full p-3 md:p-4">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart
                                                            data={currentData.overview.chartData}
                                                            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                                                        >
                                                            <defs>
                                                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="0%" stopColor="#3B82F6" />
                                                                    <stop offset="100%" stopColor="#1E40AF" />
                                                                </linearGradient>
                                                            </defs>

                                                            <CartesianGrid strokeDasharray="4 4" stroke="#ffffff12" />
                                                            <XAxis dataKey="name" stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 14 }} />
                                                            <YAxis stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 14 }} />

                                                            <Tooltip
                                                                contentStyle={{
                                                                    backgroundColor: '#0A2540ee',
                                                                    border: '1px solid #FF6B00',
                                                                    borderRadius: '12px',
                                                                    color: 'white',
                                                                    padding: '10px 14px',
                                                                }}
                                                                labelStyle={{ color: '#FF6B00', fontWeight: 'bold' }}
                                                                itemStyle={{ color: 'white' }}
                                                            />

                                                            <Legend
                                                                wrapperStyle={{ color: 'white', fontSize: 13, paddingTop: 10 }}
                                                                iconType="circle"
                                                            />

                                                            <Bar
                                                                dataKey="as"
                                                                fill="url(#barGradient)"
                                                                radius={[10, 10, 0, 0]}
                                                                name="تعداد مرسولات"
                                                                barSize={40}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey="as"
                                                                stroke="#FF6B00"
                                                                strokeWidth={4}
                                                                dot={{ r: 6, stroke: '#FF6B00', strokeWidth: 2, fill: '#0A2540' }}
                                                                activeDot={{ r: 10 }}
                                                                name="روند تحویل"
                                                            />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-xl text-white/70">
                                                    <div className="text-5xl mb-4 opacity-80">📊</div>
                                                    ابتدا مبدا و مقصد را انتخاب کنید
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/35 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-2 shadow-[0_18px_60px_rgba(0,0,0,0.55)] h-full"
                                >
                                    {/* Glow / Glass */}
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#FF6B00]/10 blur-3xl" />
                                    <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

                                    <div className="relative z-10 h-full flex flex-col">
                                        {/* Header */}
                                        <div className="flex items-center justify-between gap-4 mb-6 mx-6 mt-6">
                                            <div>
                                                <h4 className="text-2xl md:text-3xl font-black text-[#FF6B00] tracking-tight">
                                                    Shipments Amount
                                                </h4>
                                                <p className="text-white/60 text-sm mt-1">
                                                    نمودار تعداد مرسولات
                                                </p>
                                            </div>

                                            <div className="px-4 py-2 rounded-2xl bg-[#0A2540]/70 border border-white/10 text-white/70 text-xs font-bold">
                                                Overview Chart
                                            </div>
                                        </div>

                                        {/* Chart Body */}
                                        <div className="h-[380px] md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden">
                                            {currentData ? (
                                                <div className="w-full h-full p-3 md:p-4">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart
                                                            data={currentData.overview.chartData}
                                                            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                                                        >
                                                            <defs>
                                                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="0%" stopColor="#3B82F6" />
                                                                    <stop offset="100%" stopColor="#1E40AF" />
                                                                </linearGradient>
                                                            </defs>

                                                            <CartesianGrid strokeDasharray="4 4" stroke="#ffffff12" />
                                                            <XAxis dataKey="name" stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 14 }} />
                                                            <YAxis stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 14 }} />

                                                            <Tooltip
                                                                contentStyle={{
                                                                    backgroundColor: '#0A2540ee',
                                                                    border: '1px solid #FF6B00',
                                                                    borderRadius: '12px',
                                                                    color: 'white',
                                                                    padding: '10px 14px',
                                                                }}
                                                                labelStyle={{ color: '#FF6B00', fontWeight: 'bold' }}
                                                                itemStyle={{ color: 'white' }}
                                                            />

                                                            <Legend
                                                                wrapperStyle={{ color: 'white', fontSize: 13, paddingTop: 10 }}
                                                                iconType="circle"
                                                            />

                                                            <Bar
                                                                dataKey="pa"
                                                                fill="url(#barGradient)"
                                                                radius={[10, 10, 0, 0]}
                                                                name="تعداد مرسولات"
                                                                barSize={40}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey="pa"
                                                                stroke="#FF6B00"
                                                                strokeWidth={4}
                                                                dot={{ r: 6, stroke: '#FF6B00', strokeWidth: 2, fill: '#0A2540' }}
                                                                activeDot={{ r: 10 }}
                                                                name="روند تحویل"
                                                            />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-xl text-white/70">
                                                    <div className="text-5xl mb-4 opacity-80">📊</div>
                                                    ابتدا مبدا و مقصد را انتخاب کنید
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    ) : activeTab === 'performance' ? (
                        <div className="space-y-10 lg:space-y-12">
                            {/* کارت‌های بالا */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-7">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/35 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-7 shadow-[0_18px_50px_rgba(0,0,0,0.55)] group hover:border-[#FF6B00]/55 transition-all"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#FF6B00]/12 blur-3xl" />
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-5">
                                            <div>
                                                <h5 className="text-base lg:text-lg font-extrabold text-white">بهبود SLA</h5>
                                                <p className="text-xs lg:text-sm text-white/60 mt-1">نسبت به SLA فعلی</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/25 text-[#FF6B00] text-xs font-bold">
                                                KPI
                                            </span>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div className="text-[#FF6B00] text-4xl lg:text-5xl font-black leading-none">
                                                ↑ {currentData?.performance?.improvementSla ?? 0}%
                                            </div>
                                            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/80 group-hover:bg-white/10 transition">
                                                ↗
                                            </div>
                                        </div>

                                        <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                                            <div className="h-full w-[62%] bg-[#FF6B00]" />
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/35 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-7 shadow-[0_18px_50px_rgba(0,0,0,0.55)] group hover:border-[#FF6B00]/55 transition-all"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-5">
                                            <div>
                                                <h5 className="text-base lg:text-lg font-extrabold text-white">SLA پیشنهادی</h5>
                                                <p className="text-xs lg:text-sm text-white/60 mt-1">مدل داینامیک</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-[#0A2540]/60 border border-white/10 text-white/70 text-xs font-bold">
                                                Suggested
                                            </span>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div className="text-[#FF6B00] text-4xl lg:text-5xl font-black leading-none">
                                                {currentData?.performance?.suggestSla ?? '—'}{' '}
                                                <span className="text-white/80 text-base lg:text-lg font-bold">روز</span>
                                            </div>
                                            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/80 group-hover:bg-white/10 transition">
                                                ⏱
                                            </div>
                                        </div>

                                        <div className="mt-5 flex items-center gap-2 text-xs text-white/55">
                                            <span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00]" />
                                            خروجی مدل
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/20 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-7 shadow-[0_18px_50px_rgba(0,0,0,0.55)] group hover:border-[#FF6B00]/45 transition-all"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-5">
                                            <div>
                                                <h5 className="text-base lg:text-lg font-extrabold text-white">پایبندی جدید</h5>
                                                <p className="text-xs lg:text-sm text-white/60 mt-1">با SLA داینامیک</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/25 text-green-300 text-xs font-bold">
                                                New
                                            </span>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div className="text-green-400 text-4xl lg:text-5xl font-black leading-none">
                                                ↑ {currentData?.performance?.newMeetSla ?? 0}%
                                            </div>
                                            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/80 group-hover:bg-white/10 transition">
                                                ✅
                                            </div>
                                        </div>

                                        <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                                            <div className="h-full w-[70%] bg-green-400" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* چارت و نقشه بغل هم */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10">
                                {/* نقشه مسیر */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/35 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-8 shadow-[0_18px_55px_rgba(0,0,0,0.55)]"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#FF6B00]/10 blur-3xl" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-black text-[#FF6B00]">نقشه مسیر انتخاب‌شده</h4>
                                                <p className="text-white/60 text-sm mt-1">Selected Route Map</p>
                                            </div>
                                            <div className="px-4 py-2 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 text-[#FF6B00] text-xs font-bold">
                                                Live
                                            </div>
                                        </div>

                                        <div className="h-[340px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden relative border border-white/10">
                                            {selectedPath?.originlat && selectedPath?.originlong && selectedPath?.destinationlat && selectedPath?.destinationlong ? (
                                                <RouteMap
                                                    origin={{ lat: selectedPath.originlat, lng: selectedPath.originlong }}
                                                    destination={{ lat: selectedPath.destinationlat, lng: selectedPath.destinationlong }}
                                                    height={420}
                                                />
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-lg opacity-70 bg-[#0A2540]/50">
                                                    ابتدا مبدا و مقصد را انتخاب کنید
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/14 to-transparent pointer-events-none" />

                                            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#0A2540]/70 border border-white/10 backdrop-blur-md px-4 py-3 flex items-center justify-between">
                                                <span className="text-white/80 text-xs">Route Confidence</span>
                                                <div className="flex-1 mx-3 h-2 rounded-full bg-white/10 overflow-hidden">
                                                    <div className="h-full w-[68%] bg-[#FF6B00]" />
                                                </div>
                                                <span className="text-white/80 text-xs">High</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* چارت مقایسه‌ای */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/35 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-8 shadow-[0_18px_55px_rgba(0,0,0,0.55)]"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-black text-[#FF6B00]">مقایسه عملکرد قبل و بعد</h4>
                                                <p className="text-white/60 text-sm mt-1">Before vs After</p>
                                            </div>
                                            <div className="px-4 py-2 rounded-xl bg-[#0A2540]/60 border border-white/10 text-white/70 text-xs font-bold">
                                                Performance
                                            </div>
                                        </div>

                                        <div className="h-[340px] md:h-[380px] lg:h-[420px]">
                                            {currentData?.performance?.chartData ? (
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart
                                                        data={currentData.performance.chartData}
                                                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                                                    >
                                                        <defs>
                                                            <linearGradient id="raGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor="#6B7280" />
                                                                <stop offset="100%" stopColor="#4B5563" />
                                                            </linearGradient>
                                                            <linearGradient id="tmGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor="#FF6B00" />
                                                                <stop offset="100%" stopColor="#FF8C00" />
                                                            </linearGradient>
                                                        </defs>

                                                        <CartesianGrid strokeDasharray="4 4" stroke="#ffffff12" />
                                                        <XAxis dataKey="name" stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 13 }} />
                                                        <YAxis stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 13 }} />

                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: '#0A2540ee',
                                                                border: '1px solid #FF6B00',
                                                                borderRadius: '10px',
                                                                color: 'white',
                                                                padding: '10px 14px',
                                                            }}
                                                            labelStyle={{ color: '#FF6B00', fontWeight: 'bold' }}
                                                            itemStyle={{ color: 'white' }}
                                                        />

                                                        <Legend wrapperStyle={{ color: 'white', fontSize: 12, paddingTop: 10 }} iconType="circle" />

                                                        <Bar dataKey="ra" fill="url(#raGradient)" radius={[10, 10, 0, 0]} name="قبل" barSize={34} />
                                                        <Bar dataKey="tm" fill="url(#tmGradient)" radius={[10, 10, 0, 0]} name="بعد" barSize={34} />

                                                        <Line
                                                            type="monotone"
                                                            dataKey="tm"
                                                            stroke="#FF6B00"
                                                            strokeWidth={3}
                                                            dot={{ r: 5, stroke: '#FF6B00', strokeWidth: 2, fill: '#0A2540' }}
                                                            activeDot={{ r: 8 }}
                                                            name="روند پیشنهادی"
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-lg opacity-70">
                                                    ابتدا مبدا و مقصد را انتخاب کنید
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    ) : (
                        <div className="space-y-10 lg:space-y-12">
                            {/* کارت خلاصه ریسک واقعی */}
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl border border-[#FF6B00]/50 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-7 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                            >
                                {/* Glow */}
                                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FF6B00]/15 blur-3xl rounded-full" />
                                <div className="absolute -bottom-28 -left-24 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />

                                <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />

                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                                        <div>
                                            <h5 className="text-xl md:text-3xl font-black text-[#FF6B00] tracking-tight">
                                                ریسک واقعی مسیر
                                            </h5>
                                            <p className="text-white/70 text-sm md:text-base mt-1">
                                                Actual Risk • Weekly Summary
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="px-4 py-2 rounded-full bg-[#0A2540]/60 border border-white/10 text-white/80 text-sm">
                                                حداقل: <span className="text-white font-bold">{currentData?.risk?.actRisk?.minT ?? '—'}</span>
                                            </div>
                                            <div className="px-4 py-2 rounded-full bg-[#0A2540]/60 border border-white/10 text-white/80 text-sm">
                                                حداکثر: <span className="text-white font-bold">{currentData?.risk?.actRisk?.maxT ?? '—'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {currentData?.risk?.actRisk?.chartData?.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-center">
                                            {/* عدد اصلی */}
                                            <div className="md:col-span-2 text-center md:text-right">
                                                <div className="text-7xl md:text-8xl lg:text-9xl font-black text-[#FF6B00] drop-shadow-[0_6px_22px_rgba(255,107,0,0.35)] leading-none">
                                                    {(
                                                        currentData.risk.actRisk.chartData.reduce((sum, item) => sum + (item.value ?? 0), 0) /
                                                        currentData.risk.actRisk.chartData.length
                                                    ).toFixed(1)}
                                                </div>

                                                <p className="text-lg md:text-xl text-white/90 mt-3 font-semibold">
                                                    میانگین ریسک هفتگی
                                                </p>

                                                <p className="text-base text-white/60 mt-2">
                                                    محدوده هدف: {currentData.risk.actRisk.minT ?? '—'} تا {currentData.risk.actRisk.maxT ?? '—'}
                                                </p>
                                            </div>

                                            {/* کارت اطلاعات کناری */}
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white/70 text-sm">Status</span>
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30">
                                                        LIVE
                                                    </span>
                                                </div>

                                                <div className="mt-4 space-y-3">
                                                    <div className="flex justify-between text-white/80 text-sm">
                                                        <span>هدف حداقل</span>
                                                        <span className="text-white font-bold">{currentData.risk.actRisk.minT ?? '—'}</span>
                                                    </div>
                                                    <div className="flex justify-between text-white/80 text-sm">
                                                        <span>هدف حداکثر</span>
                                                        <span className="text-white font-bold">{currentData.risk.actRisk.maxT ?? '—'}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                                                    <div className="h-full bg-[#FF6B00] w-[65%]" />
                                                </div>

                                                <p className="text-xs text-white/50 mt-2">
                                                    نمایش کلی وضعیت نسبت به اهداف
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-10">
                                            <div className="text-7xl md:text-9xl font-black text-white/30 mb-2">—</div>
                                            <p className="text-white/60 text-lg">داده‌ای برای محاسبه ریسک موجود نیست</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* چارت‌های ریسک */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10">
                                {/* چارت ریسک واقعی */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/40 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FF6B00]/10 blur-3xl rounded-full" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-black text-[#FF6B00]">
                                                    ریسک واقعی
                                                </h4>
                                                <p className="text-white/60 text-sm mt-1">Actual Risk Chart</p>
                                            </div>

                                            <div className="px-4 py-2 rounded-xl bg-[#0A2540]/70 border border-white/10 text-white/80 text-xs">
                                                Target: {currentData?.risk?.actRisk?.minT ?? '—'} → {currentData?.risk?.actRisk?.maxT ?? '—'}
                                            </div>
                                        </div>

                                        <div className="h-[340px] md:h-[380px] lg:h-[420px]">
                                            {currentData?.risk?.actRisk?.chartData?.length > 0 ? (
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart
                                                        data={currentData.risk.actRisk.chartData}
                                                        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="4 4" stroke="#ffffff12" />
                                                        <XAxis dataKey="day" stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 13 }} />
                                                        <YAxis domain={[0, (currentData.risk.actRisk.maxT ?? 2) + 1]} stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 13 }} />

                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: '#0A2540ee',
                                                                border: '1px solid #FF6B00',
                                                                borderRadius: '10px',
                                                                color: 'white',
                                                                padding: '10px 14px',
                                                            }}
                                                            labelStyle={{ color: '#FF6B00', fontWeight: 'bold' }}
                                                        />

                                                        <ReferenceLine
                                                            y={currentData.risk.actRisk.minT ?? 1}
                                                            stroke="#FFFFFF"
                                                            strokeDasharray="6 6"
                                                            strokeWidth={2}
                                                            label={{
                                                                value: `حداقل هدف (${currentData.risk.actRisk.minT})`,
                                                                position: 'right',
                                                                fill: '#FFFFFF',
                                                                fontSize: 12,
                                                            }}
                                                        />
                                                        <ReferenceLine
                                                            y={currentData.risk.actRisk.maxT ?? 2}
                                                            stroke="#FFFFFF"
                                                            strokeDasharray="6 6"
                                                            strokeWidth={2}
                                                            label={{
                                                                value: `حداکثر هدف (${currentData.risk.actRisk.maxT})`,
                                                                position: 'right',
                                                                fill: '#FFFFFF',
                                                                fontSize: 12,
                                                            }}
                                                        />

                                                        <Bar
                                                            dataKey="value"
                                                            fill={currentData.risk.actRisk.color || '#FF6B00'}
                                                            radius={[10, 10, 0, 0]}
                                                            name="سطح ریسک"
                                                            barSize={38}
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-lg opacity-70">
                                                    داده ریسک واقعی موجود نیست
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* چارت‌های ریسک اپشنال */}
                                <div className="space-y-6">
                                    {['tempRisk', 'trafficRisk', 'rainRisk'].map((riskType) => {
                                        const risk = currentData?.risk?.[riskType as keyof typeof currentData.risk]
                                        if (!risk || !risk.chartData || risk.chartData.every(d => !d.value || d.value === 0)) return null

                                        return (
                                            <motion.div
                                                key={riskType}
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.7 }}
                                                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-7 shadow-[0_18px_50px_rgba(0,0,0,0.55)] hover:border-[#FF6B00]/40 transition-all"
                                            >
                                                <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />

                                                <div className="relative z-10">
                                                    <div className="flex items-center justify-between mb-5">
                                                        <h4 className="text-lg md:text-xl font-black text-[#FF6B00]">
                                                            {riskType === 'tempRisk' ? 'ریسک دما' :
                                                                riskType === 'trafficRisk' ? 'ریسک ترافیک' :
                                                                    'ریسک باران'}
                                                        </h4>

                                                        <div className="px-3 py-1 rounded-full bg-[#0A2540]/70 border border-white/10 text-white/70 text-xs">
                                                            Target {risk.minT ?? '—'} → {risk.maxT ?? '—'}
                                                        </div>
                                                    </div>

                                                    <div className="h-[260px]">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <BarChart
                                                                data={risk.chartData}
                                                                margin={{ top: 10, right: 20, left: 20, bottom: 30 }}
                                                            >
                                                                <CartesianGrid strokeDasharray="4 4" stroke="#ffffff12" />
                                                                <XAxis dataKey="day" stroke="#ffffff80" tick={{ fill: '#ffffff', fontSize: 12 }} />
                                                                <YAxis domain={[0, (risk.maxT ?? 2) + 1]} stroke="#ffffff80" tick={{ fill: '#ffffff', fontSize: 12 }} />

                                                                <Tooltip
                                                                    contentStyle={{
                                                                        backgroundColor: '#0A2540ee',
                                                                        border: '1px solid #FF6B00',
                                                                        borderRadius: '10px',
                                                                        color: 'white',
                                                                        padding: '10px 14px',
                                                                    }}
                                                                />

                                                                <ReferenceLine
                                                                    y={risk.minT ?? 1}
                                                                    stroke="#FFFFFF"
                                                                    strokeDasharray="6 6"
                                                                    strokeWidth={2}
                                                                    label={{ value: `حداقل هدف (${risk.minT})`, position: 'right', fill: '#FFFFFF', fontSize: 11 }}
                                                                />
                                                                <ReferenceLine
                                                                    y={risk.maxT ?? 2}
                                                                    stroke="#FFFFFF"
                                                                    strokeDasharray="6 6"
                                                                    strokeWidth={2}
                                                                    label={{ value: `حداکثر هدف (${risk.maxT})`, position: 'right', fill: '#FFFFFF', fontSize: 11 }}
                                                                />

                                                                <Bar
                                                                    dataKey="value"
                                                                    fill={risk.color || '#FF6B00'}
                                                                    radius={[10, 10, 0, 0]}
                                                                    name="سطح ریسک"
                                                                    barSize={34}
                                                                />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* هشدارها و نقشه بغل هم */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10">
                                {/* لیست هشدارها */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="relative overflow-hidden rounded-3xl border border-red-500/40 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/10 blur-3xl rounded-full" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-black text-red-400">
                                                    هشدارهای فعال
                                                </h4>
                                                <p className="text-white/60 text-sm mt-1">Active Alerts</p>
                                            </div>

                                            <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold">
                                                {currentData?.risk?.alerts?.length ?? 0} مورد
                                            </div>
                                        </div>

                                        {currentData?.risk?.alerts?.length ? (
                                            <ul className="space-y-3">
                                                {currentData.risk.alerts.map((alert, index) => (
                                                    <li
                                                        key={index}
                                                        className="group bg-red-900/25 border border-red-500/30 rounded-2xl px-4 py-4 text-white flex items-start gap-3 hover:bg-red-500/15 transition-all"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/15 border border-red-500/30 text-xl">
                                                            ⚠️
                                                        </div>

                                                        <div className="flex-1">
                                                            <p className="text-base font-semibold text-white/90 leading-relaxed">
                                                                {alert}
                                                            </p>
                                                            <p className="text-xs text-white/50 mt-1">
                                                                نیازمند بررسی فوری
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-center text-white/70 py-14 text-lg">
                                                هیچ هشدار فعالی ثبت نشده است
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* نقشه ریسک */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="relative overflow-hidden rounded-3xl border border-[#FF6B00]/40 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] p-6 lg:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-black text-[#FF6B00]">
                                                    نقشه ریسک مسیر
                                                </h4>
                                                <p className="text-white/60 text-sm mt-1">Risk Map</p>
                                            </div>

                                            <div className="px-4 py-2 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-bold">
                                                Live Map
                                            </div>
                                        </div>

                                        <div className="h-[340px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden relative border border-white/10">
                                            {selectedPath?.originlat && selectedPath?.originlong && selectedPath?.destinationlat && selectedPath?.destinationlong ? (
                                                <RouteMap
                                                    origin={{ lat: selectedPath.originlat, lng: selectedPath.originlong }}
                                                    destination={{ lat: selectedPath.destinationlat, lng: selectedPath.destinationlong }}
                                                    height={420}
                                                />
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-lg opacity-70 bg-[#0A2540]/50">
                                                    ابتدا مبدا و مقصد را انتخاب کنید
                                                </div>
                                            )}

                                            {/* overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-red-600/15 to-transparent pointer-events-none" />

                                            {/* legend */}
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-[#0A2540]/70 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-3">
                                                <span className="text-white/80 text-xs">Low</span>
                                                <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-green-500/70 via-yellow-500/70 to-red-500/70" />
                                                <span className="text-white/80 text-xs">High</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    )}
                </motion.div>

                {/*<div className="mt-12 text-center opacity-70 text-sm">*/}
                {/*    ارائه شده توسط nona*/}
                {/*</div>*/}
            </div>
        </section>
    )
}
