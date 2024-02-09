/**
 * @createdBy Phill Anderson 2023/3/21
 */
import React from 'react'
import Image from 'next/image'
import useArtworkTranslation from 'locale/useArtworkTranslation'

export function StampTamTam({ src, height, width }) {
  const h = height ? height : 18
  const w = width ? width : 18
  return <Image  width={w} height={h} src={src} objectFit="contain" alt="src" />
}

export function StampApproved() {
  const { tamtamWriterI18 } = useArtworkTranslation()
  return (
    <Stamp>
      <div className='w-[18px] h-[18px]'>
        <StampTamTam src={'/star.png'} />
      </div>
      <p>{tamtamWriterI18}</p>
    </Stamp>
  )
}

export function StampCopyrighted() {
  const { copyrightedWorkI18 } = useArtworkTranslation()
  return (
    <Stamp>
      <div className='w-[18px] h-[18px]'>
        <StampTamTam src={'/pink.png'} />
      </div>
      <p>{copyrightedWorkI18}</p>
    </Stamp>
  )
}

export function StampVerified() {
  const { verificationCertificateI18 } = useArtworkTranslation()
  return (
    <Stamp>
      <div className='w-[18px] h-[18px]'>
        <StampTamTam src={'/verified.png'} />
      </div>
      <p>{verificationCertificateI18}</p>
    </Stamp>
  )
}

function Stamp({ children }) {
  return (
    <div className='flex gap-1 py-[2px] pl-1 pr-2 text-sm text-[#4E4949] font-[400] rounded-2xl  border border-[#c5c8d2] cursor-pointer hover:border-[#ff5cf8]'>
      {children}
    </div>
  )
}
