import { useEffect } from "react";
import useBanner from "../banner/useBanner";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react'
import Slider from "Components/ui/swiper/Swiper";
import useCommonTranslation from "locale/useCommonTranslation";
import BannerLink from "./ArtistBannerLink";
import Image from 'next/image'

export default function ArtistBanner() {
	const { submenu_artist } = useCommonTranslation();
	const { locale, push } = useRouter()
	const { getBottomBanner, bannerState } = useBanner()
	const banners = bannerState.bottomBanner?.bannerItem?.content

	useEffect(() => {
		getBottomBanner(locale === "en" ? '?lang=en' : '')
	}, [locale])

	function handleClickBanner(banner) {
		if (!banner.bannerLink) {
			return
		}
	}

	return (
		<div className="flex flex-col items-center w-full relative">
			<h2 className="text-[20px] sm:text-[30px] text-center text-[#E0E6E8] font-[500] mt-[25px] mb-[53px] sm:my-[80px] -tracking-[0.36px]">
				{submenu_artist}
			</h2>
			<div className="block relative container mb-[50px]">
				{banners?.length > 0 ? (
					<Slider slidesPerView={{ sm: 1, md: 1, lg: 1 }}>
						{
							banners?.length > 0 && banners.map((item, idx) => (
								<SwiperSlide key={'data-' + idx}>
									<div className="hidden sm:block 2xl:w-[1410px] ls:w-[1024px] sm:w-[600px] w-[328px] sm:min-h-[300px] h-[105px] overflow-hidden sm:rounded-xl rounded-[5px]">
										{
											item?.bannerLink ? (
												<>
													<BannerLink href={item.bannerLink}>
														<Image src={item.url}
															layout="fill"
															objectFit="fill"
															className="object-cover sm:rounded-xl rounded-[5px]"
															alt='artist-banner-image' />
													</BannerLink>
												</>
											) : (
												<Image src={item?.url}
													layout="fill"
													objectFit="fill"
													className="object-cover sm:rounded-xl rounded-[5px]"
													alt='artist-banner-image' />
											)
										}
									</div>
									<div className="sm:hidden w-[328px] h-[105px] overflow-hidden rounded-[5px]">
										{
											item?.bannerLink ? (
												<>
													<BannerLink href={item.bannerLink}>
														<Image src={item.mobileUrl}
															layout="fill"
															objectFit="fill"
															className="object-cover sm:rounded-xl rounded-[5px]"
															alt='artist-banner-image' />
													</BannerLink>
												</>
											) : (
												<Image src={item?.mobileUrl}
													layout="fill"
													objectFit="fill"
													className="object-cover sm:rounded-xl rounded-[5px]"
													alt='artist-banner-image' />
											)
										}
									</div>
								</SwiperSlide>
							))
						}
					</Slider>
				) : (
					<div className="sm:rounded-xl rounded-[5px] 2xl:w-[1410px] ls:w-[1024px] sm:w-[600px] w-[328px] sm:min-h-[300px] h-[105px] mx-auto bg-[rgba(39,39,39)]"></div>
				)}
			</div>
		</div>
	);
}
