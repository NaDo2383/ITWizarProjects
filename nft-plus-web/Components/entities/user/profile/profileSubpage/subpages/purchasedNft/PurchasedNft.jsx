import React, { useEffect, useState } from "react";
import useArtwork from "Components/entities/artwork/useArtwork";
import PurchasedNFTCard from "./PurchasedNFTCard";
import Pagination from "Components/ui/pagination/Pagination";
import NodataMessage from "Components/ui/error/NodataMessage";
import useCommonTranslation from "locale/useCommonTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import useMyPageTranslation from "locale/useMypageTranslation";

function PurchasedNft() {
    const { purchasedNFTI18 } = useMyPageTranslation();
    const { noPurchasedNftI18 } = useCommonTranslation()
    const {
        changeArtPagination,
        getStockArtworks,
        artworksByStocked
    } = useArtwork();
    const { authUser, globalLoading } = useGlobalContext();
    const [pageNum, setPageNum] = useState(0);

    const paginate = (num) => {
        setPageNum(num);
    };

    useEffect(() => {
        getStockArtworks(pageNum)
    }, [pageNum, authUser?.id])

    return (
        <>
            <div>
            <h5 className="text-[15px] font-[500] text-[#DDD] text-center sm:hidden mt-[30px] mb-[15px]">{purchasedNFTI18}</h5>
                {artworksByStocked?.result?.content?.length > 0 ? (
                    <>
                        <div className="flex justify-center">
                            <div className="w-full mt-[30px] grid md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 gap-[12px]">
                                {artworksByStocked?.result?.content.map((artwork, idx) => (
                                    <>
                                        <PurchasedNFTCard key={"purchased-art-" + idx} {...artwork} />
                                    </>
                                ))}
                            </div>
                        </div>
                        <div></div>
                        <div className="flex w-full justify-center pt-[100px]">
                            <Pagination
                                toLastPage={paginate}
                                toFirstPage={paginate}
                                toPrevPage={paginate}
                                toNextPage={paginate}
                                totalPages={artworksByStocked?.result?.totalPages}
                                data={artworksByStocked?.result?.content}
                                current={artworksByStocked?.result?.number}
                                changePage={paginate}
                            />
                        </div>
                    </>
                ) : (globalLoading === false &&
                    <NodataMessage text={noPurchasedNftI18} />
                )}
            </div>
        </>
    )
}
export default PurchasedNft