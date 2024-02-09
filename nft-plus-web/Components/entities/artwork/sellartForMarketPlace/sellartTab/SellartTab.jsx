import React, { useEffect } from 'react'
import Tab from 'Components/ui/tab/Tab';
import SellartTabHeader from './SellartTabHeader';
import SellartTabPanel from './SellartTabPanel';
import useArtDetail from '../../detail/useArtDetail';
import useAlertTranslation from 'locale/useAlertTranslation';
import { useRouter } from 'next/router';

function SellartTab() {
    const { artworkRevokedI18 } = useAlertTranslation()
    const { artDetail } = useArtDetail()
    const { push } = useRouter()
    
    useEffect(() => {
        if (artDetail) {
            if ((artDetail?.isAuction && artDetail?.auction?.bidRegist) || (artDetail?.type === 'SELL' && !artDetail?.isAuction )) {
                push("/art/preview/" + artDetail.id);
            } else if (artDetail?.marketStatus === "MARKET_DENIED") {
                alert(artworkRevokedI18);
                push("/");
            } 
        }    
    },[artDetail])
    
  return (
    <div className="md:mx-auto w-full px-4 lg:px-8 2xl:px-16 h-full">
        <div className="max-w-[930px] mx-auto">
            <Tab>
                <div className="w-full sm:pt-[70px] pt-[51px] flex-wrap">
                    <SellartTabHeader />
                    <SellartTabPanel />
                </div>
            </Tab>
        </div>
    </div>
  )
}

export default SellartTab