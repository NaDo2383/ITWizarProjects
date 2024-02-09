/**
 * @createdBy Phill Anderson 2023/04/10
 */
import dayjs from "dayjs";
import React, { createContext, useState, useContext } from "react";

const SellartContext = createContext({});

const SellartProvider = ({ children }) => {
    let currentDate = new Date();
    let dateNow = currentDate;
    if (currentDate.getMinutes() > 30) {
      dateNow.setTime(dateNow.getTime() + 3600000);
      dateNow.setMinutes(0);
    } else {
      dateNow.setMinutes(30);
    }
    let endNow = new Date(dateNow.getTime() + 3600 * 1000 * 24);
    
    const initialPrice = {
        newPrice: null,
        isLoading: false,
        isAllow: false,
        isEnableSubmit: false,
    }
    const initialAuction = {
          startDate: dayjs(dateNow),
          endDate: dayjs(endNow),
          startingPrice: null,
          highlightedDays: [1, 2, 15],
          isLoading: false,
          isAllow: false,
          isEnableSubmit: false,
    }  
  
  
    const [ priceState, setPriceState ] = useState(initialPrice)
    const [ auctionState, setAuctionState ] = useState(initialAuction)
    const [ generatedFees, setGeneratedFees ] = useState(null)

    function resetSellartContext() {
      setPriceState(initialPrice)
      setAuctionState(initialAuction)
    }
  return (
    <SellartContext.Provider
      value={{
        priceState, 
        setPriceState,
        auctionState, 
        setAuctionState,
        resetSellartContext,
        generatedFees, 
        setGeneratedFees
      }}
    >
      {children}
    </SellartContext.Provider>
  );
};

const useSellartContext = () => useContext(SellartContext);

export { SellartContext, SellartProvider, useSellartContext };
