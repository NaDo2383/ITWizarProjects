import React, { useState } from 'react'

function ArtworkFileViewer({ artwork, square, width, height }) {

  return (
    <div className="relative cursor-pointer flex justify-center items-center rounded-[5px]">
      {(artwork?.fileType === "AUDIO") ||
        (artwork?.fileType === "VIDEO" && artwork?.imageFile.url2) ||
        artwork?.fileType === "IMAGE" ? (
        <div className="relative bg-black">
          <div className='w-[70px] h-[70px] sm:w-full sm:h-full'>
            <img
              className='w-[70px] h-[70px] sm:w-full sm:h-full rounded-[5px] object-cover bg-[#181A1A]'
              style={{ borderRadius: '5px' }}
              src={
                artwork?.thumbnailUrl3x
                  ? artwork?.thumbnailUrl3x
                  : "/art1.jpg"
              }
              priority
              unoptimized
              layout="fill"
              objectFit="cover"
              alt="artwork-thumbnail"
            />
          </div>
        </div>
      ) : (
        ""
      )}
      {artwork?.fileType === "VIDEO" && (
        <div className="relative w-[70px] h-[70px] sm:w-full sm:h-full lg:w-[276px] lg:h-[276px]">
          <div
            className={!artwork?.imageFile.url2
              ? " h-full cursor-pointer w-full overflow-hidden bg-cover bg-center flex justify-center items-center"
              : "none w-0 h-0 "
            }>
            <video
              className={`w-[70px] h-[70px] sm:w-full sm:h-full rounded-[5px] object-cover bg-[#181A1A]`}
              src={
                artwork?.imageUrl}
              loop
              autoPlay
              muted
              playsInline
              alt={artwork?.imageUrl}>
              <source
                src={
                  artwork?.imageUrl}
                type="video"
              />
            </video>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArtworkFileViewer