import React from 'react'
import MypageTab from './tab/MypageTab'
import { useUserCtx } from '../useUserCtx'

function MyPage() {
    const { userList } = useUserCtx()

  return (
    <div className='themesflat-container'> 
        <div className='row'>
            <MypageTab />
        </div>
    </div>
  )
}

export default MyPage