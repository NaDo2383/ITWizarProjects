import React from 'react'
import useSubpage from './useSubpage'

function SubpageLink(props) {
  const { id, text } = props
  const { changeSubpage, activeSubpageIdx } = useSubpage()
  const isActive = activeSubpageIdx === id

  return (
    <button className={`${isActive ? 'active-sub-page' : 'dis-active'} text-left text-[15px]`}
      onClick={() => changeSubpage(id)}>
      {text}
    </button>
  )
}

export default SubpageLink