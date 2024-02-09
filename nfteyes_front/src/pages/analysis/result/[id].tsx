import { AnalyzeProvider } from 'features/analyze/store/useAnalyzeCtx'
import { NextPage } from 'next'
import React from 'react'
import AnalyzeTableForm from 'features/analyze/table/resultTable/AnalyzeTableForm'

const AnalysisResult: NextPage = () => {
    return (
        <AnalyzeProvider>
            <AnalyzeTableForm />
        </AnalyzeProvider>
    )
}

export default AnalysisResult
