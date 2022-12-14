import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { MaskLayoutStyled } from '../../components/ContentLayout/style'
import Input from '../../components/Input'
import { updateSingleField } from '../../store/reducers/HomepageReducer'
import { ForgotPassPageStyled } from './style'

type Props = {
    title?: string
    onClose?: () => void
}

const ForgotPassPage = (props: Props) => {
    const { title, onClose } = props
    const dispatch = useDispatch()

    return (
        <MaskLayoutStyled zIndex="3" padding="100px 600px">
            <ContentLayout title="forgot password" onClose={onClose}>
                <ForgotPassPageStyled>
                    <Input label="email" />
                    <div className="gr-btn">
                        <Button text="send" color="white" />
                        <Button text="cancel" color="white" backgroundColor="#f4b084" />
                    </div>
                </ForgotPassPageStyled>
            </ContentLayout>
        </MaskLayoutStyled>
    )
}
export default React.memo(ForgotPassPage)
