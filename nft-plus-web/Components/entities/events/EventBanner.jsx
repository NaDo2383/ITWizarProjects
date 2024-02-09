import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hero from "public/coverpic.jpg";
import { useRouter } from "next/router";
import useEvent from "./useEvent";
import usePopup from "Components/ui/popup/usePopup";
import useAuthUser from "../user/auth/useAuthUser";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { useGlobalContext } from "common/global/useGlobalContext";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import useTab from "Components/ui/tab/useTab";
import { useEventContext } from "./useEventContext";
import Loader from "Components/ui/loader";

const EventBanner = () => {
	const { distance, setGlobalLoading } = useGlobalContext();
	const [loadBanner, setLoadBanner] = useState(true);
	const [adCode, setAdCode] = useState("");
	const { authUser } = useAuthUser();
	const { handleShowModal, MODAL_TYPES } = usePopup();
	const { eventDetail, getAirDropArtwork, totalEvents, activeEventId, setActiveEventId, getEvent, getFoundArtworks, getUndiscoveredArtworks, getAllEventArtworks } = useEvent();
	const router = useRouter();
	const { query } = useRouter();
	const navNext = useRef(null);
	const containerRef = useRef(null);
	const { setActiveTabId, setSubTabIndex, setScroll } = useTab()
	const [changeCount, setChangeCount] = useState(0);
	const { setLimitStrVMAllNFT, setLimitStrVMundiscoveredNFT, setLimitStrVMfoundNFT } = useEventContext()

	const params = {
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		modules: [Pagination],
		onSlideChange: (swiper) => {
			// Update the currentSlideIndex state when the slide changes
			handleSlideChange(swiper.realIndex);
		},
	};

	useEffect(() => {
		if (router.query?.projectId && totalEvents.length > 0) {
			// console.log('totalEvents', totalEvents)
			const projectId = router.query.projectId;
			const eventIndex = totalEvents.findIndex(event => event.id == projectId)
			if (eventIndex > -1) {
				changeEvent(eventIndex)
				navNext.current?.slideTo(eventIndex + 1);
				
			}
		
		}
		if (router.query?.tabIndex) {
			if (router.query?.tabIndex == 0 || router.query?.tabIndex == 1 || router.query?.tabIndex == 2) {
				setActiveTabId(+router.query?.tabIndex)
				// window.scrollTo({
				// 	top: query?.index === "2" ? 1400 : 600,
				// 	behavior: "smooth"
				// });
			
			}
		}
		// if (router.query?.index) {
		// 	setTimeout(() => {
		// 		if (+query?.index > 0) {
		// 			setSubTabIndex(+query?.index)
		// 		}
		// 	}, 501);
		// }
	
	}, [router, totalEvents])

	function handleSlideChange(realIndex) {
		changeEvent(realIndex)
		setActiveTabId(0);
		if (isMobile && changeCount > 0) {
			changeSubTabIndex()
		}
		setChangeCount(changeCount + 1)
	}

	function changeEvent(realIndex) {
		getEvent(totalEvents[realIndex].id);
		getFoundArtworks(totalEvents[realIndex].id);
		getUndiscoveredArtworks(totalEvents[realIndex].id);
		getAllEventArtworks(totalEvents[realIndex].id);
	}

	function changeSubTabIndex() {
		setScroll(false)
		setSubTabIndex(0)
	}

	function nextSlide() {
		navNext.current?.slideNext()
		setLimitStrVMAllNFT(false)
		setLimitStrVMundiscoveredNFT(false)
		setLimitStrVMfoundNFT(false)
		//window.scroll({ top: 640, left: 0, behavior: "smooth" });
		changeSubTabIndex()
	}

	function prevSlide() {
		navNext.current?.slidePrev()
		setLimitStrVMAllNFT(false)
		setLimitStrVMundiscoveredNFT(false)
		setLimitStrVMfoundNFT(false)
		//window.scroll({ top: 640, left: 0, behavior: "smooth" });
		changeSubTabIndex()
	}

	return (
		<section
			style={{
				height: "100%"
			}}
			className={`banner mt-[10px] ${distance > 600 ? "sm:mb-[180px] mb-[20px]" : "sm:mb-[38px] mb-[25px]"}`}>
		
			{totalEvents ? (
				<div className="w-full min-w-[1410px] h-full relative lg:min-h-[640px] min-h-[270px] rounded-[20px]">
					{
						totalEvents?.length > 0 ? (
							<>
								<Swiper
									allowTouchMove={totalEvents?.length <= 1 ? false : true}
									//	 onSwiper={setSwiper}
									className="md:h-[640px] 2xl:w-[1410px] xl:w-[1210px] lg:w-[1010px] h-[270px] w-full md:rounded-[32px] sm:rounded-[5px] z-0"
									{...params}
									onBeforeInit={(swiper) => {
										navNext.current = swiper;
									}}
								>
									{totalEvents?.map((banner, index) => (
										<SwiperSlide key={`banner-${index}`}
										>
											<div ref={containerRef} className=" cursor-pointer w-full h-full md:rounded-[32px] rounded-[5px]">
												<div className="w-full h-full relative -z-[1]">
													<Image
														priority
														unoptimized
														layout="fill"
														objectFit={isMobile ? "contain" : "cover"}
														src={banner?.bannerUrl ? banner?.bannerUrl : Hero}
														alt={banner?.name || ""}
													/>
												</div>
											</div>
										</SwiperSlide>
									)
									)}
									<div className="swiper-pagination"></div>
								</Swiper>
								{totalEvents?.length > 1 &&
									<>
										<button
											onClick={() => {
												document.activeElement?.blur()
												nextSlide()
											}}
											className={`vmNextSlider`}>
											<AiOutlineArrowRight />
										</button>
										<button
											onClick={() => {
												document.activeElement?.blur()
												prevSlide()
											}}
											className={`vmPrevSlider`}>
											<AiOutlineArrowLeft />
										</button>
									</>
								}
							</>
						) : (
							<Image
								onLoad={() => setLoadBanner(false)}
								priority
								unoptimized
								layout="fill"
								objectFit="cover"
								width={100}
								height={100}
								src={Hero}
								alt="Hero"
							/>
						)
					}
					<div className="sm:flex hidden flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute gap-[22px] max-w-[780px] justify-center items-center z-10">
						<h2 className="text-white lg:text-[30px] text-[24px] font-bold leading-[36px] font-mont">
							{eventDetail?.name}
						</h2>
						<div className="h-[90px]">
							{eventDetail?.showIntroduction && eventDetail?.introduction && (
								<p className="lg:text-[18px] text-[14px] text-[#BFBFBF] text-center font-[500] sm:leading-[30px] font-mont whitespace-pre">
									{eventDetail?.introduction}
								</p>
							)}
						</div>
						<div className="lg:text-[18px] text-[14px] sm:mt-[41px] mt-[20px] relative flex justify-between bg-[#EBEBEB] bg-opacity-[.8] rounded-[15px] overflow-hidden lg:min-w-[457px] min-w-[280px] py-[7px] px-4">
							<input
								value={adCode}
								onChange={(e) => setAdCode(e.target.value)}
								type="text"
								className="lg:text-[18px] text-[14px]  bg-transparent lg:leading-[36px] focus:outline-none text-[#606060] w-full "
								placeholder="Enter the AD code"
							/>
							<div
								className="cursor-pointer"
								onClick={() => {
									if (adCode !== "") {
										setGlobalLoading(true)
										if (authUser?.id) {
											getAirDropArtwork(adCode);
										} else {
											setGlobalLoading(false)
											handleShowModal(MODAL_TYPES?.GO_TO_LOGIN);
										}
									} else {
										if (authUser?.id) {
											handleShowModal(MODAL_TYPES?.AD_CODE_1);
										} else {
											setGlobalLoading(false)
											handleShowModal(MODAL_TYPES?.GO_TO_LOGIN);
										}
									}
								}}>
								<svg
									width="33"
									height="33"
									viewBox="0 0 33 33"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M14 15.308C12.7323 15.9049 11.7121 16.9418 11.1369 18.2234L11.1239 18.2525L11.1239 18.2525C10.9744 18.5856 10.8426 18.8793 10.7221 19.1067C10.6063 19.3253 10.4354 19.616 10.1592 19.8306C10.0599 19.9077 9.98196 19.9582 9.87094 20.0172C9.58497 20.1692 9.29449 20.2142 9.0559 20.2333C8.83264 20.2512 8.56499 20.2511 8.28307 20.2511L8.25 20.2511C6.52411 20.2511 5.125 21.6502 5.125 23.3761C5.125 25.102 6.52411 26.5011 8.25 26.5011H16.5H24.875C26.5319 26.5011 27.875 25.158 27.875 23.5011V23.2511C27.875 21.5943 26.5319 20.2511 24.875 20.2511L24.8366 20.2511C24.5104 20.2512 24.2007 20.2512 23.9436 20.2274C23.6674 20.2018 23.3329 20.141 23.0157 19.9397C22.6723 19.7218 22.4621 19.3916 22.3211 19.1424C22.1747 18.8837 22.0157 18.5456 21.8352 18.162L21.8352 18.162L21.8195 18.1285C21.237 16.8906 20.2362 15.89 19 15.308V13.1563C21.0481 13.8415 22.7203 15.3453 23.6292 17.2771C23.8302 17.7043 23.9571 17.9725 24.0618 18.1575C24.0793 18.1885 24.0944 18.2137 24.107 18.2338L24.1279 18.2359C24.2814 18.2501 24.4964 18.2511 24.875 18.2511C27.6364 18.2511 29.875 20.4897 29.875 23.2511V23.5011C29.875 26.2625 27.6364 28.5011 24.875 28.5011H16.5H8.25C5.41954 28.5011 3.125 26.2066 3.125 23.3761C3.125 20.5457 5.41954 18.2511 8.25 18.2511C8.57698 18.2511 8.76285 18.2504 8.89641 18.2397L8.9176 18.2378C8.92797 18.2199 8.94036 18.1977 8.95478 18.1705C9.04076 18.0082 9.14578 17.7754 9.31225 17.4045C10.2068 15.4114 11.9072 13.8564 14 13.1562V15.308Z"
										fill="#606060"
									/>
									<path
										d="M16.5 4.125L15.7929 3.41789L16.5 2.71079L17.2071 3.41789L16.5 4.125ZM17.5 17.875C17.5 18.4273 17.0523 18.875 16.5 18.875C15.9477 18.875 15.5 18.4273 15.5 17.875L17.5 17.875ZM10.2929 8.91789L15.7929 3.41789L17.2071 4.83211L11.7071 10.3321L10.2929 8.91789ZM17.2071 3.41789L22.7071 8.91789L21.2929 10.3321L15.7929 4.83211L17.2071 3.41789ZM17.5 4.125L17.5 17.875L15.5 17.875L15.5 4.125L17.5 4.125Z"
										fill="#606060"
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* <div className="w-full h-full relative">
						</div> */}
				</div>
			) : (
				<div className="banner-img">
					<div className="container mx-auto h-full relative">
						{/* <Image layout="fill" objectFit="cover" src={Hero} alt="Hero" /> */}
					</div>
				</div>
			)}
		</section>
	);
};

export default EventBanner;
