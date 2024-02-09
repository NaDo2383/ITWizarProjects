import useCrud from "common/axios/crud";
import React, { useState } from "react";
import { useGlobalContext } from "common/global/useGlobalContext";
import { apis } from "utils/libs";
import { useNotificationSettingsContext } from "./useNotificationSettingsContext";
import useMessageFactory from 'common/message/useMessageFactory'

function useNotificationSettings() {
    const [ count, setCount ] = useState([])
    const { setGlobalLoading } = useGlobalContext()
    const { getModel, putModel } = useCrud()
    const { calcMessage } = useMessageFactory()

    async function getNotificationSettings(data) {
        setGlobalLoading(true)
      try {
        const res = await getModel(apis.notificationSettings, true)
        setCount(res?.result)
        return res?.result
      } catch (e) {
        if (e?.response.status) {
          return calcMessage(e?.response.status)
        }
        throw new Error(e)
      } finally {
        setGlobalLoading(false)
      }
    }
    async function notificationSettings(data) {
      try {
        const res = await putModel(`${apis.notificationSettings}/${data.id}`,{active: data.active}, true)
        getNotificationSettings()
        return res?.result
      } catch (e) {
        if (e?.response.status) {
          return calcMessage(e?.response.status)
        }
        throw new Error(e)
      } finally {
      }
    }

    async function notificationSettingsLog(data) {
        setGlobalLoading(true)
      try {
        const res = await getModel(apis.notificationSettingsLog, data, true)
        return res?.result
      } catch (e) {
        if (e?.response.status) {
          return calcMessage(e?.response.status)
        }
        throw new Error(e)
      } finally {
        setGlobalLoading(false)
      }
    }

    async function notificationSettingsCount(data) {
        setGlobalLoading(true)
      try {
        const res = await getModel(apis.notificationSettingsCount, true)
        return res?.result
      } catch (e) {
        if (e?.response.status) {
          return calcMessage(e?.response.status)
        }
        throw new Error(e)
      } finally {
        setGlobalLoading(false)
      }
    }

    return {
        notificationSettingsLog,
        notificationSettingsCount,
        notificationSettings,
        getNotificationSettings,
        count
      }
}

export default useNotificationSettings;