import { useGlobalContext } from 'common/global/useGlobalContext';
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
 
function EditProfileSubLink(props) {
  const {
    id,
    text,
    activeSubpage,
    setActiveSubpage,
    href
  } = props
  const isActive = activeSubpage === id
  const { push } = useRouter();
  const { isOpenMobileEditProfile, setOpenMobileEditProfile } = useGlobalContext();

  const handleClick = useCallback(() => {
    setActiveSubpage(id)
    push(href)
    setOpenMobileEditProfile(false)
  },[])

  window.addEventListener('popstate', () => {
		!isOpenMobileEditProfile && setOpenMobileEditProfile(true);
	});

  return (
    <li className={`${isActive ? 'text-[#E6E6E6]' : 'text-[#898989]'} xs:py-0 py-2 first:pt-0 lg:text-[18px] sm:text-[18px] xs:text-[14px] cursor-pointer sm:mb-[20px]`} onClick={handleClick}>
          {text}
    </li>
  )
}

export default EditProfileSubLink