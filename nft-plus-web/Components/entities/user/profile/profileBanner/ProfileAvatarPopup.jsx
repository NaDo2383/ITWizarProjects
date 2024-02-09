import { useEffect, useState } from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import Image from "next/image";
import { FiImage } from "react-icons/fi";
import pro from "public/def_pro.png";
import useEditProfile from "../profileSubpage/subpages/editProfile/useEditProfile";
import useMyPageTranslation from "locale/useMypageTranslation";
import useProfile from "../useProfile";

function ProfilePopup() {
    const {
        nicknameI18,
        nameI18,
        self_introductionI18,
        editI18,
        cancelI18
    } = useMyPageTranslation()
    const {
        hideModal,
        getCurrentModalprops
    } = usePopup()
    const { updateProfileImg, updateProfile } = useEditProfile()
    const { getUserProfile } = useProfile()
    const [isUpdate, setIsUpdate] = useState(false)
    const [formData, setFormData] = useState({
        nickName: null,
        fullname: null,
        description: null,
        avatarPic: null
    })

    function handleImgUpload(e) {
        const form = new FormData()
        form.append('imageFile', e.target.files[0])

        updateProfileImg(form).then(() => {
            getUserProfile(true).then((rs) => {
                setFormData((prev) => ({ ...prev, avatarPic: rs?.profileImgUrl }))
            })
        })
    };

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function handleUpdateProfileForm() {
        updateProfile(formData).then(res => hideModal())
    }

    useEffect(() => {
        getCurrentModalprops().then(res => {
            if (Object.entries(formData).find(([key, value]) => value === null)) {
                setFormData((prev) => (
                    {
                        ...prev,
                        nickName: res?.nickName,
                        fullname: res?.fullname,
                        description: res?.description,
                        avatarPic: res?.profileImgUrl
                    }))
            }
        })
    }, [formData])

    useEffect(() => {
        setIsUpdate(true)
    }, [formData])

    return (
        <MainPopup>
            <div className="profilePopup-container">
                <div className="profilePopup">
                    <div className="w-full flex items-center gap-4 flex-col-reverse border-b pb-4">
                        <div className="w-full flex items-center gap-2">
                            <label className="text-[#333]">{nameI18}</label>
                            <input
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                className="profilePopup-input"
                            />
                        </div>
                        <div className="w-full flex items-center gap-2">
                            <label className="text-[#333]">{nicknameI18}</label>
                            <input
                                name="nickName"
                                value={formData?.nickName}
                                onChange={handleChange}
                                className="profilePopup-input"
                            />
                        </div>
                        <label>
                            <div className="profilePopup-user">
                                <Image
                                    unoptimized
                                    layout="fill"
                                    objectFit="cover"
                                    src={formData.avatarPic || pro}
                                    alt="avatarPic"
                                />

                                <div className="profilePopup-icon">
                                    <FiImage />
                                </div>
                                <input type="file" hidden id="avatar" onChange={handleImgUpload} />
                            </div>
                        </label>
                    </div>
                    <div className="w-full flex flex-col items-start py-2">
                        <label className="text-[#333]">{self_introductionI18}</label>
                        <textarea
                            onChange={handleChange}
                            name="description"
                            className='profilePopup-desc'
                            cols={100} rows={5} value={formData.description}
                        />
                    </div>
                    <div className="flex items-center mt-4 gap-4">
                        <button onClick={() => hideModal()} className="py-2 px-4 rounded-md border border-[#333]">{cancelI18}</button>
                        <button onClick={handleUpdateProfileForm} className={`${!isUpdate && "cursor-not-allowed"} py-2 px-4 rounded-md border bg-[#333] false text-white border-[#333]`}>{editI18}</button>
                    </div>
                </div>
            </div>
        </MainPopup>
    )
}

export default ProfilePopup