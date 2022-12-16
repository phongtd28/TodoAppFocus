import { take, call, put, takeLatest, all } from 'redux-saga/effects'
import { screenDialogs } from '../../../constant/ScreenDialog'
import { getDataApi } from '../../../resources/api-constants'
import { IUserType } from '../../../types/homepage'
import { updateSingleFieldHomePage } from '../../reducers/HomepageReducer'
import * as action from './../../actions/constant'

export function* sagaGetUsers() {
    try {
        const { data } = yield call(getDataApi, 'users')
        yield put(updateSingleFieldHomePage({ fieldName: 'dataUsers', fieldValue: data }))
    } catch (error) {
        yield put(updateSingleFieldHomePage({ fieldName: 'isErrorCallApi', fieldValue: true }))
    }
}

export function* sagaGetProducts() {
    try {
        const { data } = yield call(getDataApi, 'products')
        yield put(updateSingleFieldHomePage({ fieldName: 'dataProducts', fieldValue: data }))
    } catch (error) {
        yield put(updateSingleFieldHomePage({ fieldName: 'isErrorCallApi', fieldValue: true }))
    }
}

export function* sagaGetDataHomepage() {
    try {
        const username = localStorage.getItem('infomation') || sessionStorage.getItem('infomation')
        if (username) {
            yield put(updateSingleFieldHomePage({ fieldName: 'isAuth', fieldValue: true }))
        }
        yield put(updateSingleFieldHomePage({ fieldName: 'isErrorCallApi', fieldValue: false }))
        const data: any[] = yield all([call(getDataApi, 'users'), call(getDataApi, 'products')])
        const [users, products] = data
        yield put(updateSingleFieldHomePage({ fieldName: 'dataProducts', fieldValue: products.data }))
        yield put(updateSingleFieldHomePage({ fieldName: 'dataUsers', fieldValue: users.data }))
    } catch (error) {
        yield put(updateSingleFieldHomePage({ fieldName: 'isErrorCallApi', fieldValue: true }))
    }
}

export default function* homepageSaga() {
    yield takeLatest(action.GET_USERS_ACTION, sagaGetUsers)
    yield takeLatest(action.GET_PRODUCTS_ACTION, sagaGetProducts)
    yield takeLatest(action.GET_DATA_HOMEPAGE_ACTION, sagaGetDataHomepage)

    // yield takeLatest(action.ON_FORGOT_PASS_ACTION, sagaGetDataHomepage)
    // yield takeLatest(action.ON_DIALOG_STATUS, sagaGetDataHomepage)
}
