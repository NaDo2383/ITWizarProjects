import useTab from 'Components/ui/tab/useTab'
import React, { useEffect } from 'react'
import useArtDetail from '../../detail/useArtDetail'
import { sellartTabPanels } from './sellartTabPanels'

function SellartTabPanel() {
    const { activeTabId, setActiveTabId } = useTab()
    const { artDetail } = useArtDetail()

    useEffect(() => {
        if(artDetail?.isAuction) {
            setActiveTabId(1)
        } else {
          setActiveTabId(0)
        }
    },[artDetail])
    
  return (
    <div className='min-h-[400px] sm:mt-[39px] mt-[25px]'>{sellartTabPanels[activeTabId]}</div>
  )
}

export default SellartTabPanel