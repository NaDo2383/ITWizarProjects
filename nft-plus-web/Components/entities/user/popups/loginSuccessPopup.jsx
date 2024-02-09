import React, { useEffect } from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import useAlertTranslation from "locale/useAlertTranslation";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import CloseBtn from "Components/ui/button/CloseBtn";
import usePopup from "Components/ui/popup/usePopup";
import useAuthMetamask from "common/metamask/useAuthMetamask";
import { useGlobalContext } from "common/global/useGlobalContext";
import metaIco from "public/meta.svg";
import Image from "next/image";

function loginSuccessPopup() {
	const { setAuthUser, globalItems } = useGlobalContext();
	const { onAuthMetamask } = useAuthMetamask();
	const { hideAllModals } = usePopup();
	const { confirmI18 } = useFAQpageTranslation()
	const { metamaskSuccessI18, metaSuccessTitleI18 } = useAlertTranslation()
	const { plsInstallMetaMaskI18 } = useAlertTranslation()

	function closeModal() {
		hideAllModals();
	}

	async function handleLogin() {
		if (!window.ethereum) {
			if (isMobile) {
				// router.push(process.env.DAPP_LINK);
				window.location.href = process.env.DAPP_LINK
				return;
			} else {
				const installMetamask = window.confirm(plsInstallMetaMaskI18);
				if (installMetamask) {
					window.open(
						"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
					);
				}
			}
			return;
		}
		await onAuthMetamask()
			.then((res) => {
				if (res.status === 404) {
					handleShowModal(MODAL_TYPES.SERVICE_CONDITION_POPUP);
				} else {
					setAuthUser(res?.result);
					hideAllModals();
				}
			})
			.catch((err) => {
				alert(err.message);
			});
	}

	return (
		<MainPopup width={530}>
			<PopupContainer>
				<div className="flex justify-between">
					<div className="flex flex-row justify-center items-center gap-[2px]">
						<Image src={metaIco} alt="metaIco" width={30} height={30} />
						<h3 className="text-[22px] text-white font-[500]">{metaSuccessTitleI18}</h3>
					</div>
					<CloseBtn onClick={closeModal} />
				</div>
				<PopupContent>
					<div className="full pt-[30px] pb-[40px] flex items-center">
						<h3 className="font-[400] sm:text-[18px] text-[14px] text-[#DDD]">
							{metamaskSuccessI18}
						</h3>
					</div>
				</PopupContent>
				<div className="w-full flex flex-row sm:justify-end md:justify-end justify-center font-[300] gap-[10px] right-[30px]">
					<button
						className="min-w-[74px] bg-[#404040] text-white py-[6px] text-center rounded-[5px] cursor-pointer"
						onClick={closeModal}
						type='button'
					>
						<h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{confirmI18}</h3>
					</button>
				</div>
			</PopupContainer>
		</MainPopup>
	);
}

export default loginSuccessPopup;
