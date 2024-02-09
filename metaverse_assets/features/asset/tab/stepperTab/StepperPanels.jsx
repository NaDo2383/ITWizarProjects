import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'
import React from 'react'
import AssetCreatePanel from './panels/AssetCreatePanel'
import CopyrightCreatePanel from './panels/CopyrightCreatePanel'
import LicenseCreatePanel from './panels/LicenseCreatePanel'

const stepperPanels = [
    <AssetCreatePanel key={'kgskjfi3w432'} />,
    <CopyrightCreatePanel key={'kgskjfi3w432'} />,
    <LicenseCreatePanel key={'gsfr342hu34'} />,
]

function StepperPanels() {
    const { activeTabId } = useTabCtx()
    return <div>{stepperPanels[activeTabId]}</div>
}

export default StepperPanels
