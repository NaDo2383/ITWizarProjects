/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { useRef, useCallback } from 'react'
import Backdrop from './Backdrop'
import CloseBtn from 'components/ui/button/CloseBtn'
import { usePopupCtx } from '../usePopupCtx'
import styled from 'styled-components'

function MainPopup({ children, title, width, maxWidth, minWidth }) {
    const backRef = useRef(null)
    const { hidePopup } = usePopupCtx()
    const style = {
        width: `${width}px` || 'auto',
        maxWidth: `${maxWidth}px` || '80vw',
        minWidth: `${minWidth}px` || '80vw',
    }

    const closePopup = useCallback(() => {
        hidePopup()
    }, [])

    return (
        <Backdrop>
            <PopUpBox id="main-popup" ref={backRef} style={style}>
                <MainPopupHeader title={title}>
                    {title && <h1 className="font-bold text-lg">{title}</h1>}
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
const PopUpBox = styled.div`
    min-width: 320px;
    width: auto;
    z-index: 1;
    border-radius: 20px;
    background-color: black;
    padding: 30px;
`

const MainPopupBody = styled.div`
    padding-block: 10px;
`

export default MainPopup
