import { IAuthenPayloadAction } from '../../../types/action'
import {
    GET_AUTH_ACTION,
    GET_DATA_HOMEPAGE_ACTION,
    GET_PRODUCTS_ACTION,
    GET_USERS_ACTION,
    ON_FORGOT_PASS_ACTION,
    ON_LOGIN_ACTION,
    ON_LOGOUT_ACTION,
    ON_REGISTER_ACTION
} from '../constant'

export const onGetUserAction = () => {
    return {
        type: GET_USERS_ACTION
    }
}
export const onGetProductsAction = () => {
    return {
        type: GET_PRODUCTS_ACTION
    }
}
export const onGetAuthenAction = (payload: IAuthenPayloadAction) => {
    return {
        type: GET_AUTH_ACTION,
        payload
    }
}
export const onGetDataHomepageAction = () => {
    return {
        type: GET_DATA_HOMEPAGE_ACTION
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

export const onRegisterAction = () => {
    return {
        type: ON_REGISTER_ACTION
    }
}
export const onForgotPassAction = () => {
    return {
        type: ON_FORGOT_PASS_ACTION
    }
}
