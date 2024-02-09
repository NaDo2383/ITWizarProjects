import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import { useState } from "react";
import { apis } from "utils/libs";
import nestedObjToParam from "utils/nestedObjToParam";

const useFaq = () => {
  const { getModel } = useCrud();
  const { calcMessage } = useMessageFactory();
  const [faqs, setfaqs] = useState({});
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cuIndex, setCuIndex] = useState();
  const [isAnswer, setIsAnswer] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(null);
  const [questionIndex, setQuestionIndex] = useState();
  const [pageNum, setPageNum] = useState(0);

  const changeCategory = (category) => {
    setChosenCategory(category);
    setIsAnswer(false);
  };

  const showAnswer = (index) => {
    setCuIndex(index);
    if (cuIndex === index) {
      setIsAnswer(!isAnswer);
    } else {
      setIsAnswer(true);
    }
    setQuestionIndex(index);
  };

  const paginate = (num) => {
    setPageNum(num);
  };

  async function getFaqs(params) {
    setLoading(true);
    try {
      const res = await getModel(
        `${apis.faqs}/${params.id}?${nestedObjToParam(params.params)}`,
        true
      );
      setfaqs(res);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoading(false);
    }
  }
  async function getCategorys() {
    setLoading(true);
    try {
      const res = await getModel(`${apis.categorys}`, true);
      setCats(res);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoading(false);
    }
  }

  return {
    faqs,
    setfaqs,
    getFaqs,
    changeCategory,
    paginate,
    showAnswer,
    setChosenCategory,
    getCategorys,
    cats,
    setCats,
    questionIndex,
    loading,
    chosenCategory,
    pageNum,
    isAnswer
  };
};

export default useFaq;
