import React, { useState } from "react";

const Categorys = ({ lists, tabIndex, setTabIndex }) => {
	const [show, setShow] = useState(false);

	return (
		<>
			<div className="w-full flex justify-between items-center gap-6">
				<ul
					id="typeList"
					className="w-full overflow-auto hidden invisible md:flex md:visible justify-center gap-10">
					{lists?.map((e, i) => (
						<li
							key={i}
							onClick={() => setTabIndex(i)}
							className={`lg:text-lg ${
								i === tabIndex
									? "text-[#DDD]"
									: tabIndex === 0 ? "text-[#404040]" : "text-[#DDD]"
							} font-bold cursor-pointer text-[24px]`}>
							{e?.value}
						</li>
					))}
				</ul>
				<button className="md:hidden flex flex-col focus:outline-none bg-[#181A1A] relative w-full p-[9px] rounded-md border-x border-[#656565] text-[#ABABAB] mx-2">
					<p onClick={() => setShow(!show)} className="w-full h-full">
						All
					</p>
					<div
						className={`absolute z-30 mt-px bg-[#181A1A]overflow-hidden top-full left-0 w-full rounded-md ${
							show ? "bg-[#181A1A]" : "h-0 overflow-hidden "
						} `}>
						{lists?.map((e, i) => (
							<li
								key={i}
								className={`${
									i === tabIndex ? "font-medium bg-[#181A1A]" : ""
								} text-center z-30 px-[9px] hover:text-[#fff] list-none py-2 border-b border-[#656565] pb-2 cursor-pointer`}
								onClick={() => setTabIndex(i)}>
								{e?.value}
							</li>
						))}
					</div>
				</button>
			</div>
		</>
	);
};

export default Categorys;
