import React, { useRef, useState, useEffect } from "react";
import useCommonTranslation from "locale/useCommonTranslation";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { setLocal } from "utils/storage";
import useCompetition from "./useCompetition";
import { useGlobalContext } from "common/global/useGlobalContext";

function ArtworkFilter({ setSortType, setCurrentPage, changeQueryForCompetition }) {
  const {
    byPriceI18,
    newestI18,
    byLikeI18,
    byPopularityI18
  } = useCommonTranslation();
  const ref = useRef();
  const { locale, query } = useRouter();
  const [sortTitle, setSortTitle] = useState("");
  const [sorting, setSorting] = useState(false);
  const [initiate, setInitiate] = useState(true);
  const { setSortCompetitionIntoGlobalItems, competitionId } = useCompetition()
  const {  globalItems, setGlobalItems } = useGlobalContext()
  const  selectedSortCompetition = globalItems?.competitions?.selectedSortCompetition
  const sortArtworks = useCallback((val, title) => {
    setLocal("sortedState", val + "~" + title);
    setSorting(false);
    setSortTitle(title);
    setSortType(val);
    setCurrentPage(0);
    const sortObj = {
      sortType: val,
      title: title
    }
    setSortCompetitionIntoGlobalItems(sortObj)
  }, [])

  useEffect(() => {
    setSortTitle(newestI18);
    if(selectedSortCompetition) {
      let sortTypeText=''
      if(selectedSortCompetition?.sortType === 'created_date,desc') {
        sortTypeText = newestI18
      } else if(selectedSortCompetition?.sortType === 'price,desc') {
        sortTypeText = byPriceI18
      } else {
        sortTypeText = byLikeI18
      }

      if(sortTypeText !== '') {
      
        setGlobalItems((prev) => ({
          ...prev,
          competitions: {
            ...prev.competitions,
            selectedSortCompetition: {
              ...prev.competitions.selectedSortCompetition,
              title: sortTypeText
            }
          }
        }))
      }
    }
  }, [locale]);

  useEffect(() => {
    if (localStorage.sortedState && initiate) {
      const values = localStorage.sortedState.split("~");
      setInitiate(false);
    }
  }, [initiate, sortArtworks]);

  useEffect(() => {
    if(query?.filter){
      setSortTitle(query?.filter == 'created_date,desc' ? newestI18 : query?.filter == 'price,desc' ? byPriceI18 : byLikeI18)
    } else {
      setSortTitle(newestI18)
    }
  },[query]);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setSorting(!sorting)} className="w-full flex gap-[5px] justify-between items-center px-[5px] h-[34px] bg-transparent border focus:outline-none border-[#4E4949] rounded-md ">
          {/* <AiOutlineSortAscending className="md:hidden" /> */}
          <div className="truncate">
            <p className="font-[400] text-[14px] sm:text-[18px] text-[#ABABAB] leading-[36px] -tracking-[0.24px]">{selectedSortCompetition?.title || sortTitle}</p>
          </div>
          <Image  src={'/downIcon.svg'} width={26} height={26} alt="downIcon" className={`${ sorting ? 'rotate-180' : 'rotate-0' }`} />
      </button>
      {sorting && (
        <ul className="block sm:text-[18px] text-[14px] absolute border mt-2 overflow-hidden z-30 bg-[#181A1A] opacity-90 backdrop-blur-[2px] text-[#ABABAB] top-full rounded-[8px] border-[#656565] right-0 w-full">
          <li onClick={() => {
              sortArtworks("created_date,desc", newestI18)
              changeQueryForCompetition(query?.page ? +query?.page : 0, query?.competitionID ? query?.competitionID : competitionId, "created_date,desc")
          }}
            className={`py-2 px-2 truncate cursor-pointer hover:text-[#fff]  text-start border-b border-[#656565]`}>
            {newestI18}
          </li>
          <li onClick={() => {
            sortArtworks("price,desc", byPriceI18)
            changeQueryForCompetition(query?.page ? +query?.page : 0, query?.competitionID ? query?.competitionID : competitionId, "price,desc")
          }} className={`py-2 px-2 cursor-pointer hover:text-[#fff] text-start border-b border-[#656565]`}>
            {byPriceI18}
          </li>
          <li onClick={() => {
            sortArtworks("like_count,desc", byLikeI18)
            changeQueryForCompetition(query?.page ? +query?.page : 0, query?.competitionID ? query?.competitionID : competitionId, "like_count,desc") 
          }} className={`py-2 px-2 t truncate cursor-pointer hover:text-[#fff] text-start  `}>
            {byPopularityI18}
          </li>
        </ul>
      )}
    </div>
  );
}

export default ArtworkFilter;
