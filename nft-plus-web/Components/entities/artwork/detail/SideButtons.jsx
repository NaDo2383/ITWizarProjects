import { useState } from "react";
import { BsShare } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Dialog from "Components/ui/dialog/Dialog";
import usePopup from "Components/ui/popup/usePopup";
import useArtwork from "../useArtwork";
import useArtDetail from "./useArtDetail";
import { useCheckUser } from "Components/entities/user/auth/useAuthUser";
import useMyPageTranslation from "locale/useMypageTranslation";

export default function SideButtons({ heartCount, hearted }) {
	const { plsLoginI18 } = useMyPageTranslation();
	const { isLoggedIn } = useCheckUser();
	const { sendHearth, unSendHearth } = useArtwork();
	const { artDetail } = useArtDetail();
	const { MODAL_TYPES, handleShowModal } = usePopup();
	const [isShowDialog, setIsShowDialog] = useState(false);
	const [recentArt, setRecentArt] = useState({
		heartCount: +heartCount,
		isHearted: hearted,
		convertedWon: null
	});

	const handleShare = async () => {
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard.writeText(window.location.href);
			handleShowModal(MODAL_TYPES.CLIPBOARD);
		}
	};

	const handleHeart = async () => {
		const isUserLoggedIn = isLoggedIn();
		if (!isUserLoggedIn) {
			setIsShowDialog(true);
			return;
		}

		if (recentArt.isHearted) {
			unSendHearth(artDetail?.id);
			setRecentArt({ ...recentArt, isHearted: false });
		} else {
			sendHearth(artDetail?.id);
			setRecentArt({ ...recentArt, isHearted: true });
		}
	};

	return (
		<div
			className={`flex  ml-4 lg:flex-col absolute  z-30 lg:top-[30px] lg:px-4 flex-row right-4 bottom-4 items-center gap-3`}>
			<button
				onClick={handleHeart}
				className="border bg-white z-50 border-gray-400 w-8 h-8 flex items-center justify-center rounded-full relative group">
				{recentArt.isHearted ? (
					<AiFillHeart className="text-[#ABABAB] cursor-pointer" />
				) : (
					<AiOutlineHeart className="text-[#ABABAB] cursor-pointer" />
				)}
			</button>
			<button
				className="border relative bg-white z-50 border-gray-400 w-8 h-8 text-[#ABABAB] flex items-center justify-center rounded-full"
				onClick={handleShare}>
				<BsShare className="transform rotate-180" />
			</button>
			{isShowDialog && (
				<Dialog text={plsLoginI18} setIsShow={setIsShowDialog} />
			)}
		</div>
	);
}
