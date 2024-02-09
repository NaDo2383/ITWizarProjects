"use client"
import React, { createContext, useState, useContext } from "react"

const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    const [formulaDataList, setFormulaDataList] = useState(null)
    const [formulaDataDetail, setFormulaDataDetail] = useState(null)
    const [ratioIndicator, setRatioIndicator] = useState(null)
    const [dashboardData, setDashboardData] = useState(null)
    const [loanHolderDetail, setLoanHolderDetail] = useState(null)
    const [loanHoldersData, setLoanHoldersData] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <GlobalContext.Provider
            value={{
                formulaDataList,
                setFormulaDataList,
                formulaDataDetail,
                setFormulaDataDetail,
                loading,
                setLoading,
                ratioIndicator,
                setRatioIndicator,
                dashboardData,
                setDashboardData,
                loanHolderDetail,
                setLoanHolderDetail,
                loanHoldersData,
                setLoanHoldersData,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalCtx = () => {
    const context = useContext(GlobalContext)
    if (!context) throw new Error("useGlobalCtx must be used within a GlobalProvider")
    return context
}

export { GlobalContext, GlobalProvider, useGlobalCtx }
