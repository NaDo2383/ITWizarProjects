import React from "react";
import tw from "tailwind-styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import LtrLink from "./LtrLink";
import useLtrMenu from "./useLtrMenu";

const ltrItems = [
  {
    text: "menu 1",
  },
  {
    text: "menu 2",
  },
  {
    text: "menu 3",
  },
  {
    text: "menu 4",
  },
  {
    text: "menu 5",
  },
  {
    text: "menu 6",
  },
  {
    text: "menu 7",
  },
  {
    text: "menu 8",
  },
  {
    text: "menu 9",
  },
  {
    text: "menu 10",
  },
  {
    text: "menu 11",
  },
  {
    text: "menu 12",
  },
];

function LtrMenu() {
  const { handleLeft, handleRight, handleLink, menuRef } =
    useLtrMenu("artistLtr");

  return (
    <div className="flex">
      <button onClick={handleLeft}>
        <BsChevronLeft />
      </button>
      <LtrContainer ref={menuRef} id="ltr-menu">
        {ltrItems.map((item, idx) => (
          <LtrLink key={idx} {...item} onClick={handleLink} />
        ))}
      </LtrContainer>
      <button onClick={handleRight}>
        <BsChevronRight />
      </button>
    </div>
  );
}

const LtrContainer = tw.div`
    flex
    gap-[10px]
    w-[500px]
    text-white
    p-10
    overflow-auto
    scrollbar-hide
`;

export default LtrMenu;
