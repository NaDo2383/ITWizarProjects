import React, { ReactNode } from 'react'

interface StatsOfNFTEyesCardPropsType {
    header: string
    stat: string | number
    children?: ReactNode
}

const StatsOfNFTEyesCard: React.FC<StatsOfNFTEyesCardPropsType> = ({ header, stat, children }) => {
    return (
        <div className="min-w-[318px] text-center">
            <div className="border-b border-[#929292] text-white text-[24px] text-center pb-[10px] font-SignikascRegular">
                {header}
            </div>
            <div className="font-tekoRegular text-[80px] statsOfNFTEyesCardGradiant flex justify-center items-end">
                {stat}
                <div className="text-[40px] font-300 pb-[19.6px]">{header === 'Analysis rate' && '%'}</div>
            </div>
            {children}
        </div>
    )
}

export default StatsOfNFTEyesCard
