import { ethers } from "ethers";
import axios from "axios";
import { useState } from "react";
import useCommonTranslation from "locale/useCommonTranslation";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import usePopup from "Components/ui/popup/usePopup";

const useAuthMetamask = () => {
	const {
		hideAllModals,
		popupProps,
		handleShowModal,
		MODAL_TYPES
	} = usePopup();
	const { metaMaskRegisterMessageI18 } = useCommonTranslation();
	const [signatureRequestCalled, setSignatureRequestCalled] = useState(false);
	const { logOut, login } = useAuthUser()

	const onSignatureRequest = async () => {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();

			const address = await signer.getAddress();

			const signature = await signer.signMessage(metaMaskRegisterMessageI18);

			try {
				const { data } = await axios.post(process.env.url + "/signature", {
					signature,
					address
				});
				// console.log(data);
				if (data) {
					login(data);
				}
				setSignatureRequestCalled(false);
				return data;
			} catch (err) {
				logOut();
			}
		} catch (err) {
			console.error(err);
			logOut();
		}
	};
	{
		/*if (window.confirm("Do you want to open MetaMask extension?")) {
	  window.open(
		"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
	  );
	} else {
	  return;
	}*/
	}
	const onAuthMetamask = async (accounts) => {
		try {
			let address = accounts ? accounts[0] : "";
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			// provider.on('message', (message) => {
			// 	alert("Metamask has notif")
			//   });
			let authMetamask = true;
			await provider.send("eth_requestAccounts", []).catch((error) => {
				alert(error.message);
				if (error.code === -32002) {
					authMetamask = false;
				}
			});
			if (!authMetamask) {
				return
			}
			const signer = provider.getSigner();
			address = await signer.getAddress();
			try {
				const { data } = await axios.post(process.env.url + "/authenticate", {
					address
				});
				if (data) {
					login(data);
				}
				
				return data;
			} catch (err) {
				console.log(err)
				logOut();
				if (err.response && err.response.status === 404) {
					setSignatureRequestCalled(true);
					return err.response;
				} else {
					alert(err.message + " Check metamask extension");
				}
			}
		} catch (err) {
			console.log(err.code)
			console.log(err);
			logOut()
		}
	};

	function handleEthereum() {
		const { ethereum } = window;
		if (ethereum && ethereum.isMetaMask) {
			console.log('Ethereum successfully detected!');
			// Access the decentralized web!
		} else {
			console.log('Please install MetaMask!');
		}
	}

	return { onAuthMetamask, onSignatureRequest, signatureRequestCalled };
};

export default useAuthMetamask;
