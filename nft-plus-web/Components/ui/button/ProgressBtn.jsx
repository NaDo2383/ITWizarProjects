/**
 * @createdBy duka 2023/05/10
 */
import React from 'react'

export function WhiteYellowProgressBtn(props){
    const { text, onClick } = props

    return (
        <button  
                className={`rounded-md py-2 px-3 border text-sm  text-yellow-400 border-yellow-400 font-[300] cursor-not-allowed`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}

export function YellowProgressBtn(props){
    const { text, onClick } = props

    return (
        <button  
                className={`rounded-md py-2 px-3 border text-sm  text-[#ffba00] border-[#ffba00] font-[300]`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}

export function GreenProgressBtn(props){
    const { text, onClick } = props

    return (
        <button  
                className={`rounded-md py-2 px-3 border text-sm  text-[#4f9c43] border-[#4f9c43] font-[300]`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}

export function RedProgressBtn(props){
    const { text, onClick } = props

    return (
        <button  
                className={`rounded-md py-2 px-3 border text-sm  text-[#e54343] border-[#e54343] font-[300]`}
                onClick={onClick}
        >
                { text }
        </button>
    )   
}