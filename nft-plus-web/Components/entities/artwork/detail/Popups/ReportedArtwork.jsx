import usePopup from "Components/ui/popup/usePopup";
import { useGlobalContext } from "common/global/useGlobalContext";
import useMyPageTranslation from "locale/useMypageTranslation";
import { useEffect } from "react";

const { default: MainPopup } = require("Components/ui/popup/MainPopup");
const {
	default: useArtworkTranslation
} = require("locale/useArtworkTranslation");
const { useRouter } = require("next/router");

const ReportedArtwork = () => {
	const router = useRouter();
	const { footer_desc1I18, reasonI18 } = useArtworkTranslation();
	const { confirmI18 } = useMyPageTranslation();
	const { authUser } = useGlobalContext();
	const { getCurrentModalprops, popupProps, hideAllModals } = usePopup();

	const closeHaltLay = () => {
		if (authUser?.id === popupProps?.artDetail.ownerId) {
			router.push("/mypage");
		}
		hideAllModals();
	};

	useEffect(() => {
		getCurrentModalprops();
	}, []);

	return (
		<MainPopup width={572}>
			<div className="p-8 flex items-center justify-center text-center">
				<p className="text-xl">{footer_desc1I18}</p>
			</div>
			<div className="pb-4 px-8 items-center justify-center text-center">
				<p className="text-xl">{reasonI18}</p>
				<p className="text-xl">
					{popupProps?.artDetail?.denyReason ? popupProps?.artDetail?.denyReason : " "}
				</p>
			</div>
			<button
				onClick={closeHaltLay}
				className="w-full text-white bg-[#333] py-4">
				{confirmI18}
			</button>
		</MainPopup>
	);
};

export default ReportedArtwork;
