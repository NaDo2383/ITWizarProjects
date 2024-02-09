import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import React from "react";

const ErrorModal = () => {
	const { hideAllModals, handleShowModal, MODAL_TYPES } = usePopup();
	const { loginErrorI18, gotoLoginScreenI18 } = useFAQpageTranslation(false);

	return (
		<MainPopup width={568}>
			<div className="tracking-tighter w-full relative">
				<div
					onClick={() => hideAllModals()}
					className="w-7 cursor-pointer h-7 absolute right-3 top-6">
					<div className="relative h-px w-full bg-black transform rotate-45 before:absolute before:transform before:w-full before:h-full before:bg-black before:rotate-90 before:left-0"></div>
				</div>
				<div className="full py-12 flex justify-center items-center">
					<h3 className=" text-3xl text-[#333] font-[500]">
						{loginErrorI18}
					</h3>
				</div>
			</div>
			<div className="w-full flex items-center justify-end">
				<button
					onClick={() => handleShowModal(MODAL_TYPES.LOGIN_POPUP)}
					className="w-full bg-[#333] text-white cursor-pointer text-center">
					<h3 className="font-[300] text-white  tracking-[-1px] leading-[57px]">
						{gotoLoginScreenI18}
					</h3>
				</button>
			</div>
		</MainPopup>
	);
};

export default ErrorModal;
