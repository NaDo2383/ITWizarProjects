import useArtworkTranslation from "locale/useArtworkTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import React from "react";
import MainPopup from "../MainPopup";
import usePopup from "../usePopup";
import PopupHeader from "../popupMaterials/PopupHeader";

function ClipBoardPopup() {
	const { workLinkCopiedI18, clipCopyI18 } = useArtworkTranslation();
	const { confirmI18 } = useMyPageTranslation();
	const { hideModal } = usePopup();

	return (
		<MainPopup width={530}>
			<div className="p-[30px]">
				<PopupHeader text={clipCopyI18} />
				<div className="relative flex flex-col bg-[#181A1A] text-white w-full tracking-tighter rounded-[10px]">
					<div className="w-full mb-[10px]">
						<h5 className=" tracking-[-1px] sm:text-[18px] text-[14px] text-start mx-[50x] mt-[30px] mb-[15px]">
							{workLinkCopiedI18}
						</h5>
					</div>
					<div className="w-full flex justify-end">
						<button
							onClick={hideModal}
							className="l bg-[#FB3873] py-[6px] cursor-pointer text-center px-5 rounded-[5px] sm:text-[18px] text-[15px]">
							{confirmI18}
						</button>
					</div>
				</div>
			</div>
		</MainPopup>
	);
}

export default ClipBoardPopup;
