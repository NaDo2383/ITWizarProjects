import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import useCommonTranslation from "locale/useCommonTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import useOtp from "Components/entities/user/profile/profileSubpage/subpages/editProfile/useOtp";

const arr = Array.from({ length: 6 }, () => "");
export default function Verificate({ cancel, done, otpVerified }) {
	const { otpAuthKeyDoesntMatchI18 } = useCommonTranslation();
	const { cancel: cancelI18 } = useArtworkTranslation();
	const { confirmI18 } = useFAQpageTranslation();
	const { verifyQr, otpVerify, otpState } = useOtp();
	const router = useRouter();
	const [code, setCode] = useState(arr);
	const [verificationCode, setVerificationCode] = useState(null);
	const [err, setErr] = useState(null);
	const inputs = useRef([]);

	const processInput = (e, slot) => {
		const num = e.target.value;
		if (/[^0-9]/.test(num)) return;
		const newCode = [...code];
		newCode[slot] = num;
		setCode(newCode);
		if (slot !== length - 1) {
			if (inputs.current[slot + 1]) {
				inputs.current[slot + 1].focus();
			}
		}
		if (newCode.every((num) => num !== "")) {
			setVerificationCode(newCode.join(""));
		}
	};

	const onKeyUp = (e, slot) => {
		if (e.keyCode === 8 && !code[slot] && slot !== 0) {
			const newCode = [...code];
			newCode[slot - 1] = "";
			setCode(newCode);
			inputs.current[slot - 1].focus();
		}
	};

	const verify = async () => {
		if (!otpVerified) {
			verifyQr({ code: verificationCode, event: "ACCOUNT_VERIFY" });
		} else {
			otpVerify({ code: verificationCode });
		}
	};
	useEffect(() => {
		if (otpState?.qrVerify.data?.result || otpState?.otpVerify.data.message) {
			done();
		}
	}, [done, otpState?.qrVerify.data?.result, otpState?.otpVerify.data.message]);

	useEffect(() => {
		if (otpState?.qrVerify?.error?.status === 401) {
			localStorage.removeItem("user");
		}
		if (
			otpState?.qrVerify?.error &&
			otpState?.qrVerify?.error?.result === "invalid.code"
		) {
			setErr(otpAuthKeyDoesntMatchI18);
		}
	}, [
		otpState?.qrVerify?.error,
		otpState?.qrVerify?.error?.status,
		otpState?.qrVerify?.error?.result
	]);

	return (
		<>
			<div className="flex justify-center gap-2">
				{code.map((el, index) => (
					<input
						className="w-8 sm:w-12 border text-2xl font-bold text-[#666]  border-[#333] p-1 sm:p-4 text-center focus:outline-none focus:border-[#ff00e4]"
						key={`input-${index}`}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={el}
						readOnly={otpState?.qrVerify}
						onChange={(e) => processInput(e, index)}
						onKeyUp={(e) => onKeyUp(e, index)}
						ref={(ref) => inputs.current.push(ref)}
					/>
				))}
			</div>
			{err && <p className="text-center text-red-400">{err}</p>}
			<div className="flex gap-2 justify-center">
				<button
					onClick={cancel}
					className={`bg-white border-[#333] text-[#333] py-2 px-6 rounded-md border w-max mt-4`}>
					{cancelI18}
				</button>
				<button
					disabled={
						!verificationCode || otpState?.otpVerify.isLoading ? true : false
					}
					onClick={verify}
					className={`bg-[#333] text-white py-2 px-6 rounded-md border w-max mt-4 ${
						!verificationCode && "bg-opacity-50 cursor-not-allowed"
					} ${
						otpState?.qrVerify ||
						(otpState?.otpVerify.isLoading && "bg-opacity-50 cursor-wait")
					}`}>
					{confirmI18}
				</button>
			</div>
		</>
	);
}
