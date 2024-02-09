import React, { useEffect, useState } from "react";
import useCompetition from "./useCompetition";
import useMypageTranslation from "locale/useMypageTranslation";
import CompetitionCard from "./CompetitionCard";
import CompetitionBanner from "./CompetitionBanner";
import Pagination from "Components/ui/pagination/Pagination";
import { useCheckUser } from "../user/auth/useAuthUser";
import FilterContainer from './FilterContainer'
import CompetitionFilter from "./CompetitionFilter";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useRouter } from "next/router";

function ClientSideCompetitions() {
  const [sortType, setSortType] = useState("created_date,desc");
  const [pageNum, setPageNum] = useState(0);
  const { contestEntryI18, NotAction1I18, NotAction2I18 } = useMypageTranslation();
  const { isLoggedIn } = useCheckUser()
  const isUserLogged = isLoggedIn()
  const router = useRouter();
  const { query } = useRouter();
  const { authUser, globalItems, prevUrl } = useGlobalContext();
  const selectedCompetition = globalItems?.competitions?.selectedCompetition
  const selectedSortCompetition = globalItems?.competitions?.selectedSortCompetition
  const {
    competitions,
    getCompetitions,
    competitionArtworks,
    setArtPagination,
    getCompetitionArtworks,
    artPagination,
    competitionId,
    setCompetitionId
  } = useCompetition();

  const changeQueryForCompetition = (pageNumber, competitionID) => {
    router.push({
      query: {
        page: +pageNumber,
        competitionID: !competitionID || competitionID == 0 ? competitionId : competitionID
      }
    }, undefined, { shallow: true }
    )
  };

  useEffect(() => {
    getCompetitions();
  }, [artPagination, authUser?.id]);

  const paginate = (num) => {
    setPageNum(num);
  };

  useEffect(() => {
    if (query?.competitionID) {
      // const theSortType = selectedSortCompetition?.sortType || sortType
      const payload = {
        random: false,
        isCompetition: true,
        competitionId: query?.competitionID,
        sort: 'created_date,desc',
        page: query?.page ? +query?.page : 0,
        size: 16
      }
      getCompetitionArtworks(payload, isUserLogged);
    }
  }, [authUser?.id, query]);

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto">
        <div className="w-full">
          <div className='flex flex-col flex-wrap mt-0 sm:mt-[20px]'>
            <div className="order-2 sm:order-1">
              <CompetitionBanner competitionId={competitionId} />
            </div>
            <div className="w-full order-1 sm:text-center">
              <h2 className="text-[#E0E6E8] text-[20px] sm:text-[30px] font-medium ml-[16px] mt-[25px] mb-[18px] sm:mb-[90px] sm:mt-[60px] sm:ml-0 ">
                {contestEntryI18}
              </h2>
              <FilterContainer>
                <CompetitionFilter
                  changeQueryForCompetition={changeQueryForCompetition}
                  setCompetitionId={setCompetitionId}
                  setCurrentPage={setArtPagination}
                  competitions={competitions}
                  isUserLogged={isUserLogged}
                />
                {/*<div className="hidden sm:block">
                    <ArtworkFilter
                      changeQueryForCompetition={changeQueryForCompetition}
                      setSortType={setSortType}
                      setCurrentPage={setArtPagination}
                      competitionId={competitionId}
                    />
  </div>*/}
              </FilterContainer>
            </div>
          </div>
          {competitions?.result?.[0]?.isRegister ? (
            <>
              {/*<div className="w-full flex justify-end">
                <div className="w-[85px] pt-[52px] sm:hidden">
                      <ArtworkFilter
                        changeQueryForCompetition={changeQueryForCompetition}
                        setSortType={setSortType}
                        setCurrentPage={setArtPagination}
                        competitionId={competitionId}
                      />
                </div>
          </div>*/}
              <div className="my-[25px] hidden sm:block">
                <button className="bg-[#292934] rounded-xl py-5 w-full cursor-default opacity-80">
                  <p className="text-[20px] text-[#C1C1C1] font-[400] mb-[5px]">{NotAction1I18}</p>
                  <p className="text-[20px] text-[#C1C1C1] font-[400]">{NotAction2I18}</p>
                </button>
              </div>
            </>
          ) : (
            <div></div>
          )}
          <div className="pt-[4px] mt-[26px] grid grid-cols-2 gap-[12px] sm:grid-cols-2 sm:mt-8 md:grid-cols-3 xl:grid-cols-4 sm:gap-[29px] sm:w-full min-w-[328px] w-[328px] mx-auto">
            {competitionArtworks?.result?.content?.length > 0 &&
              competitionArtworks?.result?.content?.map((competitionArt, idx) => (
                <CompetitionCard key={idx} {...competitionArt} competitionId={competitionId} />
              ))}
          </div>
          <div className="w-full flex justify-center pt-16 pb-8">
            <Pagination
              changeQueryForCompetition={changeQueryForCompetition}
              competitionId={competitionId}
              toLastPage={paginate}
              toFirstPage={paginate}
              toPrevPage={paginate}
              toNextPage={paginate}
              totalPages={competitionArtworks?.result?.totalPages}
              data={competitionArtworks?.result?.content}
              current={competitionArtworks?.result?.number}
              changePage={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSideCompetitions;
