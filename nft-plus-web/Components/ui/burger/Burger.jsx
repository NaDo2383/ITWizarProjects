import { useGlobalContext } from "common/global/useGlobalContext";
import React, { useCallback } from "react";

function Burger() {
  const { isOpenMobileMenu, setOpenMobileMenu } = useGlobalContext()
  const handleBurger = useCallback(() => {
    setOpenMobileMenu((prev) => !prev);
  }, []);
  
  return (
    <div
      onClick={handleBurger}
      className="md:p-4 text-2xl flex-1 flex justify-end lg:hidden cursor-pointer">
      <div className="flex flex-col gap-y-[.35rem] w-[14px] h-[20px] items-center justify-center md:hidden">
        <div
          id="burger"
          className={`w-full ${
            isOpenMobileMenu ? "active" : ""
          } h-[2px] relative bg-[#E0E6E8]`}></div>
      </div>
    </div>
  );
}

export default Burger;
