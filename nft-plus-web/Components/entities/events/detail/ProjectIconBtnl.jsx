import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import Dialog from "Components/ui/dialog/Dialog";
import usePopup from "Components/ui/popup/usePopup";
import useArtwork from "Components/entities/artwork/useArtwork";
import useArtDetail from "Components/entities/artwork/detail/useArtDetail";
import useAuthUser, {
	useCheckUser
} from "Components/entities/user/auth/useAuthUser";
import useMyPageTranslation from "locale/useMypageTranslation";

export default function ProjectIconBtn({ heartCount, hearted }) {
	const { plsLoginI18 } = useMyPageTranslation();
	const { isLoggedIn } = useCheckUser();
	const { sendHearth, unSendHearth, handleArtworkHeart } = useArtwork();
	const { artDetail } = useArtDetail();
	const { authUser } = useAuthUser();
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

	function handleReport() {
		if (!authUser?.id) {
			handleShowModal(MODAL_TYPES.LOGIN_POPUP);
			return;
		}
		handleShowModal(MODAL_TYPES.REPORT, { artwork: artDetail });
	}

	const heartObj = {
		artwork: artDetail,
		recentArt,
		setRecentArt
	}

	useEffect(() => {
		setRecentArt({
			heartCount: +heartCount,
			isHearted: hearted,
			convertedWon: null
		})
	}, [authUser?.id])


	return (
		<div className={`relative`}>
			<div className="absolute flex right-0 flex-col lg:gap-2 gap-1">
				<button
					onClick={() => handleArtworkHeart(heartObj)}
					className="border bg-[#252525] border-[#777777] lg:w-[26px] lg:h-[26px] sm:w-[26px] sm:h-[26px] w-[24px] h-[24px] flex items-center justify-center rounded-full relative group">
					{recentArt.isHearted ? (
						<AiFillHeart className="text-[#777777] cursor-pointer w-[16px] h-[15px]" />
					) : (
						<AiOutlineHeart className="text-[#777777] cursor-pointer [16px] h-[15px]" />
					)}
				</button>
				<button
					className="border relative bg-[#252525] border-[#777777] lg:w-[26px] lg:h-[26px] sm:w-[26px] sm:h-[26px] w-[24px] h-[24px] text-[#777777] flex items-center justify-center rounded-full"
					onClick={handleShare}>
					<FiSend className="text-[#777777] cursor-pointer w-[16px] h-[15px]" />
				</button>
				{!(
					artDetail?.authorId === authUser?.id ||
					artDetail?.ownerId === authUser?.id
				) && (
						!artDetail?.isAd &&
						<button
							className=" relative bg-[#252525] text-[#777777] flex items-center justify-center lg:w-[26px] lg:h-[26px] sm:w-[26px] sm:h-[26px] w-[24px] h-[24px]"
							onClick={handleReport}>
							<div className="lg:w-[26px] lg:h-[26px] sm:w-[26px] sm:h-[26px] w-[24px] h-[24px]">
								<svg
									viewBox="0 0 26 26"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<circle cx="13" cy="13" r="12.5" stroke="#777777" />
									<path
										d="M8.42188 12.0769C8.42188 9.54916 10.471 7.5 12.9988 7.5C15.5266 7.5 17.5757 9.54916 17.5757 12.0769V16.6538H8.42188V12.0769Z"
										stroke="#777777"
									/>
									<rect
										x="7.5"
										y="16.7305"
										width="11"
										height="1.76923"
										rx="0.884615"
										stroke="#777777"
									/>
									<path
										d="M13 9.5C11.5 9.5 10.5 10.5 10.5 13"
										stroke="#777777"
										strokeLinecap="round"
									/>
								</svg>
							</div>
						</button>
					)}
				{isShowDialog && (
					<Dialog text={plsLoginI18} setIsShow={setIsShowDialog} />
				)}
			</div>
		</div>
	);
}
