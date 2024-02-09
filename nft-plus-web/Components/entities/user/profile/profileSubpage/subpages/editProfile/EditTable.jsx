/**
 * @createdBy duka 2023/5/18
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useEditProfile from "./useEditProfile";
import useMyPageTranslation from "locale/useMypageTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import useProfile from "../../../useProfile";
import usePopup from "Components/ui/popup/usePopup";
import EditRow from "./editRow";
import useOtp from "./useOtp";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useAlertTranslation from "locale/useAlertTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useSubpageContext } from "../../useSubpageContext";
import axios from "axios";
import { getLocal, getCookie } from "utils/storage";

function EditTable() {
	const { authUser, emailVerify } = useAuthUser();
	const { push, locale } = useRouter();
	const { setGlobalLoading, globalItems, setGlobalItems } = useGlobalContext();
	const { descriptionErrI18 } = useAlertTranslation();
	const {
		aboutMeI18,
		nameI18,
		nicknameI18,
		authGoogleOTPI18,
		disabledI18,
		activateI18,
		walletI18,
		emailVerifyI18,
		notCertifiedI18,
		authenticateI18,
		saveI18,
		emailVerifiedI18
	} = useMyPageTranslation();
	const { editPersonalInfoI18 } = useCommonTranslation();
	const { updateProfile } = useEditProfile();
	const { getVerificationQr, otpState } = useOtp();
	const { getUserProfile } = useProfile();
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [profileUser, setProfileUser] = useState(null);
	const [defaultRes, setDefaultRes] = useState(null);
	const { handleShowModal, MODAL_TYPES, hideAllModals } = usePopup();
	const [email, setEmail] = useState("");
	
	function save() {
		updateProfile(profileUser).then((res) => {
			setEdit(false);
			setGlobalItems(prev => 
				({ 
					...prev, 
					profileNickname: profileUser.nickName 
				}))
		});
	}

	function handleButton() {
		if (edit) {		
			save();
            push(`/mypage?subpage=editProfile`);
            setGlobalLoading(true);
		}
	}

	{
		/*
	function handleChangePassword() {
		updateProfilePassword({}).then((res) => {
			handleShowModal(MODAL_TYPES.EDIT_PASSWORD);
		})
	}
	*/
	}

	function handleActiveBtn() {
		getVerificationQr({}).then((res) => {
			handleShowModal(MODAL_TYPES.EDIT_GOOGLEOTP, {
				res: res,
				otpVerified: profileUser?.otpVerified
			});
		});
	}
	function handleEditEmail() {
		updateProfile({}).then((res) => {
			handleShowModal(MODAL_TYPES.EDIT_EMAIL, {
				emailVerifyd: async (email) => emailVerify(email, locale)
			});
		});
	}

	const validateEmail = (email) => {
		return email.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};

	const emailHandler = () => {
		if (validateEmail(email)) {
			setGlobalLoading(true);
			const result = axios
				.post(
					process.env.url + "/email-verify",
					{
						email: email,
						lang: locale
					},
					{
						headers: {
							Authorization: `Bearer ${getCookie("jwt-token")}`
						}
					}
				)
				.then((result) => {
					if (result.data.message === "success") {
						alert("Verification mail sent successfully");
					}
				})
				.catch((err) => {
					if (err.response?.data?.message === "email.exist"){
						alert(" email already exists");
					}else{
						alert(err.response?.data?.message);
					}
				})
				.finally(() => {
					setGlobalLoading(false);
				});
		} else {
			alert("invalid email");
		}
	};

	useEffect(() => {
		if (
			profileUser?.fullname !== defaultRes?.fullname ||
			profileUser?.description !== defaultRes?.description ||
			profileUser?.nickName !== defaultRes?.nickName ||
			profileUser?.otpVerified !== defaultRes?.otpVerified
		) {
			setEdit(true);
		} else {
			setEdit(false);
		}
	}, [profileUser]);

	useEffect(() => {
		getUserProfile().then((res) => {
			setProfileUser(res);
			setDefaultRes(res);
		});
		setGlobalLoading(false);
	}, [otpState]);

	return (
		<div className="w-full">
			<h3 className="lg:text-[22px] sm:text-[22px] xs:text-[20px] text-[20px] font-[700] text-center sm:text-left lg:text-left text-[#D4D4D4] pb-10">{editPersonalInfoI18}</h3>
			<div className="w-full">
				<EditRow title={nameI18}>
					<input
						type="text"
						className={`sm:max-w-[643px] xs:w-full h-full focus outline-none font-[400] text-[#5A5A5A] bg-[#0F1111] rounded-[5px] py-[9px] px-[11px]`}
						value={profileUser?.fullname}
						onChange={(e) => {
							setProfileUser({ ...profileUser, fullname: e.target.value });
						}}
					/>
				</EditRow>
				{/*<EditRow title={nicknameI18}>
					<input
						type="text"
						className={`lg:min-w-[643px] sm:min-w-[643px] xs:w-full focus:outline-none font-[400] text-[#5A5A5A] bg-[#0F1111] rounded-[5px] py-[9px] px-[11px]`}
						value={profileUser?.nickName}
						onChange={(e) => {
							setProfileUser({ ...profileUser, nickName: e.target.value });
						}}
					/>
					</EditRow>*/}
				<EditRow title={walletI18}>
					<p className="editProfile-td-p">{profileUser?.wallet}</p>
				</EditRow>
				{/*<EditRow title={aboutMeI18}>
					<textarea
						name="description"
						onChange={(e) => {
							setProfileUser({ ...profileUser, description: e.target.value });
						}}
						value={profileUser?.description}
						className="tracking-[-1px] w-full false font-[300] text-[#333] bg-gray-100 rounded-md py-2 px-3"
						cols={100}
						rows={5}>
						{profileUser?.description}
					</textarea>*/}
				{/* <EditRow title={passwordI18}>
                    <p className='tracking-[-1px] font-[300]  w-[125px] flex l-0 text-[#333]'>***********</p>
                    <div className='tracking-[-1px] cursor-pointer font-[300] w-[125px] flex l-0'>
                        {edit ?
                            <button onClick={handleChangePassword} className='text-sm w-28 border-[#333] text-[#333] undefined block font-[300] border rounded-[4px] py-1 px-2'>{changePasswordI18}</button>
                            : ""}
                    </div>
                </EditRow> */}
				<EditRow title={emailVerifyI18}>
					{profileUser?.verified ?
						<>
							<p className="hidden sm:block">
								{profileUser.email}
							</p>
							<div className="sm:hidden flex items-center justify-between sm:gap-[30px] gap-2">
								<p className="lg:w-[15%] sm:w-[15%] w-[70%] min-w-[229px] font-[300] text-[15px] text-[#DDDDDD] bg-[#0F1111] rounded-[6px] flex l-0 p-[15px]">
									{profileUser.email}
								</p>
								<button
									disabled
									className="sm:hidden block lg:text-[16px] sm:text-[16px] text-[15px] lg:min-w-[112px] sm:min-w-[112px] min-w-[90px] border-[#252525] bg-[#252525] text-white undefined  font-[500] border sm:rounded-[4px] rounded-[5px] lg:py-1 lg:px-2 sm:py-1 sm:px-2 py-[10px] px-[15px] cursor-not-allowed">
									{emailVerifiedI18}
								</button>
							</div>
						</>
						:
						<>	
							<div className="flex justify-between sm:justify-start w-full sm:gap-[30px] gap-2">
								<p className="lg:w-[15%] sm:w-[15%] w-[65%] font-[300] text-[18px] text-[#A0A0A0]  l-0 hidden sm:flex whitespace-nowrap min-w-[110px]">
									{notCertifiedI18}
								</p> 
								<input 
									type="text" 
									className="lg:w-[15%] sm:w-[15%] w-[70%] min-w-[229px] font-[300] text-[15px] bg-[#0F1111] rounded-[6px] sm:hidden flex l-0 outline-none p-2 "
									onChange={(e) => setEmail(e.target.value)}
									>
								</input> 
								<button
									onClick={handleEditEmail}
									className="lg:text-[16px] sm:text-[16px] text-[15px] lg:min-w-[112px] sm:min-w-[112px]  min-w-[90px] border-[#6319FF] bg-[#6319FF] text-white undefined sm:block hidden font-[500] border rounded-[4px] lg:py-1 lg:px-2 sm:py-1 sm:px-2 py-[10px] px-[15px]">
									{authenticateI18}
								</button>
								<button
									onClick={emailHandler}
									className="lg:text-[16px] sm:text-[16px] text-[15px] lg:min-w-[112px] sm:min-w-[112px]  min-w-[90px] border-[#6319FF] bg-[#6319FF] text-white undefined sm:hidden block font-[500] border rounded-[4px] lg:py-1 lg:px-2 sm:py-1 sm:px-2 py-[10px] px-[15px]">
									{authenticateI18}
								</button>
							</div>
						</>
					}
				</EditRow>

				<div className="flex xs:flex-col sm:flex-row lg:flex-row flex-col lg:border-b sm:border-b border-n0 xs:border-0 border-[#232323]">
					<div className="flex justify-between items-center lg:py-[22px] sm:py-[22px] py-0 pr-2 md:min-w-[280px] sm:min-w-[175px] min-w-[125px]">
						<p className="tracking-[-1px] lg:text-[18px] sm:text-[18px] xs:text-[15px] text-[15px] text-[#DDDDDD] capitalize  whitespace-pre-line">{authGoogleOTPI18}</p>
						<div
							onClick={ profileUser?.otpVerified ? (e) => {setProfileUser({ ...profileUser, otpVerified: false });} : handleActiveBtn}
							className={`sm:hidden block ${ loading ? "cursor-wait" : "cursor-pointer" } border border-[#333333] transition duration-300  rounded-full w-[39px] py-[2px] flex 
							${ profileUser?.otpVerified ? "bg-[#7B61FF]" : "bg-[#A9A9A9]" }`}>
							<div
								style={{ transition: "width .1s ease" }}
								className={`${
									profileUser?.otpVerified ? "w-full" : "w-[17px]"
								} h-[16px] duration-300 transition py-[2px]  flex relative items-center rounded-full overflow-hidden`}>
								<div
									style={{ transition: "all .3s" }}
									className={`h-[16px] w-[17px] transition duration-300 rounded-full flex items-center right-0 absolute bg-[#fff] `}></div>
							</div>
						</div>
					</div>
					<div className="flex items-center lg:pt-[11px] lg:pb-[11px] sm:pt-[11px] sm:pb-[11px] pt-[8px] pb-[35px] w-full">
						<div className="w-full sm:flex hidden items-center flex-wrap lg:text-[18px] sm:text-[18px] xs:text-[15px] text-[15px] sm:gap-[30px]">
							<p
								className={`w-[15%] sm:min-w-[112px] font-[400] text-[18px] text-[#A0A0A0] flex l-0 ${profileUser?.otpVerified ? "hidden" : "block"
									}`}>
								{disabledI18}
							</p>
							<p
								className={`w-[15%] sm:min-w-[112px] font-[400] text-[18px] text-[#A0A0A0] flex l-0 ${profileUser?.otpVerified ? "block" : "hidden"
									}`}>
								{activateI18}
							</p>
							<div className="relative flex items-center">
								{!profileUser?.otpVerified && (
									<button
										onClick={handleActiveBtn}
										className="lg:text-[16px] sm:text-[16px] text-[15px] w-28 border-[#6319FF] bg-[#6319FF] text-white undefined block font-[500] border rounded-[4px] py-1 px-2"
										disabled={profileUser?.otpVerified ? true : false}>
										{activateI18}
									</button>
								)}
								{profileUser?.otpVerified && (
									<button
										className="lg:text-[16px] sm:text-[16px] text-[15px] w-28 border-[#6319FF] bg-[#6319FF] text-white undefined block font-[500] border rounded-[4px] py-1 px-2"
										disabled={profileUser?.otpVerified ? false : true}
										onClick={(e) => {
											setProfileUser({ ...profileUser, otpVerified: false });
										}}>
										{disabledI18}
									</button>
								)}
							</div>
						</div>
      				</div>
    			</div>
			</div>
			<div className="edit-btn-container">
				{/* <button onClick={cancelling} disabled={!edit || changing} className={`${!edit
                    ? "bg-gray-100 text-gray-400 border-gray-400 cursor-not-allowed"
                    : changing
                        ? "cursor-wait"
                        : ""} rounded-lg w-[150px] py-4 px-8 font-[300] border border-black`}>
                    {cancelI18}
               </button> 
               disabled={!edit ? true : false}*/}
				<button
					className={`${edit
							? "bg-[#FB3873] text-white"
							: "bg-[#252525] text-white cursor-not-allowed"
						}
           ${loading && "cursor-wait"
						} lg:text-[18px] sm:text-[18px] xs:text-[15px] text-[15px] rounded-[5px] py-[10px] px-[25px] font-[500]`}
					onClick={handleButton}>
					{saveI18}
				</button>
			</div>
		</div>
	);
}

export default EditTable;
