import { createSlice } from '@reduxjs/toolkit'

export type InitialStateType = {
    isAuth: boolean
}

const initialState: InitialStateType = {
    isAuth: false
}
export const loginPageReducer = createSlice({
    name: 'loginpage',
    initialState: initialState,
    reducers: {
        updateSingleFieldLoginPage: (state, action) => {
            return { ...state, [action.payload.fieldName]: action.payload.fieldValue }
        }
    }
})
export const { updateSingleFieldLoginPage } = loginPageReducer.actions
export default loginPageReducer.reducer
