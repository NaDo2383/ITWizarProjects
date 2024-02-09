import React, { useRef, useEffect } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

function BottomBtn() {
	const arrowDown = useRef();
	const showArrowDown = () => {
		if (typeof window !== "undefined" && window.pageYOffset >= 250) {
			arrowDown.current?.classList.remove("opacity-100");
			arrowDown.current?.classList.remove("visible");
			arrowDown.current?.classList.add("opacity-0");
			arrowDown.current?.classList.add("invisible");
		} else {
			arrowDown.current?.classList.add("opacity-100");
			arrowDown.current?.classList.add("visible");
			arrowDown.current?.classList.remove("opacity-0");
			arrowDown.current?.classList.remove("invisible");
		}
	};
	const goBottom = () => {
		//	window.scroll({ bottom: 0, left: 0, behavior: "smooth" });
		document.getElementById("recommendedArtWorks").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
	};

	useEffect(() => {
		window?.removeEventListener("scroll", showArrowDown.bind(this));

		return () => {
			window?.addEventListener("scroll", showArrowDown.bind(this));
		};
	}, []);

	return (
		<>
			<button
				className="flex justify-center items-center lg:w-[112px] lg:h-[112px] md:w-[92px] md:h-[92px] w-[50px] h-[50px] border rounded-full z-30 cursor-pointer animationBtn"
				style={{
					background: "rgba(255, 255, 255, 3%)",
					borderColor: "rgba(255, 255, 255, 3%)"
				}}
				onClick={goBottom}
				ref={arrowDown}>
				<AiOutlineArrowDown className="lg:text-xl text-sm" />
			</button>
		</>
	);
}

export default BottomBtn;
