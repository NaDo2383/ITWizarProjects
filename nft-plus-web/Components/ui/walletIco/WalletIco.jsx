import React, { useState } from 'react'
import walletIco from 'public/ikcon.png'
import Image from 'next/image'
import { useRouter } from 'next/router'

function WalletIco() {
    const [ isShowTooltip, setIsShowTooltip] = useState(false)
    const { push } = useRouter()
    
  return (
    <Image
        src={walletIco}
        alt="wallet-image"
        className='cursor-pointer'
        onClick={() => push('/mypage/wallet')}
        onMouseEnter={() => setIsShowTooltip(true) }
        onMouseLeave={() => setIsShowTooltip(false)}
    />
  )
}

export default WalletIco