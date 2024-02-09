/**
 * @createdBy Phill Anderson 2023/3/20
 */
import React, { useEffect } from 'react'
import Image from 'next/image'
import useProfile from '../useProfile'

function ProfileAvatar() {
  const { profileUser, getUserProfile } = useProfile()

 {/*} function handleProfileImg() {
    getUserProfile().then((res) => {
      handleShowModal(MODAL_TYPES.PROFILE, res);
    })
}*/}
useEffect(() => {
  getUserProfile()
},[])

  return (
    <div className='absolute left-1/2 -bottom-[10px] sm:bottom-0'>
      <div className="w-[80px] h-[80px] absolute rounded-full transform -translate-x-1/2" style={{top: "-4rem", left: "50%",}}>
          <div className={`w-full h-full relative rounded-full ${profileUser?.profileImgUrl && "bg-[#fff]"} overflow-hidden`}>
              <div className={`w-full h-full rounded-full overflow-hidden relative ${profileUser?.profileImgUrl ? "" : "flex items-end justify-center"} bg-[#333]`}>
                <Image
                  unoptimized
                  priority
                  src={profileUser?.profileImgUrl || '/def_pro.png'}
                  layout={ "fill" }
                  objectFit={"cover"}
                  heglobalItemsight={74}
                  width={74}
                  alt="profileImgUrl"
                />
              </div>
          </div>
        
      </div>
    </div>
  )
}

export default ProfileAvatar