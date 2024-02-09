import { useState, useEffect } from 'react'
// progressbar дуудсан газарт дуудаж ашиглана
function useProgressBar(progressPercent: number) {
    const [progress, setProgress] = useState<number>(0)
    const [isEnded, setIsEnded] = useState<boolean>(false)

    useEffect(() => {
        setProgress(progressPercent)
    }, [])

    useEffect(() => {
        // const interval = setInterval(() => {
        //     if (progressPercent > 10) {
        //         if (progress < 100) setProgress(progress + 5)
        //     }
        // }, 500)

        if (progressPercent === 100) setIsEnded(true)
        else if (progressPercent <= 100) setIsEnded(false)

        // if (progress === 100) clearInterval(interval)

        // return () => clearInterval(interval)
    }, [progressPercent])
    return {
        progress,
        isEnded,
    }
}

export default useProgressBar
