import { IMenuItem } from 'components/layouts/admin/menu/_interface'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import React from 'react'

function SiteNavbarItem(props: IMenuItem) {
    const { text, href } = props
    // const router = useRouter()
    // const isActive = router.asPath === href
    return (
        <li className="mt-[23px] mb-[17px]">
            <Link href={href} className={``}>
                {text}
            </Link>
        </li>
    )
}

export default SiteNavbarItem
