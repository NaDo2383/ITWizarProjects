import React, { useEffect, useState } from "react";
import { useGlobalContext } from "common/global/useGlobalContext";
import MarketCategories from "./MarketCategories";

function FilterArtworkCategories({changeQuery}) {
	const [fixed, setFixed] = useState(false);
	const { globalItems } = useGlobalContext();
	const { isShowFilter } = useGlobalContext();
	const { distance, setDistance } = useGlobalContext();

	const hangle = () => {
		typeof window !== "undefined" && setDistance(window.pageYOffset);
	};

	function checkScrollHeight() {
		if (window.pageYOffset > globalItems?.header?.clientData?.clientHeight) {
			setFixed(true);
		} else {
			setFixed(false);
		}
	}
	useEffect(() => {
		function handleScroll() {
			checkScrollHeight();
		}

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		window?.addEventListener("scroll", hangle.bind(this));

		return () => {
			window?.removeEventListener("scroll", hangle.bind(this));
		};
	}, [distance]);

	return (
		<div
			className={`w-full ${
				distance >= 79 &&
				`fixed top-[65px] shadow-xl px-8 lg:top-[75px] pt-10 md:top-[85px]`
			} filter-artwork flex items-center justify-center`}
			style={{
				width: distance >= 79 && isShowFilter ? "calc(100% - 250px)" : "100%",
				height: distance
					? `${globalItems?.header?.clientData?.clientHeight}px`
					: "auto",
				transform: distance ? "translateY(0)" : "",
				transition: "all 300ms",
				zIndex: 20
			}}>
			{/*<FilterButton />*/}
			<MarketCategories changeQuery={changeQuery}/>
		</div>
	);
}

export default FilterArtworkCategories;
