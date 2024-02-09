import Table, { ITable } from 'components/ui/table/Table'
import React from 'react'
import AnalyzeTableRow from './AnalyzeTableRow'
import { useAnalyzeCtx } from 'features/analyze/store/useAnalyzeCtx'
import { TAnalyzeResults } from 'features/analyze/store/analyzeReducer'

type TAnalyzeTable = Pick<ITable, 'noPagination'>

function AnalyzeTable(props: TAnalyzeTable) {
    const { analyzeState } = useAnalyzeCtx()

    return (
        <Table {...props}>
            <thead>
                <tr>
                    <td>Chain</td>
                    <td className="px-22">Block number</td>
                    <td className="px-22">Contract address</td>
                    <td>NFT Title</td>
                    <td className="px-22">Owner address</td>
                    <td>Token ID</td>
                    <td className="px-22">MetaData URL</td>
                    <td>Extend info</td>
                </tr>
            </thead>
            <tbody>
                {analyzeState.analyzeResult?.analyseResults?.map((item: TAnalyzeResults) => (
                    <AnalyzeTableRow key={item.id} analyzeResultItem={item} />
                ))}
            </tbody>
        </Table>
    )
}

export default AnalyzeTable
