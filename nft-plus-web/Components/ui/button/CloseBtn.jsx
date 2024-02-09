import Image from 'next/image'
import React from 'react'

function CloseBtn({ onClick }) {
  return (
    <button onClick={onClick} className='sm:w-[29px] sm:h-[29px] w-[20px] h-[20px]'>
        <Image  src={'/close.png'} width={29} height={29} alt='close-button' className='cursor-pointer' />
    </button>
  )
}

export default CloseBtn