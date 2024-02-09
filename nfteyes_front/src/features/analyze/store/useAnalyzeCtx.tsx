import React, { createContext, useReducer, useContext, FC, Dispatch } from 'react'
import { TAnalyzeState, TAnalyzeAction, analyzeReducer } from './analyzeReducer'

interface IAnalyzeCtx {
    analyzeState: TAnalyzeState
    analyzeDispatch: Dispatch<TAnalyzeAction>
}

const AnalyzeContext = createContext<IAnalyzeCtx>({} as IAnalyzeCtx)

const initialAnalyzeState: TAnalyzeState = {
    analyzeList: {
        result: [],
    },
    analyzeDetail: null,
    analyzeResult: null,
}

const AnalyzeProvider: FC<JsxChildren> = ({ children }) => {
    const [analyzeState, analyzeDispatch] = useReducer(analyzeReducer, initialAnalyzeState)

    return (
        <AnalyzeContext.Provider
            value={{
                analyzeState,
                analyzeDispatch,
            }}
        >
            {children}
        </AnalyzeContext.Provider>
    )
}

const useAnalyzeCtx = () => useContext(AnalyzeContext)

export { AnalyzeContext, AnalyzeProvider, useAnalyzeCtx }
