import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import { useContext } from "react";
import { apis } from "utils/libs";
import { GlobalContext, useGlobalContext } from "./useGlobalContext";

export default function useGlobal() {
  const { unreadNotiCount, setUnreadNotiCount } = useGlobalContext();
  const { getModel } = useCrud();
  const { calcMessage } = useMessageFactory();

  const getNotificationCount = async () => {
    try {
      const res = await getModel(apis.notifcationCount, true);
      setUnreadNotiCount(res?.result);
      return res.result;
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      // setNotificationLoading((prev) => ( { ...prev, notificationsLoading:false } ))
    }
  };

  return { getNotificationCount, unreadNotiCount };
}
