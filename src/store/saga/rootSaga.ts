import { all } from '@redux-saga/core/effects'
import homepageSaga from './HomepageSaga'

export default function* rootSaga() {
    yield all([homepageSaga()])
}
