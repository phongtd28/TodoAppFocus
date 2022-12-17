// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
import { createStore, compose, applyMiddleware } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import rootReducer from './reducers/RootReducer'
import rootSaga from './saga/rootSaga'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const sagaMiddleWare = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false, composeWithDevTools }), sagaMiddleWare]

const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['registerpage']
}

const p_Reducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleWare), composeWithDevTools()))

const store = configureStore({
    reducer: p_Reducer,
    middleware: [...middleware]
})
sagaMiddleWare.run(rootSaga)

export const persistor = persistStore(store)

export default store

export type RootStateType = ReturnType<typeof store.getState>
