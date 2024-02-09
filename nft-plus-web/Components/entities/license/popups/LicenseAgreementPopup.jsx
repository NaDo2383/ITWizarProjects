/**
 * @createdBy duka 
 */
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import React from "react";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import { PopContainer } from "Components/ui/popup/popupUi";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import { useGlobalContext } from "common/global/useGlobalContext";
import ListImgWithInfo from "./licensePopupUi/LicenseImgWithInfo"
import LicenseRightButtons from "./licensePopupUi/LicenseRightButtons";
import { ColorfullBtn } from "Components/ui/button/colorfullBtn";
import CloseBtn from "Components/ui/button/CloseBtn";
import useMyPageTranslation from "locale/useMypageTranslation";
import P from 'Components/ui/typography/P';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import LicenseBigTitle from "./licensePopupUi/LicenseBigTitle";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import { LicenseFirstCol } from "./licensePopupUi/LicenseCol";

function LicenseAgreementPopup() {
	const { confirmI18 } = useFAQpageTranslation();
	const {
		confirmLicenseI18,
		contractRightI18
	} = useMyPageTranslation()
	const { authUser } = useGlobalContext()
	const {
		hideAllModals,
		globalModalState
	} = usePopup();
	const pendingLicense = globalModalState?.license
	const chosenRights = globalModalState?.license?.rights

	return (
		<MainPopup width={530}>
			<PopContainer>
				<div className="justify-between hidden sm:flex sm:flex-row overflow-hidden">
					<PopupHeader text={`🎉${confirmLicenseI18}`} />
					<CloseBtn onClick={() => hideAllModals()} />
				</div>
				<div className="sm:hidden mt-[40px]">
					<div className="flex flex-col justify-center items-center">
						<span className="text-[20px]">🎉</span>
						<h3 className="text-center text-[20px] text-[#E0E6E8]">{confirmLicenseI18}</h3>
					</div>
				</div>
				<PopupContent>
					<div className="sm:pt-[41px] pt-[20px]">
						<div className="hidden sm:flex sm:flex-row overflow-hidden mb-[15px]">
							<ListImgWithInfo
								img={globalModalState?.license?.artwork2xThumbnail}
								artworkName={globalModalState?.license?.artworkName}
								humanName={authUser?.nickName}
								artwork={globalModalState?.license}
							/>
						</div>
						<div className="sm:hidden bg-[#141313] rounded-[10px] p-[15px] gap-[10px] mb-[10px]">
							<LicenseFirstCol>
								<ArtworkFileViewer artwork={pendingLicense} square />
								<div className='flex flex-col text-center justify-center mb-[5px] '>
									<P>{pendingLicense?.artworkName}</P>
									<p className='text-[#B0B0B0] text-[14px]'>
										{pendingLicense?.artworkOwnerFullname}
									</p>
								</div>
							</LicenseFirstCol>
						</div>
						<div className="mb-[25px]">
							<LicenseBigTitle text={contractRightI18} />
						</div>
						<LicenseRightButtons rights={chosenRights} />
						<div className="flex sm:justify-end justify-center sm:mt-[23px] sm:mb-0 mb-[15px] mt-[15px] sm:pt-[49px] pt-[60px] border-t border-[#4E4E4E]">
							<div className="sm:min-w-[107px] min-w-[72px]">
								<ColorfullBtn text={confirmI18} onClick={() => hideAllModals()} />
							</div>
						</div>
					</div>
				</PopupContent>
			</PopContainer>
		</MainPopup>
	)
}

export default LicenseAgreementPopup;