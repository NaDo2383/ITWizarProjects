/**
 * @createdBy Duka 2022/04/13
 */
import React from 'react'

export function GreenStatusBtn(props){
    const { text, onClick } = props

    return (
        <button  
                clasName={`sm:min-w-[228px] min-w-[68px] border text-[10px] sm:text-[18px] font-[500] xs:tracking-[-0.15px] tracking-normal rounded-[4px] border-[#81BBFF] sm:py-[5px] sm:px-[9px] py-[5px] px-[8px] text-[#81BBFF]`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}

export function GrayStatusBtn(props){
    const { text, onClick } = props

    return (
        <button  
                className={`sm:min-w-[228px] min-w-[68px] border text-[10px] sm:text-[18px] font-[500] xs:tracking-[-0.15px] tracking-normal rounded-[4px] border-[#7A7B7C] text-[#7A7B7C]sm:py-[5px] sm:px-[9px] py-[5px] px-[8px]`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}

export function BlueStatusBtn(props){
    const { text, onClick } = props

    return (
        <button  
                className={`sm:min-w-[228px] min-w-[68px] border text-[10px] sm:text-[18px] font-[500] xs:tracking-[-0.15px] tracking-normal rounded-[4px] border-[#81BBFF] sm:py-[5px] sm:px-[9px] py-[5px] px-[8px] text-[#81BBFF] whitespace-nowrap`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}

export function RedStatusBtn(props){
    const { text, onClick } = props

    return (
        <button  
                className={`sm:min-w-[228px] min-w-[68px] border text-[10px] sm:text-[18px] font-[500] xs:tracking-[-0.15px] tracking-normal rounded-[4px] border-[#FB3873] xs:py-[5px] xs:px-[9px] py-[3px] px-[24px] text-[#FB3873] whitespace-nowrap`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}

export function BlackStatusBtn(props){
    const { text, onClick } = props

    return (
        <button  
                className={`sm:min-w-[228px] min-w-[68px] text-[10px] sm:text-[18px] xs:tracking-[-0.15px] tracking-normal font-[500] rounded-[4px] bg-[#0D0D0D] text-[#7A7B7C] xs:py-[5px] xs:px-[9px] py-[3px] px-[24px] whitespace-nowrap`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}