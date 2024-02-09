import { useRouter } from 'next/router'
import React from 'react'
import useNotification from '../useNotification'
import { formatDate } from 'utils/moment'

function NotificationBox(props) {
  const { 
          id,
          createdDate, 
          description,  
          descriptionEn,
          message, 
          messageEn, 
          messageActive, 
          notificationType,
          tempId,
          tempType,
          notificationDate,
          title,
          titleEn
  } = props
  const { locale, push } = useRouter()
  const { calcNotificationStatus } = useNotification()
  const { text, href } = calcNotificationStatus(tempType, tempId)
  const theTitle = locale === 'en' ? titleEn : title
  const theMessage = locale ==='en' ? messageEn : message
  const theDescription = locale === 'en' ? descriptionEn : description
  const theDate = formatDate(notificationDate, locale)
  
  return (
    <div className='flex flex-col gap-4 py-4 px-6 bg-[#303030] rounded-md'>
        <div className='flex justify-between'>
            <h2 className='text-[#CBCBCB] text-[18px] font-bold'>{theTitle}</h2>
            <span className='text-[#757575]'>{theDate}</span>
        </div>
        <div>
            <div dangerouslySetInnerHTML={{ __html: theMessage }} />
        </div>
        {
          tempType &&
          <span className='text-[#FB3873] font-[500] cursor-pointer' onClick={() => push(href) }>
            {text}
          </span>
        }
    </div>
  )
}

export default NotificationBox