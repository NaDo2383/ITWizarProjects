import useCrud from "common/axios/crud";
import { apis } from "utils/libs";
import { useRouter } from "next/router";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useServiceInfoContext } from "./useServiceInfoContext";

function useServiceInfo() {
	const { locale } = useRouter();
	const queryLang = locale === "en" ? `?lang=${locale}` : `?lang=kr`;
	const {
		privacyPolicy,
		setPrivacyPolicy,
		termsOfUse,
		setTermsOfUse,
		termsByType,
		setTermsByType
	} = useServiceInfoContext();
	const { setGlobalLoading } = useGlobalContext();
	const { getModel } = useCrud();

	async function getServicePolicy() {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.servicePolicy + queryLang);
			return res;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getPrivacyPolicy() {
		setGlobalLoading(true);
		try {
			const res = await getModel(
				apis.serviceInfo + "/privacypolicy" + queryLang
			);
			setPrivacyPolicy(res);
			return res;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getPrivacyPolicyByType() {
		setGlobalLoading(true);
		try {
			const res = await getModel(
				apis.serviceInfo + queryLang + `&type=privacypolicy`
			);
			return res;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getTerms() {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.terms + queryLang);
			setTermsOfUse(res);
			return res;
		} catch (error) {
			return error;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getTermsByType() {
		try {
			const res = await getModel(apis.serviceInfo + `?type=terms&${queryLang}`);
			setTermsByType(res);
			return res;
		} catch (e) {
			console.error(e);
		}
	}

	async function getTermDetail(termId) {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.serviceInfo + `/${termId}`);
			return res;
		} catch (e) {
			console.error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	return {
		getServicePolicy,
		getPrivacyPolicy,
		getTerms,
		privacyPolicy,
		termsOfUse,
		getTermsByType,
		termsByType,
		getTermDetail,
		getPrivacyPolicyByType
	};
}

export default useServiceInfo;
