export default function SwitchButton({ on, change, center, loading, name }) {
	return (
		<div
			onClick={name ? () => change(!on, name) : change}
			className={`${center && "mx-auto"} ${
				loading ? "cursor-wait" : "cursor-pointer"
			} border border-[#333333] transition duration-300  rounded-full w-[39px] py-[2px] flex ${
				on ? "bg-[#7B61FF]" : "bg-[#A9A9A9]"
			}`}>
			<div
				style={{ transition: "width .1s ease" }}
				className={`${
					on ? "w-full" : "w-[17px]"
				} h-[16px] duration-300 transition py-[2px]  flex relative items-center rounded-full overflow-hidden`}>
				<div
					style={{ transition: "all .3s" }}
					className={`h-[16px] w-[17px] transition duration-300 rounded-full flex items-center right-0 absolute bg-[#fff] `}></div>
			</div>
		</div>
	);
}
