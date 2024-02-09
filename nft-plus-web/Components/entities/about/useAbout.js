import useCrud from 'common/axios/crud'
import { useGlobalContext } from 'common/global/useGlobalContext'
import useMessageFactory from 'common/message/useMessageFactory'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { apis } from 'utils/libs'
import { useAboutContext } from './useAboutContext'

function useAbout() {
    const { abouts, setAbouts } = useAboutContext()
    const { getModel } = useCrud()
    const { setGlobalLoading } = useGlobalContext()
    const { calcMessage } = useMessageFactory()          
    const { locale } = useRouter()
   
    async function getAbouts() {
        setGlobalLoading(true)
        try{
            const res = await getModel(apis.about + `?lang=${locale === 'en' ? 'en' : 'kr'}`)
            setAbouts(res)
            return res
        }catch(e){
            if(e?.response?.status) {
                return calcMessage(e?.response?.status)
            }
            console.error(e)
        } finally {
            setGlobalLoading(false)
        }
   }

   return {
    abouts,
    getAbouts
  }
}

export default useAbout