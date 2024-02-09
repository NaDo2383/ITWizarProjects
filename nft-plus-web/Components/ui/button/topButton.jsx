import React, { useRef, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

function TopButton() {
	const chevron = useRef();
	const showChevron = () => {
		if (typeof window !== "undefined" && window.pageYOffset >= 250) {
			chevron.current?.classList.remove("opacity-0");
			chevron.current?.classList.remove("invisible");
			chevron.current?.classList.add("opacity-100");
			chevron.current?.classList.add("visible");
		} else {
			chevron.current?.classList.add("opacity-0");
			chevron.current?.classList.add("invisible");
			chevron.current?.classList.remove("opacity-100");
			chevron.current?.classList.remove("visible");
		}
	};
	const goTop = () => {
		window.scroll({ top: 0, left: 0, behavior: "smooth" });
	};

	useEffect(() => {
		window?.addEventListener("scroll", showChevron.bind(this));

		return () => {
			window?.removeEventListener("scroll", showChevron.bind(this));
		};
	}, []);

	return (
		<button
			className={`fixed border border-white flex cursor-pointer rounded-full lg:w-16 lg:h-16 sm:w-16 sm:h-16 w-12 h-12 bg-gray-200 bottom-8 right-10 opacity-0 invisible transition duration-300 shadow-xl items-center justify-center text-[#666] z-[100]`}
			onClick={goTop}
			ref={chevron}>
			<FaChevronUp className="text-xl" />
		</button>
	);
}

export default TopButton;
