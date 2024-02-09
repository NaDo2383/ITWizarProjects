import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useMyPageTranslation from "locale/useMypageTranslation";
import React from "react";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import useFAQpageTranslation from "locale/useFAQpageTranslation";

function Deaduser() {
	const { hideAllModals } = usePopup();
	const { confirmI18 } = useFAQpageTranslation();
	const { deleteCompleteI18 } = useMyPageTranslation();

	return (
		<MainPopup width={580}>
			<PopupContainer>
				<PopupHeader text={deleteCompleteI18} />
			</PopupContainer>
			<div className="flex justify-end pb-4 pr-4 gap-2 text-white">
				<button
					onClick={() => hideAllModals()}
					className="px-5 py-[6px] bg-[#FB3873] rounded-[5px]">
					{confirmI18}
				</button>
			</div>
		</MainPopup>
	);
}

export default Deaduser;
