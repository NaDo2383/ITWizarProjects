import Card from "@/components/ui/card/Card";
import Pagination from "@/components/ui/pagination/Pagination";
import React, { useState } from "react";
import useArtworks from "../useArtworks";
import { useEffect } from "react";
import CardSkeleton from "@/components/ui/card/CardSkeleton";
import { getAuthToken } from "@/common/token/token";

function ArtworkList() {
    const { getArtworkList, artworkList, getProductCountForArtworkList } = useArtworks();
    const [totalProductCount, setTotalProductCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;



    useEffect(() => {
        getProductCountForArtworkList()
            .then((res) => {
                if (res.status == 200) {
                    setTotalProductCount(+res.data.code);
                }
            })
            .catch((err) => console.log(err));
        getArtworkList(currentPage, itemPerPage);

    }, [currentPage]);

    return (
        <div className="tf-section-3 discover-item mt-30">
            <div className="themesflat-container">
                <div className="row">
                    {artworkList?.length > 0 ? (
                        <>
                            {artworkList?.map((artwork, index) => (
                                <Card
                                    key={"artworkListCard" + index}
                                    artwork={artwork}
                                />
                            ))}
                            <Pagination
                                totalProductCount={totalProductCount}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={Math.ceil(totalProductCount / itemPerPage)}
                            />
                        </>
                    ) : (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ArtworkList;
