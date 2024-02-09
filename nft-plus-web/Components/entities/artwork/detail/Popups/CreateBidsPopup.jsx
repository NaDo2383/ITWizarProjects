import useArtworkTranslation from "locale/useArtworkTranslation";
import { useEffect, useState } from "react";
import usePopup from "Components/ui/popup/usePopup";
import { FaWonSign } from "react-icons/fa";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import useCurrency from "common/metamask/useCurrency";
import MobileCreateBidsPopup from "./MobileCreateBidsPopup";
import { useGlobalContext } from "common/global/useGlobalContext";
const { default: MainPopup } = require("Components/ui/popup/MainPopup");
const { default: CreatorProfile } = require("../CreatorProfile");

const CreateBids = () => {
	const { browserWindow } = useGlobalContext()
	const { cancel, bidgsI18, bidButtonI18,placeBidI18 } = useArtworkTranslation();
	const [won, setWon] = useState(0);
	const [convertedWon, setConvertedWon] = useState(0);
	const { toWon, toWei, excreptWon, toEthers } = useCurrency();
	const [newC, setNewC] = useState(false);
	const {
		handleShowModal,
		hideModal,
		MODAL_TYPES,
		getCurrentModalprops,
		popupProps
	} = usePopup();
	const [error, setError] = useState(false);
	const [newPrice, setNewPrice] = useState("");

	function handleNewPrice(e) {
		const inputPrice = e.target.value
			.replace(/[^0-9.]/g, "")
			.replace(/(\..*)\./g, "$1");
		setNewC(true);
		setNewPrice(inputPrice);
		const weiPrice = toWei(inputPrice);
		toWon(weiPrice, popupProps?.currency).then(res => {
			setConvertedWon(res)
		})
	}

	useEffect(() => {
		getCurrentModalprops();
		toWon(popupProps?.price, popupProps?.currency, true).then((res) =>
			setWon(res)
		);
	}, [popupProps]);

	function handleShowConfirmModal() {
		if (+newPrice <= +popupProps?.price) {
			setError(true);
			return;
		}
		handleShowModal(MODAL_TYPES.CREATE_CONFIRM_BID, {
			title: popupProps?.title,
			currency: popupProps?.currency,
			creator_avatar: popupProps?.creator_avatar,
			creator: popupProps?.creator,
			thumbnail_url: popupProps?.thumbnail_url,
			fileType: popupProps?.fileType,
			imageUrl: popupProps?.imageUrl,
			wei: popupProps?.wei,
			bids: newPrice,
			setBids: popupProps?.setBids,
			auction: popupProps?.auction,
			isAuction: popupProps?.isAuction,
			id: popupProps?.id,
			price: popupProps?.price,
			won: +convertedWon?.toFixed(2)
		});
	}

	return (
		<>
		{
			browserWindow.innerWidth > 600 ?
				<div className='hidden sm:flex sm:flex-col overflow-hidden'>
			<MainPopup>
				<PopupContainer>
					<PopupHeader text={placeBidI18} />
					{popupProps && (
						<PopupContent>
							<div className="flex flex-col items-center justify-center pt-[20px] mb-[40px]">
								<div className="mb-[25px] bg-black max-w-[470px]">
									<CreatorProfile
										auction={popupProps?.auction}
										thumbnail_url={popupProps?.thumbnail_url}
										title={popupProps?.title}
										creator={popupProps?.creator}
										creator_avatar={popupProps?.creator_avatar}
										fileType={popupProps?.fileType}
										imageUrl={popupProps?.imageUrl}
										currency={popupProps?.currency}
										price={popupProps?.price}
										isAuction={popupProps?.isAuction}
										id={popupProps?.id}
										won={popupProps?.won}
									/>
								</div>
								<div className="flex flex-col w-full">
									<div className="flex sm:text-[18px] text-[15px] text-[#DDDDDD] font-medium">
										{bidgsI18}
									</div>
									<div className="mt-[15px]">
										<div className="h-full">
											<div className="flex flex-col justify-end sm:mb-[30px]">
												<div className="flex gap-[7px]">
													<input
														value={newPrice}
														maxLength={10}
														onChange={handleNewPrice}
														className={`w-full bg-black border ${error ? "border-[#FB3873]" : "border-[#FB3873]"
															} font-[400] text-[#808080] sm:text-[16px] text-[12px] rounded-[5px] px-[14px] pt-[6px] pb-[8px]`}
														placeholder="입찰가를 입력해주세요"
													/>
													<span className="flex items-center text-[#fff] font-[700] sm:text-[18px] text-[15px]">
														{popupProps?.currency}
													</span>
												</div>
												<div className="flex justify-end">
														<div className="flex items-center justify-center text-[#999] sm:text-[14px] text-[12px] font-[400] ">
																{popupProps?.currency === "MATIC" ? (
																	<FaWonSign />
																	) : (
																	<FaWonSign />
																)}
														</div>
														<div className="flex items-center justify-center text-[#999999] text-[14px] font-[400]">
															{+convertedWon?.toFixed(2)}
														</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</PopupContent>
					)}
					<PopupActionButtons
						yes={handleShowConfirmModal}
						no={() => hideModal()}
						btnTexts={{ no: cancel, yes: bidButtonI18 }}
					/>
				</PopupContainer>
			</MainPopup>
			</div>
			:
			<MobileCreateBidsPopup />
			}
		</>
	);
};

export default CreateBids;
