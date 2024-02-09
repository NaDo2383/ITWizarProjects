import React from 'react'
import RoundButton from "Components/ui/button/RoundButton";
import useAbout from './useAbout';
import useTab from 'Components/ui/tab/useTab';

function FileDownloadButtons() {
    const { abouts } = useAbout()
    const { activeTabId } = useTab()
    const activePanelData = abouts?.result[activeTabId]

    return (
        <div className='flex justify-center'>
            <div className="w-full min-w-[328px] flex justify-end sm:pb-[20px] pb-[10px] sm:gap-[10px] gap-[5px]">
                {
                    activePanelData?.instructionUrl && activePanelData.instructionName &&
                    <RoundButton width={274}>
                        <a target='_blank' href={activePanelData.instructionUrl} rel='noreferrer' className='sm:text-[18px] text-[12px]'>
                            {activePanelData.instructionName}
                        </a>
                    </RoundButton>
                }
                {
                    activePanelData?.introductionUrl && activePanelData.introductionName &&
                    <RoundButton width={274}>
                        <a target='_blank' href={activePanelData.introductionUrl} rel='noreferrer' className='sm:text-[18px] text-[12px]'>
                            {activePanelData.introductionName}
                        </a>
                    </RoundButton>
                }
            </div>
        </div>
    )
}

export default FileDownloadButtons