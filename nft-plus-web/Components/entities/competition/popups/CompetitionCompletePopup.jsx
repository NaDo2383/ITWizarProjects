import React from "react";
import MainPopup from "../../../ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import usePopup from "../../../ui/popup/usePopup";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { useRouter } from "next/router";

function CompetitionCompletePopup() {
	const { push } = useRouter();
	const { hideModal, hideAllModals } = usePopup();
	const { firstCompleteI18, sendI18, viewExibitsI18, checkStatusI18 } =
		useArtworkTranslation();

	function handleCheckMyRegistration() {
		push(`/mypage?subpage=registrationProgress`);
		hideAllModals();
	}

	return (
		<MainPopup width={580}>
			<PopupContainer>
				<div className="flex flex-row">
					<h3 className=" tracking-[-1px] text-white text-[22px] font-medium">
						🎉{firstCompleteI18}
					</h3>
				</div>
				<PopupContent>
					<div className="pt-[30px] pb-[50px]">
						<p className="text-[18px] text-[#DDD] font-[400px]">{sendI18} ​</p>
					</div>
				</PopupContent>
				<div className="flex flex-row items-center justify-end gap-2">
					<button
						className="bg-[#6319FF] text-white py-[8px] px-[20px] cursor-pointer text-center rounded-[5px]"
						onClick={handleCheckMyRegistration}>
						<h3 className="text-[18px] font-medium">{checkStatusI18}</h3>
					</button>
					<button
						className="bg-[#FB3873] text-white py-[8px] px-[20px] text-center rounded-[5px]"
						onClick={() => {
							push("/art/competitions")
							hideAllModals()
						}}>
						<h3 className="text-[18px] font-medium">{viewExibitsI18}</h3>
					</button>
				</div>
			</PopupContainer>
		</MainPopup>
	);
}

export default CompetitionCompletePopup;
