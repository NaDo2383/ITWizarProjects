import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import React from "react";
import useMypageTranslation from "locale/useMypageTranslation";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import { PopContainer } from "Components/ui/popup/popupUi";
import { ColorfullBtn } from "Components/ui/button/colorfullBtn";
import { useRouter } from "next/router";
import { LicenseFirstCol } from "./licensePopupUi/LicenseCol";
import ArtworkFileViewer from "Components/entities/artwork/ArtworkFileViewer";
import P from "Components/ui/typography/P";
import LicenseBigTitle from "./licensePopupUi/LicenseBigTitle";
import useArtworkTranslation from "locale/useArtworkTranslation";

function MobileLicenseRequestCompletedPopup() {
	const { push } = useRouter()
	const { hideAllModals, globalModalState } = usePopup();
	const chosenRights = globalModalState?.licenseRequestForm?.rights?.value
	const { authUser } = useAuthUser();
	const {
		licenseCompletedI18,
		licenseCompletedDescI18,
		contractRightI18,
		confirmI18
	} = useMypageTranslation();
	const { allRightsI18 } = useArtworkTranslation()

	function closeModal() {
		hideAllModals();
		push(`/mypage?subpage=licenseAgreement`);
	}

	return (
		<MainPopup width={360}>
			<PopContainer>
				<div className="flex justify-center items-center text-center px-8 whitespace-pre-wrap text-[20px] font-medium tracking-[-0.3px] text-[#e0e6eb]">
					<span className="w-[174px]">{licenseCompletedI18}	</span>
				</div>
				<p className="pt-[10px] pb-[20px] text-[12px] text-[#AEAEAE] leading-[157.3%] text-center whitespace-pre-wrap">
					{licenseCompletedDescI18}
				</p>
				<PopupContent>
					<LicenseFirstCol>
						<div className="bg-[#141313] rounded-[10px] p-[15px] mb-[10px] flex flex-col justify-center items-center">
						<div className="flex flex-col justify-center items-center">
							<ArtworkFileViewer
								artwork={globalModalState?.artDetail}
								square
								width={70}
								height={70}
							/>
							</div>
							<div className="flex flex-col justify-center items-center">
								<P>{globalModalState?.artDetail?.artworkName}</P>
								<p className="text-[14px] text-[#B0B0B0] font-[500]">{authUser?.nickName}</p>
							</div>
						</div>
					</LicenseFirstCol>
					<LicenseBigTitle text={contractRightI18} />
					{/* <LicenseRightButtons rights={chosenRights} /> */}
					<div className="mt-[5px]">
						{chosenRights && chosenRights?.map((right, index) => {
							return (
								<button key={"bhfdaj" + index} className='m-1 py-[2px] px-[19px] text-center rounded-[50px] bg-[#111] text-white border-[#C5C8D2] text-[13px] border-[0.5px] my-[18px]'>
									{allRightsI18[right.code]}
								</button>)
						})}
					</div>
					<div className="flex justify-center pt-[60px] border-t border-[#4E4E4E]">
						<div className="w-[107px]">
							<ColorfullBtn text={confirmI18} onClick={closeModal} />
						</div>
					</div>
				</PopupContent>
			</PopContainer>
		</MainPopup>
	);
}

export default MobileLicenseRequestCompletedPopup; 
