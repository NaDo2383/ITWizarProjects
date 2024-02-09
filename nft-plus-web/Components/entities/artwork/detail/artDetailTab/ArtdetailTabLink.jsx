import useTab from 'Components/ui/tab/useTab'
import React from 'react'

function ArtdetailTabLink(props) {
    const { text, linkId } = props
    const { activeTabId, setActiveTabId } = useTab()
    const isActive = linkId === activeTabId

  return (
    <div
        className={`min-w-[165px] px-1 text-left ${isActive ? "border-[#FB3873] text-white border-b-2" : " text-[#6E6E6E] border-b-2 border-[#4E4E4E]"} cursor-pointer`}
        onClick={() => setActiveTabId(linkId)}
    >
        {text}
    </div>
  )
}

export default ArtdetailTabLink