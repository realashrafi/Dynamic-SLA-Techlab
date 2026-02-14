import React from 'react';
import Image from "next/image";
import {motion} from "framer-motion";

function DynamicSlaDataModel() {
    return (
        <div className={'py-60 bg-[#001F3F] '}>
            <div className={'  flex items-center justify-center flex-col max-w-5xl mx-auto '}>
                <div className="flex items-center gap-6 mb-12">
                    <motion.div
                        initial={{scaleX: 0}}
                        whileInView={{scaleX: 1}}
                        transition={{duration: 0.9}}
                        className="w-16 h-1.5 bg-[#FF6B00] rounded-full origin-left"
                    />
                    <h2 className="text-3xl md:text-5xl font-bold text-[#FF6B00]">
                        مبنای تاثیر گذاری و استفاده از دیتا می تواند از مسیر زیر باشد
                    </h2>
                </div>

                {/* توضیح کوتاه */}
                <Image src={'/DynamicSlaDataModelImage.png'} width={700} height={100} className={'rounded-2xl'}
                       alt={'SlaFlowDiagram'}/>
            </div>
        </div>
    );
}

export default DynamicSlaDataModel;