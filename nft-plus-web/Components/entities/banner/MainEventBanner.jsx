/**
 * @createdBy duka 6/22
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hero from "public/coverpic.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import useBanner from "./useBanner";
import { AiOutlineArrowRight } from "react-icons/ai";
import mypic from '../../../public/coverpic.jpg'

const MainEventBanner = ({ props }) => {
	const [focused, setFocused] = useState(false);
	const navNext = useRef(null);
	SwiperCore.use([Autoplay]);
	const containerRef = useRef(null);
	const { getTopBanner, bannerState } = useBanner();
	const { locale, push } = useRouter();
	const params = {
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		modules: [Pagination]
	};

	function removeFocus() {
		document.activeElement?.blur()
	}

	useEffect(() => {
		getTopBanner(locale === "" ? "?lang=en" : "");
	}, [locale]);
	// console.log('bannerState', bannerState)
	function handleClickBanner(banner) {
		if (banner?.bannerLink) {
			const link = document.createElement("a");
			link.href = banner?.bannerLink;
			link.setAttribute("target", "_blank");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
		return
	}

	return (
		<>
			<section
				className="banner z-50 2xl:h-[475px] 2xl:w-[1410px] xl:h-[375px] xl:w-[1210px] lg:h-[275px] lg:w-[1010px] min-h-[103px] h-[103px] w-full md:rounded-[32px] rounded-[5px] gap-[16px]"
			>
				{bannerState?.topBanner?.isLoading ? (
					<div className="banner-loading"></div>
				) : !bannerState?.topBanner?.isError ? (
					bannerState?.topBanner?.bannerItem?.content?.length > 0 ? (
						bannerState?.topBanner?.bannerItem?.bannerDisplayType ===
							"SLIDE" ? (
							bannerState?.topBanner?.bannerItem?.content && (
								<>
									<Swiper
										className="2xl:h-[475px] 2xl:w-[1410px] xl:h-[375px] xl:w-[1210px] lg:h-[275px] lg:w-[1010px] min-h-[103px] h-[103px] w-full md:rounded-[32px] rounded-[5px] gap-[16px]"
										{...params}
										autoplay={{
											delay: 5000,
											disableOnInteraction: false
										}}
										onBeforeInit={(swiper) => {
											navNext.current = swiper;
										}}
									// style={{
									// 	boxShadow: "0px 0px 8px 0px #FFF inset"
									// }}
									>
										{bannerState?.topBanner?.bannerItem?.content?.map(
											(banner, index) => (
												<SwiperSlide key={`banner-${index}`}>
													<div onClick={() => handleClickBanner(banner)} ref={containerRef} className=" cursor-pointer w-full h-full md:rounded-[32px] rounded-[5px]"
														style={{
															boxShadow: "0px 0px 8px 0px #FFF inset"
														}}
													>
														<div className="hidden sm:block w-full h-full relative -z-[1]">
															<Image
																priority
																unoptimized
																layout="fill"
																objectFit="cover"
																src={banner.url ? banner.url : Hero}
																alt={banner?.altText || ""}
															/>
														</div>
														{/* for mobile device banner image */}
														<div className="block sm:hidden w-full h-full relative -z-[1]">
															<Image
																priority
																unoptimized
																layout="fill"
																objectFit="cover"
																src={banner.mobileUrl ? banner.mobileUrl : Hero}
																alt={banner?.altText || ""}
															/>
														</div>
													</div>
												</SwiperSlide>
											)
										)}
										<div className="swiper-pagination"></div>
									</Swiper>
									<button
										onClick={() => {
											document.activeElement?.blur()
											navNext.current?.slideNext()
										}}
										className={`slider-next`}>
										<AiOutlineArrowRight />
									</button>
								</>
							)
						) : (
							<div className="banner-img">
								<div className="container mx-auto h-full relative"></div>
							</div>
						)
					) : (
						<div className="banner-img">
							<div className=" cursor-pointer w-full h-full md:rounded-[32px] rounded-[5px] overflow-hidden"
								style={{
									boxShadow: "0px 0px 8px 0px #FFF inset"
								}}
							>
								<div className="w-full h-full relative -z-[1]">
									<Image
										priority
										unoptimized
										layout="fill"
										objectFit="cover"
										src={mypic}
										alt={"MainEventBanner"}
									/>
								</div>
							</div>
						</div>
					)
				) : (
					<div className="banner-img">
						<div className="container mx-auto h-full relative"></div>
					</div>
				)}
			</section>
		</>
	);
};

export default MainEventBanner;
