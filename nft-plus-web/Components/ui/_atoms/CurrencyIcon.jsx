import Image from 'next/image';
import React from 'react'

function CurrencyIcon({ currency }) {
    const url = currency === 'MATIC' ? '/matic-logo.svg': '/eyesicon.svg';
  return (
    <Image  src={url} width={16} height={16} alt={'artwork-currency-icon'} />
  )
}

export default CurrencyIcon