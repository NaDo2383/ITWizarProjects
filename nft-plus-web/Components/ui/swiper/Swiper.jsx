import React, { useState, useRef, useEffect } from "react";
import { BgChevronButton } from "../button/chevronBtn";
import { Swiper } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
import "swiper/css/scrollbar";

function Slider(props) {
	const { slidesPerView, children } = props;
	const [swiper, setSwiper] = useState(null);
	const [isFullInit, setIsFullInit] = useState(false);
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	useEffect(() => {
		// swiper initialize хийх үед prevRef.current, nextRef.current undefined утгатай тул
		// next, prev товчийг ажиллуулж чадахгүй бна. иймээс доорхи байдлаар дахин re-render хийв.
		const initFullSwiper = setTimeout(() => {
			setIsFullInit(true);
		}, 1000);
		return () => clearTimeout(initFullSwiper);
	}, []);

	useEffect(() => {
		if (isFullInit) {
			if (swiper && swiper.navigation) {
				swiper.navigation.prevEl = prevRef?.current;
				swiper.navigation.nextEl = nextRef?.current;
				swiper.navigation.init();
				swiper.navigation.update();
			}
		}
	}, [swiper]);

	return (
		<div className="w-full relative ">
			<Swiper
				grabCursor={true}
				className="w-full h-full"
				modules={
					props?.direction === "vertical"
						? [Mousewheel]
						: [Navigation, Scrollbar, A11y]
				}
				spaceBetween={30}
				direction={props?.direction || "horizontal"}
				draggable
				loop={true}
				mousewheel={true}
				freeMode={true}
				slidesPerView={1}
				onSwiper={(swiper) => setSwiper(swiper)}
				navigation={{ prevEl: prevRef?.current, nextEl: nextRef?.current }}
				breakpoints={{
					480: {
						slidesPerView: slidesPerView?.xs ?? 1
					},
					768: {
						slidesPerView: slidesPerView?.sm ?? 2
					},
					920: {
						slidesPerView: slidesPerView?.md ?? 3
					},
					1280: {
						slidesPerView: slidesPerView?.lg ?? 4
					}
				}}>
				{children}
			</Swiper>
			{/* {swiper && props?.direction !== "vertical" && (
				<>
					<span className="absolute top-1/2 -left-7 -translate-y-1/2 cursor-pointer  z-40">
						<BgChevronButton position={"left"} ref={prevRef} />
					</span>
					<span className="absolute top-1/2 -right-7 -translate-y-1/2 cursor-pointer z-50">
						<BgChevronButton position={"right"} ref={nextRef} />
					</span>
				</>
			)} */}
		</div>
	);
}

export default Slider;
