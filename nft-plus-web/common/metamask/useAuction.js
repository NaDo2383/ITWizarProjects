import { ethers } from "ethers";
import {
  abi,
  contractAddress,
  tamtamNftAddress,
  adminAbi,
  tamtamEyesTrader,
  eyesToken,
  EYESTokenAbi,
  TamtamEyesTraderAbi
} from "./blockchain/constant.mjs";
import axios from "axios";
import useAlertTranslation from "locale/useAlertTranslation.js";
import useCrud from "common/axios/crud.js";
import { apis } from "utils/libs.js";
import { getToken } from 'utils/storage'

function useAuction() {
  const { walletBalanceLowI18 } = useAlertTranslation();
  const { putModel } = useCrud();
  const token = getToken();

  async function updateAuctionArtwork(auctionId, contractHash) {
    try {
      const res = await putModel(
        apis.auction + `/${auctionId}/tx`,
        {
          transactionHash: contractHash
        },
        true
      );
      return res;
    } catch (e) {
      console.error(e);
    }
  }
  const gasLimit = 3000000;

  async function getAuctionHandler(tokenId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let contractHash, failure, response;
    try {
      response = await contract.getAuction(tokenId);
    } catch (error) {
      console.error("error : ", error);
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
    return { contractHash, failure, response };
  }

  async function getEyesAuctionHandler(id) {
    const tokenId = ethers.utils.hexlify(id);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let contractHash, failure;

    try {
      const response = await contract.getAuction(tokenId);
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
    return { contractHash, failure };
  }

  async function auctionButtonHandler(auction) {
    const { tokenId, auctionStart, auctionEnd, startPrice } = auction;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tamtamContract = new ethers.Contract(
      tamtamNftAddress,
      adminAbi,
      signer
    );

    let contractHash, failure;
    // check owner
    const [buyer, seller] = await Promise.all([
      signer.getAddress(),
      tamtamContract.ownerOf(tokenId)
    ]);

    if (buyer !== seller) {
      failure = "please use another wallet.";
      return { failure };
    }

    try {
      const approveRes = await tamtamContract.approve(contractAddress, tokenId);
      await approveRes.wait();

      const response = await contract.registAuction(
        +tokenId,
        auctionStart,
        auctionEnd,
        startPrice,
        { from: buyer, gasLimit }
      );

      contractHash = response.hash;
      await response.wait();
    } catch (error) {
      console.error("error : ", error);
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

    return { contractHash, failure };
  }

  async function updateAuctionHandler(auction) {
    const { tokenId, auctionStart, auctionEnd, startPrice, auctionId } =
      auction;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    let contractHash, failure;

    const tamtamContract = new ethers.Contract(
      tamtamNftAddress,
      adminAbi,
      signer
    );
    // check owner
    const [buyer, seller] = await Promise.all([
      signer.getAddress(),
      tamtamContract.ownerOf(tokenId)
    ]);
    if (buyer !== seller) {
      failure = "please use another wallet.";
      return { failure };
    }

    try {
      // const res = await contract.getAuction(
      //   tokenId
      // );

      const approveRes = await tamtamContract.approve(contractAddress, tokenId);
      await approveRes.wait();

      const response = await contract.changeAuction(
        +tokenId,
        startPrice,
        auctionStart,
        auctionEnd,
        { from: buyer, gasLimit }
      );
      contractHash = response.hash;

      await response.wait();
      await updateAuctionArtwork(auctionId, contractHash);
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
    return { contractHash, failure };
  }

  async function cancelAuctionHandler(tokenId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let contractHash, failure;
    const tamtamContract = new ethers.Contract(
      tamtamNftAddress,
      adminAbi,
      signer
    );
    // check owner
    const [buyer, seller] = await Promise.all([
      signer.getAddress(),
      tamtamContract.ownerOf(tokenId)
    ]);
    if (buyer !== seller) {
      failure = "please use another wallet.";
      return { failure };
    }

    try {

      const approveRes = await tamtamContract.approve(contractAddress, +tokenId);
      await approveRes.wait();

      const response = await contract.cancelAuction(+tokenId, {
        from: buyer,
        gasLimit
      });

      contractHash = response.hash;
      await response.wait();
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

    return { contractHash, failure };
  }

  async function cancelEyesAuctionHandler(tokenId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      tamtamEyesTrader,
      TamtamEyesTraderAbi,
      signer
    );

    let contractHash, failure;
    const buyer = await signer.getAddress();
    const auctionRes = await contract.getAuction(tokenId);
    const seller = auctionRes[0];

    // check owner
    if (buyer !== seller) {
      failure = "please use another wallet.";
      return { failure };
    }

    try {
      const response = await contract.cancelAuction(+tokenId, buyer, {
        from: buyer,
        gasLimit
      });

      contractHash = response.hash;
      await response.wait();
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

    return { contractHash, failure };
  }

  async function bidButtonHandler(bid) {
    const { bidId, tokenId, bidPrice } = bid;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    let contractHash, failure;

    const tamtamContract = new ethers.Contract(
      tamtamNftAddress,
      adminAbi,
      signer
    );

    // check owner
    const [buyer, seller] = await Promise.all([
      signer.getAddress(),
      tamtamContract.ownerOf(tokenId)
    ]);

    if (buyer === seller) {
      failure = "please use another wallet.";
      return { failure };
    }

    try {
      const response = await contract.bid(+tokenId, {
        from: buyer,
        value: bidPrice,
        gasLimit
      });

      contractHash = response.hash;
      await response.wait();
      await updateBid(bidId, contractHash);
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
    return { contractHash, failure };
  }

  async function bidEyesButtonHandler(bid) {
    const { auctionId, bidId, tokenId, bidPrice } = bid;
    const bidDate = Math.floor(new Date().getTime());
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      tamtamEyesTrader,
      TamtamEyesTraderAbi,
      signer
    );

    let contractHash, failure;
    const buyer = await signer.getAddress();
    const auctionRes = await contract.getAuction(tokenId);
    const seller = auctionRes[0];

    // check owner
    if (buyer === seller) {
      failure = "please use another wallet.";
      return { failure };
    }

    const approveContract = new ethers.Contract(
      eyesToken,
      EYESTokenAbi,
      signer
    );

    try {
      const responseApprove = await approveContract.approve(
        tamtamEyesTrader,
        bidPrice
      );
      await responseApprove.wait();

      const response = await contract.bid(+tokenId, bidPrice, {
        from: buyer,
        gasLimit
      });

      contractHash = response.hash;
      await response.wait();
      await updateBid(bidId, contractHash);
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

    return { contractHash, failure };
  }

  async function updateBid(bidId, transactionHash) {
    try {
      await axios.put(
        process.env.url + `/bid/${bidId}`,
        { transactionHash: transactionHash },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
    }
  }

  return {
    auctionButtonHandler,
    getAuctionHandler,
    getEyesAuctionHandler,
    updateAuctionHandler,
    cancelAuctionHandler,
    cancelEyesAuctionHandler,
    bidButtonHandler,
    bidEyesButtonHandler,
    updateAuctionArtwork
  };
}

export default useAuction;
