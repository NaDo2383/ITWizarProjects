import React, { useState, useRef, useEffect } from "react";
import SettingRow from "./SettingRow";
import { LighterDarkBtn } from "Components/ui/button/colorfullBtn";
import InputDark from "Components/ui/input/InputDark";
import Textarea from "Components/ui/textarea/Textarea";
import ImageUploadBtn from "Components/ui/button/ImageUploadBtn";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useRouter } from "next/router";
import useSettings from "./useSettings";
import useMyPageTranslation from "locale/useMypageTranslation";
import useProfile from "../../../useProfile";
import useRefreshPage from "../../../../../../../common/window/useRefreshPage";
import usePopup from "Components/ui/popup/usePopup";
import SwitchButton from "Components/ui/button/switchBtn";
import { BsQuestionLg } from "react-icons/bs";
import MobileSettings from "./MobileSettings";

const haveSameData = function (obj1, obj2) {
	const count = 0
	for (const [key, value] of Object.entries(obj1)) {
		if (obj2[key] !== value) {
			count++
		}
	}
	return count === 0
}

function Settings() {
	const {
		edit_personal_informationI18,
		sizeI18,
		profilePictureI18,
		backgroundPhotoI18,
		nickNameI18,
		SNSregistrationI18,
		aboutMeI18,
		artistBgI18,
		artistInsertI18,
		artistChangeI18,
		artistChangeDefaultI18,
		facebookI18,
		twitterI18,
		instagramI18,
		backI18,
		plsEnterInstagramI18,
		plsEnterTwitterI18,
		plsEnterFacebookI18,
		saveI18
	} = useMyPageTranslation();
	const {
		handleShowModal,
		MODAL_TYPES,
		setGlobalModalState,
	} = usePopup();
	const { locale } = useRouter();
	const { profileUser, setProfileUser, setHardRender, setGlobalLoading } = useGlobalContext();
	const [settingsForm, setSettingsForm] = useState({
		nickName: {
			value: null,
			error: null
		},
		description: {
			value: null,
			error: null
		},
		instagram: {
			value: false,
			error: null
		},
		facebook: {
			value: false,
			error: null
		},
		twitter: {
			value: false,
			error: null
		},
		instagramUrl: {
			value: "",
			error: null
		},
		facebookUrl: {
			value: "",
			error: null
		},
		twitterUrl: {
			value: "",
			error: null
		},
		profileImgUrl: {
			value: null,
			error: null
		},
		bgFileUrl: {
			value: null,
			error: null
		}
	});
	const imageRef = useRef(null);
	const bgImageRef = useRef(null);
	const bgArtistRef = useRef(null);
	const [edit, setEdit] = useState(false);
	const { saveSettings, deleteProfileImg, deleteBannerImg, deleteArtistImg } = useSettings();
	const { getUserProfile } = useProfile();
	const { handleRefresh } = useRefreshPage();

	const handleChangeForm = (val, name) => {
		setSettingsForm((prev) => ({
			...prev,
			[name]: { ...prev[name], value: val }
		}));
		setEdit(true);
	};

	const { setAuthUser } = useGlobalContext()

	async function handleSave() {
		const {
			nickName,
			description,
			instagram,
			facebook,
			twitter,
			instagramUrl,
			facebookUrl,
			twitterUrl,
			profileImgUrl,
			bgFileUrl,
			artistFile
		} = settingsForm;

		const data = {
			nickName: nickName.value,
			description: description.value,
			instagram: instagram.value,
			facebook: facebook.value,
			twitter: twitter.value,
			instagramUrl: instagramUrl.value,
			facebookUrl: facebookUrl.value,
			twitterUrl: twitterUrl.value,
			imageFile: profileImgUrl.value,
			bgFile: bgFileUrl.value,
			artistFile: artistFile.value
		};
		let updatedData = {};
		// null болон '' утгатай формын талбаруудыг илгээхгүй
		Object.entries(data).filter((item) => {
			if (item[1] !== null && item[1] !== "" && edit) {
				if ((item[0] === "bgFile") || (item[0] === "imageFile") || (item[0] === "artistFile")) {
					// bgFileUrl, profileImgUrl эдгээр талбарууд зөвхөн file object утга авсан бх ёстой
					if (typeof item[1] === "object") {
						updatedData[item[0]] = item[1];
					}
				} else {
					updatedData[item[0]] = item[1];
				}
			}
		});

		const formData = new FormData();
		Object.entries(updatedData).map((item) => {
			formData.append(item[0], item[1]);
		})
		await saveSettings(formData).then((res) => {
			setEdit(false)
		});
		await getUserProfile().then(res => {
			console.log('aaaaaa', res)
			setAuthUser(res)
			const {
				nickName,
				description,
				instagram,
				facebook,
				twitter,
				instagramUrl,
				facebookUrl,
				twitterUrl,
				bgFileUrl,
				artistFileUrl,
				profileImgUrl
			} = res;
			setSettingsForm((prev) => ({
				...prev,
				nickName: { ...prev.nickName, value: nickName },
				description: { ...prev.description, value: description },
				instagram: { ...prev.instagram, value: instagram },
				facebook: { ...prev.facebook, value: facebook },
				twitter: { ...prev.twitter, value: twitter },
				instagramUrl: { ...prev.instagramUrl, value: instagramUrl },
				facebookUrl: { ...prev.facebookUrl, value: facebookUrl },
				twitterUrl: { ...prev.twitterUrl, value: twitterUrl },
				bgFileUrl: { ...prev.bgFileUrl, value: bgFileUrl },
				profileImgUrl: { ...prev.profileImgUrl, value: profileImgUrl },
				artistFile: { ...prev.artistFile, value: artistFileUrl }
			}));
		})
		await handleRefresh();
	}

	function handleBack() {
		getUserProfile().then((res) => {
			handleShowModal(MODAL_TYPES.PROFILE, res);
		})
		setGlobalModalState(prev => ({
			...prev,
			saveProfile: handleSave
		}))
	}

	function handleDefaultProfileImg() {
		console.log('bolj bnu')
		deleteProfileImg().then(() => {
			console.log('vvvv')
			setSettingsForm((prev) => ({
				...prev,
				profileImgUrl: { ...prev.profileImgUrl, value: null }
			}))
			setProfileUser((prev) => ({ ...prev, profileImgUrl: null }))
		}
		);
	}

	function handleDefaultBannerImg() {
		deleteBannerImg().then(() => {
			setSettingsForm((prev) => ({
				...prev, bgFileUrl: { ...prev.bgFileUrl, value: null }
			}))
			setProfileUser((prev) => ({ ...prev, bgFileUrl: null }))
		}
		);
	}

	function handleArtistBannerImg() {
		deleteArtistImg().then(() => {
			setSettingsForm((prev) => ({
				...prev, artistFile: { ...prev.artistFile, value: null }
			}))
			setProfileUser((prev) => ({ ...prev, artistFileUrl: null }))
		}
		);
	}

	useEffect(() => {
		if (profileUser) {
			const {
				nickName,
				description,
				instagram,
				facebook,
				twitter,
				instagramUrl,
				facebookUrl,
				twitterUrl,
				bgFileUrl,
				artistFileUrl,
				profileImgUrl
			} = profileUser;

			setSettingsForm((prev) => ({
				...prev,
				nickName: { ...prev.nickName, value: nickName },
				description: { ...prev.description, value: description },
				instagram: { ...prev.instagram, value: instagram },
				facebook: { ...prev.facebook, value: facebook },
				twitter: { ...prev.twitter, value: twitter },
				instagramUrl: { ...prev.instagramUrl, value: instagramUrl },
				facebookUrl: { ...prev.facebookUrl, value: facebookUrl },
				twitterUrl: { ...prev.twitterUrl, value: twitterUrl },
				bgFileUrl: { ...prev.bgFileUrl, value: bgFileUrl },
				profileImgUrl: { ...prev.profileImgUrl, value: profileImgUrl },
				artistFile: { ...prev.artistFile, value: artistFileUrl }
			}));
		}
	}, [locale, profileUser]);

	// useEffect(() => {
	// 	if ( settingsForm && profileUser && !haveSameData(JSON.parse(JSON.stringify(settingsForm)), profileUser)) {
	// 		setEdit(true)
	// 	} else {
	// 		setEdit(false)
	// 	}
	// }, [settingsForm])

	useEffect(() => {
		getUserProfile().then((res) => {
			setProfileUser(res);
			setSettingsForm(res);
		});
		setGlobalLoading(false);
	}, []);

	return (
		<div className="w-full sm:container lg:mx-[240px] sm:mx-2 md:mx-[50px]">
			<div className="hidden sm:flex sm:flex-col overflow-hidden ">
				<div className="flex flex-col w-full">
					<h2 className="text-[24px] font-[700] -tracking-[0.36px]">
						{edit_personal_informationI18}
					</h2>
				</div>
				<div className="w-full py-[98px] max-w-[930px]">
					<SettingRow label={profilePictureI18}>
						<div className="flex flex-col mb-[15px]">
							<div className="flex gap-3 relative items-center">
								{(settingsForm.profileImgUrl?.value?.name || profileUser?.profileImgUrl) &&
									<InputDark
										disabled
										placeholder={settingsForm.profileImgUrl?.value?.name || profileUser?.profileImgName}
									/>
								}
								<ImageUploadBtn
									name="profileImgUrl"
									onChange={handleChangeForm}
									text={(settingsForm.profileImgUrl?.value?.name || profileUser?.profileImgUrl) ? artistChangeI18 : artistInsertI18}
									ref={imageRef}
									color="#6319FF"
									width={118}
								/>
								<LighterDarkBtn
									text={artistChangeDefaultI18}
									ref={imageRef}
									onClick={handleDefaultProfileImg}
								/>
							</div>
							<div className="pt-2 text-[14px] font-[350px] text-[#8B8B8B]">
								{sizeI18} : 80 * 80 px{" "}
							</div>
						</div>
					</SettingRow>
					<SettingRow label={backgroundPhotoI18}>
						<div className="flex flex-col mb-[15px]">
							<div className="flex gap-3 relative items-center">
								{(settingsForm.bgFileUrl?.value?.name || profileUser?.bgFileUrl) && <InputDark
									disabled
									placeholder={settingsForm.bgFileUrl?.value?.name || profileUser?.bgFileName}
								/>}
								<ImageUploadBtn
									name="bgFileUrl"
									onChange={handleChangeForm}
									text={(settingsForm.bgFileUrl?.value?.name || profileUser?.bgFileUrl) ? artistChangeI18 : artistInsertI18}
									ref={bgImageRef}
									color="#6319FF"
									width={118}
								/>
								<LighterDarkBtn
									text={artistChangeDefaultI18}
									onClick={handleDefaultBannerImg}
								/>
							</div>

							<div
								className="
                        pt-2 text-[14px] font-[350px] text-[#8B8B8B]">
								{sizeI18} : 1410 * 240 px
							</div>
						</div>
					</SettingRow>
					{profileUser?.type === "TAMTAM" && <SettingRow label={<>{artistBgI18}<div onClick={() => {
						setGlobalModalState((prev) => ({
							...prev,
							artistFile: settingsForm?.artistFile?.value && typeof settingsForm?.artistFile?.value !== "string" ? URL.createObjectURL(settingsForm?.artistFile?.value) : profileUser?.artistFile,
							profileImgUrl: settingsForm?.profileImgUrl?.value && typeof settingsForm?.profileImgUrl?.value !== "string" ? URL.createObjectURL(settingsForm?.profileImgUrl?.value) : profileUser?.profileImgUrl,
							nickName: settingsForm?.nickName.value
						}));
						handleShowModal(MODAL_TYPES.ARTIST_PREVIEW)
					}} className="border cursor-pointer rounded-full ml-2 flex items-center border-[#9887FF] justify-center min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] relative"><BsQuestionLg color="#9887FF" style={{ width: "12px", height: "12px", color: "#9887FF" }} /></div></>}>

						<div className="flex flex-col mb-[15px]">
							<div className="flex gap-3 relative items-center">
								{(settingsForm.artistFile?.value?.name || profileUser?.artistFileUrl) && <InputDark
									disabled
									placeholder={settingsForm.artistFile?.value?.name || profileUser?.artistFileName}
								/>}
								<ImageUploadBtn
									name="artistFile"
									onChange={handleChangeForm}
									text={(settingsForm.artistFile?.value?.name || profileUser?.artistFileUrl) ? artistChangeI18 : artistInsertI18}
									ref={bgArtistRef}
									color="#6319FF"
									width={118}
								/>
								<LighterDarkBtn
									text={artistChangeDefaultI18}
									onClick={handleArtistBannerImg}
								/>
							</div>

							<div
								className="
                        pt-2 text-[14px] font-[350px] text-[#8B8B8B]">
								{sizeI18} : 330 * 200 px
							</div>
						</div>
					</SettingRow>}
					<SettingRow label={nickNameI18}>
						<div className="w-full lg:pr-[62px] mb-[15px]">
							<InputDark
								value={settingsForm.nickName?.value}
								onChange={handleChangeForm}
								name="nickName"
							/>
						</div>
					</SettingRow>
					<SettingRow label={aboutMeI18}>
						<div className="w-full lg:pr-[62px] mb-[15px]">
							<Textarea
								onChange={handleChangeForm}
								value={settingsForm.description?.value}
								name="description"
							/>
						</div>
					</SettingRow>
					<SettingRow label={SNSregistrationI18}>
						<div className="flex flex-col gap-10 w-full mb-[15px]">
							<div className="flex gap-[10px] w-full border-b-2 border-[#232323]">
								<div className="w-[30%] flex items-center gap-[10px] mb-[15px]">
									<SwitchButton
										name="instagram"
										on={settingsForm.instagram?.value}
										change={handleChangeForm}
									/>
									<span>{instagramI18}</span>
								</div>
								{settingsForm.instagram?.value && (
									<div className="w-full lg:pr-[62px] mb-[15px]">
										<InputDark
											name="instagramUrl"
											placeholder={plsEnterInstagramI18}
											onChange={handleChangeForm}
											value={settingsForm.instagramUrl?.value}
										/>
									</div>
								)}
							</div>
							<div className="border-b-2 border-[#232323]">
								<div className="flex gap-[10px] w-full mb-[15px]">
									<div className="w-[30%] flex items-center gap-[10px] ">
										<SwitchButton
											name="twitter"
											on={settingsForm.twitter?.value}
											change={handleChangeForm}
										/>
										<span>{twitterI18}</span>
									</div>
									{settingsForm.twitter?.value && (
										<div className="w-full lg:pr-[62px] pb-[15px]">
											<InputDark
												name="twitterUrl"
												placeholder={plsEnterTwitterI18}
												onChange={handleChangeForm}
												value={settingsForm.twitterUrl?.value}
											/>
										</div>
									)}
								</div>
							</div>
							<div className="flex gap-[10px] w-full">
								<div className="w-[30%] flex items-center gap-[10px]">
									<SwitchButton
										on={settingsForm.facebook?.value}
										change={handleChangeForm}
										name="facebook"
									/>
									<span>{facebookI18}</span>
								</div>
								{settingsForm.facebook?.value && (
									<div className="w-full lg:pr-[62px]">
										<InputDark
											name="facebookUrl"
											placeholder={plsEnterFacebookI18}
											onChange={handleChangeForm}
											value={settingsForm.facebookUrl?.value}
										/>
									</div>
								)}
							</div>
						</div>
					</SettingRow>

					<div className="flex gap-3 w-full justify-center py-[100px]">
						<button
							className={`border text-[18px] font-[500] rounded-[4px] border-[#5E5E5E] text-[#DDDDDD] outline-none py-[10px] px-[25px]`}
							onClick={handleBack}>
							{backI18}
						</button>
						<button
							className={`text-[18px] font-[500] rounded-[4px] text-[#fff] ${edit ? "bg-[#FB3873]" : "bg-[#252525]"} py-[10px] px-[25px]`}
							onClick={handleSave}>
							{saveI18}
						</button>
					</div>
				</div>
			</div>
			<MobileSettings />
		</div>
	);
}

export default Settings;
