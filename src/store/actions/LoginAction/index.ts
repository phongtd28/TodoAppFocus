import { ILoginUser } from '../../../types/user'
import { GET_AUTH_ACTION, ON_FORGOT_PASS_ACTION, ON_LOGIN_ACTION, ON_LOGOUT_ACTION } from '../constant'

export const onGetAuthenAction = (payload: ILoginUser) => {
    return {
        type: GET_AUTH_ACTION,
        payload
    }
}

export const onLoginAction = () => {
    return {
        type: ON_LOGIN_ACTION
    }
}

export const onLogoutAction = () => {
    return {
        type: ON_LOGOUT_ACTION
    }
}

export const onForgotPassAction = () => {
    return {
        type: ON_FORGOT_PASS_ACTION
    }
}
