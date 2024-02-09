/**
 * @createdBy duka 
 */
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import Image from "next/image";
import closeIcon from "public/close.svg";
import security_icon from "public/security_icon.png";
import useMyPageTranslation from "locale/useMypageTranslation";

function EditPasswordConfirmPopup() {
    const { hideModal } = usePopup()
    const { yourpasswordHasBeenChangedI18, confirmI18 } = useMyPageTranslation()

    return (
        <MainPopup>
            <div className="confirmPassPopup">
                <div className="flex w-full justify-end pt-7 pr-7 select-none">
                    <div className="relative">
                        <Image
                            className="w-[31px] h-[31px] cursor-pointer "
                            src={closeIcon}
                            alt="closeIcon"
                        />
                    </div>
                </div>
                <div className="w-full px-[103px] pb-7">
                    <h3 className="confirmPassPopup-title">
                        {yourpasswordHasBeenChangedI18}
                    </h3>
                </div>
                <div className="confirmPassPopup-icon">
                    <h3 className="confirmPassPopup-imgTitle">
                        *****
                    </h3>
                    <div className="flex justify-center">
                        <Image className="absolute" src={security_icon} alt="security_icon" />
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button
                        onClick={() => hideModal()}
                        className="confirmPassPopup-btn"
                    >
                        <h3 className="confirmPassPopup-btnTitle">
                            {confirmI18}
                        </h3>
                    </button>
                </div>
            </div>
        </MainPopup>
    )
}

export default EditPasswordConfirmPopup;