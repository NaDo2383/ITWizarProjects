import Link from "next/link";
import React from "react";
import { BsHeart } from "react-icons/bs";
import { PlayCircle } from "@mui/icons-material";
import { VolumeUp } from "@mui/icons-material";

function PerWork(props) {
  const { data } = props;

  return (
    <div className="flex w-full h-full">
      <Link passHref href={"/art/preview/" + data?.artworkId}>
        <div className="relative cursor-pointer flex justify-center w-full h-full">
          {data?.fileType !== "IMAGE" ? (
            data?.fileType === "VIDEO" ? (
              <div className="relative h-full w-full">
                <video
                  className={`w-full h-full object-cover  bg-white`}
                  src={data?.imageUrl }
                  loop
                  autoPlay
                  muted
                  playsInline
                  alt={data?.imageUrl}>
                  <source
                    src={data?.imageUrl }
                    type="video"
                  />
                </video>
                <div className="absolute AUDIO bottom-0 left-[6px] p-2">
                  <PlayCircle
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </div>
            ) : (
              <>
                <img
                  src={data?.img ? data?.img : '/art1.jpg'}
                  width="100%"
                  height="100%"
                  className="w-full h-full object-cover"
                  alt="img"
                />
                <div className="absolute AUDIO bottom-0 left-[6px] p-2">
                  <VolumeUp
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </>
            )
          ) : (
            <img
              src={data.img ? data.img : '/art1.jpg'}
              className="w-full h-full object-cover"
              alt="img"
            />
          )}
        </div>
      </Link>
    </div>
  );
}

export default PerWork;
