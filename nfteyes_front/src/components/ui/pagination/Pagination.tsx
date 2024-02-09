import React from 'react'

interface IPagination {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    onChange: (page: number) => void
}

function Pagination(props: IPagination) {
    const { totalItems, itemsPerPage, currentPage, onChange } = props

    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination-container">
            <p className="text-emerald-700 font-bold">
                Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
                {totalItems}
            </p>
            <ul className="pagination">
                <li>
                    <button className={currentPage === 1 ? 'pagination-active' : ''}>&laquo;</button>
                </li>
                {currentPage > 2 && <div className="flex items-end font-bold text-emerald-700">. . </div>}
                {pageNumbers?.map(
                    (number) =>
                        number >= currentPage - 2 &&
                        number <= currentPage + 2 && (
                            <li key={number}>
                                <button
                                    className={number === currentPage ? 'bg-emerald-700 text-white' : 'bg-white'}
                                    onClick={() => onChange(number)}
                                >
                                    {number}
                                </button>
                            </li>
                        )
                )}
                {currentPage < pageNumbers.length - 2 && (
                    <div className="flex items-end font-bold text-emerald-700">. . .</div>
                )}
                <li>
                    <button className={currentPage === totalPages ? 'active' : ''}>&raquo;</button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination
