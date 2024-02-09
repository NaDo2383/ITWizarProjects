import { TabContainer, TabHeaderWrapper, TabNavigation } from '@/features/user/myPage/tab/MypageTabHeader'
import React, { useEffect } from 'react'
import useTab from '@/components/ui/tab/store/useTab';
import { useTabCtx } from '@/components/ui/tab/store/useTabCtx'
import { useRouter } from 'next/router';
import RegStatusTabLink from './RegStatusTabLink'
import Button from '@/components/ui/button/Button';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from "@/common/popup/popupRegistration"; 
const tabLinkItems = [
    {
        id: 0,
        text: '미디어 등록현황',
    },
    {
        id: 1,
        text: '판매 등록현황',
    },
]
function RegStatusTabHeader() {
    const { push } = useRouter()
    const { setTabHeadItems } = useTabCtx()
    const { tabLinksRef } = useTab()
    const { showPopup } = usePopupCtx()

    useEffect(() => {
        setTabHeadItems(tabLinkItems)
    }, [])


  return (
    <TabHeaderWrapper>
        <TabContainer>
            <TabNavigation>
                <div>
                        {
                            tabLinkItems.map((item, idx) => (
                                <RegStatusTabLink 
                                    key={`${item.text}-${idx}`} 
                                    {...item}
                                    ref={(el) => (tabLinksRef.current[idx] = el)}
                                />
                            ))
                        }
                </div>        
                <Button onClick={() => showPopup(POPUP_TYPES.SELECT_NFT_REGISTER_METHOD)} width={180}>
                    미디어 NFT 등록
                </Button>
            </TabNavigation>
        </TabContainer>
    </TabHeaderWrapper>
  )
}

export default RegStatusTabHeader