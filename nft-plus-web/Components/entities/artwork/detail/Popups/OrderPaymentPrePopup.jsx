/**
 * @createdBy Duka 2022/4/20
 */
import React, { useState, useEffect } from "react";
import { FaWonSign } from "react-icons/fa";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import Image from "next/image";
import Web3 from "web3";
import { PopContainer } from "Components/ui/popup/popupUi";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import useCurrency from "common/metamask/useCurrency";
import ArtworkPopupCard from "./ArtworkPopupCard";
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import { useGlobalContext } from 'common/global/useGlobalContext';
import ArtworkFileViewer from "../../ArtworkFileViewer";

function OrderPaymentPrePopup(props) {
	const { browserWindow } = useGlobalContext()
	const { orderPaymentI18, makePaymentI18, cancel } = useArtworkTranslation();
	const { total } = useCommonTranslation();
	const { toWon, excreptWon } = useCurrency();
	const [won, setWon] = useState(null);
	const {
		handleShowModal,
		hideModal,
		MODAL_TYPES,
		getCurrentModalprops,
		popupProps
	} = usePopup();

	useEffect(() => {
		getCurrentModalprops();
	}, []);

	useEffect(() => {
		toWon(popupProps?.artwork?.price, popupProps?.artwork?.currency, false, popupProps?.artwork?.id).then((res) => setWon(res));
	}, [popupProps]);

	console.log("image", popupProps?.artwork?.imageUrl)

	return (
		<MainPopup width={530}>
			<PopContainer>
				<PopupHeader text={orderPaymentI18} />
				<PopupContent>
					{
						browserWindow.innerWidth > 600 ?
							<ArtworkPopupCard />
							:
							<>
								<div className="flex flex-col w-full gap-[10px] bg-[#141313] p-[15px] justify-center items-center mt-[20px]">
									<div className="relative cursor-pointer flex justify-center items-center rounded-[5px]">
										{(popupProps?.artwork?.fileType === "AUDIO") ||
											(popupProps?.artwork?.fileType === "VIDEO" && popupProps?.artwork?.imageFile.url2) ||
											popupProps?.artwork?.fileType === "IMAGE" ? (
											<div className="relative bg-black">
												<div className='w-[70px] h-[70px] sm:w-full sm:h-full'>
													<img
														className='w-[70px] h-[70px] sm:w-full sm:h-full rounded-[5px] object-cover bg-[#181A1A]'
														style={{ borderRadius: '5px' }}
														src={
															popupProps?.artwork?.thumbnailUrl3x
																? popupProps?.artwork?.thumbnailUrl3x
																: "/art1.jpg"
														}
														priority
														unoptimized
														layout="fill"
														objectFit="cover"
														alt="artwork-thumbnail"
													/>
												</div>
											</div>
										) : (
											""
										)}
										{popupProps?.artwork?.fileType === "VIDEO" && (
											<div className="relative w-[70px] h-[70px] sm:w-full sm:h-full lg:w-[276px] lg:h-[276px]">
												<div
													className={!popupProps?.artwork?.imageFile.url2
														? " h-full cursor-pointer w-full overflow-hidden bg-cover bg-center flex justify-center items-center"
														: "none w-0 h-0 "
													}>
													<video
														className={`w-[70px] h-[70px] sm:w-full sm:h-full rounded-[5px] object-cover bg-[#181A1A]`}
														src={
															popupProps?.artwork?.imageUrl}
														loop
														autoPlay
														muted
														playsInline
														alt={popupProps?.artwork?.imageUrl}>
														<source
															src={
																popupProps?.artwork?.imageUrl}
															type="video"
														/>
													</video>
												</div>
											</div>
										)}
									</div>
									<div className="flex flex-col gap-[3px] items-center">
										<h6 className="text-[14px] text-[#fff]">
											{popupProps?.artwork?.artworkName}
										</h6>
										<span className="text-[14px] text-[#B0B0B0]">
											{popupProps?.artwork?.authorName}
										</span>
									</div>
								</div>
							</>
					}
					<div className="flex text-[#B0B0B0] items-center justify-between px-0 pb-[9px]  font-medium sm:text-[18px] text-[14px] sm:mt-2 mt-[30px]">
						<div>{total}</div>
					</div>
					<div className="flex flex-col items-center px-0  font-medium sm:text-[18px] text-[16px] gap-1 py-[14px] justify-center bg-[#0F1111] mb-[46px]">
						<div className="flex flex-row gap-1 text-[#DDD] font-bold">
							<div className="relative flex h-[17px] w-[17px] my-[4px]">
								{popupProps?.artwork?.type === "NOT_SELL" ? null : (
									<Image
										src={
											popupProps?.artwork?.currency == "EYES"
												? eyesicon
												: matic_logo
										}
										alt="artwork-currency"
									/>
								)}
							</div>
							<div>
								{Web3.utils.fromWei(
									(popupProps?.artwork?.price || "0").toString(),
									"ether"
								)}
							</div>
							{popupProps?.artwork?.currency}
						</div>
						<div className="flex items-center sm:text-[14px] text-[12px] text-[#999] font-[400] gap-1">
							{popupProps?.artwork?.price !== "0" && (
								<>
									<FaWonSign />
									{excreptWon(won, popupProps?.artwork?.id)}
								</>
							)}
						</div>
					</div>
				</PopupContent>
				<PopupActionButtons
					yes={() =>
						handleShowModal(MODAL_TYPES.ORDERPAYMENT, {
							artwork: popupProps?.artwork
						})
					}
					no={() => hideModal()}
					btnTexts={{ no: cancel, yes: makePaymentI18 }}
				/>
			</PopContainer>
		</MainPopup>
	);
}

export default OrderPaymentPrePopup;
