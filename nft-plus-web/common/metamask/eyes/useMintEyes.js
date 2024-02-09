import { ethers } from "ethers";
import {
  abi,
  contractAddress,
  adminAddress,
  tamtamNftAddress,
  adminAbi,
  tamtamEyesTrader,
  eyesToken,
  EYESTokenAbi,
  TamtamEyesTraderAbi,
} from "../blockchain/constant.mjs";
import { useRouter } from "next/router";
import { BalanceRow } from "../blockchain/balance.mjs";
import useCommonTranslation from "locale/useCommonTranslation.js";
import useAlertTranslation from "locale/useAlertTranslation.js";
import { apis } from "utils/libs.js";
import useCrud from "common/axios/crud.js";
import useMetamask from "../useMetamask.js";
// mint хийх гэдэг нь metamask - аар дамжуулж blockchain дээр тухайн бүтээгдэхүүн бүртгэснийг хэлнэ
import axios from "axios";
function useMintEyes() {
  const { timeOut } = useMetamask()
  const { postModel } = useCrud()
  const { walletBalanceLowI18 } = useAlertTranslation()
  const { plsWaitForMomentI18 } = useCommonTranslation()

  async function mintEyes(workId, royalty, uri) {
    let contractHash, nftId, failure;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const tokenRecipient = await signer.getAddress();
      const contractAdmin = new ethers.Contract(
        tamtamEyesTrader,
        TamtamEyesTraderAbi,
        signer
      );
      const mintFee = await contractAdmin.mintFee();
      const gasLimit = 3000000;
      const contract = new ethers.Contract(eyesToken, EYESTokenAbi, signer);
      // const contract = new web3().eth.Contract(EYESTokenAbi, tamtamEyesTrader);

      const contractTrader = new ethers.Contract(
        tamtamEyesTrader,
        TamtamEyesTraderAbi,
        signer
      );

      const adminBalance = new BalanceRow(tamtamEyesTrader);
      const minterBalance = new BalanceRow(tokenRecipient);
      const royaltyPercent = ethers.BigNumber.from(parseFloat(royalty) * 10);

      await Promise.all([
        adminBalance.updateBefore(provider),
        minterBalance.updateBefore(provider),
      ]);

      const approveResponse = await contract.approve(
        tamtamEyesTrader,
        mintFee,
        {
          from: tokenRecipient,
          gasLimit,
        }
      );

      await approveResponse.wait();
      const response = await contractTrader.requestMint(
        workId.toString(),
        uri,
        royaltyPercent,
        { from: tokenRecipient, gasLimit }
      );
      contractHash = response.hash;
      timeOut(plsWaitForMomentI18);
      await postModel(apis.artworkMint + `/${workId}`, { transactionHash: contractHash }, true, false)
      const receipt = await response.wait();
      nftId = "tokenId";
      try {
        await Promise.all([
          adminBalance.updateAfter(provider),
          minterBalance.updateAfter(provider),
        ]);
      } catch (error) {
         console.error('update balance error : ', error)
      }
    } catch (error) {
      await postModel(apis.artworkNotMint + `/${workId}`, { transactionHash: contractHash }, true, false)
      console.error(error)
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
    // const owner = await updateOwner(contract, nftId);
    return { contractHash, nftId, failure };
  }

  // eyes - аар mint хийгдсэн тухай мэдээллийг db рүү бүртгэнэ
  async function mintEyesIntoDb(formData, workId, isMint) {
    const myInit = {
      method: "POST",
      body: JSON.stringify(formData)
    };
    
    try {
      isMint && await postModel(apis.artworkMint + `/${workId}`, {}, true , false)
      await fetch("/api/mint", myInit)
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  async function getMintFeeEyes() {
    let contractHash, result, failure;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractAdmin = new ethers.Contract(
        tamtamEyesTrader,
        TamtamEyesTraderAbi,
        signer
      );
      const response = await contractAdmin.mintFee();
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
    mintEyes,
    mintEyesIntoDb,
    getMintFeeEyes
  }
}

export default useMintEyes