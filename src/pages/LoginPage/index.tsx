/* eslint-disable no-useless-escape */

import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import produce from 'immer'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { MaskLayoutStyled } from '../../components/ContentLayout/style'
import Input from '../../components/Input'
import { KeyBoard } from '../../constant/KeyBoard'
import { screenDialogs } from '../../constant/ScreenDialog'
import useStaticFocus from '../../hook/useStaticFocus'
import { RootStateType } from '../../store'
import { onGetAuthenAction } from '../../store/actions/LoginAction'
import { updateSingleFieldHomePage } from '../../store/reducers/HomepageReducer'
import ForgotPassPage from '../ForgotPassPage'
import RegisterPage from '../RegisterPage'
import './style.css'

// interface ILoginPageProps extends React.PropsWithChildren {}
interface ILoginPageState {
    openningDialog: string
    captcha: string
}

export const FormElement = {
    close: 'btn-close',
    username: 'username',
    password: 'password',
    refreshCaptcha: 'refreshCaptcha',
    captchaField: 'captchaField',
    register: 'register',
    forgotPassword: 'forgotPassword',
    keepLogin: 'keepLogin',
    login: 'login'
}

export const FormValid = {
    username: {
        pattern: /^[a-zA-Z0-9]+$/
    },
    password: {
        pattern: /^[a-zA-Z0-9]+$/
    },
    captcha: {
        maxLength: 6
    }
}

const initialLoginPageState: ILoginPageState = {
    openningDialog: '',
    captcha: ''
}

const LoginPage = () => {
    // const [openningDialog, handleStatePageChange]'openningDialog', = useState('')
    // const [captcha, setCaptcha] = useState('')

    /** @Component_Internal_State */
    const [componentState, setComponentState] = React.useState<ILoginPageState>(initialLoginPageState)

    /** @Component_Internal_Ref */

    /** @During_Render */
    const dispatch = useDispatch()

    const {
        register,

        handleSubmit,
        formState: { isSubmitSuccessful, errors }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined
    })

    const focusStatic = useStaticFocus({ focusOrderIds: [...Object.values(FormElement)] })

    const isAuth = useSelector((state: RootStateType) => state.loginPageReducer.isAuth)

    console.log(componentState)

    /** @After_Render */
    useEffect(() => {
        focusStatic.onFocus(FormElement.username)
        createCaptcha()
    }, [])

    useEffect(() => {
        if (componentState.openningDialog === screenDialogs.None) {
            setTimeout(() => {
                focusStatic?.retryFocusElementBeforeOpenDialog()
            }, 100)
        }
    }, [componentState.openningDialog])

    /** @Component_Events */
    const handleStatePageChange = (key: keyof ILoginPageState, value: ILoginPageState[keyof ILoginPageState]) => {
        const newComponentState = produce(componentState, (draft) => {
            draft[key] = value
        })

        setComponentState(newComponentState)

        // const newComponentState = _.set({ ...componentState }, key, value)
        // setComponentState(newComponentState)
    }

    const onClose = () => {
        dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.None }))
    }

    const onCloseDialogInLoginPage = () => {
        handleStatePageChange('openningDialog', screenDialogs.None)
    }
    const onOpenningRegisterPage = () => {
        handleStatePageChange('openningDialog', screenDialogs.Register)
    }
    const onOpenningForgotPassPage = () => {
        handleStatePageChange('openningDialog', screenDialogs.ForgotPass)
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
        handleStatePageChange('captcha', captchaCode)

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
        if ((document.getElementById('captchaField') as HTMLInputElement)?.value === componentState.captcha) {
            return true
        } else {
            createCaptcha()
            return false
        }
    }

    const handleLoginPage = (data: any) => {
        console.log(data)

        if (validateCaptcha()) {
            dispatch(onGetAuthenAction(data))
        } else {
            document.getElementById('captchaField')?.focus()
            createCaptcha()
        }
    }

    /** @Render_Simple_Fragment */

    /** @Render_Complicated_Fragment */
    const RenderDialogOption = useMemo(() => {
        switch (componentState.openningDialog) {
            case screenDialogs.Register:
                return <RegisterPage openningDialogLogin={true} onCloseDialogInLoginPage={onCloseDialogInLoginPage} />
            case screenDialogs.ForgotPass:
                return <ForgotPassPage onClose={onCloseDialogInLoginPage} />
            default:
                return null
        }
    }, [componentState.openningDialog])

    return (
        <>
            {RenderDialogOption}
            <MaskLayoutStyled zIndex="2" padding="50px 500px">
                <ContentLayout
                    id="login-page"
                    title="Login"
                    onClose={onClose}
                    onKeyDown={focusStatic?.forceMoveByKeyDown}
                    onFocus={() => focusStatic?.setActive(FormElement.close)}
                >
                    <Input
                        label="username"
                        register={register}
                        fieldValue={FormElement.username}
                        required="Username incorrect"
                        pattern={FormValid.username.pattern}
                        onFocus={() => focusStatic?.setActive(FormElement.username)}
                        onKeyDown={focusStatic?.forceMoveByKeyDown}
                        errors={errors?.[FormElement.username]?.message}
                    />
                    <Input
                        label="password"
                        register={register}
                        fieldValue={FormElement.password}
                        required="Password incorrect"
                        pattern={FormValid.username.pattern}
                        onFocus={() => focusStatic?.setActive(FormElement.password)}
                        onKeyDown={focusStatic?.forceMoveByKeyDown}
                        errors={errors?.[FormElement.password]?.message}
                    />
                    <div className="gr-capcha-code">
                        <div className="gr-capcha-left">
                            <div className="capcha-display">
                                <span>Capcha</span>
                                <div className="" id="captcha">
                                    <canvas id="canvas" width="100" height="50"></canvas>
                                </div>
                            </div>
                            <span
                                id={FormElement.refreshCaptcha}
                                className="capcha-change-function"
                                tabIndex={0}
                                onClick={createCaptcha}
                                onFocus={() => focusStatic?.setActive(FormElement.refreshCaptcha)}
                                onKeyDown={(e: any) => {
                                    if (e.key === KeyBoard.Enter) {
                                        createCaptcha()
                                        return
                                    }
                                    focusStatic?.forceMoveByKeyDown(e)
                                }}
                            >
                                ↻
                            </span>
                        </div>
                        <Input
                            width="150px"
                            height="40px"
                            id="captchaText"
                            fontSize="24px"
                            fontWeight="bolder"
                            fieldValue={FormElement.captchaField}
                            register={register}
                            required="Captcha incorrect"
                            valueValid={componentState.captcha ? componentState.captcha : undefined}
                            onFocus={() => focusStatic?.setActive(FormElement.captchaField)}
                            onKeyDown={focusStatic?.forceMoveByKeyDown}
                            errors={errors?.[FormElement.captchaField]?.message}
                        />
                    </div>
                    <div className="gr-function">
                        <div className="gr__left">
                            <p>
                                <span
                                    id={FormElement.register}
                                    tabIndex={0}
                                    className="text-fn"
                                    onClick={onOpenningRegisterPage}
                                    onFocus={() => focusStatic?.setActive(FormElement.register)}
                                    onKeyDown={(e) => {
                                        if (e.key === KeyBoard.Enter) {
                                            onOpenningRegisterPage()
                                            return
                                        }
                                        focusStatic?.forceMoveByKeyDown(e)
                                    }}
                                >{`Not yet have account? Let's register.`}</span>
                            </p>
                            <p>
                                <span
                                    id={FormElement.forgotPassword}
                                    tabIndex={0}
                                    className="text-fn"
                                    onClick={onOpenningForgotPassPage}
                                    onFocus={() => focusStatic?.setActive(FormElement.forgotPassword)}
                                    onKeyDown={(e) => {
                                        if (e.key === KeyBoard.Enter) {
                                            onOpenningForgotPassPage()
                                            return
                                        }
                                        focusStatic?.forceMoveByKeyDown(e)
                                    }}
                                >
                                    Forgot the password? Click here.
                                </span>
                            </p>
                        </div>
                        <div className="gr__right">
                            <div className="gr-checkbox">
                                <label
                                    htmlFor="keep-login"
                                    tabIndex={0}
                                    id={FormElement.keepLogin}
                                    onFocus={() => focusStatic?.setActive(FormElement.keepLogin)}
                                    onKeyDown={(e) => {
                                        if (e.key === KeyBoard.Enter) {
                                            document.getElementById('keep-login')?.click()
                                            return
                                        }
                                        focusStatic?.forceMoveByKeyDown(e)
                                    }}
                                >
                                    <input className="checkbox" type="checkbox" id="keep-login" tabIndex={-1} {...register('keepMeIn')} />
                                    <span>Keep me in.</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* {isSubmitSuccessful && !isAuth && (
                        <p className="error-message">{validCaptcha ? 'Incorrect account or password' : 'Validate captcha is incorrect'}</p>
                    )} */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            id={FormElement.login}
                            text="login"
                            color="white"
                            width="120px"
                            onClick={handleSubmit(handleLoginPage)}
                            onFocus={() => focusStatic?.setActive(FormElement.login)}
                            onKeyDown={(e) => {
                                if (e.key === KeyBoard.Enter) {
                                    handleSubmit(handleLoginPage)
                                    return
                                }
                                focusStatic?.forceMoveByKeyDown(e)
                            }}
                        />
                    </div>
                </ContentLayout>
            </MaskLayoutStyled>
        </>
    )
}

export default LoginPage
