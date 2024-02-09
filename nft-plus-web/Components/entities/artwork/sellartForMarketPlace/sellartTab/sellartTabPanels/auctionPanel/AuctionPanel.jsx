import React, { useEffect, useState } from "react";
import useArtDetail from "Components/entities/artwork/detail/useArtDetail";
import useMyPageTranslation from "locale/useMypageTranslation";
import EyesWhiteIcon from "public/eyeswhite.png";
import useArtworkTranslation from "locale/useArtworkTranslation";
import TextField from "@mui/material/TextField";
import chatIcon from "public/chatIcon.svg";
import matic_logo_white from "public/matic-logo-white.png";
import dayjs from "dayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Checkbox from "Components/ui/checkbox/Checkbox";
import Image from "next/image";
import useSellart from "../../../useSellart";
import DisplayAuctionBtn from "./DisplayAuctionBtn";
import useCurrency from "common/metamask/useCurrency";
import DateTimePickerIcon from "public/dateTimePicker.svg";
import moment from "moment";
import "dayjs/locale/ko";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import useFee from "Components/entities/artwork/useFee";
import usePopup from "Components/ui/popup/usePopup";

let currentDate = new Date();
let dateNow = currentDate;
if (currentDate.getMinutes() > 30) {
	dateNow.setTime(dateNow.getTime() + 3600000);
	dateNow.setMinutes(0);
} else {
	dateNow.setMinutes(30);
}
let endNow = new Date(dateNow.getTime() + 3600 * 1000 * 24);

function AuctionPanel() {
	const [saleFee, setSaleFee] = useState(0)
	const { getFee } = useFee()
	const { locale } = useRouter();
	const dayMils = 86400000;
	const { method_paymentI18 } = useMyPageTranslation();
	const [startDate, setStartDate] = useState(dayjs(dateNow));
	const [endDate, setEndDate] = useState(dayjs(endNow));
	const [error, setError] = useState({ nonPrice: false, nonChecked: false });
	const {
		startingPriceI18,
		plsEnterSellingPriceI18,
		salesPeriodSettingI18,
		noticeI18,
		noticeTextLi1I18,
		noticeTextLi2I18,
		noticeTextLi3I18,
		noticeTextLi4I18,
		noticeTextLi5I18,
		noticeTextLi6I18,
		noticeTextLi7I18,
		agreeI18,
		commissionI18,
		salesCommissionI18,
		creatorRoyaltyI18,
		checkCheckBoxI18,
		resaleFeeI18
	} = useArtworkTranslation();
	const { artDetail } = useArtDetail();
	const {
		auctionState,
		setAuctionState,
		addAuction,
		resetSellartContext,
		generatedFees
	} = useSellart();

	const { toWon, toWei, toEthers, excreptWon } = useCurrency();
	const [convertedCurrency, setConvertedCurrency] = useState(null);
	const [startDayDiff, setStartDayDiff] = useState(0);
	const [startDt, setStartDt] = useState(moment());
	const [endDayDiff, setEndDayDiff] = useState(0);
	const [isEndDate, setIsEndDate] = useState(false);
	const [startIsDefaultValue, setStartDateDefaultValue] = useState(0);
	const { setGlobalModalState, hideModal } = usePopup();

	async function handlePrice(e) {
		if (+e.target.value >= 0) {
			setAuctionState((prev) => ({
				...prev,
				startingPrice: e.target.value
			}))
		}
	}
	async function handleDate1(newValue) {
		setAuctionState((prev) => ({ ...prev, startDate: newValue }));
	}
	async function handleDate2(newValue) {
		setAuctionState((prev) => ({ ...prev, endDate: newValue }));
	}
	async function handleAllow() {
		setAuctionState((prev) => ({ ...prev, isAllow: !prev.isAllow }));
	}
	async function handleSubmit() {
		try {
			if (!auctionState.startingPrice || auctionState.startingPrice <= 0) {
				alert("check the price");
				return;
			}
			if (!auctionState.isAllow) {
				alert(checkCheckBoxI18);
				return;
			}
			await addAuction(artDetail);
		} catch (e) {
			console.error(e);
		}
	}

	const weiCurrency = toWei(auctionState.startingPrice);

	useEffect(() => {
		toWon(weiCurrency, artDetail?.currency).then((res) =>
			setConvertedCurrency(res)
		);
	}, [auctionState.startingPrice]);

	useEffect(() => {
		const stDate = moment(auctionState?.startDate?.$d);
		const nowDateStr = moment().format("YYYY-MM-DD");
		const startDateStr = stDate.format("YYYY-MM-DD");
		setStartDt(stDate);

		if (nowDateStr === startDateStr) {
			setStartDayDiff(0);
		} else {
			setStartDayDiff(1);
		}
	}, [auctionState?.startDate]);

	useEffect(() => {
		const nowDateStr = moment(auctionState?.startDate.$d).format("YYYY-MM-DD");
		const endDateStr = moment(auctionState?.endDate.$d)
			.subtract(1, "d")
			.format("YYYY-MM-DD");
		const maxDate = moment(auctionState?.startDate.$d)
			.add(14, "d")
			.format("YYYY-MM-DD");
		if (maxDate === endDateStr) {
			setIsEndDate(true);
		} else {
			setIsEndDate(false);
		}

		if (nowDateStr === endDateStr) {
			setEndDayDiff(0);
		} else {
			setEndDayDiff(1);
		}
	}, [auctionState?.endDate, auctionState?.startDate]);

	//didMount
	useEffect(() => {
		return () => resetSellartContext();
	}, []);

	useEffect(() => {
		setGlobalModalState((prev) => ({
			...prev,
			staticBackdrop: true
		}));
		return () => {
			setGlobalModalState((prev) => ({
				...prev,
				staticBackdrop: false
			}));
			hideModal();
		};
	}, []);

	useEffect(() => {
		if (artDetail?.isAuction && artDetail?.auction) {
			setAuctionState((prev) => ({
				...prev,
				startingPrice: toEthers(artDetail.auction.price),
				startDate: artDetail.auction.startDate,
				endDate: artDetail.auction.endDate
			}));
		}

		async function getSaleFee() {
			const name = artDetail.resale ? 'RESALE' : 'SALE';
			const { result, failure } = await getFee(name, artDetail.currency, getSaleFee);
			if (failure) {
				if (failure !== 'switchnetwork') {
					alert(failure);
				}
				return;
			}
			setSaleFee(result);
		}
		if (artDetail) {
			getSaleFee()
		}
	}, [artDetail])

	return (
		<div className="w-full  pb-[141px]">
			<div className="relative">
				<div className="w-full">
					<div className="w-full px-2 sm:px-0 border-y-[1px] border-[#353535] flex flex-col sm:flex-row items-start sm:items-center flex-wrap sm:h-[76px] sm:py-0 py-[14px] gap-[10px]">
						<div className="sm:w-1/4 flex items-center">
							<h5 className="lg:ml-4 sm:ml-2 sm:text-[16px] md:text-[18px] text-[14px] leading-0 sm:leading-[59px] md:leading-[63px] text-[#DDD] font-[500]">
								{method_paymentI18}
							</h5>
						</div>
						<div className="flex">
							{artDetail?.currency === "MATIC" ? (
								<div className="bg-[#6319FF] cursor-pointer flex items-center rounded-md sm:py-[13px] py-[7px] sm:px-[20px] px-[15px] text-[#fff] text-[18px] font-[500] max-h-[46px] max-w-[115px]">
									<span className="sm:w-[17px] sm:h-[17px] w-[14px] h-[14px] flex justify-center items-center">
										<Image src={matic_logo_white} alt="matic_logo_white" />
									</span>
									<p className="text-white sm:text-[18px] text-[14px] font-[500] sm:ml-[6px] ml-[7px] leading-[22px]">
										MATIC
									</p>
								</div>
							) : (
								<div className="bg-[#6319FF] cursor-pointer flex items-center rounded-md sm:py-[13px] py-[7px] sm:px-[20px] px-[15px] text-[#fff] text-[18px] font-[500] max-h-[46px] max-w-[115px]">
									<span className="sm:w-[17px] sm:h-[17px] w-[14px] h-[14px] flex justify-center items-center">
										<Image src={EyesWhiteIcon} alt="EyesWhiteIcon" />
									</span>
									<p className="text-white sm:text-[18px] text-[14px] font-[500] sm:ml-[6px] ml-[7px] leading-[22px]">
										EYES
									</p>
								</div>
							)}
						</div>
					</div>
					<div className="w-full border-b-[1px] border-[#353535] flex flex-col sm:flex-row items-start sm:items-center flex-wrap py-[15px] gap-[10px]">
						<div className="sm:w-1/4 flex items-center">
							<h5 className="lg:ml-4 sm:ml-2 text-[14px] sm:text-[16px] md:text-[18px] tracking-[-1px] text-[#DDD] font-[500]">
								{salesPeriodSettingI18}
							</h5>
						</div>
						<div className="flex">
							<div className="flex flex-col">
								<div className="hidden sm:flex overflow-hidden">
									<div className="auction w-full sm:w-4/6 flex flex-row items-center gap-1">
										<LocalizationProvider
											dateAdapter={AdapterDayjs}
											adapterLocale={locale}>
											<DateTimePicker
												hideCalendarIcon={true}
												disablePast
												value={auctionState?.startDate}
												inputProps={{ readOnly: true, shrink: true }}
												onChange={handleDate1}
												minutesStep={30}
												{...(startDayDiff === 0 && {
													minTime:
														new Date().getMinutes() > 30 &&
															startIsDefaultValue == 0
															? moment(
																new Date(
																	new Date(moment().add(1, "hours")).setMinutes(
																		0
																	)
																)
															)
															: moment()
												})}
												inputFormat="YYYY-MM-DD ddd HH:mm"
												renderInput={(params) => {
													let a = params?.inputProps?.value || new Date();
													return (
														<>
															<div key={'calendar'} className="relative">
																<Box className=" absolute top-1/2 -translate-y-1/2 right-[13px] mt-[1.75px]">
																	<Image
																		className="w-full h-full"
																		src={DateTimePickerIcon}
																		alt="DateTimePickerIcon
																	"
																	/>
																</Box>
																<TextField
																	{...params}
																	sx={{
																		paddingLeft: "0px !important",
																		fontSize: "16px",
																		".MuiInputBase-input ": {
																			height: "30px !important",
																			width: "173px !important",
																		}
																	}}
																/>
															</div>
														</>
													);
												}}
											/>
										</LocalizationProvider>
										<span className="px-1">~</span>
										<LocalizationProvider
											dateAdapter={AdapterDayjs}
											adapterLocale={locale}>
											<DateTimePicker
												value={auctionState?.endDate}
												inputProps={{ readOnly: true }}
												InputProps={{ shrink: true }}
												onChange={handleDate2}
												defaultValue="00:00"
												minDate={new Date(startDate).setDate(startDate?.$D + 1)}
												maxDate={new Date(startDate).setDate(startDate?.$D + 15)}
												inputFormat="YYYY-MM-DD ddd HH:mm"
												minutesStep={30}
												{...(endDayDiff === 0 && { minTime: startDt })}
												{...(isEndDate && { maxTime: startDt })}
												renderInput={(params) => {
													let a = params?.inputProps?.value || new Date();
													return (
														<>
															<div className=" relative ">
																<Box className=" absolute top-1/2 -translate-y-1/2 right-[13px] mt-[1.75px]">
																	<Image
																		className="w-full h-full"
																		src={DateTimePickerIcon}
																		alt="DateTimePickerIcon"
																	/>
																</Box>
																<TextField
																	{...params}
																	sx={{
																		paddingLeft: "0px !important",
																		fontSize: "16px",
																		".MuiInputBase-input ": {
																			height: "30px !important",
																			width: "173px !important",
																		}
																	}}
																/>
															</div>
														</>
													);
												}}
											/>
										</LocalizationProvider>
									</div>
								</div>
								<div className="auction w-full sm:w-4/6 flex xs:flex-row flex-col items-center gap-1 sm:hidden">
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
										adapterLocale={locale}>
										<DateTimePicker
											hideCalendarIcon={true}
											disablePast
											value={auctionState?.startDate}
											inputProps={{ readOnly: true, shrink: true }}
											onChange={handleDate1}
											minutesStep={30}
											{...(startDayDiff === 0 && {
												minTime:
													new Date().getMinutes() > 30 &&
														startIsDefaultValue == 0
														? moment(
															new Date(
																new Date(moment().add(1, "hours")).setMinutes(
																	0
																)
															)
														)
														: moment()
											})}
											inputFormat="YYYY/MM/DD"
											renderInput={(params) => {
												let a = params?.inputProps?.value || new Date();
												return (
													<>
														<div className="relative">
															<Box className=" absolute top-1/2 -translate-y-1/2 right-[13px] mt-[1.75px]">
																<Image
																	className="w-full h-full"
																	src={DateTimePickerIcon}
																	alt="DateTimePickerIcon
																	"
																/>
															</Box>
															<TextField
																{...params}
																sx={{
																	paddingLeft: "0px !important",
																	fontSize: "14px !important",
																	".MuiInputBase-input ": {
																		width: "100% !important",
																	}
																}}
															/>
														</div>
													</>
												);
											}}
										/>
									</LocalizationProvider>
									<span className="px-1">~</span>
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
										adapterLocale={locale}>
										<DateTimePicker
											value={auctionState?.endDate}
											inputProps={{ readOnly: true }}
											InputProps={{ shrink: true }}
											onChange={handleDate2}
											defaultValue="00:00"
											minDate={new Date(startDate).setDate(startDate?.$D + 1)}
											maxDate={new Date(startDate).setDate(startDate?.$D + 15)}
											inputFormat="YYYY/MM/DD"
											minutesStep={30}
											{...(endDayDiff === 0 && { minTime: startDt })}
											{...(isEndDate && { maxTime: startDt })}
											renderInput={(params) => {
												let a = params?.inputProps?.value || new Date();
												return (
													<>
														<div className=" relative ">
															<Box className=" absolute top-1/2 -translate-y-1/2 right-[13px] mt-[1.75px]">
																<Image
																	className="w-full h-full"
																	src={DateTimePickerIcon}
																	alt="DateTimePickerIcon"
																/>
															</Box>
															<TextField
																{...params}
																sx={{
																	paddingLeft: "0px !important",
																	fontSize: "14px !important",
																	".MuiInputBase-input ": {
																		width: "100% !important",
																	}
																}}
															/>
														</div>
													</>
												);
											}}
										/>
									</LocalizationProvider>
								</div>
								<div className="flex flex-row mt-[10px] text-[#9887FF] sm:text-[14px] text-[12px] gap-1 font-[400]">
									<div className="sm:w-[18px] sm:h-[18px] w-[14px] h-[14px]">
										<Image src={chatIcon} alt="chatIcon" />
									</div>
									<div>설정 가능한 최대 판매 기간은 15일입니다.</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full border-b-[1px] px-2 sm:px-0 border-[#353535] flex flex-col sm:flex-row items-start sm:items-center flex-wrap py-[15px] gap-[10px]">
						<div className="sm:w-1/4 flex items-center">
							<h5 className="lg:ml-4 sm:ml-2 text-[14px] sm:text-[16px] md:text-[18px] text-[#DDD] font-[500]">
								{startingPriceI18}
							</h5>
						</div>
						<div className="flex">
							<div className="w-full sm:w-12/12 flex items-center">
								<input
									type="number"
									onChange={handlePrice}
									value={auctionState.startingPrice || ""}
									className={`${true ? "border-[#FB3873]" : ""
										} rounded-md sm:py-[11px] py-[10px] sm:pr-[70px] sm:pl-[15px] pr-[10px] pl-[10px] border-[1px] border-[#5C5C5C] bg-black sm:text-[16px] text-[13px] font-400 w-full sm:min-w-[236px] min-w-[238px] placeholder-[#808080]`}
									inputMode="numeric"
									placeholder={plsEnterSellingPriceI18}
									pattern="[0-9]+"
								/>
								<p className="sm:text-[18px] text-[14px] text-[#FEFEFE] font-[400] mx-[10px]">
									{artDetail?.currency === "MATIC" ? "MATIC" : "EYES"}
								</p>
								{/*<div className="flex items-center text-[#666]">
                  { excreptWon(convertedCurrency) }
                  <FaWonSign />
                </div>*/}
							</div>
							<div className="md:w-4/12 flex py-2 sm:px-2 px-1">
								{auctionState.startingPrice == "" && (
									<p className="text-[#FB3873] sm:text-[16px] text-[12px]">{plsEnterSellingPriceI18}</p>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full rounded-[10px] mt-[20px]">
					<div className="w-full">
						<div className="mb-[11px] lg:ml-4 ml-2">
							<h5 className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#DDD] font-[500]">
								{noticeI18}
							</h5>
						</div>
						<div className="w-full bg-[#2F2E39] rounded-[10px]">
							<ul className="sm:text-[16px] text-[13px] text-[#DDD] font-[350] sm:p-[20px] p-[15px] sm:ml-0 pl-[35px] sm:tracking-tighter tracking-wider sm:leading-[24px] sm:list-none list-disc">
								<li className="mb-[5px]">{noticeTextLi1I18}</li>
								<li className="mb-[5px]">{noticeTextLi2I18}</li>
								<li className="mb-[5px]">{noticeTextLi3I18}</li>
								<li className="mb-[5px]">{noticeTextLi4I18}</li>
								<li className="mb-[5px]">{noticeTextLi5I18}</li>
								<li className="mb-[5px]">{noticeTextLi6I18}</li>
								<li className="mb-[5px]">{noticeTextLi7I18}</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-end sm:mt-[23px] mt-[18px]">
					<label
						htmlFor="checkbox"
						className="inline-flex pointer items-center">
						<Checkbox
							id="checkbox"
							onClick={handleAllow}
							checked={auctionState.isAllow}
						/>
						<p
							htmlFor="checkbox"
							className="ml-[4px] mr-[10px] text-[#B0B0B0] sm:text-[16px] text-[14px] font-[400]">
							{agreeI18}
						</p>
						{/* {!auctionState.isAllow && (
              <p className="text-[#FB3873]">{plsAgreeTermsI18}</p>
            )}
           */}
					</label>
				</div>
			</div>
			{generatedFees && (
				<div className="w-full sm:mt-[22px] text-[#333]">
					<h5 className="hidden sm:flex overflow-hidden text-[20px] text-white font-[700]">{commissionI18}</h5>
					<div className="sm:hidden">
						<div className="flex items-center gap-[7px] sm:pb-3 capitalize sm:mt-0 mt-[17px]">
							<div className="w-[5px] sm:h-[24px] h-[13px] bg-[#FB3873]" />
							<div className='text-[#fff] text-[14px] font-[500]'>{commissionI18} </div>
						</div>
					</div>
					<div className="flex items-center justify-between py-[15px] sm:mt-[5px] mt-[10px] border-b border-[#353535] text-white text-[18px] font-[400] max-w-[890px]">
						<p className="sm:text-[18px] text-[14px] font-[500] text-[#B0B0B0]">{artDetail?.resale ? resaleFeeI18 : salesCommissionI18}</p>
						<p className="sm:text-[18px] text-[14px] font-[400] text-[#fff]">{saleFee}%</p>
					</div>
					<div className="flex items-center justify-between py-[15px] border-b border-[#353535] text-white text-[18px] font-[400] max-w-[890px]">
						<p className="sm:text-[18px] text-[14px] font-[500] text-[#B0B0B0]">{creatorRoyaltyI18}</p>
						<p className="sm:text-[18px] text-[14px] font-[400] text-[#fff]">{artDetail?.royalty}%</p>
					</div>
				</div>
			)}
			<div className="w-full flex flex-col items-center justify-center sm:mt-[75px] mt-[60px]">
				<DisplayAuctionBtn
					mintStatus={artDetail?.mintStatus}
					handleSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
}

export default AuctionPanel;
