/**
 * @createdBy Narada0927 2022
 */
const Tab = ({ index, title, indx }) => {
	return (
		<div
			className={`${
				index === 0 ? "arro" : index === 3 ? "arrw" : "arrow"
			} flex bg-[#333] py-6 md:py-2  text-[18px] w-[70px] md:w-max px-6 items-center gap-1 relative`}>
			<div
				className={`${index === 0 ? "arro" : index === 3 ? "arrw" : "arrow"} ${
					indx === index ? "bg-[#333] text-white" : "bg-white text-[#333]"
				} absolute top-px flex items-center md:gap-1 justify-center left-px right-px bottom-px`}>
				<span className="">
					0{index + 1}
					<span className="hidden md:inline">.</span>
				</span>
				<p
					className={`hidden md:inline ${
						indx === index ? "bg-[#333] text-white" : "bg-white text-[#333]"
					}`}>
					{title}
				</p>
			</div>
			<p className="hidden md:block ">0{index + 1}.</p>
			<p className="hidden md:block ">{title}</p>
		</div>
	);
};
export default Tab;
//
