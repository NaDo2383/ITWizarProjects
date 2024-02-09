/**
 * @createdBy duka 
 */
import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useMypageTranslation from "locale/useMypageTranslation";
import { PopContainer } from 'Components/ui/popup/popupUi';
import useWallet from 'common/metamask/useWallet';
import useLicense from '../useLicense';
import { displayDate, displayBetweenDates } from "utils/date"

function MobileLicenseCheckContractPopup2() {
    const { locale } = useRouter();
    const {
        contractTitleI18,
        authorCopyrightLicensorI18,
        admin_descI18,
        user_descI18,
        regarding_permissionI18,
        article_1I18,
        article_1_descriptionI18,
        article_2I18,
        article_2_descriptionI18,
        titleI18,
        writerI18,
        classificationI18,
        works_of_artI18,
        rightI18,
        article_3I18,
        article_3_description1_I18,
        article_3_description3_I18,
        article_4_I18,
        article_4_description1_I18,
        rightHolderUserI18,
        article_4_description2_I18,
        article_4_description3_I18,
        article_4_description4_I18,
        article5I18,
        article_5_description1I18,
        article_5_description2I18,
        payment_methodI18,
        semenI18,
        sumI18,
        paymentDeadlineI18,
        descI18,
        article5Description3I18,
        article5Description4I18,
        article5Description5I18,
        article6I18,
        article_6_description1I18,
        article_6_description1_1_I18,
        article_6_description1_2_I18,
        article_6_description1_3_I18,
        article_6_description2_I18,
        article_6_description2_1_I18,
        article_6_description2_2_I18,
        article_7_I18,
        article_7_descriptionI18,
        article_8I18,
        article_8_description1_I18,
        article_8_description2_I18,
        article_8_description3_I18,
        article_9_I18,
        article_9_description_I18,
        article_10_I18,
        article_10_description_I18,
        article_11_I18,
        article_11_1_I18,
        article_11_2_I18,
        article_12_I18,
        article_12_description_I18,
        article_13_I18,
        article_13_description1_I18,
        article_13_description2_I18,
        article_14_I18,
        article_14_description_I18,
        article_15_I18,
        article_15_description_I18,
        admin_I18,
        sign_I18,
        contactI18,
        addressI18,
        copyright_userI18,
        next1I18,
        confirmContractI18,
        confirmI18,
    } = useMypageTranslation();
    const { allRightsI18 } = useArtworkTranslation();
    const {
        hideAllModals,
        handleShowModal,
        MODAL_TYPES,
        globalModalState,
        setGlobalModalState
    } = usePopup();
    const { postLicenseApprove } = useLicense()
    const license = globalModalState?.license
    const { walletIsMatch } = useWallet()

    const enteredAddress = globalModalState?.checkConfirmProps?.enteredAddress || license?.artworkName;
    const enteredContact = globalModalState?.checkConfirmProps?.enteredContact || license?.artworkName;
    const id = globalModalState?.checkConfirmProps?.id || license?.id;
    const ownerName = globalModalState?.checkConfirmProps?.ownerName || license?.artworkName;


    function showCheckContractRefusalPopup() {
        handleShowModal(MODAL_TYPES.LICENSE_CONTRACT_REFUSAL)
    }
    async function acceptAgreement() {
        const { isMatchWallet, currentMetaWallet } = await walletIsMatch()
        if (!isMatchWallet) {
            alert(registerYourWalletI18)
            return
        }
        const payload = {
            ownerContact: enteredContact,
            ownerAddress: enteredAddress,
            ownerName,
            id,
            walletAddress: currentMetaWallet
        }
        await postLicenseApprove(payload)
        await globalModalState?.getLicenseList()
    }

    function handleAgreement() {
        acceptAgreement()
            .then(() => handleShowModal(MODAL_TYPES.LICENSE_AGREEMENT))
            .catch((e) => console.error(e))
    }

    useEffect(() => {
        return () => {
            setGlobalModalState(prev => ({
                ...prev,
                noActionsButtons: false
            }))
        }
    }, [])

    return (
        <div className='sm:hidden'>
            <MainPopup>
                <PopContainer>
                    <h3 className='sm:text-[22px] text-[20px] text-[#E0E6E8] font-[500] text-center mt-[15px]'>{confirmContractI18}</h3>
                    <PopupContent>
                        <div className=' bg-white rounded-[5px] mt-[15px] sm:px-[30px] px-[15px] py-[25px] sm:max-h-[750px] max-h-[483px] overflow-y-auto sm:mb-[40px] mb-[60px]'>
                            <div className="tracking-tighter max-w-[800px] mx-auto">
                                <div className="w-fullsm:px-10 text-[#000] sm:text-[16px] text-[13px]">
                                    <div className="font-bold text-center">
                                        <h3 className='sm:text-[24px] text-[14px]'>{contractTitleI18}</h3>
                                    </div>
                                    <div className="pt-5">
                                        <p className="sm:text-[16px] text-[13px] text-[#000]">
                                            {authorCopyrightLicensorI18}{" "}
                                            <span className="font-bold">
                                                {license?.artworkOwnerFullname ? license?.artworkOwnerFullname : " "}
                                            </span>{" "}
                                            {admin_descI18}
                                            <span className=" font-bold">
                                                {license?.buyerFullname}
                                            </span>{" "}
                                            {user_descI18}
                                            <span className=" font-bold">
                                                {license?.artworkName ? license?.artworkName : " "}
                                            </span>{" "}
                                            {regarding_permissionI18}
                                        </p>
                                    </div>
                                    <div className="pt-5  font-medium text-center">
                                        <span className="pr-8">{next1I18}</span>
                                    </div>
                                    <div className="pt-5  font-bold">
                                        {article_1I18}
                                    </div>
                                    <div className="pt-2 ">
                                        {article_1_descriptionI18}
                                    </div>
                                    <div className="pt-5  font-bold">
                                        {article_2I18}
                                    </div>
                                    <div className="pt-2 ">
                                        {article_2_descriptionI18}
                                    </div>
                                    <div className="pt-5 ">
                                        {titleI18}:{" "}
                                        <span className=" font-bold text-[#000]">
                                            {license?.artworkName ? license?.artworkName : " "}
                                        </span>
                                    </div>
                                    <div className="pt-2 text-[#000]">
                                        {writerI18}:{" "}
                                        <span className=" font-bold text-[#000]">
                                            {license?.artworkOwnerFullname ? license?.artworkOwnerFullname : " "}
                                        </span>
                                    </div>
                                    <div className="pt-2 text-[#000]">
                                        <p className='sm:text-[18px] text-[13px] text-[#000]'>
                                            {classificationI18}:{" "}
                                            <span className="pl-1  font-bold ">
                                                {works_of_artI18}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="pt-2 flex text-[#000]">
                                        <p className="sm:text-[18px] text-[13px] text-[#000]">{rightI18}:</p>
                                        <div className="pl-2 text-[#000]">
                                            {license?.rights &&
                                                license?.rights.map((item, idx) => (
                                                    <div key={'right-' + idx} className="inline-flex  items-center">
                                                        {/* <HiCheck className="text-[#ff00e4] text-lg" /> */}
                                                        <div className='w-[16px] h-[16px] bg-black' />
                                                        <p className="sm:text-[18px] text-[13px] ml-[4px] mr-[10px] text-[#000]">
                                                            {allRightsI18[item.code]}
                                                        </p>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="pt-5  font-bold text-[#000]">
                                        {article_3I18}
                                    </div>
                                    <div className="pt-2">
                                        <p className='sm:text-[18px] text-[13px] text-[#000]'>
                                            {article_3_description1_I18}
                                            <span className="font-bold">{displayBetweenDates(license?.permissionPeriod, locale)}</span>
                                            {article_3_description3_I18}
                                        </p>
                                    </div>
                                    <div className="pt-5  font-bold">
                                        {article_4_I18}
                                    </div>
                                    <div className="pt-2 ">
                                        (1) {article_4_description1_I18}
                                    </div>
                                    <div className="pt-5 ">
                                        (2) {rightHolderUserI18}{" "}
                                        <span className=" font-bold">
                                            {displayDate(license?.modifiedDate, locale)}
                                        </span>
                                        {article_4_description2_I18}
                                    </div>
                                    <div className="pt-5 ">
                                        (3){article_4_description3_I18}{" "}
                                    </div>
                                    <div className="pt-5 ">
                                        (4) {article_4_description4_I18}
                                    </div>
                                    <div className="pt-5  font-bold">
                                        {article5I18}{" "}
                                    </div>
                                    <div className="pt-2 ">
                                        (1) {article_5_description1I18}
                                    </div>
                                    <div className="pt-5 ">
                                        (2) {article_5_description2I18}
                                    </div>
                                    <div className="pt-2 flex">
                                        <p className="sm:text-[18px] text-[13px] pr-2 text-[#000]">
                                            {payment_methodI18}: {semenI18}, {sumI18}
                                        </p>
                                        <p className="sm:text-[18px] text-[13px] font-bold text-[#000]">
                                            {license?.paymentAmount ? license?.paymentAmount : " "}{" "}
                                            {license?.artworkCurrency ? license?.artworkCurrency : " "}
                                        </p>
                                    </div>
                                    <div className="pt-2 flex ">
                                        <p className="sm:text-[18px] text-[13px] pr-2 text-[#000]">
                                            {paymentDeadlineI18}:{" "}
                                        </p>
                                        <p className="sm:text-[18px] text-[13px] text-[#000]">{descI18}</p>
                                    </div>
                                    <div className="pt-5 text-[#000]">
                                        (3) {article5Description3I18}
                                    </div>
                                    <div className="pt-5 text-[#000]">
                                        (4) {article5Description4I18}
                                    </div>
                                    <div className="pt-5 text-[#000]">
                                        (5) {article5Description5I18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article6I18}
                                    </div>
                                    <div className="pt-2">
                                        (1) {article_6_description1I18}
                                    </div>
                                    <div className="pt-2">
                                        1. {article_6_description1_1_I18}
                                    </div>
                                    <div className="pt-2">
                                        2.{article_6_description1_2_I18}
                                    </div>
                                    <div className="pt-2">
                                        3. {article_6_description1_3_I18}
                                    </div>
                                    <div className="pt-5">
                                        (2) {article_6_description2_I18}
                                    </div>
                                    <div className="pt-2">
                                        1. {article_6_description2_1_I18}
                                    </div>
                                    <div className="pt-2">
                                        2. {article_6_description2_2_I18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article_7_I18}
                                    </div>
                                    <div className="pt-2">
                                        {article_7_descriptionI18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article_8I18}
                                    </div>
                                    <div className="pt-2">
                                        (1) {article_8_description1_I18}
                                    </div>
                                    <div className="pt-5">
                                        (2) {article_8_description2_I18}
                                    </div>
                                    <div className="pt-5">
                                        (3) {article_8_description3_I18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article_9_I18}
                                    </div>
                                    <div className="pt-2">
                                        {article_9_description_I18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article_10_I18}
                                    </div>
                                    <div className="pt-2">
                                        {article_10_description_I18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article_11_I18}
                                    </div>
                                    <div className="pt-2">
                                        (1) {article_11_1_I18}
                                    </div>
                                    <div className="pt-5">
                                        (2) {article_11_2_I18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article_12_I18}
                                    </div>
                                    <div className="pt-2">
                                        {article_12_description_I18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article_13_I18}
                                    </div>
                                    <div className="pt-2">
                                        (1) {article_13_description1_I18}
                                    </div>
                                    <div className="pt-5">
                                        (2) {article_13_description2_I18}
                                    </div>
                                    <div className="pt-5">
                                        {article_14_I18}
                                    </div>
                                    <div className="pt-2">
                                        {article_14_description_I18}
                                    </div>
                                    <div className="pt-5 font-bold">
                                        {article_15_I18}
                                    </div>
                                    <div className="pt-2">
                                        {article_15_description_I18}
                                    </div>
                                    <div className="pt-5 text-center font-bold">
                                        {displayDate(license?.modifiedDate, locale)}
                                    </div>
                                    <div className="pt-5">
                                        {admin_I18} :
                                        <span className="font-bold">
                                            {license?.artworkOwnerFullname ? license?.artworkOwnerFullname : " "}
                                        </span>{" "}
                                        ({sign_I18})
                                    </div>
                                    <div className="pt-2">
                                        {contactI18}:{" "}
                                        <span className="font-bold">
                                            {enteredContact || " "}
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        {addressI18}:{" "}
                                        <span className="font-bold">
                                            {enteredAddress || " "}
                                        </span>
                                    </div>
                                    <div className="pt-5 ">
                                        {copyright_userI18} :
                                        <span className="font-bold">
                                            {license?.applicantName ? license?.applicantName : " "}
                                        </span>{" "}
                                        ({sign_I18})
                                    </div>
                                    <div className="pt-2">
                                        {contactI18}:{" "}
                                        <span className="font-bold">
                                            {license?.applicantContact ? license?.applicantContact : " "}
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        {addressI18}:{" "}
                                        <span className="font-bold">
                                            {license?.applicantAddress ? license?.applicantAddress : " "}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PopupContent>
                    <div className="w-full flex flex-row sm:justify-end md:justify-end justify-center font-[300] gap-[10px] right-[30px]">
                        <button
                            className={`min-w-[74px] bg-[#FB3873]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                            onClick={globalModalState.noActionsButtons ? () => hideAllModals() : handleAgreement}
                            type='button'
                        >
                            <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{confirmI18}</h3>
                        </button>
                    </div>
                </PopContainer>
            </MainPopup>
        </div>
    )
}

export default MobileLicenseCheckContractPopup2;