/**
 * This function can be used anywhere in the app to greet the user
 * @param userName The user's first name
 * @returns A kind greeting message
 */
export const sayHello = (userName: string): string => {
    return 'Welcome ' + userName + '!'
}

export const getSessionInfo = (model: string) => {
    return sessionStorage.getItem(model)
}
export const setSessionInfo = (model: string, value: string) => {
    return sessionStorage.setItem(model, value)
}
export const getLocalstorageInfo = (model: string) => {
    return localStorage.getItem(model)
}
export const setLocalstorageInfo = (model: string, value: string) => {
    return localStorage.setItem(model, value)
}
export const removeSessionInfo = (model: string) => {
    return sessionStorage.removeItem(model)
}
export const removeLocalstorageInfo = (model: string) => {
    return localStorage.removeItem(model)
}
