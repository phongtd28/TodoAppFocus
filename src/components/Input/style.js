import styled from 'styled-components'
import '../../styles/_variables.sass'
export const InputStyled = styled.div`
    max-width: 100%;
    display: flex;
    border: 2px solid #c65912;
    width: ${(props) => props.width || '440px'};
    height: ${(props) => props.height || '25px'};
    overflow: hidden;

    margin-bottom: 20px;

    .input__label {
        background-color: #c65912;
        color: white;
        text-transform: capitalize;
        width: 90px;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        padding-left: 5px;
    }
    input {
        font-size: ${(props) => props.fontSize};
        font-weight: ${(props) => props.fontWeight};
        border: 1px solid silver;
        margin: 2px;
        flex-grow: 1;

        &:focus {
            outline: 2px solid black;
        }
    }
`
