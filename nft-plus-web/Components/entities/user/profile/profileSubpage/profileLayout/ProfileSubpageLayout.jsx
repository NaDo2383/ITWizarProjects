import React from 'react'
/**
 * @createdBy Phill Anderson 2023/3/20
 */
function ProfileSubpageLayout(props) {
    const { children } = props
    
  return (
    <div className='flex gap-14 pb-[119px] lg:pt-[15px] sm:pt-[30px] pt-[8px]'>{children}</div>
  )
}

export default ProfileSubpageLayout