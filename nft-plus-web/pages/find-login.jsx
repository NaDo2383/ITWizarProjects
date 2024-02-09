import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Title from "Components/ui/typography/Title";
import Input from "Components/ui/input/Input";
import Label from "Components/ui/label/Label";
import Router, { useRouter } from "next/router";
import axios from "axios";
import MobileNav from "Components/layouts/mobileMenu/MobileMenu";
import mail from "public/sobak.svg";
import maile from "public/maill.svg";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useAlertTranslation from "locale/useAlertTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import useMypageTranslation from "locale/useMypageTranslation";
import usePopup from "Components/ui/popup/usePopup";

export default function Forgot() {
	const [data, setData] = useState([]);
	const [forgotComplete, setForgotComplete] = useState(false);
	const { locale } = useRouter();
	const { MODAL_TYPES, handleShowModal } = usePopup();
	const { authUser } = useAuthUser();
	const [enteredEmail, setEnteredEmail] = useState("");
	const [wrongEmail, setWrongEmail] = useState(false);
	const [enteredFullname, setEnteredFullname] = useState("");
	const [wrongFullname, setWrongFullname] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openNav, setOpenNav] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [tab, setTab] = useState(0);
	const [verificationNumberDone, setVerificationNumberDone] = useState(false);
	const { noMatchingAccountI18 } = useAlertTranslation();
	const {
		emailI18,
		resetEmailMessageI18,
		mailSentI18,
		sentMailToI18,
		getMailInstructionsI18,
		plsEnterEmailI18,
		thankYoTamTamI18,
		plsCheckIdI18,
		idSearchCompleteI18,
		inputYournamePlsI18,
		loginNameI18,
		forgotPasswordI18,
		findIdI18,
		loginI18
	} = useCommonTranslation();
	const { confirmI18 } = useFAQpageTranslation();
	const { idI18 } = useMypageTranslation();

	const forgotHandler = async () => {
		if (
			enteredEmail.trim().length == "" ||
			enteredFullname.trim().length == ""
		) {
			if (enteredEmail.trim().length == "") {
				setWrongEmail(true);
			}
			if (enteredFullname.trim().length == "") {
				setWrongFullname(true);
			}
		} else {
			setWrongEmail(false);
			setWrongFullname(false);
			setLoading(true);
			const formData = {
				email: enteredEmail,
				fullname: enteredFullname,
				lang: locale
			};
			try {
				const { data } = await axios.post(
					`${process.env.url}/forgot_password`,
					formData
				);
				if (data) {
					setLoading(false);
					setForgotComplete(true);
				}
			} catch (err) {
				if (err) {
					setError(true);
					if (err.response.status === 400) {
						setErrorMessage("이메일 주소를 입력하세요.");
						setLoading(false);
					} else if (err.response.status === 404) {
						handleShowModal(MODAL_TYPES.FIND_LOGIN);
						setErrorMessage("등록된 이메일 주소가 없습니다");
						setLoading(false);
					} else {
						setErrorMessage(err.message);
						setLoading(false);
					}
					clearForm();
				}
			}
		}
	};

	function clearForm() {
		setEnteredEmail("");
		setEnteredFullname("");
	}

	useEffect(() => {
		if (authUser?.id) {
			Router.push("/mypage");
		}
	}, [authUser?.id]);

	const forgotEmail = async () => {
		if (enteredFullname.trim().length == "") {
			if (enteredFullname.trim().length == "") {
				setWrongFullname(true);
			}
		} else {
			setWrongFullname(false);
			setLoading(true);
			const formData = {
				fullname: enteredFullname
			};
			try {
				const { data } = await axios.post(
					`${process.env.url}/forget_id`,
					formData
				);
				if (data.result?.length > 0) {
					setLoading(false);
					setVerificationNumberDone(true);
					setData(data);
				} else {
					alert(noMatchingAccountI18);
					setErrorMessage(noMatchingAccountI18);
					setLoading(false);
				}
			} catch (err) {
				if (err) {
					setError(true);
					if (err.response.status === 404) {
						alert(noMatchingAccountI18);
						setErrorMessage(noMatchingAccountI18);
						setLoading(false);
					}
					clearForm();
				}
			}
		}
	};

	const emailTab = () => {
		setTab(0);
		setWrongFullname(false);
		setEnteredFullname("");
	};

	const idTab = () => {
		setTab(1);
		setWrongEmail(false);
		setWrongFullname(false);
		setEnteredEmail("");
		setEnteredFullname("");
	};

	return (
		<div className="w-full tracking-tight overflow-auto bg-white flex flex-col justify-between">
			<Head>
				<title>Find login | TAMTAM</title>
				<meta name="description" content="Find my login" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{verificationNumberDone || forgotComplete ? (
				<></>
			) : (
				<div className="flex mt-[40px] md:mt-2 items-end w-[325px] sm:w-[409px] justify-center gap-2 mx-auto pt-[70px] lg:pt-[130px] h-1/4">
					<div className="mt-[-.5rem] w-full flex text-[#666] items-center">
						<button
							onClick={emailTab}
							className={`py-4 ${
								tab === 0
									? "border-t-black bg-white text-[#333] border-b-white font-[500]"
									: "bg-[#f7f7f7]"
							} py-3 text-[18px] border w-1/2`}
							style={{ transition: ".3s ease" }}>
							{findIdI18}
						</button>
						<button
							onClick={idTab}
							className={`py-4 ${
								tab === 1
									? "border-t-black bg-white text-[#333] border-b-white font-[500]"
									: "bg-[#f7f7f7]"
							} py-3 text-[18px] border w-1/2`}
							style={{ transition: ".3s ease" }}>
							{forgotPasswordI18}
						</button>
					</div>
				</div>
			)}
			{tab === 0 && (
				<>
					{!verificationNumberDone ? (
						<div className="flex-1 w-full flex items-start py-10 justify-center">
							<div
								style={{ transition: ".3s ease" }}
								className="min-w-[320px] mt-4 sm:min-w-[375px] md:min-w-[411px] transition duration-300  flex flex-col items-center">
								<Label label={loginNameI18} htmlFor="fullname" />
								<Input
									className={wrongFullname ? "border-red-400" : ""}
									value={enteredFullname}
									onChange={(e) => setEnteredFullname(e.target.value)}
									id="fullname"
									isReg={true}
									placeholder={inputYournamePlsI18}
								/>
								<button
									onClick={forgotEmail}
									disabled={loading ? true : false}
									className={`w-full mt-6 px-4 py-4 rounded-md bg-[#333] text-white border border-black ${
										loading && "cursor-wait"
									}`}>
									{confirmI18}
								</button>
							</div>
						</div>
					) : (
						<div className="flex-1 w-full text-[#333] flex  flex-col text-center items-center pt-[80px] lg:pt-[130px] py-10 justify-center">
							<Title title={findIdI18} />
							<p>
								{idSearchCompleteI18} <br />
								{plsCheckIdI18}
							</p>
							<div className="overflow-auto max-h-[400px] ">
								{data.result?.map((e, i) => (
									<div
										key={i}
										className="mt-8 border  bg-gray-100 text-lg py-12 w-[320px] md:w-[400px] flex flex-col items-center justify-center">
										<p>
											{loginNameI18}:{" "}
											<span className="font-[500]">{e.fullname}</span>
										</p>

										<p>
											{idI18}: <span className="font-[500]">{e?.loginId}</span>
										</p>
									</div>
								))}
							</div>
							<h3 className="text-lg mt-6">{thankYoTamTamI18}</h3>
							<div className="flex items-end w-[320px] md:w-[400px] justify-center gap-2 mx-auto mt-6">
								<button
									className={`py-4 bg-white text-[#333] w-1/2 border border-[#333] font-[500] rounded-md`}>
									<div onClick={() => handleShowModal(MODAL_TYPES.LOGIN_POPUP)}>
										{loginI18}
									</div>
								</button>
								<button
									onClick={() => {
										setTab(1);
										setVerificationNumberDone(false);
									}}
									className={`py-4 bg-white text-[#333] w-1/2 border border-[#333] font-[500] rounded-md`}>
									{forgotPasswordI18}
								</button>
							</div>
						</div>
					)}
				</>
			)}
			{tab === 1 && (
				<>
					{!forgotComplete && (
						<div className="flex-1 w-full flex items-start py-10 justify-center">
							<div
								style={{ transition: ".3s ease" }}
								className="min-w-[320px] mt-4 sm:min-w-[375px] md:min-w-[411px] transition duration-300  flex flex-col items-center">
								{/* <Title title="비밀번호 찾기" /> */}
								<Label label={loginNameI18} htmlFor="fullname" />
								<Input
									className={wrongFullname ? "border-red-400" : ""}
									value={enteredFullname}
									onChange={(e) => setEnteredFullname(e.target.value)}
									id="fullname"
									isReg={true}
									placeholder={inputYournamePlsI18}
								/>
								<Label label={emailI18} htmlFor="email" />
								<Input
									className={wrongEmail ? "border-red-400" : ""}
									value={enteredEmail}
									onChange={(e) => setEnteredEmail(e.target.value)}
									id="email"
									isReg={true}
									placeholder={plsEnterEmailI18}
								/>

								<button
									onClick={forgotHandler}
									disabled={loading ? true : false}
									className={`w-full mt-6 px-4 py-4 rounded-md bg-[#333] text-white border border-black ${
										loading && "cursor-wait"
									}`}>
									{getMailInstructionsI18}
								</button>
							</div>
						</div>
					)}
					{forgotComplete && !verificationNumberDone && (
						<div className="flex-1 w-full flex items-center flex-col py-10 mt-16 justify-center ">
							<div className="flex flex-col md:w-[750px] px-8 py-12 rounded-md items-center bg-[#f8f8f8]">
								<div className="relative flex justify-center items-center">
									<Image src={maile} alt="maile" />
									<div className="absolute left-1/2 top-6 transform -translate-x-1/2">
										<div className="relative">
											<Image src={mail} alt="mail" />
										</div>
									</div>
								</div>
								<div className="my-8 text-center sm:text-left">
									<h3 className="font-[600] text-[32px] text-[#333] text-center tracking-[-2px] mb-5">
										{mailSentI18}
									</h3>
									<p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
										{enteredEmail} {sentMailToI18}
									</p>
									<p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
										{resetEmailMessageI18}
									</p>
									<br />
								</div>
							</div>
							<div className="flex items-end w-[320px] md:w-[400px] justify-center gap-2 mx-auto mt-6">
								<button
									className={`py-4 bg-white text-[#333] w-1/2 border border-[#333] font-[500] rounded-md`}>
									<div onClick={() => handleShowModal(MODAL_TYPES.LOGIN_POPUP)}>
										{loginI18}
									</div>
								</button>
								<button
									onClick={() => {
										setTab(0);
										setForgotComplete(false);
									}}
									className={`py-4 bg-white text-[#333] w-1/2 border border-[#333] font-[500] rounded-md`}>
									{findIdI18}
								</button>
							</div>
						</div>
					)}
				</>
			)}
			<MobileNav opened={openNav} />
		</div>
	);
}
