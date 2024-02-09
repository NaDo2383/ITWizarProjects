/**
 * @createdBy zombie 2023/7/1
 */
import React, { createContext, useState, useContext } from "react";

const NoticeContext = createContext({});

const NoticeProvider = ({ children }) => {
	const [notices, setNotices] = useState([]);
	const [noticeCategory, setNoticesCategory] = useState([]);
	const [pageNum, setPageNum] = useState(0);
	const [load, setLoad] = useState(false);
	const [notice, setNotice] = useState(false);

	return (
		<NoticeContext.Provider
			value={{
				notices,
				setNotices,
				pageNum,
				setPageNum,
				load,
				setLoad,
				noticeCategory,
				setNoticesCategory,
				notice,
				setNotice
			}}>
			{children}
		</NoticeContext.Provider>
	);
};

const useNoticeContext = () => useContext(NoticeContext);

export { NoticeContext, NoticeProvider, useNoticeContext };
