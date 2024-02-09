import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export function GoogleBtn() {
    return (
        <Link href="#" className="login-other-item">
            <Image src="/assets/images/google.png" alt="" width={100} height={100} />
            <span>Sign with google</span>
        </Link>
    )
}

export function FacebookBtn() {
    return (
        <Link href="#" className="login-other-item">
            <Image src="/assets/images/facebook.png" alt="" width={100} height={100} />
            <span>Sign with facebook</span>
        </Link>
    )
}

export function AppleBtn() {
    return (
        <Link href="#" className="login-other-item">
            <Image src="/assets/images/apple.png" alt="" width={100} height={100} />
            <span>Sign with apple</span>
        </Link>
    )
}
