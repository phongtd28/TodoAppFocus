import React from 'react'
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, ValidateResult, ValidationRule } from 'react-hook-form'
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
    register?: UseFormRegister<FieldValues>
    fieldValue: string
    required?: boolean | string
    valueValid?: string
    errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
    onFocus?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    pattern?: ValidationRule<RegExp>
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
        valueValid,
        errors,
        onChange,
        onBlur,
        onFocus,
        onKeyDown,
        pattern,
        maxLength
    } = props

    return (
        <>
            <InputStyled
                errors={errors as string}
                label={label}
                className={className}
                height={height}
                width={width}
                fontSize={fontSize}
                fontWeight={fontWeight}
                tabIndex="-1"
            >
                {!!label && <div className="input__label">{label}</div>}
                {register ? (
                    valueValid ? (
                        <input
                            id={fieldValue}
                            type={type}
                            {...register(fieldValue, {
                                required,
                                onChange,
                                onBlur,
                                pattern,
                                maxLength,
                                validate: (value) => value === valueValid
                            })}
                            onFocus={onFocus}
                            onKeyDown={onKeyDown}
                        />
                    ) : (
                        <input
                            id={fieldValue}
                            type={type}
                            {...register(fieldValue, {
                                required,
                                onChange,
                                onBlur,
                                pattern,
                                maxLength
                            })}
                            onFocus={onFocus}
                            onKeyDown={onKeyDown}
                        />
                    )
                ) : (
                    <input id={id} onChange={onChange} />
                )}
            </InputStyled>
            {/* <p className="error-field">{!!errors && (errors as string)}</p> */}
        </>
    )
}
export default React.memo(Input)
