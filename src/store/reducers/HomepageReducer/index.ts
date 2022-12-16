import { createSlice } from '@reduxjs/toolkit'
import { IProductType, IUserType } from '../../../types/homepage'

export type InitialStateType = {
    isLoading: boolean
    isErrorCallApi: boolean
    dataUsers: Array<IUserType> | null
    dataProducts: Array<IProductType> | null
    openningDialog: string
}

const initialState: InitialStateType = {
    isLoading: false,
    isErrorCallApi: false,
    dataUsers: null,
    dataProducts: null,
    openningDialog: ''
}
export const homepageReducer = createSlice({
    name: 'homepage',
    initialState: initialState,
    reducers: {
        updateSingleFieldHomePage: (state, action) => {
            return { ...state, [action.payload.fieldName]: action.payload.fieldValue }
        }
    }
})
export const { updateSingleFieldHomePage } = homepageReducer.actions
export default homepageReducer.reducer
