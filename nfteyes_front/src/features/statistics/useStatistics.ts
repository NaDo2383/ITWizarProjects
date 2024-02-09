import { useCrud } from 'common/axios/useCrud'
import { useStatisticsCtx } from './useStatisticsCtx'
import axios from 'common/axios/http'

type IGetStatOfNFTsInChainPayload = {
    startDate: Date | null
    endDate: Date | null
    chainId: any
    type: any
}
function formatDateToYYYYMMDD(date: Date | null, type: number): string {
    const year = date?.getFullYear()
    const month = date && (date?.getMonth() + 1).toString().padStart(2, '0')
    const day = date?.getDate().toString().padStart(2, '0')
    if (type === 2) {
        return `${year}-${month}-${'01'}`
    } else if (type === 3) {
        return `${year}-${'01'}-${'01'}`
    } else {
        return `${year}-${month}-${day}`
    }
}

function useStatistics() {
    const { getData, postData } = useCrud()
    const { setStatsOfNFTEYES, setStatsOfNFTsinChain, setStatsMainData } = useStatisticsCtx()

    async function getAnalyseStatistics(chainId: number): Promise<{ success: boolean }> {
        try {
            const res = await getData(`/analyse_statistic${chainId > 0 ? '?chainId=' + (chainId - 1) : ''}`)
            if (res.success) {
                setStatsOfNFTEYES(res.result)
            }
            return { success: true }
        } catch (e) {
            console.error(e)
            return { success: false }
        }
    }

    async function getAnalyseStats(): Promise<{ success: boolean }> {
        try {
            const res = await getData(`/analyse_stats`)
            if (res.success) {
                setStatsMainData(res.result)
            }
            return { success: true }
        } catch (e) {
            console.error(e)
            return { success: false }
        }
    }

    async function getStatOfNFTsInChain({
        startDate,
        endDate,
        chainId = '',
        type = '',
    }: IGetStatOfNFTsInChainPayload): Promise<{ success: boolean }> {
        const start = formatDateToYYYYMMDD(startDate, type)
        const end = formatDateToYYYYMMDD(endDate, type)

        try {
            const res = await getData(
                `/daily/analyse_stats?startDate=${start}&endDate=${end}&${
                    chainId ? `chainId=${chainId - 1}&` : '&'
                }type=${type}`
            )
            console.log('res: ', res)

            if (res.success) {
                setStatsOfNFTsinChain(res.result)
            }
            return { success: true }
        } catch (e) {
            console.error(e)
            return { success: false }
        }
    }

    async function uploadStatisticImage(file: File) {
        const formData = new FormData()
        formData.append('file', file, file.name)
        console.log(typeof formData)
        const res = await postData<unknown>('/analyse', formData, true)
        return res
    }

    async function startAnalyse(id: number) {
        const res = await axios.post('/analyse/' + id)
        return res
    }

    async function getAnalyzeProcessStatus(id: number) {
        const res = await getData('/analyse_status/' + id)
        return res
    }

    return {
        getAnalyseStatistics,
        getStatOfNFTsInChain,
        getAnalyseStats,
        uploadStatisticImage,
        startAnalyse,
        getAnalyzeProcessStatus,
    }
}

export default useStatistics
