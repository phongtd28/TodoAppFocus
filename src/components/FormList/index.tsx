import React from 'react'
import { IProductType, IUserType } from '../../types/homepage'
import Button from '../Button'
import { FormListStyled } from './style'

type Props = {
    title: string
    users?: Array<IUserType> | null
    products?: Array<IProductType> | null
}

const FormList = (props: Props) => {
    const { title, users, products } = props
    console.log(users)
    console.log(products)
    return (
        <FormListStyled>
            <div className="header__form">
                <div className="gr-title">
                    <span className="title">{title}</span>
                    <div className="">Download as</div>
                </div>
                <div className="gr-btn">
                    <Button text="CSV" color="#0d6a0e" backgroundColor="#c6efce" border="none" padding="2px 8px" margin="0" />
                    <Button text="PDF" color="#a41117" backgroundColor="#fec7ce" border="none" padding="2px 8px" margin="0" />
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
