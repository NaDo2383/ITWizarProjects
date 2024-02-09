/**
 * @createdBy duka 6/22
 */
import React, { useEffect } from "react";
import useArtwork from "./useArtwork";
import RecommendedCard from "./RecommendedCard";

function RecommendedArtworks() {
	const { getRecommendedArtworks } = useArtwork();

	useEffect(() => {
		getRecommendedArtworks();
	}, []);

	return (
		// <Parallax>
		<div
			className="relative flex flex-col m-auto justify-between items-center max-w-[1392px] w-full h-full md:h-full 2xl:h-[690px] sm:h-[690px] max-h-[360px] md:mt-[50px]"
			id="recommendedArtWorks">
			<h2 className="title text-center lg:mb-[160px] mt-[27px] z-10">
				TAMTAM VALUE
			</h2>
			<RecommendedCard />
		</div>
		// </Parallax>
	);
}

export default RecommendedArtworks;
