import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function useUrl() {
    const { pathname } = useRouter()
    const [ url, setUrl ] = useState({
      pageName: null,
      queryParams: null,
      queryString: null,
    })
    const urlArray = pathname.split('/')
    const pName = urlArray[1]
    const extraPageName =  urlArray[2] ?  (urlArray[2].includes('[id]') ? pName : urlArray[2]) : ''
    const thePageName = '/'+ pName +  ( extraPageName === '' ? '' : '/'  ) + extraPageName
    useEffect(() => {
      setUrl((prev) => ({ ...prev, pageName: thePageName.trim() }))
    },[pathname])
   
  return  { url }
}

export default useUrl