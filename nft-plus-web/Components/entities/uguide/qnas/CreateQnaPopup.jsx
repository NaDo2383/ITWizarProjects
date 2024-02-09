import Label from "Components/ui/label/Label";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import usePopup from "Components/ui/popup/usePopup";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ObjectUtil from "utils/ObjectUtil";
import CheckboxRounded from "Components/ui/checkbox/CheckboxRounded";

function CreateQnaPopup() {
  const { locale } = useRouter();
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState({
    category: false,
    password: false,
    question: false,
    title: false
  });
  const {
    categoryI18,
    contactUsI18,
    passwordPlaceholderI18,
    disclosureI18,
    openI18,
    privateTextI18,
    titleI18,
    selectboxOp3,
    subjectPlaceholderI18,
    textareaPlaceholderI18
  } = useFAQpageTranslation();
  const { selectI18, askQnaI18 } = useFAQpageTranslation()
  const { cancel } = useArtworkTranslation();
  const {
    hideModal,
    handleShowModal,
    MODAL_TYPES,
    popupProps,
    getCurrentModalprops,
    globalModalState,
    setGlobalModalState
  } = usePopup();

  const onSubmit = (event) => {
    console.log("text")
    event.preventDefault();
    let formData = new FormData(event.target);
    let data = ObjectUtil.formDataToJson(formData);
    data.type = isPublic ? "PUBLIC" : "PRIVATE";
    data.language = locale === "en" ? "en" : "kr";
    let err = {};
    for (const [key, value] of Object.entries(data)) {
      if (key && value.trim() !== "") {
        data[key] = value.trim();
      }
      if (!value || !value.trim() || value.trim() === "") {
        err[key] = true;
      } else {
        err[key] = false;
      }
    }
    setError({ ...error, ...err });
    if (Object.values(err).includes(true)) return;
    handleShowModal(MODAL_TYPES.QNA_CONFIRM, data);
  };

  useEffect(() => {
    getCurrentModalprops();
  }, [popupProps]);

  useEffect(() => {
    if(globalModalState?.qnaPrevData){
      setIsPublic(globalModalState?.qnaPrevData?.isPublic === "public")
    }
  }, [globalModalState?.qnaPrevData]);

  return (
    <MainPopup width={540}>
      <form onSubmit={onSubmit}>
      <PopupContainer>
        <PopupHeader text={askQnaI18} />
        <PopupContent>
          <div className="mb-[50px]">
            <div className="w-full mt-[42px] py-[7px] flex gap-4 items-center justify-between">
              <h4 className="text-[#DDD] md:text-[16px] sm:text-[16px] text-[14px] font-[500] w-1/4">{disclosureI18}</h4>
              <div className="flex-1 items-center flex gap-2">
                <div className="w-2/5 flex">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <CheckboxRounded
                        id="private"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        rounded={true}
                      />
                      <Label
                        label={openI18}
                        htmlFor="private"
                        layer={true}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckboxRounded
                        id="public"
                        checked={!isPublic}
                        onChange={(e) => setIsPublic(!e.target.checked)}
                        rounded={true}
                      />
                      <Label
                        label={privateTextI18}
                        htmlFor="public"
                        layer={true}
                      />
                    </div>
                  </div>
                </div>
                {!isPublic && (
                  <div className="flex-1">
                    <input
                      type="password"
                      name="password"
                      defaultValue={globalModalState?.qnaPrevData?.password}
                      className={
                        error.password
                          ? "w-full border py-1 font-[300] focus:outline-none rounded-md border-[#FB3873] placeholder:text-[#aaa] px-2 placeholder:font-[300] bg-[#0F1111]"
                          : "w-full border-[#5C5C5C] py-1 font-[300] focus:outline-none bg-[#0F1111] focus:border-[#ff00e4] rounded-md placeholder:text-[#5A5A5A] px-2 placeholder:font-[400]"
                      }
                      placeholder={passwordPlaceholderI18}
                      autoComplete="off"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="w-full border-t border-[#292929] flex gap-4  py-2 items-center justify-between">
              <h4 className="text-[#DDD] md:text-[16px] sm:text-[16px] text-[14px] font-[500] w-1/4">{categoryI18}</h4>
              <div className="flex-1 items-center flex gap-2">
                <div className="w-full max-w-[256px] flex">
                  <select
                    name="category"
                    defaultValue={globalModalState?.qnaPrevData?.category}
                    className={
                      error.category
                        ? "border-red-400 w-full border py-1 font-[400] focus:outline-none  rounded-md placeholder:text-[#fff] placeholder:font-[300] px-2"
                        : "w-full bg-[#181A1A] focus:outline-none border-[#5C5C5C] focus:border-[#FB3873] text-[#fff] border p-[0.15625rem] rounded-md"
                    }>
                    <option value="선택">{selectI18}</option>
                    {popupProps?.map((cat, index) => (
                      <option key={index} value={cat.value}>
                        {cat.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-[#292929] flex gap-4  py-2 items-center justify-between">
              <h4 className="text-[#DDD] md:text-[16px] sm:text-[16px] text-[14px] font-[500] w-1/4">{titleI18}</h4>
              <div className="flex-1 items-center flex gap-2">
                <div className="flex-1">
                  <input
                    name="title"
                    defaultValue={globalModalState?.qnaPrevData?.title}
                    className={
                      error.title
                        ? " w-full border border-[#FB3873]  py-1 font-[400] focus:outline-none  rounded-md placeholder:text-[#5A5A5A] placeholder:font-[400] px-2 bg-[#0F1111]"
                        : "w-full text-white bg-[#0F1111] border py-1 font-[400] border-[#5C5C5C] focus:outline-none focus:border-[#FB3873] rounded-md placeholder:text-[#5A5A5A] placeholder:font-[300] px-2"
                    }
                    placeholder={subjectPlaceholderI18}
                  />
                </div>
              </div>
            </div>
            <div className="w-full border-t border-[#292929] gap-4 pt-[14px] items-center justify-between">
              <h4 className="text-[#DDD] md:text-[16px] sm:text-[16px] text-[14px] font-[500] w-1/4">{selectboxOp3}</h4>
              <textarea
                name="question"
                placeholder={textareaPlaceholderI18}
                defaultValue={globalModalState?.qnaPrevData?.question}
                className={
                  error.question
                    ? "w-full h-full focus:outline-none border-[#FB3873]  border bg-[#0F1111] placeholder:text-[#5A5A5A] py-2 px-3 placeholder:font-[400] rounded-lg  min-h-[200px]"
                    : "bg-[#0F1111] text-white w-full focus:outline-none focus:border-[#FB3873] border border-[#0F1111] placeholder:text-[#5A5A5A] p-[15px] placeholder:font-[400] rounded-lg h-full min-h-[200px]"
                }></textarea>
            </div>
          </div>
        </PopupContent>
        <PopupActionButtons  no={() => {
          hideModal()
          setGlobalModalState(prev => ({...prev, qnaPrevData: null }))
          }} btnTexts={{ no: cancel, yes: contactUsI18 }} yesBtnType="submit" />
      </PopupContainer>
      </form>
    </MainPopup>
  );
}

export default CreateQnaPopup;
