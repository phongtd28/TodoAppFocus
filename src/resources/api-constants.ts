// const baseUrl = 'http://exampleurl'

import { instance } from './instance'

// export const getData = (userId: number): string => {
//     return baseUrl + '/data/' + userId
// }
export const getDataApi = (type: string) => {
    return instance.get(type)
}
