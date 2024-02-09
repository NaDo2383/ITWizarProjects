import useAlertTranslation from "locale/useAlertTranslation";
import { ethers } from "ethers";
import { useGlobalContext } from "common/global/useGlobalContext";
const useWallet = () => {
	const { authUser } = useGlobalContext();
	const {
		plsInstallMetamaskInBrowserI18,
		registerYourWalletI18,
		networkCongestedI18
	} = useAlertTranslation();
	// одоо metamask дээр хэрэглэж буй wallet address
	async function getWallet() {
		if (window.ethereum) {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const addr = await provider.send("eth_requestAccounts", []);
				return addr[0];
			} catch (error) {
				if (error.message.includes("Already processing eth_requestAccounts")) {
					return "processing";
				}
			}
		} else {
			alert(plsInstallMetamaskInBrowserI18);
			return "notFound";
		}
	}
	async function walletIsMatch() {
		const currentMetaWallet = await getWallet();
		if (currentMetaWallet === "processing") {
			alert("Please Login into Metamask!");
			return;
		}
		if (currentMetaWallet === "notFound") {
			alert(metaMaskAddressNotFoundI18);
			return;
		}
		const authUserWallet = await authUser?.wallet;
		const isMatchWallet = currentMetaWallet.toLowerCase() === authUserWallet.toLowerCase();
		return { isMatchWallet, currentMetaWallet };
	}
	async function walletIsRegistered(registeredWallets) {
		const currentMetaWallet = await getWallet();
		if (!registeredWallets) {
			alert("registeredWallets paratemer oruulna uu!");
			return false;
		}
		if (currentMetaWallet === "processing") {
			alert("Please Login into Metamask!");
			return;
		}
		if (currentMetaWallet === "notFound") {
			alert(metaMaskAddressNotFoundI18);
			return;
		}

		const isRegistered = registeredWallets.some(
			(el) => el.address === currentMetaWallet
		);
		return isRegistered;
	}
	return {
		getWallet,
		walletIsRegistered,
		walletIsMatch
	};
};

export default useWallet;
