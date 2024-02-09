import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import { useRouter } from "next/router";
import useAuthUser from "../../auth/useAuthUser";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import closeIcon from "public/close.svg";
import Image from "next/image";
import useMyPageTranslation from "locale/useMypageTranslation";

function ProfilePopup() {
    const { push } = useRouter();
    const { authUser } = useAuthUser();
    const {
        settingHeadI18,
        settingQsI18,
        settingCloseI18,
        saveI18
    } = useMyPageTranslation()
    const {
        hideModal,
        globalModalState,
    } = usePopup()
    function save() {
        globalModalState?.saveProfile()
        hideModal()
    }

    return (
        <MainPopup width={580}>
            <PopupContainer>
                <div className="flex justify-between mb-[32px]">
                    <h4 className="text-[22px] text-white font-[500]">{settingHeadI18}</h4>
                    <button onClick={() => hideModal()} className="w-[29px] h-[29px]">
                        <Image src={closeIcon} alt="closeIcon" />
                    </button>
                </div>
                <PopupContent>
                    <div className="mb-[30px]">
                        <span className="text-[18px] text-[#DDD] font-[400]">{settingQsI18}</span>
                    </div>
                </PopupContent>
                <PopupActionButtons
                    yes={() => save()}
                    no={() => (
                        push('/mypage'),
                        hideModal()
                    )}
                    btnTexts={{ no: settingCloseI18, yes: saveI18 }}
                />
            </PopupContainer>
        </MainPopup>
    )
}

export default ProfilePopup