export default function EditRow({ title, children, bordert }) {
	return (
		<div className="flex border-b border-[#232323] py-[15px] justify-between sm:justify-start">
			<div className="flex items-center lg:w-[210px] sm:w-[210px] w-full">
				<p className="font-[400] lg:text-[16px] sm:text-[16px] text-[15px] text-[#B0B0B0]">{title}</p>
			</div>
			<div
				className={`sm:w-full flex items-center`}>
				<div className="flex items-center flex-wrap font-regular text-white">
					{children}
				</div>
			</div>
		</div>
	);
}
