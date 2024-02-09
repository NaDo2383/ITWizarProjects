import React from 'react'

function PopupContainer({ children }) {
  return (
    <div className='w-full sm:p-[30px] p-[20px] flex flex-col justify-between flex-1 overflow-auto'>
      {children}
    </div>
  )
}

export default PopupContainer