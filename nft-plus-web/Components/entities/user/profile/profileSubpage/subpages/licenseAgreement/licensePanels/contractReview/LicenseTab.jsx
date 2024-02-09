import React from "react";

const LicenseTab = ({ lists, tabIndex, setTabIndex }) => {
  
  return (
        <ul
          id="typeList"
          className="w-full overflow-auto flex gap-2">
          {lists?.map((e, i) => (
            <li key={'lice-' + i}>
                <button
                  key={'leda' + i }
                  onClick={() => setTabIndex(i)}
                  className={`lg:text-lg font-regular border rounded-full text-[#fff] ${
                    i === tabIndex
                      ? "border-[#FB3873]"
                      : "border-[#434343]"
                  } px-4 py-1 cursor-pointer sm:text-[18px] text-[14px]`}>
                      {e?.value}
                </button>
            </li>
          ))}
        </ul>
  );
};

export default LicenseTab;
