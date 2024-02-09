/**
 * @createdBy Duka 2023/6
 */
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupActionButtons, { PopupActionSingleBtn } from "Components/ui/popup/popupMaterials/PopupActionButtons";
import headIco from "public/headIcon.svg";
import matic_logo from "public/matic-logo.png";
import EditRow from "Components/ui/table/Row";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import React, { useEffect, useState } from "react";
import eyesicon from "public/eyesicon.svg";
import Image from "next/image";
import useMintEyes from "common/metamask/eyes/useMintEyes";
import useMintMatic from "common/metamask/matic/useMintMatic";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useWallet from "common/metamask/useWallet";
import useAlertTranslation from "locale/useAlertTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import useFee from "../useFee";

function ArtworkCheckPopup() {
	const {
		doesnt_existI18,
		workDesc,
		authorIntroductionI18,
		copyrightLicenseI18,
		copyright_registeredI18,
		NFT_issuanceI18,
		token_issuanceI18,
		allRightsI18,
		caseI18,
		workInformation,
		retention,
		charge,
		creator_royaltyI18
	} = useArtworkTranslation();
	const {
		worknameI18,
		method_paymentI18,
		ownershipI18,
		cancelI18,
		requestTitleI18,
		license_agreement_detailsI18,
		license_agreement_details2I18
	} = useMyPageTranslation();
	const {
		registerYourWalletI18,
		notRegisteredI18,
		plsInstallMetamaskInBrowserI18
	} = useAlertTranslation();
	const { setGlobalLoading } = useGlobalContext();
	const [handledContracts, setHandledContracts] = useState(null);
	const {
		getCurrentModalprops,
		hideModal,
		popupProps,
		handleShowModal,
		MODAL_TYPES,
		globalModalState,
	} = usePopup();

	const artwork = popupProps?.artwork;
	const { mintEyes, mintEyesIntoDb } = useMintEyes();
	const { mintMatic } = useMintMatic();
	const { getNetwork } = useMetaNetwork();
	const { walletIsMatch } = useWallet();
	const { getFee } = useFee();
	const [fee, setFee] = useState(0);
	const [licenseCases, setLicenseCases] = useState([]);
	const Atext = <span>{license_agreement_detailsI18} <br />{license_agreement_details2I18}</span>
	const allFilteredListIsEmpty = licenseCases.every((item) => {
		return item.filteredList.length === 0;
	});

	async function handleSubmit() {
		setGlobalLoading(true);
		try {
			const { profileUser, activeWallets } = popupProps;
			const { id, currency, royalty, ipfsUrl } = popupProps.artwork;

			const chainId =
				currency === "EYES"
					? process.env.ETH_CHAIN_ID
					: process.env.MATIC_CHAIN_ID;

			const currentNetworkId = await getNetwork();
			if (chainId !== currentNetworkId) {
				if (chainId === process.env.ETH_CHAIN_ID) {
					handleShowModal(MODAL_TYPES.SWITCHETHERIUMNET);
				} else {
					handleShowModal(MODAL_TYPES.SWITCHMAINNET);
				}
				return;
			}

			if (currentNetworkId === "메타마스크를 설치해주세요.") {
				alert(plsInstallMetamaskInBrowserI18);
				return;
			}

			if (!ipfsUrl) {
				alert(notRegisteredI18);
				return;
			}
			const { isMatchWallet, currentMetaWallet } = await walletIsMatch();

			if (!isMatchWallet) {
				alert(registerYourWalletI18);
				return;
			}

			const { failure, contractHash } = currency === "EYES" ? await mintEyes(id, royalty, ipfsUrl) : await mintMatic(id, royalty, ipfsUrl, null)

			if (failure) {
				alert(failure)
				return
			} else {
				if (currency === "EYES") {
					const rate = (royalty * 10).toString()
					const formData = {
						action: "mint",
						txHash: contractHash,
						workId: id.toString(),
						uri: ipfsUrl,
						recipient: currentMetaWallet,
						rate,
					};
					const isSuccessIntoDb = await mintEyesIntoDb(formData, id, true)
					setTimeout(() => {
						globalModalState?.updateStatus("GASFEE_PAID")
						globalModalState?.updateArtworkRegProgressList()
					}, [500])
					hideModal()
					return
				}
				hideModal()
				setTimeout(() => {
					globalModalState?.updateStatus("GASFEE_PAID")
					globalModalState?.updateArtworkRegProgressList()
				}, [500])
			}

		} catch (e) {
			console.error(e)
			alert('artwork error!')
			return
		} finally {
			setGlobalLoading(false)
		}
	}

	async function createContractDocs(contractDocuments) {
		if (!contractDocuments) return;
		const arr = [];
		contractDocuments.forEach((el, index) => {
			el.rights.forEach((r) => {
				const contract = arr.find((elem) => elem.code === r.code);
				if (contract) {
					const contractIndex = arr.findIndex((elem) => elem.code === r.code);
					arr[contractIndex] = {
						...arr[contractIndex],
						count: arr[contractIndex].count + 1
					};
				} else {
					arr.push({
						code: r.code,
						count: 1
					});
				}
			});
		});
		return arr;
	}

	useEffect(() => {
		async function getMintFee(currency) {
			const { result, failure } = await getFee('ARTWORK_REGISTRATION', currency);
			if (failure) {
				if (failure !== 'switchnetwork') {
					alert(failure);
				}
				return;
			}
			setFee(result);
		}
		getCurrentModalprops().then((modalProps) => {
			getMintFee(modalProps?.artwork?.currency);
			createContractDocs(modalProps.artwork.contractDocuments).then((data) =>
				setHandledContracts(data)
			);
		});
	}, []);

	return (
		<MainPopup>
			<PopupContainer>
				<PopupHeader text={requestTitleI18} />
				<PopupContent>
					<div className="flex flex-row">
						<div>
							<div className="mt-1 sm:mt-6 flex items-center justify-center relative w-[265px] mx-auto h-[265px] overflow-hidden">
								{artwork?.fileType !== "IMAGE" ? (
									artwork?.fileType === "VIDEO" ? (
										<div className="relative h-full w-full flex justify-center">
											<video
												className={`w-full h-full rounded-[5px] object-cover bg-[#181A1A]`}
												src={artwork?.imageUrl}
												loop
												autoPlay
												muted
												playsInline
												alt={artwork?.imageUrl}>
												<source src={artwork?.imageUrl} type="video" />
											</video>
											<div className="absolute bottom-0 p-2 left-2">
												<PlayCircle
													style={{ width: "24px", height: "24px" }}
													className="w-[24px] h-[24px]"
												/>
											</div>
										</div>
									) : (
										<div className="relative h-full w-full flex justify-center">
											<img
												src={artwork?.thumbnailUrl3x}
												width="100%"
												height="100%"
												className="w-full h-full rounded-[5px] object-cover"
												alt="artwork-thumbnail"
											/>
											<div className="absolute bottom-0 p-2 left-2">
												<VolumeUp
													style={{ width: "24px", height: "24px" }}
													className="w-[24px] h-[24px]"
												/>
											</div>
										</div>
									)
								) : (
									<Image
										height={134}
										width={134}
										priority
										layout="fill"
										unoptimized
										src={artwork?.imageUrl}
										objectFit="cover"
										alt="imageUrl"
									/>
								)}
							</div>
							<div className="w-full mt-[44px]">
								<div className="my-[10px] border-b border-[#DDDDDD]"></div>
								<div className="flex justify-between">
									<div className="text-[#B0B0B0]">{method_paymentI18}</div>
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
									<Image src={headIco} alt="headIco" />
									<h3 className="text-[22px] font-medium text-white">
										{workInformation}
									</h3>
								</div>
								<div className="py-1 border-b border-[#DDDDDD]"></div>
								<EditRow title={worknameI18}>
									{artwork?.artworkName || doesnt_existI18}
								</EditRow>
								<EditRow title={workDesc}>
									{artwork?.description || doesnt_existI18}
								</EditRow>
								<EditRow title={authorIntroductionI18}>
									{artwork?.artistDescription || doesnt_existI18}
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
									{artwork?.royalty > 0 ? (
										<div className="flex items-center">
											<p className="ml-[4px] mr-[10px]">O</p>
											<span className="text-[#9887FF] font-[350px] ml-2">
												{creator_royaltyI18} {artwork?.royalty}%
											</span>
										</div>
									) : (
										""
									)}
								</EditRow>
								<EditRow title={copyrightLicenseI18}>
									<div className="flex items-center text-[14px] flex-wrap gap-2">
										{artwork?.rights ?
											artwork?.rights?.length > 0
											&& artwork?.rights.map((right, index) => {
												return (
													<div key={`right-${index}`} className="flex border-[0.5px] border-[#C5C8D2] rounded-full items-center px-3 py-1">
														<p className="text-[#DDD] text-[15px] font-[400] ml-[4px] mr-[10px]">
															{allRightsI18[right.code]}
														</p>
													</div>
												);
											})
											: "rights will be here"}
									</div>
								</EditRow>
								<EditRow title={Atext}>
								<div className="flex flex-wrap">
                                        {handledContracts?.length > 0
                                            ? handledContracts.map((contract, index) => (
                                                <div key={`contract-${index}`} className="flex items-center mr-4">
                                                    <div className="mr-2 h-[3px] w-[2px] bg-[#999999]"></div>
                                                    {allRightsI18[contract.code]}
                                                    <span className="text-[#ff00e4] font-medium ml-1">
                                                        ({contract.count}
                                                        {caseI18})
                                                    </span>
                                                </div>
                                            ))
                                            : doesnt_existI18}
                                    </div>
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
							<div className="w-[790px] flex flex-col gap-1 pt-[30px] px-[30px]">
								<div className="flex flex-row gap-2">
									<Image src={headIco} alt="headIco" />
									<h3 className="text-[22px] font-medium text-white">
										{charge}
									</h3>
								</div>
								<div className="py-1 border-b border-[#DDDDDD]"></div>
								<EditRow title={NFT_issuanceI18}>
									<div className="flex items-center justify-between">
										<p className='text-[16px] text-[#fff] font-[400]'>
											{fee} &nbsp;{artwork?.currency}
										</p>
									</div>
								</EditRow>
							</div>
						</div>
					</div>
				</PopupContent>
				<div className="mt-[50px]">
					{
						artwork?.mintStatus === 'NOT_MINTED' ?
							<PopupActionButtons
								yes={handleSubmit}
								no={() => hideModal()}
								btnTexts={{ no: cancelI18, yes: token_issuanceI18 }}
							/>
							:
							<div className="flex justify-end mt-[35px] pr-[30px]">
								<PopupActionSingleBtn
									callback={() => hideModal()}
									btnText={cancelI18}
									width={107}
								/>
							</div>
					}
				</div>

			</PopupContainer>
		</MainPopup>
	);
}

export default ArtworkCheckPopup;