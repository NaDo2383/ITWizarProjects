import { useEffect } from "react";
import useWallet from "common/metamask/useWallet";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import { useGlobalContext } from "common/global/useGlobalContext";
import useAuction from "common/metamask/useAuction";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";

const RemoveAuction = () => {
	const { setGlobalLoading } = useGlobalContext();
	const { walletIsMatch } = useWallet();
	const {
		MODAL_TYPES,
		hideAllModals,
		handleShowModal,
		getCurrentModalprops,
		popupProps
	} = usePopup();
	const { getNetwork } = useMetaNetwork();
	const { cancelAuctionHandler } = useAuction();
	const {
		auctionListRemoveI18,
		auctionListRemove1I18,
		auctionListRemoveHeaderI18
	} = useArtworkTranslation();
	const { confirmI18 } = useMyPageTranslation();

	const removeHandler = async () => {
		// check wallet
		const { isMatchWallet, currentMetaWallet } = await walletIsMatch();
		if (!isMatchWallet) {
			alert("install metamask");
			return;
		}
		setGlobalLoading(true);
		const network = await getNetwork();

		const networkId = process.env.MATIC_CHAIN_ID;

		if (networkId !== network) {
			handleShowModal(MODAL_TYPES.SWITCHMAINNET);
			setGlobalLoading(false);
			return;
		}
		if (networkId === network && popupProps.auction?.tokenId) {
			const { failure } = await cancelAuctionHandler(
				popupProps.auction?.tokenId
			);

			if (failure) {
				alert(failure);
				return;
			}

			popupProps?.upDateArtDetail();
			setGlobalLoading(false);
			hideAllModals();
		} else if (network === "Please install metamask.") {
			alert(network);
			setGlobalLoading(false);
			handleShowModal(modalType);
		} else {
			setGlobalLoading(false);
			hideAllModals();
		}
	};

	useEffect(() => {
		getCurrentModalprops();
	}, []);

	return (
		<>
			<MainPopup width={530}>
				<PopupContainer>
					<PopupHeader text={auctionListRemoveHeaderI18} />
					<PopupContent>
						<div className="full pt-[30px] flex flex-col justify-center relaive pb-[30px]">
							<h5 className=" tracking-[-1px] sm:text-[18px] text-[14px] text-[#DDD]">
								{auctionListRemoveI18}
							</h5>
							<h5 className=" tracking-[-1px] sm:text-[18px] text-[14px] text-[#DDD]">
								{auctionListRemove1I18}
							</h5>
						</div>
					</PopupContent>
					<div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px]">
						<button
							className="max-w-[107px] w-full bg-[#FB3873] cursor-pointer text-white py-[6px] focus:outline-none text-center rounded-[5px]"
							onClick={() => removeHandler()}>
							<h5 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">
								{confirmI18}
							</h5>
						</button>
					</div>
				</PopupContainer>
			</MainPopup>
		</>
	);
};

export default RemoveAuction;
