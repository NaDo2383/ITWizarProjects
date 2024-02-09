import React from "react";
import { useIntl } from "react-intl";

function useCommonTranslation() {
	const intl = useIntl();
	const menu_right = intl.formatMessage({ id: "page.layout.menu_right" });
	const menu_market = intl.formatMessage({ id: "page.layout.menu_market" });
	const menu_about = intl.formatMessage({ id: "page.layout.menu_about" });
	const menu_guide = intl.formatMessage({ id: "page.layout.menu_guide" });
	const menu_raceMarket = intl.formatMessage({
		id: "page.layout.menu_raceMarket"
	});
	const menu_event = intl.formatMessage({ id: "page.layout.menu_event" });
	const menu_competition = intl.formatMessage({
		id: "page.layout.menu_competition"
	});

	const submenu_nftMarket = intl.formatMessage({
		id: "page.layout.submenu_nftMarket"
	});
	const submenu_artist = intl.formatMessage({
		id: "page.layout.submenu_artist"
	});
	const submenu_bendingMachine = intl.formatMessage({
		id: "page.layout.submenu_bendingMachine"
	});
	const submenu_competition = intl.formatMessage({
		id: "page.layout.submenu_competition"
	});
	const submenu_notice = intl.formatMessage({
		id: "page.layout.submenu_notice"
	});
	const submenu_qa = intl.formatMessage({ id: "page.layout.submenu_qa" });

	const menu_login = intl.formatMessage({ id: "page.layout.menu_login" });
	const searchbarPlaceholder = intl.formatMessage({
		id: "page.layout.searchbar.placeholder"
	});

	//footer texts
	const copyright = intl.formatMessage({ id: "page.layout.footer.copyright" });
	const termsOfService = intl.formatMessage({
		id: "page.layout.footer.menu.termsOfService"
	});
	const privacyPolicy = intl.formatMessage({
		id: "page.layout.footer.menu.privacyPolicy"
	});
	const Notice = intl.formatMessage({
		id: "page.layout.footer.menu.Notice"
	});
	const subText = intl.formatMessage({
		id: "page.layout.footer.subText"
	});
	const companyName = intl.formatMessage({
		id: "page.layout.footer.companyName"
	});
	const representiveName = intl.formatMessage({
		id: "page.layout.footer.representiveName"
	});
	const address = intl.formatMessage({
		id: "page.layout.footer.address"
	});
	const tel = intl.formatMessage({
		id: "page.layout.footer.tel"
	});
	const fax = intl.formatMessage({
		id: "page.layout.footer.fax"
	});
	const businessTel = intl.formatMessage({
		id: "page.layout.footer.businessTel"
	});
	const errorI18 = intl.formatMessage({
		id: "page.error"
	});
	const agreeTitleI18 = intl.formatMessage({
		id: "page.auth.agreeTitle"
	});
	const termsOfUseI18 = intl.formatMessage({
		id: "page.auth.termsOfUse"
	});
	const agreeTermsI18 = intl.formatMessage({
		id: "page.auth.agreeTerms"
	});
	const privacyPolicyI18 = intl.formatMessage({
		id: "page.auth.privacyPolicy"
	});
	const iAgreeTextI18 = intl.formatMessage({
		id: "page.auth.iAgreeText"
	});
	const idVerificationI18 = intl.formatMessage({
		id: "page.auth.idVerification"
	});
	const authenticateI18 = intl.formatMessage({
		id: "page.auth.authenticate"
	});
	const tab1TitleI18 = intl.formatMessage({
		id: "page.auth.tab.item1"
	});
	const tab2TitleI18 = intl.formatMessage({
		id: "page.auth.tab.item2"
	});
	const tab3TitleI18 = intl.formatMessage({
		id: "page.auth.tab.item3"
	});
	const tab4TitleI18 = intl.formatMessage({
		id: "page.auth.tab.item4"
	});
	const bannerTitleI18 = intl.formatMessage({
		id: "page.banner.title"
	});
	const tradingItemI18 = intl.formatMessage({
		id: "page.filter.tradingItem"
	});
	const filterI18 = intl.formatMessage({
		id: "page.filter.filter"
	});
	const entireI18 = intl.formatMessage({
		id: "page.filter.entire"
	});
	const saleStatusI18 = intl.formatMessage({
		id: "page.filter.saleStatus"
	});
	const ownershipTransactionI18 = intl.formatMessage({
		id: "page.main.service.ownershipTransaction"
	});

	const mailSentI18 = intl.formatMessage({
		id: "page.mypage.mailSent"
	});
	const mailSentDescI18 = intl.formatMessage({
		id: "page.mypage.mailSentDesc"
	});
	const verificationWarningI18 = intl.formatMessage({
		id: "page.mypage.verificationWarning"
	});
	const linkmailI18 = intl.formatMessage({
		id: "page.mypage.linkmail"
	});
	const valid24HoursI18 = intl.formatMessage({
		id: "page.mypage.valid24Hours"
	});
	const noSeeI18 = intl.formatMessage({
		id: "page.mypage.noSee"
	});
	const checkValidityPeriodI18 = intl.formatMessage({
		id: "page.mypage.checkValidityPeriod"
	});
	const mailResentAfterI18 = intl.formatMessage({
		id: "page.mypage.mailResentAfter"
	});
	const resendVerificationI18 = intl.formatMessage({
		id: "page.mypage.resendVerification"
	});

	const noticeI18 = intl.formatMessage({
		id: "page.notifications.notice"
	});
	const unreadNoticesI18 = intl.formatMessage({
		id: "page.notifications.unreadNotices"
	});
	const isimnidaI18 = intl.formatMessage({
		id: "page.notifications.isimnida"
	});
	const confirmedI18 = intl.formatMessage({
		id: "page.notifications.confirmed"
	});
	const selectAllI18 = intl.formatMessage({
		id: "page.notifications.selectAll"
	});
	const dateI18 = intl.formatMessage({
		id: "page.notifications.date"
	});
	const divisionI18 = intl.formatMessage({
		id: "page.notifications.division"
	});
	const contentsI18 = intl.formatMessage({
		id: "page.uguide.selectbox.option3"
	});
	const LICENSE_BUYI18 = intl.formatMessage({
		id: "page.notifications.types.LICENSE_BUY"
	});
	const checkContractI18 = intl.formatMessage({
		id: "page.notifications.types.LICENSE_PAID"
	});
	const NFTI18 = intl.formatMessage({
		id: "page.notifications.types.NFT"
	});
	const LICENSE_SELLERI18 = intl.formatMessage({
		id: "page.notifications.types.LICENSE_SELLER"
	});
	const ARTWORKI18 = intl.formatMessage({
		id: "page.notifications.types.ARTWORK"
	});

	//findLogin
	const findIdI18 = intl.formatMessage({
		id: "page.findLogin.findId"
	});
	const forgotPasswordI18 = intl.formatMessage({
		id: "page.findLogin.forgotPassword"
	});
	const loginNameI18 = intl.formatMessage({
		id: "page.findLogin.name"
	});
	const inputYournamePlsI18 = intl.formatMessage({
		id: "page.findLogin.inputYournamePls"
	});
	const mobileNumberI18 = intl.formatMessage({
		id: "page.findLogin.mobileNumber"
	});
	const idSearchCompleteI18 = intl.formatMessage({
		id: "page.findLogin.idSearchComplete"
	});
	const plsCheckIdI18 = intl.formatMessage({
		id: "page.findLogin.plsCheckId"
	});
	const thankYoTamTamI18 = intl.formatMessage({
		id: "page.findLogin.thankYoTamTam"
	});
	const plsEnterEmailI18 = intl.formatMessage({
		id: "page.findLogin.plsEnterEmail"
	});
	const getMailInstructionsI18 = intl.formatMessage({
		id: "page.findLogin.getMailInstructions"
	});
	const sentMailToI18 = intl.formatMessage({
		id: "page.findLogin.sentMailTo"
	});
	const resetEmailMessageI18 = intl.formatMessage({
		id: "page.findLogin.resetEmailMessage"
	});
	const emailI18 = intl.formatMessage({
		id: "page.findLogin.email"
	});

	// common
	const nerrorI18 = intl.formatMessage({
		id: "page.common.Error"
	});
	const networkErrorI18 = intl.formatMessage({
		id: "page.common.networkError"
	});

	const loginI18 = intl.formatMessage({
		id: "page.common.login"
	});
	const inputIdPlaceholderI18 = intl.formatMessage({
		id: "page.common.login.input.IdPlaceholder"
	});
	const inputPasswordPlaceholderI18 = intl.formatMessage({
		id: "page.common.login.input.PasswordPlaceholder"
	});
	const saveIDI18 = intl.formatMessage({
		id: "page.common.login.label.saveID"
	});
	const findIdPassI18 = intl.formatMessage({
		id: "page.common.login.label.findIdPass"
	});
	const signupI18 = intl.formatMessage({
		id: "page.common.login.button.signup"
	});
	const mdRecommendedI18 = intl.formatMessage({
		id: "page.common.mdRecommended"
	});
	const serviceIntroductionI18 = intl.formatMessage({
		id: "page.common.serviceIntroduction"
	});
	const sortI18 = intl.formatMessage({
		id: "page.common.sort"
	});
	const marketNFTI18 = intl.formatMessage({
		id: "page.common.marketNFT"
	});
	const projectNFTI18 = intl.formatMessage({
		id: "page.common.projectNFT"
	});
	const competitionNFTI18 = intl.formatMessage({
		id: "page.common.competitionNFT"
	});
	const saleI18 = intl.formatMessage({
		id: "page.common.sale"
	});
	const unsoldI18 = intl.formatMessage({
		id: "page.common.unsold"
	});
	const newestI18 = intl.formatMessage({
		id: "page.common.newest"
	});
	const byPriceI18 = intl.formatMessage({
		id: "page.common.byPrice"
	});
	const byLikeI18 = intl.formatMessage({
		id: "page.common.byLike"
	});
	const byHeartI18 = intl.formatMessage({
		id: "page.common.byHeart"
	});
	const byPopularityI18 = intl.formatMessage({
		id: "page.common.byPopularity"
	});
	const licenseAgreementI18 = intl.formatMessage({
		id: "page.common.licenseAgreement"
	});
	const logoutI18 = intl.formatMessage({
		id: "page.common.logout"
	});
	const copyrightEyesProtocolI18 = intl.formatMessage({
		id: "page.common.copyrightEyesProtocol"
	});
	const servicePolicyI18 = intl.formatMessage({
		id: "page.common.servicePolicy"
	});
	const publishedWorksI18 = intl.formatMessage({
		id: "page.common.publishedWorks"
	});
	const mintNFTI18 = intl.formatMessage({
		id: "page.common.mintNFT"
	});
	const buyNFTI18 = intl.formatMessage({
		id: "page.common.buyNFT"
	});
	const noFavoritesI18 = intl.formatMessage({
		id: "page.common.noFavorites"
	});
	const editPersonalInfoI18 = intl.formatMessage({
		id: "page.common.editPersonalInfo"
	});
	const EYESsupportedLaterI18 = intl.formatMessage({
		id: "page.common.EYESsupportedLater"
	});
	const plsSetPaymentMethodMaticI18 = intl.formatMessage({
		id: "page.common.plsSetPaymentMethodMatic"
	});
	const plsWaitForMomentI18 = intl.formatMessage({
		id: "page.common.plsWaitForMoment"
	});
	const processingI18 = intl.formatMessage({
		id: "page.common.processing"
	});
	const idEnteredWhenSignUpI18 = intl.formatMessage({
		id: "page.common.idEnteredWhenSignUp"
	});
	const TokenExpiredI18 = intl.formatMessage({
		id: "page.common.TokenExpired"
	});
	const errorTryAgainI18 = intl.formatMessage({
		id: "page.common.errorTryAgain"
	});
	const passwordNotMatchI18 = intl.formatMessage({
		id: "page.common.passwordNotMatch"
	});
	const inValidPasswordI18 = intl.formatMessage({
		id: "page.common.inValidPassword"
	});
	const inValidTokenI18 = intl.formatMessage({
		id: "page.common.inValidToken"
	});
	const thisLinkOutDateI18 = intl.formatMessage({
		id: "page.common.thisLinkOutDate"
	});
	const newPasswordI18 = intl.formatMessage({
		id: "page.common.newPassword"
	});
	const confirmNewPasswordI18 = intl.formatMessage({
		id: "page.common.confirmNewPassword"
	});
	const changePasswordI18 = intl.formatMessage({
		id: "page.common.changePassword"
	});
	const passwordChangeSuccessfullyI18 = intl.formatMessage({
		id: "page.common.passwordChangeSuccessfully"
	});
	const plsLoginI18 = intl.formatMessage({
		id: "page.common.plsLogin"
	});
	const passwordChangeErrorI18 = intl.formatMessage({
		id: "page.common.passwordChangeError"
	});
	const resendEmailI18 = intl.formatMessage({
		id: "page.common.resendEmail"
	});
	const regDescI18 = intl.formatMessage({
		id: "page.common.regDesc"
	});
	const regDesc2I18 = intl.formatMessage({
		id: "page.common.regDesc2"
	});
	const closeI18 = intl.formatMessage({
		id: "page.common.close"
	});
	const makePaymentI18 = intl.formatMessage({
		id: "page.common.makePayment"
	});
	const errorMessage1I18 = intl.formatMessage({
		id: "page.common.errorMessage1"
	});
	const errorMessage2I18 = intl.formatMessage({
		id: "page.common.errorMessage2"
	});
	const errorMessage3I18 = intl.formatMessage({
		id: "page.common.errorMessage3"
	});
	const actionClosedI18 = intl.formatMessage({
		id: "page.common.actionClosed"
	});
	const checkAllTermsI18 = intl.formatMessage({
		id: "page.common.checkAllTerms"
	});
	const betaServicePeriodI18 = intl.formatMessage({
		id: "page.common.betaServicePeriod"
	});
	const tamtamWritersOnlyI18 = intl.formatMessage({
		id: "page.common.tamtamWritersOnly"
	});
	const reportPlaceholderI18 = intl.formatMessage({
		id: "page.common.report"
	});
	const filterItemI18 = intl.formatMessage({
		id: "page.common.filterItem"
	});
	const ascendingOrderI18 = intl.formatMessage({
		id: "page.common.ascendingOrder"
	});
	const descendingOrderI18 = intl.formatMessage({
		id: "page.common.descendingOrder"
	});

	const registrationFinishedI18 = intl.formatMessage({
		id: "page.verifyUser.registrationFinished"
	});
	const toUseOnMyPageI18 = intl.formatMessage({
		id: "page.verifyUser.toUseOnMyPage"
	});
	const plsLinkAuthIdWalletI18 = intl.formatMessage({
		id: "page.verifyUser.plsLinkAuthIdWallet"
	});
	const goLoginPageI18 = intl.formatMessage({
		id: "page.verifyUser.goLoginPage"
	});
	const emailAlreadyVerifiedI18 = intl.formatMessage({
		id: "page.verifyUser.emailAlreadyVerified"
	});
	const plsLoginOnVerifyUserI18 = intl.formatMessage({
		id: "page.verifyUser.plsLogin"
	});
	const tokenExpiredI18 = intl.formatMessage({
		id: "page.verifyUser.tokenExpired"
	});
	const checkYorMailVerifyI18 = intl.formatMessage({
		id: "page.verifyUser.checkYorMailVerify"
	});
	const otpAuthKeyDoesntMatchI18 = intl.formatMessage({
		id: "page.verifyUser.otpAuthKeyDoesntMatch"
	});

	const total = intl.formatMessage({
		id: "page.ArtDetails.Popup.total"
	});

	const auctionInProgressI18 = intl.formatMessage({
		id: "page.auction.auctionInProgress"
	});
	const upComingAuctionI18 = intl.formatMessage({
		id: "page.auction.upComingAuction"
	});
	const cahngeTermI18 = intl.formatMessage({
		id: "page.auction.changeTerm"
	});
	const stopSaleI18 = intl.formatMessage({
		id: "page.auction.stopSale"
	});

	const dayI18 = intl.formatMessage({
		id: "page.date.day"
	});
	const monthI18 = intl.formatMessage({
		id: "page.date.month"
	});
	const hourI18 = intl.formatMessage({
		id: "page.date.hour"
	});
	const minuteI18 = intl.formatMessage({
		id: "page.date.minute"
	});
	const secondI18 = intl.formatMessage({
		id: "page.date.second"
	});
	const datePriceI18 = intl.formatMessage({
		id: "page.date.datePrice"
	});
	const preparingEventI18 = intl.formatMessage({
		id: "page.event.preparing"
	});
	const gotoArtworkI18 = intl.formatMessage({
		id: "page.common.gotoArtwork"
	});
	const viewSalesHistoryI18 = intl.formatMessage({
		id: "page.common.viewSalesHistory"
	});
	const viewPurchasedWorksI18 = intl.formatMessage({
		id: "page.common.viewPurchasedWorks"
	});
	const checkApplicationHistoryI18 = intl.formatMessage({
		id: "page.common.checkApplicationHistory"
	});
	const proceedToLicenseAgreementI18 = intl.formatMessage({
		id: "page.common.proceedToLicenseAgreement"
	});
	const checkRejectReasonI18 = intl.formatMessage({
		id: "page.common.checkRejectReason"
	});
	const checkBidHistoryI18 = intl.formatMessage({
		id: "page.common.checkBidHistory"
	});
	const loginIntroductionI18 = intl.formatMessage({
		id: "page.login.loginPopUp.loginIntroduction"
	});
	const linkWalletI18 = intl.formatMessage({
		id: "page.login.loginPopUp.linkWallet"
	});
	const connectMetaMaskI18 = intl.formatMessage({
		id: "page.login.loginPopUp.connectMetaMask"
	});
	const totalI18 = intl.formatMessage({
		id: "page.common.entire"
	});
	const linkYourWalletI18 = intl.formatMessage({
		id: "page.login.mobileMenu.linkYourWallet"
	});
	const notMintedI18 = intl.formatMessage({
		id: "page.artistList.notMinted"
	});
	const notPurchasedI18 = intl.formatMessage({
		id: "page.artistList.notPurchased"
	});
	const noticeDownloadI18 = intl.formatMessage({
		id: "page.saleArt.notice.download"
	});
	const pleaseLoginI18 = intl.formatMessage({
		id: "page.artistList.pleaseLogin"
	});

	const noLicenseI18 = intl.formatMessage({
		id: "page.noLicense"
	});
	const noPurchasedNftI18 = intl.formatMessage({
		id: "page.noPurchasedNft"
	});
	const noDesiredNftI18 = intl.formatMessage({
		id: "page.noDesiredNft"
	});
	const noActivityHistoryI18 = intl.formatMessage({
		id: "page.noActivityHistory"
	});
	const noCompletedContractI18 = intl.formatMessage({
		id: "page.noCompletedContract"
	});
	const metaMaskRegisterMessageI18 = intl.formatMessage({
		id: "register.metaMaskRegisterMessage"
	});	
	const footerApplyAsCreatorI18 = intl.formatMessage({
		id: "footer.footerApplyAsCreator"
	});	
	const helloProfileI18 = intl.formatMessage({
		id: "mobileMenu.helloProfile"
	});	
	const footerLongTextI18 = intl.formatMessage({
		id: "footer.footerLongText"
	});	
	const footerSmallText1I18 = intl.formatMessage({
		id: "footer.footerSmallText1"
	});	
	const footerSmallText2I18 = intl.formatMessage({
		id: "footer.footerSmallText2"
	});	
	const footerSmallText3I18 = intl.formatMessage({
		id: "footer.footerSmallText3"
	});	
	const footerSmallText4I18 = intl.formatMessage({
		id: "footer.footerSmallText4"
	});	
	const footerSmallText5I18 = intl.formatMessage({
		id: "footer.footerSmallText5"
	});	
	const submenu_IntroductionI18 = intl.formatMessage({
		id: "submenu.sunmenu_Introduction"
	});	
	const check_out_the_author_worksI18 = intl.formatMessage({
		id: "artist_introduction.check_out_the_author_works"
	});	

	const notificationTypesI18 = {
		ARTWORK: ARTWORKI18,
		NFT: LICENSE_SELLERI18,
		ARTWORK_TRANSFER: NFTI18,
		LICENSE: LICENSE_BUYI18
	};

	const menuTexts = {
		filterItemI18,
		ascendingOrderI18,
		descendingOrderI18,
		menu_right,
		menu_market,
		menu_guide,
		menu_competition,
		menu_login,
		menu_raceMarket,
		menu_event,
		submenu_nftMarket,
		submenu_artist,
		submenu_bendingMachine,
		submenu_competition,
		submenu_notice,
		submenu_qa,
		menu_about,
		submenu_IntroductionI18
	};
	const footerTexts = {
		copyright,
		termsOfService,
		privacyPolicy,
		Notice,
		subText,
		companyName,
		representiveName,
		address,
		tel,
		fax,
		businessTel,
		footerApplyAsCreatorI18,
		footerLongTextI18,
		footerSmallText1I18,
		footerSmallText2I18,
		footerSmallText3I18,
		footerSmallText4I18,
		footerSmallText5I18
	};
	return {
		noCompletedContractI18,
		noLicenseI18,
		noPurchasedNftI18,
		noDesiredNftI18,
		noActivityHistoryI18,
		pleaseLoginI18,
		checkContractI18,
		checkBidHistoryI18,
		checkRejectReasonI18,
		proceedToLicenseAgreementI18,
		checkApplicationHistoryI18,
		viewPurchasedWorksI18,
		viewSalesHistoryI18,
		gotoArtworkI18,
		reportPlaceholderI18,
		checkAllTermsI18,
		otpAuthKeyDoesntMatchI18,
		checkYorMailVerifyI18,
		tokenExpiredI18,
		plsLoginOnVerifyUserI18,
		emailAlreadyVerifiedI18,
		goLoginPageI18,
		plsLinkAuthIdWalletI18,
		toUseOnMyPageI18,
		registrationFinishedI18,
		regDescI18,
		resendEmailI18,
		passwordChangeErrorI18,
		plsLoginI18,
		passwordChangeSuccessfullyI18,
		changePasswordI18,
		confirmNewPasswordI18,
		newPasswordI18,
		thisLinkOutDateI18,
		inValidTokenI18,
		inValidPasswordI18,
		passwordNotMatchI18,
		errorTryAgainI18,
		TokenExpiredI18,
		idEnteredWhenSignUpI18,
		processingI18,
		plsWaitForMomentI18,
		plsSetPaymentMethodMaticI18,
		EYESsupportedLaterI18,
		editPersonalInfoI18,
		noFavoritesI18,
		publishedWorksI18,
		servicePolicyI18,
		emailI18,
		resetEmailMessageI18,
		sentMailToI18,
		getMailInstructionsI18,
		plsEnterEmailI18,
		thankYoTamTamI18,
		plsCheckIdI18,
		idSearchCompleteI18,
		mobileNumberI18,
		inputYournamePlsI18,
		loginNameI18,
		forgotPasswordI18,
		findIdI18,
		notificationTypesI18,
		contentsI18,
		divisionI18,
		dateI18,
		selectAllI18,
		confirmedI18,
		isimnidaI18,
		unreadNoticesI18,
		noticeI18,
		tamtamWritersOnlyI18,
		betaServicePeriodI18,
		resendVerificationI18,
		mailResentAfterI18,
		checkValidityPeriodI18,
		noSeeI18,
		valid24HoursI18,
		linkmailI18,
		verificationWarningI18,
		mailSentDescI18,
		mailSentI18,
		logoutI18,
		licenseAgreementI18,
		ownershipTransactionI18,
		byPopularityI18,
		byPriceI18,
		byLikeI18,
		byHeartI18,
		newestI18,
		sortI18,
		filterI18,
		tradingItemI18,
		serviceIntroductionI18,
		mdRecommendedI18,
		signupI18,
		findIdPassI18,
		saveIDI18,
		inputPasswordPlaceholderI18,
		inputIdPlaceholderI18,
		loginI18,
		bannerTitleI18,
		tab1TitleI18,
		tab2TitleI18,
		tab3TitleI18,
		tab4TitleI18,
		authenticateI18,
		idVerificationI18,
		iAgreeTextI18,
		privacyPolicyI18,
		agreeTermsI18,
		termsOfUseI18,
		agreeTitleI18,
		menuTexts,
		searchbarPlaceholder,
		footerTexts,
		errorI18,
		closeI18,
		errorMessage1I18,
		errorMessage2I18,
		errorMessage3I18,
		total,
		makePaymentI18,
		auctionInProgressI18,
		upComingAuctionI18,
		dayI18,
		hourI18,
		minuteI18,
		secondI18,
		datePriceI18,
		stopSaleI18,
		cahngeTermI18,
		monthI18,
		regDesc2I18,
		copyrightEyesProtocolI18,
		actionClosedI18,
		mintNFTI18,
		buyNFTI18,
		saleStatusI18,
		entireI18,
		marketNFTI18,
		projectNFTI18,
		competitionNFTI18,
		saleI18,
		unsoldI18,
		preparingEventI18,
		loginIntroductionI18,
		linkWalletI18,
		connectMetaMaskI18,
		submenu_artist,
		totalI18,
		linkYourWalletI18,
		notPurchasedI18,
		notMintedI18,
		noticeDownloadI18,
		metaMaskRegisterMessageI18,
		helloProfileI18,
		networkErrorI18,
		nerrorI18,
		check_out_the_author_worksI18
	};
}

export default useCommonTranslation;
