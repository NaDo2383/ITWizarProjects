import styled from 'styled-components'

export const OutlineBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    min-width: 100px;
    width: ${ props => props.width };
    color: #fff;
    border:1px solid ${ props => props.danger ? 'red' : 'hsla(0,0%,100%,.12)'}; 
    background-color:transparent;
    & :hover {
        border:1px solid ${ props => props.danger ? 'red' : 'hsla(0,0%,100%,.12)'}; 
    }
` 