import { useEffect, useState } from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import { BsCheck } from "react-icons/bs";

const ArtFilter = ({
  open,
  filterHandler,
  isOpen,
  filterTerm
}) => {
  const [fixed, setFixed] = useState(false);
  const { globalItems } = useGlobalContext();
  const { distance, setDistance } = useGlobalContext();
  const {filterI18} = useCommonTranslation()

  const hangle = () => {
    typeof window !== "undefined" && setDistance(window.pageYOffset);
  };

  function checkScrollHeight() {
    if (window.pageYOffset > globalItems?.header?.clientData?.clientHeight) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }
  useEffect(() => {
    function handleScroll() {
      checkScrollHeight();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window?.addEventListener("scroll", hangle.bind(this));

    return () => {
      window?.removeEventListener("scroll", hangle.bind(this));
    };
  }, [distance]);

  const {
    copyrightContractWorksI18,
    artOwnershipTransactionI18,
    searchI18,
    initializationI18
  } = useArtworkTranslation();
  const { tradingItemI18 } = useCommonTranslation();
  const { method_paymentI18 } = useMyPageTranslation();

  function handleResetFilter() {
    filterHandler({
      ...filterTerm,
      ownsArt: false,
      rights: false,
      currency: null
    });
  }

  function handleSearch() {
    postMarketArtworks({ random: true, workIds: artworkRandomIds[0] });
  }

  function handleCheckbox(e) {
    const { checked, name, value } = e.target;
    filterHandler((prev) => ({ ...prev, [name]: value }));
  }

  function handleCurrencyRadio(e) {
    const { name, value } = e.target;
    filterHandler((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div
      className={`  z-30  top-0 left-0  bg-white 
 transform ${
   isOpen
     ? "translate-x-0 overflow-auto md:w-[250px] px-5 "
     : "-translate-x-[250px] overflow-hidden w-0 px-0"
 } transition-all duration-300 relative`}
      style={{
        position: distance >= 500 ? "fixed" : "relative",
        top: distance >= 500 ? "70px" : "",
        transform: distance ? "translateY(0)" : "",
        transition: "all 500ms"
      }}>
      <div className="flex justify-center items-center ">
        <h3 className="sideBar-title">{filterI18}</h3>
      </div>
      <button
        onClick={open}
        className="absolute top-[5px] w-7 h-7 lg:top-[110px] right-4 text-gray-500">
        <div className="sideBar-closeBtn"></div>
      </button>
      <div className="w-full  font-[300] text-sm py-6 leading-loose">
        <h3 className="font-[500] mb-2 text-[18px] text-clip">
          {tradingItemI18}
        </h3>
        <div className="flex items-center mb-1 gap-1 relative">
          <input
            type="checkbox"
            checked={filterTerm?.ownsArt}
            name="ownsArt"
            value={true}
            onChange={handleCheckbox}
            className="sideBar-input"
            id="check1"
          />
          <div
            className={`sideBar-icon ${
              filterTerm?.ownsArt ? "bg-black" : "border border-[#D9D9D9]"
            }`}>
            <BsCheck width={18} height={18} />
          </div>
          <label className="sideBar-label" htmlFor="check1">
            {artOwnershipTransactionI18}
          </label>
        </div>
        <div className="flex items-center mb-1 gap-1 relative">
          <input
            type="checkbox"
            checked={filterTerm?.rights}
            name="rights"
            value="1,2,3,4,5,6,7"
            onChange={handleCheckbox}
            className="sideBar-input"
            id="check2"
          />
          <div
            className={`sideBar-icon ${
              filterTerm?.rights ? "bg-black" : "border border-[#D9D9D9]"
            } `}>
            <BsCheck width={18} height={18} />
          </div>
          <label className="sideBar-label" htmlFor="check2">
            {copyrightContractWorksI18}
          </label>
        </div>
      </div>
      <div className="w-full  text-[#444] font-[300] text-sm leading-loose">
        <h4 className="font-[500] mb-2 text-[18px] text-black text-clip overflow-hidden">
          {method_paymentI18}
        </h4>
        <div className="flex items-center mb-1 gap-1 relative">
          <input
            type="checkbox"
            checked={filterTerm?.currency === "MATIC"}
            name="currency"
            value="MATIC"
            onChange={handleCurrencyRadio}
            className="sideBar-input"
            id="check3"
          />
          <div
            className={`sideBar-icon ${
              filterTerm?.currency === "MATIC"
                ? "bg-black"
                : "border border-[#D9D9D9]"
            } `}>
            <BsCheck width={18} height={18} />
          </div>
          <label className="sideBar-label" htmlFor="check3">
            {copyrightContractWorksI18}
          </label>
        </div>
        <div className="flex items-center mb-1 gap-1 relative">
          <input
            type="checkbox"
            checked={filterTerm?.currency === "EYES"}
            name="currency"
            value="EYES"
            onChange={handleCurrencyRadio}
            className="sideBar-input"
            id="check3"
          />
          <div
            className={`sideBar-icon ${
              filterTerm?.currency === "EYES"
                ? "bg-black"
                : "border border-[#D9D9D9]"
            } `}>
            <BsCheck width={18} height={18} />
          </div>
          <label className="sideBar-label" htmlFor="check3">
            {copyrightContractWorksI18}
          </label>
        </div>
      </div>
      <div className="w-full  text-black text-sm py-6">
        <div className="w-full pt-4 text-[#333] font-[500]">
          <button
            onClick={handleSearch}
            className="sideBar-btn bg-[#333] text-white">
            {searchI18}
          </button>
        </div>
        <div className="w-full pt-4 text-[#333] font-[500]">
          <button
            onClick={handleResetFilter}
            className="sideBar-btn hover:bg-[#333] hover:text-white">
            {initializationI18}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtFilter;
