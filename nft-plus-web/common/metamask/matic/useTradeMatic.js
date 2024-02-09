import { ethers } from "ethers";
import Web3 from "web3";
import {
	abi,
	contractAddress,
	tamtamAddress,
	licenseAbi,
	tamtamNftAddress,
	adminAbi
} from "../blockchain/constant.mjs";
import axios from "axios";
import useAlertTranslation from "locale/useAlertTranslation";
import { getToken } from 'utils/storage'

function useTradeMatic() {
	const { walletBalanceLowI18 } = useAlertTranslation();
	const token = getToken();
	
	async function tradeLicenseHandler(licenseId, workId, price, seller) {
		const gasLimit = 30000;
		let contractHash, result, failure;
		if (typeof window !== "undefined") {
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send("eth_requestAccounts", []);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(tamtamAddress, licenseAbi, signer);

				// const seller = await signer.getAddress();
				const [buyer] = await Promise.all([signer.getAddress()]);
				try {
					const une = Web3.utils.toWei(price.toString(), "ether");
					const response = await contract.tradeLicense(
						licenseId.toString(),
						workId.toString(),
						seller,
						{ from: buyer, value: une }
					);
					// timeOut(plsWaitForMomentI18);
					contractHash = response.hash;
					await response.wait();
					result = "license trade done.";
				} catch (err) {
					if (err.data) {
						switch (err.data.message) {
							case "execution reverted: price must be larger or equal than 1000":
								failure = "price must be larger or equal than 1000";
								break;
							default:
								failure = "fails";
						}
						if (err.data.message.includes("insufficient funds")) {
							failure = walletBalanceLowI18;
						}
					} else {
						if (
							err?.message ===
							"MetaMask Tx Signature: User denied transaction signature."
						) {
							failure = "cancelled";
						} else {
							failure = "fails";
						}
					}
				}

				return { contractHash, result, failure };
			} else {
				failure = "metamask.extension.not.found";
				return { failure };
			}
		} else {
			failure = "browser.not.found";
			return { failure };
		}
	}
	// artork руу үнэ оруулах үед дуудаж бна
	async function listButtonHandler(tokenId, prce) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, abi, signer);
		const seller = await signer.getAddress();

		const tamtamContract = new ethers.Contract(
			tamtamNftAddress,
			adminAbi,
			signer
		);

		let contractHash, result, failure;

		// const tokenId = ethers.BigNumber.from(tokenIdd);
		const une = Web3.utils.toWei(prce.toString(), "ether");
		const price = ethers.BigNumber.from(une);
		try {
			const response = await contract.setPrice(tokenId, price, {
				from: seller
			});
			contractHash = response.hash;
			await response.wait();

			const listResult = await tamtamContract.approve(contractAddress, tokenId);
			// timeOut(plsWaitForMomentI18);
			await listResult.wait();
			result = "listing succeeded";
		} catch (error) {
			failure = "transaction failed";
			if (error.data) {
				if (error?.data?.message?.includes("insufficient funds")) {
					failure = walletBalanceLowI18;
				} else if (
					error?.data?.message ===
					"execution reverted: you must own target token" ||
					error?.data?.message === "msg.sender must own token"
				) {
					failure = "tokenId is not registered on current wallet.";
				} else {
					failure = "transaction failed";
				}
			} else {
				if (
					error.message ===
					"MetaMask Tx Signature: User denied transaction signature."
				) {
					failure = "cancelled";
				} else if (
					error.message.includes(
						"execution reverted: you must own target token"
					)
				) {
					failure = "tokenId is not registered on current wallet.";
				} else if (error.message.includes("msg.sender must own token")) {
					failure = "tokenId is not registered on current wallet.";
				} else if (error.message?.includes("insufficient funds")) {
					failure = walletBalanceLowI18;
				} else {
					failure = "transaction failed";
				}
			}
		}
		return { contractHash, result, failure };
	}

	async function buyButtonHandler(tokenId, workId) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, abi, signer);
		const tamtamContract = new ethers.Contract(
			tamtamNftAddress,
			adminAbi,
			signer
		);

		let contractHash, result, failure;

		const [buyer, seller, price] = await Promise.all([
			signer.getAddress(),
			tamtamContract.ownerOf(tokenId),
			contract.price(tokenId)
		]);
		if (buyer === seller) {
			failure = "please use another wallet.";
			return { failure };
		}

		// const adminBalance = new BalanceRow(adminAddress);
		// const sellerBalance = new BalanceRow(seller);
		// const buyerBalance = new BalanceRow(buyer);

		// await Promise.all([adminBalance.updateBefore(provider), sellerBalance.updateBefore(provider), buyerBalance.updateBefore(provider)]);

		await axios.post(
			process.env.url + "/artwork/buying/" + workId,
			{},
			{
				headers: {
					authorization: `Bearer ${token}`
				}
			}
		);

		try {
			const response = await contract.buy(tokenId, {
				from: buyer,
				value: price
			});
			// timeOut(plsWaitForMomentI18);
			contractHash = response.hash;
			await response.wait();
			result = "bought";
		} catch (error) {
			failure = "transaction failed";
			if (
				error?.data?.message ===
				"execution reverted: target token is not listed for sale"
			) {
				failure = "not registered in market.";
			} else if (
				error.message ===
				"MetaMask Tx Signature: User denied transaction signature."
			) {
				failure = "cancelled";
			} else if (error?.data?.message?.includes("insufficient funds")) {
				failure = walletBalanceLowI18;
			}

			await axios.post(
				process.env.url + "/artwork/buying/" + workId,
				{ isBuying: false },
				{
					headers: {
						authorization: `Bearer ${token}`
					}
				}
			);

			return { failure };
		}

		// await updateOwner(tamtamContract, tokenId, buyer, seller);

		return { contractHash, result, failure };
	}

	async function editPriceButtonHandler(tokenId, newPrice) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, abi, signer);

		let contractHash, result, failure;

		const [owner, priceBefore] = await Promise.all([
			signer.getAddress(),
			contract.price(tokenId)
		]);
		const neuePrice = Web3.utils.toWei(newPrice.toString(), "ether");

		try {
			const response = await contract.setPrice(tokenId, neuePrice, {
				from: owner
			});
			// timeOut(plsWaitForMomentI18);
			contractHash = response.hash;
			await response.wait();
			const priceAfter = await contract.price(tokenId);
			result = priceAfter;
		} catch (error) {
			failure = "transaction failed";
			if (error.data) {
				if (error?.data?.message?.includes("insufficient funds")) {
					failure = walletBalanceLowI18;
				}
				if (
					error?.data?.message ===
					"execution reverted: you must own target token"
				) {
					failure = "tokenId is not registered on current wallet.";
				}
			} else {
				if (
					error.message ===
					"MetaMask Tx Signature: User denied transaction signature."
				) {
					failure = "cancelled";
				} else if (error.message.includes("msg.sender must own token")) {
					failure = "tokenId is not registered on current wallet.";
				} else if (error.message.includes("insufficient funds")) {
					failure = walletBalanceLowI18;
				} else if (error.message.includes("denied transaction signature.")) {
					failure = "cancelled";
				} else {
					failure = "transaction failed";
				}
			}
		}
		return { contractHash, result, failure };
	}

	async function unlistHandler(tokenId) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, abi, signer);
		const tamtamContract = new ethers.Contract(
			tamtamNftAddress,
			adminAbi,
			signer
		);
		const seller = await signer.getAddress();
		const neuePrice = Web3.utils.toWei("0", "ether");
		let contractHash, result, failure;

		try {
			const response = await contract.setPrice(
				tokenId,
				ethers.BigNumber.from("0"),
				{
					from: seller
				}
			);
			contractHash = response.hash;
			await response.wait();
			const listResult = await tamtamContract.approve(
				"0x0000000000000000000000000000000000000000",
				tokenId
			);
			await listResult.wait();
			result = "unlisted";
		} catch (error) {
			if (
				error?.message ===
				"MetaMask Tx Signature: User denied transaction signature."
			) {
				failure = "cancelled";
			} else {
				failure = notOwnTokensInWalletAddressI18;
			}
			if (error?.data?.message?.includes("insufficient funds")) {
				failure = walletBalanceLowI18;
			}
			if (error?.data?.message.includes("msg.sender must own token")) {
				failure = "tokenId is not registered on current wallet.";
			}
		}

		return { contractHash, result, failure };
	}

	async function revokeHandler(tokenId) {
		let contractHash, result, failure;
		if (typeof window !== "undefined") {
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send("eth_requestAccounts", []);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const seller = await signer.getAddress();
				try {
					const response = await contract.setTrading(
						ethers.BigNumber.from(tokenId).toString(),
						false,
						ethers.BigNumber.from("0"),
						{
							from: seller
						}
					);
					timeOut(plsWaitForMomentI18);
					contractHash = response.hash;
					await response.wait();
					result = "unlisted";
				} catch (error) {
					failure = "fails";
					if (
						error?.message ===
						"MetaMask Tx Signature: User denied transaction signature."
					) {
						failure = "cancelled";
					}
					if (error?.data?.message?.includes("insufficient funds")) {
						failure = walletBalanceLowI18;
					}
				}
				return { contractHash, result, failure };
			} else {
				failure = "metamask.extension.not.found";
				return { failure };
			}
		} else {
			failure = "browser.not.found";
			return { failure };
		}
	}

	async function checkPriceButtonHandler(tokenId) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const contract = new ethers.Contract(contractAddress, abi, provider);

		//   const tokenId = document.getElementById("checkPriceInputTokenId").value;
		const price = await contract.price(
			ethers.BigNumber.from(tokenId).toString()
		);
		return price;
	}

	async function getMaticLicenseFeeRate() {
		let result, failure;
		if (typeof window !== "undefined") {
			if (window.ethereum) {
				try {
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					await provider.send("eth_requestAccounts", []);
					const signer = provider.getSigner();
					const contract = new ethers.Contract(tamtamAddress, licenseAbi, signer);
					const response = await contract.licenseTradeFee();
					// console.log(response)
					result = response;
					return { result }
				} catch (err) {
					console.log(err)
					if (
						err?.message ===
						"MetaMask Tx Signature: User denied transaction signature."
					) {
						failure = "cancelled";
					} else {
						failure = "fails";
					}
				}
				return { result, failure };
			} else {
				failure = "metamask.extension.not.found";
				return { failure };
			}
		} else {
			failure = "browser.not.found";
			return { failure };
		}
	}

	async function getMaticSaleFeeRate() {
		let result, failure;
		if (typeof window !== "undefined") {
			if (window.ethereum) {
				try {
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					await provider.send("eth_requestAccounts", []);
					const signer = provider.getSigner();
					const contract = new ethers.Contract(contractAddress, abi, signer);
					const response = await contract.saleFeeRate();
					// console.log(response)
					result = response;
					return { result }
				} catch (err) {
					console.log(err)
					if (
						err?.message ===
						"MetaMask Tx Signature: User denied transaction signature."
					) {
						failure = "cancelled";
					} else {
						failure = "fails";
					}
				}
				return { result, failure };
			} else {
				failure = "metamask.extension.not.found";
				return { failure };
			}
		} else {
			failure = "browser.not.found";
			return { failure };
		}
	}

	async function getMaticResaleFeeRate() {
		let result, failure;
		if (typeof window !== "undefined") {
			if (window.ethereum) {
				try {
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					await provider.send("eth_requestAccounts", []);
					const signer = provider.getSigner();
					const contract = new ethers.Contract(contractAddress, abi, signer);

					const response = await contract.resaleFeeRate();
					// console.log(response)
					result = response;
					return { result }
				} catch (err) {
					console.log(err)
					if (
						err?.message ===
						"MetaMask Tx Signature: User denied transaction signature."
					) {
						failure = "cancelled";
					} else {
						failure = "fails";
					}
				}
				return { result, failure };
			} else {
				failure = "metamask.extension.not.found";
				return { failure };
			}
		} else {
			failure = "browser.not.found";
			return { failure };
		}
	}

	return {
		tradeLicenseHandler,
		listButtonHandler,
		buyButtonHandler,
		editPriceButtonHandler,
		unlistHandler,
		revokeHandler,
		checkPriceButtonHandler,
		getMaticLicenseFeeRate,
		getMaticSaleFeeRate,
		getMaticResaleFeeRate
	};
}

export default useTradeMatic;
