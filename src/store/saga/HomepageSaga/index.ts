import { take, call, put, takeLatest, all } from 'redux-saga/effects'
import { getDataApi } from '../../../resources/api-constants'
import { IUserType } from '../../../types/homepage'
import { updateSingleField } from '../../reducers/HomepageReducer'
import * as action from './../../actions/constant'

export function* sagaGetUsers() {
    try {
        const { data } = yield call(getDataApi, 'users')
        yield put(updateSingleField({ fieldName: 'dataUsers', fieldValue: data }))
    } catch (error) {
        yield put(updateSingleField({ fieldName: 'isErrorCallApi', fieldValue: true }))
    }
}

export function* sagaGetProducts() {
    try {
        const { data } = yield call(getDataApi, 'products')
        yield put(updateSingleField({ fieldName: 'dataProducts', fieldValue: data }))
    } catch (error) {
        yield put(updateSingleField({ fieldName: 'isErrorCallApi', fieldValue: true }))
    }
}

export function* sagaGetDataHomepage() {
    try {
        yield put(updateSingleField({ fieldName: 'isErrorCallApi', fieldValue: false }))
        const data: any[] = yield all([call(getDataApi, 'users'), call(getDataApi, 'products')])
        const [users, products] = data
        yield put(updateSingleField({ fieldName: 'dataProducts', fieldValue: products.data }))
        yield put(updateSingleField({ fieldName: 'dataUsers', fieldValue: users.data }))
    } catch (error) {
        yield put(updateSingleField({ fieldName: 'isErrorCallApi', fieldValue: true }))
    }
}
export function* sagaGetAuth(action: any) {
    try {
        let isAuththen = false
        const {
            payload: { username, password, keepMeIn }
        } = action
        const { data } = yield call(getDataApi, 'users')
        data.forEach((element: IUserType) => {
            if (element.username !== username) return
            if (element.username === username) {
                if (element.password !== password) return
                if (element.password === password) {
                    isAuththen = true
                }
            }
        })
        if (isAuththen && keepMeIn) {
            localStorage.setItem('infomation', username)
        }
        yield put(updateSingleField({ fieldName: 'isAuth', fieldValue: isAuththen }))
    } catch (error) {
        yield put(updateSingleField({ fieldName: 'isAuth', fieldValue: false }))
    }
}

export default function* homepageSaga() {
    yield takeLatest(action.GET_USERS_ACTION, sagaGetUsers)
    yield takeLatest(action.GET_AUTH_ACTION, sagaGetAuth)
    yield takeLatest(action.GET_PRODUCTS_ACTION, sagaGetProducts)
    yield takeLatest(action.GET_DATA_HOMEPAGE_ACTION, sagaGetDataHomepage)
    // yield takeLatest(action.ON_LOGIN_ACTION, sagaGetDataHomepage)
    // yield takeLatest(action.ON_REGISTER_ACTION, sagaGetDataHomepage)
    // yield takeLatest(action.ON_FORGOT_PASS_ACTION, sagaGetDataHomepage)
    // yield takeLatest(action.ON_DIALOG_STATUS, sagaGetDataHomepage)
}