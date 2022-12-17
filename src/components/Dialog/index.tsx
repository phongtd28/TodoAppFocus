import React from 'react'
import Button from '../Button'
import { DialogStyled, MaskDialogStyled } from './style'

type Props = {
    message?: string
    onConfirmDialog?: () => void
    onCancelDialog?: () => void
}

const Dialog = (props: Props) => {
    const { message, onConfirmDialog, onCancelDialog } = props

    return (
        <MaskDialogStyled>
            <DialogStyled>
                <div className="mess">
                    <span>{message}</span>
                </div>
                <div className="gr-btn">
                    <Button text="yes" color="#833c0b" backgroundColor="#f4b084" border="none" onClick={onConfirmDialog} />
                    <Button text="yes" color="white" backgroundColor="#c65912" border="none" onClick={onCancelDialog} />
                </div>
            </DialogStyled>
        </MaskDialogStyled>
    )
}
export default React.memo(Dialog)
