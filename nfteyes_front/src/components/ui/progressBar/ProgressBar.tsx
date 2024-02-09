import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import tw from 'tailwind-styled-components'
// import ThreeDots from './ThreeDots'
interface IProgressBar {
    progress: number
    isEnded: boolean
}
function ProgressBar(props: IProgressBar) {
    const { progress } = props
    // eslint-disable-next-line
    const [animationControl, setAnimationControl] = useState(useAnimation())

    useEffect(() => {
        // eslint-disable-next-line
        animationControl.start({ width: `${progress}%` })
    }, [progress, animationControl])

    return (
        <ProgressBarTw role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div
                className="h-[16px] progress-bar-gradient-bg transition-all duration-200"
                initial={{ width: 0 }}
                animate={animationControl}
            />
            <PBarCaption>
                {/* {isEnded ? (
                    <p>Уншиж дууслаа</p>
                ) : (
                    <>
                        <p>уншиж байна</p>
                        <ThreeDots isEnded={isEnded} />
                    </>
                )} */}
            </PBarCaption>
        </ProgressBarTw>
    )
}

const ProgressBarTw = tw.div`
  relative
  w-[100%]
  my-[20px]
  border 
  border-[#ccc]
  overflow-hidden
  bg-aspalt
  rounded-lg
`

const PBarCaption = tw.div`
  absolute
  top-0
  left-[50%]
  -translate-x-[50%]
  flex
`

export default ProgressBar
