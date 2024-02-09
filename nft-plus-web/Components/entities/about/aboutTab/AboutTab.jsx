import { TabProvider } from 'Components/ui/tab/useTabContext'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import AboutTabHeader from './AboutTabHeader'
import AboutTabPanel from './AboutTabPanel'
import useAbout from '../useAbout'
import FileDownloadButtons from '../FileDownloadButtons'

function AboutTab() {
  const { locale } = useRouter()
  const { getAbouts } = useAbout()

  useEffect(() => {
    getAbouts()
  }, [locale])

  return (
    <TabProvider>
      <FileDownloadButtons />
      <AboutTabHeader />
      <AboutTabPanel />
    </TabProvider>
  )
}

export default AboutTab