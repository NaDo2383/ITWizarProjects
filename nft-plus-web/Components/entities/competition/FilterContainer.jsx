import React, { useEffect, useState } from "react";
import { useGlobalContext } from "common/global/useGlobalContext";

function FilterContainer({children}) {
  const [fixed, setFixed] = useState(false);
  const { globalItems } = useGlobalContext();
  const { isShowFilter, setIsShowFilter } = useGlobalContext();
  const { distance, setDistance } = useGlobalContext();

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
    <div
      className={`w-full  ${distance >= 400 &&
        `fixed top-[65px] shadow-xl xl:px-52 lg:px-10 pb-6 lg:top-[115px] pt-6`
        } ${distance >= 400 && "bg-[#181A1A]"} right-0 flex items-center justify-center gap-4 min-w-[328px]`}
      style={{
        width: distance >= 400 && isShowFilter ? "calc(100% - 250px)" : "100%",
        transform: distance >= 400 ? "translateY(0)" : "",
        transition: "all 300ms",
        zIndex: 10
      }}>
        {children}
    </div>
  )
}

function useFilterContainer() {
    const [fixed, setFixed] = useState(false);
  const { globalItems } = useGlobalContext();
  const { isShowFilter, setIsShowFilter } = useGlobalContext();
  const { distance, setDistance } = useGlobalContext();

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

  return {
    distance, isShowFilter
  }
}

export default FilterContainer