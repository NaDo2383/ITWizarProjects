import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useMyPageTranslation from "locale/useMypageTranslation";
import React from "react";
import useResignMembership from "./useResignMembership";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useAuthUser from "Components/entities/user/auth/useAuthUser";

function DeactivatePopup() {
	const { hideModal, handleShowModal, MODAL_TYPES } = usePopup();
	const { cancel } = useArtworkTranslation();
	const { deactivateUser } = useResignMembership();
	const { logOut } = useAuthUser();
	const {
		wantQuitI18,
		deleteInfo1yI18,
		toBeDeleteI18,
		deleteInfo2yI18,
		deleteInfo21yI18,
		deleteyesI18,
	} = useMyPageTranslation();

	function handleClose() {
		hideModal();
	}

	function handleDelete() {
		deactivateUser().then((res) => {
			logOut();
			handleShowModal(MODAL_TYPES.KILL_USER);
		});
	}

	return (
		<MainPopup width={580}>
			<PopupContainer>
				<PopupHeader text={wantQuitI18} />
				<PopupContent>
					<div className="mt-6 mb-3  text-[16px] font-normal  ">
						{deleteInfo1yI18}
					</div>
					<div className="flex flex-col md:flex-row gap-2 items-start text-[#8E8E8E] text-[15px]">
						<div>
							<span className="px-5 whitespace-nowrap py-[2px] bg-[#404040] rounded-[20px]">
								{toBeDeleteI18}
							</span>
						</div>
						<div className="flex-col hidden sm:flex sm:flex-col overflow-hidden">
							<div>{deleteInfo2yI18}</div>
							<div>{deleteInfo21yI18}</div>
						</div>
						<div className="flex-col flex sm:hidden">
							<div>{deleteInfo2yI18}{deleteInfo21yI18}</div>
						</div>
					</div>
				</PopupContent>
			</PopupContainer>
			<div className="flex justify-end pb-4 pr-4 gap-2 text-white">
				<button
					onClick={() => handleDelete()}
					className="px-5 py-[6px] bg-[#404040] rounded-[5px]">
					{deleteyesI18}
				</button>
				<button
					onClick={() => handleClose()}
					className="px-5 py-[6px] bg-[#FB3873] rounded-[5px]">
					{cancel}
				</button>
			</div>
		</MainPopup>
	);
}

export default DeactivatePopup;
