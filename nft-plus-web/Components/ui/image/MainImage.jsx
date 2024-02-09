import React from 'react'

function MainImage({ src, height }) {
  const style = {
    height: height + 'px' || 'auto',
    minWidth: "100%",

  }
  
  return (
    <div style={style} className='masked'>
      {src ? (
        <img src={src} className='relative w-full object-cover min-h-[200px]' alt='img' />
      ) : (
        <div className='min-h-[200px] bg-[rgba(39,39,39)]'></div>
      )}
    </div>
  )
}

export default MainImage