import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import { useRouter } from "next/router";
import { ARTWORK_STATUS, apis } from "utils/libs";
import { useNotificationContext } from "./useNotificationContext";
import { getLocal } from "utils/storage";
import { useGlobalContext } from "common/global/useGlobalContext";
import useMyPageTranslation from "locale/useMypageTranslation";
import useCommonTranslation from "locale/useCommonTranslation";

let SellRight = ["ADMIN_PENDING", "GASFEE_PENDING", "ADMIN_DENIED"];
let Preview = ["MINTED", "NFT_SALE", "NFT_NOT_SALE", "NFT_PRICE", "NFT_PRICE"];
let Auction = [
  "AUCTION_REGISTER",
  "AUCTION_EXPIRED",
  "BID_ADDED",
  "BID_REGISTER",
  "BID_WITHDRAW"
];
let OwnLog = ["NFT_SELLER", "AUCTION_COMPLETED", "BID_SUCCESS"];
let Mypage = ["NFT_BUYER"];
let TransLog = ["LICENSE_PENDING", "LICENSE_PAYMENT_PENDING", "LICENSE_PAID"];

function useNotification() {
  const { confirmValI18: gotoMyPageI18 } = useMyPageTranslation()
  const {
      gotoArtworkI18, 
      viewSalesHistoryI18, 
      viewPurchasedWorksI18, 
      checkApplicationHistoryI18,
      proceedToLicenseAgreementI18, 
      checkRejectReasonI18, 
      checkBidHistoryI18,
      checkContractI18 
  } = useCommonTranslation()
  const { push , locale } = useRouter();
  const { getModel, putModel } = useCrud();
  const { calcMessage } = useMessageFactory();
  const { changeSubtab, authUser } = useGlobalContext();
  const {
    notifications,
    setNotification,
    scrollNotifications, 
    setScrollNotifications,
    notificationLoading, 
    setNotificationLoading,
    extend,
    setExtend,
    extendedIndex,
    setExtendedIndex,
    readIndexes,
    setReadIndexes,
    checkAllBoxes,
    setCheckAllBoxes,
    numToCheck,
    setNumToCheck,
    pageNum,
    setPageNum,
    changeList,
    setChangeList,
    load,
    setLoad
  } = useNotificationContext();

  async function getNotifications(params, isScrollNotifications) {
    setNotificationLoading(true);
    try {
      const res = await getModel(`${apis.notifcation}?page=${params?.page}&size=${params?.size}`,true);

      if(isScrollNotifications) { 
        setScrollNotifications( prev => [...prev, ...res?.content ]) 
      } else {
        setNotification(res);
      }
        return res.content;
    } catch (e) {
        const msg = calcMessage(e?.response?.status);
        return msg;
    } finally {
      setNotificationLoading(false);
    }
  }

  const extendRow = async (index, id) => {
    const readIndex = readIndexes.find((el) => el === id);
    if (extend && extendedIndex === index) {
      setExtend(false);
      setExtendedIndex(null);
    } else {
      setExtend(true);
      setExtendedIndex(index);
    }
    if (!readIndex) {
      setReadIndexes((prevList) => [...prevList, id]);
      await putModel(
        process.env.url + "/notification/logs",
        {
          ids: [id]
        },
        true,
        false
      );
    }
  };
  const paginate = (num) => {
    setPageNum(num);
    setExtend(false);
  };

  const checkAll = (e) => {
    if (e.target.checked) {
      setChangeList((pre) =>
        notifications?.content
          ?.filter((el) => el.messageActive)
          .map((el) => el.id)
      );
    } else {
      setChangeList([]);
    }
  };

  const readHandler = (e, id) => {
    if (e.target.checked) {
      const exists = changeList.find((el) => el === id);
      if (!exists) {
        setChangeList((prevList) => [...prevList, id]);
      }
    } else {
      setChangeList((prevList) => prevList.filter((el) => el !== id));
    }
  };

  const handleClickNotificationDetail = (notification) => {
    const loggedUserId = getLocal("user")?.result?.id;
    const msg = notification.tempType;
    let allowPush = msg;
    let path = "";
    const artworkId = notification?.message
      ?.split("preview/")[1]
      ?.split('"')[0];
    const tempId = notification?.tempId;
    SellRight.includes(msg) ? (path = "/mypage/sell-right") : null;
    Preview.includes(msg) ? (path = `/art/preview/${artworkId}`) : null;
    Auction.includes(msg) ? (path = `/art/preview/${tempId}`) : null;
    OwnLog.includes(msg) ? (path = `/mypage/own-log`) : null;
    Mypage.includes(msg) ? (path = '/mypage') : null;
    TransLog.includes(msg) ? (path = `/mypage/transaction-log`) : null;

    let query = {};
    let queryStr = "";
    if (msg === "LICENSE_PAID") {
      queryStr = "completed-contract";
      query.state = queryStr;
    }

    if (allowPush && path !== "") {
      push({ pathname: path, query });
    } else {
      return;
    }
  };

  async function getTopNotification() {
    try {
      const res = await getModel(apis.topNotification + `?lang=${ locale === 'en' ? 'en' : 'kr' }`)
      return res
    } catch(e) {
        console.error(e)
    } finally {

    }
  }

   function calcNotificationStatus(status, artworkId) {
      switch(status) {
        case ARTWORK_STATUS.ADMIN_PENDING : {
          return { text: gotoMyPageI18, href: '/mypage'}
        };
        case ARTWORK_STATUS.GASFEE_PENDING: {
          return{ text: gotoMyPageI18, href: '/mypage'}
        };
        case ARTWORK_STATUS.MINTED: {
          return { text:gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.NFT_SALE: {
          return { text:gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.ARTWORK_SELL_REQUEST: {
          return { text:gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.NFT_NOT_SALE: {
          return { text:gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.NFT_PRICE: {
          return { text:gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.NFT_SELLER: {
          return { text: viewSalesHistoryI18, href: `/mypage?subpage=activityHistory`}
        };
        case ARTWORK_STATUS.NFT_BUYER: {
          return { text: viewPurchasedWorksI18, href: `/mypage?subpage=purchasedNft`}
        };
        case ARTWORK_STATUS.LICENSE_PENDING: {
          return { text: checkApplicationHistoryI18, href: `/mypage?subpage=licenseAgreement`}
        };
        case ARTWORK_STATUS.LICENSE_PAYMENT_PENDING: {
          return { text: proceedToLicenseAgreementI18,  href: `/mypage?subpage=licenseAgreement`}
        };
        case ARTWORK_STATUS.LICENSE_DENIED: {
          return{ text: checkRejectReasonI18, href: `/mypage?subpage=licenseAgreement`}
        };
        case ARTWORK_STATUS.LICENSE_PAID: {
          return { text: checkContractI18, href: `/mypage?subpage=licenseAgreement&extrasubpage=completed-contract`}
        };
        case ARTWORK_STATUS.ADMIN_DENIED: {
          return { text: gotoMyPageI18, href: '/mypage'}
        };
        case ARTWORK_STATUS.AUCTION_REGISTER: {
          return { text: gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.AUCTION_EXPIRED: {
          return { text: gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.AUCTION_COMPLETED: {
          return { text: viewSalesHistoryI18, href: '/mypage?subpage=activity-history' }
        };
        case ARTWORK_STATUS.BID_ADDED: {
          return { text: checkBidHistoryI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.BID_REGISTER: {
          return { text: checkBidHistoryI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.BID_WITHDRAW: {
          return { text: gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        case ARTWORK_STATUS.BID_SUCCESS: {
          return { text: viewPurchasedWorksI18, href: '/mypage?subpage=purchasedNft' }
        };
        case ARTWORK_STATUS.BID_SUCCESS: {
          return { text: viewPurchasedWorksI18, href: '/mypage?subpage=purchasedNft' }
        };
        case ARTWORK_STATUS.ARTWORK_LIKE: {
          return { text: gotoArtworkI18, href: '/art/preview/' + artworkId }
        };
        default: {
          return { text:  'status таарахгүй бна', href: '/'}
        }
      }
  }

  return {
    calcNotificationStatus,
    getTopNotification,
    getNotifications,
    notifications,
    notificationLoading,
    extendRow,
    extend,
    readIndexes,
    setReadIndexes,
    extendedIndex,
    setExtend,
    checkAllBoxes,
    setCheckAllBoxes,
    numToCheck,
    setNumToCheck,
    pageNum,
    setPageNum,
    changeList,
    setChangeList,
    load,
    setLoad,
    checkAll,
    paginate,
    readHandler,
    handleClickNotificationDetail,
    scrollNotifications
  };
}

export default useNotification;
