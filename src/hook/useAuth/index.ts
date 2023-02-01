import { removeLocalstorageInfo, removeSessionInfo } from '../../utility/functions'

const useAuth = () => {
    const logOutUser = () => {
        removeLocalstorageInfo('infomation')
        removeSessionInfo('infomation')
    }

    return {
        logOutUser
    }
}

export default useAuth
