import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { MaskLayoutStyled } from '../../components/ContentLayout/style'
import Input from '../../components/Input'
import { ForgotPassPageStyled } from './style'

export const FormElement = {
    email: 'email'
}
type Props = {
    title?: string
    onClose?: () => void
}

const ForgotPassPage = (props: Props) => {
    const { title, onClose } = props
    const dispatch = useDispatch()

    const {
        register,

        handleSubmit,
        formState: { isSubmitted, submitCount, isValid, isSubmitSuccessful }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined
    })

    const onSendEmail = (data: any) => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <MaskLayoutStyled zIndex="3" padding="100px 600px">
            <ContentLayout title="Forgot Password" onClose={onClose}>
                <ForgotPassPageStyled>
                    <Input
                        register={register}
                        fieldValue="email"
                        required={true}
                        label="email"
                        pattern={
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        }
                    />
                    {!isSubmitSuccessful && isSubmitted && <p className="error-message"> Validate Email is incorrect </p>}
                    <div className="gr-btn">
                        <Button text="send" color="white" onClick={handleSubmit(onSendEmail)} />
                        <Button text="cancel" color="white" backgroundColor="#f4b084" onClick={onClose} />
                    </div>
                </ForgotPassPageStyled>
            </ContentLayout>
        </MaskLayoutStyled>
    )
}
export default React.memo(ForgotPassPage)
