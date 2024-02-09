import React, { useEffect } from 'react'
import EventSubTabLink from './EventSubTabLink';

function EventSubTabHeader(props) {
  const { subTabHeader, handleClick } = props

  // useEffect(() => {
  //   if (scroll) handleClick(subTabIndex)
  // }, [subTabIndex])

  return (
    <ul id="typeList" className="w-full overflow-auto flex sm:gap-[15px] gap-[8px]">
      {
        subTabHeader?.map((header, idx) => (
          <EventSubTabLink key={'sub-tab-link-' + idx} handleClick={handleClick} {...header} />
        ))
      }
    </ul>
  )
}

export default EventSubTabHeader