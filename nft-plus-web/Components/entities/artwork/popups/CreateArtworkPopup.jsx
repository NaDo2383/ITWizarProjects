/**
 * @createdBy Duka 2023/6
 */
import React, { useEffect, useState } from "react";
import MainPopup from "../../../ui/popup/MainPopup";
import usePopup from "../../../ui/popup/usePopup";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import Image from "next/image";
import headIco from "public/headIcon.svg";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { PlayCircle } from "@mui/icons-material";
import { VolumeUp } from "@mui/icons-material";
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import closeIcon from "public/close.svg";
import useMypageTranslation from "locale/useMypageTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useArtwork from "Components/entities/artwork/useArtwork";
import useFee from "Components/entities/artwork/useFee";
import {
	commonAudioTypes,
	commonNotImageTypes,
	commonVideoTypes
} from "utils/libs";
import EditRow from "Components/ui/table/Row";

function CreateArtworkPopup() {
	const { push } = useRouter();
	const {
		method_paymentI18,
		ownershipI18,
		edit_btnI18,
		license_agreement_detailsI18,
    	license_agreement_details2I18,
		requestTitleI18
	} = useMypageTranslation();
	const {
		apply: applyI18,
		artWorkDescI18,
		author_descI18,
		workTitle,
		workInformation,
		retention,
		charge,
		creator_royaltyI18,
		doesnt_existI18,
		copyrightLicenseI18,
		copyright_registeredI18,
		NFT_issuanceI18,
		allRightsI18,
		caseI18,
	} = useArtworkTranslation();
	const [artwork, setArtwork] = useState(null);
	const {
		hideModal,
		hideAllModals,
		getCurrentModalprops,
		popupProps,
		handleShowModal,
		MODAL_TYPES
	} = usePopup();
	const { saveArtwork } = useArtwork();
	const { getFee }  = useFee();
	const [ fee , setFee] = useState(0);
	const [licenseCases, setLicenseCases] = useState([]);
	const checkedRightList = artwork?.rightList.filter(
		(right) => right.isChecked === true
	);

	function handleSubmit() {
		const newCheckedRightList = checkedRightList.map((item) => ({
			id: item.id,
			code: item.code,
			forSell: false
		}));

		const realLicenseList = artwork?.licenseList.map((item) => ({
			documentFile: item.documentFile,
			startDate: item.startDate,
			endDate: item.endDate,
			contractDate: item.createdDate,
			right: newCheckedRightList.filter(
				(checkedItem) => checkedItem.code === item.licenseName
			)[0]
		}));

		const formData = {
			name: artwork?.title,
			description: artwork?.artworkDescription,
			artistDescription: artwork?.creatorDescription,
			category: artwork?.category,
			rights: newCheckedRightList,
			royalty: artwork?.loyaltyPercent,
			image: artwork?.file,
			coverImage: artwork?.coverImage,
			coverImage2: artwork?.coverImage2,
			contractDocuments: realLicenseList,
			ownsArt: artwork?.areYouCreator === 1 ? true : false,
			currency: artwork?.currency,
			copyrightRegistered: artwork?.copyrightFile ? true : false,
			copyrightFile: artwork?.copyrightFile,
			price: "0"
		};

		// console.log(formData)

		const form = new FormData();
		form.append("name", formData.name);
		form.append("description", formData.description);
		form.append("artistDescription", formData.artistDescription);
		form.append("categoryId", formData.category);
		form.append("royalty", formData.royalty);
		form.append("image", formData.image);
		formData.coverImage && form.append("coverImage", formData.coverImage); // coverimage
		formData.coverImage2 && form.append("coverImage2", formData.coverImage2); //video || audio
		if (formData?.rights?.length > 0) {
			for (let i = 0; i < formData.rights.length; i++) {
				const currentDoc = formData.rights[i];
				for (let property in currentDoc) {
					const dataName = `rights[${i}].${property}`;
					const dataValue = currentDoc[property];
					form.append(dataName, dataValue);
				}
			}
		}
		if (artwork?.licenseHistoryRadio === 1) {
			for (let i = 0; i < formData.contractDocuments.length; i++) {
				const currentDoc = formData.contractDocuments[i];
				for (let property in currentDoc) {
					const dataName = `contractDocuments[${i}].${property}`;
					const dataValue = currentDoc[property];
					if (property === "right") {
						for (let detail in dataValue) {
							const contractRightData = `contractDocuments[${i}].right.${detail}`;
							const contractRightValue = dataValue[detail];
							form.append(contractRightData, contractRightValue);
						}
					}
					property !== "right" && form.append(dataName, dataValue);
				}
			}
		}

		form.append("ownsArt", formData.ownsArt);
		form.append("currency", formData.currency);
		form.append("copyrightRegistered", formData.copyrightRegistered);
		if (formData.copyrightFile) {
			form.append("copyrightFile", formData.copyrightFile);
		}
		form.append("price", formData.price);
		form.delete("right");
		if (artwork?.competitionId) {
			form.append("competitionId", +artwork?.competitionId);
		}
		
		saveArtwork(form).then((res) => {
			if (!res?.success) {
				alert(res?.reason.msg);
				if (res?.reason.code === 400) {
					alert("худлаа request!");
					return;
				}
				if (res?.reason.code === 401) {
					handleShowModal(MODAL_TYPES.LOGIN_POPUP);
					return;
				}
				return;
			} else {
				hideAllModals();
				push(`/mypage?subpage=issuedNft`);
			}
		});
	}

	async function handleCalcLicensesCases(data) {
		const cases = data.licenseTypes.map((licenseType) => {
			const filteredList = data.licenseList.filter((license) => {
				if (!license.docFileName || !license.documentFile) {
					// сонгогдсон лиценс заавал нэр, file бүхий байх ёстой
					return;
				}
				if (license.licenseName === licenseType.code) {
					return license;
				}
				return;
			});
			return { licenseName: licenseType.code, filteredList };
		});
		return cases;
	}

	useEffect(() => {

		async function getMintFee(currency){
			const {result, failure} = await getFee('ARTWORK_REGISTRATION', currency);
			if(failure){
				if(failure !== 'switchnetwork'){
					alert(failure);
				}
				return;
			}
			setFee(result);
		}


		getCurrentModalprops()
			.then((data) => {
				getMintFee(data.currency);
				return data;
			})
			.then((data) => {
				setArtwork(data);
				handleCalcLicensesCases(data).then((cases) => setLicenseCases(cases));
			})
	}, []);

	const allFilteredListIsEmpty = licenseCases.every((item) => {
		return item.filteredList.length === 0;
	});

  const Atext = <span>{license_agreement_detailsI18} <br/>{license_agreement_details2I18}</span>

	return (
		<MainPopup>
			<PopupContainer>
				<PopupHeader text={requestTitleI18} />
				<PopupContent>
					<div className="flex flex-row">
						<div className="">
							<div className="mt-1 sm:mt-6 mb-[40px] flex items-center justify-center relative w-[265px] mx-auto h-[265px] overflow-hidden">
								{commonNotImageTypes.includes(artwork?.file?.type) ? (
									commonVideoTypes.includes(artwork?.file?.type) ? (
										<div className="relative h-full w-full">
											<video
												className="w-full h-full rounded-[5px] z-0 transform transition duration-500 object-cover"
												src={artwork?.tenSecTemp}
												loop
												playsInline
												autoPlay
												muted>
												<source src={artwork?.tenSecTemp} type="video/mp4" />
											</video>
											<div className="absolute AUDIO bottom-0 left-[6px]  p-2">
												<PlayCircle
													style={{ width: "24px", height: "24px" }}
													className="w-[24px] h-[24px]"
												/>
											</div>
										</div>
									) : (
										commonAudioTypes.includes(artwork.file.type) && (
											<>
												<Image
													src={
														URL.createObjectURL(artwork?.coverImage) ||
														closeIcon
													}
													alt="coverImage"
													unoptimized
													objectFit="cover"
													layout="fill"
													className="mx-auto rounded-[5px]"
													priority
													
												/>
												<div className="absolute AUDIO bottom-0 left-[6px]  p-2">
													<VolumeUp
														style={{ width: "24px", height: "24px" }}
														className="w-[24px] h-[24px]"
													/>
												</div>
											</>
										)
									)
								) : (
									<Image
										src={artwork?.img || closeIcon}
										alt="img"
										unoptimized
										objectFit="cover"
										layout="fill"
										className="mx-auto rounded-[5px]"
										priority
										
									/>
								)}
							</div>
							<div className="w-full">
								<div className="my-[10px] border-b border-[#DDD]"></div>
								<div className="flex justify-between">
									<div className="text-[#B0B0B0] font-medium">{method_paymentI18}</div>
									<div>
										<Image
											width={14}
											height={14}
											src={artwork?.currency == "EYES" ? eyesicon : matic_logo}
											alt="artwork-currency"
										/>
										<span className="ml-1 font-[400]">{artwork?.currency}</span>
									</div>
								</div>
								<div className="my-[10px] border-b border-[#4E4E4E]"></div>
							</div>
						</div>
						<div>
							<div className="w-[790px] flex flex-col gap-1 pt-[20px] px-[30px]">
								<div className="flex flex-row gap-2">
									<Image src={headIco} alt="headIco"  />
									<h3 className="text-[22px] font-medium text-white">
										{workInformation}
									</h3>
								</div>
								<div className="py-1 border-b border-[#DDDDDD]"></div>
								<EditRow title={workTitle}>{artwork?.title}</EditRow>
								<EditRow title={artWorkDescI18}>
									{artwork?.artworkDescription
										? parse(
												artwork?.artworkDescription.replace(/\n\r?/g, "<br />")
										  )
										: ""}
								</EditRow>
								<EditRow title={author_descI18}>
									{artwork?.creatorDescription
										? parse(
												artwork?.creatorDescription.replace(/\n\r?/g, "<br />")
										  )
										: ""}
								</EditRow>
							</div>
							<div className="w-[790px] flex flex-col gap-1 pt-[30px] px-[30px]">
								<div className="flex flex-row gap-2">
									<Image src={headIco} alt="headIco" />
									<h3 className="text-[22px] font-medium text-white">
										{retention}
									</h3>
								</div>
								<div className="py-1 border-b border-[#DDDDDD]"></div>
								<EditRow title={ownershipI18}>
									{artwork?.isLoyalty && (
										<div className="flex items-center">
                      <span className="text-[16px] font-[400]">O</span>
											<span className="text-[#9887FF] font-[350px] ml-2">
												{creator_royaltyI18} {artwork?.loyaltyPercent}%
											</span>
										</div>
									)}
								</EditRow>
								<EditRow title={copyrightLicenseI18}>
									<div className="flex flex-wrap">
										<div className="flex flex-1 items-center flex-wrap gap-2">
											{checkedRightList
												? checkedRightList?.length > 0 &&
												  checkedRightList.map((right, index) => {
														return (
															<div
																key={`right-${index}`}
																className="flex border-[0.5px] border-[#C5C8D2] rounded-full items-center px-3 py-1">
																<p className="text-[#DDD] text-[15px] font-[400] ml-[4px] mr-[10px]">
																	{allRightsI18[right.code]}
																</p>
															</div>
														);
												  })
												: "rights will be here"}
										</div>
									</div>
								</EditRow>
								<EditRow title={Atext}>
									{allFilteredListIsEmpty ? (
										<span>{doesnt_existI18}</span>
									) : licenseCases?.length > 0 ? (
										licenseCases.map((licenseCase, idx) => {
											if (licenseCase.filteredList.length === 0) {
												return;
											}
											return (
												<div
													key={`contract-${idx}`}
													className="flex items-center mr-4">
													<div className="mr-2 h-[3px] w-[2px] bg-[#999999]" />
													{allRightsI18[licenseCase.licenseName]}
													<span className="text-[#ff00e4] font-medium ml-1">
														({licenseCase.filteredList.length} {caseI18})
													</span>
												</div>
											);
										})
									) : (
										<span>{doesnt_existI18}</span>
									)}
								</EditRow>
								<EditRow title={copyright_registeredI18}>
									<div className="flex items-center">
										<span>
											{artwork?.copyrightFileName
												? artwork?.copyrightFileName
												: doesnt_existI18}
										</span>
									</div>
								</EditRow>
							</div>
							<div className="w-[790px] flex flex-col gap-1 pt-[30px] px-[30px] mb-[50px]">
								<div className="flex flex-row gap-2">
									<Image src={headIco} alt="headIco" />
									<h3 className="text-[22px] font-medium text-white">
										{charge}
									</h3>
								</div>
								<div className="py-1 border-b border-[#DDDDDD]"></div>
								<EditRow title={NFT_issuanceI18}>
									<div className="flex items-center justify-between">
										<p className="text-[16px] text-white font-[400]">
											{fee}&nbsp;
											{artwork?.currency}
										</p>
									</div>
								</EditRow>
							</div>
						</div>
					</div>
				</PopupContent>
				<PopupActionButtons
					yes={handleSubmit}
					no={() => hideModal()}
					btnTexts={{ no: edit_btnI18, yes: applyI18 }}
				/>
			</PopupContainer>
		</MainPopup>
	);
}

export default CreateArtworkPopup;
