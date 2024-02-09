import React from 'react'

export function LicenseRow({ yCenter, children }) {
  const style = {
      alignItems: yCenter ? 'center' : 'stretch'
  }
  return (
    <div className='flex py-[15px] border-b border-[#4E4E4E]' style ={ style }>
        {children}
    </div>
  )
}

export function LicenseSubRow({ children }) {
    return (
        <div className='flex py-[10px] first:pt-0 last:pb-0'>
            { children }
        </div>
    )
}
