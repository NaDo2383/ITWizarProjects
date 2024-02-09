import { useRouter } from "next/router";
import {
    BsChevronDoubleRight,
    BsChevronRight,
    BsChevronDoubleLeft,
    BsChevronLeft
} from "react-icons/bs";
import { goTop } from "utils/scroll";

function PaginationBtn({ children, onClick }) {

    return (
        <div onClick={onClick}
            className="h-6 w-6 transition duration-300 cursor-pointer text-[#ABABAB] flex text-xs font-bold items-center justify-center">
            { children }
        </div>
    )
}

export function DoubleLeft({ toFirstPage, changeQuery, changeQueryForCompetition, competitionId }) {
    const { query } = useRouter();

    function onClick() {
        toFirstPage(0);
        goTop();
        changeQueryForCompetition && changeQueryForCompetition(0, query?.competitionID ? query?.competitionID : competitionId, query?.filter ? +query?.filter : 0)        
        changeQuery && changeQuery(0, query?.sortID ? +query.sortID : 0, query?.filter ? +query?.filter : -1);
    }

    return (
        <PaginationBtn onClick={onClick} >
            <BsChevronDoubleLeft />
        </PaginationBtn>
    )
}


export function SingleLeft({ toPrevPage, current, changeQuery, changeQueryForCompetition, competitionId }) {
    const { query } = useRouter();
    function onClick() {
        if (current <= 0) {
            return;
        } else {
            toPrevPage(current - 1);
            goTop();
            changeQueryForCompetition && changeQueryForCompetition(current - 1, query?.competitionID ? query?.competitionID : competitionId, query?.filter ? +query?.filter : 0)
            changeQuery && changeQuery(current - 1, query?.sortID ? +query.sortID : 0, query?.filter ? +query?.filter : -1);
        }
    }

    return (
        <PaginationBtn onClick={onClick}>
            <BsChevronLeft />
        </PaginationBtn>
    )
}

export function SingleRight({ toNextPage, current , pages, changeQuery, changeQueryForCompetition, competitionId }) {
    const { query } = useRouter();
    function onClick() {
        if (current >= pages.length - 1) {
            return;
        } else {
            toNextPage(current + 1);
            goTop();
            changeQueryForCompetition && changeQueryForCompetition(current + 1, query?.competitionID ? query?.competitionID : competitionId, query?.filter ? +query?.filter : 0)
            changeQuery && changeQuery(current + 1, query?.sortID ? +query.sortID : 0, query?.filter ? +query?.filter : -1);
        }
    }

    return (
        <PaginationBtn onClick={onClick}>
            <BsChevronRight />
        </PaginationBtn>
    )
}

export function DoubleRight({ toLastPage, pages, changeQuery, changeQueryForCompetition, competitionId }) {
    const { query } = useRouter();
    function onClick() {
        toLastPage(pages.length - 1);
        goTop();
        changeQueryForCompetition && changeQueryForCompetition(pages.length - 1, query?.competitionID ? query?.competitionID : competitionId, query?.filter ? +query?.filter : 0)
        changeQuery && changeQuery(pages.length - 1, query?.sortID ? +query.sortID : 0, query?.filter ? +query?.filter : -1);
    }

    return (
        <PaginationBtn onClick={onClick}>
            <BsChevronDoubleRight />
        </PaginationBtn>
    )
}