import React, { useEffect } from 'react'
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
import jsPDF from 'jspdf'
import { renderToString } from 'react-dom/server'
import './style.css'
import { IRegisterUser } from '../../types/registerPage'
import { IProductType } from '../../types/homepage'
import useStaticFocus from '../../hook/useStaticFocus'

export const FormElement = {
    btnLogout: 'btnLogout',
    btnRegister: 'btnRegister',
    btnLogin: 'btnLogin',
    saveCSV1: 'saveCSV1',
    savePDF1: 'savePDF1',
    saveCSV2: 'saveCSV2',
    savePDF2: 'savePDF2'
}

const ListPage = (props: any) => {
    // const { users, products, isError } = props
    const { dataUsers, dataProducts } = useSelector((state: RootStateType) => state.homePageReducer)
    // const products = useSelector((state: RootStateType) => state.homePageReducer.dataProducts)

    const isErrorCallApi = useSelector((state: RootStateType) => state.homePageReducer.isErrorCallApi)
    const { isAuth } = useSelector((state: RootStateType) => state.loginPageReducer)

    const dispatch = useDispatch()

    const username = getSessionInfo('infomation') || getLocalstorageInfo('infomation')

    const focusStatic = useStaticFocus({ focusOrderIds: [...Object.values(FormElement)] })

    const handleLogoutUser = () => {
        dispatch(onLogoutAction())
    }

    const ConvertFileToPdf = (obj: any) => {
        const { typeSave } = obj

        return typeSave === 'user' ? (
            <div>
                {dataUsers.map((item: IRegisterUser, index: number) => (
                    <h3 key={index}>{item.username}</h3>
                ))}
            </div>
        ) : (
            <div>
                {dataProducts.map((item: IProductType, index: number) => (
                    <h3 key={index}>{item.name}</h3>
                ))}
            </div>
        )
    }

    const saveFileToPdf = (typeSave: 'user' | 'product') => {
        const string = renderToString(<ConvertFileToPdf typeSave={typeSave} />)
        const pdf: any = new jsPDF('p', 'mm', 'a4')

        pdf.fromHTML(string)
        pdf.save('pdf')
    }

    const onOpenningRegisterPage = () => dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.Register }))

    const onOpenningLoginPage = () => dispatch(updateSingleFieldHomePage({ fieldName: 'openningDialog', fieldValue: screenDialogs.Login }))

    useEffect(() => {
        console.log({ dataUsers })
    }, [])
    return (
        <ContainerLayoutStyled>
            <ContentLayout title="List">
                <div className="header">
                    {isAuth && username ? (
                        <div className="welcome">
                            <span className="gr-username">
                                Welcometo <span className="username">{username}</span>
                            </span>
                            <Button
                                id={FormElement.btnLogout}
                                onFocus={() => focusStatic?.setActive(FormElement.btnLogout)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleLogoutUser()
                                        return
                                    }
                                    focusStatic?.forceMoveByKeyDown(e)
                                }}
                                text="log out"
                                color="white"
                                margin="0"
                                onClick={handleLogoutUser}
                            />
                        </div>
                    ) : (
                        <>
                            <Button
                                id={FormElement.btnRegister}
                                text="register"
                                color="black"
                                backgroundColor="white"
                                margin="0"
                                onClick={onOpenningRegisterPage}
                                onFocus={() => focusStatic.setActive(FormElement.btnRegister)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onOpenningRegisterPage()
                                        return
                                    }
                                    focusStatic?.forceMoveByKeyDown(e)
                                }}
                            />
                            <Button
                                id={FormElement.btnLogin}
                                text="login"
                                color="black"
                                backgroundColor="white"
                                margin="0"
                                onClick={onOpenningLoginPage}
                                onFocus={() => focusStatic.setActive(FormElement.btnLogin)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onOpenningLoginPage()
                                        return
                                    }
                                    focusStatic?.forceMoveByKeyDown(e)
                                }}
                            />
                        </>
                    )}
                </div>
                <div className="main">
                    <FormList
                        title="List1"
                        tab={1}
                        users={dataUsers}
                        saveFileToPdf={() => saveFileToPdf('user')}
                        onKeyDown={(e) => focusStatic?.forceMoveByKeyDown(e)}
                        onFocus={(id) => focusStatic?.setActive(id)}
                    />
                    <FormList
                        title="List2"
                        tab={2}
                        products={dataProducts}
                        saveFileToPdf={() => saveFileToPdf('product')}
                        onKeyDown={(e) => focusStatic?.forceMoveByKeyDown(e)}
                        onFocus={(id) => focusStatic?.setActive(id)}
                    />
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
