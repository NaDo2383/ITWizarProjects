/**
 * @createdBy duka 6/22
 */
import { useEffect } from "react";
import Image from "next/image";
import loop3 from "public/Looper-3.png";
import elipse2 from "public/Ellipse3.png";
import elipse3 from "public/Ellipse2.png";
import star1 from "public/4star.png";
import star2 from "public/star1.png";
import greenRectangle from "public/greenRectangle.png";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import useBanner from "./useBanner";
import Link from "next/link";
import useMainPageTranslation from "locale/useMainPageTranslation";

const BottomBanner = () => {
	const { locale } = useRouter();
	const { applyBtn, applyDesc1, applyDesc2 } = useMainPageTranslation();
	const { getBottomBanner, bannerState } = useBanner();
	SwiperCore.use([Autoplay]);
	const params = {
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		modules: [Pagination]
	};
	
	useEffect(() => {
		getBottomBanner(locale === "en" ? "?lang=en" : "");
	}, [locale]);

	return (
		<div className="banner-wrapper sm:h-screen h-[60vh] overflow-hidden ">
			<div
				className="banner-bottom-img relative bg-auto bg-no-repeat bg-center"
				style={{ backgroundImage: "url('/stars.png')" }}>
				<div className="pointer-events-none">
					<img
						src="/Ellipse2.png"
						alt="Ellipse"
						className="hidden md:block absolute lg:bottom-[120px] lg:w-full lg:h-full md:w-[450px] md:h-[450px] w-[250px] h-[250px] left-0"
					/>
					<div className="hidden md:block absolute right-0 lg:bottom-[-400px] lg:w-[800px] lg:h-[1000px] md:bottom-[-400px] md:w-[500px] md:h-[500px] w-[250px] h-[250px]">
						<Image src={loop3} alt="loop3" />
					</div>
					<div className="absolute lg:right-[200px] md:right-[80px] sm:right-[40px] right-[30px] lg:top-[50px] md:top-[60px] sm:top-[30px] top-[140px]">
						<div className="lg:w-full lg:h-full sm:w-[40px] sm:h-[40px] w-[20px] h-[20px]">
							<Image className="animate-pulse" src={star1} alt="star1"  />
						</div>
					</div>
					<div className="absolute lg:left-[240px] md:left-[80px] left-[40px] lg:top-[24 0px] md:top-[240px] sm:top-[100px] top-[350px]">
						<div className="lg:w-full lg:h-full sm:w-[40px] sm:h-[40px] w-[20px] h-[20px]">
							<Image className="animate-pulse" src={star2} alt="star2"  />
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center  relative z-100 md:pt-[30vh] sm:pt-[50vh] pt-[25vh] sm:px-0 px-[10px]">
					<h2 className="max-w-[1300px] lg:text-[50px] md:text-[32px] text-[20px] font-semibold text-center font-mont text-[#fff]">
						{ applyDesc1}
					</h2>
					<h2 className="max-w-[1300px] lg:text-[50px] md:text-[32px] text-[20px] font-semibold text-center font-mont text-[#fff] sm:mt-[16px] sm:px-0 px-[40px]">
						{ applyDesc2}  
					</h2>
					<Link href="https://docs.google.com/forms/d/e/1FAIpQLSe9PRVUDMqaTOrlwDf5L67qyh6-dWYF4dhOgSdnQ05HCbKiLg/viewform" target="_blank" passHref>
						<a target="_blank">
							<button
								className="min-w-[160px] md:min-w-[260px] leading-none lg:mt-[90px] mt-[38px] lg:px-[25px] lg:py-[23px] px-[16px] py-[14px] rounded-[10px] lg:text-[24px] text-white text-[15px] font-[600] whitespace-nowrap animationBtn"
								style={{
									background:
									"linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)"
								}}>
								{applyBtn}
							</button>
						</a>
					</Link>
				</div>
				<div className=" absolute 2xl:-bottom-[540px] 2xl:w-[521px] 2xl:h-[521px] md:-left-[6%] lg:-bottom-[500px] lg:w-[400px] lg:h-[400px] md:-bottom-[600px] md:w-[300px] md:h-[300px] sm:bottom-[-55%] bottom-[45%] sm:left-[-10%] left-[-15%] sm:w-[200px] sm:h-[200px] w-[140px] h-[140px] blur-sm md:blur-none">
					<Image  src={greenRectangle} alt="greenRectangle" objectFit="contain" />
				</div>
				<div className="absolute afdsa sm:top-[50%] top-[10%] left-0 md:hidden w-[700px] h-[700px] pointer-events-none">
					<Image  src={elipse3} alt="elipse3" />
				</div>
				<div className="absolute -bottom-40 right-0 lg:w-[600px] lg:h-[500px] md:w-[300px] md:h-[300px] w-[200px] h-[200px] pointer-events-none">
					<Image  src={elipse2} alt="elipse2" />
				</div>
			</div>
		</div>
	);
};

export default BottomBanner;
