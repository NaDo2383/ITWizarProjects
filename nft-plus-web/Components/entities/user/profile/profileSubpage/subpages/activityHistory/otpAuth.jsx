import { useEffect, useState } from "react";
import Image from "next/image";
import icoBar from "public/ico_bar.png";
import useMypageTranslation from "locale/useMypageTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import { useRouter } from "next/router";
import useOtp from "../editProfile/useOtp";
import usePopup from "Components/ui/popup/usePopup";

export default function OtpAuth({ qr, verified, otpVerified }) {
	const {
		installI18,
		barcodeI18,
		authenticationKeyI18,
		confirmI18
	} = useMypageTranslation();
	const { otpAuthKeyDoesntMatchI18 } = useCommonTranslation();
	const router = useRouter();
	const { verifyQr, otpVerify, otpState } = useOtp();
	const [qrVerify, setQrVerify] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [initial, setInitial] = useState(false);
	const { handleShowModal, MODAL_TYPES } = usePopup();

	const verifyPurchase = async () => {
		setInitial(true);
		if (otpVerified) {
			const formData = {
				code: qrVerify,
				event: "MARKET_PAY"
			};
			verifyQr(formData);
		} else {
			otpVerify({ code: qrVerify });
		}
	};

	useEffect(() => {
		if (
			(initial && otpState?.qrVerify?.data?.result) ||
			otpState?.otpVerify?.data?.message === "success.user.otp.verified"
		) {
			verified(true);
			setQrVerify("");
			setInitial(false);
		}
	}, [
		otpState?.qrVerify?.data?.result,
		verified,
		otpState?.otpVerify?.data?.message,
		initial
	]);

	useEffect(() => {
		if (otpState?.qrVerify?.error?.status === 401) {
			localStorage.removeItem("user");
			handleShowModal(MODAL_TYPES.LOGIN_POPUP);
		}
		if (otpState?.qrVerify?.error?.result === "invalid.code") {
			setErrorMessage(otpAuthKeyDoesntMatchI18);
		}
	}, [
		otpState?.qrVerify?.error,
		otpState?.qrVerify?.error?.status,
		otpState?.qrVerify?.error?.result
	]);

	return (
		<>
			<div className="tracking-tighter max-w-[504px] mx-auto">
				<div className=" font-light text-[15px] mt-7">
					{qr && (
						<div className="">
							1. {installI18} <br />
							2. {barcodeI18}
						</div>
					)}
				</div>
				{qr && (
					<div className="text-center mx-auto mt-6 relative w-[165px] h-[165px]">
						<Image
							priority
							unoptimized
							layout="fill"
							objectFit="cover"
							src={qr ? `data:image/jpeg;base64,${qr}` : icoBar}
							alt="image"
						/>
					</div>
				)}
				<div className="text-center">
					<span className=" font-light text-[15px] mt-3">
						{authenticationKeyI18}
					</span>
					<br />
					<span className=" font-light text-[15px] mt-3 text-[#db4d4d]">
						{errorMessage}
					</span>
				</div>
				<div className="flex items-center justify-center mt-8">
					<input
						value={qrVerify}
						onChange={(e) => setQrVerify(e.target.value)}
						type="text"
						className="w-[275px] border rounded-md mr-1 h-[39px]"
					/>
					<button
						disabled={otpState?.qrVerify?.isLoading}
						onClick={verifyPurchase}
						className={`${otpState?.qrVerify?.isLoading && "cursor-wait"
							}  font-light text-[15px] px-4 py-2 bg-[#333] text-white rounded-lg`}>
						{confirmI18}
					</button>
				</div>
			</div>
		</>
	);
}
