/**
 * @createdBy Phill Anderson 2022/03/28
 */
import { useMetaMaskContext } from "./useMetamaskContext";
import { useGlobalContext } from "common/global/useGlobalContext";
import useAlertTranslation from "locale/useAlertTranslation";
import { provider, ethers } from "./ethers";

function useMetamask() {
	const { plsInstallMetaMaskI18 } = useAlertTranslation();
	const { setGlobalLoading } = useGlobalContext();
	const { metamaskUser, setMetamaskUser, asWon, setAsWon } =
		useMetaMaskContext();

	function timeOut(message) {
		return setTimeout(() => {
			alert(message);
		}, [12 * 1000]);
	}

	async function isMetamaskLoggedIn() {
		return metamaskUser.loggedUser ? true : false;
	}

	async function getCurrentMetaAddress() {
		try {	
			return provider.send("eth_requestAccounts", []).then((wallets) => {
				return wallets[0];
			});
		} catch (e){
			console.error(e);
			return null;
		}
	}

	async function connectMetamask() {
		setGlobalLoading(true);
		try {
			if (!window.ethereum) {
				setMetamaskUser((prev) => ({ ...prev, error: plsInstallMetaMaskI18 }));
				return;
			}
			provider.send("eth_requestAccounts", []).then(async () => {
				await updateAccount(provider.getSigner());
			});
		} catch (e) {
			console.error("metamask-tai холбогдоход алдаа гарлаа", e);
			throw new Error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	async function updateAccount(newAccount) {
		try {
			const address = await newAccount.getAddress();
			const balance = await newAccount.getBalance();
			setMetamaskUser((prev) => ({
				...prev,
				loggedUser: address,
				balance: ethers.utils.formatEther(balance)
			}));
			await getLatestBalance(address);
		} catch (e) {
			console.error("metamask account - ийг шинэчлэх үед алдаа гарлаа", e);
			throw new Error(e);
		}
	}

	async function getLatestBalance(address) {
		try {
			const balance = await provider.getBalance(address, "latest");
			return balance;
		} catch (e) {
			console.error("metamask - аас balance авахад алдаа гарлаа", e);
			throw new Error(e);
		}
	}

	return {
		metamaskUser,
		connectMetamask,
		updateAccount,
		getLatestBalance,
		isMetamaskLoggedIn,
		timeOut,
		getCurrentMetaAddress,
		asWon,
		setAsWon
	};
}

export default useMetamask;
