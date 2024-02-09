import React from 'react'

function MainGrid({ children, gap, minWidth }) {

    const style = {
        display: 'grid',
        height: 'fit-content',
        gap: `${gap || 30}px`,
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth || 280}px, 1fr))`
    }

  return (
    <div style={style}>{ children }</div>
  )
}

export default MainGrid