import React from 'react'

function SelectOptions(props) {
    const { isOpen, options, setIsOpenOptions, handleSelect } = props

    const style = {
        position: 'absolute',
        top: '103%',
        left: '0',
        width: '100%',
        height: `${isOpen ? 'auto': '0'}`,
        background: 'transparent',
        display: `${isOpen ? 'block': 'none' }`,
        zIndex: `${isOpen ? '9999': '0' }`,
        marginTop: "4px"
    }

    function onClick(option) {
        setIsOpenOptions( prev => !prev )
        handleSelect(option)
    }

  return (
    <div style={style} className='border border-[#656565] rounded-[8px] overflow-hidden '>
        <ul>
            {
                options?.map((option ,idx) => (
                    <li 
                        key={'option-' + idx} 
                        className={`flex  bg-[#181A1A] opacity-90 backdrop-blur-[2px] py-[5px] pl-2 sm:text-[18px] text-[14px] font-normal last:border-0 hover:text-white ${ idx !== options?.length && "border-b border-[#656565]" }`}
                        onClick={() => isOpen && onClick(option) }
                    >
                        { option.text }
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default SelectOptions