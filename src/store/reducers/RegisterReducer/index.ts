import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { IRegisterUser } from '../../../types/user'

export type InitialStateType = {
    lastFocus?: 'username' | 'email' | 'password' | 'phone' | 'address'
    draftUser?: IRegisterUser
    saveRegisterUser?: boolean
}

const initialState: InitialStateType = {
    lastFocus: 'username',
    draftUser: undefined,
    saveRegisterUser: undefined
}
export const registerPageReducer = createSlice({
    name: 'registerpage',
    initialState: initialState,
    reducers: {
        updateSingleFieldRegisterPage: (state, action) => {
            return { ...state, [action.payload.fieldName]: action.payload.fieldValue }
        }
    }
})

const persistConfig = {
    key: 'registerpage',
    storage: storage,
    whitelist: ['lastFocus', 'draftUser']
}

export const { updateSingleFieldRegisterPage } = registerPageReducer.actions
export default persistReducer(persistConfig, registerPageReducer.reducer)

// export default registerPageReducer.reducer
