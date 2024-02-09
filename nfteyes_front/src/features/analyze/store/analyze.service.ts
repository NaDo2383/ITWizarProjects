import { getData, patchData } from 'common/axios/axios.service'
import { TAnalyze, TAnalyzeResult } from './analyzeReducer'

export const analyzeService = {
    fetchAnalysis: async () => {
        const res = await getData<TAnalyze[]>('/analyse_history')
        return res
    },

    fetchAnalysResults: async (id: number) => {
        const res = await getData<TAnalyzeResult>('/analyse_result/' + id)
        return res
    },

    deleteMultipleAnalyisis: async (payload: number[]) => {
        const res = await patchData<unknown>('/analyse_history', payload)
        return res
    },
}
