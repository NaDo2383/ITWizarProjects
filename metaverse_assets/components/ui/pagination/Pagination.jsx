import React from 'react'
import tw from 'tailwind-styled-components'
import ChevronIcon from '../icon/ChevronIcon'

function Pagination({ currentPage, setCurrentPage, totalPages }) {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const renderVisiblePages = () => {
        const visiblePages = []

        if (totalPages < 5) {
            visiblePages.push(...pages)
        } else {
            const startPage = Math.max(currentPage - 2, 0)
            const endPage = Math.min(currentPage + 2, totalPages)

            if (currentPage <= 2) {
                visiblePages.push(...pages.slice(0, 5))
            } else if (currentPage >= totalPages - 3) {
                visiblePages.push(...pages.slice(totalPages - 5, totalPages))
            } else {
                visiblePages.push(...pages.slice(startPage, endPage + 1))
            }
        }

        return visiblePages.map((page, index) => (
            <Page
                onClick={() => setCurrentPage(page)}
                active={(page === currentPage).toString()}
                key={'gbajrb' + index}
            >
                {page}
            </Page>
        ))
    }

    return (
        <ul className="flex gap-1 justify-center">
            <Page onClick={() => setCurrentPage((prev) => (prev == 1 ? prev : prev - 1))}>
                <ChevronIcon className="rotate-90" />
            </Page>
            {renderVisiblePages()}
            <Page
                onClick={() =>
                    setCurrentPage((prev) => (prev == totalPages ? prev : prev + 1))
                }
            >
                <ChevronIcon className="-rotate-90" />
            </Page>
        </ul>
    )
}

export default Pagination

const Page = tw.div`
    w-[36px]
    h-[36px]
    flex
    items-center
    justify-center
    text-[16px]
    font-bold;
    transition
    rounded-xl
    border
    border-accent
    ${(props) => (props.active === 'true' ? 'bg-accent' : 'none')};
    color: ${(props) => props.active === 'true' && 'black'};
    hover:bg-accent-lighter
    hover:text-white
    h ${(props) => (props.active === 'true' ? 'text-white' : 'none')};
    cursor-pointer
`
