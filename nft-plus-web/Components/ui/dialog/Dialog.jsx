/**
 * @createdBy Phill Anderson 2023/02
 */
import React, { useEffect } from 'react'

function Dialog(props) {
    const { text, setIsShow } = props

    useEffect(() => {
        const timeout = setTimeout(() => {
          setIsShow(false)
          }, 5000);
        return () => clearTimeout(timeout)
    },[])

  return (
    <div className={`fixed right-4 top-20 lg:top-32 opacity-100 z-30 transition rounded-lg duration-300  bg-red-400 text-white flex items-center justify-center py-3 px-8 border-2`}>
      {text}
    </div>
  )
}

export default Dialog