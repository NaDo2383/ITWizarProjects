/**
 * @createdBy Phill Anderson 2023/3/20
 */
import React from 'react'
import ProfileSubpageLayout from './profileLayout/ProfileSubpageLayout'
import ProfileSubpageTab from './profileSubpageTab/ProfileSubpageTab'
import { SubpageProvider } from './useSubpageContext'
import { LicenseProvider } from 'Components/entities/license/useLicenseContext'

function ProfileSubpage() {
  return (
    <SubpageProvider>
        <ProfileSubpageLayout>
          <LicenseProvider>
               <ProfileSubpageTab />
          </LicenseProvider>
        </ProfileSubpageLayout>
    </SubpageProvider>
  )
}

export default ProfileSubpage