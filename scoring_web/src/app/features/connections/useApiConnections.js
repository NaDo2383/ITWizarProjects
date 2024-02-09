"use client"
import { useCrud } from "../../common/axios/crud"
import { useGlobalCtx } from "../../common/global/useGlobalCtx"

export default function useApiConnections() {
    const { getData, postData, putData } = useCrud()
    const {
        setFormulaDataList,
        setLoading,
        setFormulaDataDetail,
        setRatioIndicator,
        setDashboardData,
        setLoanHolderDetail,
        setLoanHoldersData,
    } = useGlobalCtx()
    const server = process.env.SERVER

    async function getFormulaDataList() {
        setLoading(true)
        try {
            const res = await getData(`${server}/formuladata`, true)
            if (res.status === 200) {
                setFormulaDataList(res?.data?.result)
            }
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function getFormulaDataDetail(id) {
        setLoading(true)
        try {
            const res = await getData(`${server}/formuladata/${id}`, true)
            if (res.status === 200) {
                setFormulaDataDetail(res?.data?.result)
            }
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function getRatioIndicator() {
        setLoading(true)
        try {
            const res = await getData(`${server}/ratio_indicator`, true)
            if (res.status === 200) {
                setRatioIndicator(res?.data?.result)
            }
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function getDashboardData() {
        setLoading(true)
        try {
            const res = await getData(`${server}/dashboard`, true)
            if (res.status === 200) {
                setDashboardData(res?.data)
            }
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function getLoanHolderDetailData(id) {
        setLoading(true)
        try {
            const res = await getData(`${server}/holders/${id}`, true)
            if (res.status === 200) {
                setLoanHolderDetail(res?.data?.result)
            }
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function getLoanHoldersData({ size, page }) {
        setLoading(true)
        try {
            const res = await getData(
                `${server}/holders?size=${size}&page=${page - 1}`,
                true
            )
            if (res.status === 200) {
                setLoanHoldersData(res?.data?.result)
                return res?.data?.result
            }
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function sendFormData(payload) {
        setLoading(true)
        try {
            const res = await postData(`${server}/scoring`, payload, true)
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function editRatioData(payload) {
        setLoading(true)
        try {
            const res = await postData(`${server}/ratio_indicator`, payload, true)
            res.data.message === "Амжилттай" && getRatioIndicator()
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    async function editFormulaData(id, payload) {
        setLoading(true)
        try {
            const res = await putData(`${server}/formuladata/${id}`, payload, true)
            res.data.message === "Амжилттай" && getFormulaDataList()
            return res
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return {
        getFormulaDataList,
        getFormulaDataDetail,
        getRatioIndicator,
        getDashboardData,
        getLoanHolderDetailData,
        getLoanHoldersData,
        sendFormData,
        editRatioData,
        editFormulaData,
    }
}
