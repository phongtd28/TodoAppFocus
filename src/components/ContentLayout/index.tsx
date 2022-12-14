import React from 'react'
import Button from '../Button'
import { ContentLayoutStyled, ContentHeaderStyled, ContainerLayoutStyled, MaskLayoutStyled } from './style'

type Props = {
    title: string
    children?: any
    onClose?: () => void
}

const ContentLayout = (props: Props) => {
    const { title, children, onClose } = props
    return (
        <ContentLayoutStyled>
            <ContentHeaderStyled>
                <div className="title__header">
                    <span>{title}</span>
                </div>
                {onClose && <Button text="x" color="white" margin="0" border="none" onClick={onClose} />}
            </ContentHeaderStyled>
            <div className="content">{children}</div>
        </ContentLayoutStyled>
    )
}

export default React.memo(ContentLayout)
