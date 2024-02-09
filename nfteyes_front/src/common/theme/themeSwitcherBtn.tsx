'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const ThemeSwitcherBtn = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            className={`w-[300px] px-4 dark:bg-orange dark:text-white`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'light' ? 'Dark' : 'Light'}
        </button>
    )
}
