"use client"
import AppWrappers from "./AppWrappers"
import { UserProvider } from "./features/user/useUserContext"
import { GlobalProvider } from "./common/global/useGlobalCtx"


export default function RootLayout({ children }) {

    return (
        <html lang='en'>
            <body id={"root"}>
                <GlobalProvider>
                    <UserProvider>
                        <AppWrappers>{children}</AppWrappers>
                    </UserProvider>
                </GlobalProvider>
            </body>
        </html>
    )
}
