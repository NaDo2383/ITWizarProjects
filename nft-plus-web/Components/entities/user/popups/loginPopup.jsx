import React, { useEffect } from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import Image from "next/image";
import metaIco from "public/meta.svg";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useAuthMetamask from "common/metamask/useAuthMetamask";
import { useGlobalContext } from "common/global/useGlobalContext";
import useCommonTranslation from "locale/useCommonTranslation";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import { useRouter } from "next/router";
import { isMobile, isIOS } from 'react-device-detect';
import useAlertTranslation from "locale/useAlertTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";

function LoginPopup() {;
	const router = useRouter()
	const {
		loginIntroductionI18,
		linkWalletI18,
		connectMetaMaskI18,
	} = useCommonTranslation();
	const { plsInstallMetaMaskI18 } = useAlertTranslation()
	const {
		hideAllModals,
		popupProps,
		handleShowModal,
		MODAL_TYPES
	} = usePopup();
	const { onAuthMetamask } = useAuthMetamask();
	const { setAuthUser, globalItems, setGlobalLoading } = useGlobalContext();
	const { cancelI18 } = useMyPageTranslation()

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
		<MainPopup width={550}>
			<PopupContainer>
				<div className="relative flex flex-col text-center bg-[#181A1A] w-full  rounded-lg overflow-hidden text-[18px]">
					<p className="text-[#FFF] pb-[26px] sm:text-[22px] text-[18px] text-start w-full font-[500]">
						{linkWalletI18}
					</p>
					<div
						onClick={ handleLogin}
						style={{ backgroundColor: "#6219FF" }}
						className={`w-full text-white cursor-pointer rounded-[10px] flex items-center gap-[10px] px-[20px] py-[14px] h-min `}>
						<Image src={metaIco} alt="metaIco" width={40} height={40} />
						<span className=" font-medium sm:text-[20px] text-[16px] text-[#DDD]">{connectMetaMaskI18}</span>
					</div>
					<div className=" w-full flex justify-end gap-4 mt-[40px]">
						<button
							className="sm:text-[18px] text-[15px] whitespace-nowrap rounded-[5px]  bg-[#404040] text-white px-5 pt-[6px] pb-[8px] cursor-pointer text-center"
							onClick={() => hideAllModals()}>
							{cancelI18}
						</button>
						<div onClick={() => {
							router.push("https://tamtam.art/notice/15")
							hideAllModals()
						}}>
							<button
								className="sm:text-[18px] text-[15px] whitespace-nowrap rounded-[5px] bg-[#404040] text-white px-5 pt-[6px] pb-[8px] cursor-pointer text-center">
								{loginIntroductionI18}
							</button>
						</div>
					</div>
				</div>
			</PopupContainer>
		</MainPopup>
	);
}

export default LoginPopup;
