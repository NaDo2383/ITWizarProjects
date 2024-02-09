import { useIntl } from "react-intl";

function useAlertTranslation() {
	const intl = useIntl();
	const credentialDoesntMatchI18 = intl.formatMessage({
		id: "page.login.credentialDoesntMatch"
	});
	const walletAddressRegisteredI18 = intl.formatMessage({
		id: "page.alert.walletAddressRegistered"
	});
	const checkLicensePeriodI18 = intl.formatMessage({
		id: "page.alert.checkLicensePeriod"
	});
	const enterPurposeOfUseI18 = intl.formatMessage({
		id: "page.alert.enterPurposeOfUse"
	});
	const enterPaymentAmountI18 = intl.formatMessage({
		id: "page.alert.enterPaymentAmount"
	});
	const enterContactInfoI18 = intl.formatMessage({
		id: "page.alert.enterContactInfo"
	});
	const enterAddressI18 = intl.formatMessage({
		id: "page.alert.enterAddress"
	});
	const enterFullNameI18 = intl.formatMessage({
		id: "page.alert.enterFullName"
	});
	const selectTargetRightI18 = intl.formatMessage({
		id: "page.alert.selectTargetRight"
	});
	const registerYourWalletI18 = intl.formatMessage({
		id: "page.alert.registerYourWallet"
	});
	const setMetaMasksnetworkI18 = intl.formatMessage({
		id: "page.alert.setMetaMasksnetwork"
	});
	const noTokensInWalletI18 = intl.formatMessage({
		id: "page.alert.noTokensInWallet"
	});
	const notRegisteredI18 = intl.formatMessage({
		id: "page.alert.notRegistered"
	});
	const selectReasonReportingI18 = intl.formatMessage({
		id: "page.alert.selectReasonReporting"
	});
	const setMetaMasksMainnetI18 = intl.formatMessage({
		id: "page.alert.setMetaMasksMainnet"
	});
	const walletBalanceLowI18 = intl.formatMessage({
		id: "page.alert.walletBalanceLow"
	});
	const networkCongestedI18 = intl.formatMessage({
		id: "page.alert.networkCongested"
	});
	const metaMaskAddressNotFoundI18 = intl.formatMessage({
		id: "page.alert.metaMaskAddressNotFound"
	});
	const notOwnTokensInWalletAddressI18 = intl.formatMessage({
		id: "page.alert.notOwnTokensInWalletAddress"
	});
	const agreeTermsI18 = intl.formatMessage({
		id: "page.alert.agreeTerms"
	});
	const transactionWaitingMessageI18 = intl.formatMessage({
		id: "page.alert.transactionWaitingMessage"
	});
	const checkInstClickCheckboxI18 = intl.formatMessage({
		id: "page.alert.checkInstClickCheckbox"
	});
	const nicknameAlreadyExistI18 = intl.formatMessage({
		id: "page.alert.nicknameAlreadyExist"
	});
	const plsInstallMetaMaskI18 = intl.formatMessage({
		id: "page.alert.plsInstallMetaMask"
	});
	const verificationConfirmationI18 = intl.formatMessage({
		id: "page.alert.verificationConfirmation"
	});
	const plsSelectNotificationI18 = intl.formatMessage({
		id: "page.alert.plsSelectNotification"
	});
	const plsInstallMetamaskInBrowserI18 = intl.formatMessage({
		id: "page.alert.plsInstallMetamaskInBrowser"
	});
	const waitForMomentI18 = intl.formatMessage({
		id: "page.alert.waitForMoment"
	});
	const noMatchingAccountI18 = intl.formatMessage({
		id: "page.alert.noMatchingAccount"
	});
	const alreadyRegisteredI18 = intl.formatMessage({
		id: "page.alert.alreadyRegistered"
	});
	const networkChangeI18 = intl.formatMessage({
		id: "page.alert.networkChange"
	});
	const clickSwitchNetworkBtnI18 = intl.formatMessage({
		id: "page.alert.clickSwitchNetworkBtn"
	});
	const metamaskUnregisteredI18 = intl.formatMessage({
		id: "page.alert.metamaskUnregistered"
	});
	const metamaskDescriptionI18 = intl.formatMessage({
		id: "page.alert.metamaskDescription"
	});
	const registerMetamaskI18 = intl.formatMessage({
		id: "page.alert.registerMetamask"
	});
	const competitionIsExpiredI18 = intl.formatMessage({
		id: "page.alert.competitionExpired"
	});
	// const competitionExceededI18 = intl.formatMessage({
	//   id: "page.alert.competitionExceeded"
	// });
	const changeI18 = intl.formatMessage({
		id: "page.alert.change"
	});
	const changePolygonI18 = intl.formatMessage({
		id: "page.alert.changePolygon"
	});
	const minDayI18 = intl.formatMessage({
		id: "page.auction.minDay"
	});
	const maxDayI18 = intl.formatMessage({
		id: "page.auction.maxDay"
	});
	const artworkRevokedI18 = intl.formatMessage({
		id: "page.auction.artworkRevoked"
	});
	const purchaseI18 = intl.formatMessage({
		id: "page.alert.purchase"
	});
	const descriptionErrI18 = intl.formatMessage({
		id: "page.alert.descriptionErr"
	});
	const enterCoverImageI18 = intl.formatMessage({
		id: "page.event.plsEnterCoverImage"
	}); 
	const noArtworkI18 = intl.formatMessage({
		id: "page.artDetail.noArtwork"
	});

	const vmSuccessI18 = intl.formatMessage({
		id: "page.alert.vmSuccess"
	});
	const vmErrorI18 = intl.formatMessage({
		id: "page.alert.vmError"
	});

	const ADcodeI18 = intl.formatMessage({
		id: "page.alert.ADcode"
	}); 

	const ADcodeSuccessI18 = intl.formatMessage({
		id: "page.alert.ADcodeSuccess"
	});

	const vmAlreadyI18 = intl.formatMessage({
		id: "page.alert.vmAlready"
	}); 

	const vmNotArtworkI18 = intl.formatMessage({
		id: "page.alert.vmNotArtwork"
	}); 

	const metamaskSuccessI18 = intl.formatMessage({
		id: "page.alert.metamaskSuccess"
	}); 

	const metaSuccessTitleI18 = intl.formatMessage({
		id: "page.alert.metaSuccessTitle"
	});

	return {
		// competitionExceededI18,
		competitionIsExpiredI18,
		networkChangeI18,
		clickSwitchNetworkBtnI18,
		alreadyRegisteredI18,
		noMatchingAccountI18,
		waitForMomentI18,
		plsInstallMetamaskInBrowserI18,
		plsSelectNotificationI18,
		plsInstallMetaMaskI18,
		nicknameAlreadyExistI18,
		checkInstClickCheckboxI18,
		transactionWaitingMessageI18,
		agreeTermsI18,
		notOwnTokensInWalletAddressI18,
		metaMaskAddressNotFoundI18,
		networkCongestedI18,
		walletBalanceLowI18,
		setMetaMasksMainnetI18,
		selectReasonReportingI18,
		notRegisteredI18,
		noTokensInWalletI18,
		setMetaMasksnetworkI18,
		registerYourWalletI18,
		selectTargetRightI18,
		enterFullNameI18,
		enterAddressI18,
		enterContactInfoI18,
		enterPaymentAmountI18,
		enterPurposeOfUseI18,
		checkLicensePeriodI18,
		walletAddressRegisteredI18,
		verificationConfirmationI18,
		metamaskUnregisteredI18,
		metamaskDescriptionI18,
		registerMetamaskI18,
		minDayI18,
		maxDayI18,
		artworkRevokedI18,
		credentialDoesntMatchI18,
		changeI18,
		changePolygonI18,
		purchaseI18,
		descriptionErrI18,
		enterCoverImageI18,
		noArtworkI18,
		vmSuccessI18,
		vmErrorI18,
		vmAlreadyI18,
		vmNotArtworkI18,
		ADcodeI18,
		ADcodeSuccessI18,
		metamaskSuccessI18,
		metaSuccessTitleI18
	};
}

export default useAlertTranslation;
