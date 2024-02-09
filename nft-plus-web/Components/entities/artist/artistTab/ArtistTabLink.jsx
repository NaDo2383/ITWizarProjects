import useTab from 'Components/ui/tab/useTab'
import React, { useId } from 'react'

function ArtistTabLink(props) {
    const { linkId, text } = props
    const id = useId()
    const { activeTabId, setActiveTabId } = useTab()
    const isActive = linkId === activeTabId
    
  return (
    <span 
        key={id} 
        className={`${isActive ? 'text-[#DDD]' : 'text-[#404040] hover:text-[#DDD]' } font-bold text-[16px]  sm:text-[24px] cursor-pointer`}
        onClick = { () => setActiveTabId(linkId) }
    >
        { text }
    </span>
  )
}

export default ArtistTabLink