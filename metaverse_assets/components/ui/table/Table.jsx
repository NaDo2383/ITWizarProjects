import React from 'react'

export default function Table({ items_offer_data, tableHeader }) {
    return (
        <div
            role="table"
            className="scrollbar-custom dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 grid w-full grid-cols-5 overflow-auto rounded-lg rounded-tl-none border bg-white text-sm dark:text-white mb-3"
        >
            <div className="contents" role="row">
                {tableHeader.map((header, index) => {
                    return (
                        <div
                            key={'bdfjsak' + index}
                            className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4 w-full"
                            role="columnheader"
                        >
                            <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis flex justify-center">
                                {header}
                            </span>
                        </div>
                    )
                })}
            </div>
            {items_offer_data.map((item, index) => {
                return (
                    <div className="contents" role="row" key={'bfdjksa' + index}>
                        {Object.values(item).map((value, index) => {
                            return (
                                <div
                                    key={'NFBjikdlbna' + index}
                                    className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4 w-full justify-center break-words flex-wrap whitespace-pre-wrap text-center"
                                    role="cell"
                                >
                                    {value}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
