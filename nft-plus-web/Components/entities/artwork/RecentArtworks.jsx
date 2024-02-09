/**
 * @createdBy duka 6/22
 */
import React from "react";
import Image from "next/image";
import circle from "public/circles.png";
import pinkCircle from "public/pinkCircles.png";
import MainEventBanner from "../banner/MainEventBanner";

function RecentArtworks() {
	return (
		<div className="w-full flex flex-col sm:gap-[80px] lg:min-h-screen lg:max-h-screen text-center pt-[80px] lg:pt-[320px] relative mb-[200px] md:mb-[400px]">
			<div className="absolute lg:bottom-[-320px] md:bottom-[50px] bottom-[150px] right-0">
				<div className="relative min-w-screen w-screen">
					<Image src={circle} alt="circle" />
				</div>
			</div>
			<div
				className="absolute lg:bottom-[-680px] md:bottom-[-440px] bottom-[10px] lg:right-[0px]"
				style={{ zIndex: "3" }}>
				<Image  src={pinkCircle} alt="pinkCircle" />
			</div>
			<h2 className="title sm:mb-[60px] mt-[120px] lg:mb-[124px]">EVENT</h2>
			<div className="px-[10px]"><MainEventBanner /></div>
			<div
				className="absolute bottom-[-250px] left-[150px] h-[61px] w-[60px] bg-no-repeat bg-center "
				style={{
					backgroundImage: "url('/star3.png')"
				}}></div>
		</div>
	);
}

export default RecentArtworks;
