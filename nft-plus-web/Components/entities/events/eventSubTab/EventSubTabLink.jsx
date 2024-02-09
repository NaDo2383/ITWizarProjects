import useTab from 'Components/ui/tab/useTab';
import React from 'react'
import { useRef } from 'react';

function EventSubTabLink(props) {
  const { value, id, handleClick } = props
  const { subTabIndex, setSubTabIndex } = useTab()
  const isActive = id === subTabIndex
  const tabMenuRef = useRef();

  function onClick() {
    handleClick(id)
    setSubTabIndex(id)
  }

  return (
    <li>
      <button ref={tabMenuRef} onClick={onClick} className={`tab lg:text-lg ${isActive ? "sm:border-[#FB3873] text-white sm:bg-inherit bg-[#333] border-[#333]" : "border-[#434343] sm:text-[#B0B0B0] text-[#727272]"} sm:border-1.5 border cursor-pointer text-[11px] rounded-full sm:p-[8px_20px_9px_20px] p-[5px_15px_6px_15px] whitespace-nowrap hover:border-[#FB3873] hover:text-white`}
      >
        {value}
      </button>
    </li>
  )
}

export default EventSubTabLink