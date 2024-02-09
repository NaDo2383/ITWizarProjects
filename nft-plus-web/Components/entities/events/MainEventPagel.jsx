import { ArtworkProvider } from "../artwork/useArtworkContext";
import Container from "Components/ui/containers/Container";
import EventBanner from "./EventBanner";
import EventTab from "./eventTab/EventTab";
import Link from "next/link";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { TabProvider } from "Components/ui/tab/useTabContext";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import useEvent from "./useEvent";
import useCommonTranslation from "locale/useCommonTranslation";
import Image from "next/image";
import { useGlobalContext } from "common/global/useGlobalContext";

function MainEventPage() {
	const { preparingEventI18 } = useCommonTranslation();
	const { recieveAirdropsResponsiveI18 } = useArtworkTranslation();
	const router = useRouter();
	const { totalEvents, getTotalEvent, eventsLoading } = useEvent();

	useEffect(() => {
		const handleRouteChange = () => {
			window.scrollTo(0, 0);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		// Restore scroll behavior when navigating back or forward in history
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	useEffect(() => {
		getTotalEvent()
	}, []);

	return (
		<>
			<ArtworkProvider>
				<TabProvider>
					{!eventsLoading && (
						totalEvents?.length > 0 ?
							<>
								<p className="sm:hidden text-[#E0E6E8] font-mont text-[20px] font-medium tracking-[-0.3px] mt-[25px] mb-[15px] w-full text-center">VM</p>
								<div className="overflow-hidden">
									<EventBanner />
									<div className="px-[16px]">
										<Link href={"/events/claimArtwork"} passHref>
											<div className="sm:hidden p-[5px_20px_5px_20px] rounded-[5px] bg-[#2C2C2C] flex justify-between items-center w-full h-[61px] mx-auto text-[15px] font-medium text-[#FFF] sm:mb-[22px] mb-[37px]">
												<div>
													{recieveAirdropsResponsiveI18}
												</div>
												<div>
													<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
														<path d="M1 1L6.45455 6L1 11" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</div>
											</div>
										</Link>
									</div>
									<Container>
										<EventTab />
									</Container>
								</div>

							</>
							:
							<>
								<div className="flex justify-center items-center w-full min-h-full max-h-screen">
									<div className="flex flex-col justify-center items-center">
										<div className="image-container">
											<Image
												src="/vmmachine/vmmachine.png"
												width={284}
												height={284}
												objectFit="contain"
												alt="vm_machine"
											/>
										</div>
										<p className="text-[#E0E6E8] text-[20px] font-[500] leading-[28px] mb-[373px]">
											{preparingEventI18}
										</p>
									</div>
								</div>
								<style jsx>
									{`
										.image-container {
											margin-top: 215px;
										}           
									`}
								</style>
							</>
					)}
				</TabProvider>
			</ArtworkProvider>
		</>
	);
}
export default MainEventPage;
