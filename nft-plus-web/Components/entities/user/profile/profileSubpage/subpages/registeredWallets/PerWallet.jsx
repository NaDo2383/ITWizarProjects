import React, { useState } from 'react'
import { IoIosCheckmark } from "react-icons/io";
import { RiFileCopyLine } from "react-icons/ri";
import { BiLoaderCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import useMyPageTranslation from 'locale/useMypageTranslation';
import copy_ic from "public/copyic.png";
import del_ic from "public/delic.png";
import Image from 'next/image';
import useRegisteredWallet from './useRegisteredWallet';

function PerWallet(props) {
    const { id, address, mapId } = props
    const { copyI18 } = useMyPageTranslation()
    const {   
        copyWalletHandler,
        copied,
        deleted,
        activeIndex
    } = useRegisteredWallet()

  return (
    <tr className="border-b text-center  text-[#333]">
        <td className="border-r py-2 font-[600]">{mapId + 1}</td>
        <td className="py-2 sm:px-8">
            <div className="w-full flex items-center gap-2 justify-center">
                <p className="sm:hidden">
                    { address.slice(0, 4)}...{address.slice(-6) }
                </p>
                <p className="hidden sm:block">{address}</p>
            <div
                onClick={() => copyWalletHandler(id, address)}
                className="flex items-center relative justify-center rounded-full text-2xl text-green-400 bg-gray-200 w-[35px] h-[35px] cursor-pointer group"
            >
            <motion.div
                id="proBtn"
                transition={{ duration: 0.3 }}
                className={`absolute left-1/2 z-30 hidden md:flex duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 top-[40px] text-center transform w-max bg-gray-100 text-[#444] rounded-xl before:absolute before:border-8 before:transform before:-translate-x-1/2 before:border-t-transparent before:left-1/2 before:bottom-full before:border-l-transparent before:border-r-transparent -translate-x-1/2 border px-6 transition`}
            >
                <ul>
                    <div className="relative cursor-pointer">
                        <h5 className="text-sm py-2">{ copyI18 }</h5>
                    </div>
                </ul>
            </motion.div>
                    {copied && activeIndex === id ? (
                      <>
                        <RiFileCopyLine />
                        <div className="absolute z-10 text-xs top-1/2 left-1/2 transform -translate-x-2/3 -translate-y-1/3">
                          <IoIosCheckmark />
                        </div>
                      </>
                    ) : (
                        <Image lsrc={copy_ic} alt="copy_ic" />
                    )}
                  </div>
                </div>
              </td>
              <td className="border-l py-2">
                <div
                  className="mx-auto flex justify-center text-red-400 cursor-pointer items-center w-[36px] h-[36px] rounded-full bg-gray-200"
                >
                  {deleted && activeIndex === id ? (
                    <div className="w-max mx-auto animate-spin">
                      <BiLoaderCircle />
                    </div>
                  ) : (
                    <Image  src={del_ic} alt="del_ic" />
                  )}
                </div>
              </td>
            </tr>
  )
}

export default PerWallet