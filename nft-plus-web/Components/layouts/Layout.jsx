import dynamic from "next/dynamic";
import { useGlobalContext } from "common/global/useGlobalContext";
import React, { useEffect, useState } from "react";
import useAuthUser, { useCheckUser } from "../entities/user/auth/useAuthUser";
import TopButton from "../ui/button/topButton";
import Loader from "../ui/loader";
import useCurrency from "common/metamask/useCurrency";
import useCompetition from "Components/entities/competition/useCompetition";
import usePopup from "Components/ui/popup/usePopup";
import useAuthMetamask from "common/metamask/useAuthMetamask";
import { useRouter } from "next/router";
import AdFooter from "./airDrop/adFooter/AdFooter";
import Main from "./main/Main";
import { getLocal } from "utils/storage";
import ArtistSearchBar from "Components/entities/artist/artistList/mobile/ArtistSearchBar";
import useWindow from "common/window/useWindow";
const MobileMenu = dynamic(() => import("./mobileMenu/MobileMenu"), {
  ssr: false,
});
const AdHeader = dynamic(() => import("./airDrop/adHeader/AdHeader"), {
  ssr: false,
});

const Layout = ({ children }) => {
  useWindow()
  const { handleShowModal, MODAL_TYPES, hideAllModals } = usePopup();
  const { onAuthMetamask } = useAuthMetamask();
  const { globalLoading, setGlobalItems,  authUser, setAuthUser, setPrevUrl, browserWindow } = useGlobalContext();
  const router = useRouter();
  const { isLoggedIn } = useCheckUser();
  const { refreshToken } = useAuthUser();
  const { getMaticAsWon, getEyesAsWon } = useCurrency();
  const { getCompetitionSettings } = useCompetition();
  const isUserLogged = isLoggedIn();
  const { countUserViews, loginUser } = useAuthUser()

  useEffect(() => {
    refreshToken();
  }, [router]);

  useEffect(() => {
    setGlobalItems((prev) => ({
      ...prev,
      isTokenEnded: isUserLogged,
    }));
    getCompetitionSettings();
    getMaticAsWon();
    getEyesAsWon();
    loginUser();
  }, []);

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      hideAllModals();
      if (isUserLogged && accounts && accounts.length > 0) {
        localStorage.removeItem("currentMetamask");
        await onAuthMetamask(accounts)
      }
    };

    const initialize = async () => {
      await handleAccountsChanged();
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    };
    if (window.ethereum) {
      initialize();
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [isUserLogged]);

  useEffect(() => {
    if (getLocal("user")?.result && authUser) {
      if (
        !getLocal("user")?.result?.verified &&
        localStorage.getItem(`verifiTime${authUser?.id}`) <
          new Date().getTime().toString()
      ) {
        handleShowModal(MODAL_TYPES.CHECK_EMAIL_MODAL);
      }
    }
  }, [router]);

  useEffect(() => {
    const signUp = () => {
      handleShowModal(MODAL_TYPES.SERVICE_CONDITION_POPUP);
    };
    if (typeof window !== undefined) {
      window.addEventListener("serviceModal", signUp);
    }

    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener("serviceModal", signUp);
      }
    };
  }, []);

  useEffect(() => {
    if (localStorage !== undefined && authUser) {
      if (getLocal("user")) {
        setAuthUser({});
      }
    }
  }, []);

  useEffect(() => {
    countUserViews()
  },[authUser])

  if( typeof window !== "undefined"){
    window.addEventListener('popstate', () => {
      const path = router.asPath;
      setPrevUrl(path);
    });
  }

  return (
    <div id="app" className="relative bg-[#181A1A]">
      <AdHeader />
      <Main>{children}</Main>
      <MobileMenu />
      <AdFooter />
      <TopButton />
      {globalLoading && <Loader />}
      {browserWindow.innerWidth < 600 &&
				<div className='sm:hidden'>
      <ArtistSearchBar />
      </div>}
    </div>
  );
};

export default Layout;
