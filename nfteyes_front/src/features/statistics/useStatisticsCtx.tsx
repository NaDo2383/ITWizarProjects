import React, { createContext, useState, useContext, FC } from 'react'

interface IStatisticsCtx {
    statsOfNFTEYES: any
    setStatsOfNFTEYES: React.Dispatch<React.SetStateAction<any>>
    startDate: any | null
    setStartDate: React.Dispatch<React.SetStateAction<any>>
    endDate: Date | null
    setEndDate: React.Dispatch<React.SetStateAction<any>>
    statsOfNFTsinChain: any
    setStatsOfNFTsinChain: React.Dispatch<React.SetStateAction<any>>
    statsMainData: any
    setStatsMainData: React.Dispatch<React.SetStateAction<any>>
}
const StatisticsContext = createContext<IStatisticsCtx>({} as IStatisticsCtx)

const StatisticsProvider: FC<JsxChildren> = ({ children }) => {
    const today = new Date()
    const dateSevenDaysAgo = new Date(today)
    dateSevenDaysAgo.setDate(today.getDate() - 7)
    const [statsOfNFTEYES, setStatsOfNFTEYES] = useState<any>(null)
    const [statsMainData, setStatsMainData] = useState<any>(null)
    const [statsOfNFTsinChain, setStatsOfNFTsinChain] = useState<any>(null)
    const [startDate, setStartDate] = useState<Date | null>(dateSevenDaysAgo)
    const [endDate, setEndDate] = useState<Date | null>(new Date())

    return (
        <StatisticsContext.Provider
            value={{
                statsOfNFTEYES,
                setStatsOfNFTEYES,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                statsOfNFTsinChain,
                setStatsOfNFTsinChain,
                statsMainData,
                setStatsMainData,
            }}
        >
            {children}
        </StatisticsContext.Provider>
    )
}

const useStatisticsCtx = () => {
    const context = useContext(StatisticsContext)
    if (!context) throw new Error('useStatisticsCtx must be used within a UserProvider')
    return context
}

export { StatisticsContext, StatisticsProvider, useStatisticsCtx }
