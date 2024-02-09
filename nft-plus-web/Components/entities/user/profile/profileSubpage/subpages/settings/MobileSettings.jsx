import React, { useState, useEffect } from "react";
import SettingRow from "./SettingRow";
import InputDark from "Components/ui/input/InputDark";
import Textarea from "Components/ui/textarea/Textarea";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useRouter } from "next/router";
import useSettings from "./useSettings";
import useMyPageTranslation from "locale/useMypageTranslation";
import useProfile from "../../../useProfile";
import useRefreshPage from "../../../../../../../common/window/useRefreshPage";
import usePopup from "Components/ui/popup/usePopup";
import SwitchButton from "Components/ui/button/switchBtn";
import Image from 'next/image'

const haveSameData = function (obj1, obj2) {
    const count = 0
    for (const [key, value] of Object.entries(obj1)) {
        if (obj2[key] !== value.value) {
            count++
        }
    }
    return count === 0
}
function MobileSettings() {
    const {
        edit_personal_informationI18,
        nickNameI18,
        SNSregistrationI18,
        aboutMeI18,
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
    const { profileUser} = useGlobalContext();
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
    });
    const [edit, setEdit] = useState(false);
    const { saveSettings} = useSettings();
    const { getUserProfile } = useProfile();
    const { handleRefresh } = useRefreshPage();

    const handleChangeForm = (val, name) => {
        setSettingsForm((prev) => ({
            ...prev,
            [name]: { ...prev[name], value: val }
        }));
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
            }));
        }
    }, [locale, profileUser]);

    useEffect(() => {
        if (settingsForm && profileUser && !haveSameData(JSON.parse(JSON.stringify(settingsForm)), profileUser)) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [settingsForm])

    return (
        <div className="w-full sm:hidden">
            <div className="flex flex-col w-full">
                <h4 className="text-[20px] font-[700] -tracking-[0.3px] text-center">
                    {edit_personal_informationI18}
                </h4>
                <div className="flex gap-1 justify-center">
                    <Image 
                        src={'/star-red.svg'} 
                        width={13} 
                        height={13} 
                        alt='red-star' 
                    />
                    <p className="text-red-500 text-[12px]">
                        프로필 사진 및 배경사진은  웹에서만 수정가능합니다.
                    </p>
                </div>
            </div>
            <div className="w-full py-[45px]">
                <SettingRow label={nickNameI18}>
                    <InputDark
                        value={settingsForm.nickName?.value}
                        onChange={handleChangeForm}
                        name="nickName"
                    />
                </SettingRow>
                <SettingRow label={aboutMeI18}>
                    <Textarea
                        onChange={handleChangeForm}
                        value={settingsForm.description?.value}
                        name="description"
                    />
                </SettingRow>
                <SettingRow label={SNSregistrationI18}>
                    <div className="flex flex-col gap-[21px] w-full">
                        <div className="flex flex-col gap-[10px] w-full mt-[10px]">
                            <div className="flex flex-row-reverse justify-between items-center gap-[10px]">
                                <SwitchButton
                                    name="instagram"
                                    on={settingsForm.instagram?.value}
                                    change={handleChangeForm}
                                />
                                <span className="xs:text-[15px]">{instagramI18}</span>
                            </div>
                            {settingsForm.instagram?.value && (
                                <InputDark
                                    name="instagramUrl"
                                    placeholder={plsEnterInstagramI18}
                                    onChange={handleChangeForm}
                                    value={settingsForm.instagramUrl?.value}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-[10px] w-full">
                            <div className="flex flex-row-reverse justify-between items-center gap-[10px]">
                                <SwitchButton
                                    name="twitter"
                                    on={settingsForm.twitter?.value}
                                    change={handleChangeForm}
                                />
                                <span className="xs:text-[15px]">{twitterI18}</span>
                            </div>
                            {settingsForm.twitter?.value && (
                                <InputDark
                                    name="twitterUrl"
                                    placeholder={plsEnterTwitterI18}
                                    onChange={handleChangeForm}
                                    value={settingsForm.twitterUrl?.value}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-[10px] w-full">
                            <div className="flex flex-row-reverse justify-between items-center gap-[10px]">
                                <SwitchButton
                                    on={settingsForm.facebook?.value}
                                    change={handleChangeForm}
                                    name="facebook"
                                />
                                <span className="xs:text-[15px]">{facebookI18}</span>
                            </div>
                            {settingsForm.facebook?.value && (
                                <InputDark
                                    name="facebookUrl"
                                    placeholder={plsEnterFacebookI18}
                                    onChange={handleChangeForm}
                                    value={settingsForm.facebookUrl?.value}
                                />
                            )}
                        </div>
                    </div>
                </SettingRow>

                <div className="flex gap-3 w-full justify-center py-[70px]">
                    <button
                        className={`hidden border text-[15px] font-[500] rounded-[4px] border-[#5E5E5E] text-[#DDDDDD] outline-none py-[5px] px-[15px]`}
                        onClick={handleBack}>
                        {backI18}
                    </button>
                    <button
                        className={`text-[15px] font-[500] rounded-[4px] text-[#fff] ${edit ? "bg-[#FB3873]" : "bg-[#252525]"} py-[5px] px-[15px]`}
                        onClick={handleSave}>
                        {saveI18}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MobileSettings;
