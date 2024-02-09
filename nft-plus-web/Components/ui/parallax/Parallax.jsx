import React, { useRef } from 'react'
import { useScroll, motion } from 'framer-motion'
import useParallax from './useParallax'

function Parallax({ children }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 300)
  return (
    <section>
        <div ref={ref}>
            { children }
        </div>
    </section>
  )
}

export default Parallax