import React from "react";
import Link from "next/link";
import styled from "styled-components";
function Pagination({ totalProductCount, currentPage, setCurrentPage, totalPages }) {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const renderVisiblePages = () => {
        const visiblePages = [];

        if (totalPages < 5) {
            visiblePages.push(...pages);
        } else {
            const startPage = Math.max(currentPage - 2, 0);
            const endPage = Math.min(currentPage + 2, totalPages);

            if (currentPage <= 2) {
                visiblePages.push(...pages.slice(0, 5));
            } else if (currentPage >= totalPages - 3) {
                visiblePages.push(...pages.slice(totalPages - 5, totalPages));
            } else {
                visiblePages.push(...pages.slice(startPage, endPage + 1));
            }
        }

        return visiblePages.map((page, index)=>(
            <Page
                onClick={()=> setCurrentPage(page)}
                active={(page === currentPage).toString()}
                key={"gbajrb"+index}
            >{page}</Page>
        ))
    };

    return (
        <div className="col-12">
            <div className="widget-pagination">
                <ul className="justify-center">
                    <Page onClick={()=>setCurrentPage(prev => prev == 1 ? prev : prev-1)}>
                        <i className="icon-keyboard_arrow_left" />
                    </Page>
                    {renderVisiblePages()}
                    <Page onClick={()=>setCurrentPage(prev => prev == totalPages ? prev : prev+1)}>
                        <i className="icon-keyboard_arrow_right" />
                    </Page>
                </ul>
            </div>
        </div>
    );
}

export default Pagination;

const Page = styled.div`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    line-height: 150%;
    transition: all .3s ease;
    border-radius: 10px;
    border: 1px solid hsla(0,0%,100%,.12);
    background-color: ${(props) => props.active === "true" && "#ddf247"};
    color : ${(props) => props.active === "true" && "black"};
    &:hover,
    &:focus {
        background-color: #ddf247;
        color : black;
    }
    cursor: pointer;
`