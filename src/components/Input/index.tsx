import React from 'react'
import { InputStyled } from './style'

type Props = {
    id?: string
    className?: string
    type?: string
    label?: string
    width?: string
    height?: string
    fontSize?: string
    fontWeight?: string
    register?: any
    fieldValue?: string
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
    onFocus?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    pattern?: object
    maxLength?: number
}

const Input = (props: Props) => {
    const {
        id,
        className,
        type,
        label,
        width,
        height,
        fontSize,
        fontWeight,
        register,
        fieldValue,
        required,
        onChange,
        onBlur,
        onFocus,
        onKeyDown,
        pattern,
        maxLength
    } = props
    return (
        <InputStyled label={label} className={className} height={height} width={width} fontSize={fontSize} fontWeight={fontWeight} tabIndex="-1">
            {!!label && <div className="input__label">{label}</div>}
            {register ? (
                <input
                    id={fieldValue}
                    type={type}
                    {...register(fieldValue, {
                        required,
                        onChange,
                        onBlur,
                        pattern,
                        maxLength: maxLength
                    })}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                />
            ) : (
                <input id={id} onChange={onChange} />
            )}
        </InputStyled>
    )
}
export default React.memo(Input)
