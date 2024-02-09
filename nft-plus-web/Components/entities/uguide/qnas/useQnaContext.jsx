import { useRouter } from "next/router";
import React, { createContext, useState, useContext } from "react";

const QnaContext = createContext({});

const QnaProvider = ({ children }) => {
  const { locale } = useRouter();
  const [qnas, setQnas] = useState({});
  const [cats, setCats] = useState({});
  const [myQuestions, setMyQuestions] = useState(false);
  const [load, setLoad] = useState(false);
  const [searchSelectedCategory, setSearchSelectedCategory] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [filterState, setFilterState] = useState({
    lang: locale === "en" ? locale : "kr",
    page: 0,
    size: 10,
    searchWord: "",
    category: ""
  });
  
  return (
    <QnaContext.Provider
      value={{
        filterState,
        setFilterState,
        load,
        setLoad,
        setQnas,
        qnas,
        searchQuery,
        setSearchQuery,
        searchSelectedCategory,
        setSearchSelectedCategory,
        myQuestions,
        setMyQuestions,
        pageNum,
        setPageNum,
        cats,
        setCats
      }}>
      {children}
    </QnaContext.Provider>
  );
};

const useQnaContext = () => useContext(QnaContext);

export { QnaContext, QnaProvider, useQnaContext };
