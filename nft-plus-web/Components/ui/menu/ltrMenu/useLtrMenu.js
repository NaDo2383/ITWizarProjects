import React, { useRef } from "react";
import useElementPosition from "common/window/useElementPosition";
import { useGlobalContext } from "common/global/useGlobalContext";
import useScrollPosition, { scrollLeft } from "common/scroll/useScrollPosition";

function useLtrMenu(globalName) {
  const menuRef = useRef(null);
  const { globalItems } = useGlobalContext();
  useElementPosition(menuRef, { globalName });
  const scroll = useScrollPosition(menuRef);
  
  function handleLeft() {
    // const menuLeft = globalItems.ltrMenu.clientRect.left;
    if (menuRef.current) {
      // const menuWidth = menuRef?.current?.offsetWidth
      const menuScrollLeft = menuRef.current?.scrollLeft;
      if (menuScrollLeft === 0) {
        return;
      }
      const toRight = menuScrollLeft - 100;
      scrollLeft(menuRef, toRight);
    }
  }
  function handleRight() {
    // const menuLeft = globalItems.ltrMenu.clientRect.left;
    if (menuRef.current) {
      // const menuWidth = menuRef?.current?.offsetWidth
      const menuScrollLeft = menuRef.current?.scrollLeft;
      const totalScrollWidth = scroll.scrollWidth;
      if (menuScrollLeft === totalScrollWidth) {
        return;
      }
      const toRight = menuScrollLeft + 100;
      scrollLeft(menuRef, toRight);
    }
  }

  function handleLink(e) {
    const menuLeft = globalItems[globalName].clientRect.left;
    const linkLeft = e.currentTarget.getBoundingClientRect().left;
    const thisLinkWidth = e.currentTarget.getBoundingClientRect().width;
    const thisLinkLeft = linkLeft - menuLeft;

    if (menuRef.current) {
      const menuWidth = menuRef?.current?.offsetWidth;
      const menuScrollLeft = menuRef.current?.scrollLeft;

      if (menuWidth < thisLinkLeft) {
        const intoRight = menuScrollLeft + thisLinkWidth;
        scrollLeft(menuRef, intoRight);
      }
      if (menuWidth > thisLinkLeft + thisLinkWidth) {
        const intoLeft = menuScrollLeft - thisLinkWidth;
        scrollLeft(menuRef, intoLeft);
      }
    
    }
  }
  return  {
    menuRef,
    handleLink,
    handleRight,
    handleLeft,

  }
}

export default useLtrMenu