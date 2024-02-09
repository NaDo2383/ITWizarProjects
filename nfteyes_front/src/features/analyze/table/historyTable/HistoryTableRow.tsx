import Checkbox, { TCheckbox } from 'components/ui/form/elements/checkbox/Checkbox'
import { TAnalyze } from 'features/analyze/store/analyzeReducer'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type TAnalyzeTableRow = Partial<TCheckbox> & {
    analyzeItem: TAnalyze
}

function AnalyzeTableRow(props: TAnalyzeTableRow) {
    const { onChange, checked, analyzeItem } = props
    console.log('analyzeItem', analyzeItem)
    const [theSrc, setTheSrc] = useState(
        analyzeItem.originalassetpath
            ? `${process.env.NEXT_BACKEND_URL}/images/view/${analyzeItem.originalassetpath}`
            : '/images/demo-artwork.png'
    )

    const date = new Date(analyzeItem.trydatetime!)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`

    return (
        <tr className={`${checked ? 'bg-blackRowHover' : ''}`}>
            <td className="text-gray-50">
                <Checkbox name={analyzeItem.id + ''} label={''} onChange={onChange} checked={checked} />
            </td>
            <td>
                <Link href={'/analysis/result/' + analyzeItem.id}>
                    <Image
                        src={theSrc}
                        width={100}
                        height={100}
                        alt="image of symbols"
                        onError={(e) => {
                            console.error(e)
                            setTheSrc('/images/demo-artwork.png')
                        }}
                    />
                </Link>
            </td>
            <td>
                <span className="text-gray-50 text-20">{analyzeItem.id}</span>
            </td>
            <td>
                <span className="text-gray-50 text-20"> {analyzeItem.originalassetname}</span>
            </td>
            <td>
                <span className="text-gray-50 text-20"> {formattedDate} </span>
            </td>
            <td>
                <span className="text-gray-50 text-20">{analyzeItem.step === 4 ? 'Complete' : 'In progress'}</span>
            </td>
        </tr>
    )
}

export default AnalyzeTableRow
