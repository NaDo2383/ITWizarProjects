import React from 'react'
import AboutUsPage from 'Components/entities/about/About'
import Seo from 'common/seo/Seo'
import { AboutProvider } from 'Components/entities/about/useAboutContext'

const AboutUs = () => {
  return (
    <AboutProvider>
      <Seo title="About"/>
      <AboutUsPage />
    </AboutProvider>
  )
}

export default AboutUs