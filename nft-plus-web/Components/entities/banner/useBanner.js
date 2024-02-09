/**
 * @createdBy Phill Anderson 2022/04/24
 */
import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import { useState } from "react";
import { apis } from "utils/libs";

function useBanner() {
  const { getModel } = useCrud();
  const { calcMessage } = useMessageFactory();
  const [bannerState, setBannerState] = useState({
    topBanner: {
      isLoading: false,
      isError: false,
      bannerItem: null
    },
    bottomBanner: {
      isLoading: false,
      isError: false,
      bannerItem: null
    }
  });

  async function getBottomBanner(query) {
    setBannerState((prev) => ({
      ...prev,
      bottomBanner: { ...prev.bottomBanner, isLoading: true }
    }));
    try {
      const res = await getModel(apis.bottomBanner + query);
      setBannerState((prev) => ({
        ...prev,
        bottomBanner: {
          ...prev.bottomBanner,
          isLoading: false,
          bannerItem: res,
          isError: false
        }
      }));
      return res;
    } catch (e) {
      setBannerState((prev) => ({
        ...prev,
        bottomBanner: { ...prev.bottomBanner, isError: true }
      }));
      if (e?.response?.status) {
        return calcMessage(e?.response?.status);
      }
      console.error(e);
    } finally {
      setBannerState((prev) => ({
        ...prev,
        bottomBanner: { ...prev.bottomBanner, isLoading: false }
      }));
    }
  }

  async function getTopBanner(query) {
    setBannerState((prev) => ({
      ...prev,
      topBanner: { ...prev.topBanner, isLoading: true }
    }));
    try {
      const res = await getModel(apis.topBanner + query);
      setBannerState((prev) => ({
        ...prev,
        topBanner: {
          ...prev.bottomBanner,
          isLoading: false,
          bannerItem: res,
          isError: false
        }
      }));
      return res;
    } catch (e) {
      setBannerState((prev) => ({
        ...prev,
        topBanner: { ...prev.topBanner, isError: true }
      }));
      if (e?.response?.status) {
        return calcMessage(e?.response?.status);
      }
      console.error(e);
    } finally {
      setBannerState((prev) => ({
        ...prev,
        topBanner: { ...prev.topBanner, isLoading: false }
      }));
    }
  }
  return {
    getBottomBanner,
    getTopBanner,
    bannerState
  };
}

export default useBanner;
