import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { MaskLayoutStyled } from '../../components/ContentLayout/style'
import Input from '../../components/Input'
import { screenDialogs } from '../../constant/ScreenDialog'
import { updateSingleField } from '../../store/reducers/HomepageReducer'
import ForgotPassPage from '../ForgotPassPage'
import RegisterPage from '../RegisterPage'
import './style.css'

type Props = any

const LoginPage = (props: Props) => {
    const [openningDialog, setOpenningDialog] = useState('')
    const [captcha, setCaptcha] = useState('')

    const dispatch = useDispatch()
    const onClose = () => {
        dispatch(updateSingleField({ fieldName: 'openningDialog', fieldValue: screenDialogs.None }))
    }
    const onRegister = () => {
        // dispatch(updateSingleField({ fieldName: 'openningDialog', fieldValue: screenDialogs.Register }))
        setOpenningDialog(screenDialogs.Register)
    }
    const onForgotPass = () => {
        // dispatch(updateSingleField({ fieldName: 'openningDialog', fieldValue: screenDialogs.ForgotPass }))
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
    useEffect(() => {
        createCaptcha()
    }, [])

    const RenderDialogOption = useMemo(() => {
        switch (openningDialog) {
            case screenDialogs.Register:
                return <RegisterPage />
            case screenDialogs.ForgotPass:
                return <ForgotPassPage onClose={() => setOpenningDialog(screenDialogs.None)} />
            default:
                return null
        }
    }, [openningDialog])
    console.log(captcha)

    return (
        <>
            {RenderDialogOption}
            <MaskLayoutStyled zIndex="2" padding="50px 500px">
                <ContentLayout title="Login" onClose={onClose}>
                    <Input label="username" />
                    <Input label="password" />
                    <div className="gr-capcha-code">
                        <div className="gr-capcha-left">
                            <div className="capcha-display">
                                <span>capcha</span>
                                <div className="" id="captcha">
                                    <canvas id="canvas" width="100" height="50"></canvas>
                                </div>
                            </div>
                            <span onClick={createCaptcha} className="capcha-change-function">
                                ↻
                            </span>
                        </div>
                        <Input width="150px" height="40px" id="captchaText" />
                    </div>
                    <div className="gr-function">
                        <div className="gr__left">
                            <p>
                                <span className="text-fn" onClick={onRegister}>{`Not yet have account? Let's register.`}</span>
                            </p>
                            <p>
                                <span className="text-fn" onClick={onForgotPass}>
                                    Forgot the password? Click here.
                                </span>
                            </p>
                        </div>
                        <div className="gr__right">
                            <div className="gr-checkbox">
                                <label htmlFor="keep-login">
                                    <input className="checkbox" type="checkbox" id="keep-login" />
                                    <span>Keep me in.</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button text="login" color="white" width="120px" onClick={validateCaptcha} />
                    </div>
                </ContentLayout>
            </MaskLayoutStyled>
        </>
    )
}

export default LoginPage
