import useTab from 'Components/ui/tab/useTab'
import React from 'react'

function EventdetailTabLink(props) {
    const { text, linkId } = props
    const { activeTabId, setActiveTabId } = useTab()
    const isActive = linkId === activeTabId

  return (
    <span 
        className={` py-[7px] text-center ${isActive ? "border-[#FB3873] text-white border-b-2" : " text-[#6E6E6E] border-b-2 border-[#4E4E4E]"} cursor-pointer z-50`}
        onClick={() => setActiveTabId(linkId)}
    >
        {text}
    </span>
  )
}

export default EventdetailTabLink