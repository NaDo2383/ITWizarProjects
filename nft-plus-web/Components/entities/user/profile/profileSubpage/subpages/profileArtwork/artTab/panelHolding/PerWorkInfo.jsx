import { ArtCreator } from 'Components/ui/_moleculs/Mini'
import Link from 'next/link'
import React from 'react'
import { subStr } from 'utils/string'
import Image from 'next/image'
import pink from "public/pink.png";
import verified from "public/verified.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function PerWorkInfo(props) {
  const {
    artworkId,
    artworkName,
    authorName,
    authorProfileImg,
    copyrightRegistered,
    exposeVerify,
    heartCount,
    isHearted
  } = props.data

  return (
    <div className='flex flex-col gap-[68px]'>
      <div className='flex gap-1 justify-between w-full flex-col items-start sm:flex-row'>
        <Link href={'/art/preview/' + artworkId} passHref>
          <a className='font-medium text-[16px]'>{subStr(artworkName, 40)}</a>
        </Link>
        <div className="flex mt-1 gap-[5px]">
          {copyrightRegistered && (
            <div className="icon">
              <Image layout="fill" objectFit="cover" src={pink} alt="pink" />
            </div>
          )}
          {exposeVerify && (
            <div className="icon">
              <Image
                layout="fill"
                objectFit="cover"
                src={verified}
                alt="verified"
              />
            </div>
          )}
        </div>
      </div>
      <div className='flex-1 flex flex-row items-stretch border-t border-[#4E4E4E] pt-[13px] relative'>
        <ArtCreator data={{ authorName, authorProfileImg }} />
        <div className="flex gap-2 justify-end w-full items-center">
              <div className="flex items-center gap-1">
                {isHearted ? (
                  <AiFillHeart
                    onClick={() => heartHandler(id, isHearted)}
                    className="heartIcon"
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() => heartHandler(id, isHearted)}
                    className="heartIcon"
                  />
                )}
                <p
                  className={`text-[14px] font-[400] text-[#ABABAB] ml-px`}>
                  {heartCount}
                </p>
              </div>
            </div>
      </div>
    </div>
  )
}

export default PerWorkInfo