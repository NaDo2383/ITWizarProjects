import { PopupProvider } from '@/common/popup/usePopupCtx'
import { Wrapper } from '@/components/ui/containers/Wrapper'
import RegStatusTab from '@/features/artwork/registration-status/tab/RegStatusTab'
import { ArtworkProvider } from '@/features/artwork/useArtworkContext'
import React from 'react'

const RegistrationStatus = () => {
  return (
    <ArtworkProvider>
      <PopupProvider>
            <Wrapper>
                <RegStatusTab />
            </Wrapper>
      </PopupProvider>
    </ArtworkProvider>
  )
}

export default RegistrationStatus