import React from 'react'
import MainPopup from '../MainPopup'
import useArtworkTranslation from 'locale/useArtworkTranslation'

function InstallMetamaskPopup() {
  const { plsInstallMetaMaskI18 } = useArtworkTranslation()
  
  return (
    <MainPopup>{plsInstallMetaMaskI18}</MainPopup>
  )
}

export default InstallMetamaskPopup