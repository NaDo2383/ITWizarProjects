import React from "react";
import usePopup from "Components/ui/popup/usePopup";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import MainPopup from "Components/ui/popup/MainPopup";

const GoToLogin = () => {
	const { hideModal, handleShowModal, MODAL_TYPES } = usePopup();
	const { loginErrorI18, gotoLoginScreenI18 } = useFAQpageTranslation();

	return (
		<MainPopup width={520}>
			<div className="flex flex-col max-w-[568px] min-w-[360px] relative overflow-hidden">
				<div className="tracking-tighter w-full relative ">
					<div
						onClick={() => hideModal()}
						className="sm:w-7 cursor-pointer sm:h-7 w-5 h-5 absolute right-3 top-6">
						<div className="relative h-px w-full bg-white transform rotate-45 before:absolute before:transform before:w-full before:h-full before:bg-white before:rotate-90 before:left-0"></div>
					</div>
					<div className="full py-12 flex justify-center items-center">
						<h6 className="tracking-[-1px] text-[16px] text-center mx-[50x] px-[20px]">
							{loginErrorI18}
						</h6>
					</div>
				</div>
				<div className="w-full flex items-center justify-end">
					<button
						onClick={() => {
							handleShowModal(MODAL_TYPES.LOGIN_POPUP);
						}}
						className="w-full bg-[#333] text-white py-4 cursor-pointer text-center">
						<h6 className="sm:text-[16px] text-[14px]">{gotoLoginScreenI18}</h6>
					</button>
				</div>
			</div>
		</MainPopup>
	);
};

export default GoToLogin;
