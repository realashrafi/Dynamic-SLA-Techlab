'use client'

import {useState} from 'react'
import {motion} from 'framer-motion'
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
} from 'recharts'
import {dataModel} from '@/app/components/dataModel' // مسیر فایل داده‌ات رو درست کن

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
        {id: 'overview', label: 'نمای کلی'},
        {id: 'performance', label: 'عملکرد'},
        {id: 'risk', label: 'ریسک'},
    ]

    return (
        <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-[#0A2540] to-[#001F3F]">
            <div className="max-w-7xl mx-auto">
                {/* عنوان */}
                <motion.h2
                    initial={{opacity: 0, y: -30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-3xl md:text-5xl font-bold text-[#FF6B00] text-center mb-10"
                >
                    داشبورد پویای SLA (دمو تعاملی)
                </motion.h2>

                {/* فرم ثابت */}
                <div
                    className="sticky top-4 z-40 bg-[#001F3F]/95 backdrop-blur-lg border border-[#FF6B00]/40 rounded-xl p-5 md:p-6 mb-10 shadow-2xl">
                    <div className="flex flex-wrap gap-4 md:gap-6 items-end">
                        {/* مبدا */}
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

                        {/* مقصد */}
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

                        {/* سوئیچ بازه زمانی */}
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
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="bg-[#001F3F]/60 backdrop-blur-md border border-[#FF6B00]/30 rounded-2xl p-6 md:p-8 shadow-2xl"
                >
                    {activeTab === 'overview' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
                            {/* کارت Current SLA - سمت چپ، متعادل و بروز */}

                            <motion.div
                                initial={{opacity: 0, x: -40}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.7}}
                                className="lg:col-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/60 rounded-2xl p-6 lg:p-8 shadow-xl relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"/>

                                {currentData ? <div className="relative z-10 w-full text-center">
                                        <div
                                            className="inline-block bg-[#FF6B00] text-black font-bold text-base md:text-lg px-6 py-2 rounded-xl mb-4 shadow-md">
                                            Current SLA: {currentData ? currentData.overview.currentSla : '—'} روز
                                        </div>

                                        {/* Linear Progress Bar برای درصد پایبندی */}
                                        <div className="w-full max-w-xs mx-auto mb-4">
                                            <div className="relative pt-1">
                                                <div
                                                    className="overflow-hidden h-8 md:h-10 mb-2 rounded-full bg-white/10 border border-[#FF6B00]/30">
                                                    <motion.div
                                                        initial={{width: 0}}
                                                        animate={{width: currentData ? `${currentData.overview.meetSla}%` : '0%'}}
                                                        transition={{duration: 1.2, ease: 'easeOut'}}
                                                        className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] rounded-full flex items-center justify-center"
                                                    >
                          <span className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                            {currentData ? currentData.overview.meetSla : '—'}%
                          </span>
                                                    </motion.div>
                                                </div>
                                                <p className="text-center text-white/90 text-base md:text-lg font-medium">
                                                    پایبندی به تعهد
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="h-full flex items-center justify-center text-xl opacity-70">
                                        ابتدا مبدا و مقصد را انتخاب کنید
                                    </div>
                                }
                            </motion.div>

                            {/* چارت - سمت راست، بزرگ‌تر و متعادل */}
                            <motion.div
                                initial={{opacity: 0, x: 40}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.7, delay: 0.2}}
                                className="lg:col-span-3 bg-gradient-to-br from-[#0A2540] to-[#0A1F44] border border-[#FF6B00]/50 rounded-2xl p-6 lg:p-8 shadow-2xl"
                            >
                                <h4 className="text-2xl md:text-3xl font-bold text-[#FF6B00] mb-6 text-center drop-shadow-md">
                                    Shipments Delivery Times
                                </h4>

                                <div className="h-[380px]">
                                    {currentData ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={currentData.overview.chartData}
                                                margin={{top: 20, right: 30, left: 20, bottom: 40}}
                                            >
                                                <defs>
                                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#3B82F6"/>
                                                        <stop offset="100%" stopColor="#1E40AF"/>
                                                    </linearGradient>
                                                </defs>

                                                <CartesianGrid strokeDasharray="4 4" stroke="#ffffff15"/>
                                                <XAxis dataKey="name" stroke="#ffffff90"
                                                       tick={{fill: '#ffffff', fontSize: 14}}/>
                                                <YAxis stroke="#ffffff90" tick={{fill: '#ffffff', fontSize: 14}}/>

                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: '#0A2540ee',
                                                        border: '1px solid #FF6B00',
                                                        borderRadius: '10px',
                                                        color: 'white',
                                                        padding: '10px 14px',
                                                    }}
                                                    labelStyle={{color: '#FF6B00', fontWeight: 'bold'}}
                                                    itemStyle={{color: 'white'}}
                                                />

                                                <Legend wrapperStyle={{color: 'white', fontSize: 13, paddingTop: 10}}
                                                        iconType="circle"/>

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
                                                    dot={{r: 6, stroke: '#FF6B00', strokeWidth: 2, fill: '#0A2540'}}
                                                    activeDot={{r: 10}}
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
                    ) : (
                        <div className="flex items-center justify-center h-96 text-2xl opacity-70">
                            تب {activeTab === 'performance' ? 'عملکرد' : 'ریسک'} - در حال توسعه
                        </div>
                    )}
                </motion.div>

                <div className="mt-12 text-center opacity-70 text-sm">
                    ارائه شده توسط nona
                </div>
            </div>
        </section>
    )
}