import React from "react";
import EventSubTabHeader from "./EventSubTabHeader";
import { useGlobalContext } from "common/global/useGlobalContext";

const EventSubTab = ({ subTabHeader, handleClick }) => {
	const { distance, setDistance } = useGlobalContext();

	return (
		<>
			<div className={`container mx-0 mt-[15px] ${distance >= 640 && `fixed top-[110px] shadow-xl sm:top-[220px] lg:top-[182px] sm:py-[15px] py-[10px] container bg-[#161717] mx-0`}`}
				style={{
					transform: distance > 600 ? "translateY(0)" : "",
					transition: "all 300ms",
					zIndex: 10
				}}>
				<div className="w-full flex justify-between gap-[15px]">
					<EventSubTabHeader subTabHeader={subTabHeader} handleClick={handleClick} />
				</div>
			</div>
		</>
	);
};

export default EventSubTab;
