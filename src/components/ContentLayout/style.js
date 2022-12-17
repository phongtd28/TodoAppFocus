import styled from 'styled-components'

export const ContainerLayoutStyled = styled.div`
    width: 100vw;
    height: 100vh;
    /* overflow: auto; */
    background-image: linear-gradient(to right, #54728ed6, #00ffc6b0);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 0;
`
export const MaskLayoutStyled = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    padding: ${(props) => props.padding};
    z-index: ${(props) => props.zIndex || '0'};
`
export const ContentLayoutStyled = styled.div`
    width: 500px;
    height: 700px;
    border: 2px solid #c65912;
    background-color: white;
    position: relative;
    .content {
        margin: 30px;
    }
`
export const ContentHeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;

    border-bottom: 2px solid #c65912;
    .title__header {
        span {
            color: white;
            background-color: #c65912;
            padding: 8px 16px;
            display: inline-block;
            font-weight: bold;
        }
    }
`
