import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import React from "react";
import useMypageTranslation from "locale/useMypageTranslation";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import { PopContainer } from "Components/ui/popup/popupUi";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import ListImgWithInfo from "./licensePopupUi/LicenseImgWithInfo"
import LicenseRightButtons from "./licensePopupUi/LicenseRightButtons";
import { ColorfullBtn } from "Components/ui/button/colorfullBtn";
import CloseBtn from "Components/ui/button/CloseBtn";
import { useRouter } from "next/router";

function LicenseRequestCompletedPopup() {
	const { push } = useRouter()
	const { hideAllModals ,globalModalState } = usePopup();
	const chosenRights = globalModalState?.licenseRequestForm?.rights?.value
	const { authUser } = useAuthUser();
	const { 
		licenseCompletedI18,
		licenseCompletedDescI18,
		contractRightI18,
		confirmI18
	} = useMypageTranslation();
	
	function closeModal() {
		hideAllModals();
		push(`/mypage?subpage=licenseAgreement`);
	}
	
	return (
		<MainPopup >
			<PopContainer minWidth={360} maxWidth={530}>
				<div className="flex justify-between"> 
					<PopupHeader text={licenseCompletedI18} />	
					<CloseBtn onClick={ closeModal } />			
				</div>
				<p className="py-[30px] text-[18px] text-[#DDD]">	
					{licenseCompletedDescI18}
				</p>
				<PopupContent>
					<ListImgWithInfo 
						img={ globalModalState?.artDetail?.imageUrl } 
						artworkName={ globalModalState?.artDetail?.artworkName } 
						humanName = { authUser?.nickName }
						artwork={ globalModalState?.artDetail }
					/>
					<h2 className="py-[15px]">{contractRightI18}</h2>
					<LicenseRightButtons rights={chosenRights} />
					<div className="flex justify-end mt-[23px] pt-[49px] border-t border-[#4E4E4E]">
						<div className="w-[107px]">
							<ColorfullBtn text={confirmI18} onClick={closeModal} />
						</div>
					</div>
				</PopupContent>
			</PopContainer> 
		</MainPopup>
	);
}

export default LicenseRequestCompletedPopup;
