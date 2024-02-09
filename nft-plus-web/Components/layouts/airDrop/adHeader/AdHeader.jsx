import React, { useRef } from 'react'
import AdTopHeader from './AdTopHeader'
import AdMenu from '../adMenu/AdMenu'
import useElementPosition from 'common/window/useElementPosition'

function AdHeader() {
    const adHeaderRef = useRef(null)
    useElementPosition(adHeaderRef, {globalName:'header'})
    
  return (
    <header ref={adHeaderRef} className='fixed w-full z-[120] '>
        <div className='bg-[#181A1A]'>
          <AdTopHeader />
        </div>
        <AdMenu />
    </header>
  )
}

export default AdHeader