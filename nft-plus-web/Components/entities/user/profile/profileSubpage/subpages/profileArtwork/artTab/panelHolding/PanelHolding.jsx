import React, { useEffect } from "react";
import Loader from "Components/ui/loader";
import useArtwork from "Components/entities/artwork/useArtwork";
import ItsEmpty from "Components/ui/error/ItsEmpty";
import PerWork from "./PerWork";
import PerWorkInfo from "./PerWorkInfo";
import axios from "axios";

function HoldingPanel() {
  const {
    changeArtPagination,
    getStockArtworks,
    artPagination,
    setArtPagination,
    artworkLoading,
    artworksByStocked
  } = useArtwork();

  useEffect(() => {
    getStockArtworks({
      size: 8
    });
    return () => {
      setArtPagination((prev) => ({ ...prev, page: 1 }));
    };
  }, []);

  return (
    <>
      {artworkLoading?.artworksByStockedLoading ? (
        <Loader />
      ) : (
        <>
          {artworksByStocked?.result?.content?.length > 0 ? (
            <>
              {artworksByStocked?.result.content.map((artwork, idx) => {
                const {
                  id: artworkId,
                  heartCount,
                  artworkName,
                  authorName,
                  authorId,
                  authorProfileImg,
                  tamtamApproved,
                  copyrightRegistered,
                  exposeVerify,
                  isVerified,
                  fileType,
                  imageUrl
                } = artwork;
                return (
                  <>
                  <div className="w-full">
                    <div
                      className={`w-full h-[470px] rounded-2xl overflow-hidden rounded-t-[20px] recent-work`}>
                      <div className="w-full h-2/3 relative">
                        <div className="h-full w-full">
                          <PerWork
                            data={{
                              artworkId,
                              img: artwork.thumbnailUrl2x,
                              heartCount,
                              fileType,
                              imageUrl
                            }}
                          />
                        </div>
                      </div>
                      <div className={`py-[15px] px-[20px] flex-1 rounded-b-[20px] bg-black`}>
                        <div className="w-full flex flex-col text-left h-full">
                          <PerWorkInfo
                            data={{
                              artworkId,
                              artworkName,
                              authorName,
                              authorProfileImg,
                              tamtamApproved,
                              copyrightRegistered,
                              exposeVerify,
                              isVerified
                            }} />
                        </div>
                      </div>
                    </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <ItsEmpty />
          )}
        </>
      )
      }
    </>
  )
}

export default HoldingPanel;
