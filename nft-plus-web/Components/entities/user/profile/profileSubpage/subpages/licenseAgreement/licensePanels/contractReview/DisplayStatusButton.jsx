/**
 * @createdBy Duka 2023/04/13
 */
import usePopup from "Components/ui/popup/usePopup";
import useMyPageTranslation from "locale/useMypageTranslation";
import React from "react";
import {
	GreenStatusBtn,
	GrayStatusBtn,
	BlueStatusBtn,
	RedStatusBtn,
	BlackStatusBtn
} from "Components/ui/button/StatusBtn";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useLicense from "Components/entities/license/useLicense";

function DisplayStatusButton(props) {
	const { handleShowModal, MODAL_TYPES, setGlobalModalState, hideModal } = usePopup();
	const { authUser } = useAuthUser();
	const buyerName = props.buyerName;
	const isOwnSendedLicenseRequest = authUser?.nickName === buyerName;
	const {
		check_termsI18,
		contractRefusalI18,
		expirationI18,
		view_contractI18,
		contract_reviewI18,
		waitingForPayment1I18,
		waitingForPayment2I18,
		contractApprovedPlsPayI18
	} = useMyPageTranslation();
	const { getLicenseRequests } = useLicense();
	
	function showLicenseCheckPopup() {
		setGlobalModalState( prev => ( 
			{
				...prev, 
				getLicenseList: () => getLicenseRequests(),
				license: props,
				showSwitchNetworkModal : (modalType) => {
					hideModal();
					handleShowModal(modalType);
				}  
			} 
		))
		handleShowModal(MODAL_TYPES.LICENSE_CHECK);
	}

	function showLicenseContractPopup() {
		handleShowModal(MODAL_TYPES.LICENSE_CONTRACT, { license: props });
	}

	function showLicenseDetailPopup() {
		setGlobalModalState( prev => ( 
			{
				...prev, 
				getLicenseList: () => getLicenseRequests(),
				license: props,
				showSwitchNetworkModal : (modalType) => {
					hideModal();
					handleShowModal(modalType);
				}    
			} 
		));
		handleShowModal(MODAL_TYPES.LICENSE_DETAIL);
	}

	function showLicenseExpritionPopup() {
		handleShowModal(MODAL_TYPES.LICENSE_EXPRITION, 
			setGlobalModalState( prev => ( 
				{
					...prev, 
					getLicenseList: () => getLicenseRequests(),
					license: props  
				} 
			)));
	}

	function showLicenseRejectPopup() {
		handleShowModal(MODAL_TYPES.LICENSE_REJECT, { license: props });
	}

	function showLicensePaymenPopup() {
		handleShowModal(MODAL_TYPES.LICENSE_PAYMENT);
		setGlobalModalState(prev => ({
			...prev, 
			license: props,
			// changeSubtab: () => {}
			showSwitchNetworkModal : (modalType) => {
				hideModal();
				handleShowModal(modalType);
			}
		}))
	}

	return (
		<div className="flex items-center justify-center">
			{props.status === "PENDING" && !isOwnSendedLicenseRequest && (
				<BlueStatusBtn 
					text={check_termsI18} 
					onClick={showLicenseCheckPopup} 
				/>
			)}
			{props.status === "PENDING" && isOwnSendedLicenseRequest && (
				<BlueStatusBtn
					text={contract_reviewI18}
					onClick={showLicenseDetailPopup}
				/>
			)}
			{props.status === "DENIED" && (
				<GrayStatusBtn
					text={contractRefusalI18}
					onClick={showLicenseRejectPopup}
				/>
			)}
			{props.status === "AUTO_CANCELED" && (
				<BlackStatusBtn
					text={expirationI18}
					onClick={showLicenseExpritionPopup}
				/>
			)}
			{props.status === "PAID" && (
				<GrayStatusBtn
					text={view_contractI18}
					onClick={showLicenseContractPopup}
				/>
			)}
			
			{props.status === "PAYMENT_PENDING" && isOwnSendedLicenseRequest && (
				<RedStatusBtn
				text={contractApprovedPlsPayI18}
					onClick={showLicensePaymenPopup}
				/>
			)}
			{props.status === "PAYMENT_PENDING" && !isOwnSendedLicenseRequest && (
				<RedStatusBtn
				text={waitingForPayment1I18}
				/>
			)}
		</div>
	);
}

export default DisplayStatusButton;
