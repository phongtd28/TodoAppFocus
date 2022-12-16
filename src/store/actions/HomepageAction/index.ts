import { GET_DATA_HOMEPAGE_ACTION, GET_PRODUCTS_ACTION, GET_USERS_ACTION } from '../constant'

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

export const onGetDataHomepageAction = () => {
    return {
        type: GET_DATA_HOMEPAGE_ACTION
    }
}
