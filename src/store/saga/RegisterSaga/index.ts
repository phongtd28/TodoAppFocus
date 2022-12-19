import { takeLatest, call, put } from 'redux-saga/effects'
import { getDataApi, postDataRegisterUser } from '../../../resources/api-constants'
import { IRegisterUser } from '../../../types/registerPage'
import { updateSingleFieldRegisterPage } from '../../reducers/RegisterReducer'
import * as action from './../../actions/constant'

export function* sagaPostRegisterUser(action: any) {
    try {
        yield put(updateSingleFieldRegisterPage({ fieldName: 'saveRegisterUser', fieldValue: 'false' }))

        const { payload } = action

        yield call(postDataRegisterUser, payload)
        yield put(updateSingleFieldRegisterPage({ fieldName: 'saveRegisterUser', fieldValue: 'true' }))
    } catch {
        yield put(updateSingleFieldRegisterPage({ fieldName: 'saveRegisterUser', fieldValue: 'false' }))
    }
}

export default function* registerPageSaga() {
    yield takeLatest(action.ON_REGISTER_SAVE_USER_ACTION, sagaPostRegisterUser)
    // yield takeLatest(action.ON_DIALOG_STATUS, sagaGetDataHomepage)
}
