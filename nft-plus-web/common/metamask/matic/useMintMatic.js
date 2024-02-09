import { ethers } from "ethers";
import {
	abi,
	contractAddress,
	adminAddress,
	tamtamNftAddress,
	adminAbi
} from "../blockchain/constant.mjs";
import { useRouter } from "next/router";
import { BalanceRow } from "../blockchain/balance.mjs";
import useAlertTranslation from "locale/useAlertTranslation.js";
import { apis } from "utils/libs.js";
import useCrud from "common/axios/crud.js";

function useMintMatic() {
	const router = useRouter();
	const { postModel } = useCrud();
	const { walletBalanceLowI18 } = useAlertTranslation();

	async function mintMatic(workId, royalty, uri) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, abi, signer);
		const tokenRecipient = await signer.getAddress();
		const contractAdmin = new ethers.Contract(
			tamtamNftAddress,
			adminAbi,
			signer
		);
		const mintFee = await contractAdmin.mintFee();
		let contractHash, nftId, failure, gg;
		const adminBalance = new BalanceRow(adminAddress);
		const minterBalance = new BalanceRow(tokenRecipient);
		const royaltyPercent = ethers.BigNumber.from(parseFloat(royalty) * 10);

		await Promise.all([
			adminBalance.updateBefore(provider),
			minterBalance.updateBefore(provider)
		]);

		try {
			const response = await contract.mint(
				workId.toString(),
				uri,
				royaltyPercent,
				{ from: tokenRecipient, value: mintFee }
			);
			contractHash = response.hash;
			const receipt = await response.wait();
			await postModel(
				apis.artworkMint + `/${workId}`,
				{ transactionHash: contractHash },
				true
			);

			const events = receipt.events.filter((event) => {
				return event.address == contractAddress;
			});
			nftId = "tokenId";
			if (typeof window !== "undefined") router.push("/mypage");
		} catch (error) {
			if (error.data) {
				if (error.data.message.includes("insufficient funds")) {
					failure = walletBalanceLowI18;
				} else {
					failure = "failed";
				}
			} else {
				if (
					error.message ===
					"MetaMask Tx Signature: User denied transaction signature."
				) {
					failure = "cancelled";
				} else {
					failure = "failed";
				}
			}
		}

		await Promise.all([
			adminBalance.updateAfter(provider),
			minterBalance.updateAfter(provider)
		]);

		// const owner = await updateOwner(contract, nftId);
		return { contractHash, nftId, failure };
	}

	async function getMintFeeMatic() {
		let contractHash, result, failure ;
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const contractAdmin = new ethers.Contract(
				tamtamNftAddress,
				adminAbi,
				signer
			);
			const response = await contractAdmin.mintFee();
		    // console.log('response' , response)
			result = response;
		} catch (error) {
			console.error(error)
			if (
			error.message ===
			"MetaMask Tx Signature: User denied transaction signature."
			) {
			failure = "cancelled";
			} else {
			failure = "failed";
			}
		}
		return { contractHash, result, failure };
	}

	return {
		mintMatic,
		getMintFeeMatic 
	};

}

export default useMintMatic;
