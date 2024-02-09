import React from 'react'

function Button({children, onClick, className, width, fontSize, disabled, isLoading }) {

  const style = {
    width: width ? `${width}px` : '100%',
    overflow: 'hidden',
  }
  
  const style2 = {
    fontSize: fontSize && `${fontSize}px`,
    overflow: 'hidden',
    cursor: `${ disabled ? 'not-allowed' : 'pointer'}`,
    background: `${ disabled ? '#fff' : ''}`
  }

  return (
    <div style={style} className={`btn-submit ${className || ''}`}>
        <button 
          disabled={disabled} 
          className={`tf-button style-1 h50 w-100`} 
          style={style2} 
          onClick={onClick}
        >
            { isLoading ? '... 로드 중' : children }
        </button>
    </div>
  )
}

export default Button