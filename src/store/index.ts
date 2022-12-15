// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import rootReducer from './reducers/RootReducer'
import rootSaga from './saga/rootSaga'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleWare = createSagaMiddleware()
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleWare), composeWithDevTools()))
sagaMiddleWare.run(rootSaga)
export default store

export type RootStateType = ReturnType<typeof store.getState>
