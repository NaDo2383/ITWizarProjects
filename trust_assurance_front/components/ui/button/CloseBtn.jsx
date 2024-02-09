import React from 'react'
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr'

function CloseBtn({ onClick }) {
    return (
        <CloseBtnStyled onClick={onClick}>
            <GrFormClose size={24} />
        </CloseBtnStyled>
    )
}


const CloseBtnStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    height:auto;
    border: none;
    outline: none;
    background-color:transparent;
    & svg path {
        stroke: #fff;
    }
`;


export default CloseBtn
