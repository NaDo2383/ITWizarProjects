import React from 'react'
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

function RadioBox(props) {
    const { id, name, onChange, value, checked } = props

    return (
        <div
            className={`flex justify-center items-center w-[15px] h-[15px] border border-[#B0B0B0] rounded-full cursor-pointer ${checked ? 'bg-black text-[#B0B0B0]' : 'text-[#B0B0B0]'} transition-none`}
            onClick={onChange}
        >
            <input
                hidden
                type='radio'
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {
                checked ? <RiCheckboxBlankCircleFill className='w-[9px] h-[9px]'/> : null
            }
        </div>
    )
}

export default RadioBox
