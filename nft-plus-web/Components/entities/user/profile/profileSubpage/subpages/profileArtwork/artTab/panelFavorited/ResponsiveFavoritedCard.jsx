import React from 'react'
import Link from "next/link";
import Image from "next/image";
import star from "public/star.png";
import defPro from "public/def_pro.png";
import verified from "public/verified.png";
import pink from "public/pink.png";
import { subStr } from "utils/string";
import { BsHeart } from 'react-icons/bs'
import useMyPageTranslation from 'locale/useMypageTranslation';

function ResponsiveFavoritedCard(props) {
    const {
        id,
        thumbnailUrl3x,
        artworkName,
        name, // зарим artwork - той холбоотой api нь artworkName эсвэл name гэж ирж бган бна
        tamtamApproved,
        copyrightRegistered,
        exposeVerify,
        authorId,
        authorName,
        heartCount,
        authorImage,
        currentUser
    } = props
    const {
        creativeWorkI18,
        transactionWorkI18,
        ownershipI18,
    } = useMyPageTranslation();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center border-b p-6">
            <Link passHref href={`/art/preview/${id}`}>
                <div className='relative cursor-pointer flex justify-center items-center w-fit'>
                    <img src={thumbnailUrl3x} width="100%" height="100%" className='w-[160px] h-[135px] rounded-xl object-cover' alt="thumbnailUrl3x" />
                    <button className='absolute right-2 bottom-2 flex items-center gap-1 px-3 rounded-xl bg-white'>
                        <span className='pt-[1px]'><BsHeart fontSize={12} /></span>
                        <span>{heartCount}</span>
                    </button>
                </div>
            </Link>
            <div className="flex mt-2 gap-[5px]">
                {tamtamApproved && (
                    <div className="w-[20px] h-[20px] mb-2 md:mb-0 overflow-hidden relative">
                        <Image layout="fill" objectFit="cover" src={star} alt="star" />
                    </div>
                )}
                {copyrightRegistered && (
                    <div className="w-[20px] h-[20px] mb-2 md:mb-0 overflow-hidden relative">
                        <Image layout="fill" objectFit="cover" src={pink} alt="pink" />
                    </div>
                )}
                {exposeVerify && (
                    <div className="w-[20px] h-[20px] mb-2 md:mb-0 overflow-hidden relative">
                        <Image
                            layout="fill"
                            objectFit="cover"
                            src={verified}
                            alt="verified"
                        />
                    </div>
                )}
            </div>
            <Link href={`/art/preview/${id}`} passHref>
                <a className='font-bold pb-2'>{subStr(artworkName, 40)}</a>
            </Link>
            <div className='flex flex-row justify-center items-center mb-2'>
                <div
                    className={`card-avatarImg relative items-center`}>
                    <Image
                        width={!authorImage && 30}
                        height={!authorImage && 30}
                        unoptimized
                        alt="authorImage"
                        layout="fill"
                        objectFit="cover"
                        src={authorImage ? authorImage : defPro}
                    />
                </div>
                <p className="ml-2 text-[#444] text-base md:text-lg truncate flex-1 sm:text-lg  font-[400]">
                    <Link href={`/artist/${authorId}`} passHref>
                        <a>{authorName}</a>
                    </Link>
                </p>
            </div>
            <div className="flex flex-row mb-3 items-center justify-center">
                <p className="font-[300] pr-3 mr-3 border-r text-[#333] tracking-[-1px]">
                    {authorId == currentUser?.id
                        ? creativeWorkI18
                        : transactionWorkI18}
                </p>
                <p className="font-[300] text-[#333] tracking-[-1px]">
                    {ownershipI18}:{" "}
                </p>
                <p className="pl-4 font-[600] text-[#333]  tracking-[-1px]">
                    {authorName}
                </p>
            </div>
        </div>
    )
}

export default ResponsiveFavoritedCard