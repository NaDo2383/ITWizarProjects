import React, { useState, useRef, useCallback, useEffect } from "react";
import useArtwork from "./useArtwork";
import useFAQpageTranslation from "locale/useFAQpageTranslation";

function ArtworkCategories() {
  const [show, setShow] = useState(false);
  const ulRef = useRef(null);
  const liRef = useRef(null);
  const allRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const {
    getArtworkCategories,
    artworkCategories,
    getArtworksByCatName
  } = useArtwork();
  const { allI18 } = useFAQpageTranslation();

  const handleClickMenu = useCallback(
    (e, idx, all = true, category = "all") => {
      getArtworksByCatName(category);
      let id = all ? -1 : idx;
      setActiveIndex(id);
    },
    []
  );

  useEffect(() => {
    getArtworkCategories();
    getArtworksByCatName("all");
  }, []);

  return (
    <div className="w-full relative z-30 flex justify-center items-center">
      <div className="hidden sm:flex overflow-hidden">
        <ul
          ref={ulRef}
          className="lg:text-lg font-[500] flex gap-8 w-full ml-4 md:ml-0 overflow-hidden text-[#5C5C5C]">
          <li
            ref={allRef}
            className={`cursor-pointer ${activeIndex === -1
                ? "font-bold text-[#ABABAB] border-b-2 border-[#ABABAB] h-[30px]"
                : ""
              }`}
            onClick={(e) => handleClickMenu(e, 1, true)}>
            {allI18}
          </li>
          {artworkCategories?.length > 0 &&
            artworkCategories.map(({ value }, idx) => (
              <li
                ref={liRef}
                key={value + "-" + idx}
                className={`${idx === activeIndex
                    ? "font-bold text-black border-b-2 border-black h-[30px]"
                    : ""
                  } pb-2 cursor-pointer`}
                onClick={(e) => handleClickMenu(e, idx, false, value)}>
                {value}
              </li>
            ))}
        </ul>
      </div>
      <button className="md:hidden flex flex-col focus:outline-none bg-white relative w-full p-[9px] rounded-md border border-[#333] text-[#333]">
        <p onClick={() => setShow(!show)} className="w-full h-full">
          All
        </p>
        <div
          className={`absolute z-100 mt-px bg-white overflow-hidden top-full left-0 w-full rounded-md border ${show ? "" : "h-0 overflow-hidden "
            } `}>
          {artworkCategories?.length > 0 &&
            artworkCategories.map(({ value }, idx) => (
              <li
                ref={liRef}
                key={value + "-" + idx}
                className={`${idx === activeIndex ? "font-bold bg-gray-200" : ""
                  } text-center z-30 border-b px-[9px] hover:bg-gray-200 list-none py-2  pb-2 cursor-pointer`}
                onClick={(e) => handleClickMenu(e, idx, false, value)}>
                {value}
              </li>
            ))}
        </div>
      </button>
    </div>
  );
}

function MobileCatmenu(artworkCategories) {
  return (
    <div className=" border border-black text-center">
      <ul
        ref={ulRef}
        className="flex gap-8 w-full ml-4 md:ml-0 py-4 overflow-hidden text-gray-500">
        <li
          ref={allRef}
          className={`cursor-pointer ${activeIndex === -1 ? "underline font-bold" : ""
            }`}
          onClick={(e) => handleClickMenu(e, 1, true)}>
          All
        </li>
        {artworkCategories?.length > 0 &&
          artworkCategories.map(({ value }, idx) => (
            <li
              ref={liRef}
              key={value + "-" + idx}
              className={`${idx === activeIndex ? "underline font-bold" : ""
                } pb-2 cursor-pointer`}
              onClick={(e) => handleClickMenu(e, idx, false, value)}>
              {value}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ArtworkCategories;
