import React from "react";
import { useIntl } from "react-intl";

function useArtworkTranslation() {
	const intl = useIntl();
	const title = intl.formatMessage({ id: "page.createArtwork.title" });
	const subTitle = intl.formatMessage({ id: "page.createArtwork.subTitle" });
	const imgTitle = intl.formatMessage({ id: "page.createArtwork.imgTitle" });
	const imgVal1 = intl.formatMessage({ id: "page.createArtwork.imgVal1" });
	const imgVal2 = intl.formatMessage({ id: "page.createArtwork.imgVal2" });
	const fileExt = intl.formatMessage({ id: "page.createArtwork.fileExt" });
	const dragAttach = intl.formatMessage({
		id: "page.createArtwork.dragAttach"
	});
	const dragAttach1 = intl.formatMessage({
		id: "page.createArtwork.dragAttach1"
	});
	const uploadI18 = intl.formatMessage({ id: "page.createArtwork.upload" });
	const category = intl.formatMessage({ id: "page.createArtwork.category" });
	const essential = intl.formatMessage({ id: "page.createArtwork.essential" });
	const nickname = intl.formatMessage({ id: "page.createArtwork.nickname" });
	const workTitle = intl.formatMessage({ id: "page.createArtwork.workTitle" });
	const workInformation = intl.formatMessage({
		id: "page.createArtwork.workInformation"
	});
	const retention = intl.formatMessage({ id: "page.createArtwork.retention" });
	const charge = intl.formatMessage({ id: "page.createArtwork.charge" });
	const inputPlaceholder = intl.formatMessage({
		id: "page.createArtwork.inputPlaceholder"
	});
	const workDesc = intl.formatMessage({ id: "page.createArtwork.workDesc" });
	const authorIntroductionI18 = intl.formatMessage({
		id: "page.createArtwork.authorIntroduction"
	});
	const textareaPlaceholder = intl.formatMessage({
		id: "page.createArtwork.textarea.placeholder"
	});
	const workdescPlaceholder = intl.formatMessage({
		id: "page.createArtwork.workdesc.textarea.placeholder"
	});
	const authordescPlaceholder = intl.formatMessage({
		id: "page.createArtwork.authordesc.textarea.placeholder"
	});
	const selectPaymentMethod = intl.formatMessage({
		id: "page.createArtwork.selectPaymentMethod"
	});
	const plsSelectPaymentMethod = intl.formatMessage({
		id: "page.createArtwork.plsSelectPaymentMethod"
	});
	const multiSelectionNotAllowed = intl.formatMessage({
		id: "page.createArtwork.multiSelectionNotAllowed"
	});
	const paymentMethodDesc = intl.formatMessage({
		id: "page.createArtwork.paymentMethodDesc"
	});
	const retentionRights = intl.formatMessage({
		id: "page.createArtwork.retentionRights"
	});
	const areYouCreator = intl.formatMessage({
		id: "page.createArtwork.areYouCreator"
	});
	const otherPeoples = intl.formatMessage({
		id: "page.createArtwork.otherPeoples"
	});
	const yes = intl.formatMessage({
		id: "page.createArtwork.yes"
	});
	const no = intl.formatMessage({
		id: "page.createArtwork.no"
	});
	const warningText = intl.formatMessage({
		id: "page.createArtwork.warningText"
	});
	const plsSelectAllrights = intl.formatMessage({
		id: "page.createArtwork.plsSelectAllrights"
	});
	const selectAll = intl.formatMessage({ id: "page.createArtwork.selectAll" });
	const ownership = intl.formatMessage({ id: "page.createArtwork.ownership" });
	const creatorRoyaltyI18 = intl.formatMessage({
		id: "page.createArtwork.creatorRoyalty"
	});
	const creatorRoyaltyDescI18 = intl.formatMessage({
		id: "page.createArtwork.creatorRoyaltyDesc"
	});
	const creatorRoyaltyDesc2I18 = intl.formatMessage({
		id: "page.createArtwork.creatorRoyaltyDesc2"
	});
	const copyrightProperty = intl.formatMessage({
		id: "page.createArtwork.copyrightProperty"
	});
	const creatorWarning = intl.formatMessage({
		id: "page.createArtwork.creatorWarning"
	});
	const propertyRight = intl.formatMessage({
		id: "page.createArtwork.propertyRight"
	});
	const copyrightHistory = intl.formatMessage({
		id: "page.createArtwork.copyrightHistory"
	});
	const withLicenseAgreement = intl.formatMessage({
		id: "page.createArtwork.withLicenseAgreement"
	});
	const noLicenseAgreement = intl.formatMessage({
		id: "page.createArtwork.noLicenseAgreement"
	});

	const th1 = intl.formatMessage({
		id: "page.createArtwork.table.th1"
	});
	const th2 = intl.formatMessage({
		id: "page.createArtwork.table.th2"
	});
	const th3 = intl.formatMessage({
		id: "page.createArtwork.table.th3"
	});
	const th4 = intl.formatMessage({
		id: "page.createArtwork.table.th4"
	});
	const th5 = intl.formatMessage({
		id: "page.createArtwork.table.th5"
	});

	const plsUploadLicenseAgreement = intl.formatMessage({
		id: "page.createArtwork.plsUploadLicenseAgreement"
	});
	const fileSelection = intl.formatMessage({
		id: "page.createArtwork.fileSelection"
	});
	const licenseTransactionWarning = intl.formatMessage({
		id: "page.createArtwork.licenseTransactionWarning"
	});
	const copyrightTitle = intl.formatMessage({
		id: "page.createArtwork.copyrightTitle"
	});
	const commissionQuestion = intl.formatMessage({
		id: "page.createArtwork.commissionQuestion"
	});
	const registered = intl.formatMessage({
		id: "page.createArtwork.registered"
	});
	const notRegistered = intl.formatMessage({
		id: "page.createArtwork.notRegistered"
	});
	const copyrightWarning = intl.formatMessage({
		id: "page.createArtwork.copyrightWarning"
	});
	const plsUploadCertificate = intl.formatMessage({
		id: "page.createArtwork.plsUploadCertificate"
	});
	const apply = intl.formatMessage({
		id: "page.createArtwork.apply"
	});
	const refuse = intl.formatMessage({
		id: "page.createArtwork.refuse"
	});
	const cancel = intl.formatMessage({
		id: "page.createArtwork.cancel"
	});
	const goMypage = intl.formatMessage({
		id: "page.createArtwork.goMypage"
	});
	const sendRequestWorkI18 = intl.formatMessage({
		id: "page.createArtwork.sendRequestWork"
	});
	const send = intl.formatMessage({
		id: "page.createArtwork.send"
	});
	const stopSelling = intl.formatMessage({
		id: "page.createArtwork.stopSelling"
	});
	const changePrice = intl.formatMessage({
		id: "page.createArtwork.changePrice"
	});
	const changeAmount = intl.formatMessage({
		id: "page.createArtwork.changeAmount"
	});
	const plsSelectRight = intl.formatMessage({
		id: "page.createArtwork.plsSelectRight"
	});
	const close = intl.formatMessage({
		id: "page.createArtwork.close"
	});

	//table
	const publicRights = intl.formatMessage({
		id: "page.common.publicRights"
	});
	const reproduction = intl.formatMessage({
		id: "page.common.rights.reproduction"
	});
	const performance = intl.formatMessage({
		id: "page.common.rights.performance"
	});
	const publicTransmission = intl.formatMessage({
		id: "page.common.rights.publicTransmission"
	});
	const publicTransmission2 = intl.formatMessage({
		id: "page.common.rights.publicTransmission2"
	});
	const broadcast = intl.formatMessage({
		id: "page.common.rights.broadcast"
	});
	const transmission = intl.formatMessage({
		id: "page.common.rights.transmission"
	});
	const digitalVoice = intl.formatMessage({
		id: "page.common.rights.digitalVoice"
	});
	const exhibition = intl.formatMessage({
		id: "page.common.rights.exhibition"
	});
	const distribution = intl.formatMessage({
		id: "page.common.rights.distribution"
	});
	const rental = intl.formatMessage({
		id: "page.common.rights.rental"
	});
	const derivativeWork = intl.formatMessage({
		id: "page.common.rights.derivativeWork"
	});
	const reproductionDesc = intl.formatMessage({
		id: "page.common.rights.reproductionDesc"
	});
	const performanceDesc = intl.formatMessage({
		id: "page.common.rights.performanceDesc"
	});
	const publicTransmissionDesc = intl.formatMessage({
		id: "page.common.rights.publicTransmissionDesc"
	});
	const broadcastDesc = intl.formatMessage({
		id: "page.common.rights.broadcastDesc"
	});
	const transmissionDesc = intl.formatMessage({
		id: "page.common.rights.transmissionDesc"
	});
	const digitalVoiceDesc = intl.formatMessage({
		id: "page.common.rights.digitalVoiceDesc"
	});
	const exhibitionDesc = intl.formatMessage({
		id: "page.common.rights.exhibitionDesc"
	});
	const distributionDesc = intl.formatMessage({
		id: "page.common.rights.distributionDesc"
	});
	const rentalDesc = intl.formatMessage({
		id: "page.common.rights.rentalDesc"
	});
	const derivativeWorkDesc = intl.formatMessage({
		id: "page.common.rights.derivativeWorkDesc"
	});
	const requesterNameI18 = intl.formatMessage({
		id: "page.common.requesterName"
	});
	
	const dayfromcontractCompletionI18 = intl.formatMessage({
		id: "page.common.1dayfromcontractCompletion"
	});
	//artworkchecklayerTexts
	const requestTitleI18 = intl.formatMessage({
		id: "page.mypage.licenseRequest.title"
	});
	const titles1I18 = intl.formatMessage({
		id: "page.mypage.licenseRequest.title1"
	});
	const titles2I18 = intl.formatMessage({
		id: "page.mypage.licenseRequest.title2"
	});
	const mainTitleI18 = intl.formatMessage({
		id: "page.mypage.licenseRequest.mainTitle"
	});
	const artWorkDescI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.work_description"
	});
	const doesnt_existI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.doesn't_exist"
	});
	const commissionI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.commission"
	});
	const NFT_issuanceI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.NFT_issuance"
	});
	const token_issuanceI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.token_issuance"
	});
	const artOwnershipTransactionI18 = intl.formatMessage({
		id: "page.filter.artOwnershipTransaction"
	});
	const copyrightContractWorksI18 = intl.formatMessage({
		id: "page.filter.copyrightContractWorks"
	});
	const searchI18 = intl.formatMessage({
		id: "page.filter.search"
	});
	const initializationI18 = intl.formatMessage({
		id: "page.filter.initialization"
	});
	const alertLicenseReqI18 = intl.formatMessage({
		id: "page.ArtDetail.alertLicenseReq"
	});
	const alertLicenseReqFinalI18 = intl.formatMessage({
		id: "page.ArtDetail.alertLicenseReqCheckFinal"
	});
	const alertLicenseReqFinalLastI18 = intl.formatMessage({
		id: "page.ArtDetail.alertLicenseReqCheckFinal_last"
	});
	const approvedPermissionTextI18 = intl.formatMessage({
		id: "page.ArtDetail.approvedPermissionText"
	});
	const createArtworkTitleI18 = intl.formatMessage({
		id: "page.ArtDetail.createArtwork.title"
	});
	const plsSelectAtLeast1I18 = intl.formatMessage({
		id: "page.ArtDetail.createArtwork.plsSelectAtLeast1"
	});
	const aplicantInputPlaceholder1I18 = intl.formatMessage({
		id: "page.ArtDetail.createArtwork.aplicantInputPlaceholder"
	});
	const licensePayoutInputPlaceholderI18 = intl.formatMessage({
		id: "page.ArtDetail.createArtwork.licensePayoutInputPlaceholder"
	});
	const textareaPlaceholderI18 = intl.formatMessage({
		id: "page.ArtDetail.createArtwork.textareaPlaceholder"
	});
	const reportI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.report"
	});
	const priceI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.price"
	});
	const createrRoyalty = intl.formatMessage({
		id: "page.ArtDetail.detail.createrRoyalty"
	});
	const salesPeriodI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.salesPeriod"
	});
	const startingPriceI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.startingPrice"
	});
	const licenceAvailableI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.licenceAvailable"
	});
	const certifiedWorkI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.certifiedWork"
	});
	const tamtamWriterI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.tamtamWriter"
	});
	const copyrightedWorkI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.copyrightedWork"
	});
	const verificationCertificateI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.verificationCertificate"
	});
	const unableToApllyI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.unableToAplly"
	});
	const purchaseArtI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.purchaseArt"
	});
	const purchaseWorksI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.purchaseWorks"
	});
	const licenseAppI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.licenseApp"
	});
	const editSellPriceI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.editSellPrice"
	}); 
	const editPriceI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.editPrice"
	});
	const changePriceCancelI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.changePriceCancel"
	}); 
	const fixedPriceBtnI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.fixedPriceBtn"
	});
	const editChangePriceI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.editChangePrice"
	});
	const salesRegistrationI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.salesRegistration"
	});
	const notAvailableI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.notAvailable"
	});
	const gotoFindWorksI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.gotoFindWorks"
	});
	const licenseTknTradeRegI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.licenseTknTradeReg"
	});
	const notAvailable2I18 = intl.formatMessage({
		id: "page.ArtDetail.detail.notAvailable2"
	});
	const licenseTknTradeReg2I18 = intl.formatMessage({
		id: "page.ArtDetail.detail.licenseTknTradeReg2"
	});
	const toI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.to"
	});
	const stopSellingQuestionI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.stopSellingQuestion"
	});
	const stopSellingWarningI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.stopSellingWarning"
	});
	const auctionListRemoveI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.auctionListRemove"
	});
	const auctionListRemoveHeaderI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.auctionListRemoveHeader"
	});
	const auctionListRemove1I18 = intl.formatMessage({
		id: "page.ArtDetail.detail.auctionListRemove1"
	});
	const applyLicenseWarningI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.applyLicenseWarning"
	});
	const detailTitle1_I18 = intl.formatMessage({
		id: "page.ArtDetail.detail.title1"
	});
	const detailTitle2_I18 = intl.formatMessage({
		id: "page.ArtDetail.detail.title2"
	});
	const saveI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.save"
	});
	const footer_desc1I18 = intl.formatMessage({
		id: "page.ArtDetail.detail.footer_desc1"
	});
	const reasonI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.reason"
	});
	const plsInstallMetaMaskI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.plsInstallMetaMask"
	});
	const projectNameI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.projectName"
	});
	const closeI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.close"
	});
	const errorMessageI18 = intl.formatMessage({
		id: "page.ArtDetail.detail.errorMessage"
	});
	const authorInfoI18 = intl.formatMessage({
		id: "page.ArtDetails.authorInfo"
	});
	const workInfoI18 = intl.formatMessage({
		id: "page.ArtDetails.workInfo"
	});
	const ownershipTransactionsI18 = intl.formatMessage({
		id: "page.ArtDetails.ownershipTransactions"
	});
	const licenseTransactionsI18 = intl.formatMessage({
		id: "page.ArtDetails.licenseTransactions"
	});
	const nodataI18 = intl.formatMessage({
		id: "page.ArtDetails.noContent"
	});
	const periodOfUseI18 = intl.formatMessage({
		id: "page.ArtDetails.periodOfUse"
	});
	const licenseAgreementDateI18 = intl.formatMessage({
		id: "page.ArtDetails.licenseAgreementDate"
	});
	const chainInfoI18 = intl.formatMessage({
		id: "page.ArtDetails.chainInfo"
	});
	const reportReceivedI18 = intl.formatMessage({
		id: "page.ArtDetails.reportReceived"
	});
	const incaseVariousReasonsI18 = intl.formatMessage({
		id: "page.ArtDetails.incaseVariousReasons"
	});
	const plsSelectRepresentiveReasonI18 = intl.formatMessage({
		id: "page.ArtDetails.plsSelectRepresentiveReason"
	});
	const writeReasonFirstI18 = intl.formatMessage({
		id: "page.ArtDetails.writeReasonFirst"
	});
	const unauthorizedUsePeoplesWorkI18 = intl.formatMessage({
		id: "page.ArtDetails.unauthorizedUsePeoplesWork"
	});
	const copyrightViolationI18 = intl.formatMessage({
		id: "page.ArtDetails.copyrightViolation"
	});
	const etcI18 = intl.formatMessage({
		id: "page.ArtDetails.etc"
	});
	const uploadFileI18 = intl.formatMessage({
		id: "page.ArtDetails.uploadFile"
	});
	const declarationI18 = intl.formatMessage({
		id: "page.ArtDetails.declaration"
	});
	const receptionCompleteI18 = intl.formatMessage({
		id: "page.ArtDetails.receptionComplete"
	});
	const orderPaymentI18 = intl.formatMessage({
		id: "page.ArtDetails.orderPayment"
	});
	const orderPurchaseI18 = intl.formatMessage({
		id: "page.ArtDetails.orderPurchase"
	});
	const orderDescription1I18 = intl.formatMessage({
		id: "page.ArtDetails.orderDescription1"
	});
	const orderDescription2I18 = intl.formatMessage({
		id: "page.ArtDetails.orderDescription2"
	});
	const orderCheckboxI18 = intl.formatMessage({
		id: "page.ArtDetails.orderCheckbox"
	});
	const makePaymentI18 = intl.formatMessage({
		id: "page.ArtDetails.makePayment"
	});
	const orderAlertDescI18 = intl.formatMessage({
		id: "page.ArtDetails.orderAlertDesc"
	});
	const wouldYouLikeBuyI18 = intl.formatMessage({
		id: "page.ArtDetails.wouldYouLikeBuy"
	});
	const paymentI18 = intl.formatMessage({
		id: "page.ArtDetails.payment"
	});
	const otpAuthI18 = intl.formatMessage({
		id: "page.ArtDetails.otpAuth"
	});
	const likeI18 = intl.formatMessage({
		id: "page.ArtDetails.like"
	});
	const wishI18 = intl.formatMessage({
		id: "page.ArtDetails.wish"
	});
	const copyLinkI18 = intl.formatMessage({
		id: "page.ArtDetails.copyLink"
	});
	const workLinkCopiedI18 = intl.formatMessage({
		id: "page.ArtDetails.workLinkCopied"
	});
	const noContentI18 = intl.formatMessage({
		id: "page.ArtDetails.noContent"
	});
	const caseI18 = intl.formatMessage({
		id: "page.common.case"
	});
	const author_descI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.author_introduction"
	});
	const creator_royaltyI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.creator_royalty"
	});
	const copyrightLicenseI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.copyright_license"
	});
	const contract_detailsI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.contract_details"
	});
	const copyright_registeredI18 = intl.formatMessage({
		id: "page.mypage.sellRight.artworkCheckLayer.copyright_registered"
	});
	const uploadFilesI18 = intl.formatMessage({
		id: "page.createArtWork.uploadFiles"
	});
	const attachmentsI18 = intl.formatMessage({
		id: "page.createArtWork.attachments"
	});
	const checkLicensePeriodI18 = intl.formatMessage({
		id: "page.createArtWork.checkLicensePeriod"
	});
	const ifYoNotCreatorI18 = intl.formatMessage({
		id: "page.createArtWork.ifYoNotCreator"
	});
	const inBetaServiceI18 = intl.formatMessage({
		id: "page.createArtWork.inBetaService"
	});
	const ifTitleKoreanI18 = intl.formatMessage({
		id: "page.createArtWork.ifTitleKorean"
	});
	const plsAttachContractI18 = intl.formatMessage({
		id: "page.createArtWork.plsAttachContract"
	});
	const plsSelectRightsI18 = intl.formatMessage({
		id: "page.createArtWork.plsSelectRights"
	});
	const noI18 = intl.formatMessage({
		id: "page.createArtWork.no"
	});
	const enteredEnglishI18 = intl.formatMessage({
		id: "page.createArtwork.enteredEnglish"
	});
	const registrationOwnershipSaleI18 = intl.formatMessage({
		id: "page.saleArt.RegistrationOwnershipSale"
	});
	const fixedPriceI18 = intl.formatMessage({
		id: "page.saleArt.fixedPrice"
	});
	const sellingTextI18 = intl.formatMessage({
		id: "page.saleArt.sellingText"
	});
	const auctionI18 = intl.formatMessage({
		id: "page.saleArt.auction"
	});
	const auctionDisabledI18 = intl.formatMessage({
		id: "page.saleArt.auctionDisabled"
	});
	const auctionDisabled2I18 = intl.formatMessage({
		id: "page.saleArt.auctionDisabled2"
	});
	const bidText1I18 = intl.formatMessage({
		id: "page.saleArt.bidText1"
	});
	const bidText2I18 = intl.formatMessage({
		id: "page.saleArt.bidText2"
	});
	const plsEnterSellingPriceI18 = intl.formatMessage({
		id: "page.saleArt.plsEnterSellingPrice"
	});
	const salesPeriodSettingI18 = intl.formatMessage({
		id: "page.saleArt.salesPeriodSetting"
	});
	const maximumSalesI18 = intl.formatMessage({
		id: "page.saleArt.maximumSales"
	});
	const noticeI18 = intl.formatMessage({
		id: "page.saleArt.notice"
	});
	const noticeTextLi1I18 = intl.formatMessage({
		id: "page.saleArt.noticeTextLi1"
	});
	const noticeTextLi2I18 = intl.formatMessage({
		id: "page.saleArt.noticeTextLi2"
	});
	const noticeTextLi3I18 = intl.formatMessage({
		id: "page.saleArt.noticeTextLi3"
	});
	const noticeTextLi4I18 = intl.formatMessage({
		id: "page.saleArt.noticeTextLi4"
	});
	const noticeTextLi5I18 = intl.formatMessage({
		id: "page.saleArt.noticeTextLi5"
	});
	const noticeTextLi6I18 = intl.formatMessage({
		id: "page.saleArt.noticeTextLi6"
	});
	const noticeTextLi7I18 = intl.formatMessage({
		id: "page.saleArt.noticeTextLi7"
	});
	const auctionNoticeTextLi1I18 = intl.formatMessage({
		id: "page.saleArt.auctionNoticeTextLi1"
	});
	const auctionNoticeTextLi2I18 = intl.formatMessage({
		id: "page.saleArt.auctionNoticeTextLi2"
	});
	const auctionNoticeTextLi3I18 = intl.formatMessage({
		id: "page.saleArt.auctionNoticeTextLi13"
	});
	const auctionNoticeTextLi4I18 = intl.formatMessage({
		id: "page.saleArt.auctionNoticeTextLi4"
	});
	const auctionNoticeTextLi5I18 = intl.formatMessage({
		id: "page.saleArt.auctionNoticeTextLi5"
	});
	const auctionNoticeTextLi6I18 = intl.formatMessage({
		id: "page.saleArt.auctionNoticeTextLi6"
	});
	const auctionNoticeTextLi7I18 = intl.formatMessage({
		id: "page.saleArt.auctionNoticeTextLi7"
	});
	const auctionNoticeTextLi8I18 = intl.formatMessage({
		id: "page.saleArt.auctionNoticeTextLi8"
	});
	const agreeI18 = intl.formatMessage({
		id: "page.saleArt.agree"
	});
	const plsAgreeTermsI18 = intl.formatMessage({
		id: "page.saleArt.plsAgreeTerms"
	});
	const resaleFeeI18 = intl.formatMessage({
		id: "page.saleArt.resaleFee"
	});
	const salesCommissionI18 = intl.formatMessage({
		id: "page.saleArt.salesCommission"
	});
	const auctionSupportedLaterI18 = intl.formatMessage({
		id: "page.saleArt.auctionSupportedLater"
	});
	const mintingI18 = intl.formatMessage({
		id: "page.saleArt.minting"
	});
	const NFTroyaltyDescI18 = intl.formatMessage({
		id: "page.createArtwork.NFTroyaltyDesc"
	});
	const NFTSoldDescI18 = intl.formatMessage({
		id: "page.createArtwork.NFTSoldDesc"
	});
	const unRegisteredWorksI18 = intl.formatMessage({
		id: "page.ArtDetails.unRegisteredWork"
	});

	const artwork1I18 = intl.formatMessage({
		id: "page.event.found.artwork1"
	});
	const unDiscoveredWorksI18 = intl.formatMessage({
		id: "page.ArtDetails.unDiscoveredWorks"
	});
	const sellingPriceI18 = intl.formatMessage({
		id: "page.ArtDetails.sellingPrice"
	});
	const competitionTitleI18 = intl.formatMessage({
		id: "page.createCompetition.competitionTitle"
	});
	const TamtamNFTI18 = intl.formatMessage({
		id: "page.createCompetition.TamtamNFT"
	});
	const title1I18 = intl.formatMessage({
		id: "page.createCompetition.title1"
	});
	const title2I18 = intl.formatMessage({
		id: "page.createCompetition.title2"
	});
	const title3I18 = intl.formatMessage({
		id: "page.createCompetition.title3"
	});
	const btnI18 = intl.formatMessage({
		id: "page.createCompetition.btn"
	});
	const checkboxTitleI18 = intl.formatMessage({
		id: "page.createCompetition.checkboxTitle"
	});
	const description1I18 = intl.formatMessage({
		id: "page.createCompetition.title1.description1"
	});
	const description2I18 = intl.formatMessage({
		id: "page.createCompetition.title1.description2"
	});
	const description3I18 = intl.formatMessage({
		id: "page.createCompetition.title1.description3"
	});
	const t2description1I18 = intl.formatMessage({
		id: "page.createCompetition.title2.description1"
	});
	const t2description2I18 = intl.formatMessage({
		id: "page.createCompetition.title2.description2"
	});
	const t2description3I18 = intl.formatMessage({
		id: "page.createCompetition.title2.description3"
	});
	const t2description4I18 = intl.formatMessage({
		id: "page.createCompetition.title2.description4"
	});
	const t3description1I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description1"
	});
	const t3description2I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description2"
	});
	const t3description3I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description3"
	});
	const t3description4I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description4"
	});
	const t3description5I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description5"
	});
	const t3description6I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description6"
	});
	const t3description7I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description7"
	});
	const t3description8I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description8"
	});
	const t3description9I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description9"
	});
	const t3description10I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description10"
	});
	const t3description11I18 = intl.formatMessage({
		id: "page.createCompetition.title3.description11"
	});
	const firstCompleteI18 = intl.formatMessage({
		id: "page.createCompetition.firstComplete"
	});
	const sendI18 = intl.formatMessage({
		id: "page.createCompetition.send"
	});
	const viewExibitsI18 = intl.formatMessage({
		id: "page.createCompetition.viewExibits"
	});
	const checkStatusI18 = intl.formatMessage({
		id: "page.createCompetition.checkStatus"
	});
	const compitationConfirmI18 = intl.formatMessage({
		id: "page.createCompetition.compitationConfirm"
	});
	const reproductionRightI18 = intl.formatMessage({
		id: "page.createArtwork.reproductionRight"
	});
	const performingRightI18 = intl.formatMessage({
		id: "page.createArtwork.performingRight"
	});
	const publicExhibitionRightI18 = intl.formatMessage({
		id: "page.createArtwork.publicExhibitionRight"
	});
	const rightToDistributeI18 = intl.formatMessage({
		id: "page.createArtwork.rightToDistribute"
	});
	const rentalRightI18 = intl.formatMessage({
		id: "page.createArtwork.rentalRight"
	});
	const publicTransmissionRightI18 = intl.formatMessage({
		id: "page.createArtwork.publicTransmissionRight"
	});
	const adaptationRightI18 = intl.formatMessage({
		id: "page.createArtwork.adaptationRight"
	});
	const auctionInProgressI18 = intl.formatMessage({
		id: "page.auction.auctionInProgress"
	});
	const upComingAuctionI18 = intl.formatMessage({
		id: "page.auction.upComingAuction"
	});
	const auctionInformationI18 = intl.formatMessage({
		id: "page.auction.information"
	});
	const biddingStatusI18 = intl.formatMessage({
		id: "page.auction.biddingStatus"
	});
	const timeLeftUntilI18 = intl.formatMessage({
		id: "page.auction.timeLeftUntil"
	});
	const timeRemainingI18 = intl.formatMessage({
		id: "page.auction.timeRemaining"
	});
	const salePeriodI18 = intl.formatMessage({
		id: "page.auction.salePeriod"
	});
	const currentPriceI18 = intl.formatMessage({
		id: "page.auction.currentPrice"
	});
	const unsoldWorkI18 = intl.formatMessage({
		id: "page.auction.unsoldWork"
	});
	const placeBidI18 = intl.formatMessage({
		id: "page.auction.placeBid"
	});
	const auctionDateI18 = intl.formatMessage({
		id: "page.auction.date"
	});
	const bidderI18 = intl.formatMessage({
		id: "page.auction.bidder"
	});
	const changeTermsConfirmI18 = intl.formatMessage({
		id: "page.auction.changeTermsConfirm"
	});
	const notPossibleChargeI18 = intl.formatMessage({
		id: "page.auction.notPossibleCharge"
	});
	const bidI18 = intl.formatMessage({
		id: "page.auction.bid"
	});
	const biddingI18 = intl.formatMessage({
		id: "page.auction.bidding"
	});
	const beFirstBidsI18 = intl.formatMessage({
		id: "page.auction.beFirstBids"
	});
	const paymentModalI18 = intl.formatMessage({
		id: "page.auction.payment"
	});
	const bidgsI18 = intl.formatMessage({
		id: "page.auction.bid"
	});
	const ifHighterI18 = intl.formatMessage({
		id: "page.auction.ifHighter"
	});
	const meteMaskComfirmI18 = intl.formatMessage({
		id: "page.auction.meteMaskComfirm"
	});
	const bidButtonI18 = intl.formatMessage({
		id: "page.auction.bidButton"
	});
	const projectNFTI18 = intl.formatMessage({
		id: "page.event.projectNFT"
	});
	const projectDescriptionI18 = intl.formatMessage({
		id: "page.event.projectDescription"
	});
	const applyTabI18 = intl.formatMessage({
		id: "page.event.applyTab"
	});
	const productIntroI18 = intl.formatMessage({
		id: "page.event.productIntro"
	});
	const productTeamIntroI18 = intl.formatMessage({
		id: "page.event.productTeamIntro"
	});
	const productIntroLinkI18 = intl.formatMessage({
		id: "page.event.productIntro.link"
	});
	const productTeamIntrolinkI18 = intl.formatMessage({
		id: "page.event.productTeamIntro.link"
	});
	const findArtworksI18 = intl.formatMessage({
		id: "page.event.find.artworks"
	});
	const undicoveredArtworksI18 = intl.formatMessage({
		id: "page.event.undicovered.artworks"
	});
	const foundArtworksI18 = intl.formatMessage({
		id: "page.event.found.artwork"
	});
	const SeeMoreI18 = intl.formatMessage({
		id: "page.event.seeAll"
	});
	const backAllI18 = intl.formatMessage({
		id: "page.event.backAll"
	});
	const projectIntroI18 = intl.formatMessage({
		id: "page.event.projectDesc"
	});
	const teamIntroI18 = intl.formatMessage({
		id: "page.event.teamDesc"
	});
	const howToParticipateI18 = intl.formatMessage({
		id: "page.event.howToParticipate"
	});
	const schedule18 = intl.formatMessage({
		id: "page.event.schedule"
	});
	const participatingLoci18 = intl.formatMessage({
		id: "page.event.participatingLoc"
	});
	const artworkNFTI18 = intl.formatMessage({
		id: "page.event.artworkNFT"
	});
	const hiddenNFTI18 = intl.formatMessage({
		id: "page.event.hiddenNFT"
	});
	const discoveredNFTI18 = intl.formatMessage({
		id: "page.event.discoveredNFT"
	});
	const projectIntroductionI18 = intl.formatMessage({
		id: "page.event.projectIntroduction"
	});
	const teamIntroductionI18 = intl.formatMessage({
		id: "page.event.teamIntroduction"
	});
	const howParticipateI18 = intl.formatMessage({
		id: "page.event.howParticipate"
	});
	const participateScheduleI18 = intl.formatMessage({
		id: "page.event.participateSchedule"
	});
	const placeParticipationI18 = intl.formatMessage({
		id: "page.event.placeParticipation"
	});
	const footerBtnI18 = intl.formatMessage({
		id: "page.event.footerBtn"
	});
	const undiscoveredWorkI18 = intl.formatMessage({
		id: "page.event.undiscovered"
	}); 
	const undiscoveredDetailI18 = intl.formatMessage({
		id: "page.event.undiscoveredDetail"
	});
	const notRegisteredForSaleI18 = intl.formatMessage({
		id: "page.ArtDetails.notRegisteredForSale"
	});
	const sendSaleRequestI18 = intl.formatMessage({
		id: "page.ArtDetails.sendSaleRequest"
	});
	const nftMintingApplicationI18 = intl.formatMessage({
		id: "page.createCompetition.NFTMintingApplication"
	});

	const clipCopyI18 = intl.formatMessage({
		id: "page.clip.copy"
	});
	const paymentPeriodHasEndedI18 = intl.formatMessage({
		id: "page.common.paymentPeriodEnded"
	});
	const fileSize70I18 = intl.formatMessage({
		id: "page.alert.70mb"
	});
	const alertFileSize = intl.formatMessage({
		id: "page.alert.filesize"
	});
	const licenseTitle1I18 = intl.formatMessage({
		id: "page.license.title1"
	});
	const licenseText1I18 = intl.formatMessage({
		id: "page.license.text1"
	});
	const licenseTitle2I18 = intl.formatMessage({
		id: "page.license.title2"
	});
	const licenseText2I18 = intl.formatMessage({
		id: "page.license.text2"
	});
	const licenseTitle3I18 = intl.formatMessage({
		id: "page.license.title3"
	});
	const licenseText3I18 = intl.formatMessage({
		id: "page.license.text3"
	});
	const licenseTitle4I18 = intl.formatMessage({
		id: "page.license.title4"
	});
	const licenseText4I18 = intl.formatMessage({
		id: "page.license.text4"
	});
	const licenseTitle5I18 = intl.formatMessage({
		id: "page.license.title5"
	});
	const licenseText5I18 = intl.formatMessage({
		id: "page.license.text5"
	});
	const licenseTitle6I18 = intl.formatMessage({
		id: "page.license.title6"
	});
	const licenseText6I18 = intl.formatMessage({
		id: "page.license.text6"
	});
	const licenseTitle7I18 = intl.formatMessage({
		id: "page.license.title7"
	});
	const licenseText7I18 = intl.formatMessage({
		id: "page.license.text7"
	});
	const airDropTextTakeLookAtOurProjectI18 = intl.formatMessage({
		id: "page.airDrop.TakeLookAtOurProject"
	});
	const cannotMintArtWorkFromMobileI18 = intl.formatMessage({
		id: "page.createArtwork.cannotMintArtWorkFromMobile"
	}); 
	const mobileFileInputLabelOptional = intl.formatMessage({
		id: "popup.label.mobileFileInputLabelOptional"
	}); 
	const checkCheckBoxI18 = intl.formatMessage({
		id: "sellArtWork.checkCheckBox"
	}); 
	const artworkCheckLayerTitleI18 = intl.formatMessage({
		id: "page.license.artworkCheckLayerTitle"
	});
	const recieveAirdropsResponsiveI18 = intl.formatMessage({
		id: "recieve.Airdrops.Airdrops"
	});
	const claimArtworkTitleI18 = intl.formatMessage({
		id: "claimArtwork.Mobile.Title"
	});
	const claimArtworkPlaceholderI18 = intl.formatMessage({
		id: "claimArtwork.Mobile.Placeholder"
	});
	const claimArtworkBtnI18 = intl.formatMessage({
		id: "claimArtwork.Mobile.Btn"
	});
	const FoldI18 = intl.formatMessage({
		id: "page.event.Fold"
	});


	const allRightsI18 = {
		publicTransmission,
		reproduction,
		publicPerformance: performance,
		publicExhibition: exhibition,
		distribution,
		rental,
		derivativeWork
	};

	return {
		paymentPeriodHasEndedI18,
		dayfromcontractCompletionI18,
		requesterNameI18,
		nftMintingApplicationI18,
		stopSelling,
		sendSaleRequestI18,
		notRegisteredForSaleI18,
		publicTransmission2,
		compitationConfirmI18,
		orderPurchaseI18,
		orderDescription1I18,
		orderDescription2I18,
		orderCheckboxI18,
		//unRegisteredWorkI18,
		NFTSoldDescI18,
		NFTroyaltyDescI18,
		mintingI18,
		auctionSupportedLaterI18,
		salesCommissionI18,
		resaleFeeI18,
		plsAgreeTermsI18,
		agreeI18,
		noticeTextLi1I18,
		noticeTextLi2I18,
		noticeTextLi3I18,
		noticeTextLi4I18,
		noticeTextLi5I18,
		noticeTextLi6I18,
		noticeTextLi7I18,
		noticeI18,
		salesPeriodSettingI18,
		plsEnterSellingPriceI18,
		bidText1I18,
		bidText2I18,
		auctionI18,
		sellingTextI18,
		fixedPriceI18,
		registrationOwnershipSaleI18,
		noI18,
		plsSelectRightsI18,
		plsAttachContractI18,
		ifTitleKoreanI18,
		inBetaServiceI18,
		ifYoNotCreatorI18,
		checkLicensePeriodI18,
		attachmentsI18,
		copyright_registeredI18,
		contract_detailsI18,
		copyrightLicenseI18,
		creator_royaltyI18,
		author_descI18,
		artWorkDescI18,
		caseI18,
		allRightsI18,
		noContentI18,
		workLinkCopiedI18,
		copyLinkI18,
		wishI18,
		likeI18,
		otpAuthI18,
		paymentI18,
		wouldYouLikeBuyI18,
		orderAlertDescI18,
		makePaymentI18,
		orderPaymentI18,
		receptionCompleteI18,
		declarationI18,
		uploadFileI18,
		etcI18,
		copyrightViolationI18,
		unauthorizedUsePeoplesWorkI18,
		writeReasonFirstI18,
		plsSelectRepresentiveReasonI18,
		incaseVariousReasonsI18,
		reportReceivedI18,
		chainInfoI18,
		licenseAgreementDateI18,
		periodOfUseI18,
		nodataI18,
		licenseTransactionsI18,
		ownershipTransactionsI18,
		workInfoI18,
		authorInfoI18,
		closeI18,
		plsInstallMetaMaskI18,
		reasonI18,
		footer_desc1I18,
		saveI18,
		detailTitle2_I18,
		detailTitle1_I18,
		applyLicenseWarningI18,
		stopSellingWarningI18,
		stopSellingQuestionI18,
		licenseTknTradeRegI18,
		notAvailableI18,
		salesRegistrationI18,
		editSellPriceI18,
		changePriceCancelI18,
		editChangePriceI18,
		licenseAppI18,
		purchaseWorksI18,
		purchaseArtI18,
		unableToApllyI18,
		licenceAvailableI18,
		priceI18,
		createrRoyalty,
		reportI18,
		textareaPlaceholderI18,
		licensePayoutInputPlaceholderI18,
		aplicantInputPlaceholder1I18,
		plsSelectAtLeast1I18,
		createArtworkTitleI18,
		approvedPermissionTextI18,
		alertLicenseReqFinalLastI18,
		alertLicenseReqFinalI18,
		alertLicenseReqI18,
		initializationI18,
		searchI18,
		copyrightContractWorksI18,
		artOwnershipTransactionI18,
		token_issuanceI18,
		NFT_issuanceI18,
		commissionI18,
		doesnt_existI18,
		title,
		subTitle,
		imgTitle,
		imgVal1,
		imgVal2,
		fileExt,
		dragAttach,
		dragAttach1,
		uploadI18,
		category,
		essential,
		nickname,
		workTitle,
		workInformation,
		retention,
		charge,
		inputPlaceholder,
		workDesc,
		authorIntroductionI18,
		textareaPlaceholder,
		workdescPlaceholder,
		authordescPlaceholder,
		selectPaymentMethod,
		plsSelectPaymentMethod,
		plsSelectAllrights,
		multiSelectionNotAllowed,
		paymentMethodDesc,
		retentionRights,
		areYouCreator,
		otherPeoples,
		yes,
		no,
		warningText,
		selectAll,
		ownership,
		creatorRoyaltyI18,
		copyrightProperty,
		creatorWarning,
		propertyRight,
		copyrightHistory,
		withLicenseAgreement,
		noLicenseAgreement,
		th1,
		th2,
		th3,
		th4,
		th5,
		plsUploadLicenseAgreement,
		fileSelection,
		licenseTransactionWarning,
		copyrightTitle,
		commissionQuestion,
		registered,
		notRegistered,
		copyrightWarning,
		plsUploadCertificate,
		apply,
		refuse,
		cancel,
		changeAmount,
		plsSelectRight,
		close,
		publicRights,
		reproduction,
		performance,
		publicTransmission,
		broadcast,
		transmission,
		digitalVoice,
		exhibition,
		distribution,
		rental,
		derivativeWork,
		reproductionDesc,
		performanceDesc,
		publicTransmissionDesc,
		broadcastDesc,
		transmissionDesc,
		digitalVoiceDesc,
		exhibitionDesc,
		distributionDesc,
		rentalDesc,
		derivativeWorkDesc,
		certifiedWorkI18,
		tamtamWriterI18,
		copyrightedWorkI18,
		verificationCertificateI18,
		competitionTitleI18,
		TamtamNFTI18,
		title1I18,
		title2I18,
		title3I18,
		btnI18,
		checkboxTitleI18,
		description1I18,
		description2I18,
		description3I18,
		t2description1I18,
		t2description2I18,
		t2description3I18,
		t2description4I18,
		t3description1I18,
		t3description2I18,
		t3description3I18,
		t3description4I18,
		t3description5I18,
		t3description6I18,
		t3description7I18,
		t3description8I18,
		t3description9I18,
		t3description10I18,
		t3description11I18,
		firstCompleteI18,
		sendI18,
		viewExibitsI18,
		checkStatusI18,
		enteredEnglishI18,
		uploadFilesI18,
		auctionNoticeTextLi1I18,
		auctionNoticeTextLi2I18,
		auctionNoticeTextLi3I18,
		auctionNoticeTextLi4I18,
		auctionNoticeTextLi5I18,
		auctionNoticeTextLi6I18,
		auctionNoticeTextLi7I18,
		salesPeriodI18,
		startingPriceI18,
		maximumSalesI18,
		upComingAuctionI18,
		auctionDateI18,
		auctionInformationI18,
		bidderI18,
		bidI18,
		biddingStatusI18,
		timeLeftUntilI18,
		timeRemainingI18,
		salePeriodI18,
		currentPriceI18,
		placeBidI18,
		biddingI18,
		changeTermsConfirmI18,
		notPossibleChargeI18,
		beFirstBidsI18,
		paymentModalI18,
		meteMaskComfirmI18,
		ifHighterI18,
		auctionNoticeTextLi8I18,
		bidgsI18,
		bidButtonI18,
		errorMessageI18,
		productIntroI18,
		productTeamIntroI18,
		productIntroLinkI18,
		productTeamIntrolinkI18,
		findArtworksI18,
		undicoveredArtworksI18,
		SeeMoreI18,
		foundArtworksI18,
		projectIntroI18,
		teamIntroI18,
		howToParticipateI18,
		schedule18,
		participatingLoci18,
		projectNFTI18,
		projectDescriptionI18,
		applyTabI18,
		artworkNFTI18,
		hiddenNFTI18,
		discoveredNFTI18,
		projectIntroductionI18,
		teamIntroductionI18,
		howParticipateI18,
		participateScheduleI18,
		placeParticipationI18,
		footerBtnI18,
		undiscoveredWorkI18,
		creatorRoyaltyDescI18,
		creatorRoyaltyDesc2I18,
		auctionListRemoveI18,
		auctionListRemove1I18,
		auctionListRemoveHeaderI18,
		auctionInProgressI18,
		unsoldWorkI18,
		requestTitleI18,
		clipCopyI18,
		notAvailable2I18,
		licenseTknTradeReg2I18,
		alertFileSize,
		fileSize70I18,
		licenseText1I18,
		licenseTitle1I18,
		licenseText2I18,
		licenseTitle2I18,
		licenseText3I18,
		licenseTitle3I18,
		licenseText4I18,
		licenseTitle4I18,
		licenseText5I18,
		licenseTitle5I18,
		licenseText6I18,
		licenseTitle6I18,
		licenseText7I18,
		licenseTitle7I18,
		auctionDisabledI18,
		airDropTextTakeLookAtOurProjectI18,
		changePrice,
		cannotMintArtWorkFromMobileI18,
		mobileFileInputLabelOptional,
		toI18,
		send,
		sendRequestWorkI18,
		projectNameI18,
		checkCheckBoxI18,
		artworkCheckLayerTitleI18,
		mainTitleI18,
		titles1I18,
		titles2I18,
		recieveAirdropsResponsiveI18,
		claimArtworkTitleI18,
		claimArtworkPlaceholderI18,
		claimArtworkBtnI18,
		sellingPriceI18,
		fixedPriceBtnI18,
		editPriceI18,
		undiscoveredDetailI18,
		unDiscoveredWorksI18,
		gotoFindWorksI18,
		unRegisteredWorksI18,
		artwork1I18,
		goMypage,
		backAllI18,
		FoldI18
	};
}

export default useArtworkTranslation;
