/**
 * @createdBy Phill Anderson 2023/6/22
 */
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import SelectOptions from './SelectOptions'
import useOnClickOutside from 'common/mouse/useOnClickOutside'
import { useRouter } from 'next/router'

function Select(props) {
    // props : defaultVal, width, options, onSelect
    const { defaultVal, width, onSelect } = props
    const { locale } = useRouter()
    const ref = useRef()
    const [ isOpenOptions, setIsOpenOptions ] = useState(false)
    const [ selectedVal, setSelectedVal ] = useState('')
    useOnClickOutside(ref, ()=> {
      setIsOpenOptions(false)
    })
    const style = {
      width: width || '100%'
    }

    function handleSelect(option) {
      onSelect(option)
      setSelectedVal(option.text)
    }

    useEffect(() => {
      if(defaultVal.text) {
        setSelectedVal(defaultVal.text)
      }
    },[locale])

  return (
    <div ref={ref} style={style} className='relative sm:min-w-[168px] rounded-[8px] px-[10px] py-[5px] cursor-pointer border border-[#656565]'>
        <div className='flex justify-between w-full' onClick={ () => setIsOpenOptions(prev => !prev) }>
            <p className='text-[#ABABAB] text-[14px] lg:text-[18px] font-[400] flex items-center pb-1'>{ selectedVal }</p>
                <Image  src={'/chevron-down.svg'} width={26} height={26} alt='select-box-chevron' className={`${isOpenOptions ? 'rotate-180' : 'rotate-0'}`} />
        </div>
        <SelectOptions 
          isOpen = {isOpenOptions} 
          setIsOpenOptions={setIsOpenOptions} 
          {...props} 
          handleSelect={handleSelect} 
        />
    </div>
  )
}

export default Select