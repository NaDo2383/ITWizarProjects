import useTab from 'Components/ui/tab/useTab'
import React, { useEffect, useCallback } from 'react'
import { useRef } from 'react'
import { useRouter } from 'next/router';

function EventTabLink(props) {
  const { query } = useRouter();
  const { index, title } = props
  const { activeTabId, setActiveTabId, setSubTabIndex, setScroll } = useTab()
  const isActive = index == activeTabId
  const tabMenuRef = useRef();
  const chevron = useRef();
  const showChevron = () => {
    if (typeof window !== "undefined" && window.pageYOffset >= 250) {
      chevron.current?.classList.remove("opacity-0");
      chevron.current?.classList.remove("invisible");
      chevron.current?.classList.add("opacity-100");
      chevron.current?.classList.add("visible");
    } else {
      chevron.current?.classList.add("opacity-0");
      chevron.current?.classList.add("invisible");
      chevron.current?.classList.remove("opacity-100");
      chevron.current?.classList.remove("visible");
    }
  };
  const handleClick = useCallback(() => {
    setActiveTabId(index)
    setSubTabIndex(0)
  }, [query?.tabIndex])

  useEffect(() => {
    window?.addEventListener("scroll", showChevron.bind(this));

    return () => {
      window?.removeEventListener("scroll", showChevron.bind(this));
    };
  }, []);

  // useEffect(() => {
  //   setActiveTabId(+query?.tabIndex)
  // }, [query?.tabIndex])


  useEffect(() => {
    if (+query?.index > 0) {
      setScroll(true)
      setSubTabIndex(+query?.index)
    }
  }, [query?.index])

  const handleChangeTab = () => {
    // setSubTabIndex(0)
    window.scroll({ top: 640, left: 0, behavior: "smooth" });
    setActiveTabId(index)
    setScroll(true)
  };

  return (
    <div ref={tabMenuRef}
      onClick={handleChangeTab}
      className={`flex sm:border-b-2 border-b-[1.5px] border-[#5C5C5C] sm:font-[500] cursor-pointer lg:p-6 p-2 lg:mt-0 sm:mt-4 justify-center w-full sm:text-[20px] text-[13px] hover:border-b-[#FB3873] hover:text-white ${isActive ? "border-b-[#FB3873] sm:text-[#FFFFFF] text-[#DDD]" : "sm:text-[#737373] text-[#999999]"}`}
    >
      <span className='whitespace-nowrap'>{title}</span>
    </div>
  )
}

export default EventTabLink