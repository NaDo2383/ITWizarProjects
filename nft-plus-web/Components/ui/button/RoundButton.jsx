import React from 'react'

function RoundButton({ width, children }) {
    const style = {
        width: width || 'auto'
    }
  return (
    <button className="sm:pt-[6px] pt-[4px] sm:pb-[7px] pb-[5px] sm:px-[20px] px-[10px] rounded-[30px] border border-[#434343] hover:border-[#FB3873] flex items-center">
        { children }
    </button>
  )
}

export default RoundButton