import styled from 'styled-components'

export const ButtonStyled = styled.button`
    background-color: ${(props) => props.backgroundColor || '#c65912'};
    color: ${(props) => props.color || '#c65912'};
    text-transform: capitalize;
    font-weight: bold;
    font-size: 10px;
    width: ${(props) => props.width || '90px'};
    padding: ${(props) => props.padding || '8px 16px'};
    margin: ${(props) => props.margin || '20px 0 0 0'};
    border: ${(props) => props.border || '2px solid #c65912'};
    cursor: pointer;
    position: relative;
    z-index: 1;
    &:before {
        content: '';
        height: 100%;
        width: 0;
        background-color: #c6efce;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: width 0.25s linear;
    }
    &:hover:before {
        width: 100%;
    }
    &:hover {
        /* transform: scale(1.1); */
        color: #c65912;
    }
    /* position: absolute; */
    &:disabled {
        cursor: not-allowed;
        background-color: darkgray;
    }
    &:focus {
        border: none;
        outline: 2px solid black;
        /* font-size: 15px; */
    }
`
