import React from 'react'
import Button from '../Button'
import { DialogStyled } from './style'

type Props = {
    message?: string
}

const Dialog = (props: Props) => {
    const { message } = props

    return (
        <DialogStyled>
            <div className="mess">
                <span>{message}</span>
            </div>
            <div className="gr-btn">
                <Button text="yes" color="#833c0b" backgroundColor="#f4b084" border="none" />
                <Button text="yes" color="white" backgroundColor="#c65912" border="none" />
            </div>
        </DialogStyled>
    )
}
export default React.memo(Dialog)
