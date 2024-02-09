/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { ReactNode, useRef, useCallback } from 'react'
import Backdrop from './Backdrop'
import CloseBtn from 'components/ui/button/CloseBtn'
import { useGlobalPopupCtx } from '../globalPopups/useGlobalPopupCtx'
import styled from 'styled-components'
interface IMainPopup {
    children: ReactNode
    width?: number
    maxWidth?: number
    title?: string
}

function GlobalMainPopup({ children, title }: IMainPopup) {
    const backRef = useRef(null)
    const { hideGlobalPopup } = useGlobalPopupCtx()

    const closePopup = useCallback(() => {
        hideGlobalPopup()
    }, [])

    return (
        <Backdrop>
            <MainPopupWrapper ref={backRef} className="">
                <MainPopupHeader>
                    {title && <h2 className="text-38 text-black">{title}</h2>}
                    <div className=" absolute top-0 right-0">
                        <CloseBtn onClick={closePopup} />
                    </div>
                </MainPopupHeader>
                <MainPopupBody>{children}</MainPopupBody>
            </MainPopupWrapper>
        </Backdrop>
    )
}

const MainPopupWrapper = styled.div`
    min-width: 460px;
    padding-block: var(--space-24);
    padding-inline: var(--space-30);
    background: white;
    z-index: 100;
    border-radius: 10px;
`

const MainPopupHeader = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
`

const MainPopupBody = styled.div`
    padding-top: 22px;
`

export default GlobalMainPopup
