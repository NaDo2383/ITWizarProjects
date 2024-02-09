import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Logo() {
  return (
          <div className="flex items-center pl-4 cursor-pointer">
            <Link passHref href="/">
                <a>
                    <Image
                        width={255}
                        height={30}
                        src={'/TAMTAM_beta_ci.png'}
                        priority
                        alt="desktop-logo"
                    />
                </a>
            </Link>
          </div>
  )
}

export default Logo