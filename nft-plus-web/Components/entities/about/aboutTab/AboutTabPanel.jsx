import React from 'react'
import useAbout from '../useAbout'
import useTab from 'Components/ui/tab/useTab'

function AboutTabPanel() {
  const { abouts } = useAbout()
  const { activeTabId } = useTab()
  const panelData = abouts?.result[activeTabId]

  return (
    <div className='flex justify-center sm:mb-[200px] mb-[50px]'> 
      <div className='flex flex-col justify-center items-center min-h-[360px] py-4 bg-[#1F1F1F] w-full min-w-[328px]'>
          {
            panelData?.imageUrl ?  (
              <>
                <div className="hidden sm:block">
                  <img src={panelData?.imageUrl} width="100%" height="auto" alt='panel-image' />
                </div>
                <div className="block sm:hidden">
                  {
                    panelData?.mobileImageUrl ?   
                      <img src={panelData?.mobileImageUrl} width="100%" height="auto" alt='panel-mobile-image' />
                    : 
                      'no mobile image'
                  }
                </div>  
              </>
            ) : 'no image'
          }
      </div>
    </div>
  )
}

export default AboutTabPanel