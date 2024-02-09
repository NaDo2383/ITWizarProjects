import PaginationNice from "Components/ui/pagination/PaginationNice";
import React from "react";
import useArtwork from "Components/entities/artwork/useArtwork";
import FavoritedCard from "./FavoritedCard";
import ItsEmpty from "Components/ui/error/ItsEmpty";
import { useGlobalContext } from "common/global/useGlobalContext";

function FavoritedArtList() {
  const { authUser, globalLoading } = useGlobalContext();
  const {
    artworksByFavorited,
    changeArtPagination,
    artPagination,
    getFavoritedArtworks
  } = useArtwork();

  async function handlePagination(e, value) {
    await changeArtPagination(value);
    await getFavoritedArtworks(value);
  }
  
  return (
    <div>
      {artworksByFavorited?.result?.content?.length > 0 ? (
        <>
          <div className="flex justify-center">
            <div className="w-full mt-[30px] grid md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 gap-[12px]">
              {artworksByFavorited?.result?.content.map((artwork, idx) => (
                <>
                  <FavoritedCard key={"favorited-art-" + idx} {...artwork} />
                </>
              ))}
            </div>
          </div>
          <div></div>
          <div className="flex w-full justify-center pt-[100px]">
            <PaginationNice
              data={{ data: artworksByFavorited, page: artPagination?.page }}
              onChange={handlePagination}
            />
          </div>
        </>
      ) : (globalLoading === false &&
        <ItsEmpty />
      )}
    </div>
  );
}

export default FavoritedArtList;
