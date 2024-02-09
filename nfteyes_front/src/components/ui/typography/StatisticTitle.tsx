import React, { ReactNode } from 'react'

interface StatisticTitlePropsType {
    children: ReactNode
    className?: string
}

const StatisticTitle: React.FC<StatisticTitlePropsType> = ({ children, className }) => {
    return (
        <div className={` font-tekoMedium text-[45px] statisticTitleGradiant flex justify-center ${className}`}>
            {children}
        </div>
    )
}

export default StatisticTitle
