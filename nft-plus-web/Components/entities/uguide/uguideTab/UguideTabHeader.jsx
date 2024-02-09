import React, { useEffect } from 'react'
import UguideTabLink from './UguideTabLink'
import useFAQpageTranslation from 'locale/useFAQpageTranslation';
import useTab from 'Components/ui/tab/useTab';
import { useRouter } from 'next/router';

function UguideTabHeader() {
    const {
        tab2Title,
        tab3Title
    } = useFAQpageTranslation();
    const uguideHeaderItems = [
        {
            id: 0,
            text: tab2Title,
        },
        {
            id: 1,
            text: tab3Title
        }
    ]
    const { query } = useRouter()
    const { setActiveTabId } = useTab()

    useEffect(() => {
        if (query.subtab === 'contact-us') {
            setActiveTabId(1)
        }
    }, [query])

    return (
        <div className="flex m-auto text-[#fff] w-full sm:max-w-[1410px] min-w-[360px]">
            {
                uguideHeaderItems?.map((item, idx) => (
                    <UguideTabLink key={'uguide-tab-item-' + idx} {...item} />
                ))
            }
        </div>
    )
}

export default UguideTabHeader