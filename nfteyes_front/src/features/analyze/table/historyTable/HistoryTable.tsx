import React, { useCallback, useEffect, useState } from 'react'
import Table, { ITable } from 'components/ui/table/Table'
import HistoryTableRow from './HistoryTableRow'
import Checkbox from 'components/ui/form/elements/checkbox/Checkbox'
import useForm from 'components/ui/form/store/useForm'
import useAnalyze from 'features/analyze/store/useAnalyze'
import { useAnalyzeCtx } from 'features/analyze/store/useAnalyzeCtx'
import { TAnalyze } from 'features/analyze/store/analyzeReducer'
import Flex from 'components/ui/containers/flex/Flex'
import { OutlineBtn } from 'components/ui/button/Button'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
import { useRouter } from 'next/router'

type TAnalyzeTable = Pick<ITable, 'noPagination'>
interface ICheckboxList {
    item?: any
    isAll?: boolean
}
const initialFormState = {}

function HistoryTable(props: TAnalyzeTable) {
    const { reload } = useRouter()
    const { formState, resetList, onChangeGroupCheckbox } = useForm(initialFormState)
    const { analyzeState } = useAnalyzeCtx()
    const { getAnalisys, deleteMultiple } = useAnalyze()
    const [allChecked, setAllChecked] = useState<boolean>(false)
    const { setIsLoadingGlobal } = useSiteGlobalCtx()

    const checkedAnalysisIds: Array<number> = []

    formState.checkedList &&
        Object?.entries(formState.checkedList)?.forEach((element) => {
            if (element[1]?.value === 'true') {
                checkedAnalysisIds.push(+element[0])
            }
        })

    // устгахаар сонгогдсон id - нууд
    // console.log('checkedAnalysisIds', checkedAnalysisIds)
    // console.log(formState)
    // console.log('analyzeState', analyzeState)

    useEffect(() => {
        getAnalisys()
    }, [])

    function selectAllIds(): Array<number> {
        const allIds: Array<number> = []
        for (let element of analyzeState.analyzeList.result) {
            allIds.push(element.id)
        }
        return allIds
    }

    const handleCheckbox = useCallback((e: React.ChangeEvent<HTMLFormElement>, payload: ICheckboxList) => {
        if (payload.isAll) setAllChecked(e?.target?.checked)
        else onChangeGroupCheckbox('checkedList', payload.item.id, payload.item.value)
    }, [])

    async function handleMultipleDelete(e: React.FormEvent): Promise<void> {
        e.preventDefault()
        setIsLoadingGlobal(true)
        try {
            let payload: Array<number> = []
            if (allChecked) {
                const allIds: Array<number> = selectAllIds()
                payload = allIds
            } else {
                payload = checkedAnalysisIds
            }

            if (payload.length === 0) return

            const res = await deleteMultiple(payload)
            if (res.result) {
                alert('Successfully deleted records!')
                // getAnalisys()
                resetList('checkedList')
                reload()
            }
        } finally {
            setIsLoadingGlobal(false)
        }
    }

    return (
        <form>
            <Flex className="w-full justify-end mb-15">
                <OutlineBtn onClick={handleMultipleDelete} className=" w-[72px]">
                    삭제
                </OutlineBtn>
            </Flex>
            <Table {...props}>
                <colgroup>
                    <col span={1} />
                    <col span={2} />
                    <col span={2} />
                    <col span={2} />
                    <col span={2} />
                    <col span={2} />
                </colgroup>
                <thead>
                    <tr>
                        <td>
                            <Checkbox name={'all'} onChange={(e) => handleCheckbox(e, { isAll: true })} />
                        </td>
                        <td>Thumbnail</td>
                        <td>Analysis ID</td>
                        <td>Analyzed Image</td>
                        <td>Analysis Request Date</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {analyzeState.analyzeList.result.length > 0 ? (
                        analyzeState.analyzeList.result?.map((item: TAnalyze, idx: number) => (
                            <HistoryTableRow
                                key={'history-item-' + idx}
                                onChange={(e) => handleCheckbox(e, { item: { id: item.id, value: e.target.checked } })}
                                analyzeItem={item}
                                checked={allChecked}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No Data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </form>
    )
}

export default HistoryTable
