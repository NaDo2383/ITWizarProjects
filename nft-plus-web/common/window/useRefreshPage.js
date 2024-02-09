/**
 * @createdBy Phill Anderson 2022/06/28
 */

import { useRouter } from "next/router"

function useRefreshPage() {
    const { asPath, replace } = useRouter()

    async function handleRefresh() {
        replace(asPath)
    }
    return { 
        handleRefresh
    }
}

export default useRefreshPage