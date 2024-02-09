import React from 'react'
import useTab from 'Components/ui/tab/useTab';

function SellartTabLink(props) {
    const { text, subText, linkId, disabled } = props
    const { activeTabId, setActiveTabId } = useTab()
    const isActive = linkId === activeTabId

    return (
        <button
            disabled={disabled}
            onClick={() => setActiveTabId(linkId)}
            className={`${isActive ? "bg-[#FB3873] border-[#FB3873]" : "bg-[#282828] border-[#282828]"} w-1/2 sm:py-[38px] sm:rounded-[20px] rounded-[5px] ${disabled ? 'bg-gray-300 cursor-not-allowed' : ''} py-[15px] px-[24px]`}>
            <div className="flex justify-center items-center sm:mb-[10px] mb-[5px]">
                <h3 className={`text-white lg:text-[24px] sm:text-[18px] text-[14px] sm:tracking-[-1px] sm:leading-[30px] md:leading-[40px] ${isActive ? "font-[500]" : "font-[700]"}`}>
                    {text}
                </h3>
            </div>
            <p className={`${isActive ? "text-[#fff]" : "text-[#E6E6E6]"} lg:text-[18px] sm:text-[16px] text-[13px] sm:tracking-[-1px] sm:leading-[20px] md:leading-[22px] font-[400]`}>
                {subText}
            </p>
        </button>
    )
}

export default SellartTabLink