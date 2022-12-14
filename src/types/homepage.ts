export interface IProductType {
    id: number
    name: string
    price: number
    quantity: number
    thumbnail: string
    status: boolean
    createdAt: number
    modifiedAt: number
}

export interface IUserType {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    avatar: string
    gender: string
    phone: string
    birthday: string
    status: boolean
    createdAt: number
    modifiedAt: number
}
