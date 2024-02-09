import React, { useEffect, useState } from "react";
import useArtwork from "Components/entities/artwork/useArtwork";
import DesiredNFTCard from "./DesiredNFTCard";
import Pagination from "Components/ui/pagination/Pagination";
import { useGlobalContext } from "common/global/useGlobalContext";
import NodataMessage from "Components/ui/error/NodataMessage";
import useCommonTranslation from "locale/useCommonTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";

function DesiredNft() {
  const {desiredNFTI18} = useMyPageTranslation()
  const { noDesiredNftI18 } = useCommonTranslation()
  const {
    artworksByFavorited,
    getFavoritedArtworks
  } = useArtwork();
  const [pageNum, setPageNum] = useState(0);
  const { authUser, globalLoading } = useGlobalContext()
  const paginate = (num) => {
    setPageNum(num);
  };

  useEffect(() => {
    getFavoritedArtworks(pageNum)
  },[pageNum, authUser?.id])
  
  return (
    <div>
        <h6 className="text-[15px] font-[500] text-[#DDD] text-center sm:hidden mt-[30px] mb-[15px]">{desiredNFTI18}</h6>
      {artworksByFavorited?.result?.content?.length > 0 ? (
        <>
          <div className="flex justify-center">
            <div className="w-full mt-[30px] grid md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 gap-[12px]">
              {artworksByFavorited?.result?.content.map((artwork, idx) => (
                <>
                  <DesiredNFTCard key={"desired-art-" + idx} {...artwork} />
                </>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-center pt-[100px]">
            <Pagination
                data={artworksByFavorited?.result?.content}
                current={artworksByFavorited?.result?.number}
                totalPages={artworksByFavorited?.result?.totalPages}
                toLastPage={paginate}
                toFirstPage={paginate}
                toPrevPage={paginate}
                toNextPage={paginate}
                changePage={paginate}
            />
          </div>
        </>
      ) : (globalLoading === false &&
        <NodataMessage text={noDesiredNftI18} />
      )}
    </div>
  )
}

export default DesiredNft