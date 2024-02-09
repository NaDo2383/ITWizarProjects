import useAuthUser from "Components/entities/user/auth/useAuthUser";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import { useEffect } from "react";
import useQnas from "./useQna";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";

function ConfirmQnaPopup() {
	const { createQna } = useQnas();
	const { hideAllModals, getCurrentModalprops, popupProps,hideModal, setGlobalModalState } = usePopup();
	const { authUser } = useAuthUser();
	const {
		categoryI18,
		confirmI18,
		disclosureI18,
		openI18,
		privateTextI18,
		titleI18,
		editI18,
		selectboxOp3,
		askQnaI18,
	} = useFAQpageTranslation();

	const handleSubmit = async () => {
		if (authUser?.id) {
			await createQna(popupProps);
			hideAllModals();
		}
	};

	useEffect(() => {
		getCurrentModalprops();
	}, []);

	const hide = () => {
		setGlobalModalState(prev => ({
			...prev,
			qnaPrevData: popupProps
		}))
		hideModal()
	}

	return (
		<MainPopup width={540}>
			<PopupContainer>
			<PopupHeader text={askQnaI18} />
					<PopupContent>
					<div className="mb-[50px]">
						<div className="w-full mt-[42px] py-[7px] flex gap-4 items-center justify-between">
						<h4 className="text-[#DDD] md:text-[16px] sm:text-[16px] text-[14px] font-[500] w-1/4">{disclosureI18}</h4>
						<div className="flex-1 items-center flex gap-2">
							<div className="w-2/5 flex">
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-1">
								{popupProps ? <p>{openI18}</p> : <p>{privateTextI18}</p>}
								</div>
							</div>
							</div>
						</div>
						</div>

						<div className="w-full border-t border-[#292929] flex gap-4  py-2 items-center justify-between">
						<h4 className="text-[#DDD] md:text-[16px] sm:text-[16px] text-[14px] font-[500] w-1/4">{categoryI18} </h4>
						<div className="flex-1 items-center flex gap-2">
							<div className="w-full max-w-[256px] flex">
							<p>{popupProps?.category}</p>
							</div>
						</div>
						</div>

						<div className="w-full border-t border-[#292929] flex gap-4  py-2 items-center justify-between">
						<h4 className="text-[#DDD] md:text-[16px] sm:text-[16px] text-[14px] font-[500] w-1/4">{titleI18}</h4>
						<div className="flex-1 items-center flex gap-2">
							<div className="flex-1">
							{popupProps?.title}
							</div>
						</div>
						</div>
						<div className="w-full border-t border-[#292929] gap-4 pt-[14px] items-center justify-between">
						<h4 className="text-[#DDD] md:text-[16px] sm:text-[16px] text-[14px] font-[500] w-1/4">{selectboxOp3}</h4>
						<textarea
							name="question"
							value={popupProps?.question}
							disabled
							className={
								"bg-[#0F1111] text-white w-full focus:outline-none focus:border-[#FB3873] border border-[#0F1111] placeholder:text-[#5A5A5A] p-[15px] placeholder:font-[400] rounded-lg h-full min-h-[200px]"
							}></textarea>
						</div>
					</div>
					</PopupContent>
					<PopupActionButtons yes={() =>handleSubmit() }  no={() => hide()} btnTexts={{ no: editI18, yes: confirmI18 }} />
			</PopupContainer>
			{/* <div className="w-[540px] h-[550px] rounded-xl overflow-hidden font-noto  flex flex-col">
				<div className="w-full py-4 px-5 flex flex-col justify-between flex-1">
					<div className="flex items-center justify-between pb-4 border-b-2 border-[#333]">
						<h4 className="font-[500]  text-[22px]">
							{contactUsI18}
						</h4>
						<button
							onClick={() => {
								hideAllModals();
							}}
							className="w-7 h-7">
							<div className="relative w-7 h-px bg-opacity-0 bg-black before:absolute before:w-full before:h-full before:bg-black before:left-0 before:transform before:rotate-45 after:absolute after:w-full after:h-full after:bg-black after:left-0 after:transform after:-rotate-45"></div>
						</button>
					</div>
					<div className="w-full border-t mt-6 py-2 flex gap-4 items-center justify-between">
						<h4 className=" font-[500] w-1/4">{disclosureI18} :</h4>
						<div className="flex-1 items-center flex gap-2">
							<div className="w-2/5 flex">
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-1">
										{popupProps ? <p>{openI18}</p> : <p>{privateTextI18}</p>}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full border-t flex gap-4  py-2 items-center justify-between">
						<h4 className=" font-[500] w-1/4">{categoryI18} :</h4>
						<div className="flex-1 items-center flex gap-2">
							<div className="w-2/5 flex">
								<p>{popupProps?.category}</p>
							</div>
						</div>
					</div>
					<div className="w-full border-t flex gap-4  py-2 items-center justify-between">
						<h4 className=" font-[500] w-1/4">{titleI18} :</h4>
						<div className="flex-1 items-center flex gap-2">
							<div className="flex-1">
								<p>{popupProps?.title}</p>
							</div>
						</div>
					</div>
					<div className="w-full border-t flex gap-4  py-2 items-center justify-between">
						<h4 className=" font-[500] w-1/4">{titleI18} :</h4>
						<div className="flex-1 items-center flex gap-2">
							<div className="flex-1">
								<p>{popupProps?.question}</p>
							</div>
						</div>
					</div>
					<div className="w-full border-t flex-1 flex gap-4 pt-2 pb-6 items-center justify-between"></div>
				</div>
				<div className="w-full flex font-[300] p-[30px]">
					<div
						onClick={() => {
							hideModal();
						}}
						className="w-1/2 bg-[#333] text-white py-4 cursor-pointer text-center">
						<h4>{editI18}</h4>
					</div>
					<div
						onClick={async () => handleSubmit()}
						type="submit"
						className={`${
							false ? "bg-opacity-60 cursor-wait" : "cursor-pointer"
						} w-1/2 bg-[#ff00e4] text-white py-4 text-center`}>
						<h4>{confirmI18}</h4>
					</div>
				</div>
			</div> */}
		</MainPopup>
	);
}

export default ConfirmQnaPopup;
