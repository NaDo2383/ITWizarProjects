import { useRouter } from 'next/navigation'
import React from 'react'
import { OutlineBtn } from '../../button/Button'

interface IEmptyState {
    title?: string
    subtitle?: string
    showReset?: boolean
}

function EmptyState({
    title = 'No Exact matches',
    subtitle = 'Try changing or removeing some of your filters',
    showReset,
}: IEmptyState) {
    const router = useRouter()

    return (
        <div className="h-[60vh] flex flex-col gap-8 justify-center items-center">
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
            <div className="mt-12">
                {showReset && <OutlineBtn onClick={() => router.push('/admin/menu')}>Remove all filters</OutlineBtn>}
            </div>
        </div>
    )
}

export default EmptyState
