import React from 'react'
import FAQ from '../faqs/FAQ'
import Qna from '../qnas'
import useTab from 'Components/ui/tab/useTab'

const uguidetabPanels = [
    <FAQ />,
    <Qna />
]
function UguideTabPanel() {
    const { activeTabId } = useTab()
  return (
    <div>{ uguidetabPanels[activeTabId] }</div>
  )
}

export default UguideTabPanel