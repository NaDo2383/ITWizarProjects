/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { ReactNode, useRef, useCallback } from 'react'
import Backdrop from './Backdrop'
import CloseBtn from 'components/ui/button/CloseBtn'
import { usePopupCtx } from '../usePopupCtx'
import styled from 'styled-components'
interface IMainPopup {
    children: ReactNode
    width?: number
    maxWidth?: number
    title: string
}

function MainPopup({ children, title }: IMainPopup) {
    const backRef = useRef(null)
    const { hidePopup } = usePopupCtx()

    const closePopup = useCallback(() => {
        hidePopup()
    }, [])

    return (
        <Backdrop>
            <div ref={backRef} className="bg-blue p-10 rounded z-100">
                <MainPopupHeader>
                    <h2>{title}</h2>
                    <CloseBtn onClick={closePopup} />
                </MainPopupHeader>
                <MainPopupBody>{children}</MainPopupBody>
            </div>
        </Backdrop>
    )
}

const MainPopupHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: var(--space-10);
`

const MainPopupBody = styled.div`
    padding-block: var(--space-10);
`

export default MainPopup
