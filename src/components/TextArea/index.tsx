import React from 'react'
import { TextAreaStyled } from './style'

type Props = {
    label?: string
    height?: string
}
const TextArea = (props: Props) => {
    const { label, height } = props

    return (
        <TextAreaStyled height={height}>
            <span>{label}</span>
            <textarea />
        </TextAreaStyled>
    )
}
export default React.memo(TextArea)
