import usePopup from "Components/ui/popup/usePopup";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import React from "react";
import { BiSearch } from "react-icons/bi";
import ObjectUtil from "utils/ObjectUtil";
import useQnas from "./useQna";
import { useGlobalContext } from "common/global/useGlobalContext";

const QnaFilter = ({ options }) => {
  const { authUser } = useGlobalContext()
  const { allI18, contactUsI18, loginErrorI18 } = useFAQpageTranslation();
  const { filterState, setFilterState } = useQnas();
  
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = ObjectUtil.formDataToJson(formData);
    setFilterState({ ...filterState, ...data });
  };

  const { handleShowModal, MODAL_TYPES } = usePopup();

  function handleCreate() {
    if(authUser?.id) {
        handleShowModal(MODAL_TYPES.QNA_CREATE, options);
    }else {
       handleShowModal(MODAL_TYPES.ALERT, { message: loginErrorI18 });
    }
  }
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full flex justify-end items-center gap-1">
        <div className="w-full flex lg:flex-row items-center gap-2 justify-end">
          <select
            name="category"
            className="bg-[#181A1A] border border-[#5C5C5C] sm:text-[18px] text-[14px] text-white sm:text-sm focus:outline-none font-[400] rounded-[8px] sm:px-[10px] sm:py-[7px] p-[5px]">
            <option className="flex items-center" value="">저작재산권 거래(라이선스 신청)</option>
            {options?.map((cat, index) => {
              return (
                <option key={index} value={cat.value}> 
                  {cat.value}
                </option>
              );
            })}
          </select>
          <div className="flex flex-row gap-2 lg:mt-0 sm:mt-2 ">
            <div className="sm:flex hidden items-center lg:w-[245px] w-[225px]">
              <input
                type="text"
                name="searchWord"
                className="bg-black py-[9px] rounded-l-md focus:outline-none pl-2 w-full"
                autoComplete={"new-password"}
              />
              <button
                type="submit"
                className="bg-black py-[9px] px-[10px] rounded-r-md text-[#ABABAB]">
                <BiSearch className="w-[24px] h-[24px]" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleCreate}
              className="sm:min-w-[126px] min-w-[95px] bg-[#6319FF] flex items-center truncate sm:rounded-[8px] rounded-[5px] sm:px-[15px] sm:py-[7px] p-[5px_10px_5px_10px]">
              <p className="sm:text-[18px] lg:text-[18px] text-[14px] font-[400] text-white ">1:1 {contactUsI18}</p>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default QnaFilter;
