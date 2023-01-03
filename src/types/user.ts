export interface IUser {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    avatar: string
    gender: string
    phone: number
    birthday: string
    status: boolean
    createdAt: number
    modifiedAt: number
}

export type IRegisterUser =
    | {
          username?: string
          password?: string
          phone?: number
          email?: string
          address?: string
          description?: string
      }
    | undefined

export type ILoginUser = {
    username: string
    password: string
    keepMeIn: boolean
}
