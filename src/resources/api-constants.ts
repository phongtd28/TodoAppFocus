// const baseUrl = 'http://exampleurl'

import { IRegisterUser } from '../types/user'
import { instance } from './instance'

// export const getData = (userId: number): string => {
//     return baseUrl + '/data/' + userId
// }
export const getDataApiServices = (type: string) => {
    return instance.get(type)
}

/* Function call API should has __Services  at the end of function */
export const postDataRegisterUserServices = (data: IRegisterUser) => {
    return instance.post('users', data)
}

export const Services = {
    getDataApiServices,
    postDataRegisterUserServices
}
