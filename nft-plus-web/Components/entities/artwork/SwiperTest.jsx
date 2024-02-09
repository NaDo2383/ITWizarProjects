import React, { useState, useRef, useEffect } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/effect-creative';
import { EffectCreative } from "swiper"; 
import { AiOutlineArrowRight } from "react-icons/ai";

export default function SwiperTest(props) {
	const { slidesPerView, children, onSlideChange } = props;
	const swiperRef = useRef();
	const [swiper, setSwiper] = useState(null);
	const [isDisplayBig, setIsDisplayBig] = useState(false);

	useEffect(() => {
		const handleResize = () => {
		setIsDisplayBig(window.innerWidth > 768);
		};

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Initial check on component mount
		handleResize();

		// Clean up the event listener on component unmount
		return () => {
		window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (swiper) {
			swiper.on("slideChange", onSlideChange);
		}
	}, [swiper, onSlideChange]);

	return (
		<div className="w-full h-[220px] sm:h-[calc(100vh*1.2)] md:rotate-[-10deg] flex absolute sm:-top-[calc(100vh/1.8)] radialClip sm:-mt-10">
			<Swiper
				direction={isDisplayBig?"vertical":"horizontal"}
				loop={true}
				// effect={isDisplayBig?'':'creative'}
				freeMode={true}
				autoplay={{ delay: 2000, disableOnInteraction: false }}
				className="h-full radialClipRight transtop"
				slidesPerView={isDisplayBig?2:1}
				spaceBetween={isDisplayBig?(props.spaceBetween || 30):(0)}
				centeredSlides={true}
				onSwiper={(swiper) => setSwiper(swiper)}
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper;
				}}
				creativeEffect={isDisplayBig?({
					prev: {
					  shadow: true,
					  translate: ['-20%', 0, -1],
					},
					next: {
					  translate: ['100%', 0, 0],
					},
				  }):("")}
				modules={[EffectCreative]}
				>
				{children}
			</Swiper>
			{swiper && (
				<>
					<button
						onClick={() => swiperRef.current?.slideNext()}
						className={`hidden md:flex absolute bottom-[15%] right-[52%] w-[112px] h-[112px] cursor-pointer z-[9999999] rotate-[10deg] rounded-full bg-[rgb(0,0,0,50%)] text-[#fff] text-[20px]  justify-center items-center -translate-y-1/2 translate-x-1/2 hover:scale-110 hover:transition hover:delay-150 duration-300 hover:ease-in focus:scale-90 focus:ease-out`} >
						<AiOutlineArrowRight position={"right"} />
					</button>
				</>
			)}
		</div>
	);
}
