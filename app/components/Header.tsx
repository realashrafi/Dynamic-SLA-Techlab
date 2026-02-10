import React from 'react';
import Image from "next/image";

function Header() {
    return (
        <div className="
        fixed top-0 z-50
        w-full h-20
       backdrop-blur-[10px]
bg-black/10
rounded-b-xl
        flex items-center justify-between
      ">
            <div className={'flex items-center mr-8 text-white text-[19px] justify-center'}>
                <span className={'font-bold'}>تک‌لب</span>
                <span>، راه برد با تکنولوژی</span>
            </div>
            <div className="max-w-6xl px-6 text-white font-bold text-lg">
                <Image src={'/techlabLogo.png'} width={160} height={100} alt={'techlabLogo'}/>
            </div>
        </div>
    );
}

export default Header;