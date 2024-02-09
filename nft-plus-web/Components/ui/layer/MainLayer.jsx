import React from 'react'
import Backdrop from 'Components/ui/popup/BackDrop'
import {motion} from 'framer-motion'
function MainLayer(props) {
    const { children,isOpen, width } = props;
  return (
    <Backdrop isLayer={isOpen}>
        <motion.div
            animate={{ scale: isOpen ? [0.5, 1.2, 0.9, 1.1, 1] : 0.5 }}
            transition={{ duration: 0.5 }}
            className={`${width ? width : "w-[572px]"
          } rounded-[10px] overflow-hidden overflow-y-auto max-h-screen relative  bg-white flex flex-col`}
        >
            {children}
      </motion.div>
    </Backdrop>
  )
}

export default MainLayer