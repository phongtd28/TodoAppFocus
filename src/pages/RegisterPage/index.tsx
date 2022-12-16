import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { MaskLayoutStyled } from '../../components/ContentLayout/style'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { screenDialogs } from '../../constant/ScreenDialog'
import { updateSingleFieldHomePage } from '../../store/reducers/HomepageReducer'
import './style.css'

type Props = {
    openningDialogLogin?: boolean
    onCloseDialogInLoginPage?: () => void
}

const RegisterPage = (props: Props) => {
    const { openningDialogLogin, onCloseDialogInLoginPage } = props
    const dispatch = useDispatch()
    const onClose = () => {
        if (openningDialogLogin && onCloseDialogInLoginPage) {
            return onCloseDialogInLoginPage()
        } else {
            dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.None }))
        }
    }
    return (
        <MaskLayoutStyled zIndex="3" padding="70px 550px">
            <ContentLayout title="register" onClose={onClose}>
                <Input label="username" />
                <Input label="password" />
                <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Input label="Phone" width="215px" />
                    <Input label="email" width="215px" />
                </div>
                <TextArea label="address" />
                <TextArea label="description" height="120px" />
                <div className="gr-btn">
                    <Button text="save draft" color="#c65912" backgroundColor="#f8cbad" border="1px solid #c65912" />
                    <Button text="reset" color="#9b6501" backgroundColor="#f8cbad" border="none" />
                    <Button text="register" color="white" backgroundColor="#c65912" border="none" />
                    <Button text="cancel" color="white" backgroundColor="#f4b084" border="2px solid #c65912" />
                </div>
            </ContentLayout>
        </MaskLayoutStyled>
    )
}

export default React.memo(RegisterPage)
