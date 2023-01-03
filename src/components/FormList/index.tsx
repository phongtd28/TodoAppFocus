import React from 'react'
import { IProductType } from '../../types/product'
import Button from '../Button'
import { FormListStyled } from './style'
import { CSVLink } from 'react-csv'
import { FormElement } from '../../pages/ListPage'
import { IUser } from '../../types/user'
import { KeyBoard } from '../../constant/KeyBoard'

type Props = {
    title: string
    tab?: number
    users?: Array<IUser> | null
    products?: Array<IProductType> | null
    saveFileToPdf?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement | any>) => void
    onFocus?: (id: string) => void
}

const FormList = (props: Props) => {
    const { title, tab, users, products, saveFileToPdf, onKeyDown, onFocus } = props

    const header = users ? [{ label: 'User Name', key: 'username' }] : [{ label: 'Name', key: 'name' }]

    const data = users ? users : products

    const csvReport = {
        filename: users ? 'usesReport.csv' : 'productsReport.csv',
        headers: header,
        data: data
    }

    const idSaveCsv = tab === 1 ? FormElement.saveCSV1 : FormElement.saveCSV2
    const idSavePdf = tab === 1 ? FormElement.savePDF1 : FormElement.savePDF2
    return (
        <FormListStyled>
            <div className="header__form">
                <div className="gr-title">
                    <span className="title">{title}</span>
                    <div className="">Download as</div>
                </div>
                <div className="gr-btn">
                    {/* <Button text="CSV" color="#0d6a0e" backgroundColor="#c6efce" border="none" padding="2px 8px" margin="0" /> */}

                    <Button tabIndex="-1" color="#0d6a0e" backgroundColor="#c6efce" border="none" padding="2px 8px" margin="0">
                        {data && (
                            <CSVLink
                                id={idSaveCsv}
                                className="csv-link"
                                {...csvReport}
                                onFocus={() => onFocus?.(idSaveCsv)}
                                onKeyDown={(e: any) => {
                                    if (e.key === KeyBoard.Enter) {
                                        document.getElementById(idSaveCsv)?.click()
                                        return
                                    }
                                    onKeyDown?.(e)
                                }}
                            >
                                SAVE CSV
                            </CSVLink>
                        )}
                    </Button>
                    <Button
                        id={idSavePdf}
                        text="PDF"
                        color="#a41117"
                        backgroundColor="#fec7ce"
                        border="none"
                        padding="2px 8px"
                        margin="0"
                        onClick={saveFileToPdf}
                        onFocus={() => onFocus?.(idSavePdf)}
                        onKeyDown={(e) => {
                            if (e.key === KeyBoard.Enter) {
                                saveFileToPdf?.()
                                return
                            }
                            onKeyDown?.(e)
                        }}
                    />
                </div>
            </div>
            <div className="content__form">
                {users?.length &&
                    users.map((item, index) => (
                        <div key={index} className="content">
                            {item.username}
                        </div>
                    ))}
                {products?.length &&
                    products.map((item, index) => (
                        <div key={index} className="content">
                            {item.name}
                        </div>
                    ))}
            </div>
        </FormListStyled>
    )
}

export default React.memo(FormList)
