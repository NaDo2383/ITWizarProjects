import useTab from 'Components/ui/tab/useTab'
import React from 'react'

function UguideTabLink({ text, id }) {
  const { activeTabId, setActiveTabId } = useTab()
  const isActive = activeTabId === id

  return (
    <button
      className={`${isActive ? "bg-[#FB3873] text-[#fff]" : "bg-[#252525] hover:text-[#FB3873]"} py-3 w-full font-medium lg:text-[20px] md:text-[18px] text-[16px]`}
      style={{ transition: ".3s ease" }}
      onClick={() => setActiveTabId(id)}
    >
      {text}
    </button>
  )
}

export default UguideTabLink