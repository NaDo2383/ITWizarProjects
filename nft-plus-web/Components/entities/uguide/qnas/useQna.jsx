import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import { useState } from "react";
import { apis } from "utils/libs";
import nestedObjToParam from "utils/nestedObjToParam";
import { useQnaContext } from "./useQnaContext";
import { useGlobalContext } from "common/global/useGlobalContext";

const useQnas = () => {
  const { getModel, postModel } = useCrud();
  const [detail, setDetail] = useState({});
  const { calcMessage } = useMessageFactory();
  const { setGlobalLoading } = useGlobalContext();
  const {
    filterState,
    setFilterState,
    load,
    setLoad,
    setQnas,
    qnas,
    pageNum,
    setPageNum,
    cats,
    setCats
  } = useQnaContext();

  async function getQnas(params) {
    console.log('params', params)
    setLoad(true);
    try {
      const res = await getModel(
        `${apis.qnas}?${nestedObjToParam(params)}`,
        true
      );
      setQnas(res);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoad(false);
    }
  }
  async function getPrivQnas(data) {
    setGlobalLoading(true);
    try {
      const res = await postModel(
        `${apis.qna}/${data?.id}`, data.body ,
        true
      );
      setDetail(res.data);
      return res;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setGlobalLoading(false);
    }
  }
  async function createQna(data) {
    try {
      const res = await postModel(`${apis.createQna}`, data, true);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
    }
  }
  async function getQnaDetail(data) {
    try {
      const res = await postModel(`${apis.createQna}/${data.id}`,
        { ...data.body, ...data.params },
        true
      );
      setDetail(res.data);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
    }
  }

  async function getCategorys(params) {
    setLoad(true);
    try {
      const res = await getModel(
        `${apis.qnaCategory}?${new URLSearchParams(params.params).toString()}`,
        true
      );
      setCats(res);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoad(false);
    }
  }

  const paginate = (num) => {
    setFilterState({ ...filterState, page: num });
  };

  return {
    qnas,
    setQnas,
    paginate,
    setFilterState,
    filterState,
    load,
    setLoad,
    getQnas,
    getCategorys,
    pageNum,
    setPageNum,
    cats,
    createQna,
    getQnaDetail,
    detail,
    getPrivQnas
  };
};

export default useQnas;
