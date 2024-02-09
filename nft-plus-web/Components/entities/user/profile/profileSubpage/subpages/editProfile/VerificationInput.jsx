/**чих хамар хоолойн эмнэлэгман
 * @createdBy duka
 */
import { useState, useRef } from "react";
import useOtp from "./useOtp";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import usePopup from "Components/ui/popup/usePopup";

function Verificate({ otpVerified, cancel }) {
	const { verifyQr } = useOtp();
	const arr = Array.from({ length: 6 }, () => "");
	const { cancel: cancelI18 } = useArtworkTranslation();
	const { confirmI18 } = useFAQpageTranslation();
	const [code, setCode] = useState(arr);
	const [verificationCode, setVerificationCode] = useState(null);
	const [err, setErr] = useState(null);
	const inputs = useRef([]);
	const { hideModal } = usePopup()

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
			verifyQr({
				code: verificationCode,
				event: "ACCOUNT_VERIFY"
			});
		} else {
			verifyQr({
				code: verificationCode
			});
		}
	};

	return (
		<>
			<div className="flex justify-center gap-2 my-[40px]">
				{code.map((el, index) => (
					<input
						className="w-8 sm:w-12 border text-2xl font-bold text-[#666]  border-[#333] p-1 sm:p-4 text-center focus:outline-none focus:border-[#ff00e4]"
						key={`input-${index}`}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={el}
						onChange={(e) => processInput(e, index)}
						onKeyUp={(e) => onKeyUp(e, index)}
						ref={(ref) => inputs.current.push(ref)}
					/>
				))}
			</div>
			{err && <p className="text-center text-red-400">{err}</p>}
			<PopupActionButtons
				yes={verify}
				no={() => hideModal()}
				btnTexts={{ no: cancelI18, yes: confirmI18 }}
			/>
		</>
	);
}
export default Verificate;
