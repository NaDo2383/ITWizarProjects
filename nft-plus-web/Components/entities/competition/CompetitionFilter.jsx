import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "common/mouse/useOnClickOutside";
import {DownIcon} from 'Components/ui/icon/icons'
import { useGlobalContext } from "common/global/useGlobalContext";
import useCompetition from "./useCompetition";
import { useRouter } from "next/router";

function CompetitionFilter({ setCompetitionId, setCurrentPage, competitions, changeQueryForCompetition }) {
  const filterRef = useRef();
  const [isOpenDropDown, setIsOpenDropdown] = useState(false);
  const { globalItems } = useGlobalContext()
  const { setCompetitionIntoGlobalItems, getCompetitionArtworks, innerSelectedCompetition, setInnerSelectedCompetition } = useCompetition()
  const selectedCompetition = globalItems?.competitions?.selectedCompetition
  const { query } = useRouter()
  useOnClickOutside(filterRef, () => setIsOpenDropdown(false));
  const [competition, setCompeititon] = useState(null);

  function toggleFilter() {
    setIsOpenDropdown((prev) => !prev);
  }

  function filterCompetitionArtworks(val, competition) {
   // setLocal("sortedState", val + "~" + competition?.title);
    setCompetitionIntoGlobalItems(competition)
    setIsOpenDropdown(false);
    changeQueryForCompetition(0, competition.id)
  }

  useEffect (()=>{
    if(competitions?.result?.length > 0){
      if(query?.competitionID){
        const data = competitions?.result.find( item => {
          return item.id == query.competitionID
        });
        data &&setCompeititon(data);
      } else {
          const initCompetition = competitions?.result[0]
          //  setLocal("sortedState", "~" + initCompetition?.title);
          changeQueryForCompetition(0, initCompetition?.id)
          setCompeititon(initCompetition);
      }
    }
  },[query, competitions])

  useEffect(() => {
    if (selectedCompetition) {
      setCompetitionId(selectedCompetition.id);
      setCurrentPage(0);
      setIsOpenDropdown(false);
      setCompeititon(selectedCompetition);
    }
  }, [selectedCompetition]);

  useEffect(() => {
    setInnerSelectedCompetition(competition)
    setCompetitionIntoGlobalItems(competition)
  }, [competition]);


  return (
    <div ref={filterRef} className="pb-[5px] mb-[30px] border-b border-[#E0E6E8] sm:min-w-[150px] sm:mb-0 sm:pb-0 flex justify-center items-center">
      <div className="flex justify-between items-center relative min-w-[267px] text-[14px] cursor-pointer sm:h-[29px] sm:min-w-[150px] sm:text-[20px]" onClick={toggleFilter}>
          <button className="flex text-[#E0E6E8] pl-[10px] min-w-[267px] sm:min-w-[150px]">
            { selectedCompetition ? selectedCompetition?.title : innerSelectedCompetition?.title }
          </button>
          <div className="pr-[10px]">
            <DownIcon isClicked={isOpenDropDown} />
          </div>
        {isOpenDropDown ? (
          <ul className="min-w-[150px]  block absolute overflow-hidden text-start border border-[#656565] 
           z-30 bg-[#181A1A] opacity-90 backdrop-blur-[2px]  text-[#ABABAB] top-full rounded-[8px] right-0 w-full">
            {competitions &&
              competitions?.result.map((item, idx) => {
                return (
                  <li
                    key={"dwadw" + idx}
                    onClick={() => filterCompetitionArtworks("", item)}
                    className="py-2 px-2 truncate cursor-pointer  hover:text-[#fff] border-b text-start">
                    {item.title}
                  </li>
                );
              })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default CompetitionFilter;
