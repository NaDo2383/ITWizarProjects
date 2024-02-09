import Link from "next/link";
import React from "react";
import { PlayCircle } from "@mui/icons-material";
import { VolumeUp } from "@mui/icons-material";

function ContractView(props) {
  const { data } = props;

  return (
    <div className="flex justify-center w-full h-full">
      <Link passHref href={"/art/preview/" + data.artworkId}>
        <div className="relative cursor-pointer flex">
          {data.artworkFileType !== "IMAGE" ? (
            data.artworkFileType === "VIDEO" ? (
              <div className="relative h-full w-full">
                <video
                  className={`sm:w-[78px] sm:h-[70px] w-[50px] h-[50px] rounded-[4px] object-cover bg-white`}
                  src={data?.artworkImageUrl}
                  loop
                  autoPlay
                  muted
                  playsInline
                  alt={data.artworkImageUrl}>
                  <source
                    src={data?.artworkImageUrl}
                    type="video"
                  />
                </video>
                <div className="absolute AUDIO bottom-0 left-[2px] p-1">
                  <PlayCircle
                    style={{ width: "10px", height: "10px" }}
                  />
                </div>
              </div>
            ) : (
              <>
                <img
                  src={data.artwork3xThumbnail ? data.artwork3xThumbnail : '/art1.jpg'}
                  width="100%"
                  height="100%"
                  className="sm:w-[78px] sm:h-[70px] w-[50px] h-[50px] rounded-[4px] object-cover"
                  alt="artworkThumb3x"
                />
                <div className="absolute AUDIO bottom-0 left-[2px] p-1">
                  <VolumeUp
                    style={{ width: "10px", height: "10px" }}
                  />
                </div>
              </>
            )
          ) : (
            <img
              src={data.artwork3xThumbnail ? data.artwork3xThumbnail : '/art1.jpg'}
              width="100%"
              height="100%"
              className="sm:w-[78px] sm:h-[70px] w-[50px] h-[50px] rounded-[4px] object-cover"
              alt="artwork3xThumbnail"
            />
          )}
        </div>
      </Link>
    </div>
  );
}

export default ContractView;
