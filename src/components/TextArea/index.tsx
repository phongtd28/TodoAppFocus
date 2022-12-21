import React from 'react'
import { TextAreaStyled } from './style'

type Props = {
    label?: string
    height?: string
    register?: any
    fieldValue?: string
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
    onFocus?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}
const TextArea = (props: Props) => {
    const { label, height, register, required, fieldValue, onChange, onBlur, onFocus, onKeyDown } = props

    return (
        <TextAreaStyled height={height}>
            <span>{label}</span>
            <textarea
                id={fieldValue}
                onFocus={onFocus}
                {...register(fieldValue, {
                    required,
                    onChange,
                    onBlur
                })}
                onKeyDown={onKeyDown}
            />
        </TextAreaStyled>
    )
}
export default React.memo(TextArea)
