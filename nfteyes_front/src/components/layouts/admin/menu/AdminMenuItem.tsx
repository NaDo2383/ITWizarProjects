import Link from 'next/link'
import React, { useId } from 'react'
import { IMenuItem } from './_interface'
import { useRouter } from 'next/router'
function MenuItem(props: IMenuItem): JSX.Element {
    const { text, href } = props
    const router = useRouter()
    const keyId = useId()
    return (
        <Link href={href} key={keyId} className={`menuItem ${router.asPath === href ? 'active' : ''}`}>
            {text}
        </Link>
    )
}

export default MenuItem
