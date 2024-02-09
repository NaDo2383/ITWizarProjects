import dynamic from "next/dynamic";
import { useEffect } from "react";
import ThumbNail from "Components/entities/artwork/detail/ThumbNail";
import useArtDetail from "Components/entities/artwork/detail/useArtDetail";
import MainInfo from "./MainInfo";
import AuthorDesc from "./AuthorDesc";
import ArtDesc from "./ArtDesc";
import LicenseHistory from "./LicenseHistory";
import ChainInformation from "./ChainInformationl";
import ProjectIntroduction from "Components/entities/events/detail/ProjectIntroductionl";
import ProjectTeamIntroduction from "Components/entities/events/detail/ProjectTeamIntroductionl";
import MobileMainInfo from "./MobileMainInfo";
import { useGlobalContext } from "common/global/useGlobalContext";
import ProjectTransaction from "Components/entities/events/detail/ProjectTransaction";
import ProjectChainInformation from "Components/entities/events/detail/ProjectChainInformation";
import { useRouter } from "next/router";
import useAlertTranslation from "locale/useAlertTranslation";

const TransactionHistory = dynamic(() => import("./TransactionHistory"), {
	ssr: false
});

function ArtDetail(props) {
	const {noArtworkI18} = useAlertTranslation()
	const { artwork, isMobile } = props;
	const { setArtDetail, getArtDetail } = useArtDetail();
	const { authUser } = useGlobalContext();
	const router = useRouter();

	useEffect(() => {
		if (artwork) {
			getArtDetail(artwork?.id)
		} else {
			alert(noArtworkI18)
			router.push('/');
		}
	}, [artwork, authUser?.id]);

	return (
		<div className="w-full pt-5">
			<div className="max-w-[1410px] mx-auto lg:pb-[255px] pb-10">
				<div className="flex w-full gap-6 ls:items-stretch">
					<div className="flex w-full flex-col sm:flex-row lg:flex-row justify-between sm:gap-[30px] gap-[10px]">
						<div className="sm:w-1/2 lg:w-1/2 xl:min-w-[750px lg:min-h-[650px] w-full min-h-[198px] sm:min-h-[650px] xl:w-full">
							<ThumbNail />
						</div>
						<div className="sm:w-1/2 lg:w-1/2 xl:min-w-[630px] lg:min-h-[650px] xl:min-h-[650px] w-full relative">
							<MainInfo />
							<MobileMainInfo />
						</div>
					</div>
				</div>
				{artwork?.isAd ? (
					<>
						<ProjectIntroduction />
						<ProjectTeamIntroduction />
						<div className="sm:hidden">
							<ProjectTransaction />
							<ProjectChainInformation />
						</div>
					</>
				) : (
					<>
						<AuthorDesc />
						<ArtDesc />
						<div className="sm:my-[30px] my-[15px] w-full rounded-[5px] bg-[#252525] overflow-hidden sm:p-[30px] p-[15px]">
							<TransactionHistory />
						</div>
						<LicenseHistory />
						<div className="rounded-[5px] bg-[#252525] overflow-hidden sm:p-[30px] p-[15px] sm:mt-[30px] mt-[15px] ">
							<ChainInformation isEvent={props?.isEvent} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ArtDetail;
