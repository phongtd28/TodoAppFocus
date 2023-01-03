import { IProductType } from './product'
import { ILoginUser, IRegisterUser, IUser } from './user'

export type IPayloadAction = {
    type: string
    payload?: ILoginUser | IRegisterUser | IUser | IProductType | undefined
}
