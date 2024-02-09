import useArtworkTranslation from 'locale/useArtworkTranslation'
import React, { useEffect, useState } from 'react'
import EventTabLink from './EventTabLink'
import { useGlobalContext } from 'common/global/useGlobalContext'

function EventTabHeader(props) {
  const [fixed, setFixed] = useState(false);
  const { globalItems } = useGlobalContext();
  const { distance, setDistance } = useGlobalContext();
  const { isShowFilter, setIsShowFilter } = useGlobalContext();
  const {
    projectNFTI18,
    projectDescriptionI18,
    applyTabI18,
  } = useArtworkTranslation()

  const tabHeaderDetail = [
    { title: projectNFTI18, index: 0 },
    { title: projectDescriptionI18, index: 1 },
    { title: applyTabI18, index: 2 }
  ]

  const hangle = () => {
    typeof window !== "undefined" && setDistance(window.pageYOffset);
  };

  function checkScrollHeight() {
    if (window.pageYOffset > globalItems?.header?.clientData?.clientHeight) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }

  useEffect(() => {
    function handleScroll() {
      checkScrollHeight();
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  useEffect(() => {
    window?.addEventListener("scroll", hangle.bind(this));
    return () => {
      window?.removeEventListener("scroll", hangle.bind(this));
    };
  }, [distance]);


  return (
    <div className={`flex w-full justify-between ${distance > 600 &&
      `fixed top-[65px] shadow-xl pb-6 sm:top-[145px] lg:top-[92px] pt-6 container mx-0 bg-[#161717]`}`}
      style={{
        width: distance > 600 && isShowFilter ? "calc(100% - 250px)" : "100%",
        transform: distance > 600 ? "translateY(0)" : "",
        transition: "all 300ms",
        zIndex: 10
      }}>
      {
        tabHeaderDetail.map((detail, idx) =>
          <EventTabLink key={'event-' + idx} {...detail} />)
      }
    </div>
  )
}

export default EventTabHeader