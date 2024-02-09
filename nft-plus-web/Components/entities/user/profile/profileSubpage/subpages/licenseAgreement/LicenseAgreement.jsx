/**
 * @createdBy duka
 */
import React, { useEffect, useState } from "react";
import ContractReview from "./licensePanels/contractReview/ContractReview";
import useMyPageTranslation from "locale/useMypageTranslation";
import CompletedContract from "./licensePanels/completedContract/CompletedContract";
import LicenseTab from "./licensePanels/contractReview/LicenseTab";
import { useRouter } from "next/router";
import usePopup from "Components/ui/popup/usePopup";
import { useGlobalContext } from "common/global/useGlobalContext";

const licenseTabs = [
    <ContractReview key={"fbkjdg"} />,
    <CompletedContract key={"nrieqngore"} />
]

function NewLicenseAgreementPage() {
    const { contractReviewI18, completedContractI18, licenseAgreementI18 } = useMyPageTranslation()
    const { query, pathname } = useRouter()
    const [tabIndex, setTabIndex] = useState(0);
    const { setGlobalItems } = useGlobalContext()
    const lists = [
        { value: contractReviewI18 },
        { value: completedContractI18 }
    ];
    const { setGlobalModalState } = usePopup()

    useEffect(() => {
        // өөр хуудаснаас энэ tab - уудын extraSubpage - рүү үсрэх тохиргоог зөвхөн энд бичиж өгнө үү ;
        // const val = query.extrasubpage === 'completed-contracts' ? 1 : 0
        // setTabIndex(val)
        switch (query.extrasubpage) {
            case '': setTabIndex(); break;
            case 'completed-contract': setTabIndex(1); break;
            default: setTabIndex(0)
        }
        setGlobalModalState(prev => ({
            ...prev,
            changeSubtab: (activeTabId) => setTabIndex(activeTabId)
        }))
    }, [query])

    return (
        <>
            <div className='py-[30px]'>
                <h6 className="text-[15px] font-[500] text-[#DDD] text-center sm:hidden mb-[45px] md:mb-0">{licenseAgreementI18}</h6>
                <div className='mb-[45px] px-[16px] sm:px-0'>
                    <LicenseTab
                        lists={lists}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                    />
                </div>
                {
                    licenseTabs[tabIndex]
                }
            </div>
        </>
    )
}

export default NewLicenseAgreementPage;