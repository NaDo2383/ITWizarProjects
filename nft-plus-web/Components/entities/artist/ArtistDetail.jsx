import { useState, useEffect } from "react";
import ArtistDetailBanner from "Components/entities/artist/ArtistDetailBanner";
import { useRouter } from "next/router";
import useCommonTranslation from "locale/useCommonTranslation";
import useArtist from "./useArtist";
import ArtistProfile from "./ArtistProfile";
import ArtistTab from "./artistTab/ArtistTab";

export default function ArtistDetail(props) {
	const { locale } = useRouter();
	const {
		setFilterState,
		filterState,
		setArtist,
		artist
	} = useArtist();
	const { sortI18 } = useCommonTranslation();
	const router = useRouter();
	const id = router.query.id;
	const [sortDescription, setSortDescription] = useState("최신순");

	useEffect(() => {
		if (id) {
			setArtist((prev) => ({ ...prev, result: props.artist }));
		}
	}, [id]);

	useEffect(() => {
		setSortDescription(sortI18);
	}, [locale, sortI18]);

	const filterTest = (state) => {
		setFilterState({
			...filterState,
			ownsArt: state?.ownsArt,
			currency: state.currency,
			rights: state?.rights
		});
	};
	
	return (
		<>
			<ArtistDetailBanner artist={artist} />
			<ArtistProfile 
				tamtamApproved={artist?.result?.tatamApproved}
				name={artist?.result?.nickName}
				avatar={artist?.result?.profileImgUrl}
				description={artist?.result?.description}
				instagram={artist?.result?.instagramUrl}
				facebook={artist?.result?.facebookUrl}
				twitter={artist?.result?.twitterUrl}
			/>
			<div className="container mx-auto flex-1 pt-[0] lg:pt-[0] w-full flex overflow-hidden">
				<ArtistTab />
			</div>
		</>
	);
}
