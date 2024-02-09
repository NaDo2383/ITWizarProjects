import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
// import { JsxChildren } from '../types/common'

export function ThemeProvider({ children }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </NextThemesProvider>
    )
}
