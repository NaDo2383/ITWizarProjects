export default function EditRowForChainInfo({ title, children, bordert, isEvent }) {
	return (
		<div className={`flex border-b border-[#232323] w-full min-h-[29px] min-w-[450px] max-w-[564px] ${isEvent && "min-h-[29px]"}`}>
			<div className={`flex items-center sm:min-w-[142px] min-w-[121px] bg-[#2F2E39] sm:py-[4px] sm:px-[13px] py-[4px] px-[13px] ${isEvent && "w-[142px] border-t border-b border-[#333]"}`}>
				<p className={`font-[500] lg:text-[14px] sm:text-[14px] text-[12px] text-[#DDD] whitespace-nowrap ${isEvent && "font-[500] text-[14px]"}`}>{title}</p>
			</div>
			<div className={`w-full flex items-center flex-wrap font-regular border-b border-[#333] px-[9px] py-[4px] whitespace-nowrap sm:min-w-[210px] min-w-full ${bordert && "border-t"} ${isEvent && "w-[74.8227%] border-t"}`}>
				{children}
			</div>
		</div>
	);
}
