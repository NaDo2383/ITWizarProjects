import { useEffect, useState, useReducer, useRef } from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import Checkbox from "Components/ui/checkbox/Checkbox";
import useArtwork from "Components/entities/artwork/useArtwork";

const righs = Array.from({ length: 7 }, () => false);
const Filter = (props) => {
  const {
    open,
    isOpen,
    filterHandler,
    resetMarket,
  } = props
  const {  getArtRights } = useArtwork()
  const [checkedRights, setCheckedRights] = useState(righs);
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [filterYn, setFilterYn] = useState(false);
  const {
    copyrightContractWorksI18,
    artOwnershipTransactionI18,
    searchI18,
    initializationI18,
  } = useArtworkTranslation();
  const { tradingItemI18, filterI18 } = useCommonTranslation();
  const { method_paymentI18 } = useMyPageTranslation();

  const filterReducer = (state = {}, action) => {
    const rightStrings = checkedRights
      .map((el, i) => {
        return { bool: el, right: i + 1 };
      })
      .filter((el) => el.bool)
      .map((el) => el.right)
      .join(",");
    switch (action.type) {
      case "COPYRIGHT":
        const ownership = action.ownsArt;
        if (state.ownsArt && !ownership) delete state.ownsArt;
        const cr = {
          ...state,
          ...(ownership ? { ownsArt: action.ownsArt } : {}),
        };
        return cr;
      case "CHECK_ALL":
        const checked = action.checked;
        if (state.rights && !checked) delete state.rights;
        const ac = {
          ...state,
          ...(checked ? { rights: rightStrings } : {}),
        };
        return ac;
      case "CURRENCY":
        if (state.currency && action.currency.length === 0)
          delete state.currency;
        const c = {
          ...state,
          ...(action.currency.length !== 0
            ? { currency: action.currency.join(",") }
            : {}),
        };
        return c;

      case "PRICE":
        return {
          ...state,
          minPrice: action.minPrice,
          maxPrice: action.maxPrice,
        };

      case "RIGHTS":
        if (state.rights && rightStrings.length === 0) delete state.rights;
        return {
          ...state,
          ...(rightStrings.length !== 0 ? { rights: rightStrings } : {}),
        };

      default:
        setAllChecked(false);
        setCheckedRights(checkedRights.map((el) => false));
        setFilterYn(true);
        setSelectedCurrency([]);
        return {};
    }
  };

  const [filterState, dispatchFilterState] = useReducer(filterReducer, {});
  const selectRightHandler = (index) => {
    const updatedList = [...checkedRights];
    updatedList[index] = !updatedList[index];
    setCheckedRights(updatedList);
    dispatchFilterState({
      type: "RIGHTS",
      checks: checkedRights,
    });
  };

  const checkAll = () => {
    const allDone = checkedRights.every((el) => el);
    if (allDone) {
      setCheckedRights(checkedRights.map((el) => false));
      setAllChecked(false);
      dispatchFilterState({
        type: "CHECK_ALL",
        checked: false,
      });
    } else {
      setCheckedRights(checkedRights.map((el) => true));
      setAllChecked(true);
      dispatchFilterState({
        type: "CHECK_ALL",
        checked: true,
      });
    }
  };

  const selectCopyrightHandler = (event) => {
    dispatchFilterState({
      type: "COPYRIGHT",
      ownsArt: event.target.checked,
    });
  };

  const selectCurrencyHandler = (currency) => {
    const selected = selectedCurrency.find((cur) => cur === currency);
    switch (currency) {
      case "MATIC":
        if (selected) {
          setSelectedCurrency((prevState) =>
            prevState.filter((el) => el !== currency)
          );
        } else {
          const mat = selectedCurrency.find((cur) => cur === "EYES");
          if (mat) {
            setSelectedCurrency((prevState) =>
              prevState.filter((el) => el !== "EYES")
            );
          }
          setSelectedCurrency((prevState) => [...prevState, currency]);
        }
        break;
      case "EYES":
        if (selected) {
          setSelectedCurrency((prevState) =>
            prevState.filter((el) => el !== currency)
          );
        } else {
          const mat = selectedCurrency.find((cur) => cur === "MATIC");
          if (mat) {
            setSelectedCurrency((prevState) =>
              prevState.filter((el) => el !== "MATIC")
            );
          }
          setSelectedCurrency((prevState) => [...prevState, currency]);
        }
        break;
      default:
        return;
    }
  };

  const vals = (min, max) => {
    dispatchFilterState({
      type: "PRICE",
      maxPrice: max,
      minPrice: min,
    });
  };

  const refreshFilter = () => {
    dispatchFilterState({ type: null });
    resetMarket && resetMarket();
  };

  useEffect(() => {
    getArtRights()
  }, []);

  useEffect(() => {
    dispatchFilterState({
      type: "CURRENCY",
      currency: selectedCurrency,
    });
  }, [selectedCurrency]);

  useEffect(() => {
    const checkedFound = checkedRights.find((el) => el === true);
    if (checkedFound) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkedRights]);

  return (
    <div
      className={`min-h-screen fixed w-full md:w-[250px] z-30 h-[100%] overflow-auto transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition pt-[56px] lg:pt-[88px] px-5 top-0 duration-300 left-0 bg-white border-r`}
    >
      <div className="flex justify-center items-center">
      <h3 className="font-bold text-[22px] py-4 md:pb-8 md:pt-24 border-b border-black w-full text-center">
          {filterI18}
        </h3>
      </div>
      <button
        onClick={open}
        className="absolute top-[75px] w-7 h-7 lg:top-[110px] right-4 text-gray-500"
      >
        <div className="h-[2px] w-6 relative before:absolute before:w-full before:h-full before:bg-[#929292] before:left-0 before:transform before:rotate-45 after:absolute after:w-full after:h-full after:bg-[#929292] after:left-0 after:transform after:-rotate-45"></div>
      </button>
      <div className="w-full  font-[300] text-sm py-6 leading-loose">
        <h3 className="font-[500] mb-2 text-[18px]">{tradingItemI18}</h3>
        <div className="flex items-center mb-1 gap-1">
          <Checkbox
            id="check"
            checked={filterState.ownsArt ? filterState.ownsArt : false}
            onChange={selectCopyrightHandler}
          />
          <label className="text-[#444]" htmlFor="check">
            {artOwnershipTransactionI18}
          </label>
        </div>
        <div className="flex items-center mb-1 gap-1">
          <Checkbox
            id="check1"
            checked={allChecked}
            onChange={() => {}}
            onClick={checkAll}
          />
          <label className="text-[#444]" htmlFor="check1">
            {copyrightContractWorksI18}
          </label>
        </div>
       {/* <div className="w-full pl-6">
          {rightsList?.result?.map((el, index) => (
            <div
              key={`check-${index}`}
              className="flex items-center mb-1 gap-1"
            >
              <Checkbox
                checked={checkedRights[index]}
                onChange={(e) => selectRightHandler(index)}
                id={"right" + el.id}
              />
              <label className="text-[#444]" htmlFor={"right" + el.id}>
                {index == 2
                  ? allRightsI18[el.code].split("(")[0].trim()
                  : allRightsI18[el.code]}
              </label>
            </div>
          ))}
                </div> */}
      </div>
      <div className="w-full  text-[#444] font-[300] text-sm leading-loose">
        <h3 className="font-[500] mb-2 text-[18px] text-black">
          {method_paymentI18}
        </h3>
        <div className="flex items-center mb-1 gap-1">
          <Checkbox
            id="check10"
            checked={
              selectedCurrency.find((cur) => cur === "MATIC") ? true : false
            }
            onChange={(e) => selectCurrencyHandler("MATIC")}
          />
          <label className="text-[#444]" htmlFor="check10">
            MATIC
          </label>
        </div>
        <div className="flex items-center mb-1 gap-1">
          <Checkbox
            id="check11"
            checked={
              selectedCurrency.find((cur) => cur === "EYES") ? true : false
            }
            onChange={(e) => selectCurrencyHandler("EYES")}
          />
          <label className="text-[#444]" htmlFor="check11">
            EYES
          </label>
        </div>
      </div>
      <div className="w-full  text-black text-sm py-6">
        {/* <h3 className="font-[500] mb-2 text-lg text-black">소유권 거래 가격</h3>
                <MultiRangeSlider minValue={minValue || undefined} maxValue={maxValue || undefined} setVals={vals} filterYn={filterYn} ref={childFunc} /> */}

        <div className="w-full pt-4 text-[#333] font-[500]">
          <button
            onClick={() => filterHandler(filterState)}
            className="w-full p-2 border border-[#333] transition duration-300 bg-[#333] text-[14px] text-white cursor-pointer rounded-[4px]"
          >
            {searchI18}
          </button>
        </div>
        <div className="w-full pt-4 text-[#333] font-[500]">
          <button
            onClick={refreshFilter}
            className="w-full p-2 border border-[#333] transition duration-300 text-[14px] hover:bg-[#333] hover:text-white cursor-pointer rounded-[4px]"
          >
            {initializationI18}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
