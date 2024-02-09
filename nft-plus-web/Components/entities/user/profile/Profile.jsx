import React, { useEffect, useState } from 'react'
import ProfileBanner from './profileBanner/ProfileBanner' 
import ProfileSubpage from './profileSubpage/ProfileSubpage'
import { useRouter } from 'next/router'
import SpecialPage from './specialPages/SpecialPage'
import Container from 'Components/ui/containers/Container'

export const pageType = {
  EDITPROFILEPAGE: 'editProfile',
  SETTINGSPAGE: 'settings'
} 

const initialSpecialPage = {
  isShow: false,
  activePageId: null,
}
function Profile() {
  const { query } = useRouter()
  
  const [ specialPage, setSpecialPage ] = useState(initialSpecialPage)
 
  useEffect(() => {
      switch(query.subpage) {
          case pageType.EDITPROFILEPAGE: 
                setSpecialPage((prev) => ({ ...prev, isShow: true, activePageId: 0 }));
              break;
          case pageType.SETTINGSPAGE: 
                setSpecialPage((prev) => ({ ...prev, isShow: true, activePageId: 1 })); 
              break;
          default: setSpecialPage(initialSpecialPage);
              break;
      }
  },[query])

  return (
    <Container>
          <ProfileBanner />
          { 
            specialPage.isShow ? 
              <SpecialPage activePageId={specialPage.activePageId} /> :  <ProfileSubpage /> 
          }
    </Container>
  )
}

export default Profile