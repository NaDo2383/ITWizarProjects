import React from 'react'
import { StatisticsProvider } from 'features/statistics/useStatisticsCtx'
import StatisticsPage from 'features/statistics/StatisticsPage'
import ProtectedPage from 'common/auth/jwt/ProtectedPage'

const Statistics: React.FC = () => {
    return (
        <StatisticsProvider>
            <ProtectedPage>
                <StatisticsPage />
            </ProtectedPage>
        </StatisticsProvider>
    )
}

export default Statistics
