import React from "react";

function PopupHeader({ text }) {
	return (
		<div className="flex sm:justify-start md:justify-start justify-center">
			<h3 className="font-[500] sm:text-[#fff] text-[#E0E6E8] sm:text-[22px] text-[20px]">{text}</h3>
			{/* <button className="w-[20px] h-[20px]" onClick={hideAllModals}>
        <Image src={closeIco} alt="close" />
  </button>*/}
		</div>
	);
}

export default PopupHeader;
