import React, { useEffect, useState } from "react";
import useCrud from "common/axios/crud";
import { useRouter } from "next/router";
import Image from "next/image";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import { apis } from "utils/libs";
import useCommonTranslation from "locale/useCommonTranslation";
import useAlertTranslation from "locale/useAlertTranslation";
import useAuthMetamask from "common/metamask/useAuthMetamask";
import Checkbox from "Components/ui/checkbox/Checkbox";
import usePopup from "Components/ui/popup/usePopup";
import { useGlobalContext } from "common/global/useGlobalContext";
import headIco from "public/headIcon.svg";
import useArtworkTranslation from "locale/useArtworkTranslation";
import IFrame from "Components/ui/Iframe";

function ServiceConditionPopup() {
	const { locale } = useRouter();
	const {cancel} = useArtworkTranslation()
	const { setGlobalLoading } = useGlobalContext();
	const queryLang = locale === "en" ? `?lang=${locale}` : `?lang=kr`;
	const { getModel } = useCrud();
	const { hideModal, handleShowModal, MODAL_TYPES } = usePopup();
	const [privacyPolicy, setPrivacyPolicy] = useState(null);
	const [terms, setTermsOfUse] = useState(null);
	const { onSignatureRequest } = useAuthMetamask();
	const [termAccepted, setTermAccepted] = useState(false);
	const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
	const [popup, setPopup] = useState(null);

	const checkTerms = () => {
		if (!termAccepted || !privacyPolicyAccepted) {
			alert(agreeTermsPersonalInfoI18);
		} else {
			setGlobalLoading(true);
			onSignatureRequest()
				.then((data) => {
					hideModal();
					if(data){
						handleShowModal(MODAL_TYPES.CHECK_EMAIL_MODAL);
					} else {
						handleShowModal(MODAL_TYPES.LOGIN_POPUP);
					}
				})
				.finally(() => {
					setGlobalLoading(false);
				});
		}
	};

	useEffect(() => {
		getModel(apis.serviceInfo + "/privacypolicy" + queryLang).then((res) =>
			setPrivacyPolicy(res)
		);
		getModel(apis.terms + queryLang).then((res) => setTermsOfUse(res));
	}, []);
	
	useEffect(() => {
		if (popup?.closed && popup) {
			setPopup(null);
			if (localStorage.dupinfo) {
				changeId();
			}
		}
	}, [popup?.closed, popup]);

	const {
		agreeTitleI18,
		termsOfUseI18,
		agreeTermsI18,
		privacyPolicyI18,
		iAgreeTextI18,
		signupI18
	} = useCommonTranslation();
	const { agreeTermsI18: agreeTermsPersonalInfoI18 } = useAlertTranslation();

	return (
		<MainPopup width={530}>
			<PopupContainer>
				<PopupHeader text={agreeTitleI18} />
				<PopupContent>
					<div className="w-full mt-[32px] mb-[40px] h-full">
						<div className="w-full">
							<div className="flex flex-row gap-1 items-center">
								<div className="h-[18px]">
								<Image src={headIco} height={18} width={5} alt="headIco" />
								</div>
								<h4 className="font-[400] text-[18px] text-white">{termsOfUseI18}</h4>
							</div>
							<div className="serviceConditionPopup w-full h-[136px] overflow-y-scroll overflow-x-hidden scroll--narrow bg-[#2F3132] px-[20px] pt-[15px] pb-[25px] mt-[8px] mb-[18px] text-[14px] text-[#DDD] font-[400]">
								{privacyPolicy ? (
									<IFrame src={ terms?.content}/>
								) : (
									// <Loading />
									<>Loading...</>
								)}
							</div>
							<div className="w-full mt-2 flex items-center justify-end gap-1">
								<Checkbox
									checked={termAccepted}
									onChange={(e) => setTermAccepted(e.target.checked)}
									id="term"
									sx={{
										color: "white"
									}}
								/>
								<label htmlFor="term" className="text-[#DDD] text-[16px] font-[400]">
									{agreeTermsI18}
								</label>
							</div>
						</div>
						<div className="w-full mt-[45px]">
							<div className="flex flex-row gap-1 items-center">
								<div className="h-[18px]">
								<Image src={headIco} height={18} width={5} alt="headIco" />
								</div>
								<h4 className="font-[400] text-[18px] text-white">{privacyPolicyI18}</h4>
							</div>
							<div className="serviceConditionPopup w-full overflow-auto scroll--narrow h-[136px] bg-[#2F3132] px-[20px] pt-[15px] pb-[25px] mt-[8px] mb-[18px] text-[14px] text-[#DDD] font-[400]">
								{terms ? (
									<IFrame src={
											 privacyPolicy?.content
										}
									/>
								) : (
									// <Loading />
									<>Loading...</>
								)}
							</div>
							<div className="w-full mt-2 flex items-center justify-end gap-1">
								<Checkbox
									checked={privacyPolicyAccepted}
									onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
									id="privacy"
									sx={{
										color: "white"
									}}
								/>
								<label htmlFor="privacy" className="text-[#DDD] text-[16px] font-[400]">
									{iAgreeTextI18}
								</label>
							</div>
						</div>
					</div>
				</PopupContent>
				<PopupActionButtons
					yes={() => checkTerms()}
					no={() => hideModal()}
					btnTexts={{ yes: signupI18, no: cancel }}
				/>
			</PopupContainer>
		</MainPopup>
	);
}

export default ServiceConditionPopup;
