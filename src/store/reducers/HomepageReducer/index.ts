import { createSlice } from '@reduxjs/toolkit'
import { screenDialogs } from '../../../constant/ScreenDialog'
import { IProductType } from '../../../types/product'
import { IUser } from '../../../types/user'

export type InitialStateType = {
    isLoading: boolean
    isErrorCallApi: boolean
    dataUsers: Array<IUser> | null
    dataProducts: Array<IProductType> | null
    openningDialog: string
}

const initialState: InitialStateType = {
    isLoading: false,
    isErrorCallApi: false,
    dataUsers: null,
    dataProducts: null,
    openningDialog: screenDialogs.None
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
