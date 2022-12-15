import styled from 'styled-components'

export const TextAreaStyled = styled.div`
    display: flex;
    flex-direction: column;
    border: ${(props) => props.border || '2px solid #c65912'};
    margin-bottom: 20px;

    span {
        display: flex;
        align-items: center;
        color: ${(props) => props.color || 'white'};
        background-color: ${(props) => props.backgroundColor || '#c65912'};
        text-align: left;
        text-transform: capitalize;
        width: 90px;
        height: 30px;
    }
    textarea {
        height: ${(props) => props.height || '80px'};
        max-width: 100%;
        border: none;
        &:focus {
            outline: 2px solid black;
        }
    }
`
