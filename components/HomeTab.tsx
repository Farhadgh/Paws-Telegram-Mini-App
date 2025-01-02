'use client'

import Wallet from '../icons/Wallet';
import Community from '../icons/Community';
import Star from '../icons/Star';
import Image from 'next/image';
import ArrowRight from '../icons/ArrowLeft';
import { sparkles } from '../images';
import ShahiCrown from '../icons/ShahiCrown';
import ArrowLeft from '../icons/ArrowLeft';

const HomeTab = () => {
    return (
        <div className={`home-tab-con transition-all duration-300`}>
            {/* Connect Wallet Button */}
            <button className="w-full flex justify-center mt-8">
                <div className="bg-[#007aff] text-white px-3 py-0.5 rounded-full flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    <span>Connect wallet</span>
                </div>
            </button>

            {/* SHAHI Balance */}
            <div className="flex flex-col items-center mt-8">
                <ShahiCrown size={112} className="text-[#4c9ce2] mb-4" />
                <div className="flex items-center gap-1 text-center">
                    <div className="text-6xl font-parastoo mb-1">4,646</div>
                    <div className="text-white text-2xl">SHAHI</div>
                </div>
                <div className="flex items-center gap-1 text-[#868686] font-parastoo rounded-full px-4 py-1.5 mt-2 cursor-pointer">
                    <span>رتبه</span>
                    <Image
                        src={sparkles}
                        alt="sparkles"
                        width={18}
                        height={18}
                    />
                    <span>سلطنتی</span>
                    <ArrowLeft className="w-6 h-6" />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 px-4 mt-8 mb-8">
                <button className="shine-effect w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-parastoo">
                        <Community className="w-8 h-8" />
                        <span>به دربار شاهنشاهی بپیوندید</span>
                    </div>
                    <ArrowLeft className="w-6 h-6 text-gray-400" />
                </button>

                <button className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-parastoo">
                        <Star className="w-8 h-8" />
                        <span>پاداش سلطنتی</span>
                    </div>
                    <ArrowLeft className="w-6 h-6 text-gray-400" />
                </button>
            </div>
        </div>
    )
}

export default HomeTab
