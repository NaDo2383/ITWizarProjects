import React from 'react'
import MenuItem from './AdminMenuItem'
import { IMenu } from './_interface'
/**
 * @createdBy Phill Anderson 2022/11/15
 */
function AdminMenu(props: IMenu): JSX.Element {
    const { items } = props
    return (
        <nav className={`flex flex-row`}>
            {items?.length > 0 && items.map((item, idx) => <MenuItem key={item.text + idx} {...item} />)}
        </nav>
    )
}

export default AdminMenu
