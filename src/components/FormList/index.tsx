import React from 'react'
import { IProductType, IUserType } from '../../types/homepage'
import Button from '../Button'
import { FormListStyled } from './style'
import { CSVLink } from 'react-csv'

type Props = {
    title: string
    users?: Array<IUserType> | null
    products?: Array<IProductType> | null
    saveFileToPdf?: () => void
}

const FormList = (props: Props) => {
    const { title, users, products, saveFileToPdf } = props

    const header = users ? [{ label: 'User Name', key: 'username' }] : [{ label: 'Name', key: 'name' }]

    const data = users ? users : products

    const csvReport = {
        filename: users ? 'usesReport.csv' : 'productsReport.csv',
        headers: header,
        data: data
    }
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
                            <CSVLink className="csv-link" {...csvReport}>
                                SAVE CSV
                            </CSVLink>
                        )}
                    </Button>
                    <Button text="PDF" color="#a41117" backgroundColor="#fec7ce" border="none" padding="2px 8px" margin="0" onClick={saveFileToPdf} />
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
