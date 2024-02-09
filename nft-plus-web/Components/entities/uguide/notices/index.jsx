
import { BiSearch } from "react-icons/bi";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Pagination from "Components/ui/pagination/Pagination";
import { useEffect, useState } from "react";
import Loading from "Components/ui/loader";
import useFAQPageTranslation from "locale/useFAQpageTranslation";
import { useRouter } from "next/router";
import useNotice from "./useNotice";

const Notices = ({}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [detail, setDetail] = useState(false);
  const [filter, setFilter] = useState("");
  const { locale } = useRouter();
  const {
    goToDetail,
    paginate,
    searchWidthVal,
    getNotifications,
    searchWork,
    filterState,
    notices,
    loading,
    setSearchOption,
    searchOption
  } = useNotice();

  useEffect(() => {
    getNotifications(filterState);
  }, [filterState]);

  const {
    selectboxOp1,
    selectboxOp2,
    selectboxOp3,
    tableH1,
    tableH2,
    tableH3,
    tableH4,
    tableNoData
  } = useFAQPageTranslation();

  return (
    <div
      className={`container  relative mx-auto text-base h-full flex`}>
      <div
        className={`transition duration-300 h-full flex-col transform origin-left ${
          detail ? "hidden w-0" : "flex w-full"
        }`}>
        <div className="w-full flex justify-end mb-4 items-center gap-1">
          <select
            className="bg-transparent border text-sm focus:outline-none font-[300] rounded-md px-3 py-[3px]"
            value={searchOption}
            onChange={(e) => {
              setSearchOption(e.target.value);
            }}>
            <option>{selectboxOp1}</option>
            <option value="제목">{selectboxOp2}</option>
            <option value="내용">{selectboxOp3}</option>
          </select>
          <div className="flex items-center w-40">
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFilter({
                  ...filterState,
                  searchWord: e.target.value
                });
              }}
              onKeyDown={searchWork}
              className="border py-0.5 rounded-l-md focus:outline-none pl-2 border-r-0 w-full "
            />
            <button
              onClick={() =>
                searchWidthVal({
                  ...filterState,
                  ...filter,
                  searchType:
                    searchOption === "제목"
                      ? { title: filter?.searchWord }
                      : { description: filter.searchWord }
                })
              }
              className="border py-[6px] px-1.5 border-l-0 rounded-r-md text-[#666]">
              <BiSearch />
            </button>
          </div>
        </div>
        {loading ? (
          <div className="w-full h-96">
            <Loading />
          </div>
        ) : (
          <table className={"w-full"}>
            <thead className="w-full border-y py-3 border-[#333] text-base text-[#333] bg-white">
              <tr>
                <th className="py-3 font-normal w-10 sm:w-14 md:w-20 xl:w-24">
                  {tableH1}
                </th>
                <th className="py-3 font-normal  text-left text-ellipsis">
                  {tableH2}
                </th>
                <th
                  className={`py-3 font-normal w-16 sm:w-20 md:${
                    locale === "en" ? "w-36" : "w-24"
                  }`}>
                  {tableH3}
                </th>
                <th className="py-3 font-normal w-12 sm:w-20 md:w-24">
                  {tableH4}
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {notices?.content ? (
                notices.content.map((row, index) => (
                  <tr key={`work-${index}`} className="border-b border-[#373737]">
                    <td className="text-center font-[400] py-3 border-none">
                      {notices.totalElements - notices.number * 10 - index}
                    </td>
                    <td
                      onClick={() => goToDetail(row.id)}
                      className={`font-[400] py-3 cursor-pointer text-start border-none`}>
                      {row.title.length > 80
                        ? `${row.title.slice(0, 80)}...`
                        : row.title}
                    </td>
                    <td className="text-center font-[400] text-xs sm:text-sm py-3 border-none">
                      {row.createdDate.split(" ")[0]}
                    </td>
                    <td className="text-center text-[#DDDDDD] font-[400] text-[18px] py-3 border-none">
                      {row.viewCount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="w-full h-72">
                      <div className="w-full h-full flex-col flex justify-center items-center pt-6">
                        <MdOutlineImageNotSupported className="text-8xl text-[#666]" />
                        <p className="font-[500] ">{tableNoData}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <div className="w-full h-8 flex justify-center items-center my-[100px]">
          {notices?.contents && (
            <Pagination
              data={notices.content}
              changePage={paginate}
              current={notices.number}
              toNextPage={paginate}
              toPrevPage={paginate}
              toFirstPage={paginate}
              toLastPage={paginate}
              totalPages={notices.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;
