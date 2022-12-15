import React from 'react'
import { ButtonStyled } from './style'

type Props = {
    type?: string
    text?: string
    width?: string
    color?: string
    backgroundColor?: string
    margin?: string
    padding?: string
    border?: string
    style?: any
    onClick?: () => void
}
const Button = (props: Props) => {
    const { text, onClick, type, width, style, color, backgroundColor, margin, padding, border } = props

    return (
        <ButtonStyled
            type={type}
            onClick={onClick}
            style={style}
            width={width}
            color={color}
            backgroundColor={backgroundColor}
            margin={margin}
            padding={padding}
            border={border}
        >
            {text}
        </ButtonStyled>
    )
}
export default React.memo(Button)