/**
 * @createdBy Phill Anderson 2023/3/21
 */
import useTab from 'Components/ui/tab/useTab'
import React from 'react'

function ArtTabLink(props) {
    const {  linkId, text } = props
    const { activeTabId, setActiveTabId } = useTab()
    const isActive = linkId === activeTabId
    
  return (
    <button 
        className={`${ isActive ? 'border border-b-white border-black bg-white text-[#333]' : 'border border-b-black first:border-r-0 even:border-r-0 bg-[#f7f7f7] text-[#666]' } py-3 px-10`} 
        onClick={ () => setActiveTabId(linkId) }
    >
        {text}
    </button>
  )
}

export default ArtTabLink