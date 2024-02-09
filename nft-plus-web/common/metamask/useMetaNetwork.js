import useArtworkTranslation from "locale/useArtworkTranslation";
import networks from "datas/networks.json";
import { isMobile } from "react-device-detect";

const useMetaNetwork = () => {
	const { plsInstallMetaMaskI18 } = useArtworkTranslation();

	async function getNetworkName() {
		const currentNetwork = await getNetwork();
		if (currentNetwork === process.env.MATIC_CHAIN_ID) {
			return { network: "polygon", currency: "MATIC" };
		}
		if (currentNetwork === process.env.ETH_CHAIN_ID) {
			return { network: "ethereum", currency: "ETH" };
		}
		return;
	}
	async function getNetwork() {
		if (window.ethereum) return window.ethereum.networkVersion;
		return null;
	}
	//console.log(window.ethereum.networkVersion);

	async function addNetwork(network) {
		const provider = window.ethereum;
		try {
			await provider.request({
				id: 0,
				jsonrpc: "2.0",
				method: "wallet_addEthereumChain",
				params: [
					{
						chainId: network.chainId,
						chainName: network.chainName,
						rpcUrls: network.rpcUrls,
						nativeCurrency: network.nativeCurrency,
						blockExplorerUrls: network.blockExplorerUrls
					}
				]
			});
		} catch (error) {
			if (error.code === 4001) {
				return;
			}
			throw "네트워크 추가 실패했습니다.";
		}
	}

	async function switchNetwork(id) {
		const network = networks.find((data) => data.id === id);
		if (!network) {
			throw "실패했습니다";
		}
		const provider = window.ethereum;
		try {
			await provider.request({
				id: 1,
				jsonrpc: "2.0",
				method: "wallet_switchEthereumChain",
				params: [
					{
						chainId: network.chainId
					}
				]
			});
		} catch (switchError) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902 || (isMobile && switchError.code === -32603)) {
				return await addNetwork(network);
			} else if (switchError.code === 4001) {
				return;
			} else {
				console.error('switchError', switchError);
				// alert(JSON.stringify(switchError))
				throw "네트워크 변경 실패했습니다.";
			}
		}
	}

	return { getNetworkName, getNetwork, switchNetwork };
};
export default useMetaNetwork;
