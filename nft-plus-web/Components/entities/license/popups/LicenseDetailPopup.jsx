/**
 * @createdBy Phill Anderson 2023/7/4
 */
import React, { useEffect, useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupActionButtons from 'Components/ui/popup/popupMaterials/PopupActionButtons';
import usePopup from 'Components/ui/popup/usePopup';
import useMyPageTranslation from 'locale/useMypageTranslation';
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';
import { LicenseRow } from './licensePopupUi/LicenseRow';
import H2 from 'Components/ui/typography/H2';
import P from 'Components/ui/typography/P';
import { LicenseSubRow } from './licensePopupUi/LicenseRow';
import useArtworkTranslation from 'locale/useArtworkTranslation';
import useFAQpageTranslation from 'locale/useFAQpageTranslation';
import LicenseRightBtn from 'Components/ui/button/LicenseRightBtn';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from './licensePopupUi/LicenseCol';
import useFee from 'Components/entities/artwork/useFee';
import MobileLicenseDetailPopup from './MobileLicenseDetailPopup';
import useCommonTranslation from 'locale/useCommonTranslation';
import { useGlobalContext } from 'common/global/useGlobalContext';

function LicenseDetailPopup() {
    const { browserWindow } = useGlobalContext()
    const {
        hideModal,
        globalModalState,
    } = usePopup();
    const {
        layerTitleI18,
        contractApproval24hoursI18,
        paymentTimingI18,
        contractAmoutI18,
        lisenceAgreementFeeI18,
        worknameI18,
        purpose_to_useI18,
        applicantI18,
        contactI18,
        contractualRightsI18,
        licensePeriodI18, 
        corparateNameI18,
        attribution_andI18,
        authorCopyrightLicensorI18,
        sumI18
    } = useMyPageTranslation();
    const { confirmI18 } = useFAQpageTranslation()
    const { cancel: cancelI18 } = useArtworkTranslation()
    const { requesterNameI18 } = useCommonTranslation()
    const license = globalModalState.license
    const [fee, setFee] = useState(0)
    const { getFee } = useFee()

    useEffect(() => {
        async function getLicenseFee(currency) {
            const { result, failure } = await getFee('LICENSE_ISSUANCE', currency);
            if (failure) {
                if (failure !== 'switchnetwork') {
                    alert(failure);
                }
                return;
            }
            setFee(result);
        }
        if (globalModalState?.license) {
            getLicenseFee(globalModalState?.license?.artworkCurrency)
        }
    }, [globalModalState.license]);

    return (
        <>
            {
                browserWindow.innerWidth > 600 ?
                    <MainPopup width={1145}>
                        <PopupContainer>
                            <h3 className='text-[20px] text-[#E0E6E8] font-[500] text-center mt-[15px]'>{layerTitleI18}</h3>
                            <PopupContent>
                                <div className="w-full pt-[35px] pb-[50px]">
                                    <LicenseContainer>
                                        <LicenseFirstCol>
                                            <ArtworkFileViewer artwork={license} square />
                                            {/*} <div className="flex justify-between border-y border-#DDD;">
                                <span>결제수단</span>
                                <span>{license?.artworkCurrency}</span>
                            </div>
  */}
                                        </LicenseFirstCol>
                                        <LicenseSecondCol>
                                            <LicenseBigTitle text={"계약 내용"} />
                                            <LicenseRow>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>{worknameI18}</H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <P>{license?.artworkName}</P>
                                                </div>
                                            </LicenseRow>
                                            <LicenseRow>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>
                                                        {attribution_andI18} <br />
                                                        {authorCopyrightLicensorI18}
                                                    </H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <P>{license?.artworkOwnerFullname}</P>
                                                </div>
                                            </LicenseRow>
                                            <LicenseRow>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>{requesterNameI18}</H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <P>{license?.buyerFullname}</P>
                                                </div>
                                            </LicenseRow>
                                            <LicenseRow>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>{applicantI18}</H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <LicenseSubRow>
                                                        <div className="w-2/5 min-w-[150px]">
                                                            <H2>{corparateNameI18}</H2>
                                                        </div>
                                                        <div className="w-3/5">
                                                            <p>{license?.applicantAddress}</p>
                                                        </div>
                                                    </LicenseSubRow>
                                                    <LicenseSubRow>
                                                        <div className="w-2/5 min-w-[150px]">
                                                            <H2>주소</H2>
                                                        </div>
                                                        <div className="w-3/5">
                                                            <p>{license?.applicantContact}</p>
                                                        </div>
                                                    </LicenseSubRow>
                                                    <LicenseSubRow>
                                                        <div className="w-2/5 min-w-[150px]">
                                                            <H2>{contactI18}</H2>
                                                        </div>
                                                        <div className="w-3/5">
                                                            <p>{license?.applicantName}</p>
                                                        </div>
                                                    </LicenseSubRow>
                                                </div>
                                            </LicenseRow>
                                            <LicenseRow>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>{contractualRightsI18}</H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <div className="flex gap-1 flex-wrap">
                                                        {
                                                            license?.rights?.length > 0 &&
                                                            license?.rights?.map((right, idx) => (
                                                                <LicenseRightBtn key={'right-' + idx} text={right?.code} />
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </LicenseRow>
                                            <LicenseRow>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>{licensePeriodI18}</H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <div className="flex items-center gap-5">
                                                        <p>
                                                            {license?.permissionPeriod}
                                                        </p>
                                                    </div>
                                                </div>
                                            </LicenseRow>
                                            <LicenseRow yCenter>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>{purpose_to_useI18}</H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <p>{license?.purpose}</p>
                                                </div>
                                            </LicenseRow>
                                            <div className="pt-[50px]">
                                                <LicenseBigTitle text={"계약 금액"} />
                                            </div>
                                            <LicenseRow yCenter>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>{contractAmoutI18}</H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <div className="flex gap-2 items-center">
                                                        <p>{license?.paymentAmount}</p>
                                                        <p>{license?.artworkCurrency} <span className='text-[#B0B0B0] text-[14px]'>({sumI18})</span></p>
                                                    </div>
                                                </div>
                                            </LicenseRow>
                                            <LicenseRow yCenter>
                                                <div className="w-2/5 min-w-[150px]">
                                                    <H2>{paymentTimingI18}</H2>
                                                </div>
                                                <div className="w-3/5">
                                                    <p className="text-[#CF6081]">
                                                        {contractApproval24hoursI18}
                                                    </p>
                                                </div>
                                            </LicenseRow>
                                            <LicenseRow yCenter>
                                                <div className="w-2/5 min-w-[150px]min-w-[150px]">
                                                    <H2>{lisenceAgreementFeeI18}</H2>
                                                </div>
                                                <div className="w-3/5 flex gap-[4px]">
                                                    <p className="text-[#FFF] sm:text-[16px] text-[14px] font-[400]">
                                                        {license?.paymentAmount ? ((fee / 100) * license?.paymentAmount).toFixed(2) : 0} {license?.artworkCurrency}
                                                    </p>
                                                    <p className="text-[#B0B0B0] sm:text-[16px] text-[14px] font-[400]">
                                                        ({fee}%)
                                                    </p>
                                                </div>
                                            </LicenseRow>
                                        </LicenseSecondCol>
                                    </LicenseContainer>
                                </div>
                            </PopupContent>
                            <PopupActionButtons
                                yes={() => hideModal()}
                                no={() => hideModal()}
                                btnTexts={{ no: cancelI18, yes: confirmI18 }}
                            />
                        </PopupContainer>
                    </MainPopup>
                    :
                    <MobileLicenseDetailPopup />
            }

        </>

    )
}

export default LicenseDetailPopup