import { useEffect, useState } from "react";
import Image from "next/image";
import authCheck from "public/authCheck.png";
import auth from "public/auth.png";
import { useRouter } from "next/router";
import useCommonTranslation from "locale/useCommonTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import CheckboxNative from "Components/ui/checkbox/CheckNative";
import { setLocal } from "utils/storage";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useAlertTranslation from "locale/useAlertTranslation";

function LoginPage() {
	const { locale, push } = useRouter();
	const {
		loginI18,
		inputIdPlaceholderI18,
		inputPasswordPlaceholderI18,
		saveIDI18,
		findIdPassI18,
		signupI18
	} = useCommonTranslation();
	const { plsEnterInfoI18 } = useMyPageTranslation();
	const { credentialDoesntMatchI18 } = useAlertTranslation();
	const [loginForm, setLoginForm] = useState({
		loginId: null,
		password: null,
		credentialError: false
	});
	const { authUser } = useAuthUser();

	function handleField(e) {
		const { name, value } = e.target;
		setLoginForm((prev) => ({ ...prev, [name]: value }));
	}
	function handleRememberMe() {
		const { loginId, password } = loginForm;
		if (!loginId || !password) return;
		const rememberMe = { loginId, password };
		setLocal("rememberMe", rememberMe);
	}

	async function handleSubmit() {
		const { loginId, password } = loginForm;
		if (!loginId || !password) {
			setLoginForm((prev) => ({ ...prev, credentialError: true }));
			return;
		}
		// loginUser({ loginId, password }).then((res) => {
		// 	if (res === "failed.user.authentication") {
		// 		setLoginForm((prev) => ({ ...prev, credentialError: true }));
		// 	}
		// });
	}

	useEffect(() => {
		if (authUser?.id) {
			push("/");
		}
	}, [authUser]);

	return (
		<div className="w-full flex items-center justify-center my-20">
			<div className="min-w-[320px] sm:min-w-[375px] md:min-w-[411px] flex flex-col items-center">
				<h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-12">
					{loginI18}
				</h2>
				<div className="relative mb-8">
					<Image src={authCheck} alt="login" />
					<div className="absolute bottom-0 right-2.5 transform translate-y-[8px]">
						<Image src={auth} alt="auth" />
					</div>
				</div>
				<div className="login-form">
					{loginForm.credentialError && (
						<p className=" text-center text-red-400">
							{(loginForm.loginId === "" && loginForm.password === "") ||
							loginForm.loginId === "" ||
							loginForm.password === ""
								? plsEnterInfoI18
								: credentialDoesntMatchI18}
						</p>
					)}
					<div className="undefined w-full flex mb-4 border rounded-lg false">
						<input
							name="loginId"
							type="text"
							placeholder={inputIdPlaceholderI18}
							onChange={handleField}
							className="login-form input"
						/>
					</div>
					<div className="undefined w-full flex mb-4 border  rounded-lg false">
						<input
							name="password"
							type="password"
							placeholder={inputPasswordPlaceholderI18}
							onChange={handleField}
							className="login-form input"
						/>
					</div>
					<div className="flex gap-2 px-1 w-full">
						<div className="flex justify-center items-center">
							<CheckboxNative onChange={handleRememberMe} />
						</div>
						<span className="font-[300] text-[#333] ">{saveIDI18}</span>
					</div>
					<button onClick={handleSubmit} className="btn rounded-lg">
						{loginI18}
					</button>
					<div className="flex gap-2">
						<button
							className="btn outlined-btn"
							onClick={() => push("/find-login")}>
							{findIdPassI18}
						</button>
						<button
							className="btn outlined-btn"
							onClick={() => push("/sign-up")}>
							{signupI18}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
