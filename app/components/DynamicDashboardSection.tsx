//@ts-nocheck
'use client'

import { useState } from 'react'
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
    Legend, ReferenceLine,
} from 'recharts'
import { dataModel } from '@/app/components/dataModel' // مسیر درست فایل dataModel رو تنظیم کن

const cities = ['تهران', 'اصفهان', 'رشت']

export default function DynamicSlaDashboardSection() {
    const [origin, setOrigin] = useState<string | null>(null)
    const [destination, setDestination] = useState<string | null>(null)
    const [selectedTime, setSelectedTime] = useState<'time1' | 'time2'>('time1')
    const [activeTab, setActiveTab] = useState('overview')

    const selectedPath = dataModel.find(
        (path) => path.origin === origin && path.destination === destination
    )

    const currentData = selectedPath ? selectedPath[selectedTime] : null

    const availableDestinations = origin
        ? dataModel.filter((path) => path.origin === origin).map((path) => path.destination)
        : cities

    const tabs = [
        { id: 'overview', label: 'نمای کلی' },
        { id: 'performance', label: 'عملکرد' },
        { id: 'risk', label: 'ریسک' },
    ]

    return (
        <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-[#001F3F] to-[#001F3F]">
            <div className="max-w-7xl mx-auto">
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
                <div className="sticky top-4 z-40 bg-[#001F3F]/95 backdrop-blur-lg border border-[#FF6B00]/40 rounded-xl p-5 md:p-6 mb-10 shadow-2xl">
                    <div className="flex flex-wrap gap-4 md:gap-6 items-end">
                        <div className="flex-1 min-w-[160px]">
                            <label className="block text-sm opacity-80 mb-1">مبدا</label>
                            <select
                                value={origin || ''}
                                onChange={(e) => {
                                    setOrigin(e.target.value)
                                    setDestination(null)
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
                                onChange={(e) => setDestination(e.target.value)}
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

                        <div className="flex-1 min-w-[280px]">
                            <label className="block text-sm opacity-80 mb-1">بازه زمانی</label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedTime('time1')}
                                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                                        selectedTime === 'time1'
                                            ? 'bg-[#FF6B00] text-black shadow-md'
                                            : 'bg-[#0A2540] border border-[#FF6B00]/50 text-white hover:bg-[#FF6B00]/30'
                                    }`}
                                >
                                    بازه اول
                                </button>
                                <button
                                    onClick={() => setSelectedTime('time2')}
                                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                                        selectedTime === 'time2'
                                            ? 'bg-[#FF6B00] text-black shadow-md'
                                            : 'bg-[#0A2540] border border-[#FF6B00]/50 text-white hover:bg-[#FF6B00]/30'
                                    }`}
                                >
                                    بازه دوم
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* تب‌ها */}
                <div className="flex border-b border-[#FF6B00]/30 mb-8 overflow-x-auto">
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

                {/* محتوای تب */}
                <motion.div
                    key={`${activeTab}-${selectedTime}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#001F3F]/60 backdrop-blur-md border border-[#FF6B00]/30 rounded-2xl p-6 md:p-8 shadow-2xl min-h-[500px]"
                >
                    {activeTab === 'overview' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
                            {/* کارت Current SLA */}
                            <div className="lg:col-span-2 flex items-center justify-center">
                                {currentData ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="w-full bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/60 rounded-2xl p-6 lg:p-8 shadow-xl text-center relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

                                        <div className="relative z-10">
                                            <div className="inline-block bg-[#FF6B00] text-black font-bold text-lg md:text-xl px-6 py-2 rounded-xl mb-4 shadow-md">
                                                Current SLA: {currentData.overview.currentSla} روز
                                            </div>

                                            {/* Linear Progress Bar */}
                                            <div className="w-full max-w-xs mx-auto mb-4">
                                                <div className="relative pt-1">
                                                    <div className="overflow-hidden h-8 md:h-10 mb-2 rounded-full bg-white/10 border border-[#FF6B00]/30">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${currentData.overview.meetSla ?? 0}%` }}
                                                            transition={{ duration: 1.5, ease: 'easeOut' }}
                                                            className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] rounded-full flex items-center justify-center"
                                                        >
                              <span className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                                {currentData.overview.meetSla ?? 0}%
                              </span>
                                                        </motion.div>
                                                    </div>
                                                    <p className="text-center text-white/90 text-base md:text-lg font-medium">
                                                        پایبندی به تعهد
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="w-full bg-[#0A2540]/80 border border-[#FF6B00]/50 rounded-2xl p-10 text-center text-xl opacity-70">
                                        مبدا و مقصد را انتخاب کنید
                                    </div>
                                )}
                            </div>

                            {/* چارت */}
                            <div className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-6 lg:p-8 shadow-2xl h-full"
                                >
                                    <h4 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-6 text-center drop-shadow-md">
                                        Shipments Delivery Times
                                    </h4>

                                    <div className="h-[380px] md:h-[420px] lg:h-[480px]">
                                        {currentData ? (
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

                                                    <CartesianGrid strokeDasharray="4 4" stroke="#ffffff15" />
                                                    <XAxis dataKey="name" stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 14 }} />
                                                    <YAxis stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 14 }} />

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

                                                    <Legend wrapperStyle={{ color: 'white', fontSize: 13, paddingTop: 10 }} iconType="circle" />

                                                    <Bar
                                                        dataKey="as"
                                                        fill="url(#barGradient)"
                                                        radius={[8, 8, 0, 0]}
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
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-xl opacity-70">
                                                ابتدا مبدا و مقصد را انتخاب کنید
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ) : activeTab === 'performance' ? (
                        <div className="space-y-8 lg:space-y-10">
                            {/* کارت‌های بالا */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-5 lg:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="text-[#FF6B00] text-4xl lg:text-5xl font-black mb-2">↑ {currentData?.performance?.improvementSla ?? 0}%</div>
                                    <h5 className="text-base lg:text-lg font-bold text-white">بهبود SLA</h5>
                                    <p className="text-xs lg:text-sm text-white/70">نسبت به SLA فعلی</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-5 lg:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="text-[#FF6B00] text-4xl lg:text-5xl font-black mb-2">{currentData?.performance?.suggestSla ?? '—'} روز</div>
                                    <h5 className="text-base lg:text-lg font-bold text-white">SLA پیشنهادی</h5>
                                    <p className="text-xs lg:text-sm text-white/70">مدل داینامیک</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-5 lg:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="text-green-400 text-4xl lg:text-5xl font-black mb-2">↑ {currentData?.performance?.newMeetSla ?? 0}%</div>
                                    <h5 className="text-base lg:text-lg font-bold text-white">پایبندی جدید</h5>
                                    <p className="text-xs lg:text-sm text-white/70">با SLA داینامیک</p>
                                </motion.div>
                            </div>

                            {/* چارت و نقشه بغل هم */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                {/* چارت مقایسه‌ای */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-6 lg:p-8 shadow-2xl"
                                >
                                    <h4 className="text-xl md:text-2xl font-bold text-[#FF6B00] mb-5 text-center">
                                        مقایسه عملکرد قبل و بعد
                                    </h4>

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

                                                    <CartesianGrid strokeDasharray="4 4" stroke="#ffffff15" />
                                                    <XAxis dataKey="name" stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 13 }} />
                                                    <YAxis stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 13 }} />

                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: '#0A2540ee',
                                                            border: '1px solid #FF6B00',
                                                            borderRadius: '8px',
                                                            color: 'white',
                                                            padding: '8px 12px',
                                                        }}
                                                        labelStyle={{ color: '#FF6B00', fontWeight: 'bold' }}
                                                        itemStyle={{ color: 'white' }}
                                                    />

                                                    <Legend wrapperStyle={{ color: 'white', fontSize: 12, paddingTop: 10 }} iconType="circle" />

                                                    <Bar dataKey="ra" fill="url(#raGradient)" radius={[6, 6, 0, 0]} name="قبل" barSize={30} />
                                                    <Bar dataKey="tm" fill="url(#tmGradient)" radius={[6, 6, 0, 0]} name="بعد" barSize={30} />

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
                                </motion.div>

                                {/* نقشه مسیر */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-6 lg:p-8 shadow-2xl overflow-hidden"
                                >
                                    <h4 className="text-xl md:text-2xl font-bold text-[#FF6B00] mb-5 text-center">
                                        نقشه مسیر انتخاب‌شده
                                    </h4>

                                    <div className="h-[340px] md:h-[380px] lg:h-[420px] rounded-xl overflow-hidden relative">
                                        {currentData?.performance?.image ? (
                                            <img
                                                src={currentData.performance.image}
                                                alt="نقشه مسیر"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-lg opacity-70 bg-[#0A2540]/50">
                                                ابتدا مبدا و مقصد را انتخاب کنید
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/20 to-transparent pointer-events-none" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 lg:space-y-10">
                            {/* کارت خلاصه ریسک واقعی */}
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="max-w-3xl mx-auto bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/60 rounded-2xl p-8 lg:p-10 shadow-2xl text-center relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                                <div className="relative z-10">
                                    <h5 className="text-xl md:text-2xl font-bold text-[#FF6B00] mb-4">
                                        ریسک واقعی مسیر (Actual Risk)
                                    </h5>

                                    {
                                        currentData?.risk?.actRisk?.chartData?.length > 0 ? (
                                        <>
                                            <div className="text-7xl md:text-9xl font-black text-[#FF6B00] mb-3 drop-shadow-xl">
                                                {(
                                                    currentData.risk.actRisk.chartData.reduce((sum, item) => sum + (item.value ?? 0), 0) /
                                                    currentData.risk.actRisk.chartData.length
                                                ).toFixed(1)}
                                            </div>
                                            <p className="text-lg md:text-xl text-white/90 mb-2">
                                                میانگین ریسک هفتگی
                                            </p>
                                            <p className="text-base text-white/70">
                                                محدوده: {currentData.risk.actRisk.minT ?? '—'} تا {currentData.risk.actRisk.maxT ?? '—'}
                                            </p>
                                        </>
                                    ) : (
                                        <div className="text-7xl md:text-9xl font-black text-white/40 mb-3">—</div>
                                    )}
                                </div>
                            </motion.div>

                            {/* چارت‌های ریسک */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                {/* چارت ریسک واقعی */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-6 lg:p-8 shadow-2xl"
                                >
                                    <h4 className="text-xl md:text-2xl font-bold text-[#FF6B00] mb-5 text-center">
                                        ریسک واقعی (Actual Risk)
                                    </h4>

                                    <div className="h-[340px] md:h-[380px] lg:h-[420px]">
                                        {currentData?.risk?.actRisk?.chartData?.length > 0 ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={currentData.risk.actRisk.chartData}
                                                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                                >
                                                    <CartesianGrid strokeDasharray="4 4" stroke="#ffffff15" />
                                                    <XAxis dataKey="day" stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 13 }} />
                                                    <YAxis domain={[0, (currentData.risk.actRisk.maxT ?? 2) + 1]} stroke="#ffffff90" tick={{ fill: '#ffffff', fontSize: 13 }} />

                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: '#0A2540ee',
                                                            border: '1px solid #FF6B00',
                                                            borderRadius: '8px',
                                                            color: 'white',
                                                            padding: '8px 12px',
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
                                                        radius={[6, 6, 0, 0]}
                                                        name="سطح ریسک"
                                                        barSize={35}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-lg opacity-70">
                                                داده ریسک واقعی موجود نیست
                                            </div>
                                        )}
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
                                                className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-6 lg:p-8 shadow-2xl"
                                            >
                                                <h4 className="text-xl font-bold text-[#FF6B00] mb-4 text-center">
                                                    {riskType === 'tempRisk' ? 'ریسک دما' :
                                                        riskType === 'trafficRisk' ? 'ریسک ترافیک' :
                                                            'ریسک باران'}
                                                </h4>

                                                <div className="h-[280px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart
                                                            data={risk.chartData}
                                                            margin={{ top: 10, right: 20, left: 20, bottom: 30 }}
                                                        >
                                                            <CartesianGrid strokeDasharray="4 4" stroke="#ffffff15" />
                                                            <XAxis dataKey="day" stroke="#ffffff80" tick={{ fill: '#ffffff', fontSize: 12 }} />
                                                            <YAxis domain={[0, (risk.maxT ?? 2) + 1]} stroke="#ffffff80" tick={{ fill: '#ffffff', fontSize: 12 }} />

                                                            <Tooltip
                                                                contentStyle={{
                                                                    backgroundColor: '#0A2540ee',
                                                                    border: '1px solid #FF6B00',
                                                                    borderRadius: '8px',
                                                                    color: 'white',
                                                                    padding: '8px 12px',
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
                                                                radius={[6, 6, 0, 0]}
                                                                name="سطح ریسک"
                                                                barSize={30}
                                                            />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* هشدارها و نقشه بغل هم */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                {/* لیست هشدارها */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-red-500/50 rounded-2xl p-6 lg:p-8 shadow-2xl"
                                >
                                    <h4 className="text-xl md:text-2xl font-bold text-red-400 mb-5 text-center">
                                        هشدارهای فعال
                                    </h4>

                                    {currentData?.risk?.alerts?.length ? (
                                        <ul className="space-y-3">
                                            {currentData.risk.alerts.map((alert, index) => (
                                                <li
                                                    key={index}
                                                    className="bg-red-900/40 border border-red-500/50 rounded-xl p-4 text-white text-base flex items-center gap-3"
                                                >
                                                    <span className="text-2xl">⚠️</span>
                                                    <span>{alert}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-center text-white/70 py-10 text-lg">
                                            هیچ هشدار فعالی ثبت نشده است
                                        </div>
                                    )}
                                </motion.div>

                                {/* نقشه ریسک */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-6 lg:p-8 shadow-2xl overflow-hidden"
                                >
                                    <h4 className="text-xl md:text-2xl font-bold text-[#FF6B00] mb-5 text-center">
                                        نقشه ریسک مسیر
                                    </h4>

                                    <div className="h-[340px] md:h-[380px] lg:h-[420px] rounded-xl overflow-hidden relative">
                                        {currentData?.risk?.image ? (
                                            <img
                                                src={currentData.risk.image}
                                                alt="نقشه ریسک"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-lg opacity-70 bg-[#0A2540]/50">
                                                ابتدا مبدا و مقصد را انتخاب کنید
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent pointer-events-none" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ) }
                </motion.div>

                <div className="mt-12 text-center opacity-70 text-sm">
                    ارائه شده توسط nona
                </div>
            </div>
        </section>
    )
}