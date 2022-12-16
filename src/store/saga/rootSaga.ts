import { all } from '@redux-saga/core/effects'
import homepageSaga from './HomepageSaga'
import loginPageSaga from './LoginSaga'
import registerPageSaga from './RegisterSaga'

export default function* rootSaga() {
    yield all([homepageSaga(), registerPageSaga(), loginPageSaga()])
}
