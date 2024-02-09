import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import axios from "axios";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import usePopup from "Components/ui/popup/usePopup";
import { getToken } from "utils/storage"
import useCompetition from "./useCompetition";
import Image from 'next/image'

const CompetitionBanner = ({ competitionId }) => {
	SwiperCore.use([Autoplay]);
	const { banners, getCompetitionsBanners } = useCompetition();
	const { authUser } = useAuthUser();
	const { locale, push } = useRouter();
	const [swiperRef, setSwiperRef] = useState(null);
	// console.log('banners =====', banners)

	const token = getToken();

	useEffect(() => {
		getCompetitionsBanners({
			params: locale === "en" ? { lang: locale } : {}
		});
	}, [locale]);

	const { handleShowModal, MODAL_TYPES } = usePopup();

	useEffect(() => {
		if (swiperRef && competitionId > 0 && banners) {
			const index = banners.result?.findIndex(
				(item) => item.id === competitionId
			);
			if (index > -1) {
				swiperRef.slideTo(index);
			}
		}
	}, [competitionId, swiperRef, banners]);

	async function fetchCompetitionDetail(competitionId) {
		try {
			const res = await axios.get(
				process.env.url + "/competitions/" + competitionId,
				{
					headers: { Authorization: "Bearer " + token }
				}
			);
			return res;
		} catch (err) {
			return err.response.data;
		}
	}

	function handleClickBanner(bannerId, isRegister, isPeriodEnded) {
		if (!isRegister || isPeriodEnded) {
			handleShowModal(MODAL_TYPES.COMPETITION_EXPIRED);
			return;
		}
		if (!authUser?.id) {
			handleShowModal(MODAL_TYPES.LOGIN_POPUP);
			return;
		}
		fetchCompetitionDetail(bannerId).then((res) => {
			const exceedCount = res?.message?.split(" ")[1] || null;
			if (exceedCount) {
				handleShowModal(MODAL_TYPES.COMPETITION_EXCEEDED, exceedCount);
				return;
			}
			push("/art/createArtwork?competition=" + bannerId);
		});
	}

	return (
		<section
			id="competitionBanner"
			className="w-full mx-auto relative">
			<div className="2xl:w-[1410px] xl:w-[1240px] lg:w-[1024px] sm:w-[640px] w-[328px] sm:h-full mx-auto relative cursor-pointer rounded-[10px] overflow-hidden">
				<Swiper
					allowTouchMove= {false}
					onSwiper={setSwiperRef}
					simulateTouch={false}
					className="w-full h-full"
					spaceBetween={0}
					slidesPerView={1}>
					{banners?.result?.length > 0 &&
						banners?.result.map((banner, idx) => {
							let isPeriodEnded = banner.status === "COMPLETED" ? true : false;
							return (
								<SwiperSlide key={`competitionBanner${idx}`}>
									<div
										className="text-center"
										onClick={() =>
											handleClickBanner(
												banner.id,
												banner.isRegister,
												isPeriodEnded
											)}
										>
										<div className="hidden sm:block 2xl:w-[1410px] xl:w-[1240px] lg:w-[1024px] sm:w-[640px] sm:h-[200px] w-full h-full relative">
											<Image
												src={banner.imageFile.url}
												alt={banner.imageFile.name}
												layout="fill"
												objectFit="fill"
												// width={1410}
												// height={200}
												// className="object-cover"
											/>
										</div>
										{/* for mobile device */}
										<div className="block sm:hidden w-full h-full relative">
											{
												banner.mobileImageFile ? 
												<Image
													src={banner.mobileImageFile.url}
													alt={banner.mobileImageFile.title}
													width={328}
													height={105}
													className="object-cover"
												/>
												: <div className="w-full h-[105px] bg-gray-400" />
											}
										</div>
									</div>
								</SwiperSlide>
							);
						})}
				</Swiper>
			</div>
		</section>
	);
};

export default CompetitionBanner;