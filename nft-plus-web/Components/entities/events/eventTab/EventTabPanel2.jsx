import React from 'react'
import IntroductionPage from '../IntroductionPagel'
import useTab from 'Components/ui/tab/useTab'

function EventTabPanel2() {
  const { setActiveTabId } = useTab()
  
  return (
    <div>
        <IntroductionPage setTabIndexs={setActiveTabId}/>
    </div>
  )
}

export default EventTabPanel2