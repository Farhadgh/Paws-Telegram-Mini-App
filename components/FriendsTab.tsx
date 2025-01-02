// components/FriendsTab.tsx

/**
 * This project was developed by Nikandr Surkov.
 * 
 * YouTube: https://www.youtube.com/@NikandrSurkov
 * GitHub: https://github.com/nikandr-surkov
 */

'use client'

import { useState } from 'react';
import Image from 'next/image';
import ShahiCrown from '../icons/ShahiCrown';
import { shareReferralLink } from '../utils/api';

const FriendsTab = () => {
    const [isSharing, setIsSharing] = useState(false);

    const handleInvite = async () => {
        try {
            setIsSharing(true);
            await shareReferralLink();
        } catch (error) {
            console.error('Failed to share referral link:', error);
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className={`friends-tab-con px-4 pb-24 transition-all duration-300`}>
            {/* Header Text */}
            <div className="pt-8 space-y-1">
                <h1 className="text-3xl font-parastoo">دعوت از دوستان</h1>
              
                <div className="text-xl text-gray-400">
                    <span className="ml-2 font-parastoo">با دعوت از دوستان خود 10 درصد از در آمد آنها را بدست بیاورید</span>
                </div>
                
            </div>

            {/* Empty State */}
            <div className="mt-8 mb-2">
                <div className="bg-[#151516] w-full rounded-2xl p-8 flex flex-col items-center">
                    <ShahiCrown size={171} className="text-[#4c9ce2] mb-4" />
                    <p className="text-xl text-[#8e8e93] text-center font-parastoo">
                       لینک دعوت خود را به اشتراک بگذارید<br />
                   تا پادشاهی خود را گسترش دهید
                    </p>
                </div>
            </div>

            {/* Fixed Invite Button */}
            <div className="fixed bottom-[80px] left-0 right-0 py-4 flex justify-center">
                <div className="w-full max-w-md px-4">
                    <button 
                        onClick={handleInvite}
                        disabled={isSharing}
                        className={`w-full bg-[#4c9ce2] text-white py-4 rounded-xl text-lg font-parastoo ${
                            isSharing ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSharing ? 'اشتراک گذاری...' : 'دعوت'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FriendsTab
