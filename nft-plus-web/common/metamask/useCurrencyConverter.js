/**
 * @createdBy Phill Anderson 2022/02/27
 */
import { useEffect } from "react";
import { useState } from "react";
import useCurrency from "./useCurrency";

const initial = {
  maticAsWon: null,
  eyesAsWon: null,
  convertedWon: null,
  init: false
}
function useCurrencyConverter(price, currency, isPriceWei = false) {
  const [convertedCurrency, setConvertedCurrency] = useState(initial);
  const { toWon } = useCurrency()

  useEffect(() => {
    if(!price || price === '') {
      setConvertedCurrency(initial)
      return
    }

    const res = toWon(price, currency)
    const parsedRes = res.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    setConvertedCurrency((prev) => ({ ...prev, convertedWon: parsedRes, init: true }))
  }, [price, currency, convertedCurrency?.init]);
  
  return { 
    convertedCurrency, 
  };
}

export default useCurrencyConverter;