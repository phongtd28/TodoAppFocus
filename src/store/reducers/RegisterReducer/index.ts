import { createSlice } from '@reduxjs/toolkit'
import { IProductType, IUserType } from '../../../types/homepage'

export type InitialStateType = any

const initialState: InitialStateType = {}
export const registerPageReducer = createSlice({
    name: 'registerpage',
    initialState: initialState,
    reducers: {
        updateSingleFieldRegisterPage: (state, action) => {
            return { ...state, [action.payload.fieldName]: action.payload.fieldValue }
        }
    }
})
export const { updateSingleFieldRegisterPage } = registerPageReducer.actions
export default registerPageReducer.reducer
