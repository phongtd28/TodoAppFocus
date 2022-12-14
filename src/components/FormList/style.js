import styled from 'styled-components'

export const FormListStyled = styled.div`
    .header__form {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 20px;
        margin: 40px 0 20px 0;

        .gr-title {
            width: 50%;
            display: flex;
            justify-content: space-between;
        }
        .gr-btn {
            display: flex;
            justify-content: flex-end;
            gap: 20px;
        }
    }
    .content__form {
        width: 100%;
        height: 200px;
        border: 2px solid #c65912;
        overflow: hidden;
        overflow-y: scroll;
    }
`
