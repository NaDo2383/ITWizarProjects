import Web3 from "web3";
import useCrud from "common/axios/crud";
import { useMetaMaskContext } from "./useMetamaskContext";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import Image from "next/image";
import { ethers } from "ethers";

function useCurrency() {
  const { getModel } = useCrud();
  const { asWon, setAsWon } = useMetaMaskContext()
  // БОГИНО ҮНИЙГ асар урт үнэ болгодог
  function toWei(price) {
    if (!price) return;
    return Web3.utils.toWei(`${price}`.toString(), "ether");
  }

  function convertIntoBigNumber(price) {
    return ethers?.BigNumber.from(price)
  }

  // урт үнийг богино үнэ болгдоог
  function toEthers(price) {
    if (!price) return "0";
    return Web3.utils.fromWei(price.toString(), "ether");
  }
  // АСАР УРТ ҮНИЙГ ВОН БОЛГОДОГ
  // isShort параметрээр урт эсвэл богино үнэ эсэхийг тодорхойлж өгнө
  async function toWon(price, currency, isShort = false, id) {
    const too = currency === 'EYES' ? asWon.eyesAsWon : asWon.maticAsWon
    // богино үнийг ethers болгох шаардлагагүй
    const ether = isShort ? +price : +toEthers(price)
    return (ether * too)
  }

  function excreptWon(longWon, artId) {
    if (!longWon || longWon === 0) {
      return '0'
    }
    const shortWon = longWon
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return shortWon;
  }
  async function getMaticAsWon() {
    try {
      const res = await getModel(
        process.env.url + "/exchangerate?symbol=MATIC&currency=KRW"
      );
      setAsWon((prev) => ({ ...prev, maticAsWon: res?.result }))
      return res?.result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async function getEyesAsWon() {
    try {
      const res = await getModel(
        process.env.url + "/exchangerate?symbol=EYES&currency=KRW"
      );
      setAsWon((prev) => ({ ...prev, eyesAsWon: res?.result }))
      return res?.result;
    } catch (e) {
      throw new Error(e);
    }
  }

  function checkCurrencyIco(currency) {
    return <Image
      src={currency === 'EYES' ? eyesicon : matic_logo}
      width={23}
      height={23}
      alt="currency"
    />
  }
  return {
    toWei,
    toWon,
    toEthers,
    excreptWon,
    getMaticAsWon,
    getEyesAsWon,
    asWon,
    convertIntoBigNumber,
    checkCurrencyIco
  };
}


export default useCurrency;
