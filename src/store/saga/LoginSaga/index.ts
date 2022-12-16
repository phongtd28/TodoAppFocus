import { call, put, takeLatest, all } from 'redux-saga/effects'
import { screenDialogs } from '../../../constant/ScreenDialog'
import { getDataApi } from '../../../resources/api-constants'
import { IUserType } from '../../../types/homepage'
import { removeLocalstorageInfo, removeSessionInfo, setLocalstorageInfo, setSessionInfo } from '../../../utility/functions'
import { updateSingleFieldHomePage } from '../../reducers/HomepageReducer'
import { updateSingleFieldLoginPage } from '../../reducers/LoginReducer'
import * as action from './../../actions/constant'

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
            setLocalstorageInfo('infomation', username)
        }
        if (isAuththen && !keepMeIn) {
            setSessionInfo('infomation', username)
        }
        yield put(updateSingleFieldLoginPage({ fieldName: 'isAuth', fieldValue: true }))

        yield put(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.None }))
    } catch (error) {
        yield put(updateSingleFieldLoginPage({ fieldName: 'isAuth', fieldValue: false }))
    }
}

export function* sagaLogoutUser() {
    try {
        yield put(updateSingleFieldLoginPage({ fieldName: 'isAuth', fieldValue: false }))
        removeLocalstorageInfo('infomation')
        removeSessionInfo('infomation')
    } catch (error) {
        yield put(updateSingleFieldLoginPage({ fieldName: 'isAuth', fieldValue: false }))
        removeLocalstorageInfo('infomation')
        removeSessionInfo('infomation')
    }
}

export default function* loginPageSaga() {
    yield takeLatest(action.ON_LOGIN_ACTION, sagaGetAuth)
    yield takeLatest(action.GET_AUTH_ACTION, sagaGetAuth)
    yield takeLatest(action.ON_LOGOUT_ACTION, sagaLogoutUser)
}
