import React from 'react';
import Image from "next/image";
import {motion} from "framer-motion";

function SlaFlowDiagram() {
    return (
        <div className={' py-60 flex items-center justify-center flex-col bg-[#001F3F]'}>
            <div className="flex items-center gap-6 mb-12">
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.9 }}
                    className="w-16 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                />
                <h2 className="text-3xl md:text-5xl font-bold text-[#FF6B00]">
                    معماری SLA چندسطحی (Frame SLA & Specific SLA)
                </h2>
            </div>

            {/* توضیح کوتاه */}
            <p className="text-lg md:text-xl opacity-90 mb-5 leading-relaxed">
                Frame SLA: توافق بلندمدت و چارچوب قراردادی شامل سیاست‌ها، حدود مجاز، و شرایط کلی سطح خدمت
            </p>
            <p className="text-lg md:text-xl opacity-90 mb-5 leading-relaxed">
                Specific SLA: تعهد سطح خدمت برای هر حمل/سفارش به‌صورت موردی و عملیاتی، در چارچوب Frame SLA
            </p>
            <Image src={'/SLAFlowChart.png'} width={700} height={100} className={'rounded-2xl'} alt={'SlaFlowDiagram'} />
        </div>
    );
}

export default SlaFlowDiagram;