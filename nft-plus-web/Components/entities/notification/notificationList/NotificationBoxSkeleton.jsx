import React from 'react'

function NotificationBoxSkeleton() {
  return (
    <div className='flex flex-col gap-2 py-4 px-6 bg-[#303030] rounded-md'>
        <div className='animate-pulse bg-gray-300 rounded-md py-3 w-full' />
        <div className='animate-pulse bg-gray-300 rounded-md py-3 w-full' />
        <div className='animate-pulse bg-gray-300 rounded-md py-3 w-full' />
    </div>
  )
}

export default NotificationBoxSkeleton