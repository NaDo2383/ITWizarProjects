import { useEffect } from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import useMarket from "Components/entities/artwork/useMarket";
import { BsCheck } from "react-icons/bs";
import closeIco from "public/close.png";
import Image from "next/image";

const SideFilter = () => {
  const {
    copyrightContractWorksI18,
    artOwnershipTransactionI18,
    searchI18,
    initializationI18,
  } = useArtworkTranslation();
  const { tradingItemI18 } = useCommonTranslation();
  const { method_paymentI18 } = useMyPageTranslation();
  const { isShowFilter, setIsShowFilter } = useGlobalContext()
  const {
    handleFilterUrl,
    postMarketArtworks,
    filterTerm,
    setFilterTerm,
    selectedCategory,
    getRandomMarketArtIds,
    marketArtQueryStr,
  } = useMarket()
  

  function handleResetFilter() {
    setFilterTerm(({
      checkOwnsArt: false,
      checkAllRights: false,
      currency: null,
    }))
    getRandomMarketArtIds("").then( (res) => {
      postMarketArtworks({ random: true, workIds: res[0] })
    })
    setIsShowFilter(false)
  }

  function handleSearch() {
    const filterUrl = marketArtQueryStr.split('?')[1]
    const fetchUrl = selectedCategory === 'All' ? marketArtQueryStr : (`?category=${selectedCategory}` + `&${filterUrl}`)
    getRandomMarketArtIds(fetchUrl).then((res) => {
      postMarketArtworks({ random: true, workIds: res[0] })
    })
    setIsShowFilter(false)
  }

  function handleCheckbox(e) {
    const { checked, name } = e.target
    setFilterTerm((prev) => ({ ...prev, [name]: checked }))
  }

  function handleCurrencyRadio(e) {
    const { name, value } = e.target
    setFilterTerm((prev) => ({ ...prev, [name]: value }))
    if(filterTerm.currency === value ) {
        setFilterTerm((prev) => ({ ...prev, currency: null }))
    }
  }

  useEffect(() => {
      handleFilterUrl(selectedCategory)
  }, [filterTerm])

  return (
    <div className={`sideBar transform ${isShowFilter ? "translate-x-0" : "-translate-x-full"
      } transition duration-300`}>
      <div className="flex justify-center items-center mt-10">
        <h2 className="sideBar-title">
          Filter
        </h2>
      </div>
      <button onClick={() => setIsShowFilter(false)} className="absolute top-[100px] w-7 h-7 lg:top-[110px] right-4 text-gray-500">
        <Image src={closeIco} alt="closeIco" />
      </button>
      <div className="w-full  font-[300] text-sm py-6 leading-loose">
        <h2 className="font-[500] mb-2 text-[18px] text-clip">{tradingItemI18}</h2>
        <div className="flex items-center mb-1 gap-1 relative">
          <input type="checkbox" checked={filterTerm?.checkOwnsArt} name="checkOwnsArt" onChange={handleCheckbox}
            className="sideBar-input" id="check1" />
          <div
            className={`sideBar-icon ${filterTerm?.checkOwnsArt ? "bg-black" : "border border-[#D9D9D9]"}`}>
            <BsCheck width={18} height={18} />
          </div>
          <label className="sideBar-label" htmlFor="check1">
            {artOwnershipTransactionI18}
          </label>
        </div>
        <div className="flex items-center mb-1 gap-1 relative">
          <input type="checkbox" checked={filterTerm?.checkAllRights} name="checkAllRights" onChange={handleCheckbox}
            className="sideBar-input" id="check2" />
          <div
            className={`sideBar-icon ${filterTerm?.checkAllRights ? "bg-black" : "border border-[#D9D9D9]"} `}>
            <BsCheck width={18} height={18} />
          </div>
          <label className="sideBar-label" htmlFor="check2">
            {copyrightContractWorksI18}
          </label>
        </div>
      </div>
      <div className="w-full  text-[#444] font-[300] text-sm leading-loose">
        <h2 className="font-[500] mb-2 text-[18px] text-black text-clip overflow-hidden">
          {method_paymentI18}
        </h2>
        <div className="flex items-center mb-1 gap-1 relative">
          <input type="checkbox" checked={filterTerm?.currency === 'MATIC'} name="currency" value='MATIC' onChange={handleCurrencyRadio} className="sideBar-input" id="check3" />
          <div
            className={`sideBar-icon ${filterTerm?.currency === 'MATIC' ? "bg-black" : "border border-[#D9D9D9]"} `}>
            <BsCheck width={18} height={18} />
          </div>
          <label className="sideBar-label" htmlFor="check3">
            MATIC
          </label>
        </div>
        <div className="flex items-center mb-1 gap-1 relative">
          <input type="checkbox" checked={filterTerm?.currency === 'EYES'} name="currency" value='EYES' onChange={handleCurrencyRadio} className="sideBar-input" id="check3" />
          <div
            className={`sideBar-icon ${filterTerm?.currency === 'EYES' ? "bg-black" : "border border-[#D9D9D9]"} `}>
            <BsCheck width={18} height={18} />
          </div>
          <label className="sideBar-label" htmlFor="check3">
            EYES
          </label>
        </div>
      </div>
      <div className="w-full  text-black text-sm py-6">
        <div className="w-full pt-4 text-[#333] font-[500]">
          <button
            onClick={handleSearch}
            className="sideBar-btn bg-[#333] text-white"
          >
            {searchI18}
          </button>
        </div>
        <div className="w-full pt-4 text-[#333] font-[500]">
          <button onClick={handleResetFilter}
            className="sideBar-btn hover:bg-[#333] hover:text-white"
          >
            {initializationI18}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
