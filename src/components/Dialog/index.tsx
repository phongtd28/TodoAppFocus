import React, { useEffect } from 'react'
import { KeyBoard } from '../../constant/KeyBoard'
import useStaticFocus from '../../hook/useStaticFocus'
import Button from '../Button'
import { DialogStyled, MaskDialogStyled } from './style'

type Props = {
    message?: string
    onConfirmDialog?: () => void
    onCancelDialog?: () => void
}

const FormElement = {
    btnConfirm: 'btnConfirm',
    btnCancel: 'btnCancel'
}

const Dialog = (props: Props) => {
    const { message, onConfirmDialog, onCancelDialog } = props

    const focusStatic = useStaticFocus({ focusOrderIds: [...Object.values(FormElement)] })

    useEffect(() => {
        setTimeout(() => {
            focusStatic?.onFocus(FormElement.btnCancel)
        }, 50)
    }, [])

    return (
        <MaskDialogStyled>
            <DialogStyled>
                <div className="mess">
                    <span>{message}</span>
                </div>
                <div className="gr-btn">
                    <Button
                        id="btnConfirm"
                        text="yes"
                        color="#833c0b"
                        backgroundColor="#f4b084"
                        border="none"
                        onClick={onConfirmDialog}
                        onFocus={() => focusStatic?.setActive(FormElement.btnConfirm)}
                        onKeyDown={(e) => {
                            if (e.key === KeyBoard.Enter) {
                                onConfirmDialog?.()
                                e.preventDefault()
                                return
                            }
                            focusStatic?.forceMoveByKeyDown(e)
                        }}
                    />
                    <Button
                        id="btnCancel"
                        text="cancel"
                        color="white"
                        backgroundColor="#c65912"
                        border="none"
                        onClick={onCancelDialog}
                        onFocus={() => focusStatic?.setActive(FormElement.btnCancel)}
                        onKeyDown={(e) => {
                            if (e.key === KeyBoard.Enter) {
                                onCancelDialog?.()
                                e.preventDefault()
                                return
                            }
                            focusStatic?.forceMoveByKeyDown(e)
                        }}
                    />
                </div>
            </DialogStyled>
        </MaskDialogStyled>
    )
}
export default React.memo(Dialog)
