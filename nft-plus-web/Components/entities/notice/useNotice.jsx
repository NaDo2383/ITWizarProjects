import useCrud from "common/axios/crud";
import { apis } from "utils/libs";
import { useRouter } from "next/router";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useNoticeContext } from "./useNoticeContect";

function useNotice() {
	const { locale } = useRouter();
	const queryLang = locale === "en" ? `lang=${locale}` : `lang=kr`;
	const {
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
	} = useNoticeContext();
	const { setGlobalLoading } = useGlobalContext();
	const { getModel } = useCrud();

	async function getNotice(category) {
		setGlobalLoading(true);
		try {
			const res = await getModel(
				apis.notices +
					`?page=${pageNum}&size=${9}&categoryId=${category ? category : ""}` +
					"&" +
					queryLang
			);
			setNotices(res);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			setGlobalLoading(false);
		}
	}
	async function getNoticeCategory() {
		try {
			const res = await getModel(apis.noticesCategory + "?" + queryLang);
			setNoticesCategory(res);
		} catch (error) {
			console.error(error);
			return error;
		}
	}
	async function getNoticeDetail(id) {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.notice + "/" + id);
			setNotice(res);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			setGlobalLoading(false);
		}
	}



	return {
		getNotice,
		getNoticeDetail,
		getNoticeCategory,
		notices,
		setNotices,
		pageNum,
		setPageNum,
		load,
		setLoad,
		noticeCategory,
		notice,
		setNotice
	};
}

export default useNotice;
