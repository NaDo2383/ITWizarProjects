import { Router, useRouter } from "next/router";
import { DoubleLeft, DoubleRight, SingleLeft, SingleRight } from "./PaginationControls";
import { goTop } from "utils/scroll"; 

export default function Pagination({
   changePage, 
   current, 
   data, 
   toNextPage, 
   toPrevPage, 
   toFirstPage, 
   toLastPage, 
   totalPages, 
   changeQuery, 
   changeQueryForCompetition, 
   competitionId 
  }) {
   // console.log('totalPages', totalPages)
    const pages = [];
    const { query } = useRouter();

    if (data) {
        for (let i = 0; i < totalPages; i++) {
            pages.push(i);
        }
    }
    
    const renderPaginationButtons = () => {
        console.log('totalPages', totalPages)
        const visiblePages = [];
    
        if (totalPages <= 5) {
          visiblePages.push(...pages);
        } else {
          const startPage = Math.max(current - 2, 0);
          const endPage = Math.min(current + 2, totalPages - 1);
    
          if (current <= 2) {
            visiblePages.push(...pages.slice(0, 5));
          } else if (current >= totalPages - 3) {
            visiblePages.push(...pages.slice(totalPages - 5, totalPages));
          } else {
            visiblePages.push(...pages.slice(startPage, endPage + 1));
          }
        }

        return visiblePages.map((page) => (
          <div
            onClick={() => {
              changePage(page);
              goTop();
              changeQueryForCompetition && changeQueryForCompetition(+page, query?.competitionID ? +query?.competitionID : competitionId, query?.filter ? query?.filter : 0)
              changeQuery && changeQuery(+page, query?.sortID ? +query.sortID : 0, query?.filter ? +query?.filter : -1);
            }}
            key={`page-${page}`}
            className={`h-6 w-6 transition ${
              current === page
                ? "bg-[#FB3873] text-white"
                : "text-[#5E5E5E]"
            } duration-300 hover:bg-[#FB3873] hover:text-white cursor-pointer rounded-[5px] lg:text-[18px] md:text-[16px] text-[14px] items-center justify-center flex`}
          >
            {page + 1}
          </div>
        ));
      };
    
    return (
        <>
            {data?.length > 0 && (
                <div className="flex items-center gap-1">
                    <DoubleLeft 
                      toFirstPage={toFirstPage} 
                      changeQuery={changeQuery} 
                      changeQueryForCompetition={changeQueryForCompetition} competitionId={competitionId}
                    />
                    <SingleLeft 
                      toPrevPage={toPrevPage} 
                      current={current} 
                      changeQuery={changeQuery} 
                      changeQueryForCompetition={changeQueryForCompetition} competitionId={competitionId}
                    />
                        { renderPaginationButtons() }
                    <SingleRight 
                      toNextPage={toNextPage} 
                      current={current} 
                      pages={pages} 
                      changeQuery={changeQuery} 
                      changeQueryForCompetition={changeQueryForCompetition} competitionId={competitionId}
                    />
                    <DoubleRight 
                      toLastPage={toLastPage} 
                      pages={pages} 
                      changeQuery={changeQuery} 
                      changeQueryForCompetition={changeQueryForCompetition} competitionId={competitionId}
                    />
                </div>
            )}
        </>
    );
}
