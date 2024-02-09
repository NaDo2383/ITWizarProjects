import React, { useEffect } from 'react'
import PerWallet from './PerWallet'
import AddWalletBtn from './addWalletBtn'
import useRegisteredWallet from './useRegisteredWallet'
import useMyPageTranslation from 'locale/useMypageTranslation'

function Wallets() {
  const {
    walletNotLinkedI18,
    numberI18,
    deleteOnTableI18,
    addressI18,
    registered_walletI18
  } = useMyPageTranslation()
  const {
    activeWallets,
    walletLoading
  } = useRegisteredWallet()


  return (
    <div>
      <h3 className='text-[22px] font-[700] text-[#D4D4D4]'>{registered_walletI18}</h3>
      {
        activeWallets?.length > 0 ?
          <>
            <div className='w-full min-h-[250px]'>
              <table className="w-full border">
                <thead className="bg-gray-100 border-t-2">
                  <tr className="border-b">
                    <th className="py-2 font-[500] w-48 px-4 border-r">{numberI18}</th>
                    <th className="py-2 font-[500]">{addressI18}</th>
                    <th className="py-2 font-[500] w-48 px-4 border-l">
                      {deleteOnTableI18}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    activeWallets.map((wallet, idx) => (
                      <PerWallet key={'active-wallet-' + idx} {...wallet} mapId={idx} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </> : (
            <div className='shadow-sm rounded-xl bg-gray-100 gap-4 py-12 flex-col w-full h-full flex items-center justify-center'>
              <p className='text-[#666] font-bold'>{walletNotLinkedI18}</p>ddd
            </div>
          )
      }
      <div className='flex justify-center'>
        <AddWalletBtn loading={walletLoading?.addBtnLoading} />
      </div>
    </div>
  )
}

export default Wallets