/**
 * @createdBy duka 2023/4
 */
import { useState } from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import usePopup from "Components/ui/popup/usePopup";
import useEditProfile from './useEditProfile'
import useMyPageTranslation from "locale/useMypageTranslation";
import useCommonTranslation from "locale/useCommonTranslation";

function EditPasswordPopup() {
    const { hideModal, handleShowModal, MODAL_TYPES } = usePopup();
    const { updateProfilePassword } = useEditProfile()
    const { 
        changePasswordI18, 
        proTableDesc1_I18, 
        proTableDesc2_I18, 
        currentPassI18, 
        newPasswordI18, 
        confirmNewPasswordI18, 
        cancelI18, 
        wrongPassI18 
    } = useMyPageTranslation()
    const { regDescI18, regDesc2I18 } = useCommonTranslation()
    const [validPassword, setValidPassword] = useState(true);
    const [diffPassword, setDiffPassword] = useState(true);
    const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [validForm, setValidForm] = useState(true);
    const [passUpdated, setPassUpdated] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);

    function handleConfirmPassword() {
        updateProfilePassword({}).then((res) => {
            handleShowModal(MODAL_TYPES.EDIT_CONFIRM_PASSWORD);
        })
    }

    function handleSavePassword() {
        if (
            /.{8,}/.test(enteredPassword) &&
            /[0-9]/.test(enteredPassword) &&
            /[a-z]/.test(enteredPassword) &&
            /[~!@#$%^*\.]/.test(enteredPassword)
        ) {
            setValidPassword(true);
            const passMatched = enteredPassword === enteredPasswordConfirm;
            if (
                oldPass.trim() !== "" &&
                enteredPassword.trim() !== "" &&
                enteredPasswordConfirm.trim() !== ""
            ) {
                setValidForm(true);
                if (passMatched) {
                    setPassUpdated(true);
                    const formData = {
                        oldPassword: oldPass,
                        oldPasswordConfirm: oldPass,
                        newPassword: enteredPassword,
                        newPasswordConfirm: enteredPasswordConfirm,
                    };
                    updateProfilePassword(formData).then(e => handleConfirmPassword())
                }
            } else {
                setValidForm(false);
            }
        } else {
            setValidPassword(false);
        }
    }

    return (
        <MainPopup>
            <PopupContainer>
                <PopupHeader text={changePasswordI18} />
                <PopupContent>
                    <div className="editPopup-main1">
                        <p>{proTableDesc1_I18}</p>
                        <p>{proTableDesc2_I18}</p>
                        {wrongPass && <p className="text-red-400">{wrongPassI18}</p>}
                        <div className="w-full flex flex-col sm:flex-row justify-between items-center px-[38px] mt-[15px]">
                            <label className="editPopup-label">{currentPassI18}</label>
                            <div className="editPopup-input-div">
                                <input value={oldPass} onChange={(e) => setOldPass(e.target.value)} type="password" placeholder="Password" className={`editPopup-input ${validForm ? "border-[#cbcbcb]" : "border-red-400"
                                    } focus:outline-none focus:border-[#ff00e4]`} />
                            </div>
                        </div>
                    </div>
                    <div className="editPopup-main2">
                        <div className="w-full pt-[26px] mb-[12px]">
                            <p className={`editPopup-p ${validPassword ? "text-[#333]" : "text-red-400"}`}>{regDescI18}</p>
                            <p className={`editPopup-p ${validPassword ? "text-[#333]" : "text-red-400"}`}>{regDesc2I18}</p>
                        </div>
                        <div className="editPopup-newContainer">
                            <label className="editPopup-label">{newPasswordI18}</label>
                            <div className="editPopup-input-div">
                                <input onChange={(e) => setEnteredPassword(e.target.value)} type="password" placeholder="Password"
                                    className={`editPopup-input ${validPassword ? "border-[#cbcbcb]" : "border-red-400"} `} />
                            </div>
                        </div>
                        <div className="editPopup-newContainer">
                            <label className="editPopup-label">{confirmNewPasswordI18}</label>
                            <div className="editPopup-input-div">
                                <input onChange={(e) => setEnteredPasswordConfirm(e.target.value)}
                                    type="password" placeholder="Re-Type-Password" className={`editPopup-input ${diffPassword ? "border-[#cbcbcb]" : "border-red-400"} `} />
                            </div>
                        </div>
                    </div>
                </PopupContent>
                <PopupActionButtons yes={handleSavePassword} no={() => hideModal()} btnTexts={{ no: cancelI18, yes: changePasswordI18 }} />
            </PopupContainer>
        </MainPopup>
    )
}

export default EditPasswordPopup;