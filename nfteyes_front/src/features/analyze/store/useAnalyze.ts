import { useAnalyzeCtx } from './useAnalyzeCtx'
import { TAnalyze, TAnalyzeRes } from './analyzeReducer'
import { analyzeService } from './analyze.service'
import { AxiosError } from 'axios'

function useAnalyze() {
    const { analyzeState, analyzeDispatch } = useAnalyzeCtx()

    function setAnalisysIntoCtx(analyzeRes: TAnalyzeRes): void {
        analyzeDispatch({ type: 'SET', payload: { result: analyzeRes.result, pagination: analyzeRes.pagination } })
    }

    async function addAnalyze(analyze: TAnalyze): Promise<void> {
        analyzeDispatch({ type: 'ADD', payload: analyze })
    }

    async function editAnalyze(editedAnalyze: TAnalyze): Promise<TAnalyze | undefined> {
        analyzeDispatch({ type: 'EDIT', payload: editedAnalyze })
        return analyzeState.analyzeList.result.find((analyze: TAnalyze) => analyze.id === editedAnalyze.id)
    }

    async function deleteAnalyze(id: number): Promise<void> {
        analyzeDispatch({ type: 'DELETE', payload: id })
    }

    async function getAnalisys(): Promise<TAnalyze[] | number> {
        try {
            const res = await analyzeService.fetchAnalysis()
            analyzeDispatch({ type: 'GET', payload: res })
            return analyzeState.analyzeList?.result
        } catch (e: any) {
            const error = e as AxiosError
            console.error(error)
            return error.response?.status!
        }
    }

    async function getAnalysisResult(id: number): Promise<any> {
        const res = await analyzeService.fetchAnalysResults(id)
        analyzeDispatch({ type: 'GET_ANALYZE_RESULT', payload: res })
        return res.result
    }

    async function getAnalyzeById(id: number): Promise<TAnalyze | null> {
        analyzeDispatch({ type: 'GET_BY_ID', payload: id })
        return analyzeState.analyzeDetail
    }

    async function deleteMultiple(payload: number[]): Promise<any> {
        const res = await analyzeService.deleteMultipleAnalyisis(payload)
        return res.result
    }

    return {
        setAnalisysIntoCtx,
        addAnalyze,
        getAnalisys,
        getAnalyzeById,
        editAnalyze,
        deleteAnalyze,
        analyzeState,
        getAnalysisResult,
        deleteMultiple,
    }
}

export default useAnalyze
