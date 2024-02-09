import React from 'react'

function MainCard({ width, children }) {
    const style = {
      minWidth: `${width}px` || '200px'
    }
  return (
    <div style={style} className='flex flex-col sm:rounded-[20px] rounded-[5px] relative overflow-hidden bg-[#000000]'>
        { children }
    </div>
  )
}

MainCard.Header = ({ height, children }) => {

      const style = { 
          height: `${height}px` || 'auto',
          overflow: 'hidden'
      }
    return (
        <div style={style}>
            { children }
        </div>
    )
}

MainCard.Body = ({ children }) => {

  return (
      <div className='flex flex-col relative'>
          { children }
      </div>
  )
}

export default MainCard