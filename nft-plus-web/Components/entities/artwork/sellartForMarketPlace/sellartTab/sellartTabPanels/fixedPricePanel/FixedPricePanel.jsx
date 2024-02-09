import React, { useEffect, useState } from "react";
import useArtDetail from "Components/entities/artwork/detail/useArtDetail";
import useMyPageTranslation from "locale/useMypageTranslation";
import EyesWhiteIcon from "public/eyeswhite.png";
import useArtworkTranslation from "locale/useArtworkTranslation";
import Checkbox from "Components/ui/checkbox/Checkbox";
import Image from "next/image";
import useSellart from "../../../useSellart";
import DisplayPriceBtn from "./DisplayPriceBtn";
import matic_logo_white from "public/matic-logo-white.png";
import useCurrency from "common/metamask/useCurrency";
import { useRouter } from "next/router";
import AuctionInput from "Components/ui/input/AuctionInput";
import useFee from "Components/entities/artwork/useFee";
import usePopup from "Components/ui/popup/usePopup";

function FixedPricePanel() {
  const { push, query } = useRouter()
  const { method_paymentI18 } = useMyPageTranslation();
  const [error, setError] = useState({ nonPrice: false, nonChecked: false });
  const {
    priceI18,
    plsEnterSellingPriceI18,
    noticeI18,
    noticeTextLi1I18,
    noticeTextLi2I18,
    noticeTextLi3I18,
    agreeI18,
    plsAgreeTermsI18,
    commissionI18,
    salesCommissionI18,
    creatorRoyaltyI18,
    checkCheckBoxI18,
    resaleFeeI18
  } = useArtworkTranslation();
  const { artDetail } = useArtDetail();
  const {
    priceState,
    setPriceState,
    addEyesPrice,
    addMaticPrice,
    resetSellartContext,
    generatedFees
  } = useSellart();
  const [convertedWon, setConvertedWon] = useState(null);
  const { toWon, toWei, excreptWon } = useCurrency();
  const [saleFee, setSaleFee] = useState(0)
  const { getFee } = useFee()

  const { setGlobalModalState, hideModal } = usePopup();
  async function handlePrice(value, name) {
    setPriceState((prev) => ({
      ...prev,
      newPrice: value
    }));
    setError({ ...error, nonPrice: false });
    const weiPrice = toWei(value);
    toWon(weiPrice).then((res) => setConvertedWon(res));
  }
  async function handleAllow(e) {
    const { checked } = e.target;
    setPriceState((prev) => ({ ...prev, isAllow: !prev.isAllow }));
  }
  async function handleSubmit() {
    try {
      if (!priceState.newPrice) {
        setError({ ...error, nonPrice: true });
        return;
      }
      if (!priceState.isAllow) {
        setError({ ...error, isAllow: true });
        alert(checkCheckBoxI18);
        return;
      }
      if (artDetail.currency === "EYES") {
        const completed = await addEyesPrice(artDetail.tokenId, priceState.newPrice, artDetail?.id);
        if (completed !== 'success') {
          return
        }
        push('/art/preview/' + query.id)
      } else {
        const completed = await addMaticPrice(artDetail.tokenId, priceState.newPrice, artDetail?.id);
        if (completed !== 'success') {
          return
        }
        push('/art/preview/' + query.id)
      }

    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    return () => resetSellartContext();
  }, []);

  useEffect(() => {
		setGlobalModalState((prev) => ({
			...prev,
			staticBackdrop : true
		}));

		return () => {
			setGlobalModalState((prev) => ({
				...prev,
				staticBackdrop : false
			}));
      hideModal();
		}; 
	}, []);

  useEffect(() => {
    if (artDetail?.price !== "0") {
      toWon(artDetail?.price).then((res) => setConvertedWon(res));
    }

    async function getSaleFee() {
      const name = artDetail.resale ? 'RESALE' : 'SALE';
      const { result, failure } = await getFee(name, artDetail.currency, getSaleFee);
      if (failure) {
        if (failure !== 'switchnetwork') {
          alert(failure);
        }
        return;
      }
      setSaleFee(result);
    }
    if(artDetail){
      getSaleFee()
    }

  },[artDetail])

  return (
    <div className="w-full  pb-[141px]">
      <div className="relative">
        <div className="w-full">
          <div className="w-full px-2 sm:px-0 border-y-[1px] border-[#353535] flex flex-col sm:flex-row items-start sm:items-center flex-wrap sm:h-[76px] sm:py-0 py-[14px] gap-[10px]">
            <div className="sm:w-1/4 flex items-center">
              <h5 className="lg:ml-4 sm:ml-2 sm:text-[16px] md:text-[18px] text-[14px] leading-0 sm:leading-[59px] md:leading-[63px] text-[#DDD] font-[500]">
                {method_paymentI18}
              </h5>
            </div>
            <div className="flex ">
              {artDetail?.currency === "MATIC" ? (
                <div className="bg-[#6319FF] cursor-pointer flex items-center rounded-md sm:py-[13px] py-[7px] sm:px-[20px] px-[15px] text-[#fff] text-[18px] font-[500] max-h-[46px] max-w-[115px]">
                  <span className="sm:w-[17px] sm:h-[17px] w-[14px] h-[14px] flex justify-center items-center">
                    <Image src={matic_logo_white} alt="matic_logo_white" />
                  </span>
                  <p className="text-white sm:text-[18px] text-[14px] leading-[22px] font-[500] sm:ml-[6px] ml-[7px]">
                    MATIC
                  </p>
                </div>
              ) : (
                <div className="bg-[#6319FF] cursor-pointer flex items-center rounded-md sm:py-[13px] py-[7px] sm:px-[20px] px-[15px] text-[#fff] text-[18px] font-[500] max-h-[46px] max-w-[115px]">
                  <span className="sm:w-[17px] sm:h-[17px] w-[14px] h-[14px] flex justify-center items-center">
                    <Image src={EyesWhiteIcon} alt="EyesWhiteIcon" />
                  </span>
                  <p className="text-white sm:text-[18px] text-[14px] leading-[22px] font-[500] sm:ml-[6px] ml-[7px]">
                    EYES
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full border-b-[1px] px-2 sm:px-0 border-[#353535] flex flex-col sm:flex-row items-start sm:items-center flex-wrap sm:h-[76px] sm:gap-0 gap-[10px] sm:py-0 py-[14px]">
            <div className="sm:w-1/4 flex items-center">
              <h5 className="lg:ml-4 sm:ml-2 text-[14px] sm:text-[16px] md:text-[18px] sm:leading-[59px] md:leading-[63px] text-[#DDD] font-[500]">
                {priceI18}
              </h5>
            </div>
            <div className="w-full sm:w-3/4 flex">
              <div className="sm:w-12/12 w-full min-w-[250px] flex items-center sm:ml-[10px]">
                <AuctionInput
                  name='applicantAddress'
                  type='number'
                  style={{ border: "1px solid #fff" }}
                  value={priceState.newPrice}
                  onChange={handlePrice}
                  borderColor={error.nonPrice ? '#FB3873' : '#5C5C5C'}
                  placeholder={plsEnterSellingPriceI18}
                />
                {/* <input
                  min={0}
                  type="number"
                  onChange={handlePrice}
                  value={priceState.newPrice || ""}
                  className={`${
                    error.nonPrice ? "border-[#FB3873]" : ""
                  } rounded-md py-[11px] pr-[70px] pl-[15px] border-[1px] border-[#C2C2C2] bg-black text-[15px] font-300`}
                  inputMode="numeric"
                  placeholder={plsEnterSellingPriceI18}
                  pattern="[0-9]+"
                /> */}
                <p className="sm:text-[18px] text-[14px] leading-[28px] text-[#FEFEFE] font-[400] mx-[10px]">
                  {artDetail?.currency === "MATIC" ? "MATIC" : "EYES"}
                </p>
                {/*<div className="flex items-center text-[#666]">
                  {convertedWon && (
                    <>
                      <p>{excreptWon(convertedWon)}</p>
                      <FaWonSign />
                    </>
                  )}
                  </div>*/}
              </div>
              <div className="md:w-4/12 flex py-2 sm:px-2 px-1">
                {error.nonPrice && (
                  <p className="text-[#FB3873] sm:text-[16px] text-[12px]">{plsEnterSellingPriceI18}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-[10px] mt-[20px]">
          <div className="w-full">
            <div className="mb-[11px] lg:ml-4 ml-2">
              <h5 className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#DDD] font-[500]">
                {noticeI18}
              </h5>
            </div>
            <div className="w-full bg-[#2F2E39] rounded-[10px]">
              <ul className="sm:text-[16px] text-[13px] sm:leading-[24px] leading-normal bg-[#2F2E39] text-[#DDD] font-[350] rounded-[10px] sm:p-[20px] p-[15px] sm:list-none list-disc sm:ml-0 pl-[36px] sm:tracking-tighter tracking-wider">
                <li className="mb-[5px]">{noticeTextLi1I18}</li>
                <li className="mb-[5px]">{noticeTextLi2I18}</li>
                <li>{noticeTextLi3I18}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end sm:mt-[23px] mt-[18px]">
          <label
            htmlFor="checkbox"
            className="inline-flex pointer items-center">
            <Checkbox id="checkbox" onClick={handleAllow} checked={priceState.isAllow} />
            <p
              htmlFor="checkbox"
              className="mx-[10px] sm:text-[16px] text-[14px] font-[400] text-[#B0B0B0]">
              {agreeI18}
            </p>
            {error.nonChecked && (
              <p className="text-[#FB3873]">{plsAgreeTermsI18}</p>
            )}
          </label>
        </div>
      </div>
      {generatedFees && (
        <div className="w-full sm:mt-[22px] mt-[15px] text-[#333]">
          <h5 className="hidden sm:flex overflow-hidden text-[20px] text-white font-[700]">{commissionI18}</h5>
          <div className="sm:hidden">
            <div className="flex items-center gap-[7px] sm:pb-3 capitalize sm:mt-0 mt-[17px]">
              <div className="w-[5px] sm:h-[24px] h-[13px] bg-[#FB3873]" />
              <div className='text-[#fff] text-[14px] font-[500]'>{commissionI18} </div>
            </div>
          </div>
          <div className="flex items-center justify-between sm:mt-[5px] mt-[10px] py-[15px] border-b border-[#353535] text-white max-w-[890px]">
              <p className="sm:text-[18px] text-[14px] font-[500] text-[#B0B0B0]">{artDetail?.resale ? resaleFeeI18 : salesCommissionI18}</p>
              <p className="sm:text-[18px] text-[14px] font-[400] text-[#fff]">{saleFee}%</p>
          </div>
          <div className="flex items-center justify-between py-[15px] border-b border-[#353535] text-white text-[18px] font-[400] max-w-[890px]">
            <p className="sm:text-[18px] text-[14px] font-[500] text-[#B0B0B0]">{creatorRoyaltyI18}</p>
            <p className="sm:text-[18px] text-[14px] font-[400] text-[#fff]">{artDetail?.royalty}%</p>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center justify-center mt-[60px] sm:mt-[75px]">
        <DisplayPriceBtn
          mintStatus={artDetail?.mintStatus}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default FixedPricePanel;
