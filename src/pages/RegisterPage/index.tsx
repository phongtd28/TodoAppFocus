import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { MaskLayoutStyled } from '../../components/ContentLayout/style'
import Dialog from '../../components/Dialog'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { screenDialogs } from '../../constant/ScreenDialog'
import useStaticFocus from '../../hook/useStaticFocus'
import { RootStateType } from '../../store'
import { onRegisterSaveUserACtion } from '../../store/actions/RegisterAction'
import { updateSingleFieldHomePage } from '../../store/reducers/HomepageReducer'
import { updateSingleFieldRegisterPage } from '../../store/reducers/RegisterReducer'
import { IRegisterUser } from '../../types/registerPage'
import './style.css'

export const FormElement = {
    close: 'btn-close',
    username: 'username',
    password: 'password',
    phone: 'phone',
    email: 'email',
    address: 'address',
    description: 'description',
    saveDraft: 'saveDraft',
    reset: 'reset',
    registerUser: 'registerUser',
    cancel: 'cancel'
}

type Props = {
    openningDialogLogin?: boolean
    onCloseDialogInLoginPage?: () => void
}

const RegisterPage = (props: Props) => {
    const [openningDialogConfirm, setOpenningDialogConfirm] = React.useState(false)
    const [isFormEmpty, setIsFormEmpty] = useState(true)
    const { openningDialogLogin, onCloseDialogInLoginPage } = props
    const dispatch = useDispatch()

    const { lastFocus, draftUser, saveRegisterUser } = useSelector((state: RootStateType) => state.registerPageReducer)

    const {
        register,
        setFocus,
        getValues,
        reset,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting, isSubmitted, submitCount, isValid, isValidating }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined,
        defaultValues: draftUser
    })

    const activeID = () => {
        return document.activeElement?.id
    }

    const focusStatic = useStaticFocus({ focusOrderIds: [...Object.values(FormElement)] })

    const onClose = () => {
        if (openningDialogLogin && onCloseDialogInLoginPage) {
            return onCloseDialogInLoginPage()
        } else {
            dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.None }))
        }
    }

    const onChangeFieldInForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = getValues()
        const isEmpty = !Object.values(value).some((item) => item !== '')

        setIsFormEmpty(isEmpty)
    }

    const handleRegisterUser = (data: IRegisterUser) => {
        dispatch(onRegisterSaveUserACtion(data))
    }

    const onFocusElement = (id: string | null) => {
        focusStatic?.setActive(id)
        if (isFormEmpty) return
        dispatch(updateSingleFieldRegisterPage({ fieldName: 'lastFocus', fieldValue: activeID() }))
    }

    const onSaveDraftUser = () => {
        const data: IRegisterUser = getValues()
        dispatch(updateSingleFieldRegisterPage({ fieldName: 'draftUser', fieldValue: data }))
        // onClose()
    }

    const onResetRegisterUser = () => {
        dispatch(updateSingleFieldRegisterPage({ fieldName: 'draftUser', fieldValue: undefined }))
        dispatch(updateSingleFieldRegisterPage({ fieldName: 'lastFocus', fieldValue: 'username' }))
        const emptyUser: IRegisterUser = { username: '', password: '', phone: undefined, email: '', address: '', description: '' }
        reset(emptyUser)
        setFocus('username')
    }

    const onConfirmDialog = () => {
        dispatch(updateSingleFieldRegisterPage({ fieldName: 'draftUser', fieldValue: undefined }))
        onClose()
    }

    const handleClose = () => {
        if (!draftUser) {
            onClose()
            return
        }
        setOpenningDialogConfirm(true)
    }

    useEffect(() => {
        setFocus(lastFocus)
    }, [])

    useEffect(() => {
        if (saveRegisterUser) {
            onResetRegisterUser()
        }
    }, [saveRegisterUser])

    useEffect(() => {
        if (draftUser) setIsFormEmpty(false)
    }, [draftUser])

    return (
        <MaskLayoutStyled zIndex="3" padding="70px 550px">
            <ContentLayout
                title="register"
                onClose={onClose}
                onKeyDown={focusStatic?.forceMoveByKeyDown}
                onFocus={() => focusStatic.setActive(FormElement.close)}
            >
                {openningDialogConfirm && <Dialog message="Clear the save draft" onConfirmDialog={onConfirmDialog} onCancelDialog={onClose} />}
                <Input
                    label="username"
                    register={register}
                    required={true}
                    fieldValue={FormElement.username}
                    onFocus={() => onFocusElement(FormElement.username)}
                    onChange={onChangeFieldInForm}
                    onKeyDown={focusStatic?.forceMoveByKeyDown}
                />
                <Input
                    label="password"
                    register={register}
                    required={true}
                    fieldValue={FormElement.password}
                    onFocus={() => onFocusElement(FormElement.password)}
                    onChange={onChangeFieldInForm}
                    onKeyDown={focusStatic?.forceMoveByKeyDown}
                />
                <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Input
                        label="Phone"
                        type="number"
                        width="215px"
                        register={register}
                        required={false}
                        fieldValue={FormElement.phone}
                        onFocus={() => onFocusElement(FormElement.phone)}
                        onChange={onChangeFieldInForm}
                        onKeyDown={focusStatic?.forceMoveByKeyDown}
                    />
                    <Input
                        label="email"
                        width="215px"
                        register={register}
                        required={false}
                        fieldValue={FormElement.email}
                        onFocus={() => onFocusElement(FormElement.email)}
                        onChange={onChangeFieldInForm}
                        onKeyDown={focusStatic?.forceMoveByKeyDown}
                        pattern={
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        }
                    />
                </div>
                <TextArea
                    label="address"
                    register={register}
                    required={false}
                    fieldValue={FormElement.address}
                    onFocus={() => onFocusElement(FormElement.address)}
                    onChange={onChangeFieldInForm}
                    onKeyDown={focusStatic?.forceMoveByKeyDown}
                />
                <TextArea
                    label="description"
                    height="120px"
                    register={register}
                    required={false}
                    fieldValue={FormElement.description}
                    onFocus={() => onFocusElement(FormElement.description)}
                    onChange={onChangeFieldInForm}
                    onKeyDown={focusStatic?.forceMoveByKeyDown}
                />
                <div className="gr-btn">
                    <Button
                        id={FormElement.saveDraft}
                        text="save draft"
                        color="#c65912"
                        backgroundColor="#f8cbad"
                        border="1px solid #c65912"
                        disabled={isFormEmpty}
                        onClick={onSaveDraftUser}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSaveDraftUser()
                            }
                            focusStatic?.forceMoveByKeyDown(e)
                        }}
                        onFocus={() => focusStatic.setActive(FormElement.saveDraft)}
                    />
                    <Button
                        id={FormElement.reset}
                        text="reset"
                        color="#9b6501"
                        backgroundColor="#f8cbad"
                        border="none"
                        onClick={onResetRegisterUser}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onResetRegisterUser()
                            }
                            focusStatic?.forceMoveByKeyDown(e)
                        }}
                        onFocus={() => focusStatic.setActive(FormElement.reset)}
                    />
                    <Button
                        id={FormElement.registerUser}
                        text="register"
                        color="white"
                        backgroundColor="#c65912"
                        border="none"
                        onClick={handleSubmit(handleRegisterUser)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(handleRegisterUser)
                            }
                            focusStatic?.forceMoveByKeyDown(e)
                        }}
                        onFocus={() => focusStatic.setActive(FormElement.registerUser)}
                    />
                    <Button
                        id={FormElement.cancel}
                        text="cancel"
                        color="white"
                        backgroundColor="#f4b084"
                        border="2px solid #c65912"
                        onClick={handleClose}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleClose()
                            }
                            focusStatic?.forceMoveByKeyDown(e)
                        }}
                        onFocus={() => focusStatic.setActive(FormElement.cancel)}
                    />
                </div>
            </ContentLayout>
        </MaskLayoutStyled>
    )
}

export default React.memo(RegisterPage)
