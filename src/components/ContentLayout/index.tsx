import React from 'react'
import { KeyBoard } from '../../constant/KeyBoard'
import Button from '../Button'
import { ContentLayoutStyled, ContentHeaderStyled, ContainerLayoutStyled, MaskLayoutStyled } from './style'

type Props = {
    id?: string
    title: string
    children?: any
    onClose?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement | any>) => void
    onFocus?: () => void
}

const ContentLayout = (props: Props) => {
    const { id, title, children, onClose, onKeyDown, onFocus } = props
    return (
        <ContentLayoutStyled id={id}>
            <ContentHeaderStyled>
                <div className="title__header">
                    <span>{title}</span>
                </div>
                {onClose && (
                    <Button
                        id="btn-close"
                        text="x"
                        color="white"
                        margin="0"
                        border="none"
                        onClick={onClose}
                        onKeyDown={(e) => {
                            if (e.key === KeyBoard.Enter) {
                                onClose()
                                e.preventDefault()
                                return
                            }
                            onKeyDown?.(e)
                        }}
                        onFocus={onFocus}
                    />
                )}
            </ContentHeaderStyled>
            <div className="content">{children}</div>
        </ContentLayoutStyled>
    )
}

export default React.memo(ContentLayout)
