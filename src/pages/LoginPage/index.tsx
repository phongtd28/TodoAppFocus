import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { MaskLayoutStyled } from '../../components/ContentLayout/style'
import Input from '../../components/Input'
import { screenDialogs } from '../../constant/ScreenDialog'
import { RootStateType } from '../../store'
import { onGetAuthenAction } from '../../store/actions/LoginAction'
import { updateSingleFieldHomePage } from '../../store/reducers/HomepageReducer'
import { IAuthenPayloadAction } from '../../types/action'
import ForgotPassPage from '../ForgotPassPage'
import RegisterPage from '../RegisterPage'
import './style.css'

type Props = any

const LoginPage = (props: Props) => {
    const [openningDialog, setOpenningDialog] = useState('')
    const [captcha, setCaptcha] = useState('')

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting, isSubmitted, submitCount, isValid, isValidating }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined
    })

    const dispatch = useDispatch()

    const isAuth = useSelector((state: RootStateType) => state.loginPageReducer.isAuth)

    const onClose = () => {
        dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.None }))
    }

    const onCloseDialogInLoginPage = () => {
        setOpenningDialog(screenDialogs.None)
    }
    const onRegister = () => {
        setOpenningDialog(screenDialogs.Register)
    }
    const onForgotPass = () => {
        setOpenningDialog(screenDialogs.ForgotPass)
    }

    const createCaptcha = () => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(document.getElementById('captcha') as HTMLElement).innerHTML = ''
        const charsArray = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*'
        const lengthOtp = 6
        const code = []
        for (let i = 0; i < lengthOtp; i++) {
            const index = Math.floor(Math.random() * charsArray.length + 1)
            if (code.indexOf(charsArray[index]) == -1) code.push(charsArray[index])
            else i--
        }

        const captchaCode = code.join('')
        setCaptcha(captchaCode)

        const canv = document.createElement('canvas')
        const ctx: CanvasRenderingContext2D | null = canv.getContext('2d')
        if (ctx) {
            ctx.font = '25px Georgia'
            ctx.strokeText(captchaCode, 0, 23)
        }
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(document.getElementById('captcha') as HTMLElement).appendChild(canv)
    }

    const validateCaptcha = () => {
        if ((document.getElementById('captchaText') as HTMLInputElement)?.value === captcha) {
            console.log('true')
            return true
        } else {
            console.log('false')
            createCaptcha()
            return false
        }
    }

    const handleLoginPage = (data: any) => {
        if (validateCaptcha()) {
            dispatch(onGetAuthenAction(data))
        } else {
            document.getElementById('captchaText')?.focus()
            createCaptcha()
        }
    }

    useEffect(() => {
        createCaptcha()
    }, [])
    // console.log({ errors }, { isDirty }, { isSubmitting }, { isSubmitted }, { submitCount }, { isValid }, { isValidating })

    const RenderDialogOption = useMemo(() => {
        switch (openningDialog) {
            case screenDialogs.Register:
                return <RegisterPage openningDialogLogin={true} onCloseDialogInLoginPage={onCloseDialogInLoginPage} />
            case screenDialogs.ForgotPass:
                return <ForgotPassPage onClose={onCloseDialogInLoginPage} />
            default:
                return null
        }
    }, [openningDialog])

    return (
        <>
            {RenderDialogOption}
            <MaskLayoutStyled zIndex="2" padding="50px 500px">
                <ContentLayout title="Login" onClose={onClose}>
                    <Input label="username" register={register} fieldValue="username" required={true} />
                    <Input label="password" register={register} fieldValue="password" required={true} />
                    <div className="gr-capcha-code">
                        <div className="gr-capcha-left">
                            <div className="capcha-display">
                                <span>Capcha</span>
                                <div className="" id="captcha">
                                    <canvas id="canvas" width="100" height="50"></canvas>
                                </div>
                            </div>
                            <span onClick={createCaptcha} className="capcha-change-function">
                                ↻
                            </span>
                        </div>
                        <Input
                            width="150px"
                            height="40px"
                            id="captchaText"
                            fontSize="24px"
                            fontWeight="bolder"
                            // register={register}
                            // fieldValue="captchaCode"
                            // required={true}
                        />
                    </div>
                    <div className="gr-function">
                        <div className="gr__left">
                            <p>
                                <span tabIndex={0} className="text-fn" onClick={onRegister}>{`Not yet have account? Let's register.`}</span>
                            </p>
                            <p>
                                <span tabIndex={0} className="text-fn" onClick={onForgotPass}>
                                    Forgot the password? Click here.
                                </span>
                            </p>
                        </div>
                        <div className="gr__right">
                            <div className="gr-checkbox">
                                <label htmlFor="keep-login" tabIndex={0}>
                                    <input className="checkbox" type="checkbox" id="keep-login" tabIndex={-1} {...register('keepMeIn')} />
                                    <span>Keep me in.</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {isSubmitted && !isValid && <p className="error-message">tai khoan hoac mat khau khong chinh xac</p>}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button text="login" color="white" width="120px" onClick={handleSubmit(handleLoginPage)} />
                    </div>
                </ContentLayout>
            </MaskLayoutStyled>
        </>
    )
}

export default LoginPage
