import React from 'react'
import { InputStyled } from './style'

type Props = {
    id?: string
    className?: string
    label?: string
    width?: string
    height?: string
    fontSize?: string
    fontWeight?: string
    register?: any
    fieldValue?: string
    required?: boolean
    onChange?: () => void
    onBlur?: () => void
}

const Input = (props: Props) => {
    const { id, className, label, width, height, fontSize, fontWeight, register, fieldValue, required, onChange, onBlur } = props
    return (
        <InputStyled className={className} height={height} width={width} fontSize={fontSize} fontWeight={fontWeight} tabIndex="-1">
            {label && <div className="input__label">{label}</div>}
            {register ? (
                <input
                    {...register(fieldValue, {
                        required,
                        onChange,
                        onBlur
                    })}
                />
            ) : (
                <input id={id} onChange={onChange} />
            )}
        </InputStyled>
    )
}
export default React.memo(Input)
