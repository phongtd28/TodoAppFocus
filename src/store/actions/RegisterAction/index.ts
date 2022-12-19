import { IRegisterUser } from '../../../types/registerPage'
import { ON_REGISTER_SAVE_USER_ACTION, ON_REGISTER_SHOW_DIALOG_ACTION } from '../constant'

export const onRegisterShowDialogAction = () => {
    return {
        type: ON_REGISTER_SHOW_DIALOG_ACTION
    }
}

export const onRegisterSaveUserACtion = (payload: IRegisterUser) => {
    return {
        type: ON_REGISTER_SAVE_USER_ACTION,
        payload
    }
}
