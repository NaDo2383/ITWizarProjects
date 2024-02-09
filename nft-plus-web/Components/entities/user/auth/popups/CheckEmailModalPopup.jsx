/**
 * @createdBy duka 2023/5/22
 */
import React, { useEffect, useState } from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import useMyPageTranslation from "locale/useMypageTranslation";
import Image from "next/image";
import { useGlobalContext } from "common/global/useGlobalContext";
import close from "public/close.svg";
import { useRouter } from "next/router";
import { getLocal } from "utils/storage";
import Checkbox from "Components/ui/checkbox/Checkbox";
import useCommonTranslation from "locale/useCommonTranslation";

function CheckEmailModalPopup() {
	const router = useRouter();
	const { hideAllModals, handleShowModal, MODAL_TYPES } = usePopup();
	const {
		emailTitle1I18,
		emailTitle2I18,
		emailNotAuthenticationI18,
		limitedFunctionI18,
		emailSpan1I18,
		emailSpan2I18,
		emailSpan3I18,
		emailCheckI18,
		emailVerBtnI18
	} = useMyPageTranslation();
	const { closeI18 } = useCommonTranslation()
	const { authUser } = useGlobalContext();
	const [check, setCheck] = useState(false);

	useEffect(() => {
		if (localStorage !== undefined && getLocal("user")?.result && authUser) {
			if (
				localStorage.getItem(`verifiTime${getLocal("user")?.result?.id}`) &&
				JSON.parse(
					localStorage.getItem(`verifiTime${getLocal("user")?.result?.id}`)
				) < Date.now()
			) {
				localStorage.removeItem(`verifiTime${getLocal("user")?.result?.id}`);
			}
		}
	}, [authUser, router]);

	return (
		<MainPopup width={580}>
			<PopupContainer>
				<div className="w-full relative flex items-center justify-between">
					<h2 className="font-medium lg:text-[22px] sm:text-[22px] text-[18px] text-white">
						{emailTitle1I18}
						<br />
						{emailTitle2I18}
					</h2>
					<div
						onClick={() => hideAllModals()}
						className="hidden sm:flex sm:flex-col overflow-hidden z-10 absolute right-2 top-4 cursor-pointer w-[15px] h-[15px] items-center">
						<Image src={close} alt="close" />
					</div>
				</div>
				<PopupContent>
					<div className="rounded-xl overflow-hidden">
						<div className="w-full pb-4 flex flex-col relative lg:text-[18px] sm:text-[18px] text-[14px] font-[400] text-[#DDD]">
							<p className="py-[30px] sm:text-[18px] text-[14px]">{emailNotAuthenticationI18}</p>
							<p className="underline pb-[10px]">{limitedFunctionI18}</p>
							<div className="flex justify-start px-1">
								<ul className="text-left">
									<li className="text">
										<span className="mr-4">1.</span>
										<span>{emailSpan1I18}</span>
									</li>
									<li className="text">
										<span className="mr-4">2.</span>
										<span>{emailSpan2I18}</span>
									</li>
									<li className="text">
										<span className="mr-4">3.</span>
										<span>{emailSpan3I18}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</PopupContent>
				<div className="flex sm:flex-row flex-col sm:mt-[32px]">
					<div className="items-center flex justify-between sm:mb-0 mb-[15px]">
						<div className="text-left flex items-center gap-1">
							<Checkbox
								type="checkbox"
								name=" 24 hours"
								id=" 24 hours"
								className=""
								value={check}
								checked={check}
								onChange={(e) => {
									if (e.target.checked) {
										var currentDate = new Date();
										currentDate.setDate(currentDate.getDate() + 1);
										localStorage.setItem(
											`verifiTime${authUser?.id}`,
											JSON.stringify(currentDate.getTime())
										);
									} else {
										localStorage.removeItem(`verifiTime${authUser?.id}`);
									}
									setCheck(e.target.checked);
								}}
							/>
							<span className="ml-1 min-w-[128px] sm:text-[16px] text-[12px] text-[#DDD] font-[400]">{emailCheckI18}</span>
						</div>

					</div>
					<div className="w-full flex flex-row sm:justify-end justify-center font-[300] gap-[10px] right-[30px]">
						<button
							className="min-w-[74px] bg-[#333] text-white py-[8px] text-center rounded-[5px] cursor-pointer"
							onClick={() => hideAllModals()}
						>
							<h2 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{closeI18}</h2>
						</button>
						<button
							className={`min-w-[74px] bg-[#FB3873]  text-white py-[8px] focus:outline-none text-center rounded-[5px]`}
							onClick={() => {
								handleShowModal(MODAL_TYPES.EDIT_EMAIL);
							}}
							type='submit'
						>
							<h2 className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] font-[500] sm:px-[20px] px-[10px]">{emailVerBtnI18}</h2>
						</button>
					</div>
				</div>
			</PopupContainer>
		</MainPopup>
	);
}

export default CheckEmailModalPopup;
