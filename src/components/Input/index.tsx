import React from 'react'
import { InputStyled } from './style'

type Props = {
    id?: string
    className?: string
    label?: string
    width?: string
    height?: string
}

const Input = (props: Props) => {
    const { id, className, label, width, height } = props
    return (
        <InputStyled id={id} className={className} height={height} width={width} tabIndex="0">
            {label && <div className="input__label">{label}</div>}
            <input />
        </InputStyled>
    )
}
export default React.memo(Input)
