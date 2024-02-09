import useMyPageTranslation from "locale/useMypageTranslation";
import Image from "next/image";
import React from "react";

export function ArtCreator(props) {
	const { authorName, authorProfileImg } = props.data;

	return (
		<Mini>
			<div className="relative w-[25px] h-[25px] rounded-full flex items-end justify-center overflow-hidden false ">
				<Image
					src={authorProfileImg || "/def_pro.png"}
					unoptimized
					layout="fill"
					objectFit="cover"
					alt="authorProfileImg"
				/>
			</div>
			<h3 className="font-[400] text-[14px] text-[#fff]">{authorName}</h3>
		</Mini>
	);
}

export function OwnsAllLicenses() {
	const { ownsAllLicencesI18 } = useMyPageTranslation();
	return (
		<Mini>
			<Image
				src="/Wavy_Check.svg"
				width="24px"
				height="24px"
				objectFit="contain"
				alt="Wavy_Check"
			/>
			<p>{ownsAllLicencesI18}</p>
		</Mini>
	);
}

function Mini({ children }) {
	return (
		<div className="flex gap-1 justify-center items-center">{children}</div>
	);
}
