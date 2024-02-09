import React from "react";
import SalesRegStatusRow from "./SalesRegStatusRow";
import Pagination from "@/components/ui/pagination/Pagination";
import useArtworks from "@/features/artwork/useArtworks";
import { getAuthToken } from "@/common/token/token";
import { useEffect } from "react";
import { useState } from "react";
import useToken from "@/common/token/useToken";
import { usePopupCtx } from "@/common/popup/usePopupCtx";

function SalesRegStatusTable() {
    const { getMediaSalesStatus, getProductCount, productSalesStatus } =
        useArtworks();
    const { getAuthToken } = useToken();
    const [token, setToken] = useState();
    const [totalProductCount, setTotalProductCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;
    const { setPopupState } = usePopupCtx();

    useEffect(() => {
        getAuthToken().then((res) => {
            setToken(res)


            if (res) {
                getProductCount({ accessToken: res })
                    .then((res) => {
                        if (res.status == 200) {
                            setTotalProductCount(+res.data.count);
                        }
                    })
                    .catch((err) => console.log(err));
                getMediaSalesStatus({
                    accessToken: res,
                    itemsPerPage: itemPerPage,
                    startPage: currentPage,
                    arrange: "desc",
                    sortOption: "productId",
                });
                setPopupState(prev => ({
                    ...prev, getMediaSalesStatusPayload: {
                        accessToken: res,
                        itemsPerPage: itemPerPage,
                        startPage: currentPage,
                        arrange: "desc",
                        sortOption: "productId",
                    }
                }))
            }
        });
    }, [currentPage]);

    return (
        <div>
            <div className="product-item offers">
                <div className="content">
                    <div className="table-heading">
                        <div className="column">번호</div>
                        <div className="column">미디어 이름</div>
                        <div className="column">대상 권리</div>
                        <div className="column">가격</div>
                        <div className="column">일자</div>
                        <div className="column">이용조건</div>
                    </div>
                    {productSalesStatus && productSalesStatus?.map((product, index) => {
                        return <SalesRegStatusRow key={"sales" + index} data={product} />
                    })}
                    <Pagination
                        totalProductCount={totalProductCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={Math.ceil(totalProductCount / itemPerPage)}
                    />
                </div>
            </div>
        </div>
    );
}

export default SalesRegStatusTable;
