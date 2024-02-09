/**
 * @createdBy Phill Anderson 2023/3/20
 */
import useCrud from "common/axios/crud";
import { useGlobalContext } from "common/global/useGlobalContext";
import { apis } from "utils/libs";
import { getLocal } from "utils/storage";

function useProfile() {
	const { getModel } = useCrud();
	const { profileUser, setProfileUser, activeWallets, setActiveWallets } =
		useGlobalContext();

	async function getUserProfile(disableContext = false) {
		if (getLocal("user")?.result) {
			try {
				const res = await getModel(apis.userProfile, true);
				if (!disableContext) {
					setProfileUser(res?.result);
				}
				return res?.result;
			} catch (e) {
				throw new Error(e);
			} finally {
			}
		}
	}

	async function addWallet(data) {
		try {
			const res = await postModel(apis.wallet, data, true);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	return {
		getUserProfile,
		profileUser,
		addWallet,
		activeWallets
	};
}

export default useProfile;
