import React from 'react'
import { ButtonStyled } from './style'

type Props = {
    id?: string
    type?: string
    text?: string
    width?: string
    color?: string
    backgroundColor?: string
    margin?: string
    padding?: string
    border?: string
    disabled?: boolean
    style?: any
    tabIndex?: string
    children?: any
    onClick?: () => void
    onFocus?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void
}
const Button = (props: Props) => {
    const { id, text, onClick, type, width, style, color, backgroundColor, margin, padding, border, children, tabIndex, disabled, onFocus, onKeyDown } = props

    return (
        <ButtonStyled
            id={id}
            type={type}
            onClick={onClick}
            style={style}
            width={width}
            color={color}
            backgroundColor={backgroundColor}
            margin={margin}
            padding={padding}
            border={border}
            tabIndex={tabIndex}
            disabled={disabled}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
        >
            {text}
            {children}
        </ButtonStyled>
    )
}
export default React.memo(Button)
