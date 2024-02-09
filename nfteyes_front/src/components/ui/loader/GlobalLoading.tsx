import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
import React from 'react'

const GlobalLoading = () => {
    const { isLoadingGlobal } = useSiteGlobalCtx()

    if (isLoadingGlobal) {
        return (
            <div className=" w-full h-full flex  justify-center items-center fixed bg-[#A9A9A940] z-[99999999999]">
                <div className="spinner">
                    <div className="spinner1"></div>
                </div>
            </div>
        )
    }
}

export default GlobalLoading
