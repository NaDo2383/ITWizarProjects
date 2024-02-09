import React from "react";
import { useIntl } from "react-intl";

function useMyPageTranslation() {
	const intl = useIntl();
	const addressI18 = intl.formatMessage({
		id: "page.mypage.address"
	});
	const facebookI18 = intl.formatMessage({
		id: "page.facebook"
	});
	const twitterI18 = intl.formatMessage({
		id: "page.twitter"
	});
	const itIsEmptyI18 = intl.formatMessage({
		id: "page.mypage.empty"
	});
	const noWorkYetI18 = intl.formatMessage({
		id: "page.mypage.no_work_yet"
	}); 
	const no_work_purchaseI18 = intl.formatMessage({
		id: "page.mypage.no_work_purchase"
	}); 
	const no_work_likeI18 = intl.formatMessage({
		id: "page.mypage.no_work_like"
	}); 
	const nextI18 = intl.formatMessage({
		id: "page.mypage.next"
	});
	const cancelI18 = intl.formatMessage({
		id: "page.mypage.cancel_btn"
	});
	const application_btnI18 = intl.formatMessage({
		id: "page.mypage.application_btn"
	});
	const confirmI18 = intl.formatMessage({
		id: "page.mypage.confirm_btn"
	});
	const yearI18 = intl.formatMessage({
		id: "page.mypage.year"
	});
	const dayI18 = intl.formatMessage({
		id: "page.mypage.day"
	});
	const monthI18 = intl.formatMessage({
		id: "page.mypage.month"
	});
	const nicknameI18 = intl.formatMessage({
		id: "page.mypage.nickname"
	});
	const nameI18 = intl.formatMessage({
		id: "page.mypage.name"
	});
	const stop_sellingI18 = intl.formatMessage({
		id: "page.mypage.stop_selling"
	});
	const approvedI18 = intl.formatMessage({
		id: "page.mypage.approved"
	});
	const registration_refusalI18 = intl.formatMessage({
		id: "page.mypage.registration_refusal"
	});
	const reasonRefusalI18 = intl.formatMessage({
		id: "page.mypage.reasonRefusal"
	});
	const deleteI18 = intl.formatMessage({
		id: "page.mypage.delete"
	});
	const plsEnterInfoI18 = intl.formatMessage({
		id: "page.mypage.banner.information"
	});
	const settingHeadI18 = intl.formatMessage({
		id: "page.mypage.settingHead"
	});
	const settingQsI18 = intl.formatMessage({
		id: "page.mypage.settingQs"
	});
	const settingCloseI18 = intl.formatMessage({
		id: "page.mypage.settingClose"
	});
	const self_introductionI18 = intl.formatMessage({
		id: "page.mypage.banner.self_introduction"
	});
	const editI18 = intl.formatMessage({
		id: "page.uguide.edit"
	});
	const contestEntryI18 = intl.formatMessage({
		id: "page.contestEntry.contestEntry"
	});
	const NotAction1I18 = intl.formatMessage({
		id: "page.contestEntry.NotAction1"
	});
	const NotAction2I18 = intl.formatMessage({
		id: "page.contestEntry.NotAction2"
	});
	const saveI18 = intl.formatMessage({
		id: "page.mypage.profile.save"
	});
	const edit_btnI18 = intl.formatMessage({
		id: "page.mypage.banner.edit_btn"
	});
	const sidebarI18 = intl.formatMessage({
		id: "page.mypage.sidebar.work_management_subtitle"
	});
	const possessionI18 = intl.formatMessage({
		id: "page.mypage.sidebar.possession"
	});
	const rights_registrationI18 = intl.formatMessage({
		id: "page.mypage.sidebar.rights_registration.progress"
	});
	const ownership_transiction_historyI18 = intl.formatMessage({
		id: "page.mypage.sidebar.ownership_transiction_history"
	});
	const license_agreement_detailsI18 = intl.formatMessage({
		id: "page.mypage.sidebar.license_agreement_details"
	});
	const license_agreement_details2I18 = intl.formatMessage({
		id: "page.mypage.sidebar.license_agreement_details2"
	});
	const wallet_management_subtitleI18 = intl.formatMessage({
		id: "page.mypage.sidebar.wallet_management_subtitle"
	});
	const registered_walletI18 = intl.formatMessage({
		id: "page.mypage.sidebar.registered_wallet"
	});
	const personal_information_management_subtitleI18 = intl.formatMessage({
		id: "page.mypage.sidebar.personal_information_management_subtitle"
	});
	const edit_personal_informationI18 = intl.formatMessage({
		id: "page.mypage.sidebar.edit_personal_information"
	});
	const settingI18 = intl.formatMessage({
		id: "page.mypage.sidebar.setting"
	});
	const notification_settingI18 = intl.formatMessage({
		id: "page.mypage.sidebar.notification_setting"
	});
	const withdrawalI18 = intl.formatMessage({
		id: "page.mypage.sidebar.withdrawal"
	});
	const headTitleI18 = intl.formatMessage({
		id: "page.mypage.sidebar.headTitle"
	});
	const holdingI18 = intl.formatMessage({
		id: "page.mypage.holding"
	});
	const saleI18 = intl.formatMessage({
		id: "page.mypage.sale"
	});
	const desired_workI18 = intl.formatMessage({
		id: "page.mypage.desired_work"
	});
	const addWalletI18 = intl.formatMessage({
		id: "page.mypage.wallet.add_wallet_title"
	});
	const metamask_wallet_to_TAMTAMI18 = intl.formatMessage({
		id: "page.mypage.wallet.metamask_wallet_to_TAMTAM"
	});
	const connect_and_registerI18 = intl.formatMessage({
		id: "page.mypage.wallet.connect_and_register"
	});
	const wallet_registrationI18 = intl.formatMessage({
		id: "page.mypage.wallet.wallet_registration"
	});
	const numberI18 = intl.formatMessage({
		id: "page.mypage.wallet.table.number"
	});
	const deleteOnTableI18 = intl.formatMessage({
		id: "page.mypage.wallet.table.delete"
	});
	const copyI18 = intl.formatMessage({
		id: "page.mypage.wallet.wallet_list.copy"
	});
	const walletNotLinkedI18 = intl.formatMessage({
		id: "page.mypage.wallet.wallet_list.description"
	});
	const licenseApprovedI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.approveRightLayer.description"
	});
	const approvalRightsI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.goToMyPageLayer.license_approval"
	});
	const description_1I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.description_1"
	});
	const copyrightHolderI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.copyright_holder"
	});
	const contactI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.contact"
	});
	const licensePeriodI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.licensePeriod"
	});
	// const licensePeriodI18 = intl.formatMessage({
	// 	id: "page.common.licensePeriod"
	// });
	const paymentTimingI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.paymentTiming"
	});
	// const paymentTimingI18 = intl.formatMessage({
	// 	id: "page.common.paymentTiming"
	// });
	const contractDetailsI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.contractDetails"
	});
	const licensePeriodMobileI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.licensePeriodMobile"
	});
	// const contractDetailsI18 = intl.formatMessage({
	// 	id: "page.common.contractDetails"
	// });
	const contractAmountI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.contractAmount"
	});
	const contractualRightsI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.contractualRights"
	});
	const selectContractI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.selectContract"
	});
	// const contractualRightsI18 = intl.formatMessage({
	// 	id: "page.common.contractualRights"
	// });
	const description_2_beginI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.description_2_begin"
	});
	const description_2_lastI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.authorInfoLayer.description_2_last"
	});
	const backI18 = intl.formatMessage({
		id: "page.back"
	});
	// const descriptionI18 = intl.formatMessage({
	//   id: "page.mypage.transactionLog.authorInfoLayer.description",
	// });
	const worknameI18 = intl.formatMessage({
		id: "page.mypage.work_name"
	});
	const instagramI18 = intl.formatMessage({
		id: "page.Instagram"
	});
	const author_and_copyright_licenserI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.author_and_copyright_licenser"
	});
	const copyright_userI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.copyright_user"
	});
	const attribution_andI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.attribution_and"
	});
	const copyrightLicensorI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.copyrightLicensor"
	});
	const subject_rightI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.subject_right"
	});
	const applicantI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.applicant"
	});
	const applicantNameI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.name"
	});
	const placeHolderI18 = intl.formatMessage({
		id: "page.mypage.placeHolder"
	});
	const applicantLegalEntityI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.legal_entity"
	});
	const license_periodI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.license_period"
	});
	const license_payoutI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.license_payout"
	});
	const sumI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.sum"
	});
	const payment_periodI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.payment_period"
	});
	const timeI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.time"
	});
	const purpose_to_useI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractApproveLayer.purpose_to_use"
	});
	const time_limitI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractAutoCanceledLayer.time_limit"
	});
	const contractTitleI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.main_title"
	});
	const authorCopyrightLicensorI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.author_and|_copyright_licensor"
	});
	const admin_descI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.admin_desc"
	});
	const user_descI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.user_desc"
	});
	const regarding_permissionI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.regarding_permission"
	});
	const article_1I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_1"
	});
	const article_1_descriptionI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_1_description"
	});
	const article_2I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_2"
	});
	const article_2_descriptionI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_2_description"
	});
	const titleI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.title"
	});
	const writerI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.writer"
	});
	const classificationI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.classification"
	});
	const works_of_artI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.works_of_art"
	});
	const rightI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.right"
	});
	const requestTitleI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.requestTitle"
	});
	const checkTitleI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.checkTitle"
	});
	const toI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_3_to"
	});
	const from_someI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.from_some"
	});
	const article_3I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_3"
	});
	const article_3_description1_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_3_description1"
	});
	const article_3_description2_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_3_description2"
	});
	const article_3_description3_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_3_description3"
	});
	const article_4_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_4"
	});
	const article_4_description1_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_4_description1"
	});
	const rightHolderUserI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.right_holder_user"
	});
	const article_4_description2_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_4_description2"
	});
	const article_4_description3_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_4_description3"
	});
	const article_4_description4_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_4_description4"
	});
	const article5I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_5"
	});
	const article_5_description1I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_5_description1"
	});
	const article_5_description2I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_5_description2"
	});
	const payment_methodI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.payment_method"
	});
	const semenI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.semen"
	});
	const paymentDeadlineI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.payment_deadline"
	});
	const descI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.desc"
	});
	const article5Description3I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_5_description3"
	});
	const article5Description4I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_5_description4"
	});
	const article5Description5I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_5_description5"
	});
	const article6I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_6"
	});
	const article_6_description1I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_6_description1"
	});
	const article_6_description1_1_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_6_description1_1"
	});
	const article_6_description1_2_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_6_description1_2"
	});
	const article_6_description1_3_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_6_description1_3"
	});
	const article_6_description2_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_6_description2"
	});
	const article_6_description2_1_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_6_description2_1"
	});
	const article_6_description2_2_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_6_description2_2"
	});
	const article_7_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_7"
	});
	const article_7_descriptionI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_7_description"
	});
	const article_8I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_8"
	});
	const article_8_description1_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_8_description1"
	});
	const article_8_description2_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_8_description2"
	});
	const article_8_description3_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_8_description3"
	});
	const article_9_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_9"
	});
	const article_9_description_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_9_description"
	});
	const article_10_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_10"
	});
	const article_10_description_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_10_description"
	});
	const article_11_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_11"
	});
	const article_11_1_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_11_1"
	});
	const article_11_2_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_11_2"
	});
	const article_12_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_12"
	});
	const article_12_description_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_12_description"
	});
	const article_13_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_13"
	});
	const article_13_description1_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_13_description1"
	});
	const article_13_description2_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_13_description2"
	});
	const article_14_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_14"
	});
	const article_14_description_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_14_description"
	});
	const article_15_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_15"
	});
	const article_15_description_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.article_15_description"
	});
	const admin_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.admin"
	});
	const sign_I18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.sign"
	});
	const main_titleI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractCheckLayer.main_title"
	});
	const denyReasonsI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractDeniedCheckLayer.reasons"
	});
	const reasonDescI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractDeniedCheckLayer.reasonDesc"
	});
	const closeI18 = intl.formatMessage({
		id: "page.createArtwork.close"
	});
	const declineContractQuestionI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractDeniedLayer.question"
	});
	const reasonI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractDeniedLayer.reason"
	});
	const enterI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractDeniedLayer.enter"
	});
	const contactUsI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.contractDeniedLayer.contactUs"
	});
	const license_agreementI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.goToMyPageLayer.license_agreement"
	});
	const approveRightLayerTitleI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.approveRightLayer.title"
	});
	const reproductionI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.goToMyPageLayer.reproduction"
	});
	const performanceI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.goToMyPageLayer.performance"
	});
	const distributionI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.goToMyPageLayer.distribution"
	});
	const create_worksI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.goToMyPageLayer.create_works"
	});
	const exceptI18 = intl.formatMessage({
		id: "page.mypage.except"
	});
	const check_termsI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.check_terms"
	});
	const contractRefusalI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.contract"
	});
	const expirationI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.expiration"
	});
	const view_contractI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.view_contract"
	});
	const contract_approvalI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.contract_approval"
	});
	const waitingForPayment1I18 = intl.formatMessage({
		id: "page.mypage.waitingForPayment1"
	});
	const waitingForPayment2I18 = intl.formatMessage({
		id: "page.mypage.waitingForPayment2"
	});
	const contract_reviewI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.contract_review"
	});
	const certificationI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.certification"
	});
	const confirmValI18 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.confirmVal"
	});
	const refuseI18 = intl.formatMessage({
		id: "page.createArtwork.refuse"
	});
	const layerTitleI18 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.title"
	}); 
	const confirmTitleI18 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.confirmTitle"
	});
	const timeEndingTitleI18 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.timeEndingTitle"
	});
	const licenseTitleI18 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.licenseTitle"
	});
	const artworkCommissionI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.commission"
	});
	const confirmContractI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.confirmContract"
	});
	const confirmLicenseI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.confirm"
	});
	const paymentI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.payment"
	});
	const contractApprovalI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.contractApproval"
	});
	const licenseAgreementProgressI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.licenseAgreementProgress"
	});
	const contractSigningI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.contractSigning"
	});
	const gobackI18 = intl.formatMessage({
		id: "page.common.goback"
	});
	const inputCompletedI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.mobiletable.inputCompleted"
	});
	const installI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.otpAuth.install"
	});
	const barcodeI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.otpAuth.barcode"
	});
	const authenticationKeyI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.otpAuth.authentication_key"
	});
	const paymentCompletedI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.requestPaymentLayer.paymentCompleted"
	});
	const paymentOfAmountI18 = intl.formatMessage({
		id: "page.common.paymentOfAmount"
	});
	const situationI18 = intl.formatMessage({
		id: "page.uguide.contactUsTable.H5"
	});
	const noContentsI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.table.registered_contents"
	});
	const method_paymentI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.method_payment"
	});
	const rights_heldI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.rights_held"
	});
	const token_sizeI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.token_size"
	});
	const ownershipI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.ownership"
	});
	const oiginalDownloadI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.oiginalDownload"
	});
	const copyrightI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.copyright"
	});
	const token_issuingI18 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.token_issuing"
	});
	const reviewI18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.review"
	});
	const denialApproval1I18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.denial_approval1"
	});
	const denialApproval2I18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.denial_approval2"
	});
	const suspension_salesI18 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.suspension_sales"
	});
	const mobiletable_desc_1 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.desc_1"
	});
	const mobiletable_desc_2 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.desc_2"
	});
	const mobiletable_desc_3 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.desc_3"
	});
	const mobiletable_desc_4 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.desc_4"
	});
	const mobiletable_desc_5 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.desc_5"
	});
	const mobiletable_question = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.question"
	});
	const denyDesc1 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.denyDesc1"
	});
	const denyDesc2 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.denyDesc2"
	});
	const typeI18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.type"
	});
	const work18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.work"
	});
	const author18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.author"
	});
	const title_work18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.title_work"
	});
	const application_date18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.registration_application_date"
	});
	const progressI18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.progress"
	});
	const review18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.review"
	});
	const minting1I18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.minting1"
	});
	const minting2I18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.minting2"
	});
	const creativeWorkI18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.creativeWork"
	});
	const transactionWorkI18 = intl.formatMessage({
		id: "page.mypage.sellRight.table.transactionWork"
	});
	const idI18 = intl.formatMessage({
		id: "page.mypage.profile.id"
	});
	const aboutMeI18 = intl.formatMessage({
		id: "page.mypage.profile.aboutMe"
	});
	const changePasswordI18 = intl.formatMessage({
		id: "page.mypage.profile.changePassword"
	});
	const disabledI18 = intl.formatMessage({
		id: "page.mypage.profile.disabled"
	});
	const activateI18 = intl.formatMessage({
		id: "page.mypage.profile.activate"
	});
	const yourpasswordHasBeenChangedI18 = intl.formatMessage({
		id: "page.mypage.profile.yourpasswordHasBeenChanged"
	});
	const proTableDesc1_I18 = intl.formatMessage({
		id: "page.mypage.profile.table.desc1"
	});
	const proTableDesc2_I18 = intl.formatMessage({
		id: "page.mypage.profile.table.desc2"
	});
	const wrongPassI18 = intl.formatMessage({
		id: "page.mypage.profile.table.wrongPass"
	});
	const currentPassI18 = intl.formatMessage({
		id: "page.mypage.profile.table.currentPass"
	});
	const proTableDesc3_I18 = intl.formatMessage({
		id: "page.mypage.profile.table.desc3"
	});
	const validMessageI18 = intl.formatMessage({
		id: "page.mypage.profile.table.validMessage"
	});
	const walletI18 = intl.formatMessage({
		id: "page.mypage.profile.table.wallet"
	});
	const emailVerifyI18 = intl.formatMessage({
		id: "page.mypage.profile.table.emailVerify"
	});
	const notCertifiedI18 = intl.formatMessage({
		id: "page.mypage.profile.table.notCertified"
	});
	const authenticateI18 = intl.formatMessage({
		id: "page.mypage.profile.table.authenticate"
	});
	const emailAuthenticationI18 = intl.formatMessage({
		id: "page.mypage.profile.table.emailAuthentication"
	});
	const emailI18 = intl.formatMessage({
		id: "page.mypage.profile.table.email"
	});
	const emailValI18 = intl.formatMessage({
		id: "page.mypage.profile.table.emailVal"
	});
	const emailErrorI18 = intl.formatMessage({
		id: "page.mypage.profile.table.emailError"
	});
	const emailDescI18 = intl.formatMessage({
		id: "page.mypage.profile.table.emailDesc"
	});
	const emailBtnI18 = intl.formatMessage({
		id: "page.mypage.profile.table.emailBtn"
	});
	const passwordErrorI18 = intl.formatMessage({
		id: "page.uguide.input.passwordError"
	});
	const newPasswordI18 = intl.formatMessage({
		id: "page.mypage.profile.table.NewPassword"
	});
	const confirmNewPasswordI18 = intl.formatMessage({
		id: "page.mypage.profile.table.confirmNewPassword"
	});
	const googleAuthIsEnabledI18 = intl.formatMessage({
		id: "page.mypage.profile.table.googleAuthIsEnabled"
	});
	const gotoPersonalInformationCorPageI18 = intl.formatMessage({
		id: "page.mypage.profile.table.gotoPersonalInformationCorPage"
	});
	const allI18 = intl.formatMessage({
		id: "page.mypage.ownershiplogs.mobileTable.all"
	});
	const lookupI18 = intl.formatMessage({
		id: "page.mypage.ownershiplogs.mobileTable.lookup"
	});
	const plsLoginI18 = intl.formatMessage({
		id: "page.mypage.holdingWorks.plsLogin"
	});
	const ownsAllLicencesI18 = intl.formatMessage({
		id: "page.mypage.holdingWorks.ownsAllLicences"
	});
	const rightsTextsI18 = intl.formatMessage({
		id: "page.mypage.holdingWorks.rightsTexts"
	});
	const activityI18 = intl.formatMessage({
		id: "page.mypage.history.activity"
	});
	const workI18 = intl.formatMessage({
		id: "page.mypage.history.work"
	});
	const priceI18 = intl.formatMessage({
		id: "page.mypage.history.price"
	});
	const retainedLicenseI18 = intl.formatMessage({
		id: "page.mypage.holdingWorks.retainedLicense"
	});
	const before_canceling_membershipI18 = intl.formatMessage({
		id: "page.mypage.deactivate.before_canceling_membership"
	});
	const deactivateWarningI18 = intl.formatMessage({
		id: "page.mypage.deactivate.warning"
	});
	const deactivateDeletedI18 = intl.formatMessage({
		id: "page.mypage.deactivate.deleted"
	});
	const deactivateprofileTextI18 = intl.formatMessage({
		id: "page.mypage.deactivate.profileText"
	});
	const all_instructions_agree_themI18 = intl.formatMessage({
		id: "page.mypage.deactivate.all_instructions_agree_them"
	});
	const withdrawI18 = intl.formatMessage({
		id: "page.mypage.deactivate.withdraw"
	});
	const noI18 = intl.formatMessage({
		id: "page.createArtwork.no"
	});
	const deactivateConfirmValI18 = intl.formatMessage({
		id: "page.mypage.deactivate.confirmVal"
	});
	const deactivateTitleI18 = intl.formatMessage({
		id: "page.mypage.deactivate.title"
	});
	const deactivateDeleted_informationI18 = intl.formatMessage({
		id: "page.mypage.deactivate.deleted_information"
	});
	const deactivateDeleted_informationI18_last = intl.formatMessage({
		id: "page.mypage.deactivate.deleted_information_last"
	});
	const deactivateDeleteWarning18 = intl.formatMessage({
		id: "page.mypage.deactivate.deleteWarning"
	});
	const deactivateDeleteWarning_lastI18 = intl.formatMessage({
		id: "page.mypage.deactivate.deleteWarning_last"
	});
	const membership_withdrawalI18 = intl.formatMessage({
		id: "page.mypage.deactivate.membership_withdrawal"
	});
	const membership_withdrawal_lastI18 = intl.formatMessage({
		id: "page.mypage.deactivate.membership_withrawal_last"
	});
	const deactivateNFTI18 = intl.formatMessage({
		id: "page.mypage.deactivate.NFT"
	});
	const deactivateMembershipCannotI18 = intl.formatMessage({
		id: "page.mypage.deactivate.membership_cannot"
	});
	const tab1TextI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.tab1.text"
	});
	const tab2TextI18 = intl.formatMessage({
		id: "page.mypage.transactionLog.tab2.text"
	});
	const emailVerificationTextI18 = intl.formatMessage({
		id: "page.mypage.emailVerificationText"
	});
	const passwordI18 = intl.formatMessage({
		id: "page.mypage.password"
	});
	const passwordVerificationTextI18 = intl.formatMessage({
		id: "page.mypage.passwordVerificationText"
	});
	const confirmPasswordI18 = intl.formatMessage({
		id: "page.mypage.confirmPassword"
	});
	const marketingOptI18 = intl.formatMessage({
		id: "page.mypage.marketingOpt"
	});
	const authGoogleOTPI18 = intl.formatMessage({
		id: "page.mypage.authGoogleOTP"
	});
	const sellRightContractRefusalI18 = intl.formatMessage({
		id: "page.mypage.sellRight.mobiletable.contractRefusal"
	});
	const mainPageI18 = intl.formatMessage({
		id: "page.mypage.mainPage"
	});
	const goToMainPageI18 = intl.formatMessage({
		id: "page.mypage.goToMain"
	});
	const next1I18 = intl.formatMessage({
		id: "page.ArtDetails.next1"
	});
	const LICENSE_BUYI18 = intl.formatMessage({
		id: "page.notifications.types.LICENSE_BUY"
	});
	const LICENSE_SELLERI18 = intl.formatMessage({
		id: "page.notifications.types.LICENSE_SELLER"
	});
	const NFTI18 = intl.formatMessage({
		id: "page.notifications.types.NFT"
	});
	const ARTWORKI18 = intl.formatMessage({
		id: "page.notifications.types.ARTWORK"
	});
	const emailTitle1I18 = intl.formatMessage({
		id: "page.mypage.profile.emailTitle1"
	});
	const emailTitle2I18 = intl.formatMessage({
		id: "page.mypage.profile.emailTitle2"
	});
	const emailNotAuthenticationI18 = intl.formatMessage({
		id: "page.mypage.profile.emailNotAuthentication"
	});
	const limitedFunctionI18 = intl.formatMessage({
		id: "page.mypage.profile.limitedFunction"
	});
	const emailSpan1I18 = intl.formatMessage({
		id: "page.mypage.profile.emailSpan1"
	});
	const emailSpan2I18 = intl.formatMessage({
		id: "page.mypage.profile.emailSpan2"
	});
	const emailSpan3I18 = intl.formatMessage({
		id: "page.mypage.profile.emailSpan3"
	});
	const emailCheckI18 = intl.formatMessage({
		id: "page.mypage.profile.emailCheck"
	});
	const emailVerBtnI18 = intl.formatMessage({
		id: "page.mypage.profile.emailVerBtn"
	});
	const issuedNFTI18 = intl.formatMessage({
		id: "page.mypage.issuedNFT"
	});
	const licenseAgreementI18 = intl.formatMessage({
		id: "page.mypage.licenseAgreement"
	});
	const purchasedNFTI18 = intl.formatMessage({
		id: "page.mypage.purchasedNFT"
	});
	const desiredNFTI18 = intl.formatMessage({
		id: "page.mypage.desiredNFT"
	});
	const activityHistoryI18 = intl.formatMessage({
		id: "page.mypage.activityHistory"
	});
	const contractReviewI18 = intl.formatMessage({
		id: "page.mypage.contractReview"
	});
	const completedContractI18 = intl.formatMessage({
		id: "page.mypage.completedContract"
	});
	const addNewNftI18 = intl.formatMessage({
		id: "page.mypage.profile.addNft"
	});
	const registerNewNftI18 = intl.formatMessage({
		id: "page.mypage.profile.registerNft"
	});
	const sizeI18 = intl.formatMessage({
		id: "page.mypage.setting.size"
	});
	const profilePictureI18 = intl.formatMessage({
		id: "page.mypage.setting.profilePicture"
	});
	const backgroundPhotoI18 = intl.formatMessage({
		id: "page.mypage.setting.backgroundPhoto"
	});
	const nickNameI18 = intl.formatMessage({
		id: "page.mypage.setting.nickName"
	});
	const SNSregistrationI18 = intl.formatMessage({
		id: "page.mypage.setting.SNSregistration"
	});
	const licenseCompletedI18 = intl.formatMessage({
		id: "page.mypage.setting.licenseCompleted"
	});
	const licenseCompletedDescI18 = intl.formatMessage({
		id: "page.mypage.setting.licenseCompletedDesc"
	});
	const contractRightI18 = intl.formatMessage({
		id: "page.mypage.setting.contractRight"
	});

	const corparateNameI18 = intl.formatMessage({
		id: "page.common.corparateName"
	});
	const contractAmoutI18 = intl.formatMessage({
		id: "page.common.contractAmout"
	});
	const contractApproval24hoursI18 = intl.formatMessage({
		id: "page.common.contractApproval24hours"
	});
	const contractApprovedPlsPayI18 = intl.formatMessage({
		id: "page.common.contractApprovedPlsPay"
	});

	const wantQuitI18 = intl.formatMessage({
		id: "page.common.wantQuit"
	});
	const deleteInfo1yI18 = intl.formatMessage({
		id: "page.common.delete.info"
	});
	const toBeDeleteI18 = intl.formatMessage({
		id: "page.common.toBeDelete"
	});
	const deleteInfo2yI18 = intl.formatMessage({
		id: "page.common.delete.info2"
	});
	const deleteInfo21yI18 = intl.formatMessage({
		id: "page.common.delete.info21"
	});
	const deleteyesI18 = intl.formatMessage({
		id: "page.common.delete.yes"
	});
	const deleteCompleteI18 = intl.formatMessage({
		id: "page.common.delete.completed"
	});
	const verifyUserI18 = intl.formatMessage({
		id: "page.user.verify"
	});
	const artistBgI18 = intl.formatMessage({
		id: "page.artist.bg"
	});
	const artistInsertI18 = intl.formatMessage({
		id: "page.artist.insertImage"
	});
	const artistChangeI18 = intl.formatMessage({
		id: "page.artist.changeImage"
	});
	const artistChangeDefaultI18 = intl.formatMessage({
		id: "page.artist.changeDefaultImage"
	});
	const artistBgPreviewI18 = intl.formatMessage({
		id: "page.artist.artistBgPreview"
	});
	const exampleI18 = intl.formatMessage({
		id: "page.artist.example"
	});
	const plsEnterInstagramI18 = intl.formatMessage({
		id: "page.plsEnterInstagram"
	});
	const plsEnterTwitterI18 = intl.formatMessage({
		id: "page.plsEnterTwitter"
	});
	const plsEnterFacebookI18 = intl.formatMessage({
		id:"page.plsEnterFacebook"
	});
	const lisenceAgreementFeeI18 = intl.formatMessage({
		id: "lisenceRequestPopup.lisenceAgreementFeeI18"
	});
	const emailVerifiedI18 = intl.formatMessage({
		id: "page.emailVerifiedI18"
	});

	return {
		plsEnterInstagramI18,
		plsEnterTwitterI18,
		plsEnterFacebookI18,
		facebookI18,
		twitterI18,
		instagramI18,
		contactUsI18,
		contractApprovedPlsPayI18,
		contractApproval24hoursI18,
		paymentOfAmountI18,
		contractAmoutI18,
		paymentTimingI18,
		licensePeriodI18,
		contractualRightsI18,
		corparateNameI18,
		contractDetailsI18,
		licenseCompletedI18,
		licenseCompletedDescI18,
		contractRightI18,
		headTitleI18,
		reasonRefusalI18,
		addNewNftI18,
		registerNewNftI18,
		next1I18,
		mainPageI18,
		authGoogleOTPI18,
		sellRightContractRefusalI18,
		marketingOptI18,
		confirmPasswordI18,
		passwordVerificationTextI18,
		passwordI18,
		emailVerificationTextI18,
		artworkCommissionI18,
		tab1TextI18,
		tab2TextI18,
		deactivateMembershipCannotI18,
		deactivateNFTI18,
		membership_withdrawal_lastI18,
		membership_withdrawalI18,
		deactivateDeleteWarning_lastI18,
		deactivateDeleteWarning18,
		deactivateDeleted_informationI18_last,
		deactivateDeleted_informationI18,
		deactivateTitleI18,
		deactivateConfirmValI18,
		noI18,
		withdrawI18,
		all_instructions_agree_themI18,
		deactivateprofileTextI18,
		deactivateDeletedI18,
		deactivateWarningI18,
		before_canceling_membershipI18,
		retainedLicenseI18,
		rightsTextsI18,
		ownsAllLicencesI18,
		plsLoginI18,
		backI18,
		lookupI18,
		allI18,
		gotoPersonalInformationCorPageI18,
		googleAuthIsEnabledI18,
		confirmNewPasswordI18,
		newPasswordI18,
		passwordErrorI18,
		validMessageI18,
		proTableDesc3_I18,
		currentPassI18,
		wrongPassI18,
		proTableDesc2_I18,
		proTableDesc1_I18,
		yourpasswordHasBeenChangedI18,
		activateI18,
		disabledI18,
		changePasswordI18,
		aboutMeI18,
		idI18,
		saveI18,
		transactionWorkI18,
		creativeWorkI18,
		work18,
		author18,
		title_work18,
		application_date18,
		review18,
		progressI18,
		typeI18,
		mobiletable_question,
		mobiletable_desc_5,
		mobiletable_desc_4,
		mobiletable_desc_3,
		mobiletable_desc_2,
		mobiletable_desc_1,
		suspension_salesI18,
		denialApproval1I18,
		denialApproval2I18,
		reviewI18,
		copyrightI18,
		ownershipI18,
		token_issuingI18,
		token_sizeI18,
		rights_heldI18,
		method_paymentI18,
		noContentsI18,
		situationI18,
		paymentCompletedI18,
		authenticationKeyI18,
		barcodeI18,
		installI18,
		inputCompletedI18,
		gobackI18,
		contractSigningI18,
		licenseAgreementProgressI18,
		contractApprovalI18,
		paymentI18,
		confirmContractI18,
		layerTitleI18,
		refuseI18,
		confirmValI18,
		certificationI18,
		contract_reviewI18,
		contract_approvalI18,
		view_contractI18,
		expirationI18,
		contractRefusalI18,
		check_termsI18,
		exceptI18,
		create_worksI18,
		distributionI18,
		performanceI18,
		reproductionI18,
		approveRightLayerTitleI18,
		license_agreementI18,
		declineContractQuestionI18,
		closeI18,
		denyReasonsI18,
		from_someI18,
		main_titleI18,
		sign_I18,
		admin_I18,
		article_15_description_I18,
		article_15_I18,
		article_14_description_I18,
		article_14_I18,
		article_13_description2_I18,
		article_13_description1_I18,
		article_13_I18,
		article_12_description_I18,
		article_12_I18,
		article_11_2_I18,
		article_11_1_I18,
		article_11_I18,
		article_10_description_I18,
		article_10_I18,
		article_9_description_I18,
		article_9_I18,
		article_8_description3_I18,
		article_8_description2_I18,
		article_8_description1_I18,
		article_8I18,
		article_7_descriptionI18,
		article_7_I18,
		article_6_description2_2_I18,
		article_6_description2_1_I18,
		article_6_description2_I18,
		article_6_description1_3_I18,
		article_6_description1_2_I18,
		article_6_description1_1_I18,
		article_6_description1I18,
		article6I18,
		article5Description5I18,
		article5Description4I18,
		article5Description3I18,
		descI18,
		paymentDeadlineI18,
		semenI18,
		payment_methodI18,
		article_5_description2I18,
		article_5_description1I18,
		article5I18,
		article_4_description4_I18,
		article_4_description3_I18,
		article_4_description2_I18,
		rightHolderUserI18,
		article_4_description1_I18,
		article_4_I18,
		article_3_description3_I18,
		article_3_description2_I18,
		article_3_description1_I18,
		article_3I18,
		rightI18,
		works_of_artI18,
		classificationI18,
		writerI18,
		titleI18,
		article_2_descriptionI18,
		article_2I18,
		article_1_descriptionI18,
		article_1I18,
		regarding_permissionI18,
		user_descI18,
		admin_descI18,
		authorCopyrightLicensorI18,
		contractTitleI18,
		time_limitI18,
		purpose_to_useI18,
		timeI18,
		payment_periodI18,
		sumI18,
		license_payoutI18,
		license_periodI18,
		applicantNameI18,
		applicantI18,
		subject_rightI18,
		copyright_userI18,
		attribution_andI18,
		copyrightLicensorI18,
		author_and_copyright_licenserI18,
		worknameI18,
		description_2_lastI18,
		description_2_beginI18,
		contactI18,
		copyrightHolderI18,
		description_1I18,
		approvalRightsI18,
		licenseApprovedI18,
		walletNotLinkedI18,
		copyI18,
		deleteOnTableI18,
		numberI18,
		wallet_registrationI18,
		connect_and_registerI18,
		metamask_wallet_to_TAMTAMI18,
		addWalletI18,
		desired_workI18,
		saleI18,
		holdingI18,
		withdrawalI18,
		notification_settingI18,
		edit_personal_informationI18,
		personal_information_management_subtitleI18,
		registered_walletI18,
		wallet_management_subtitleI18,
		nicknameI18,
		addressI18,
		itIsEmptyI18,
		noWorkYetI18,
		cancelI18,
		confirmI18,
		yearI18,
		dayI18,
		monthI18,
		nameI18,
		stop_sellingI18,
		approvedI18,
		registration_refusalI18,
		deleteI18,
		plsEnterInfoI18,
		self_introductionI18,
		editI18,
		sidebarI18,
		possessionI18,
		rights_registrationI18,
		ownership_transiction_historyI18,
		license_agreement_detailsI18,
		license_agreement_details2I18,
		applicantLegalEntityI18,
		toI18,
		contestEntryI18,
		NotAction1I18,
		NotAction2I18,
		oiginalDownloadI18,
		LICENSE_BUYI18,
		LICENSE_SELLERI18,
		NFTI18,
		ARTWORKI18,
		edit_btnI18,
		walletI18,
		emailVerifyI18,
		notCertifiedI18,
		authenticateI18,
		emailAuthenticationI18,
		emailI18,
		emailValI18,
		emailErrorI18,
		emailDescI18,
		emailBtnI18,
		emailTitle1I18,
		emailTitle2I18,
		emailNotAuthenticationI18,
		limitedFunctionI18,
		emailSpan1I18,
		emailSpan2I18,
		emailSpan3I18,
		emailCheckI18,
		emailVerBtnI18,
		settingI18,
		issuedNFTI18,
		licenseAgreementI18,
		purchasedNFTI18,
		desiredNFTI18,
		activityHistoryI18,
		contractReviewI18,
		completedContractI18,
		activityI18,
		workI18,
		priceI18,
		minting1I18,
		minting2I18,
		denyDesc1,
		denyDesc2,
		waitingForPayment1I18,
		waitingForPayment2I18,
		sizeI18,
		profilePictureI18,
		backgroundPhotoI18,
		nickNameI18,
		SNSregistrationI18,
		requestTitleI18,
		checkTitleI18,
		contractualRightsI18,
		licensePeriodI18,
		paymentTimingI18,
		contractDetailsI18,
		contractAmountI18,
		wantQuitI18,
		deleteInfo1yI18,
		toBeDeleteI18,
		deleteInfo2yI18,
		deleteInfo21yI18,
		deleteyesI18,
		deleteCompleteI18,
		reasonI18,
		enterI18,
		settingHeadI18,
		settingQsI18,
		settingCloseI18,
		goToMainPageI18,
		no_work_purchaseI18,
		no_work_likeI18,
		verifyUserI18,
		artistBgI18,
		artistInsertI18,
		artistChangeI18,
		artistChangeDefaultI18,
		artistBgPreviewI18,
		exampleI18,
		lisenceAgreementFeeI18,
		emailVerifiedI18,
		nextI18,
		placeHolderI18,
		licensePeriodMobileI18,
		selectContractI18,
		application_btnI18,
		licenseTitleI18,
		confirmLicenseI18,
		reasonDescI18,
		timeEndingTitleI18,
		confirmTitleI18
	};
}

export default useMyPageTranslation;
