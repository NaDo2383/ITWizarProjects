import React, { useState } from 'react'
import { BsCheckLg } from "react-icons/bs";

function CheckboxNative({onChange, checked, className}) {
    const [ isChecked, setIsChecked ] = useState(checked)

    function handleOnChange(){
        setIsChecked( prev => !prev )
        onChange()
    }
    
  return (
    <div className='checkbox cursor-pointer'>
        <div 
          className={`sm:w-[15px] sm:h-[15px] w-[9px] h-[9px] border border-[#D9D9D9] rounded-sm overflow-hidden flex justify-center items-center sm:mt-0 mt-[3px] text-white cursor-pointer ${isChecked ? 'bg-black': 'bg-transparent'} ${className}`} 
          onClick={handleOnChange}
        >
            { isChecked ? 
                <BsCheckLg
                  style={{ 
                    color: '#C2C2C2', 
                    border: '1px solid #C2C2C2', 
                    padding: '2px', 
                    width: '15px', 
                    height: '15px', 
                    borderRadius:'3px' 
                    }} 
                /> : null
            }
        </div>
    </div>    
  )
}

export default CheckboxNative