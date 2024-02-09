/**
 * @createdBy Narada0927 2022
 * @maintainedBy Phill Anderson 2023/4/13 redux - аас нь салгасан
 */
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Title from "Components/ui/typography/Title";
import Input from "Components/ui/input/Input";
import Checkbox from "Components/ui/checkbox/Checkbox";
import Label from "Components/ui/label/Label";
import Router from "next/router";
import axios from "axios";
import sha256 from "sha256";
import mail from "public/sobak.svg";
import maile from "public/maill.svg";
import moment from "moment";
import { MdOutlineWatchLater } from "react-icons/md";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import NiceId from "Components/entities/user/auth/auth-feature/sign_up/TermOfService";
import Tabs from "Components/entities/user/auth/auth-feature/sign_up/Tab";
import Loading from "Components/ui/loader";
import { useRouter } from "next/router";
import useCommonTranslation from "locale/useCommonTranslation";
import useMypageTranslation from "locale/useMypageTranslation";
import useAlertTranslation from "locale/useAlertTranslation";
import usePopup from "Components/ui/popup/usePopup";
import useServiceInfo from "Components/entities/serviceInfo/useServiceInfo";

export default function SignUp() {
	const route = useRouter();
	const { locale } = route;
	const { isExistIPin, signupState, authUser } = useAuthUser();
	const { getPrivacyPolicy, getTerms } = useServiceInfo();
	const [register, setRegister] = useState(true);
	const [recieveMarket, setReRecieveMarket] = useState(false);
	const [enteredId, setEnteredId] = useState("");
	const [enteredName, setEnteredName] = useState("");
	const [enteredNickname, setEnteredNickname] = useState("");
	const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [wrongNameNick, setWrongNameNick] = useState(false);
	const [wrongEmail, setWrongEmail] = useState(false);
	const [wrongPassword, setWrongPassword] = useState(false);
	const [wrongPasswordConfirm, setWrongPasswordConfirm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [verifiNameEmpty, setVerifiNameEmpty] = useState(null);
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [showResendButton, setShowResendButton] = useState(false);
	const [templateEmail, setTemplateEmail] = useState("");
	const [token, setToken] = useState(null);
	const [sending, verCode] = useState(false);
	const [tabNumber, setTabNumber] = useState(0);
	const [verifiedName, setVerifiedName] = useState("");

	const [goOn, setGoOn] = useState(true);
	const {
		signupI18,
		mailSentI18,
		mailSentDescI18,
		verificationWarningI18,
		valid24HoursI18,
		noSeeI18,
		checkValidityPeriodI18,
		mailResentAfterI18,
		resendVerificationI18,
		linkmailI18,
		regDescI18,
		errorMessage1I18,
		errorMessage2I18,
		errorMessage3I18
	} = useCommonTranslation();
	const {
		nameI18,
		emailVerificationTextI18,
		idI18,
		passwordI18,
		passwordVerificationTextI18,
		confirmPasswordI18,
		marketingOptI18
	} = useMypageTranslation();
	const { alreadyRegisteredI18 } = useAlertTranslation();
	const { handleShowModal, MODAL_TYPES } = usePopup();

	useEffect(() => {
		if (error) {
			handleShowModal(MODAL_TYPES.SIGNUP_ALERT, errorMessage);
		}
	}, [error]);

	const regHandler = async () => {
		const testPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (
			verifiedName.trim().length == "" ||
			enteredId.trim().length == "" ||
			enteredPassword.trim().length == "" ||
			enteredPasswordConfirm.trim().length == ""
		) {
			if (enteredId.trim().length == "") {
				setWrongEmail(true);
			} else {
				setWrongEmail(false);
			}
			if (verifiedName.trim().length == "") {
				setVerifiNameEmpty(true);
			} else {
				setVerifiNameEmpty(false);
			}

			if (!testPattern.test(enteredId.trim())) {
				setInvalidEmail(true);
			} else {
				setInvalidEmail(false);
			}

			if (enteredPassword.trim().length == "") {
				setWrongPassword(true);
			} else {
				setWrongPassword(false);
			}

			if (enteredPasswordConfirm.trim().length == "") {
				setWrongPasswordConfirm(true);
			} else {
				setWrongPasswordConfirm(false);
			}
		} else {
			setWrongEmail(false);
			setWrongNameNick(false);
			setWrongPassword(false);
			setWrongPasswordConfirm(false);
			if (!testPattern.test(enteredId.trim())) {
				setErrorMessage(<p>{errorMessage1I18}</p>);
				setError(true);
			} else if (
				/.{8,}/.test(enteredPassword) &&
				/[0-9]/.test(enteredPassword) &&
				/[a-z]/.test(enteredPassword) &&
				/[~!@#$%^*\.]/.test(enteredPassword)
			) {
				if (enteredPassword !== enteredPasswordConfirm) {
					setErrorMessage(<p>{errorMessage2I18}</p>);
					setError(true);
				} else {
					setLoading(true);
					const emdata = await axios
						.post(`${process.env.url}/check/emailExist/${enteredId}`)
						.then((res) => {
							if (res.data.message === "success") {
								const formData = {
									fullname: verifiedName,
									email: enteredId,
									password: enteredPassword,
									passwordConfirm: enteredPasswordConfirm,
									// mobile: mobileno,
									// ipinDi: dupId,
									lang: locale
								};
								try {
									const data = axios
										.post(`${process.env.url}/register`, formData)
										.then((response) => {
											if (
												response &&
												response.data?.email_status === "success.email.sent"
											) {
												setLoading(false);
												setRegister(false);
												setTemplateEmail(enteredId);
												setTimer(5 * 60 * 1000);
												setToken(data.resendToken);
												setTabNumber(2);
											}
											clearForm();
										});
								} catch (err) {
									setLoading(false);
									if (err) {
										setError(true);
										if (err.response.status === 400) {
											setErrorMessage(<p>{errorMessage3I18}</p>);
											setLoading(false);
										} else {
											setErrorMessage(err.message);
										}
									}
								}
							} else {
								alert(emailNotMatch);
								setLoading(false);
							}
						})
						.catch(() => setLoading(false))
						.finally(() => setLoading(false));
				}
			} else {
				setWrongPassword(true);
				setErrorMessage(<p>{regDescI18}</p>);
				setError(true);
			}
		}
	};

	const [timer, setTimer] = useState(5 * 60 * 1000);

	const resend = async () => {
		try {
			verCode(true);
			const { data } = await axios.get(
				`${process.env.url}/register_verification_resend?type=resend&token=${token}`
			);
			if (data) {
				setShowResendButton(false);
				setTimer(5 * 60 * 1000);
				verCode(false);
				alert("check your email...");
			}
		} catch (err) {
			if (err.response.status === 400) {
				alert("email is verified");
				verCode(false);
			} else {
				alert("something went wrong!");
				verCode(false);
			}
		}
	};
	function clearForm() {
		setEnteredName("");
		setEnteredNickname("");
		// setEnteredId("");
		setEnteredPassword("");
		setEnteredPasswordConfirm("");
	}

	useEffect(() => {
		const interval = setInterval(() => {
			// if(timer > 290000){
			if (timer > 0) {
				setTimer(moment(timer).subtract("1", "second"));
			} else {
				setShowResendButton(true);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [timer]);

	useEffect(() => {
		if (authUser?.id) {
			Router.push("/");
		}
	}, [authUser?.id]);

	useEffect(() => {
		getTerms();
		getPrivacyPolicy();
	}, [locale]);

	useEffect(() => {
		if (signupState?.error) {
			setGoOn(false);
			alert(alreadyRegisteredI18);
			handleShowModal(MODAL_TYPES.LOGIN_POPUP);
		}
	}, [signupState?.error]);

	return (
		<div className="w-full tracking-tight bg-white overflow-auto flex flex-col justify-between">
			<div className="flex-1 w-full flex items-center py-10 px-4 justify-center mt-[100px]">
				<div
					style={{ transition: ".3s ease" }}
					className="min-w-[300px] sm:min-w-[375px] md:min-w-[550px] transition duration-300  flex flex-col items-center">
					<Title title={signupI18} />
					<div className="w-max">
						<Tabs indx={tabNumber} />
					</div>
					{tabNumber === 0 && <NiceId setTabNumber={setTabNumber} />}

					{tabNumber === 1 && (
						<form
							onSubmit={() => {}}
							className="w-full  flex flex-col items-center relative">
							{signupState.ipinLoader && (
								<div className="w-full h-full absolute left-0 top-0">
									<Loading />
								</div>
							)}
							<Label
								label={
									<div className="flex items-center gap-4">
										<p className="truncate w-full">{nameI18}</p>
									</div>
								}
								htmlFor="name"
							/>
							<Input
								disabled
								className={verifiNameEmpty ? "border-red-400" : ""}
								value={verifiedName}
								onChange={(e) => setVerifiedName(e.target.value)}
								id="name"
								isReg={true}
								placeholder=""
							/>

							<Label
								label={
									<div className="flex items-center gap-4">
										<p className="truncate">{idI18}</p>
										<p className="text-red-400 text-[15px] flex-1">
											{emailVerificationTextI18}
										</p>
									</div>
								}
								htmlFor="email"
							/>
							<Input
								className={wrongEmail || invalidEmail ? "border-red-400" : ""}
								value={enteredId}
								onChange={(e) => setEnteredId(e.target.value)}
								id="email"
								isReg={true}
								placeholder=""
							/>
							<Label
								label={
									<div className="flex items-center gap-4">
										<p className="truncate">{passwordI18}</p>
										<p className="text-red-400 text-[15px] flex-1">
											{passwordVerificationTextI18}
										</p>
									</div>
								}
								htmlFor="password"
							/>

							<Input
								className={wrongPassword ? "border-red-400" : ""}
								value={enteredPassword}
								onChange={(e) => {
									setEnteredPassword(e.target.value);
								}}
								id="password"
								isReg={true}
								placeholder=""
								type="password"
								isPassword
							/>
							<Label label={confirmPasswordI18} htmlFor="passwordConfirm" />
							<Input
								className={wrongPasswordConfirm ? "border-red-400" : ""}
								value={enteredPasswordConfirm}
								onChange={(e) => setEnteredPasswordConfirm(e.target.value)}
								id="passwordConfirm"
								isReg={true}
								placeholder=""
								type="password"
								isPassword
							/>
							<div className="flex gap-2 px-1 w-full">
								<Checkbox
									checked={recieveMarket}
									onChange={(e) => setReRecieveMarket(e.target.checked)}
									id="remember3"
								/>
								<div className="flex items-center gap-2">
									<label
										htmlFor="remember3"
										className="font-[300] text-[#333] flex gap-2cursor-pointer">
										{marketingOptI18}
									</label>
								</div>
							</div>
							<button
								onClick={regHandler}
								disabled={loading ? true : false}
								className={`w-full mt-6 px-4 py-4 rounded-md bg-[#333] text-white ${
									loading && "cursor-wait"
								}`}>
								{signupI18}
							</button>
						</form>
					)}

					{tabNumber === 2 && (
						<div className="flex flex-col w-full px-8 py-12 rounded-md items-center bg-[#f8f8f8]">
							<div className="relative flex justify-center items-center">
								<Image src={maile} alt="maile" />
								<div className="absolute left-1/2 top-6 transform -translate-x-1/2">
									<div className="relative">
										<Image src={mail} alt="mail" />
									</div>
								</div>
							</div>
							<div className="my-8 text-center sm:text-left">
								<h2 className="font-[600] text-[32px] text-[#333] text-center tracking-[-2px] mb-5">
									{mailSentI18}
								</h2>
								<p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
									<span className="font-bold underline">{templateEmail}</span>{" "}
									{mailSentDescI18}
								</p>
								<p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
									{verificationWarningI18}
								</p>
								<br />
								<p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
									{linkmailI18}{" "}
									<span className="font-bold">{valid24HoursI18}</span>
									{locale !== "en" && noSeeI18} <br />
									{checkValidityPeriodI18}
								</p>
								<br />
								<p className="leading-snug text-center">
									<MdOutlineWatchLater className="inline-block text-[20px] align-text-bottom mr-1"></MdOutlineWatchLater>
									{moment(timer).format("mm분 : ss초")}
									<span className="pl-2 text-red-400">
										{mailResentAfterI18}
									</span>
								</p>
								{
									<button
										onClick={() => resend()}
										disabled={!showResendButton || sending}
										className={`w-full mt-6 px-4 py-4 rounded-md bg-[#333] ${
											sending && "cursor-wait bg-opacity-60"
										} text-white ${
											!showResendButton && "cursor-not-allowed bg-opacity-60"
										}`}>
										{resendVerificationI18}
									</button>
								}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
