import { ArtworkProvider } from "Components/entities/artwork/useArtworkContext";
import Seo from "common/seo/Seo";
import dynamic from "next/dynamic";

const ClientSideMarketList = dynamic(() => import("Components/entities/artwork/MarketList"), { ssr: false } )

function Market() {
    return  ( 
        <>
            <Seo title="Market"/>
            <ArtworkProvider>
                <ClientSideMarketList  />
            </ArtworkProvider>        
        </>
    )    
}

export default Market
