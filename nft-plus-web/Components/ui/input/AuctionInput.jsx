import React from 'react'
import { css } from '@emotion/react'

function AuctionInput({ onChange, placeholder, disabled, value, name, type, width, borderColor }) {
  const inputVal = value ?? ''
  
  function handleInputChange(event) {
    const { value } = event.target

    if(type === 'number' ) {
        if(!isNaN(value) && Number(value) >= 0 ) {
          onChange(value, event.target.name)
          return
        }
        return
    }
    // if(event.target.name==="applicantContact"){
    //   const regexPattern = /^[0-9.-]+$/;
    //   regexPattern.test(value) ? onChange(value, event.target.name) : onChange("", event.target.name);
    //   return
    // }
    onChange(value, event.target.name)
  } 
  
  const style = {
    width: width || '100%',
    borderColor: borderColor || '#5C5C5C'
  }

  return (
    <input 
        type={type || 'text'} 
        name={name}
        value={inputVal}
        placeholder={placeholder} 
        onChange={handleInputChange} 
        disabled={ disabled || false }
        className='w-full py-[10px] pl-[10px] rounded-[5px] focus:outline-none bg-[#000] placeholder-[#808080] sm:text-[16px] text-[13px] border border-[#C2C2C2] max-w-[236px] font-[400]' 
        style={style}
    />
  )
}

export default AuctionInput