/**
 * @createdBy Phill Anderson 2023/10/5
 */
import React, { useRef, useCallback } from 'react'
import Backdrop from './Backdrop'
import CloseBtn from '@/components/ui/button/CloseBtn'
import styled from 'styled-components'
import { useGlobalPopupCtx } from '../useGlobalPopupCtx'

function GlobalMainPopup({ children, title }) {
    const backRef = useRef(null)
    const { hideGlobalPopup } = useGlobalPopupCtx()

    const closePopup = useCallback(() => {
        hideGlobalPopup()
    }, [])

    return (
        <Backdrop global={true.toString()}>
            <PopUpBox id='main-popup' ref={backRef}>
                <MainPopupHeader title={title}>
                    {title && <h3>{title}</h3>}
                    <CloseBtn onClick={closePopup} />
                </MainPopupHeader>
                <MainPopupBody>{children}</MainPopupBody>
            </PopUpBox>
        </Backdrop>
    )
}

const MainPopupHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.title ? "space-between" : "end"};
    border-bottom:  ${props => props.title ? " 1px solid gray" : "none"};
    padding-bottom: 10px;
`

const MainPopupBody = styled.div`
    padding-block: 10px;
    & p {
        color: #fff;
        font-size:18px;
    }
`

const PopUpBox = styled.div`
    min-width: 380px;
    width:auto;
    z-index: 2;
    border-radius: 20px;
    background-color: black;
    padding: 15px 15px 30px 30px;
`

export default GlobalMainPopup
