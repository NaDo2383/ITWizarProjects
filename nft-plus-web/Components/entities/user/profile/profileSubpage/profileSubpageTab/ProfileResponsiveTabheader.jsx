import React, { useState } from 'react'
import useSubpage from '../useSubpage';
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useProfile from '../../useProfile';

function ProfileResponsiveTabheader() {
  const { authUser } = useAuthUser()
  const { profileUser } = useProfile();
  const { headerItem, headerItem2 } = useSubpage()
  const theHeaderItem = headerItem?.slice(authUser?.role === "NORMAL" ? 1 : 0, headerItem?.length)

  return (
    <button className='md:hidden px-[16px] flex justify-start flex-wrap'>
      {profileUser?.role !== "NORMAL" && headerItem?.slice(profileUser?.role == "TAMTAM" && 0, headerItem?.length)?.map((item, idx) => (
            <ProfileResTabheaderLink key={'profile-subpage-header-' + idx} item={item} i={idx}/>
      ))}
      {profileUser?.role === "NORMAL" && headerItem2?.slice(profileUser?.role !== "TAMTAM" && 0, headerItem2?.length)?.map((item, idx) => (
            <ProfileResTabheaderLink key={'profile-subpage-header-' + idx} item={item} i={idx} />
      ))}
    </button>
  )
}

function ProfileResTabheaderLink(props) {
    const { item, i } = props
    const [show, setShow] = useState(false);

    const {
      changeSubpage,
      activeSubpageIdx,
      headerItem,
      chosenSubMenuText,
      setChosenSubMenuText
    } = useSubpage()
    const isActive = activeSubpageIdx === i

  return (
    <li
          className={`${ isActive ? "font-medium bg-[#181A1A] " : ""
            } relative sm:w-full w-1/2 inline-block text-center hover:text-[#DDD] py-[8px] border border-[#2E2E2E] cursor-pointer text-[13px] text-[#999] whitespace-nowrap min-w-[162px]`}
          onClick={() => {
            changeSubpage(i)
            setShow(false)
            setChosenSubMenuText(item?.value)
          }}>
          {item?.value}
          {
            isActive ? <div className="absolute bottom-0 -left-0 h-[1px] w-full bg-[#FB3873]" />  :  null
          }
          
        </li>
  )
}

export default ProfileResponsiveTabheader