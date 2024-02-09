/**
 * @createdBy Phill Anderson 2023/02/17
 */
import useCrud from "common/axios/crud";
import { isTokenEnded } from "utils/string";
import useMetamask from "common/metamask/useMetamask";
import { apis, storages } from "utils/libs";
import {
	getLocal,
	setLocal,
	setSessionCookie,
	removeCookie,
	getToken
} from "utils/storage";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useRouter } from "next/router";
import usePopup from "Components/ui/popup/usePopup";

function useAuthUser() {
	const {
		hideAllModals,
		popupProps,
		handleShowModal,
		MODAL_TYPES
	} = usePopup();
	const {
		authUser,
		setAuthUser,
		signupState,
		setSignupState,
		setGlobalLoading
	} = useGlobalContext();
	const { postModel, getModel } = useCrud();
	const { connectMetamask, getCurrentMetaAddress } = useMetamask();
	const token = getToken();
	const router = useRouter();

	async function login(data) {
		if (!data) return
		setLocal("user", { result: data?.result })
		window.dispatchEvent(new Event("storage"));
		setSessionCookie(data?.token)
		setTimeout(() => {
			handleShowModal(MODAL_TYPES.LOGIN_SUCCESS_POPUP)
		}, 100);
	}

	async function loginUser() {
		const token = getToken();
		const tokenIsExpired = isTokenEnded(token);
		const user = getLocal("user")?.result;
		if (tokenIsExpired) {
			return;
		} else if (!user) {
			logOut();
		} else {
			const walletAddress = await getCurrentMetaAddress();
			if (user.wallet.toLowerCase() !== walletAddress.toLowerCase()) {
				logOut();
				return;
			}
			setAuthUser(user);
			// await connectMetamask();
		}
	}

	async function refreshToken() {
		const tokenIsExpired = isTokenEnded(token);
		if (token && tokenIsExpired) {
			const { data, success } = await postModel('/refresh-token', {})
			if (success) {
				login(data);
			} else {
				// console.log('logout')
				resetAuthUser();
			}
		}
	}

	async function resetAuthUser() {
		setAuthUser(null);
		setLocal(storages.loggedUser, null);
		setLocal(storages.userCredentials, null);
		removeCookie('jwt-token')
	}

	async function logOut() {
		await postModel(apis.logout, {}, true)
		await resetAuthUser();
		router.push("/");
	}

	async function isExistIPin(data) {
		setSignupState((prev) => ({ ...prev, ipinLoader: true }));
		try {
			const res = await postModel(apis.ipinExist, data, true);
			setSignupState((prev) => ({ ...prev, ipin: res, error: null }));
			return res;
		} catch (e) {
			console.error(e);
			setSignupState((prev) => ({ ...prev, error: "isExistIpin" }));
			return false;
		} finally {
			setSignupState((prev) => ({ ...prev, ipinLoader: false }));
		}
	}

	async function emailVerify(email, locale) {
		//setGlobalLoading(true);
		try {
			await postModel(apis.emailVerify, { email, lang: locale }, true, true);
			return;
		} catch (e) {
			if (e?.response?.status) {
				return calcMessage(e?.response?.status);
			}
		} finally {
			//setGlobalLoading(false);
		}
	}

	async function countUserViews() {
		try {
			const tstamp = new Date().getTime();
			const res = await fetch(`/api/ip?r=${tstamp}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			await postModel(apis.userViews, { ip: data.ip, userId: authUser?.id || 0 })
		} catch (e) {
			if (e) {
				console.error(e);
			}
		}
	}

	return {
		countUserViews,
		refreshToken,
		logOut,
		authUser,
		isExistIPin,
		signupState,
		emailVerify,
		login,
		loginUser
	};
}
export default useAuthUser;

export function useCheckUser() {
	const { logOut, authUser } = useAuthUser();
	const loggedUser = getLocal(storages.loggedUser);
	const localCredentials = getLocal(storages.loggedUser);
	const token = getToken();
	const tokenIsExpired = isTokenEnded(token);

	function isLoggedIn() {
		if (tokenIsExpired) return false;
		return true;
	}

	return {
		loggedUser,
		logOut,
		localCredentials,
		tokenIsExpired,
		isLoggedIn,
		authUser
	};
}