import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import React from 'react'

function Loading() {
    const { isLoadingWithContract, loadingText } = useGlobalCtx()


    return (
        <div className='loaderContainer' style={{ display: `${isLoadingWithContract ? "flex" : "none"}` }}>
            <div className="loader">
                <div className="loader-text">{loadingText && loadingText + "..."}</div>
                <div className="loader-bar"></div>
            </div>
        </div>
    )
}

export default Loading
