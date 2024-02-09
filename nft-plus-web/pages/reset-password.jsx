import { useState, useEffect } from "react";
import Image from "next/image";
import Label from "Components/ui/label/Label";
import Title from "Components/ui/typography/Title";
import Input from "Components/ui/input/Input";
import Layer from "Components/ui/layer/Layer";
import MobileNav from "Components/layouts/mobileMenu/MobileMenu";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import warning from "public/icone.svg";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useCommonTranslation from "locale/useCommonTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import usePopup from "Components/ui/popup/usePopup";

export default function ResetPassword() {
	const [loading, setLoading] = useState(false);
	const [reset, setReset] = useState(true);
	const [resetError, setResetError] = useState(false);
	const [resetSuccess, setResetSuccess] = useState(false);
	const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredPasswordRepeat, setEnteredPasswordRepeat] = useState("");
	const [wrongPassword, setWrongPassword] = useState(false);
	const [wrongPasswordRepeat, setWrongPasswordRepeat] = useState(false);
	const [error, setError] = useState(false);
	const { handleShowModal, MODAL_TYPES } = usePopup();
	const [errorMessage, setErrorMessage] = useState(null);
	const [openNav, setOpenNav] = useState(false);
	const router = useRouter();
	const { token } = router.query;
	const { authUser } = useAuthUser();

	const {
		loginI18,
		resendEmailI18,
		passwordChangeErrorI18,
		plsLoginI18,
		passwordChangeSuccessfullyI18,
		changePasswordI18,
		confirmNewPasswordI18,
		newPasswordI18,
		forgotPasswordI18,
		regDescI18,
		thisLinkOutDateI18,
		inValidTokenI18,
		inValidPasswordI18,
		passwordNotMatchI18
	} = useCommonTranslation();
	const { close: closeI18 } = useArtworkTranslation();
	const resetHandler = async () => {
		if (
			/(?=.*[~!@#$%^*\.])(?=.*[0-9])(?=.*[a-z])(?=.{8,})/.test(enteredPassword)
		) {
			if (enteredPassword !== enteredPasswordRepeat) {
				setErrorMessage(passwordNotMatchI18);
				setError(true);
				setWrongPasswordRepeat(true);
			} else {
				try {
					setLoading(true);
					const { data } = await axios.post(
						`${process.env.url}/reset_password`,
						{
							token: token,
							password: enteredPassword,
							passwordRepeat: enteredPasswordRepeat
						}
					);
					if (data) {
						setLoading(false);
						setResetSuccess(true);
					}
				} catch (err) {
					if (err) {
						setError(false);
						setResetError(true);
						setReset(false);
						setLoading(false);
						if (err.response.status === 400) {
							setErrorMessage(inValidPasswordI18);
						} else if (err.response.status === 404) {
							setErrorMessage(inValidTokenI18);
						} else if (err.response.status === 405) {
							setErrorMessage(thisLinkOutDateI18);
						} else {
							setErrorMessage(err.message);
						}
						clearForm();
					}
				}
			}
		} else {
			setWrongPassword(true);
			setErrorMessage(<p>{regDescI18}</p>);
			setError(true);
		}
	};

	useEffect(() => {
		if (authUser) {
			Router.push("/mypage");
		}
	}, [authUser]);

	function clearForm() {
		setEnteredPassword("");
		setEnteredPasswordRepeat("");
	}

	return (
		<div className="w-full h-screen tracking-tight overflow-auto flex flex-col justify-between bg-white">
			{reset && !resetSuccess && (
				<div className="flex-1 w-full flex items-center py-10 justify-center">
					<div
						style={{ transition: ".3s ease" }}
						className="min-w-[320px] sm:min-w-[375px] md:min-w-[411px] transition duration-300  flex flex-col items-center">
						<Title title={forgotPasswordI18} />
						<Label label={newPasswordI18} htmlFor="password" />
						<Input
							autocomplete="off"
							type="password"
							className={wrongPassword ? "border-red-400" : ""}
							value={enteredPassword}
							onChange={(e) => setEnteredPassword(e.target.value)}
							id="password"
							isReg={true}
							placeholder=""
						/>
						<Label label={confirmNewPasswordI18} htmlFor="passwordRepeat" />
						<Input
							autocomplete="off"
							type="password"
							className={wrongPasswordRepeat ? "border-red-400" : ""}
							value={enteredPasswordRepeat}
							onChange={(e) => setEnteredPasswordRepeat(e.target.value)}
							id="passwordRepeat"
							isReg={true}
							placeholder=""
						/>
						<button
							onClick={resetHandler}
							disabled={loading ? true : false}
							className={`w-full mt-6 px-4 py-4 rounded-md bg-[#333] text-white border border-black ${
								loading && "cursor-wait"
							}`}>
							{changePasswordI18}
						</button>
					</div>
				</div>
			)}
			{reset && resetSuccess && (
				<div className="flex-1 w-full flex items-center py-10 justify-center">
					<div
						style={{ transition: ".3s ease" }}
						className="min-w-[320px] sm:min-w-[375px] md:min-w-[411px] transition duration-300  flex flex-col items-center">
						<Title title="" />
						<div className="flex flex-col md:w-[750px] px-8 py-12 rounded-md items-center bg-[#f8f8f8]">
							<div className="my-8 text-center sm:text-left">
								<h2 className="font-[600] text-[32px] text-[#333] text-center tracking-[-2px] mb-5">
									{passwordChangeSuccessfullyI18}
								</h2>
								<p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
									{plsLoginI18}
								</p>
								<br />
								<div>
									<button
										onClick={() => handleShowModal(MODAL_TYPES.LOGIN_POPUP)}
										className="w-full p-4 border border-black rounded-md">
										{loginI18}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{resetError && (
				<div className="flex-1 w-full flex items-center flex-col py-10 justify-center ">
					<Title title={forgotPasswordI18} />
					<div className="flex flex-col md:w-[750px] px-8 py-12 rounded-md items-center bg-[#f8f8f8]">
						<div className="relative flex justify-center items-center">
							<Image src={warning} alt="warning" />
						</div>
						<div className="my-8 text-center sm:text-left">
							<h2 className="font-[600] text-[32px] text-[#333] text-center tracking-[-2px] mb-5">
								{passwordChangeErrorI18}
							</h2>
							<p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
								{errorMessage}
							</p>
							<br />
							<Link href="/find-login" passHref>
								<button className="w-full p-4 border border-black rounded-md">
									{resendEmailI18}
								</button>
							</Link>
							<br />
						</div>
					</div>
				</div>
			)}
			<Layer errorLay={true} layer={error} closeLay={() => setError(false)}>
				<div className="relative">
					<Image src={warning} alt="warning" />
				</div>
				<h5
					className={
						"  tracking-[-1px] text-[16px] text-center mx-[50x] mt-[30px] px-[20px]"
					}>
					{errorMessage}
				</h5>
				<button
					onClick={() => setError(false)}
					className="w-1/2 bg-[#333] rounded-md text-white py-4 cursor-pointer text-center">
					{closeI18}
				</button>
			</Layer>
			<MobileNav opened={openNav} />
		</div>
	);
}
