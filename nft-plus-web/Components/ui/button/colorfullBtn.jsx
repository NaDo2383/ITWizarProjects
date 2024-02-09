import React from 'react'

export function ColorfullBtn(props) {
  const { text, onClick } = props
  return (
    <button onClick={onClick} className="font-[500] w-full sm:h-[47px] h-[42px] bg-[#FB3873] hover:bg-[#FF5C8D] text-white undefined rounded-md sm:px-[20px] px-0">
        <p className="sm:text-[19px] text-[15px] text-white font-[500] ">{text}</p>
    </button>
  )
}

export function ColorOutlineBtn(props) {
   const { text, onClick } = props
   return (
     <button onClick={onClick} className="font-[700] sm:text-[19px] text-[15px] w-full lg:h-[47px] h-[42px] text-white border-2 border-[#FB3873] rounded-md py-1 sm:px-[20px] px-0">{text}</button>
   )
}

export function UnActiveBtn(props) {
  const { text, onClick } = props
  return (
    <button onClick={onClick} className='sm:text-[19px] text-[15px] w-full lg:h-[47px] h-[42px] border-[1.5px] border-[#FB3873] text-[#D7D7D7] font-bold rounded-[10px] py-2 sm:px-[20px] px-0'>
      {text}
    </button>
  )
}

export function BlueBtn(props) {
  const { text, onClick, width } = props

  return (
    <button
      onClick={onClick}
      className='sm:font-[700] font-medium sm:text-[19px] text-[15px] w-full lg:h-[47px] h-[42px] text-[#fff] bg-[#6319FF] hover:bg-[#8D58FF] rounded-md py-2 sm:px-[20px] px-0'
    >
      {text}
    </button>
  )
}

export function DarkBlueBtn(props) {
  const { text, onClick } = props
  return (
    <button onClick={onClick} className='font-[500] w-full h-[47px] text-[#fff] bg-[#4D4C5B] rounded-md py-2 sm:px-[20px] px-0'>
      <p className="sm:text-[19px] text-[15px] text-white font-bold">{text}</p>
    </button>
  )
}

export function LighterDarkBtn(props) {
  const { text, onClick, height } = props

  const style = {
    height: height ?? '37px'
  }
  return (
    <button
      onClick={onClick} className='font-[500] w-full text-[#fff] bg-[#404040] rounded-[5px] sm:px-[20px] px-0'
      style={style}
    >
      {text}
    </button>
  )
}