import { useEffect } from "react";
import { FiSettings, FiBellOff } from "react-icons/fi";
import Link from "next/link";
import Loading from "Components/ui/loader";
import Checkbox from "Components/ui/checkbox/Checkbox";
import { BsCheck, BsChevronDown } from "react-icons/bs";
import Pagination from "../../ui/pagination/Pagination";
import { AiOutlineCheck } from "react-icons/ai";
import AnimateHeight from "react-animate-height";
import useCommonTranslation from "locale/useCommonTranslation";
import { useRouter } from "next/router";
import { renderParsedString } from "utils/string";
import useNotification from "./useNotification";
import useGlobal from "common/global/useGlobal";

const NotificationLog = () => {
  const { locale, push } = useRouter();
  const { unreadNotiCount } = useGlobal();
  const {
    notifications,
    getNotifications,
    loading,
    extendRow,
    extend,
    readIndexes,
    extendedIndex,
    checkAllBoxes,
    setCheckAllBoxes,
    numToCheck,
    setNumToCheck,
    pageNum,
    changeList,
    load,
    checkAll,
    paginate,
    readHandler,
    handleClickNotificationDetail
  } = useNotification();
  const {
    selectAllI18,
    confirmedI18,
    isimnidaI18,
    unreadNoticesI18,
    noticeI18,
    dateI18,
    divisionI18,
    contentsI18,
    notificationTypesI18
  } = useCommonTranslation();
  const tableHead = [
    {
      title: dateI18,
      size: "w-48"
    },
    {
      title: divisionI18,
      size: "w-56"
    },
    {
      title: contentsI18,
      size: "w-auto"
    }
  ];

  useEffect(() => {
    getNotifications({ size: 10, page: pageNum });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  useEffect(() => {
    if (numToCheck === changeList.length) {
      setCheckAllBoxes(true);
    } else {
      setCheckAllBoxes(false);
    }
  }, [numToCheck, changeList.length, changeList]);

  useEffect(() => {
    if (notifications?.content) {
      setNumToCheck(
        notifications?.content.filter((el) => el.messageActive).length
      );
    }
  }, [notifications?.content, notifications]);

  return (
    <div className="py-10  px-4 md:px-8 w-full mx-auto">
      <div className="w-full relative text-center">
        <h5 className="text-3xl font-[600] text-[#333]">{noticeI18}</h5>
      </div>
      <div className="mt-8 w-full">
        <div className="w-full flex items-center justify-between mb-4">
          <h5 className="text-[16px] font-normal">
            {locale === "en" && isimnidaI18}
            <span className="text-[#ff00e4] mx-1">{unreadNotiCount || 0}</span>
            {unreadNoticesI18} {locale !== "en" && isimnidaI18 && isimnidaI18}
          </h5>
          <div className="flex items-center gap-3">
            <button
              disabled={load}
              onClick={() => getNotifications({ size: 10, page: pageNum })}
              className={`py-2 px-4 gap-1 flex items-center font-[500] text-sm truncate sm:text-base border border-[#333] rounded-md text-[#333] ${
                load ? "bg-gray-200 cursor-wait" : "bg-white"
              }`}>
              <BsCheck className="text-2xl" />
              <p>{confirmedI18}</p>
            </button>
            <Link href="/mypage/alarm" passHref>
              <div className="border border-[#333] rounded-md p-2 cursor-pointer text-[#333] text-2xl">
                <FiSettings />
              </div>
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="w-full h-96">
            <Loading />
          </div>
        ) : notifications?.content?.length > 0 ? (
          <div className="w-full">
            <table className="w-full hidden lg:table">
              <thead className="bg-white border-t-2 border-[#333] border-b text-[#333]">
                <tr className="border-b border-[#333]">
                  <th className="px-8  py-3">
                    <div className="w-max">
                      {numToCheck !== 0 ? (
                        <Checkbox
                          checked={checkAllBoxes}
                          onChange={() => {}}
                          id={"checkAll"}
                          onClick={checkAll}
                        />
                      ) : (
                        <div className="w-[17px] h-[17px] bg-gray-300 flex items-center text-[#666] cursor-not-allowed justify-center">
                        </div>
                      )}
                    </div>
                  </th>
                  {tableHead.map((el, index) => (
                    <th
                      className={`px-8 py-3 ${el.size}`}
                      key={"thead" + index}>
                      {el.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {notifications?.content?.map((el, index) => (
                  <>
                    <tr
                      key={"top-tr-" + index}
                      className={`${
                        el.messageActive && !readIndexes.includes(el.id)
                          ? "bg-[#fff4fe]"
                          : "bg-white"
                      } text-[#333] relative leading-[26px] font-[300] text-center border-b`}>
                      <td className="px-8 py-2 w-20 border-none">
                        <div className="w-max mr-0">
                          {el.messageActive && !readIndexes.includes(el.id) ? (
                            <div className="w-[17PX] h-[17px] bg-gray-300 flex items-center text-[#666] cursor-not-allowed justify-center">
                            </div>
                          ) : (
                            <Checkbox
                              className="w-max"
                              checked={
                                changeList.find((id) => id === el.id)
                                  ? true
                                  : false
                              }
                              onChange={() => {}}
                              id={index}
                              onClick={(e) => readHandler(e, el.id)}
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-2 border-none">
                        <div className="w-full">
                          <p>{el.createdDate.split(" ")[0]}</p>
                          <p>{el.createdDate.split(" ")[1].slice(0, 5)}</p>
                        </div>
                      </td>
                      <td className="px-8 py-2 border-none">
                        {notificationTypesI18[el.notificationType]?.includes(
                          "(NFT)"
                        ) ? (
                          <>
                            {notificationTypesI18[el.notificationType]
                              .split(" ")
                              .map((word, idx) => (
                                <p key={"word-" + idx}>
                                  {word}
                                  <br />
                                </p>
                              ))}
                          </>
                        ) : (
                          notificationTypesI18[el.notificationType]
                        )}
                      </td>
                      <td className="px-8 py-2 border-none">
                        <div className="w-full text-left">
                          <div
                            onClick={() => extendRow(index, el.id)}
                            className="flex items-center justify-between gap-8 cursor-pointer ">
                            <div>
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 relative">
                                  <div
                                    className={`w-1/2 h-1/2 ${
                                      el.messageActive
                                        ? "bg-[#fff4fe]"
                                        : "bg-white"
                                    } absolute top-0 right-0`}></div>
                                  <div className="w-full h-full border-2 border-[#333] rounded-full"></div>
                                  <div className="absolute bottom-[4px] left-[4px] text-xl text-[#ff00e4]">
                                    <AiOutlineCheck />
                                  </div>
                                </div>
                                <h5 className="font-[500] flex-1 text-[16px]">
                                  {locale === "en" ? el.titleEn : el.title}
                                </h5>
                              </div>
                            </div>
                            <div
                              className={`text-xl transition ${
                                extend && extendedIndex === index
                                  ? "rotate-180"
                                  : "rotate-0"
                              }`}>
                              <BsChevronDown />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr
                      key={"down-tr" + index}
                      className={`transition duration-300 cursor-pointer ${
                        extend && extendedIndex === index
                          ? "bg-[#f8f8f8] border-b"
                          : `${el.messageActive} border-0 padding-0 `
                      } ${
                        extend &&
                        extendedIndex !== index &&
                        notifications?.content[index + 1]?.messageActive &&
                        !readIndexes.includes(
                          notifications?.content[index + 1]?.id
                        )
                          ? "bg-[#fff4fe]"
                          : "bg-white"
                      }`}
                      onClick={() => handleClickNotificationDetail(el)}>
                      <td
                        colSpan={4}
                        className={`${el.messageActive} border-0 border-none py-[0px] px-[0px] w-full `}>
                        <AnimateHeight
                          duration={300}
                          height={
                            extend && extendedIndex === index ? "auto" : 0
                          }>
                          <div className="overflow-hidden w-full flex justify-center">
                            <div
                              className={`notification_detail px-8 font-[300] w-[500px]`}>
                              {renderParsedString(
                                locale === "en" ? el.messageEn : el.message
                              )}
                            </div>
                          </div>
                        </AnimateHeight>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className="flex w-full lg:hidden justify-end items-center gap-4 py-2">
              <label htmlFor="checkAll">
                <p className="uppercase text-sm">{selectAllI18}</p>
              </label>
              <div>
                {numToCheck !== 0 ? (
                  <Checkbox
                    checked={checkAllBoxes}
                    onChange={() => {}}
                    id={"checkAll"}
                    onClick={checkAll}
                  />
                ) : (
                  <div className="w-[17px] h-[17px] bg-gray-300 flex items-center text-[#666] cursor-not-allowed justify-center">
                  </div>
                )}
              </div>
            </div>
            {notifications?.content?.map((el, index) => (
              <div
                className="w-full justify-between text-[#333] lg:hidden relative"
                key={"content-" + index}>
                <div
                  className={`${
                    el.messageActive
                      ? readIndexes.includes(el.id)
                        ? "bg-white"
                        : "bg-[#fff4fe]"
                      : "bg-white"
                  } border-b-2 py-2`}>
                  <div className="w-full flex py-2 text-sm">
                    <h5 className="font-[600] mr-4 whitespace-nowrap">
                      {dateI18}:
                    </h5>
                    <p>{el.createdDate.split(" ")[0]}</p>
                    <p>{el.createdDate.split(" ")[1].slice(0, 5)}</p>
                  </div>
                  <div>
                    <div className="w-full flex py-2">
                      <h5 className="font-[600] mr-4 text-sm whitespace-nowrap">
                        {divisionI18}:
                      </h5>
                      {notificationTypesI18[el.notificationType]?.includes(
                        "(NFT)"
                      ) ? (
                        <>
                          <p>
                            {
                              notificationTypesI18[el.notificationType].split(
                                " "
                              )[0]
                            }
                          </p>
                          <p>
                            {
                              notificationTypesI18[el.notificationType].split(
                                " "
                              )[1]
                            }
                            {
                              notificationTypesI18[el.notificationType].split(
                                " "
                              )[2]
                            }
                          </p>
                        </>
                      ) : (
                        notificationTypesI18[el.notificationType]
                      )}
                    </div>
                  </div>
                  <div className="w-full text-sm py-2 flex">
                    <h5 className="font-[600] mr-4 whitespace-nowrap">
                      {contentsI18}:
                    </h5>
                    <div
                      onClick={() => extendRow(index, el.id)}
                      className="flex items-center justify-between gap-8 cursor-pointer">
                      <div>
                        <div className="flex items-center gap-3 flex-row-reverse">
                          <div className="w-6 h-6 relative">
                            <div
                              className={`w-1/2 h-1/2 ${
                                el.messageActive ? "bg-[#fff4fe]" : "bg-white"
                              } absolute top-0 right-0`}></div>
                            <div className="w-full h-full border-2 border-[#333] rounded-full "></div>
                            <div className="absolute bottom-[4px] left-[4px] text-xl text-[#ff00e4]">
                              <AiOutlineCheck />
                            </div>
                          </div>
                          <h5 className="font-[500] flex-1">{el.title}</h5>
                        </div>
                        <h5 className="">{el.description}</h5>
                      </div>
                      <div
                        className={`text-xl transition absolute right-0 py-4 ${
                          extend && extendedIndex === index
                            ? "rotate-[360deg]"
                            : "rotate-[270deg]"
                        }`}>
                        <BsChevronDown />
                      </div>
                    </div>
                  </div>
                  <div className="py-4 absolute right-0 top-0">
                    {el.messageActive ? (
                      readIndexes.includes(el.id) ? (
                        <div className="w-[17px] h-[17px] bg-gray-300 flex items-center text-[#666] cursor-not-allowed justify-center">
                        </div>
                      ) : (
                        <Checkbox
                          checked={
                            changeList.find((id) => id === el.id) ? true : false
                          }
                          onChange={() => {}}
                          id={index}
                          onClick={(e) => readHandler(e, el.id)}
                        />
                      )
                    ) : (
                      <div className="w-[17px] h-[17px] bg-gray-300 flex items-center text-[#666] cursor-not-allowed justify-center">
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-[#f8f8f8]">
                  <AnimateHeight
                    duration={300}
                    height={extend && extendedIndex === index ? "auto" : 0}>
                    <div className="overflow-hidden">
                      <div
                        className={`notification_detail font-[300] px-4 py-1.5`}>
                        {renderParsedString(el.message)}
                      </div>
                    </div>
                  </AnimateHeight>
                </div>
              </div>
            ))}
            <div className="w-max mx-auto mt-12">
              <Pagination
                toLastPage={paginate}
                toFirstPage={paginate}
                toPrevPage={paginate}
                toNextPage={paginate}
                totalPages={notifications?.totalPages}
                data={notifications?.content}
                current={notifications?.number}
                changePage={paginate}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-96 bg-gray-100 rounded-md gap-4 text-[#666] flex flex-col items-center justify-center">
            <FiBellOff className="text-6xl" />
            <h5 className="text-2xl">Empty</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationLog;
