/**
 * @createdBy duka 6/22
 */
import RecommendedArtworks from "Components/entities/artwork/RecommendedArtworks";
import MostLikedArtworks from "Components/entities/artwork/MostLikedArtworks";
import { ArtworkProvider } from "Components/entities/artwork/useArtworkContext";
import RecentArtworks from "Components/entities/artwork/RecentArtworks";
import BottomBanner from "Components/entities/banner/BottomBanner";
import TopBanner from "Components/entities/banner/TopBanner";
import Seo from "common/seo/Seo";
import BottomBtn from "Components/ui/button/bottomBtn";

function Home() {
	return (
		<>
			<Seo
				title=""/>
			<>
				<div className="relative max-w-screen overflow-hidden -mt-[120px] pt-[120px]">
					<div>
					<TopBanner />
					<div className="translate-y-[-5rem] md:translate-y-[-22rem] flex items-center justify-center m-auto">
						<BottomBtn />
					</div>
					<div
						className="absolute w-[230px] md:block h-[400px]  md:h-[1000px] md:w-[600px] md:top-[600px] xl:h-[1500px] xl:top-[200px] bg-cover left-0 top-[10%] bg-no-repeat pointer-events-none"
						style={{ backgroundImage: "url('/hourIcon.png')" }}>
						{/* <Image src={hourIcon} alt="hourIcon" /> */}
					</div>	
					<div
					className="absolute top-[10%] -right-[27%] w-[222px] h-[222px] bg-cover md:top-[50px] lg:top-[200px] xl:top-[200px] 2xl:top-[65px] lg:w-[640px] xl:w-[750px] 2xl:w-[1000px] lg:h-[640px] xl:h-[750px] 2xl:h-[1000px] lg:bg-[length:640px_640px] xl:bg-[length:750px_750px] 2xl:bg-[length:1000px_1000px] lg:left-[69%] md:left-[640px] md:right-0 bg-no-repeat bg-center pointer-events-none"
					style={{
						backgroundImage: "url('/spine.png')"
					}}>
					</div>			
					<ArtworkProvider>
						<RecommendedArtworks />
						<RecentArtworks />
						<MostLikedArtworks />
					</ArtworkProvider>
					</div>
					<BottomBanner />
				</div>
			</>
		</>
	);
}
export default Home;
