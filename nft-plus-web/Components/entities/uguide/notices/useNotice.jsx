import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import { useRouter } from "next/router";
import { useState } from "react";
import { apis } from "utils/libs";
import nestedObjToParam from "utils/nestedObjToParam";

const useNotice = () => {
  const { getModel } = useCrud();
  const { calcMessage } = useMessageFactory();
  const [notices, setNotices] = useState({});
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterState, setFilerState] = useState({
    page: 0,
    size: 10,
    searchWord: "",
    searchType: { description: "전체" }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [paginating, setPaginating] = useState(false);
  const [searchOption, setSearchOption] = useState(false);
  const { push } = useRouter();

  async function getNotifications(params) {
    setLoading(true);
    try {
      const res = await getModel(
        `${apis.notices}?${nestedObjToParam(params)}`,
        true
      );
      setNotices(res);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoading(false);
    }
  }
  async function getNotiDetail(id) {
    setLoading(true);
    try {
      const res = await getModel(`${apis.notice}/${id}`, true);
      setDetail(res);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoading(false);
    }
  }

  const searchWork = (event) => {
    if (event.key === "Enter") {
      setFilerState({
        ...filterState,
        ...{ searchWord: searchQuery },
        ...{
          searchType:
            searchOption && searchOption === "제목"
              ? { title: searchOption }
              : { description: searchOption }
        }
      });
    }
  };

  const searchWidthVal = (filter) => {
    setFilerState(filter);
  };

  const goToDetail = (id) => {
    push(`/notice/${id}`);
  };

  const paginate = (num) => {
    setPaginating(true);
    setFilerState({
      ...filterState,
      page: num
    });
  };

  return {
    goToDetail,
    paginate,
    searchWidthVal,
    setFilerState,
    getNotifications,
    searchWork,
    filterState,
    notices,
    loading,
    setSearchOption,
    searchOption,
    detail,
    setDetail,
    getNotiDetail
  };
};

export default useNotice;
