import React from 'react'
import UguideTab from './uguideTab/UguideTab'
import useFAQpageTranslation from 'locale/useFAQpageTranslation'
import Title from 'Components/ui/typography/Title'

function Uguide() {
    const { contactUsI18 } = useFAQpageTranslation()
    
  return (
    <div className="flex-1 lg:pb-[80px] w-full min-h-screen flex flex-col mx-auto px-[16px] sm:px-0 container">
        <Title title = {contactUsI18} />
        <UguideTab />
    </div>
  )
}

export default Uguide