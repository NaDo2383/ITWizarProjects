import React from "react";
import tw from "tailwind-styled-components";

function LtrLink({ text, onClick }) {
  return <LtrBtn onClick={onClick}>{text}</LtrBtn>;
}
const LtrBtn = tw.button`
    min-w-[100px]
`;
export default LtrLink;
