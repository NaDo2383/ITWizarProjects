import React, { useEffect, useRef, useState } from "react";
import useEvent from "./useEvent";
import useArtworkTranslation from "locale/useArtworkTranslation";
import EventSubTab from "./eventSubTab/EventSubTab";
import VMFoundArtwork from "./VMFoundArtwoks";
import { useGlobalContext } from "common/global/useGlobalContext";
import { InView } from 'react-intersection-observer';
import useTab from "Components/ui/tab/useTab";
import { useRouter } from "next/router";

function IntroductionPage({ setTabIndexs }) {
	const { distance } = useGlobalContext();
	const projectIntroRef = useRef(null);
	const chevron = useRef();
	const teamIntroRef = useRef(null);
	const { eventDetail, getEvent, activeEventId, foundArtwork } = useEvent();
	const {
		productIntroI18,
		teamIntroI18,
		projectIntroductionI18,
		teamIntroductionI18
	} = useArtworkTranslation();

	const subTabHeader = [
		{ value: projectIntroductionI18, id: 0 },
		{ value: teamIntroductionI18, id: 1 }
	];
	const { setSubTabIndex } = useTab()
	const [isScrolling, setIsScrolling] = useState(false)
	const { query } = useRouter()

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

	const handleClick = (clickedTabId) => {
		setIsScrolling(true);

		const scrollingPromise = new Promise((resolve) => {
			if (clickedTabId === 0) {
				projectIntroRef.current?.scrollIntoView({ behavior: "smooth" });
				window.scroll({ top: 640, left: 0, behavior: "smooth" });
			} else if (clickedTabId === 1) {
				teamIntroRef.current?.scrollIntoView({ behavior: "smooth" });
			}

			// Assuming 500ms is the duration of the scrolling animation
			setTimeout(() => {
				resolve(); // Resolve the promise after completing the scrolling action
			}, 500);
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
			if (+query.index >= 0) {
				// handleClick(+query.index)
				if (+query.index === 0) {
					projectIntroRef.current?.scrollIntoView({ behavior: "instant" });
				} else if (+query.index === 1) {
					window.scroll({
						top: teamIntroRef.current?.offsetTop,
						behavior: "instant",
					})
				}
			}
		}, 1000)
	}, [eventDetail?.page?.descFile?.url, eventDetail?.page?.teamDescFile?.url]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (!+query.index && eventDetail?.page?.descFile?.url) {
	// 			handleClick(0)
	// 			// teamIntroRef.current?.scrollIntoView({ behavior: "smooth" });
	// 		}
	// 	}, 1000);
	// }, [eventDetail?.page?.descFile?.url, eventDetail?.page?.teamDescFile?.url]);

	if (eventDetail) {
		return (
			<div className="flex flex-col ">
				<EventSubTab
					subTabHeader={subTabHeader}
					handleClick={handleClick}
				/>
				<InView onChange={(inView, entry) => setInView(inView, entry)}
					threshold={[0, 1]} id="0" className={`${distance > 600 ? "lg:pt-[50px] sm:pt-[370px] pt-[310px] sm:mt-[-50px]" : "pt-[50px]"}`} >
					<div ref={projectIntroRef} style={{ position: "relative" }} className={`${distance >= 640 ? "top-[-120px]" : "top-[-350px]"}`}></div>
					<div className="flex flex-col">
						<h3 className="lg:text-[22px] text-[14.5px] sm:font-semibold font-medium text-[#fff] font-mont ml-2">
							{productIntroI18}
						</h3>
						<div className={`w-full h-full mt-[25px] max-w-[1410px] bg-[#F0F0F0] ${distance > 600 && "sm:mb-[-180px] mb-[-80px]"}`}>
							<img
								width={"100%"}
								height={"100%"}
								src={
									eventDetail?.page?.descFile?.url
										? eventDetail?.page?.descFile?.url
										: "/coverpic.jpg"
								}
								alt="descFileUrl"
							/>
						</div>
					</div>
				</InView>
				<InView onChange={(inView, entry) => setInView(inView, entry)}
					threshold={[0, 1]} id="1" className={`sm:mt-[100px] mt-[35px]`} >
					<div ref={teamIntroRef} style={{ position: "relative" }} className={`${distance >= 640 ? "top-[-100px]" : "top-[-330px]"}`}></div>
					<div className={`flex flex-col ${distance > 600 && "lg:mt-[180px] sm:mt-[210px] mt-[80px]"}`}>
						<h3 className="lg:text-[22px] text-[14.5px] sm:font-semibold font-medium text-[#fff] font-mont ml-2">
							{teamIntroI18}
						</h3>
						<div className="mt-[25px] h-full max-w-[1410px] bg-[#F0F0F0]">
							<img
								width={"100%"}
								height={"100%"}
								src={
									eventDetail?.page?.teamDescFile?.url
										? eventDetail?.page?.teamDescFile?.url
										: "/coverpic.jpg"
								}
								alt="teamDescFileUrl"
							/>
						</div>
					</div>
				</InView>
				{foundArtwork?.length > 0 && <VMFoundArtwork isIntroPage setTabIndex={setTabIndexs} handleClick={handleClick} />}
			</div>
		);
	}
}

export default IntroductionPage;
