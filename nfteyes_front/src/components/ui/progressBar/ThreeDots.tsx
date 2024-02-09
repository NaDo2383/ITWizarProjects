import React from 'react'
import { motion, Variants } from 'framer-motion'
import tw from 'tailwind-styled-components'
function ThreeDots({ isEnded }: { isEnded: boolean }) {
    console.log(isEnded)
    const dotVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 2,
                staggerChildren: 1,
                repeat: Infinity,
            },
        },
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={dotVariants} className="flex">
            <DotTw variants={dotVariants}>.</DotTw>
            <DotTw variants={dotVariants}>.</DotTw>
            <DotTw variants={dotVariants}>.</DotTw>
        </motion.div>
    )
}

interface IDotTw extends React.ComponentProps<typeof motion.span> {}
const DotTw = tw(motion.span)<IDotTw>`
    text-24
`

export default ThreeDots
