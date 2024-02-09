import React, { useState } from "react";
import MainPopup from "Components/ui/popup/MainPopup";

function MakePaymentPopup() {
	// const { otpAuthI18, cancel: cancelI18 } = useArtworkTranslation();
	// const { hideModal } = useGlobalModalContext();
	// const {
	// 	data,
	// 	loading: gettingQr,
	// 	error
	// } = useSelector((state) => state.getQrState);
	// const [qrImage, setQrImage] = useState(null);
	// const [requested, setRequested] = useState(false);
	// const [done, setDone] = useState(false);
	// const [ggg, setGgg] = useState(false);
	// const { authUser } = useAuthUser();
	// const checkIfVerified = (ok) => {
	// 	if (ok) {
	// 		setDone(true);
	// 	} else {
	// 		setDone(false);
	// 	}
	// };

	// useEffect(() => {
	// 	if (data?.qrCode && requested) {
	// 		setQrImage(data.qrCode);
	// 		setRequested(true);
	// 	}
	// }, [data, data?.qrCode, requested]);

	// useEffect(() => {
	// 	setGgg(done);
	// }, [done]);
	return (
		<MainPopup>
			{/* <div className="w-full p-4 border-b flex items-center justify-between">
				<h2 className="font-[500] text-2xl">{otpAuthI18}</h2>
				<div
					onClick={hideModal}
					className="btn cursor-pointer w-8 h-8 flex items-center">
					<div className="h-px bg-black w-[35px] relative before:absolute before:w-full before:h-full before:bg-black transform rotate-45 before:transofrm before:-rotate-90 before:left-0"></div>
				</div>
			</div>
			<OtpAuth
				qr={qrImage && qrImage}
				verified={checkIfVerified}
				otpVerified={authUser?.loggedUser.otpVerified}
			/>
			<div className="w-full py-6"></div>; */}
			<></>
		</MainPopup>
	);
}

export default MakePaymentPopup;
