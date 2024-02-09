import useMyPageTranslation from 'locale/useMypageTranslation'
import React from 'react'
import { MdOutlineImageNotSupported } from 'react-icons/md'

function NoContent({fontSize}) {
    const { noContentsI18 } = useMyPageTranslation()
    
  return (
    <div className='flex flex-col items-center text-[#666]'>
        <MdOutlineImageNotSupported fontSize={ fontSize || 100 } />
        <p className='font-bold'>{noContentsI18}</p>
    </div>
  )
}

export default NoContent