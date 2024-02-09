import React from 'react'
import useSubpage from '../useSubpage'
import useAuthUser from 'Components/entities/user/auth/useAuthUser'

function ProfileTabLink({ id, value }) {

    const { changeSubpage, activeSubpageIdx } = useSubpage()
    const { authUser } = useAuthUser()
    const isActive = id === activeSubpageIdx
   
    function onClick() {
      if(authUser?.role !== "TAMTAM") {
        changeSubpage(id) 
        return
      }
        changeSubpage(id)
    }
    
  return (
    <li
        onClick={onClick}
        className={`${isActive ? "text-[#fff] font-medium border-b-2 border-[#FB3873] xl:px-[88px] md:px-[26px] pb-[20px]"
        : "text-[#D4D4D4] hover:text-[#fff] font-medium border-b-2 border-[#D4D4D4] hover:border-[#FB3873] xl:px-[88px] md:px-[26px] pb-[20px]"
        } text-center cursor-pointer lg:text-[20px] whitespace-nowrap w-full text-[16px] flex items-center justify-center`}>
        {value}
    </li>
  )
}

export default ProfileTabLink