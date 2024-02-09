/**
 * @createdBy duka 2023/5/18
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useMyPageTranslation from "locale/useMypageTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import axios from "axios";
import { getToken } from "utils/storage";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import CloseBtn from "Components/ui/button/CloseBtn";

function EmailVerificationPopup() {
	const {
		hideModal,
		popupProps,
		getCurrentModalprops,
		hideAllModals
	} = usePopup();
	const {
		emailAuthenticationI18,
		emailErrorI18,
		emailDescI18,
		emailBtnI18,
		emailValI18
	} = useMyPageTranslation();
	const { locale } = useRouter();
	const { setGlobalLoading } = useGlobalContext();
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const token = getToken();

	const validateEmail = (email) => {
		return email.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};

	const emailHandler = () => {
		let arrErr = [];
		setErrors([]);
		if (validateEmail(email)) {
			setGlobalLoading(true);
			const result = axios
				.post(
					process.env.url + "/email-verify",
					{
						email: email,
						lang: locale
					},
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				)
				.then((result) => {
					if (result.data.message === "success") {
						// setAuthEmail(email);
						// setResendToken(result.data?.resendToken);
						// setSendEmail(true);
						// setVerifiEmail(false);
						hideAllModals();
					}
				})
				.catch((err) => {
					if (err.response.data?.message === "email.exist")
						alert(" email already exists");
				})
				.finally(() => {
					setGlobalLoading(false);
				});
		} else {
			alert("invalid email");
		}
	};

	useEffect(() => {
		getCurrentModalprops();
	}, [popupProps]);

	return (
		<MainPopup>
			<PopupContainer>
				<div className="flex flex-col text-[14px] relative  bg-[#181A1A]">
					<div className="flex w-full justify-between select-none">
						<h3 className="font-medium mb-[30px] lg:text-[22px] sm:text-[22px] text-[18px] text-white">
							{emailAuthenticationI18}
						</h3>
						<CloseBtn onClick={() => hideModal()}  />
					</div>
					<div className="w-full">
						<div className="flex flex-row sm:gap-[15px] gap-[5px] w-full">
							<input
								onChange={(e) => setEmail(e.target.value)}
								className="sm:min-w-[357px] min-w-[175px] py-[5px] overflow-x-auto rounded-[5px] px-[9px] bg-[#0F1111] placeholder-[#A0A0A0] lg:text-[18px] sm:text-[18px] text-[12px] font-[400]"
								placeholder={emailValI18}
							/>
							<button
								onClick={emailHandler}
								className="lg:text-[18px] sm:text-[18px] text-[12px] sm:py-[6.5px] text-white text-center block font-[500] sm:min-w-[148px] min-w-[75px] rounded-[5px] bg-[#FB3873] leading-normal">
								{emailBtnI18}
							</button>
						</div>
						<div className="text-left">
							{errors.includes("email") && (
								<span className="text-[#FB3873]">{emailErrorI18}</span>
							)}
						</div>
						<p className="pt-[10px] text-[#9887FF] sm:text-[14px] text-[12px] font-[400] max-w-[380px]">
							{emailDescI18}
						</p>
					</div>
				</div>
			</PopupContainer>
		</MainPopup>
	);
}

export default EmailVerificationPopup;
