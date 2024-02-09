import React from 'react'
import { StatisticsProvider } from 'features/statistics/useStatisticsCtx'
import StatsMainPage from 'features/statistics/StatsMainPage'

export default function Home() {
    return (
        <StatisticsProvider>
            <StatsMainPage />
        </StatisticsProvider>
    )
}
