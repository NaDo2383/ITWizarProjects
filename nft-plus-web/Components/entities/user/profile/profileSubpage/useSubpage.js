import React from 'react'
import { useSubpageContext } from './useSubpageContext'

function useSubpage() {
    const { 
       activeSubpageIdx, 
       setActiveSubpageIdx, 
       headerItem,
       headerItem2,
       chosenSubMenuText, 
       setChosenSubMenuText 
    } = useSubpageContext()

    async function changeSubpage(value = 0) {
      setActiveSubpageIdx(value)
    }
    
  return {
      activeSubpageIdx,
      changeSubpage,
      headerItem,
      headerItem2,
      chosenSubMenuText, 
      setChosenSubMenuText 
   }
}

export default useSubpage