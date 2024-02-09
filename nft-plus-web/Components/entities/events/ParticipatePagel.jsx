import React, { useState, useRef, useEffect } from "react";
import useEvent from "./useEvent";
import useArtworkTranslation from "locale/useArtworkTranslation";
import VMFoundArtwork from "./VMFoundArtwoks";
import EventSubTab from "./eventSubTab/EventSubTab";
import { useGlobalContext } from "common/global/useGlobalContext";
import { InView } from 'react-intersection-observer';
import useTab from 'Components/ui/tab/useTab'

function ParticipatePage({ setTabIndexs }) {
	const { distance, setDistance, browserWindow, limitStrVMAllNFT } = useGlobalContext();
	const ref = useRef(null);
	const chevron = useRef();
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const { eventDetail, getEvent, activeEventId, foundArtwork } = useEvent();
	const {
		howToParticipateI18,
		participatingLoci18,
		schedule18,
		howParticipateI18,
		participateScheduleI18,
		placeParticipationI18
	} = useArtworkTranslation();
	const lists = [
		{ value: howParticipateI18, id: 0 },
		{ value: participateScheduleI18, id: 1 },
		{ value: placeParticipationI18, id: 2 }
	];
	const { setSubTabIndex } = useTab()
	const [isScrolling, setIsScrolling] = useState(false)

	const showChevron = () => {
		if (typeof window !== "undefined" && window.pageYOffset >= 250) {
			chevron.current?.classList.remove("opacity-0");
			chevron.current?.classList.remove("invisible");
			chevron.current?.classList.add("opacity-100");
			chevron.current?.classList.add("visible");
		} else {
			chevron.current?.classList.add("opacity-0");
			chevron.current?.classList.add("invisible");
			chevron.current?.classList.remove("opacity-100");
			chevron.current?.classList.remove("visible");
		}
	};

	const handleClick = (tabIdx) => {
		setIsScrolling(true);

		const scrollingPromise = new Promise((resolve) => {
			if (tabIdx === 0) {
				ref.current?.scrollIntoView({ behavior: "smooth" });
				window.scroll({ top: 640, left: 0, behavior: "smooth" });
			} else if (tabIdx === 1) {
				ref1.current?.scrollIntoView({ behavior: "smooth" });
			} else if (tabIdx === 2) {
				ref2.current?.scrollIntoView({ behavior: "smooth" });
			}

			// Set a timeout or use event listener to detect the end of scrolling
			setTimeout(() => {
				resolve(); // Resolve the promise after completing the scrolling action
			}, 1000); // Adjust the timeout as needed
		});

		scrollingPromise.then(() => {
			setIsScrolling(false);
		});
	};

	const setInView = (inView, entry) => {
		if (inView && !isScrolling) {
			const observedSection = entry?.target.getAttribute("id");
			setSubTabIndex(+observedSection)
		}
	};

	useEffect(() => {
		window?.addEventListener("scroll", showChevron.bind(this));
		return () => {
			window?.removeEventListener("scroll", showChevron.bind(this));
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			handleClick(0)
		}, 1000);
	}, [eventDetail?.page?.applyFile?.url, eventDetail?.page?.dateFile?.url, eventDetail?.page?.applyPlaceFile?.url]);

	return (
		<div className={`flex flex-col pb-6 ${distance > 600 && "pt-[-100px]"}`}>
			<EventSubTab
				subTabHeader={lists}
				handleClick={handleClick}
			/>

			<InView onChange={(inView, entry) => setInView(inView, entry)}
				threshold={[0, 1]} id="0" className={`${distance > 600 ? "lg:pt-[50px] sm:pt-[370px] pt-[310px] sm:mt-[-50px]" : "pt-[50px]"}`} >
				<div ref={ref} style={{ position: "relative", top: "-120px" }}></div>
				<div>
					<div className="flex flex-col">
						<h3 className="lg:text-[22px] text-[14.5px] sm:font-semibold font-medium text-[#fff] font-mont ">
							{howToParticipateI18}
						</h3>
						<div className={`w-full h-full mt-[25px] max-w-[1410px] bg-[#F0F0F0] ${distance > 600 && "sm:mb-[-180px] mb-[-80px]"}`}>
							<img
								width={"100%"}
								height={"100%"}
								src={eventDetail?.page?.applyFile?.url
									? eventDetail?.page?.applyFile?.url
									: "/coverpic.jpg"}
								alt="applyFileUrl"
							/>
						</div>
					</div>
				</div>
			</InView>
			<InView onChange={(inView, entry) => setInView(inView, entry)}
				threshold={[0, 1]} id="1" className="sm:mt-[100px] mt-[35px]" >
				<div ref={ref1} style={{ position: "relative", top: "-100px" }}></div>
				<div className={`flex flex-col ${distance > 600 && "lg:mt-[180px] sm:mt-[210px] mt-[80px]"}`}>
					<h3 className="lg:text-[22px] text-[14.5px] sm:font-semibold font-medium text-[#fff] font-mont ">
						{schedule18}
					</h3>
					<div className={`w-full h-full mt-[25px] max-w-[1410px] bg-[#F0F0F0] ${distance > 600 && "sm:mb-[-180px] mb-[-80px]"}`}>
						<img
							width={"100%"}
							height={"100%"}
							src={
								eventDetail?.page?.dateFile?.url
									? eventDetail?.page?.dateFile?.url
									: "/coverpic.jpg"
							}
							alt="dateFileUrl"
						/>
					</div>
				</div>
			</InView>
			<InView onChange={(inView, entry) => setInView(inView, entry)}
				threshold={[0, 1]} id="2" className={`sm:mt-[100px] mt-[35px]`} >
				<div ref={ref2} style={{ position: "relative", top: "-100px" }}></div>
				<div className={`flex flex-col ${distance > 600 && "lg:mt-[180px] sm:mt-[210px] mt-[80px]"}`}>
					<h3 className="lg:text-[22px] text-[14.5px] sm:font-semibold font-medium text-[#fff] font-mont ">
						{participatingLoci18}
					</h3>
					<div className="w-full h-full mt-[25px] max-w-[1410px] bg-[#F0F0F0]">
						<img
							width={"100%"}
							height={"100%"}
							src={eventDetail?.page?.applyPlaceFile?.url
								? eventDetail?.page?.applyPlaceFile?.url
								: "/coverpic.jpg"}
							alt="applyPlaceFileUrl"
						/>
					</div>
				</div>
			</InView>
			{foundArtwork?.length > 0 && <VMFoundArtwork isIntroPage setTabIndex={setTabIndexs} handleClick={handleClick} />}
		</div>
	);
}

export default ParticipatePage;
