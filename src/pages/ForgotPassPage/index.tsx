import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { MaskLayoutStyled } from '../../components/ContentLayout/style'
import Input from '../../components/Input'
import useStaticFocus from '../../hook/useStaticFocus'
import { ForgotPassPageStyled } from './style'

type IForgotPassPageProps = {
    title?: string
    onClose?: () => void
}
type IForgotPassPageState = null

const initialForgotPassPageState: IForgotPassPageState = null

const FormElement = {
    btnClose: 'btn-close',
    email: 'email',
    btnSend: 'btn-send',
    btnCancel: 'btn-cancel'
}

const ForgotPassPage = (props: IForgotPassPageProps) => {
    /** @Component_Internal_State */
    const [componentState, setComponentState] = React.useState<IForgotPassPageState>(initialForgotPassPageState)

    /** @Component_Internal_Ref */
    /** @During_Render */
    const { title, onClose } = props

    const dispatch = useDispatch()

    const focusStatic = useStaticFocus({ focusOrderIds: [...Object.values(FormElement)] })

    const {
        register,
        handleSubmit,
        formState: { isSubmitted, isSubmitSuccessful }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined
    })

    /** @After_Render */
    useEffect(() => {
        focusStatic?.onFocus(FormElement.email)
    }, [])

    /** @Component_Events */
    const onSendEmail = (data: any) => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <MaskLayoutStyled zIndex="3" padding="100px 600px">
            <ContentLayout
                title="Forgot Password"
                onClose={onClose}
                id="forgot-password-page"
                onFocus={() => focusStatic?.setActive(FormElement.btnClose)}
                onKeyDown={focusStatic?.forceMoveByKeyDown}
            >
                <ForgotPassPageStyled>
                    <Input
                        id={FormElement.email}
                        register={register}
                        fieldValue="email"
                        required={true}
                        label="email"
                        pattern={
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        }
                        onFocus={() => focusStatic?.setActive(FormElement.email)}
                        onKeyDown={focusStatic?.forceMoveByKeyDown}
                    />
                    {!isSubmitSuccessful && isSubmitted && <p className="error-message"> Validate Email is incorrect </p>}
                    <div className="gr-btn">
                        <Button
                            id={FormElement.btnSend}
                            text="send"
                            color="white"
                            onClick={handleSubmit(onSendEmail)}
                            onKeyDown={focusStatic?.forceMoveByKeyDown}
                            onFocus={() => focusStatic?.setActive(FormElement.btnSend)}
                        />
                        <Button
                            id={FormElement.btnCancel}
                            text="cancel"
                            color="white"
                            backgroundColor="#f4b084"
                            onClick={onClose}
                            onKeyDown={focusStatic?.forceMoveByKeyDown}
                            onFocus={() => focusStatic?.setActive(FormElement.btnCancel)}
                        />
                    </div>
                </ForgotPassPageStyled>
            </ContentLayout>
        </MaskLayoutStyled>
    )
}
export default React.memo(ForgotPassPage)
