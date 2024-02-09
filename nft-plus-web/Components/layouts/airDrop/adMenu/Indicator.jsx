import React from 'react'

function Indicator({ activeMenuIdx }) {

    const style = {
        transform: `translateX(${activeMenuIdx * 100}%)`
    }
  return (
    <div className='absolute bottom-0 h-[2px] bg-green-500'>
        <div className='absolute top-0 left-0 w-full h-full bg-[#f00] transition-transform' style={style} />
    </div>
  )
}

export default Indicator