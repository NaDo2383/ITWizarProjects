import React, { useEffect, useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import pro from "public/def_pro.png";
import Image from 'next/image';
import Link from 'next/link';
import { getLocal } from "utils/storage";
import xIcon from "public/xIcon.svg";
import xWhiteIcon from "public/xWhiteIcon.svg"

function ArtistProfile(props) {
  const {
    name,
    avatar,
    description,
    instagram,
    facebook,
    twitter,
  } = props
  const user = getLocal("user")?.result;
  const [isHover, setIsHover] = useState(false)

  {/*useEffect(() => {
    if(!user) {
      router.push('/')
    }
  })*/}

  return (
    <div className="w-full relative" >
      <div
        className="w-[80px] h-[80px] absolute rounded-full bg-white"
        style={{
          top: "-3.5rem",
          left: "calc(50% - 2.5rem)"
        }}>
        <div className={`w-full h-full relative rounded-full bg-white overflow-hidden`}>
          <div className={`w-full h-full rounded-full overflow-hidden relative bg-[#333] border-[#999] border ${avatar ? "" : "flex items-end justify-center"}`}>
            <Image
              unoptimized
              priority
              src={avatar ? avatar : pro}
              alt="avatar"
              objectFit={avatar ? "cover" : ""}
              layout={avatar ? "fill" : ""}
            />
          </div>
        </div>
      </div>
      <div className="w-full relative flex justify-center pt-[30px] items-center">
        <div className="flex items-center gap-2 justify-center">
          <h5 className="text-[16px] sm:text-[18px] font-[500]">
            {name}
          </h5>
        </div>
      </div>
      <div className="w-100 sm:mt-[11px] mb-[20px] mx-5">
        <div className="container mx-auto lg:px-20 px-4">
          <p className="text-[14px] sm:text-[16px] text-[#7B7B7B] font-400 text-center lg:px-40 px-2">{description}</p>
        </div>
      </div>
      <div className='flex flex-row gap-2 justify-center items-center'>
        {instagram &&
          <Link passHref href={instagram}>
            <div className='border border-[#999999] hover:border-[#fff] rounded-full p-[3px] cursor-pointer'>
              <span className='flex justify-center items-center '>
                <AiFillInstagram className='text-[#999999] hover:text-[#fff] sm:w-[20px] sm:h-[20px] w-[14px] h-[14px]' />
              </span>
            </div>
          </Link>
        }
        {twitter &&
          <Link passHref href={twitter}>
            <div onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)} className='border border-[#999999] hover:border-[#fff] rounded-full p-[3px] cursor-pointer'>
              <span className='flex justify-center items-center sm:w-[20px] sm:h-[20px] w-[14px] h-[14px]'>
                {isHover ?
                  <Image src={xWhiteIcon} alt="xWhiteIcon"/>
                  :
                  <Image src={xIcon} alt="xIcon" />
                }
              </span>
            </div>
          </Link>
        }
        {facebook &&
          <Link passHref href={facebook}>
            <div className='border border-[#999999] hover:border-[#fff] rounded-full p-[3px] cursor-pointer'>
              <span className='flex justify-center items-center'>
                <FaFacebook className='text-[#999999] hover:text-[#fff] sm:w-[20px] sm:h-[20px] w-[14px] h-[14px]' />
              </span>
            </div>
          </Link>
        }
      </div>
    </div>
  )
}

export default ArtistProfile