import { takeLatest, call, put } from 'redux-saga/effects'
import { Services } from '../../../resources/api-constants'
import { IPayloadAction } from '../../../types/action'
import { IRegisterUser } from '../../../types/user'
import { updateSingleFieldRegisterPage } from '../../reducers/RegisterReducer'
import * as action from './../../actions/constant'

export function* sagaPostRegisterUser(action: IPayloadAction) {
    try {
        yield put(updateSingleFieldRegisterPage({ fieldName: 'saveRegisterUser', fieldValue: 'false' }))

        const payload = action.payload as IRegisterUser

        yield call(Services.postDataRegisterUserServices, payload)
        yield put(updateSingleFieldRegisterPage({ fieldName: 'saveRegisterUser', fieldValue: 'true' }))
    } catch {
        yield put(updateSingleFieldRegisterPage({ fieldName: 'saveRegisterUser', fieldValue: 'false' }))
    }
}

export default function* registerPageSaga() {
    yield takeLatest(action.ON_REGISTER_SAVE_USER_ACTION, sagaPostRegisterUser)
    // yield takeLatest(action.ON_DIALOG_STATUS, sagaGetDataHomepage)
}
