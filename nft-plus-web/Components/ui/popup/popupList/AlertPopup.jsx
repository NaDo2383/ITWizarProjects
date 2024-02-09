import React, { useEffect } from "react";
import MainPopup from "../MainPopup";
import usePopup from "../usePopup";
import useArtworkTranslation from "locale/useArtworkTranslation";
import PopupContainer from "../popupMaterials/PopupContainer";

function AlertPopup() {
	const { hideModal, popupProps, getCurrentModalprops } = usePopup();
	const { close } = useArtworkTranslation();

	useEffect(() => {
		getCurrentModalprops();
	}, []);

	return (
		<MainPopup width={popupProps?.width}>
			<PopupContainer>
				<div className="relative flex flex-col text-center bg-[#181A1A] w-full tracking-tighter max-w-[320px] rounded-lg overflow-hidden sm:text-[18px] text-[16px]">
					<p className="text-[#DDDDDD] my-[30px] sm:text-[18px] text-[16px]">{popupProps?.message}</p>
					<div className="flex w-full sm:justify-end justify-center">
						<button
							className="whitespace-nowrap w-[107px] rounded-[5px] bg-[#FB3873] text-white  py-[6px] cursor-pointer text-center"
							onClick={() => hideModal()}
						>
							{close}
						</button>
					</div>
				</div>
			</PopupContainer>
		</MainPopup>
	);
}

export default AlertPopup;
