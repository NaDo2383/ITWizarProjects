import { useCallback, useEffect, useState } from "react";

function useMatchScrollY() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [YScrollPos, setYscrollPos] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetBottom, setOffsetBottom] = useState(0);

  const callBackRef = useCallback((domNode) => {
    if (domNode) {
      setOffsetTop(domNode.offsetTop);
      setOffsetBottom(domNode.offsetBottom);
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      const headerElHeight = document.getElementById("header").offsetHeight;
      const competitionBannerElHeight =
        document.getElementById("competitionBanner").offsetHeight;
      const yScroll = window.scrollY;
      yScroll > offsetTop - (headerElHeight + competitionBannerElHeight) &&
        setShowAnimation(true);
      yScroll < offsetTop - (headerElHeight + competitionBannerElHeight) &&
        setShowAnimation(false);
      setYscrollPos(yScroll);
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [YScrollPos]);
  return { callBackRef, showAnimation };
}

export default useMatchScrollY;
