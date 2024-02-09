import {
    tamtamNftAddress,
    adminAbi,
    contractAddress,
    abi,
    eyesContractAddress,
  } from "common/metamask/blockchain/constant.mjs";
import { ethers } from "ethers";
import Web3 from "web3";
import useAlertTranslation from "locale/useAlertTranslation";
import useMetamask from "../useMetamask";

function useApproveEyes() {
    const { timeOut } = useMetamask()
    const { noTokensInWalletI18, walletBalanceLowI18 } =
      useAlertTranslation();
    async function approveToken(tokenId, prce, unlist) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const mainContract = new ethers.Contract(contractAddress, abi, signer);
      const seller = await signer.getAddress();
      const contract = new ethers.Contract(tamtamNftAddress, adminAbi, signer);
      const une = Web3.utils.toWei(prce.toString(), "ether");
      const price = ethers.BigNumber.from(une);
      try {
        const responseList = await mainContract.setPrice(
          tokenId,
          unlist ? ethers.BigNumber.from("0") : price,
          {
            from: seller,
          }
        );
        let contractHash = responseList.hash;
        await responseList.wait();
        const response = await contract.approve(
          unlist
            ? "0x0000000000000000000000000000000000000000"
            : eyesContractAddress,
          tokenId
        );
        // timeOut(waitForMomentI18);
        await response.wait();
        return "success";
      } catch (error) {
        let errorMessage = "failed";
        if (error.data) {
          if (error.data.message.includes("approve caller is not owner")) {
            errorMessage = noTokensInWalletI18;
          } else if (error?.data?.message?.includes("insufficient funds")) {
            errorMessage = walletBalanceLowI18;
          } else if (
            error?.data?.message ===
            "execution reverted: you must own target token"
          ) {
            errorMessage = "토큰을 소유한 지갑 주소가 아닙니다.";
          } else if (error?.data?.message.includes("msg.sender must own token")) {
            errorMessage = "토큰을 소유한 지갑 주소가 아닙니다.";
          }
        } else {
          if (
            error.message ===
            "MetaMask Tx Signature: User denied transaction signature."
          ) {
            errorMessage = "cancelled";
          } else if (error.message.includes("approve caller is not owner")) {
            errorMessage = noTokensInWalletI18;
          } else if (error.message.includes("insufficient funds")) {
            errorMessage = walletBalanceLowI18;
          } else if (
            error.message.includes(
              "execution reverted: you must own target token"
            )
          ) {
            errorMessage = "토큰을 소유한 지갑 주소가 아닙니다.";
          } else if (error.message.includes("msg.sender must own token")) {
            errorMessage = "토큰을 소유한 지갑 주소가 아닙니다.";
          }
        }
        return errorMessage;
      }
    }
  
    return { approveToken };
}

export default useApproveEyes