import React, { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import useArtwork from "./useArtwork";
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import SwiperTest from "./SwiperTest";
import "swiper/css";
import { useGlobalContext } from "common/global/useGlobalContext";

function MostLikedArtworks() {
	const { browserWindow } = useGlobalContext()
	const { getMostLikedArtworks, mostLikedArtworks } = useArtwork();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [data, setData] = useState();
	const [isDisplayBig, setIsDisplayBig] = useState(false);
	const mostLikedArtists = [
		{
			fileType: "PICTURE",
			authorName: "개박하 ",
			description: "헤드셋부터 블루투스 이어폰까지, 나의 뮤직 디바이스 일대기",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/%C2%A6%C2%A6%C2%A6%2B%C2%A6-.png"
		},
		{
			fileType: "PICTURE",
			authorName: "ANDI",
			description: "이제 더 이상 외롭지 않은 흰곰과 동물 친구들의 평범하지만 소란스러운 일상",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/ANDI.JPG"
		},
		{
			fileType: "PICTURE",
			authorName: "BBkei",
			description: "BBKEI",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/BBKEI.jpg"
		},
		{
			fileType: "PICTURE",
			authorName: "PHILL",
			description: "괴물과 함께 살아가면 안되는 걸까? 인간과 괴물의 공존",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/PHILL.jpg"
		}
	]
	{/*
			fileType: "PICTURE",
			authorName: "염화",
			description: "서서히 물들여 피어내는 그림이라는 꽃",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/image_4_1.png"
		*/}
	const mobileMostLikedArtists = [
		{
			fileType: "PICTURE",
			authorName: "개박하 ",
			description: "헤드셋부터 블루투스 이어폰까지, 나의 뮤직 디바이스 일대기",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/image_4_2.png"
		},
		{
			fileType: "PICTURE",
			authorName: "ANDI",
			description: "이제 더 이상 외롭지 않은 흰곰과 동물 친구들의 평범하지만 소란스러운 일상",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/image_4.png"
		},
		{
			fileType: "PICTURE",
			authorName: "BBkei",
			description: "BBKEI",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/image_4_3.png"
		},
		{
			fileType: "PICTURE",
			authorName: "PHILL",
			description: "괴물과 함께 살아가면 안되는 걸까? 인간과 괴물의 공존",
			imageUrl: "https://test-generic.s3.ap-northeast-2.amazonaws.com/image_4_4.png"
		}
	]


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
		getMostLikedArtworks();
		setData(mostLikedArtworks);
	}, []);

	// useEffect(() => {
	// 	setCurrentSlide(mostLikedArtworks?.length);
	// }, [mostLikedArtworks]);

	const handleSlideChange = () => {
		if (currentSlide < data?.length) {
			setCurrentSlide(currentSlide + 1);
		} else {
			setCurrentSlide(currentSlide - data?.length);
		}
	};


	return (
		<div
			className="creator-container relative "
			style={{
				position: "relative",
				zIndex: "2"
			}}>
			<div
				style={{ backgroundImage: "url(/cork.png)" }}
				className="absolute bg-no-repeat bottom-0 lg:left-[-20px] lg:w-full lg:h-full md:w-[450px] md:h-[450px] w-[250px] h-[250px] left-0"></div>
			<h2
				className="title text-align-center sm:mt-[40px] mt-[-100px] lg:mt-[90px] font-[600] sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 z-50">
				TAMTAM CREATORS
			</h2>
			<div className="md:h-screen gradient-div overflow-hidden relative ">
				<div className="relative sm:h-[40vh] h-[220px] md:h-screen"></div>
				<div
					style={{ backgroundImage: "url(/cork.png)" }}
					className="flex justify-center items-center w-full top-1/2 lg:left-[37%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 absolute sm:max-h-[900px] max-h-[220px]">
					<div className="top-0 left-0 w-full h-full container mx-auto hidden sm:flex sm:flex-col overflow-hidden">
						<SwiperTest
							slidesPerView={{ md: 2, lg: 3 }}
							spaceBetween={50}
							onBeforeInit={(swiper) => {
								swiperRef.current = swiper;
							}}
							onSlideChange={() => handleSlideChange()}>
							{mostLikedArtists?.length > 0 &&
								mostLikedArtists.map((artwork, idx) => (
									<SwiperSlide
										key={"mostlikedArtwork-" + idx}
										style={isDisplayBig ? ({ maxWidth: "700px", maxHeight: "700px" }) : ({ width: "100%", maxHeight: "100%" })}>
										<div className="relative w-full h-full object-cover gradient-after">
											{artwork?.fileType !== "VIDEO" ? (
												<>
													<img
														className="w-full h-full after-drop"
														src={
															artwork?.artwork3xThumbnail
																? artwork?.artwork3xThumbnail
																: artwork.imageUrl
														}
														layout="fill"
														objectFit="fill"
														alt={`art`}
													/>
													<div className="absolute flex flex-col justify-center items-center top-0 right-0 bg-cover w-full h-full bg-[rgb(0,0,0,40%)]">
														<h2 className="artist-name text-[40px] md:text-[72px] lg:text-[96px] xl:text-[128px] md:rotate-[10deg] text-white font-bold left-10" >
															{artwork && artwork.authorName}
														</h2>
														<p className="artist-desc text-[13px] md:text-[16px] lg:text-[18px] xl:text-[22px] md:rotate-[10deg] font-semibold">
															{artwork && artwork.description}
														</p>
													</div>
													{artwork?.fileType === "AUDIO" && (
														<div className="absolute AUDIO top-0 left-[6px]  p-2">
															<VolumeUp
																style={{ width: "24px", height: "24px" }}
																className="w-[24px] h-[24px]"
															/>
														</div>
													)}
												</>
											) : (
												<>
													<video
														className={` relative  z-0 w-full h-full object-cover after-drop`}
														src={artwork?.imageUrl}
														loop
														autoPlay
														muted
														playsInline
														alt={artwork.name}>
														<source
															src={artwork?.imageUrl}
															type="video"
														/>
													</video>
													<div className="absolute flex flex-col justify-center  items-center top-0 right-0 w-full h-full bg-[rgb(0,0,0,10%)]">
														<h2 className="artist-name text-[40px] md:text-[72px]  lg:text-[96px] xl:text-[128px] md:rotate-[10deg]">
															{artwork && artwork.authorName}
														</h2>
														<p className="artist-desc text-[12px] md:text-[16px] lg:text-[18px] xl:text-[22px] md:rotate-[10deg]">
															{artwork && artwork.description}
														</p>
													</div>
													<div className="absolute AUDIO top-0 left-[6px]  p-2">
														<PlayCircle
															style={{ width: "24px", height: "24px" }}
															className="w-[24px] h-[24px]"
														/>
													</div>
												</>
											)}
										</div>
									</SwiperSlide>
								))}
						</SwiperTest>
					</div>
					<div className="top-0 left-0 w-full h-[220px] sm:hidden relative">
						<SwiperTest
							slidesPerView={{ md: 2, lg: 3 }}
							spaceBetween={50}
							onBeforeInit={(swiper) => {
								swiperRef.current = swiper;
							}}
							onSlideChange={() => handleSlideChange()}>
							{mobileMostLikedArtists?.length > 0 &&
								mobileMostLikedArtists.map((artwork, idx) => (
									<SwiperSlide
										key={"mobileMostLikedArtists-" + idx}
										style={isDisplayBig ? ({ maxWidth: "360px", maxHeight: "220px" }) : ({ width: "100%", maxHeight: "100%" })}>
										<div className="relative w-full h-full object-cover gradient-after">
											{artwork?.fileType !== "VIDEO" ? (
												<>
													<img
														className="w-full h-full"
														src={
															artwork?.artwork3xThumbnail
																? artwork?.artwork3xThumbnail
																: artwork.imageUrl
														}
														width={360}
														height={220}
														alt={`art`}
													/>
													<div className="absolute flex flex-col justify-center items-center top-0 right-0 bg-cover w-full h-full sm:bg-[rgb(0,0,0,50%)]">
														<h2 className="artist-name text-[40px] md:text-[72px] lg:text-[96px] xl:text-[128px] md:rotate-[10deg] text-white font-bold" >
															{artwork && artwork.authorName}
														</h2>
														<p className="artist-desc text-[13px] md:text-[16px] lg:text-[18px] xl:text-[22px] md:rotate-[10deg] font-semibold">
															{artwork && artwork.description}
														</p>
													</div>
													{artwork?.fileType === "AUDIO" && (
														<div className="absolute AUDIO top-0 left-[6px]  p-2">
															<VolumeUp
																style={{ width: "24px", height: "24px" }}
																className="w-[24px] h-[24px]"
															/>
														</div>
													)}
												</>
											) : (
												<>
													<video
														className={` relative z-0 w-full h-full object-cover after-drop`}
														src={artwork?.imageUrl}
														loop
														autoPlay
														muted
														playsInline
														alt={artwork.name}>
														<source
															src={artwork?.imageUrl}
															type="video"
														/>
													</video>
													<div className="absolute flex flex-col justify-center  items-center top-0 right-0 w-full h-full sm:bg-[rgb(0,0,0,10%)]">
														<h5 className="artist-name text-[40px] md:text-[72px]  lg:text-[96px] xl:text-[128px] md:rotate-[10deg]">
															{artwork && artwork.authorName}
														</h5>
														<p className="artist-desc text-[12px] md:text-[16px] lg:text-[18px] xl:text-[22px] md:rotate-[10deg]">
															{artwork && artwork.description}
														</p>
													</div>
													<div className="absolute AUDIO top-0 left-[6px]  p-2">
														<PlayCircle
															style={{ width: "24px", height: "24px" }}
															className="w-[24px] h-[24px]"
														/>
													</div>
												</>
											)}
										</div>
									</SwiperSlide>
								))}
						</SwiperTest>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MostLikedArtworks;
