import { useGlobalContext } from 'common/global/useGlobalContext'
import React from 'react'
import useProfile from '../useProfile';

export default function UserName() {
    const { globalItems } = useGlobalContext();
    const { profileUser} = useProfile();

    return (
    <div className="sm:flex hidden flex-col relative lg:pb-[50px] sm:pb-[65px] xs:pb-[40px] pb-[40px] mt-[23px]">
		<div className="flex lg:flex-row sm:flex-row xs:flex-col-reverse flex-col-reverse xs:gap-2">
			<div className="flex-1 ">
				<div className='flex justify-center'>
					<h4 className="text-center font-500 lg:text-[18px] sm:text-[18px] xs:text-[16px] text-[16px] text-[#DDD]">{globalItems?.profileNickname || profileUser?.nickName}</h4>
				</div>
			</div>
		</div>
	</div >
    )
}
