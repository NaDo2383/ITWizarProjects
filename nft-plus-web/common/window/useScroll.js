/**
 * @createdBy Phill Anderson 2022/02/27
 */
import { useGlobalContext } from 'common/global/useGlobalContext'
import React, { useCallback, useState , useRef, useEffect } from 'react'
import { debounce } from 'utils/timer'
function useScroll(ref, options={}) {
  const { reCalculate } = options
  const scrollRef = useRef(null)
  const { setGlobalItems } = useGlobalContext()
  const [ scroll, setScroll ] = useState({
    scrollY: null,
    scrollX: null,
    scrollHeight: null,
  })

  const [ refScroll, setRefScroll ] = useState({
    scrollTop: null,
    scrollLeft: null,
    scrollHeight: null,
  })

  const handleCurrentRefElScroll = () => {
      if(ref.current) {
        const { scrollLeft, scrollTop, scrollHeight } = ref.current
        setRefScroll((prev) => ({
            ...prev, 
            scrollLeft, scrollTop, scrollHeight
        }))
      }
  }
  
  const handleCurrentElScroll = (e) => {
    const scrollY = e.target?.scrollTop
    const scrollX = e.target?.scrollLeft
    const scrollHeight = e.target?.scrollHeight
    setScroll( ( prev ) => ( { ...prev, scrollX, scrollY, scrollHeight } ))
  }
  // тухайн dom элэмэнтийн onScroll дээр ажиллуулна
  const debouncedCurrentElScroll = debounce((e) => handleCurrentElScroll(e), 500)

  const handleFullWindowScroll = () => {
    const el = window
    const scrollY = el.pageYOffset 
    const scrollX = el.pageXOffset 
    setScroll( ( prev ) => ( { ...prev, scrollX, scrollY } ))
  }

  const handleScrollIntoView  = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }

  const handleScrollIntoTop = () => {
    const el = window 
    el.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' 
    })
  }

  useEffect(() => {
      if(ref.current) {
          handleCurrentRefElScroll()
          const domObject = ref.current
          const debouncedRefScroll = debounce(() => handleCurrentRefElScroll(), 500)
          domObject.addEventListener('scroll', debouncedRefScroll)
          return () => domObject.removeEventListener('scroll', debouncedRefScroll)
      }
  },[reCalculate])

    return { 
      scroll, 
      refScroll,
      handleFullWindowScroll, 
      debouncedCurrentElScroll, 
      handleScrollIntoView, 
      handleScrollIntoTop 
    }
}

export default useScroll