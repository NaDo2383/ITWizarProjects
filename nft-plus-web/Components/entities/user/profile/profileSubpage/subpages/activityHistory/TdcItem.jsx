import React from 'react'
import { getDateFromNow } from 'utils/date'
import useOwnership from './useOwnership'

function TdcItem(props) {
    const { id, text, type } = props
    const { activeId, setActiveId, setDateQuery } = useOwnership()
    const isActive = id === activeId

    function checkDateType(dateType) {
        switch(dateType) {
            case 'year': return getDateFromNow(365);
            case 'month': return getDateFromNow(30);
            case 'week' : return getDateFromNow(7);
            default: return null
        }
    }

    function handleOnclick() {
        setActiveId(id)
        const startDate = checkDateType(type)
        const endDate = type === 'all' ? null : new Date()
        setDateQuery((prev) => ({ ...prev,  startDate, endDate, isClickDateButtons: true }))
    }
  return (
    <li onClick={ handleOnclick } className={`w-[60px] border-r border-[#666666] pt-1 cursor-pointer  
    ${ isActive ? "bg-[#666666] text-white" : "bg-white"}`}
    >
    {text}
    </li>
  )
}

export default TdcItem