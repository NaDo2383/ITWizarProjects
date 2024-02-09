import ProtectedPage from 'Components/entities/user/auth/ProtectedRoute'
import React from 'react'
import dynamic from 'next/dynamic'
import { ArtDetailProvider } from 'Components/entities/artwork/detail/useArtDetailContext'
import { SellartProvider } from 'Components/entities/artwork/sellartForMarketPlace/useSellartContext'
import Seo from 'common/seo/Seo'

const ClientSideSellart = dynamic(() => import("Components/entities/artwork/sellartForMarketPlace/SellartForMarketPlace"), { ssr: false })

function SellartForMarketPlace() {
  return (
    <ProtectedPage>
      <Seo title="Sellart for marketPlace" />
        <ArtDetailProvider>
            <SellartProvider>
                <ClientSideSellart />
            </SellartProvider>
        </ArtDetailProvider>
    </ProtectedPage>
  )
}

export default SellartForMarketPlace