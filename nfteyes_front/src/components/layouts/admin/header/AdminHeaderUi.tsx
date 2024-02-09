/**
 * @createdBy Phill Anderson 2022/11/15
 */
import React, { useCallback, useRef } from 'react'
import Hamburger from 'components/ui/button/Hamburger'
import Icon from 'components/ui/icon/Icon'
import { ThemeSwitcherBtn } from 'common/theme/themeSwitcherBtn'
import AdminMobileMenu from '../mobileMenu/AdminMobileMenu'
import useElementPosition from 'common/window/useElementPosition'
import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'
import tw from 'tailwind-styled-components'
function AdminHeaderUi(): JSX.Element {
    // const { data: session } = useSession();
    const ref = useRef(null)
    useElementPosition(ref, { globalName: 'adminHeader', isAdminSide: true })
    const { showGlobalPopup } = useGlobalPopupCtx()

    const handleShowPopup = useCallback(() => {
        showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, { hello: 'hello' })
    }, [])
    return (
        <HeaderSc ref={ref}>
            <Icon />
            <div className="w-[300px]">
                <button onClick={handleShowPopup}>show popup</button>
            </div>
            <ThemeSwitcherBtn />
            <Hamburger />
            <AdminMobileMenu />
        </HeaderSc>
    )
}
const HeaderSc = tw.header`
    flex
    items-center
    justify-between
    w-full
    h-[50px]
    px-4
    py-50
    border-b
    border-gray-300
`

export default AdminHeaderUi
