import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Checkbox from "Components/ui/checkbox/Checkbox";
import imgCLick from "public/Rectangle.png";
import icStar from "public/starIcon.svg";
import eyesicon from "public/eyesicon.svg";
import upload from "public/upload.svg";
import eyeswhite from "public/eyeswhite.png";
import matic_logo_white from "public/matic-logo-white.png";
import matic_logo from "public/matic-logo.png";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { CalendarPickerSkeleton } from "@mui/x-date-pickers";
import getDaysInMonth from "date-fns/getDaysInMonth";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FileUploader } from "react-drag-drop-files";
import useArtworkTranslation from "locale/useArtworkTranslation";
import usePopup from "Components/ui/popup/usePopup";
import useAlertTranslation from "locale/useAlertTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useArtwork from "./useArtwork";
import useCrud from "common/axios/crud";
import {
	apis,
	commonAudioTypes,
	commonNotImageTypes,
	fileTypes,
	imgTypes
} from "utils/libs";
import RadioBox from "Components/ui/radiobox/RadioBox";
import { FileHandler } from "utils/file";
import TenSecTempPlayer from "./tenSecTempPlayer";
import useProfile from "../user/profile/useProfile";
import { isMobile } from "react-device-detect";
import useCommonTranslation from "locale/useCommonTranslation";

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
	return new Promise((resolve, reject) => {
		const timeout = setTimeout(() => {
			const daysInMonth = getDaysInMonth(date);
			const daysToHighlight = [1, 2, 3].map(() =>
				getRandomNumber(1, daysInMonth)
			);

			resolve({ daysToHighlight });
		}, 500);

		signal.onabort = () => {
			clearTimeout(timeout);
			reject(new DOMException("aborted", "AbortError"));
		};
	});
}

export function TableRow({ row }) {
	return (
		<tr>
			<td className="p-3 text-[15px] font-light text-[#888888] min-w-[70px] border md:truncate border-[#ccc] text-left">
				{row.val1}
			</td>
			<td className="p-3 text-[15px] text-left font-light text-[#888888] border border-[#ccc]">
				{parse(row.val2.replace(/\n\r?/g, "<br />"))}
			</td>
		</tr>
	);
}

function CreateArtwork() {
	const { nerrorI18 } = useCommonTranslation();
	const requestAbortController = useRef(null);
	const { globalLoading, setGlobalLoading } = useGlobalContext();
	const [loadFile, setLoadFile] = useState(false);
	const { locale, push, query } = useRouter();
	const { getModel } = useCrud();
	const { competitionIsExpiredI18, enterCoverImageI18 } = useAlertTranslation();
	const {
		nftMintingApplicationI18,
		category: categoryI18,
		imgTitle: imgTitleI18,
		imgVal1,
		imgVal2,
		dragAttach,
		dragAttach1,
		uploadI18,
		essential,
		nickname,
		workTitle,
		inputPlaceholder,
		workDesc,
		authorIntroductionI18,
		textareaPlaceholder,
		selectPaymentMethod,
		plsSelectPaymentMethod,
		plsSelectAllrights,
		multiSelectionNotAllowed,
		paymentMethodDesc,
		retentionRights,
		areYouCreator,
		otherPeoples,
		yes,
		no,
		selectAll,
		ownership,
		creatorRoyalty,
		creatorWarning,
		copyrightHistory,
		withLicenseAgreement,
		noLicenseAgreement,
		th1,
		th2,
		th3,
		th4,
		th5,
		plsUploadLicenseAgreement,
		fileSelection,
		licenseTransactionWarning,
		commissionQuestion,
		registered,
		notRegistered,
		copyrightTitle,
		copyrightWarning: copyrightWarningI18,
		plsUploadCertificate,
		apply,
		workdescPlaceholder,
		allRightsI18,
		fileExt: fileExtI18,
		plsAttachContractI18,
		ifTitleKoreanI18,
		inBetaServiceI18,
		ifYoNotCreatorI18,
		competitionTitleI18,
		enteredEnglishI18,
		creatorRoyaltyI18,
		licenseText1I18,
		licenseText2I18,
		licenseText3I18,
		licenseText4I18,
		licenseText5I18,
		licenseText6I18,
		licenseText7I18,
		cannotMintArtWorkFromMobileI18
	} = useArtworkTranslation();

	const [currLicense, setCurrLicense] = useState(8)

	const { handleShowModal, MODAL_TYPES, hideModal, setGlobalModalState } = usePopup();
	const { authUser } = useAuthUser();
	const [isRenderThisPage, setIsRenderThisPage] = useState(true);
	const { dataURLtoFile } = FileHandler();
	const {
		getArtRights,
		artworkRights,
		getArtworkCategories,
		artworkCategories: categories,
		VideoToGif,
		setCoverNotImageFile,
		tenSecTemp,
		setTenSecTemp
	} = useArtwork();

	let endDate = new Date();
	endDate.setMonth(endDate.getMonth() + 1);

	//inner states
	const [artworkForm, setArtworkForm] = useState({});
	const [artworkFormError, setArtworkFormError] = useState({});
	const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
	const [isTitleEnglish, setIsTitleEnglish] = useState(true);
	const { profileUser } = useProfile();

	//formError functions
	function handleClearErrorFormByField(fieldname) {
		setArtworkFormError((prev) => ({ ...prev, [fieldname]: null }));
	}

	function handleCreateRoyalty() {
		handleShowModal(MODAL_TYPES.CREATE_ROYALTY);
	}

	function handleSetFormErrorByField(fieldname, errMsg) {
		setArtworkFormError((prev) => ({ ...prev, [fieldname]: errMsg }));
	}

	// form field functions
	function handleChangeValue(e) {
		const { value, name } = e.target;
		setArtworkForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleChangeTitle(e) {
		const { name, value } = e.target;
		let isAllowed = true;
		if (value && value.length > 0) {
			isAllowed = /^[a-zA-Z0-9(),-_.,$!#%&* ]+$/.test(value);
		}

		if (!isAllowed) {
			value.length > 0 ? setIsTitleEnglish(false) : setIsTitleEnglish(true);
			handleSetFormErrorByField(name, "only english characters allowed");
			setArtworkForm((prev) => ({ ...prev, [name]: "" }));
			return;
		} else {
			setIsTitleEnglish(true);
			handleChangeValue(e);
		}

		handleClearErrorFormByField(name);
	}

	function handleChangeArtDescription(e) {
		const { name, value } = e.target;
		if (!value || value === "") {
			handleSetFormErrorByField(name, "artWork description required");
			return;
		}
		handleClearErrorFormByField(name);
		handleChangeValue(e);
	}

	function handleCurrencyValue(value) {
		setArtworkForm((prev) => ({ ...prev, currency: value }));
	}

	function handleBooleanValue(e) {
		const { checked, name } = e.target;
		setArtworkForm((prev) => ({ ...prev, [name]: checked }));
	}

	function handleCreator(selectedRadioNumber) {
		setArtworkForm((prev) => ({ ...prev, areYouCreator: selectedRadioNumber }));
	}

	function handleLicenseRadio(selectedRadioNumber) {
		setArtworkForm((prev) => ({
			...prev,
			licenseHistoryRadio: selectedRadioNumber
		}));
	}

	function handleLicenceHistory(e) {
		const { checked, name } = e.target;
		const updatedRightList = artworkForm?.rightList.map((right, idx) => {
			return { ...right, isChecked: checked };
		});
		setArtworkForm((prev) => ({
			...prev,
			licenseHistory: checked,
			rightList: updatedRightList
		}));
	}

	function handleCheckedRightList(e, id) {
		const { checked, name } = e.target;
		const updatedRightList = artworkForm?.rightList.map((right) => {
			if (right.id === id) {
				return { ...right, isChecked: checked };
			}
			return right;
		});
		setArtworkForm((prev) => ({
			...prev,
			licenseHistory: true,
			rightList: updatedRightList
		}));
	}

	function handleCheckAll(e) {
		const { checked } = e.target;
		const updatedRightList = artworkForm?.rightList.map((right) => {
			return { ...right, isChecked: checked };
		});
		setArtworkForm((prev) => ({
			...prev,
			checkAll: checked,
			rightList: updatedRightList,
			isLoyalty: checked,
			licenseHistory: checked
		}));
	}

	const handleCoverImageChange = (file) => {
		setArtworkForm((prev) => ({
			...prev,
			coverImage: file
		}));
	};

	async function handleArtFileChange(file) {
		setLoadFile(true);
		if (commonNotImageTypes.includes(file?.type)) {
			const coverImage2 = await VideoToGif(file);
			if (coverImage2) {
				var newNotImageFile = dataURLtoFile(
					coverImage2,
					commonNotImageTypes.includes(file?.type)
						? "tempVideo.mp4"
						: "tempAudio.mp3"
				);
				setCoverNotImageFile(newNotImageFile);
				setTenSecTemp(URL.createObjectURL(newNotImageFile));
			}
		}
		setLoadFile(false);

		setArtworkForm((prev) => ({
			...prev,
			author: authUser?.nickName,
			file,
			img: URL.createObjectURL(file),
			coverImage2: newNotImageFile,
			tenSecTemp: newNotImageFile ? URL.createObjectURL(newNotImageFile) : null
		}));
	}

	function handleFileSizeError(fileError) {
		if (fileError) {
			setArtworkFormError((prev) => ({
				...prev,
				fileSize: "image size error"
			}));
			handleShowModal(MODAL_TYPES.ALERT_FILE_SIZE)
			return;
		}
	}

	function handleFileTypeError(typeError) {
		if (typeError) {
			setArtworkFormError((prev) => ({ ...prev, fileType: fileExtI18 }));
		}
	}

	function handleOnDropFile(file) {
		if (file) {
			setArtworkFormError((prev) => ({ ...prev, fileType: null }));
			return;
		}
	}

	function handleMonthChange(date) {
		if (requestAbortController.current) requestAbortController.current.abort();
		setGlobalLoading(true);
		setHighlightedDays([]);
		fetchHighlightedDays(date);
	}

	function fetchHighlightedDays(date) {
		const controller = new AbortController();
		fakeFetch(date, {
			signal: controller.signal
		})
			.then(({ daysToHighlight }) => {
				setHighlightedDays(daysToHighlight);
				setGlobalLoading(false);
			})
			.catch((error) => {
				if (error.name !== "AbortError") throw error;
			});
		requestAbortController.current = controller;
	}

	function handleDate(newValue, id, field) {
		const updatedLicenseList = artworkForm?.licenseList.map((license) => {
			if (license.id === id) {
				return { ...license, [field]: newValue };
			}
			return license;
		});
		setArtworkForm((prev) => ({ ...prev, licenseList: updatedLicenseList }));
	}

	function handleUpdateLicenseList(e, id) {
		const { name, value } = e.target;
		const updatedLicenseList = artworkForm?.licenseList.map((license) => {
			if (license.id === id) {
				return { ...license, [name]: value };
			}
			return license;
		});
		setArtworkForm((prev) => ({ ...prev, licenseList: updatedLicenseList }));
	}

	function handleLicenseFileUpload(e, id) {
		const { files } = e.target;
		// if (files && bannedFileType.includes(files[0].type)) {
		// 	alert("File type does not exist");
		// 	return;
		// }

		const updatedLicenseList = artworkForm?.licenseList.map((license) => {
			if (license.id === id) {
				if (!files.length) {
					return { ...license, docFileName: null, documentFile: null };
				}
				return {
					...license,
					docFileName: files[0].name,
					documentFile: files[0]
				};
			}
			return license;
		});
		setArtworkForm((prev) => ({ ...prev, licenseList: updatedLicenseList }));
	}

	function handleCopyright(selectedRadioNumber) {
		setArtworkForm((prev) => ({ ...prev, copyright: selectedRadioNumber }));
	}

	function handleCopyrightFile(e) {
		const { files } = e.target;
		if (files.length === 0) {
			return;
		}
		// if (bannedFileType.includes(files[0].type)) {
		// 	alert("File type does not exist");
		// 	return;
		// }
		setArtworkForm((prev) => ({
			...prev,
			copyrightFileName: files[0].name,
			copyrightFile: files[0]
		}));
	}

	function handleAddRow() {
		if (artworkRights?.length > 0) {
			const licences = artworkRights;
			const startDate = new Date().toISOString();
			const endDate = new Date().toISOString();
			const createdDate = new Date().toISOString();
			setArtworkForm((prev) => ({
				...prev,
				licenseList: [
					...artworkForm?.licenseList,
					{
						id: Math.random().toString().split(".")[1],
						licenseName: licences[0].code,
						documentFile: null,
						docFileName: null,
						startDate,
						endDate,
						createdDate
					}
				]
			}));
		}
	}

	function handleRemoveRowById(id) {
		const copyList = [...artworkForm?.licenseList];
		if (copyList.length > 1) {
			const updatedLicenseList = copyList.filter(
				(license) => license.id !== id
			);
			setArtworkForm((prev) => ({ ...prev, licenseList: updatedLicenseList }));
		}
		return;
	}

	function handleSubmitArtworkForm() {
		if (!artworkForm?.file) {
			handleShowModal(MODAL_TYPES.ALERT, { message: imgTitleI18 });
			return;
		}
		if (
			commonAudioTypes?.includes(artworkForm?.file?.type) &&
			!artworkForm?.coverImage
		) {
			handleShowModal(MODAL_TYPES.ALERT, { message: enterCoverImageI18 });
			return;
		}
		if (!artworkForm?.title) {
			handleShowModal(MODAL_TYPES.ALERT, { message: inputPlaceholder });
			return;
		}
		if (artworkFormError.title) {
			handleShowModal(MODAL_TYPES.ALERT, { message: ifTitleKoreanI18 });
			return;
		}
		if (!artworkForm?.artworkDescription) {
			handleShowModal(MODAL_TYPES.ALERT, { message: workdescPlaceholder });
			return;
		}
		if (artworkForm?.areYouCreator === 0) {
			handleShowModal(MODAL_TYPES.ALERT, { message: ifYoNotCreatorI18 });
			return;
		}
		if (!artworkForm?.isLoyalty) {
			handleShowModal(MODAL_TYPES.ALERT, { message: inBetaServiceI18 });
			return;
		}
		if (artworkForm?.licenseHistoryRadio === 1) {
			const isLicensesWithFile = artworkForm?.licenseList.some(
				(license) => license.documentFile !== null
			);
			//  license history - доо file оруулаагүй бол
			if (!isLicensesWithFile) {
				handleShowModal(MODAL_TYPES.ALERT, { message: plsAttachContractI18 });
				return;
			}
		}
		if (artworkForm?.copyright === 1 && !artworkForm?.copyrightFile) {
			handleShowModal(MODAL_TYPES.ALERT, {
				message: plsUploadCertificate
			});
			return;
		}
		handleShowModal(
			query?.competition
				? MODAL_TYPES.COMPETITION_CONFIRM
				: MODAL_TYPES.CREATE_ARTWORK,
			artworkForm
		);

		setGlobalModalState(prev => ({
			...prev,
			showSwitchNetworkModal: (modalType) => {
				hideModal();
				handleShowModal(modalType);
			}
		}))


	}

	async function fetchCompetitionDetail(competitionId) {
		try {
			const res = await getModel(apis.competitionDetail + competitionId, true);
			return res;
		} catch (err) {
			return err;
		}
	}

	useEffect(() => {
		// энэ хэсгийг өөр useEffect рүү битгий хийгээрэй адьяа
		getArtRights();
		getArtworkCategories();

	}, []);

	useEffect(() => {
		profileUser?.role !== "TAMTAM" ? setIsRenderThisPage(false) : setIsRenderThisPage(true);
	}, [profileUser])

	useEffect(() => {
		// set initial form & errors state
		if (artworkRights?.length > 0) {
			const licences = artworkRights;
			const extendedRightList = licences?.map((item) => ({
				id: item.id,
				code: item.code,
				name: allRightsI18[item.code],
				isChecked: false
			}));
			const startDate = new Date().toISOString();
			const endDate = new Date().toISOString();
			const createdDate = new Date().toISOString();
			setArtworkForm((prev) => ({
				...prev,
				currency: "MATIC",
				rightList: extendedRightList,
				loyaltyPercent: 0,
				isLoyalty: false,
				copyright: 0,
				copyrightFile: null,
				copyrightFileName: null,
				licenseHistoryRadio: 0,
				licenseList: [
					{
						id: Math.random().toString().split(".")[1],
						licenseName: licences[0].code,
						documentFile: null,
						docFileName: null,
						startDate,
						endDate,
						createdDate
					}
				],
				licenseTypes: licences
			}));

			setArtworkFormError((prev) => ({
				...prev,
				artworkDescription: "artWork description required"
			}));
		}
	}, [locale, artworkRights]);

	useEffect(() => {
		// set initial form category state after category data had been fetched
		if (categories?.length > 0)
			setArtworkForm((prev) => ({ ...prev, category: categories[0].id }));
		else return;
	}, [categories]);

	useEffect(() => {
		// /competitions - оос createArtwork руу орж байгаа үед
		if (query?.competition) {
			fetchCompetitionDetail(query?.competition).then((res) => {
				if (res.reason?.code === 401) {
					setGlobalLoading(true);
					alert(nerrorI18);
					setIsRenderThisPage(false);
					handleShowModal(MODAL_TYPES.LOGIN_POPUP);
					return;
				}
				if (res.reason?.code === 404) {
					alert(competitionIsExpiredI18);
					setIsRenderThisPage(false);
					push("/art/competitions");
					return;
				}
				const exceedCount = res?.message?.split(" ")[1] || null;
				if (exceedCount) {
					alert(`본 공모전은 최대 ${exceedCount}개 작품까지 응모 가능합니다.`);
					setIsRenderThisPage(false);
					push("/art/competitions");
					return;
				}
			});
			setArtworkForm((prev) => ({
				...prev,
				competitionId: query?.competition
			}));
		}
	}, [locale, query?.competition]);

	useEffect(() => {
		const isRightListAllNotChecked = artworkForm?.rightList?.every(right => (
			right.isChecked === false
		))
		if (isRightListAllNotChecked) {
			setArtworkForm(prev => ({
				...prev,
				licenseHistory: false
			}))
		}
	}, [artworkForm.rightList])

	return (
		<>
			{isMobile ?
				(<div className="flex flex-col justify-center gap-[140px] pt-[25px]">
					<h2 className="lg:text-[30px] text-[20px] text-center">
						{query?.competition
							? competitionTitleI18
							: nftMintingApplicationI18}
					</h2>
					<div className="flex flex-col gap-[34px]">
						<div className="relative h-[121px] w-[120px] mx-auto">
							<Image
								src={imgCLick}
								alt="imgCLick"
								layout="fill"
								objectFit="cover"
							/>
						</div>
						<span className=" whitespace-pre text-center">
							{cannotMintArtWorkFromMobileI18}
						</span>
					</div>
				</div>) :
				(isRenderThisPage ? (
					<div className="w-full min-h-screen flex flex-col justify-between pb-16">
						<div className="w-full min-h-screen flex flex-col">
							<div className="lg:pt-[50px] pt-[40px] w-full flex-1">
								<div className="container mx-auto px-4">
									<div className="flex w-full justify-between items-center">
										<div className="w-full text-center  font-bold text-[15px] md:text-2xl xl:text-4xl">
											<div>
												<h2 className="lg:text-[30px] text-[27px]">
													{query?.competition
														? competitionTitleI18
														: nftMintingApplicationI18}
												</h2>
												<br className="sm:hidden" />
											</div>
										</div>
									</div>
									<div className="w-full flex flex-col lg:flex-row gap-8 items-center mt-[80px]">
										<div className="bg-[#2B2B2B] flex flex-col  p-[30px] w-full lg:w-2/5 rounded-[5px] self-stretch border-t-[3px] border-[#FB3873]">
											{query?.competition ? (
												<h3 className="font-medium text-[20px] text-white">
													공모전에 출품할 작품을 업로드 해주세요
												</h3>
											) : (
												<h3 className="font-medium text-[20px] text-white">
													{imgTitleI18}
												</h3>
											)}
											<div className="flex items-center mt-2">
												<p className="font-[350px] text-[16px] text-[#B0B0B0]">
													{imgVal1}
												</p>
											</div>
											<div className="flex items-center">
												<p
													className={`${artworkFormError.fileSize
															? "text-[#FF0000] font-[350px]"
															: "text-[#B0B0B0] font-[350px]"
														} text-[16px]`}>
													{imgVal2}
												</p>
											</div>
											<div className={`artkworkFileUploader`}>
												<div className="hide">
													<FileUploader
														name="file"
														types={fileTypes}
														id="upload"
														maxSize="70"
														handleChange={handleArtFileChange}
														onSizeError={handleFileSizeError}
														onTypeError={handleFileTypeError}
														onDrop={handleOnDropFile}
														className="hide"
													/>
												</div>
												{loadFile ? (
													<div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
														<div className="border-t-transparent border-solid animate-spin  rounded-full border-[#FB3873] border-8 h-40 w-40"></div>
													</div>
												) : (
													<>
														{artworkForm?.img ? (
															<div className="w-full h-full top-0 left-0 flex justify-center items-center">
																<TenSecTempPlayer
																	img={artworkForm?.img}
																	tenSecTemp={tenSecTemp}
																	zurag={artworkForm?.file}
																/>
															</div>
														) : (
															<div className="relative lg:top-[190px] top-[150px] transform -translate-y-1/2 ">
																<div className="relative h-40 w-40 mx-auto">
																	<Image
																		src={imgCLick}
																		alt="imgCLick"
																		layout="fill"
																		objectFit="cover"
																	/>
																</div>
																<p className="font-light text-[15px] text-center justify-center items-center mt-4 text-[#666666]">
																	{dragAttach1}
																</p>
															</div>
														)}
														{!artworkForm?.img && (
															<div className=" bg-[#404040] absolute bottom-[72px] left-[50%] -translate-x-[50%] rounded-[5px]">
																<div className="flex items-center pt-[6px] pb-[8px] px-[20px]">
																	<div className="text-white font-medium">
																		{uploadI18}
																	</div>
																</div>
															</div>
														)}
													</>
												)}
											</div>
											{artworkForm?.img &&
												commonNotImageTypes.includes(artworkForm?.file.type) && (
													<div className={`artkworkFileUploader important100`}>
														<div className="hide">
															<FileUploader
																name="file"
																types={imgTypes}
																id="upload"
																maxSize="200"
																handleChange={handleCoverImageChange}
																onSizeError={handleFileSizeError}
																onTypeError={handleFileTypeError}
																className="hide"
															/>
														</div>
														<>
															{artworkForm?.coverImage ? (
																<div className="absolute w-full h-full top-0 left-0">
																	<Image
																		src={URL.createObjectURL(
																			artworkForm?.coverImage
																		)}
																		alt="coverImage"
																		layout="fill"
																		objectFit="contain"
																	/>
																</div>
															) : (
																<div className="relative lg:top-[190px] top-[150px] transform -translate-y-1/2 ">
																	<div className="relative h-40 w-40 mx-auto">
																		<Image
																			src={imgCLick}
																			alt="imgCLick"
																			layout="fill"
																			objectFit="cover"
																		/>
																	</div>
																	<p className="font-light text-[15px] text-center justify-center items-center mt-4 text-[#666666]">
																		{dragAttach}
																	</p>
																</div>
															)}

															{!artworkForm?.coverImage && (
																<div className="absolute bottom-12 left-[50%] -translate-x-[50%]">
																	<div className="flex items-center py-1 px-2 border border-gray-400 text-grey-400">
																		<Image className="flex" src={upload} alt="upload" />
																		<div className="text-[#999]">{uploadI18}</div>
																	</div>
																</div>
															)}
														</>
													</div>
												)}
										</div>
										<div className="lg:w-3/5 w-full bg-[#2B2B2B] p-6 xl:p-11 rounded-[5px]  border-t-[3px] border-[#FB3873]">
											<div>
												<div className="flex items-center font-medium text-white lg:text-[18px] sm:text-[18px] text-[15px] mb-2">
													<p className="ml-1">{categoryI18}</p>
												</div>
												<select
													value={artworkForm?.category}
													onChange={handleChangeValue}
													name="category"
													className={`overflow-auto cursor-pointer w-full px-3 focus:outline-none focus:border-[#FB3873] py-[7px] border rounded-md font-light text-[16px] border-[#5C5C5C] text-[#CCCCCC] placeholder-[#aaaaaa] bg-[#2B2B2B]`}>
													{categories?.length > 0 &&
														categories.map((cat, index) => (
															<option key={`cat-${index}`} value={cat.id}>
																{locale === 'en' ? cat.nameEn.toUpperCase() : cat.name}
															</option>
														))}
												</select>
											</div>
											<div className="mt-5">
												<div className="flex items-center font-medium text-white lg:text-[18px] sm:text-[18px] text-[15px] mb-2">
													<p className="ml-1">{nickname}</p>
												</div>
												<input
													type="text"
													className={`bg-[#2B2B2B] overflow-auto w-full px-3 cursor-not-allowed focus:outline-none focus:border-[#FB3873] py-[7px] border rounded-md font-light text-[16px] ${artworkFormError.name
															? "border-[#FB3873]"
															: "border-[#5C5C5C]"
														} text-[#575757] placeholder-[#575757]`}
													placeholder={inputPlaceholder}
													name="author"
													value={authUser?.nickName}
													disabled
													maxLength={100}
												/>
											</div>
											<div className="mt-5">
												<div className="flex flex-row items-center justify-between">
													<div className="flex items-center font-medium text-white lg:text-[18px] sm:text-[18px] text-[15px] mb-2">
														<p className="ml-1 flex items-center">
															{workTitle}
															<span className="text-[#FB3873] text-[14px] font-[350px]">
																{essential}
															</span>
														</p>
													</div>
													<div className="flex">
														<p
															className={`${isTitleEnglish
																	? "text-[#E7E7E7]"
																	: "text-[#FB3873] font-bold"
																}  mx-2 gap-1 text-[14px] font-[350px]`}>
															<span className="">*</span>
															{enteredEnglishI18}
														</p>
													</div>
												</div>
												<input
													name="title"
													type="text"
													className={`bg-[#0F1111] overflow-auto w-full px-3 focus:outline-none focus:border-[#FB3873] py-[7px] border rounded-md font-light text-[16px] ${artworkFormError.name
															? "border-[#FB3873]"
															: "border-[#5C5C5C]"
														} text-[#fff] placeholder-[#494949]`}
													placeholder={inputPlaceholder}
													value={artworkForm?.title}
													onChange={(e) => handleChangeTitle(e)}
													maxLength={100}
												/>
											</div>
											<div className="mt-5">
												<div className="flex items-center justify-between">
													<div className="flex items-center font-medium text-white lg:text-[18px] sm:text-[18px] text-[15px] mb-2">
														<p className="ml-1 flex items-center">
															{workDesc}
															<span className="text-[#FB3873] text-[14px] font-[350px]">
																{essential}
															</span>
														</p>
													</div>
												</div>
												<textarea
													name="artworkDescription"
													placeholder={workdescPlaceholder}
													cols="30"
													value={artworkForm?.description}
													onChange={(e) => handleChangeArtDescription(e)}
													className={`bg-[#0F1111] resize-none w-full border focus:outline-none focus:border-[#FB3873] rounded-md px-3 py-[7px] font-light text-[16px] ${artworkFormError.name
															? "border-[#FB3873]"
															: "border-[#5C5C5C]"
														} text-[#fff] h-[70px] placeholder-[#494949]`}
													maxLength={300}
												/>
											</div>
											<div className="mt-3">
												<div className="flex items-center justify-between">
													<div className="flex items-center font-medium text-white lg:text-[18px] sm:text-[18px] text-[15px] mb-2">
														<p className="ml-1">{authorIntroductionI18}</p>
													</div>
												</div>
												<textarea
													name="creatorDescription"
													placeholder={textareaPlaceholder}
													cols="30"
													value={artworkForm?.authorInfo}
													onChange={handleChangeValue}
													className="bg-[#0F1111] resize-none w-full border focus:outline-none focus:border-[#FB3873] rounded-md px-3 py-[7px] font-light text-[16px] border-[#5C5C5C] text-[#fff] h-[70px] placeholder-[#494949]"
													maxLength={500}
												/>
											</div>
										</div>
									</div>
									<div className="w-full  bg-[#2B2B2B] px-[30px] py-[32px] mt-[50px] rounded-[5px] border-t-[3px] border-[#FB3873]">
										<h5 className="font-medium lg:text-[18px] sm:text-[18px] text-[15px] flex items-center">
											{selectPaymentMethod}
										</h5>
										<div className="font-[350px] lg:text-[18px] sm:text-[18px] text-[15px] text-[#DDD] mt-5">
											{plsSelectPaymentMethod}
											<span className="text-[#FB3873] text-[14px] font-[350px] ml-1">
												{multiSelectionNotAllowed}
											</span>
										</div>
										<div className="flex flex-auto text-white sm:mt-0 pt-4">
											<div
												onClick={() => handleCurrencyValue("MATIC")}
												className={`cursor-pointer flex items-center rounded-md py-2.5 px-8 mr-3 ${artworkForm?.currency === "MATIC"
														? "bg-[#6319FF]"
														: "bg-[#252525] text-[#fff] border border-[#5C5C5C] lg:text-[18px] sm:text-[18px] text-[15px] font-[500]"
													}`}>
												<Image
													width={17}
													height={17}
													src={
														artworkForm?.currency === "MATIC"
															? matic_logo_white
															: matic_logo
													}
													alt="artwork-currency"
												/>
												<div className="ml-2">MATIC</div>
											</div>
											<div
												onClick={() => handleCurrencyValue("EYES")}
												className={`cursor-pointer flex items-center rounded-md py-2.5 px-5  ${artworkForm?.currency === "EYES"
														? "bg-[#6319FF] text-[#fff] lg:text-[18px] sm:text-[18px] text-[15px] font-[500]"
														: "bg-[#252525] text-[#fff] border border-[#5C5C5C] lg:text-[18px] sm:text-[18px] text-[15px] font-[500]"
													}`}>
												<Image

													width={20}
													height={14}
													src={
														artworkForm?.currency === "EYES"
															? eyeswhite
															: eyesicon
													}
													alt="artwork-currency"
												/>
												<div className="ml-2">EYES</div>
											</div>
										</div>
										<div className="py-[10px] px-[15px] flex items-start bg-[#333333] mt-5 gap-[5px]">
											<div className="relative w-[24px] h-[24px] flex items-center">
												<Image
													layout="fill"
													objectFit="cover"
													src={icStar}
													alt="icStar"
												/>
											</div>
											<div className="text-[16px] font-[350px] flex-1 text-[#8E8E8E]">
												{paymentMethodDesc}
											</div>
										</div>
									</div>
									<div className="w-full  bg-[#2B2B2B] py-[32px] px-[30px] rounded-[5px] border-t-[3px] border-[#FB3873] mt-[50px]">
										<h2 className="font-medium lg:text-[24px] sm:text-[24px] text-[15px] flex items-center">
											{retentionRights}
										</h2>
										<div className="font-regular flex items-center flex-wrap lg:text-[18px] sm:text-[18px] text-[15px] text-[#ECECEC] mt-[30px]">
											{areYouCreator}
											<span className="text-[#FB3873] text-[14px] font-[350px] pl-1">
												{otherPeoples}
											</span>
										</div>
										<div className="flex items-center sm:gap-8  mt-[15px] flex-wrap">
											<div className="flex items-center gap-8">
												<label
													htmlFor="checkbox1"
													className="flex pointer items-center">
													<RadioBox
														id="radio1"
														name="areYouCreator"
														value={1}
														onChange={() => handleCreator(1)}
														checked={artworkForm?.areYouCreator === 1}
													/>
													<p className="font-[400] text-[#B0B0B0] lg:text-[18px] sm:text-[18px] text-[15px] ml-1">
														{yes}
													</p>
												</label>

												<label
													htmlFor="checkbox2"
													className="flex pointer items-center">
													<RadioBox
														id="radio2"
														name="areYouCreator"
														value={0}
														onChange={() => handleCreator(0)}
														checked={artworkForm?.areYouCreator === 0}
													/>
													<p className="font-[400] text-[#B0B0B0] lg:text-[18px] sm:text-[18px] text-[15px] ml-1">
														{no}
													</p>
												</label>
											</div>
										</div>
										<div className="border-b border-[#5C5C5C] my-[40px]"></div>
										<div className="font-[400] lg:text-[18px] sm:text-[18px] text-[15px] text-[#DDD] gap-[30px] flex">
											<div>
												<span>{plsSelectAllrights}</span>
												<span className="text-[#FB3873] text-[14px] ml-1 font-[350px]">
													(필수)
												</span>
											</div>
											<label htmlFor="checkbox3">
												<div className="flex pointer items-center">
													<Checkbox
														id="checkbox3"
														checked={artworkForm?.checkAll}
														onChange={handleCheckAll}
													/>
													<p className="font-[400] text-[#B0B0B0] lg:text-[18px] sm:text-[18px] text-[15px] ml-1 truncate">
														{selectAll}
													</p>
												</div>
											</label>
										</div>
										<div className="flex items-center mt-3 gap-[21px]">
											<label htmlFor="checkbox4">
												<div className="flex pointer items-center">
													<Checkbox
														id="isLoyalty"
														name="isLoyalty"
														checked={artworkForm?.isLoyalty}
														onChange={handleBooleanValue}
													/>
													<p className="font-[400] lg:text-[18px] sm:text-[18px] text-[15px] text-[#B0B0B0] mx-1">
														{ownership}
													</p>
												</div>
											</label>
											{artworkForm?.isLoyalty && (
												<div className="font-light text-[15px] flex gap-2 items-center">
													<span className="mr-2 text-[#606d92] font-small sm:font-medium text-[12px] sm:text-[16px]">
														{creatorRoyalty}
													</span>
													<BsQuestionCircle className="text-[#9887FF] w-[18px] h-[18px]" />
													<span
														onClick={handleCreateRoyalty}
														className="text-[#9887FF] lg:text-[18px] sm:text-[18px] text-[15px] font-[350px] cursor-pointer">
														{creatorRoyaltyI18}
													</span>
													<select
														name="loyaltyPercent"
														value={artworkForm?.loyaltyPercent}
														onChange={handleChangeValue}
														className="border border-[#6219FF] w-max sm:w-[73px] rounded-[5px] px-1 h-[29px] font-light text-[16px] text-[#fff] bg-[#6219FF]">
														<option value={"0"}>0%</option>
														<option value={"1"}>1%</option>
														<option value={"2"}>2%</option>
														<option value={"3"}>3%</option>
														<option value={"4"}>4%</option>
														<option value={"5"}>5%</option>
														<option value={"6"}>6%</option>
														<option value={"7"}>7%</option>
														<option value={"8"}>8%</option>
														<option value={"9"}>9%</option>
														<option value={"10"}>10%</option>
													</select>
												</div>
											)}
										</div>
										<div className="flex items-center flex-wrap mt-3 gap-3">
											<label
												htmlFor="checkbox5"
												className="flex pointer items-center mr-1 ">
												<Checkbox
													id={"licenseHistory"}
													name="licenseHistory"
													checked={artworkForm?.licenseHistory}
													onChange={handleLicenceHistory}
												/>
												<p className="font-[400] lg:text-[18px] sm:text-[18px] text-[15px] text-[#B0B0B0] ml-1">
													{copyrightHistory}
												</p>
											</label>
											<div
												className={`flex flex-wrap ${currLicense < 8 && "pb-1"} gap-2 ${locale === "en" ? "text-xs" : "text-base"
													}`}>
												(
												{artworkForm?.rightList?.map((el, idx) => (
													<label
														key={`right-${idx}`}
														htmlFor={`checkbox-${idx}`}
														className="flex pointer items-center mr-1"
														onMouseEnter={() => setCurrLicense(idx)}
														onMouseLeave={() => setCurrLicense(8)}
													>
														<Checkbox
															id={"right-list-" + idx}
															name={el.code}
															checked={el.isChecked}
															onChange={(e) => handleCheckedRightList(e, el.id)}
														/>
														<p className="font-[400] lg:text-[18px] sm:text-[18px] text-[15px] hover:text-[#fff] text-[#B0B0B0] ml-1">
															{allRightsI18[el.code]}
														</p>
													</label>
												))}
												)
											</div>
										</div>
										{currLicense < 8 && <div className="bg-[#080808] text-[16px] font-[350px] rounded-full m-2 px-[15px] py-1 tracking-tighter text-[#8E8E8E]">
											{
												[licenseText1I18,
													licenseText2I18,
													licenseText3I18,
													licenseText4I18,
													licenseText5I18,
													licenseText6I18,
													licenseText7I18
												][currLicense]
											}
										</div>}
										<div className="py-[10px] px-[15px] flex gap-[5px] items-start bg-[#333333]">
											<div className="relative w-[24px] h-[24px]">
												<Image
													layout="fill"
													objectFit="cover"
													src={icStar}
													alt="icStar"
												/>
											</div>
											<div className="text-[16px] font-[350] flex-1 text-[#8E8E8E] text-justify ">
												{creatorWarning}
											</div>
										</div>
										<div className="border-b border-[#5C5C5C] my-[40px]"></div>
										<div className="font-normal lg:text-[18px] sm:text-[18px] text-[15px] text-[#ECECEC]">
											{copyrightHistory}
										</div>
										<div className="flex  mt-[12px]">
											<div className="flex items-center flex-wrap">
												<label
													htmlFor="checkbox13"
													className="flex pointer items-center mr-[25px] ml-1">
													<RadioBox
														id="withLicense"
														name="withLicense"
														value={artworkForm?.licenseHistoryRadio}
														checked={artworkForm?.licenseHistoryRadio === 1}
														onChange={() => handleLicenseRadio(1, true)}
													/>
													<p className="font-[400px] lg:text-[18px] sm:text-[18px] text-[15px] text-[#B0B0B0] ml-1">
														{withLicenseAgreement}
													</p>
												</label>
												<label
													htmlFor="checkbox14"
													className="flex pointer items-center">
													<RadioBox
														id="withoutLicense"
														name="withLicense"
														value={artworkForm?.licenseHistoryRadio}
														checked={artworkForm?.licenseHistoryRadio === 0}
														onChange={() => handleLicenseRadio(0)}
													/>
													<p className="font-[400px] lg:text-[18px] sm:text-[18px] text-[15px] text-[#B0B0B0] ml-1">
														{noLicenseAgreement}
													</p>
												</label>
											</div>
										</div>
										{artworkForm?.licenseHistoryRadio === 1 && (
											<div className="mt-4 overflow-x-auto">
												<table className="border-collapse overflow-x-auto">
													<thead className="w-full bg-[#2F2E39] text-[#ECECEC] lg:text-[18px] sm:text-[18px] text-[15px]">
														<tr className="font-light lg:text-[18px] sm:text-[18px] text-[15px] border-b border-[#373737]">
															<th className="py-[11px] border-r border-[#3E3E3E]">
																{th1}
															</th>
															<th className="border-r border-[#3E3E3E]">{th2}</th>
															<th className="border-r border-[#3E3E3E]">{th3}</th>
															<th className="border-r border-[#3E3E3E]">{th4}</th>
															<th className="border-r border-[#3E3E3E]">{th5}</th>
														</tr>
													</thead>
													<tbody>
														{artworkForm?.licenseList?.length > 0 &&
															artworkForm?.licenseList?.map((license, index) => {
																return (
																	<tr
																		key={`row-${index}`}
																		className="text-center border-b border-[#373737]">
																		<td className="border-r border-[#3E3E3E]">
																			<div>
																				<select
																					name="licenseName"
																					onChange={(e) =>
																						handleUpdateLicenseList(e, license.id)
																					}
																					className="bg-[#2B2B2B] rounded-md border border-[#5C5C5C] w-[210px] px-2 h-[40px] font-light text-[15px] text-[#aaaaaa]"
																					defaultValue={
																						artworkForm?.rightList[0]
																							? allRightsI18[
																							artworkForm?.rightList[0].code
																							]
																							: ""
																					}>
																					{artworkForm?.rightList.map(
																						(right, index) => (
																							<option
																								key={index}
																								value={right.code
																									.split("(")[0]
																									.trim()}>
																								{allRightsI18[right.code]
																									.split("(")[0]
																									.trim()}
																							</option>
																						)
																					)}
																				</select>
																			</div>
																		</td>
																		<td className="border-r border-[#3E3E3E]">
																			<div className="createArtwork flex items-center justify-center mt-2 sm:mt-0 text-[16px] font-[600]">
																				<LocalizationProvider
																					dateAdapter={AdapterDateFns}>
																					<DatePicker
																						value={license.startDate}
																						loading={globalLoading}
																						inputFormat="yyyy/MM/dd"
																						mask="____/__/__"
																						name="startDate"
																						onChange={(newValue) =>
																							handleDate(
																								newValue,
																								license.id,
																								"startDate"
																							)
																						}
																						slots={{
																							openPickerIcon: DateIcon
																						}}
																						onMonthChange={handleMonthChange}
																						renderInput={(params) => (
																							<div className="relative">
																								<TextField
																									sx={{
																										".MuiSvgIcon-root": {
																											zIndex: 10,
																											opacity: 0
																										},
																										".MuiInputBase-input": {}
																									}}
																									{...params}
																								/>
																								<DateIcon />
																							</div>
																						)}
																						renderLoading={() => (
																							<CalendarPickerSkeleton />
																						)}
																						renderDay={(
																							day,
																							_value,
																							DayComponentProps
																						) => {
																							const isSelected =
																								!DayComponentProps.outsideCurrentMonth &&
																								highlightedDays.indexOf(
																									day.getDate()
																								) > 0;

																							return (
																								<PickersDay
																									{...DayComponentProps}
																								/>
																							);
																						}}
																					/>
																				</LocalizationProvider>
																				<span className="mx-2">~</span>
																				<LocalizationProvider
																					dateAdapter={AdapterDateFns}>
																					<DatePicker
																						value={license.endDate}
																						loading={globalLoading}
																						inputFormat="yyyy/MM/dd"
																						mask="____/__/__"
																						onChange={(newValue) =>
																							handleDate(
																								newValue,
																								license.id,
																								"endDate"
																							)
																						}
																						onMonthChange={handleMonthChange}
																						renderInput={(params) => (
																							<div className="relative">
																								<TextField
																									sx={{
																										".MuiSvgIcon-root": {
																											zIndex: 10,
																											opacity: 0
																										},
																										".MuiInputBase-input": {}
																									}}
																									{...params}
																								/>
																								<DateIcon />
																							</div>
																						)}
																						renderLoading={() => (
																							<CalendarPickerSkeleton />
																						)}
																						renderDay={(
																							day,
																							_value,
																							DayComponentProps
																						) => {
																							const isSelected =
																								!DayComponentProps.outsideCurrentMonth &&
																								highlightedDays.indexOf(
																									day.getDate()
																								) > 0;

																							return (
																								<PickersDay
																									{...DayComponentProps}
																								/>
																							);
																						}}
																					/>
																				</LocalizationProvider>
																			</div>
																		</td>
																		<td className="border-r border-[#3E3E3E]">
																			<div className="createArtwork flex ins justify-center items-center mt-2 sm:mt-0 text-[16px] font-[600]">
																				<LocalizationProvider
																					dateAdapter={AdapterDateFns}>
																					<DatePicker
																						value={license.createdDate}
																						loading={globalLoading}
																						inputFormat="yyyy/MM/dd"
																						mask="____/__/__"
																						onChange={(newValue) =>
																							handleDate(
																								newValue,
																								license.id,
																								"createdDate"
																							)
																						}
																						onMonthChange={handleMonthChange}
																						renderInput={(params) => (
																							<div className="relative">
																								<TextField
																									sx={{
																										".MuiSvgIcon-root": {
																											zIndex: 10,
																											opacity: 0
																										},
																										".MuiInputBase-input": {}
																									}}
																									{...params}
																								/>
																								<DateIcon />
																							</div>
																						)}
																						renderLoading={() => (
																							<CalendarPickerSkeleton />
																						)}
																						renderDay={(
																							day,
																							_value,
																							DayComponentProps
																						) => {
																							const isSelected =
																								!DayComponentProps.outsideCurrentMonth &&
																								highlightedDays.indexOf(
																									day.getDate()
																								) > 0;

																							return (
																								<PickersDay
																									{...DayComponentProps}
																								/>
																							);
																						}}
																					/>
																				</LocalizationProvider>
																			</div>
																		</td>
																		<td className="py-[10px] border-r border-[#3E3E3E]">
																			<div className="flex justify-center items-center">
																				<input
																					type="file"
																					id={"docFile" + license.id}
																					hidden
																					onChange={(e) =>
																						handleLicenseFileUpload(e, license.id)
																					}
																				/>
																				{license.docFileName ? (
																					<div className="w-full font-[400] text-[16px] flex items-center text-[#6D6D6D] border border-[#5C5C5C] py-[6px] px-[15px] rounded-[5px] mr-2 truncate">
																						{license.docFileName}
																					</div>
																				) : (
																					<div className=" min-w-[262px] w-full font-[400] text-[16px] flex items-center text-[#4C4C4C] border border-[#5C5C5C] py-[6px] px-[15px] rounded-[5px] mr-2 truncate">
																						{plsUploadLicenseAgreement}
																					</div>
																				)}
																				<label htmlFor={"docFile" + license.id}>
																					<div className="flex px-[15px] py-[6px] justify-center items-center rounded-[5px] bg-[#404040] cursor-pointer min-w-[101px]">
																						<p className="font-medium text-[16px] text-[#fff]">
																							{uploadI18}
																						</p>
																					</div>
																				</label>
																			</div>
																		</td>
																		<td className="py-[10px] border-r border-[#3E3E3E]">
																			<div className="flex items-center gap-1 justify-center">
																				<div
																					className="cursor-pointer w-[25px] h-[25px] border border-[#404040] rounded-lg flex items-center justify-center text-[12px] font-bold text-[#fff] bg-[#404040]"
																					onClick={() =>
																						handleRemoveRowById(license.id)
																					}>
																					<div className="flex items-center justify-center">
																						<AiOutlineMinus />
																					</div>
																				</div>
																				{index === 0 && (
																					<div
																						className="cursor-pointer w-[25px] h-[25px] border border-[#404040] rounded-lg flex items-center justify-center text-[12px] font-bold text-[#fff] bg-[#404040]"
																						onClick={handleAddRow}>
																						<AiOutlinePlus />
																					</div>
																				)}
																			</div>
																		</td>
																	</tr>
																);
															})}
													</tbody>
												</table>
											</div>
										)}

										<div className="py-[10px] px-[15px] flex items-start gap-[5px] bg-[#333333] mt-[10px]">
											<div className="relative w-[24px] h-[24px]">
												<Image
													layout="fill"
													objectFit="cover"
													src={icStar}
													alt="icStar"
												/>
											</div>
											<div className="text-[16px] font-[350] flex-1 text-[#8E8E8E]">
												{licenseTransactionWarning}
											</div>
										</div>
									</div>
									<div className="w-full  bg-[#2B2B2B] py-[32px] px-[30px] rounded-[5px] border-t-[3px] border-[#FB3873] mt-[50px]">
										<h5 className="font-medium lg:text-[18px] sm:text-[18px] text-[15px]  flex items-center">
											{copyrightTitle}
										</h5>
										<div className="font-normal lg:text-[18px] sm:text-[18px] text-[15px] text-[#ECECEC] mt-6 mb-[15px]">
											{commissionQuestion}
										</div>
										<div className="flex  mt-2">
											<div className="flex items-center">
												<label
													htmlFor="checkbox15"
													className="flex pointer items-center ml-1 mr-5">
													<RadioBox
														id="radio1"
														name="isCopyright"
														value={1}
														onChange={() => handleCopyright(1)}
														checked={artworkForm?.copyright === 1}
													/>
													<p className="font-light lg:text-[18px] sm:text-[18px] text-[15px] text-[#B0B0B0] ml-1">
														{registered}
													</p>
												</label>
												<label
													htmlFor="checkbox16"
													className="flex pointer items-center ml-1">
													<RadioBox
														id="radio1"
														name="isCopyright"
														value={0}
														onChange={() => handleCopyright(0)}
														checked={artworkForm?.copyright === 0}
													/>
													<p className="font-light lg:text-[18px] sm:text-[18px] text-[15px] text-[#B0B0B0] ml-1">
														{notRegistered}
													</p>
												</label>
											</div>
										</div>
										{artworkForm?.copyright === 1 && (
											<div className="items-center mt-[30px] gap-2">
												<div className="text-[#FB3873] text-[14px] font-[350px] pb-2">
													{copyrightWarningI18}
												</div>
												<div className="flex gap-2">
													<input
														type="file"
														accept=".jpg, .png, .gif, .pdf, .txt, .doc, .docx, .xls, .xlsx"
														id="copyrightFileName"
														hidden
														onChange={(e) => handleCopyrightFile(e)}
													/>
													{artworkForm?.copyrightFileName ? (
														<div className="w-[430px]  font-[400] text-[16px] flex items-center text-[#6D6D6D] border border-[#5C5C5C] py-[6px] px-[10px] rounded-[5px] mr-2 truncate">
															{artworkForm?.copyrightFileName}
														</div>
													) : (
														<div className="w-[430px] font-[400] text-[16px] flex items-center text-[#6D6D6D] border border-[#5C5C5C] py-[6px] px-[10px] rounded-[5px] mr-2 truncate">
															{plsUploadCertificate}
														</div>
													)}
													<label htmlFor="copyrightFileName">
														<div className="w-full cursor-pointer border border-[#404040] pt-[4px] pb-[5px] px-[20px] rounded-[5px] bg-[#404040] no-underline flex items-center justify-center">
															<p className="font-light text-[#fff] lg:text-[18px] sm:text-[18px] text-[15px]">
																{fileSelection}
															</p>
														</div>
													</label>
												</div>
											</div>
										)}
									</div>
									<div className="flex justify-center items-center lg:pt-[75px] pt-[20px] lg:mb-[100px] pb-[40px]">
										<button
											onClick={handleSubmitArtworkForm}
											className={`mr-2 flex w-[130px] py-[10px] px-[25px] justify-center items-center rounded-[5px] ${artworkForm?.isLoyalty &&
													(["video/mp4", "video/avi", "video/quicktime"].includes(
														artworkForm?.file?.type
													) ||
														[
															"image/jpeg",
															"image/gif",
															"image/jpg",
															"image/png"
														].includes(artworkForm?.file?.type) ||
														(["audio/mpeg", "audio/wav", "audio/mp3"].includes(
															artworkForm?.file?.type
														) &&
															artworkForm?.coverImage) ||
														["image/jpeg", "image/gif", "image/jpg"].includes(
															artworkForm?.file?.type
														)) &&
													artworkForm?.areYouCreator === 1
													? "bg-[#FB3873] cursor-pointer"
													: "bg-[#252525] cursor-not-allowed"
												}`}>
											<p className="font-medium text-white text-[20px]">
												{apply}
											</p>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null)
			}
		</>
	);
}

const DateIcon = () => {
	return (
		<span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ">
			<svg
				width="19"
				height="19"
				viewBox="0 0 19 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M0.738281 5.99902H17.7383M4.51606 0.999023V2.99902M13.9605 0.999023V2.99902M3.57161 9.99902H5.4605M3.57161 13.999H5.4605M8.29384 9.99902H10.1827M8.29384 13.999H10.1827M13.0161 9.99902H14.9049M13.0161 13.999H14.9049M3.7605 17.999H14.7161C15.7739 17.999 16.3029 17.999 16.7069 17.781C17.0623 17.5893 17.3513 17.2833 17.5324 16.907C17.7383 16.4792 17.7383 15.9191 17.7383 14.799V5.19902C17.7383 4.07892 17.7383 3.51887 17.5324 3.09104C17.3513 2.71472 17.0623 2.40876 16.7069 2.21701C16.3029 1.99902 15.7739 1.99902 14.7161 1.99902H3.7605C2.70263 1.99902 2.17369 1.99902 1.76963 2.21701C1.41422 2.40876 1.12525 2.71472 0.944158 3.09104C0.738281 3.51887 0.738281 4.07892 0.738281 5.19902V14.799C0.738281 15.9191 0.738281 16.4792 0.944158 16.907C1.12525 17.2833 1.41422 17.5893 1.76963 17.781C2.17369 17.999 2.70263 17.999 3.7605 17.999Z"
					stroke="#C2C2C2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
	);
};

export default CreateArtwork;
