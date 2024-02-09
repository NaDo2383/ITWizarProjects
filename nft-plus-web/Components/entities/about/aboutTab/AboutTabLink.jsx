import useTab from 'Components/ui/tab/useTab'
import React from 'react'

function AboutTabLink(props) {
    const { category, id } = props
    const { activeTabId, setActiveTabId } = useTab()
    const isActive = id === activeTabId
    
  return (
    <button 
        onClick={() => setActiveTabId(id) } 
        className={`w-full text-center sm:py-[18px] p-[7px] sm:text-[18px] text-[12px] sm:tracking-normal tracking-[-0.18px] ${isActive ? 'bg-[#FB3873]': 'bg-[#252525] hover:text-[#FB3873]'}`}
    >
        {category} 
    </button>
  )
}

export default AboutTabLink