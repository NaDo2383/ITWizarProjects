import React, { useEffect, useState } from 'react'
import useArtwork from 'Components/entities/artwork/useArtwork'
import { motion } from "framer-motion";
import AnimateHeight from "react-animate-height";
import OwnershipResponsiveTable from './OwnershipResponsiveTable'
import OwnershipTable from './OwnershipTable'
import { OwnershipProvider } from './useOwnershipContext'
import SubpageResponsiveMenu from "Components/entities/user/profile/profileSubpage/SubpageResponsiveMenu";

function OwnershipTransaction() {
  const { getOwnedArtworks, changeArtPagination } = useArtwork()
  const [opened, setOpened] = useState(false);

  function isOpen() {
    setOpened(!opened);
  }

  useEffect(() => {
    // getOwnedArtworks(dateQuery)
    return () => {
      changeArtPagination(1)
    }
  }, [])

  return (
    <OwnershipProvider>
      <div className='sm:px-0 px-5'>
        <div className="w-100 pb-10 flex items-center justify-between">
          <div onClick={isOpen} className="text-2xl cursor-pointer lg:hidden">
            <motion.div animate={{ rotate: opened ? [0, 180] : [180, 0] }} transition={{ duration: .4 }}>
            </motion.div>
          </div>
        </div>
        <AnimateHeight duration={400} height={opened ? 'auto' : 0} className="w-full transition duration-400 overflow-hidden">
          <SubpageResponsiveMenu isMobile={true} />
        </AnimateHeight>
        <OwnershipTable />
        <OwnershipResponsiveTable /> 
      </div>
    </OwnershipProvider>
  )
}

export default OwnershipTransaction