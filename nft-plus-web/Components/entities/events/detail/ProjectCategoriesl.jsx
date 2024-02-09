import React from "react";

const ProjectCategories = ({ lists, tabIndex, setTabIndex }) => {
  
  return (
    <>
      <div className="w-full flex justify-between items-center gap-6 ">
        <ul
          id="typeList"
          className="w-full overflow-auto hidden invisible md:flex md:visible justify-center">
          {lists?.map((e, i) => (
            <li
              key={i}
              onClick={() => setTabIndex(i)}
              className={`lg:text-lg ${
                i === tabIndex
                  ? "text-[#606060] font-medium border-b border-[#606060] px-2"
                  : "text-[#ABABAB] font-medium border-b border-[#C9C9C9] px-2"
              }  cursor-pointer text-[20px]`}>
              {e?.value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectCategories;
