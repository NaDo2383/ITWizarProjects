import React from 'react'
import AboutTabLink from './AboutTabLink'
import useAbout from '../useAbout'

function AboutTabHeader() {
    const { abouts } = useAbout()
    const isRevealScrollX = abouts?.result?.length > 4
    
  return (
      <div className={`flex justify-center`}>
        <div className={`flex w-full min-w-[328px] mb-[15px]`}>
          {
            abouts?.result?.length > 0 && abouts.result.map( ( about, idx ) => (
                <AboutTabLink key={ 'about-' + idx } { ...about } id={idx}  />
            ))
          }
        </div>
      </div>
  )
}

export default AboutTabHeader