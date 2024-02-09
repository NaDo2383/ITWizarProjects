import useAlertTranslation from "locale/useAlertTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import Image from "next/image";
import useMetamask from "common/metamask/useMetamask";
import MainPopup from "../MainPopup";
import PopupContainer from "../popupMaterials/PopupContainer";
import PopupContent from "../popupMaterials/PopupContent";
import PopupHeader from "../popupMaterials/PopupHeader";
import PopupActionButtons from "../popupMaterials/PopupActionButtons";
import usePopup from "../usePopup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuthUser from "Components/entities/user/auth/useAuthUser";

export default function MetamaskLoginPopup() {
	const {
		metamaskUnregisteredI18,
		metamaskDescriptionI18,
		registerMetamaskI18
	} = useAlertTranslation();
	const { cancel: cancelI18 } = useArtworkTranslation();
	const { push } = useRouter();
	const { authUser } = useAuthUser();
	const { connectMetamask } = useMetamask();
	const { hideModal, hideAllModals } = usePopup();

	function handleRegisterWalletBtn() {
		hideAllModals();
		push(`/mypage?subpage=registeredWallets`);
	}

	useEffect(() => {
		connectMetamask();
	}, []);

	return (
		<MainPopup>
			<PopupContainer>
				<PopupHeader text={metamaskUnregisteredI18} />
				<PopupContent>
					<div className="w-full flex flex-col px-5 pt-4 flex-1 overflow-y-scroll sm:overflow-y-auto mb-[30px]">
						<div className="mt-1 sm:mt-5 flex items-center justify-center relative mx-auto  overflow-hidden">
							<Image  src="/meta.svg" alt="meta" width={89} height={89} />
						</div>
						<h4 className=" text-[18px] text-center font-medium tracking-[-1px] mx-[50x]  px-6 pt-2 pb-6">
							{metamaskDescriptionI18}
						</h4>
					</div>
				</PopupContent>
				<PopupActionButtons
					yes={handleRegisterWalletBtn}
					no={hideModal}
					btnTexts={{ no: cancelI18, yes: registerMetamaskI18 }}
				/>
			</PopupContainer>
		</MainPopup>
	);
}
