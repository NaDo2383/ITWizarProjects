import { ethers } from "ethers";
import {
  TamtamEyesTraderAbi,
  tamtamEyesTrader,
  eyesToken,
  EYESTokenAbi,
} from "../blockchain/constant.mjs";
import useAlertTranslation from "locale/useAlertTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import useMetamask from "../useMetamask";
import useCrud from "common/axios/crud.js";
// eyes - ээр худалдан авах үйлдэл
function useTradeEyes() {
  const { timeOut } = useMetamask()
  const { walletBalanceLowI18 } = useAlertTranslation();
  const { plsWaitForMomentI18 } = useCommonTranslation();
  const { postModel } = useCrud();

  async function tradeWithEyes(tokenId, workId, seller, price) {
    let failure = "failed";
    if (typeof window !== "undefined") {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const approveContract = new ethers.Contract(
          eyesToken,
          EYESTokenAbi,
          signer
        );

        try {
          const address = await signer.getAddress();
          const responseApprove = await approveContract.approve(
            tamtamEyesTrader,
            price
          );
          await responseApprove.wait();
          timeOut(plsWaitForMomentI18);
          await postModel(`/artwork/buying/${workId}`, {}, true, false)
          // await axios.post(
          //   process.env.url + "/artwork/buying/" + workId,
          //   {},
          //   {
          //     headers: {
          //       authorization: `Bearer ${token}`,
          //     },
          //   }
          // );

          const contract = new ethers.Contract(
            tamtamEyesTrader,
            TamtamEyesTraderAbi,
            signer
          );

          const response = await contract.requestBuy(
            tokenId,
            workId,
            seller,
            price,
            { from: address }
          );

          const contractHash = response.hash;
          await response.wait(5);
          return { contractHash };
        } catch (error) {
          if (error.data) {
          } else {
            if (
              error.message ===
              "MetaMask Tx Signature: User denied transaction signature."
            ) {
              failure = "cancelled";
            } else if (
              error.message.includes("transfer amount exceeds balance")
            ) {
              failure = walletBalanceLowI18;
            }
          }

          // await axios.post(
          //   process.env.url + "/artwork/buying/" + workId,
          //   { isBuying: false },
          //   {
          //     headers: {
          //       authorization: `Bearer ${token}`,
          //     },
          //   }
          // );
          await postModel(`/artwork/buying/${workId}`, {isBuying : false}, true, false)

          return { failure };
        }
      } else {
        failure = "metamask.extension.not.found";
        return { failure };
      }
    } else {
      failure = "browser.not.found";
      return { failure };
    }
  }

  async function tradeLicenseWithEyes(licenseId, workId, seller, price) {
    let failure = "failed";
    if (typeof window !== "undefined") {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const approveContract = new ethers.Contract(
          eyesToken,
          EYESTokenAbi,
          signer
        );

        try {
          const responseApprove = await approveContract.approve(
            tamtamEyesTrader,
            price
          );

          await responseApprove.wait();

          const contract = new ethers.Contract(
            tamtamEyesTrader,
            TamtamEyesTraderAbi,
            signer
          );

          const response = await contract.requestLicense(
            licenseId,
            workId,
            seller,
            price,
            { from: address }
          );
          timeOut(plsWaitForMomentI18);

          const txHash = response.hash;

          await response.wait(5);

          return { txHash, seller };
        } catch (error) {
          if (error.data) {
          } else {
            if (
              error.message ===
              "MetaMask Tx Signature: User denied transaction signature."
            ) {
              failure = "cancelled";
            } else if (
              error.message.includes("transfer amount exceeds balance")
            ) {
              failure = walletBalanceLowI18;
            }
          }
          return { failure };
        }
      } else {
        failure = "metamask.extension.not.found";
        return { failure };
      }
    } else {
      failure = "browser.not.found";
      return { failure };
    }
  }

  async function getEyesLicenseFeeRate() {
    let failure = "failed";
    if (typeof window !== "undefined") {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        try {
          const contract = new ethers.Contract(
            tamtamEyesTrader,
            TamtamEyesTraderAbi,
            signer
          );
          const response = await contract.licenseFeeRate();
         // console.log(response)
          return { result : response };
        } catch (error) {
            console.error(error)
            if (
              error.message ===
              "MetaMask Tx Signature: User denied transaction signature."
            ) {
              failure = "cancelled";
            } else if (
              error.message.includes("transfer amount exceeds balance")
            ) {
              failure = walletBalanceLowI18;
            }
          return { failure };
        }
      } else {
        failure = "metamask.extension.not.found";
        return { failure };
      }
    } else {
      failure = "browser.not.found";
      return { failure };
    }
  }

  async function getEyesSaleFeeRate() {
    let failure = "failed";
    if (typeof window !== "undefined") {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        try {
          const contract = new ethers.Contract(
            tamtamEyesTrader,
            TamtamEyesTraderAbi,
            signer
          );
          const response = await contract.saleFeeRate();
         // console.log(response)
          return { result : response };
        } catch (error) {
            console.error(error)
            if (
              error.message ===
              "MetaMask Tx Signature: User denied transaction signature."
            ) {
              failure = "cancelled";
            } else if (
              error.message.includes("transfer amount exceeds balance")
            ) {
              failure = walletBalanceLowI18;
            }
          return { failure };
        }
      } else {
        failure = "metamask.extension.not.found";
        return { failure };
      }
    } else {
      failure = "browser.not.found";
      return { failure };
    }
  }

  async function getEyesResaleFeeRate() {
    let failure = "failed";
    if (typeof window !== "undefined") {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        try {
          const contract = new ethers.Contract(
            tamtamEyesTrader,
            TamtamEyesTraderAbi,
            signer
          );
          const response = await contract.resaleFeeRate();
         // console.log(response)
          return { result : response };
        } catch (error) {
            console.error(error)
            if (
              error.message ===
              "MetaMask Tx Signature: User denied transaction signature."
            ) {
              failure = "cancelled";
            } else if (
              error.message.includes("transfer amount exceeds balance")
            ) {
              failure = walletBalanceLowI18;
            }
          return { failure };
        }
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
    tradeWithEyes,
    tradeLicenseWithEyes,
    getEyesLicenseFeeRate,
    getEyesSaleFeeRate,
    getEyesResaleFeeRate
  }
}

export default useTradeEyes