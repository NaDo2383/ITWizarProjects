import React from 'react'
import EditProfile from '../profileSubpage/subpages/editProfile/EditProfile'
import Settings from '../profileSubpage/subpages/settings/Settings'
import UserName from './UserName'

const specialPages = [
    <EditProfile key={'dwad2'} />,
    <Settings key={'dai3j4'} />
]

function SpecialPage({ activePageId }) {

  return (
    <>
      <UserName />
      <div className='w-full lg:pt-[0px] sm:pt-[80px] xs:pt-[25px] text-[#D4D4D4]'>
          { specialPages[activePageId] }
      </div>
    </>
  )
}

export default SpecialPage