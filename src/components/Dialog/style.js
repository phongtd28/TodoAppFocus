import styled from 'styled-components'

export const DialogStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 150px;
    border: 2px solid #c65912;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    .gr-btn {
        display: flex;
        gap: 30px;
    }
`
