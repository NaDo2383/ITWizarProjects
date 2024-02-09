import React from 'react'
import ProfileImg from 'Components/ui/profileImg/ProfileImg';
import { PlayCircle } from "@mui/icons-material";
import { VolumeUp } from "@mui/icons-material";

function LicenseImgWithInfo(props) {
  const { img, artworkName, humanName, artwork } = props
  
  return (
    <div className='flex gap-[20px] p-[10px] bg-[#111111] w-full'>
      {/* <img 
            src={img} 
            width={102} 
            height={102} 
            alt={artworkName} 
            className='rounded-[5px]'  
        /> */}
      <div className="relative cursor-pointer flex justify-center min-w-[103px] max-h-[103px]">
        {artwork?.artworkFileType !== "IMAGE" ? (
          artwork?.artworkFileType === "VIDEO" ? (
            <div className="relative h-full w-full">
              <video
                className={`w-full h-full rounded-xl object-cover  bg-white`}
                src={artwork?.artworkImageUrl}
                loop
                autoPlay
                muted
                playsInline
                alt={artwork.artworkImageUrl}>
                <source
                  src={artwork?.artworkImageUrl}
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
                src={artwork?.artwork3xThumbnail || artwork?.thumbnailUrl3x || '/art1.jpg'}
                width={103}
                height={103}
                className='rounded-xl object-cover aspect-square'
                alt="artwork-thumbnail"
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
            src={artwork?.artwork3xThumbnail ? artwork?.artwork3xThumbnail : '/art1.jpg'}
            width="100%"
            height="100%"
            className="w-full h-full rounded-xl object-cover"
            alt="artwork-thumbnail"
          />
        )}
      </div>

      <div className="flex flex-col gap-[35px] w-full">
        <h2 className='text-white text-[16px] min-h-[36px]'>{artworkName}</h2>
        <div className='flex gap-2 w-full pt-[7px] border-t border-[#4E4E4E]'>
          <ProfileImg />
          <span className='text-[#B1B1B1] text-[14px]'>{humanName}</span>
        </div>
      </div>
    </div>
  )
}

export default LicenseImgWithInfo