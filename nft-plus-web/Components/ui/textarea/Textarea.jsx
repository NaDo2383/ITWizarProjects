import React from 'react'

function Textarea({ name, onChange, value }) {
  
  function handleTextAreaChange(event) {
    onChange( event.target.value, name )
  }
  
  return (
    <textarea 
        rows="4" 
        cols="80" 
        name={name} 
        onChange={handleTextAreaChange} 
        className='w-full py-[9px] pl-[10px] bg-[#0F1111] rounded-md xs:text-[15px]'
        value={value || ''}
        placeholder="소개말을 입력해주세요"
    />
  )
}

export default Textarea