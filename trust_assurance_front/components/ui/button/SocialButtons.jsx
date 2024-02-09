import React from 'react'
import Link from 'next/link'
export function GoogleBtn() {
  return (
    <Link href="#" className="login-other-item">
                                            <img src="/assets/images/google.png" alt="" />
                                            <span>Sign with google</span>
                                        </Link>
  )
}


export function  FacebookBtn() {
  return (
    <Link href="#" className="login-other-item">
                                            <img src="/assets/images/facebook.png" alt="" />
                                            <span>Sign with facebook</span>
                                        </Link>
  )
}

export function AppleBtn() {
  return (
    <Link href="#" className="login-other-item">
      <img src="/assets/images/apple.png" alt="" />
      <span>Sign with apple</span>
  </Link>
  )
}