import React, { useMemo } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch, connect } from 'react-redux'
import { screenDialogs } from '../constant/ScreenDialog'
import { RootState } from '../store'
import { onGetDataHomepageAction } from '../store/actions/HomepageAction'
import ForgotPassPage from './ForgotPassPage'
import ListPage from './ListPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

const HomePage = () => {
    const dispatch = useDispatch()

    const openningDialog = useSelector((state: RootState) => state.homepageReducer.openningDialog)

    useEffect(() => {
        dispatch(onGetDataHomepageAction())
    }, [])

    const RenderDialogOption = useMemo(() => {
        switch (openningDialog) {
            case screenDialogs.Login:
                return <LoginPage />
            case screenDialogs.Register:
                return <RegisterPage />
            case screenDialogs.ForgotPass:
                return <ForgotPassPage />
            default:
                return null
        }
    }, [openningDialog])
    return (
        <>
            {RenderDialogOption}
            <ListPage />
        </>
    )
}

// const mapStateToProps = (state: any) => {
//     return {
//         isLogin: state.homepageReducer.isLoginDialogOpened,
//         isRegister: state.homepageReducer.isRegisterDialogOpened,
//         isForgotPass: state.homepageReducer.isForgotPassDialogOpened,
//         isConfirmDialogOpened: state.homepageReducer.isConfirmDialogOpened,
//         isAuth: state.homepageReducer.isAuth,
//         isError: state.homepageReducer.isError
//     }
// }
// export default connect(mapStateToProps)(HomePage)

export default HomePage
