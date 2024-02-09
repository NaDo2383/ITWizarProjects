import styled from "styled-components";

const GhostBtn = styled.button`
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
    &:hover{
        outline: none !important;
        background:none !important;
    }
    &:focus{
        outline: none !important;
        background:none !important;
    }
`;
export default GhostBtn