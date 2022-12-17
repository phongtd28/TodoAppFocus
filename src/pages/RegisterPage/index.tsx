import React, { useEffect } from 'react'
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
import { RootStateType } from '../../store'
import { updateSingleFieldHomePage } from '../../store/reducers/HomepageReducer'
import { updateSingleFieldRegisterPage } from '../../store/reducers/RegisterReducer'
import { IRegisterUser } from '../../types/registerPage'
import './style.css'

type Props = {
    openningDialogLogin?: boolean
    onCloseDialogInLoginPage?: () => void
}

const RegisterPage = (props: Props) => {
    const [openningDialogConfirm, setOpenningDialogConfirm] = React.useState(false)
    const { openningDialogLogin, onCloseDialogInLoginPage } = props
    const dispatch = useDispatch()

    const { lastFocus, draftUser } = useSelector((state: RootStateType) => state.registerPageReducer)

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

    const onClose = () => {
        if (openningDialogLogin && onCloseDialogInLoginPage) {
            return onCloseDialogInLoginPage()
        } else {
            dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.None }))
        }
    }

    const handleRegisterUser = (data: IRegisterUser) => {
        dispatch(updateSingleFieldRegisterPage({ fieldName: 'draftUser', fieldValue: data }))
    }

    const onFocusElement = () => {
        dispatch(updateSingleFieldRegisterPage({ fieldName: 'lastFocus', fieldValue: activeID() }))
    }

    const onSaveDraftUser = (data: IRegisterUser) => {
        dispatch(updateSingleFieldRegisterPage({ fieldName: 'draftUser', fieldValue: data }))
        onClose()
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
        if (!lastFocus) setFocus('username')
        else setFocus(lastFocus)
    }, [lastFocus])

    return (
        <MaskLayoutStyled zIndex="3" padding="70px 550px">
            <ContentLayout title="register" onClose={onClose}>
                {openningDialogConfirm && <Dialog message="Clear the save draft" onConfirmDialog={onConfirmDialog} onCancelDialog={onClose} />}
                <Input label="username" register={register} required={true} fieldValue="username" onFocus={onFocusElement} />
                <Input label="password" register={register} required={true} fieldValue="password" onFocus={onFocusElement} />
                <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Input label="Phone" type="number" width="215px" register={register} required={false} fieldValue="phone" onFocus={onFocusElement} />
                    <Input label="email" width="215px" register={register} required={false} fieldValue="email" onFocus={onFocusElement} />
                </div>
                <TextArea label="address" register={register} required={false} fieldValue="address" onFocus={onFocusElement} />
                <TextArea label="description" height="120px" register={register} required={false} fieldValue="description" onFocus={onFocusElement} />
                <div className="gr-btn">
                    <Button text="save draft" color="#c65912" backgroundColor="#f8cbad" border="1px solid #c65912" onClick={handleSubmit(onSaveDraftUser)} />
                    <Button text="reset" color="#9b6501" backgroundColor="#f8cbad" border="none" onClick={onResetRegisterUser} />
                    <Button text="register" color="white" backgroundColor="#c65912" border="none" onClick={handleSubmit(handleRegisterUser)} />
                    <Button text="cancel" color="white" backgroundColor="#f4b084" border="2px solid #c65912" onClick={handleClose} />
                </div>
            </ContentLayout>
        </MaskLayoutStyled>
    )
}

export default React.memo(RegisterPage)
