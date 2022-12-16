import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ContentLayout from '../../components/ContentLayout'
import { ContainerLayoutStyled } from '../../components/ContentLayout/style'
import FormList from '../../components/FormList'
import { screenDialogs } from '../../constant/ScreenDialog'
import { RootStateType } from '../../store'
import { onLogoutAction } from '../../store/actions/LoginAction'
import { updateSingleFieldHomePage } from '../../store/reducers/HomepageReducer'
import { getLocalstorageInfo, getSessionInfo } from '../../utility/functions'
import './style.css'

const ListPage = (props: any) => {
    // const { users, products, isError } = props
    const users = useSelector((state: RootStateType) => state.homePageReducer.dataUsers)
    const products = useSelector((state: RootStateType) => state.homePageReducer.dataProducts)
    const isErrorCallApi = useSelector((state: RootStateType) => state.homePageReducer.isErrorCallApi)
    const isAuth = useSelector((state: RootStateType) => state.loginPageReducer.isAuth)

    const username = getSessionInfo('infomation') || getLocalstorageInfo('infomation')

    const dispatch = useDispatch()
    const handleLogoutUser = () => {
        dispatch(onLogoutAction())
    }
    console.log('render')

    return (
        <ContainerLayoutStyled>
            <ContentLayout title="List">
                <div className="header">
                    {isAuth && username ? (
                        <div className="welcome">
                            <span className="gr-username">
                                Welcometo <span className="username">{username}</span>
                            </span>
                            <Button text="log out" color="white" margin="0" onClick={handleLogoutUser} />
                        </div>
                    ) : (
                        <>
                            <Button
                                text="register"
                                color="black"
                                backgroundColor="white"
                                margin="0"
                                onClick={() => dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.Register }))}
                            />
                            <Button
                                text="login"
                                color="black"
                                backgroundColor="white"
                                margin="0"
                                onClick={() => dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.Login }))}
                            />
                        </>
                    )}
                </div>
                <div className="main">
                    <FormList title="List1" users={users} />
                    <FormList title="List2" products={products} />
                </div>
            </ContentLayout>
        </ContainerLayoutStyled>
    )
}
// const mapStateToProps = (state: any) => {
//     return {
//         users: state.homepageReducer.dataUsers,
//         products: state.homepageReducer.dataProducts,
//         isError: state.homepageReducer.isError
//     }
// }
// export default connect(mapStateToProps)(React.memo(ListPage))
export default React.memo(ListPage)
