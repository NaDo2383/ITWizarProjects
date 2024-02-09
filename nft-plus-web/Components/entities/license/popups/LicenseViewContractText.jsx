import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";
import useMyPageTranslation from 'locale/useMypageTranslation'
import useArtworkTranslation from "locale/useArtworkTranslation";
import { useRouter } from "next/router";
import { displayDate, displayBetweenDates } from "utils/date"

function LicenseViewContractText({ popupProps }) {
    const { allRightsI18 } = useArtworkTranslation();
    const {
        main_titleI18,
        author_and_copyright_licenserI18,
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
        yearI18,
        monthI18,
        article_3_description2_I18,
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
    } = useMyPageTranslation();
    const { locale } = useRouter();
    const [enteredContact, setEnteredContact] = useState("");
    const [enteredAddress, setEnteredAddress] = useState("");

    return (
        <div className="pt-5 tracking-tighter max-w-[800px] mx-auto">
            <div className="w-full px-10">
                <div className="sm:text-[24px] text-[14px] font-bold text-center">
                    {main_titleI18}
                </div>
                <div className="pt-5">
                    <p className="sm:text-[16px] text-[13px]">
                        {author_and_copyright_licenserI18}{" "}
                        <span className="sm:text-[16px] text-[13px]  font-bold">
                            {popupProps?.license?.artworkOwnerFullname}
                        </span>{" "}
                        {admin_descI18}{" "}
                        <span className="sm:text-[16px] text-[13px]  font-bold">
                            {popupProps?.license?.buyerFullname}
                        </span>{" "}
                        {user_descI18}{" "}
                        <span className="sm:text-[16px] text-[13px]  font-bold">
                            {popupProps?.license?.artworkName}
                        </span>{" "}
                        {regarding_permissionI18}
                    </p>
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-medium text-center">
                    <span className="pr-8">{next1I18}</span>
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_1I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {article_1_descriptionI18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_2I18}{" "}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {article_2_descriptionI18}{" "}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    {titleI18}:{" "}
                    <span className="sm:text-[16px] text-[13px]  font-bold">
                        {popupProps?.license?.artworkName}
                    </span>
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {writerI18}:{" "}
                    <span className="sm:text-[16px] text-[13px]  font-bold">
                        {" "}
                        {popupProps?.license?.artworkOwnerFullname}
                    </span>
                </div>

                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    <p className="sm:text-[16px] text-[13px]">
                        {classificationI18}:{" "}
                        <span className="pl-1 sm:text-[16px] text-[13px]  font-bold">
                            {works_of_artI18}
                        </span>
                    </p>
                </div>
                <div className="pt-2 flex">
                    <p className="sm:text-[16px] text-[13px] ">{rightI18}:</p>
                    <div className="pl-2 sm:text-[16px] text-[13px]  ">
                        {popupProps?.license?.rights &&
                            popupProps?.license?.rights.map((item) => (
                                <div key={item.id} className="inline-flex  items-center">
                                    <HiCheck className="text-[#ff00e4] text-lg" />
                                    <p className="ml-[4px] mr-[10px]">
                                        {allRightsI18[item.code]}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {rightI18} {` ${article_3I18}`}
                </div>
                <div className="pt-2">
                    <p className="sm:text-[16px] text-[13px]">
                        {article_3_description1_I18}{" "}
                        <span className="sm:text-[16px] text-[13px]  font-bold">
                            <span className="font-bold">
                                {displayBetweenDates(popupProps?.license?.permissionPeriod, locale)} {" "}
                            </span>
                        </span>
                        {article_3_description2_I18}{" "}
                        <span className="sm:text-[16px] text-[13px]  font-bold">
                            {displayDate(popupProps?.license?.permissionPeriod, locale)}
                        </span>
                        {article_3_description3_I18}
                    </p>
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_4_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    (1) {article_4_description1_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (2) {rightHolderUserI18}{" "}
                    <span className="sm:text-[16px] text-[13px] font-bold">
                        {popupProps?.license?.permissionPeriod.split("~")[0].split("-")[0]} {yearI18}{" "}
                        {popupProps?.license?.permissionPeriod.split("~")[0].split("-")[1]} {monthI18}{" "}
                        {popupProps?.license?.permissionPeriod.split("~")[0].split("-")[2]}{" "}
                        {displayDate(popupProps?.license?.permissionPeriod, locale)}
                    </span>
                    {article_4_description2_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (3) {article_4_description3_I18}{" "}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (4) {article_4_description4_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article5I18}{" "}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    (1) {article_5_description1I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (2) {article_5_description2I18}
                </div>
                <div className="pt-2 flex">
                    <p className="pr-2 sm:text-[16px] text-[13px] ">
                        {payment_methodI18}: {semenI18}, {sumI18}
                    </p>
                    <p className="sm:text-[16px] text-[13px]  font-bold">
                        {popupProps?.license?.paymentAmount ? popupProps?.license?.paymentAmount : " "}{" "}
                        {popupProps?.license?.artworkCurrency ? popupProps?.license?.artworkCurrency : " "}
                    </p>
                </div>
                <div className="pt-2 flex">
                    <p className="pr-2 sm:text-[16px] text-[13px] ">
                        {paymentDeadlineI18}:{" "}
                    </p>
                    <p className="sm:text-[16px] text-[13px] ">{descI18}</p>
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (3) {article5Description3I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (4) {article5Description4I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (5) {article5Description5I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article6I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    (1) {article_6_description1I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    1. {article_6_description1_1_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    2. {article_6_description1_2_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    3. {article_6_description1_3_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (2) {article_6_description2_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    1. {article_6_description2_1_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    2. {article_6_description2_2_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_7_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {article_7_descriptionI18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_8I18}{" "}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    (1) {article_8_description1_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (2) {article_8_description2_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (3) {article_8_description3_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_9_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {article_9_description_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_10_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {article_10_description_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_11_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    (1) {article_11_1_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (2) {article_11_2_I18}{" "}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_12_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {article_12_description_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_13_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    (1) {article_13_description1_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    (2) {article_13_description2_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_14_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {article_14_description_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  font-bold">
                    {article_15_I18}
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {article_15_description_I18}
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  text-center font-bold">
                    {displayDate(popupProps?.license?.today, locale)}
                </div> 
                <div className="pt-5 sm:text-[16px] text-[13px] ">
                    {admin_I18} :
                    <span className="font-bold">
                        {popupProps?.license?.artworkOwnerFullname ? popupProps?.license?.artworkOwnerFullname : " "}
                    </span>{" "}
                    ({sign_I18})
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {contactI18}:{" "}
                    <span className="font-bold">
                        {enteredContact ? enteredContact : popupProps?.license?.ownerContact}
                    </span>
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {addressI18}:{" "}
                    <span className="font-bold">
                        {enteredAddress ? enteredAddress : popupProps?.license?.ownerAddress}
                    </span>
                </div>
                <div className="pt-5 sm:text-[16px] text-[13px]  ">
                    {copyright_userI18} :
                    <span className="font-bold">
                        {popupProps?.license?.applicantName ? popupProps?.license?.applicantName : " "}
                    </span>{" "}
                    ({sign_I18})
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {contactI18}:{" "}
                    <span className="font-bold">
                        {popupProps?.license?.applicantContact ? popupProps?.license?.applicantContact : " "}
                    </span>
                </div>
                <div className="pt-2 sm:text-[16px] text-[13px] ">
                    {addressI18}:{" "}
                    <span className="font-bold">
                        {popupProps?.license?.applicantAddress ? popupProps?.license?.applicantAddress : " "}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default LicenseViewContractText