// const baseUrl = 'http://exampleurl'

import { IRegisterUser } from '../types/registerPage'
import { instance } from './instance'

// export const getData = (userId: number): string => {
//     return baseUrl + '/data/' + userId
// }
export const getDataApi = (type: string) => {
    return instance.get(type)
}

export const postDataRegisterUser = (data: IRegisterUser) => {
    return instance.post('users', data)
}
