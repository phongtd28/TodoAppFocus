import styled from 'styled-components'

export const DialogStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
    background: white;
    width: 350px;
    height: 150px;
    border: 2px solid #c65912;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    .gr-btn {
        display: flex;
        gap: 30px;
    }
`

export const MaskDialogStyled = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.4);
`
