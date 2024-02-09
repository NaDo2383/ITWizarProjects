import React from 'react'
import Image from 'next/image'
import useArtworkTranslation from 'locale/useArtworkTranslation'
import useArtDetail from '../useArtDetail'

function DetailPanel2() {
    const { 
            tamtamWriterI18, 
            copyrightedWorkI18, 
            verificationCertificateI18
    } = useArtworkTranslation()
    const { artDetail } = useArtDetail()
	
  return (
    <>
        {
            artDetail?.tamtamApproved && (
				<li className="bg-[#111111] rounded-full px-[12px] py-1 flex items-center border-[0.5px] border-[#C5C8D2]">
					<Image  src='/star.png' alt="" width={18} height={18} />
					<span className="mx-1 sm:text-[16px] text-[12px]">{tamtamWriterI18}</span>
				</li>
		)}
	    {
            artDetail?.copyrightRegistered && (
				<li className="bg-[#111111] rounded-full px-[12px] py-1 flex items-center border-[0.5px] border-[#C5C8D2]">
					<Image  src='/pink.png' alt="star" width={18} height={18} />
					<span className="mx-1 sm:text-[16px] text-[12px]">{copyrightedWorkI18}</span>
				</li>
		)}
		{
            artDetail?.isVerified && artDetail?.exposeVerify && (
				<li className="bg-[#111111] rounded-full px-[12px] py-1 flex items-center border-[0.5px] border-[#C5C8D2]" onClick={informationHandler}>
					<Image  src='/verified.png' alt="verified" width={18} height={18} />
					<span className="mx-1 sm:text-[16px] text-[12px]">{verificationCertificateI18}</span>
				</li>
		)}
    </>
  )
}

export default DetailPanel2