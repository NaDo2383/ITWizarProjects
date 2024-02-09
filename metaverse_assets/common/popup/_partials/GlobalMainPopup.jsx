/**
 * @createdBy Phill Anderson 2023/10/5
 */
import React, { useRef, useCallback } from 'react'
import Backdrop from './Backdrop'
import CloseBtn from 'components/ui/button/CloseBtn'
import styled from 'styled-components'
import { useGlobalPopupCtx } from '../globalPopups/useGlobalPopupCtx'

function GlobalMainPopup({ children, title }) {
    const backRef = useRef(null)
    const { hideGlobalPopup } = useGlobalPopupCtx()

    const closePopup = useCallback(() => {
        hideGlobalPopup()
    }, [])

    return (
        <Backdrop global={true.toString()}>
            <PopUpBox
                id="main-popup"
                ref={backRef}
                className="bg-jacarta-100 dark:bg-jacarta-700"
            >
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
    justify-content: ${(props) => (props.title ? 'space-between' : 'end')};
    border-bottom: ${(props) => (props.title ? ' 1px solid gray' : 'none')};
    padding-bottom: 10px;
`

const MainPopupBody = styled.div`
    padding-top: 10px;
    padding-bottom: 20px;
    & p {
        font-size: 12px;
    }
`

const PopUpBox = styled.div`
    min-width: 380px;
    width: auto;
    z-index: 2;
    border-radius: 20px;
    padding: 10px;
`

export default GlobalMainPopup
