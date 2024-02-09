import useMyPageTranslation from 'locale/useMypageTranslation'
import React from 'react'
import { MdOutlineImageNotSupported } from 'react-icons/md'

function ItsEmpty({fontSize}) {
    const { itIsEmptyI18 } = useMyPageTranslation()
    
  return (
    <div className='flex flex-col items-center text-[#666] py-[180px]'>
        <MdOutlineImageNotSupported fontSize={ fontSize || 100 } />
        <p className='font-bold'>{itIsEmptyI18}</p>
    </div>
  )
}

export default ItsEmpty