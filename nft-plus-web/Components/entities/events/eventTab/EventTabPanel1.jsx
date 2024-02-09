import React, { useRef, useState, useEffect } from 'react'
import VMFindArtwork from '../VMFindArtworks'
import VMUndiscoveredArtwork from '../VMUndiscoveredArtworks'
import VMFoundArtwork from '../VMFoundArtwoks'
import EventSubTab from '../eventSubTab/EventSubTab'
import useArtworkTranslation from 'locale/useArtworkTranslation'
import { InView } from 'react-intersection-observer';
import useTab from 'Components/ui/tab/useTab'
import useEvent from '../useEvent'

function EventTabPanel1() {
	const { foundArtwork } = useEvent()
	const chevron = useRef();
	const { artworkNFTI18, hiddenNFTI18, discoveredNFTI18 } = useArtworkTranslation()
	const ref = useRef(null);
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const list = [
		{ value: artworkNFTI18, id: 0, href: 0 },
		{ value: hiddenNFTI18, id: 1, href: 1 },
		{ value: discoveredNFTI18, id: 2, href: 2 }
	]
	const list2 = [
		{ value: artworkNFTI18, id: 0, href: 0 },
		{ value: hiddenNFTI18, id: 1, href: 1 }
	]
	const { setSubTabIndex, subTabIndex } = useTab()
	const [isScrolling, setIsScrolling] = useState(false)

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

	const handleClick = (tabIdx) => {
		setIsScrolling(true);

		const scrollingPromise = new Promise((resolve) => {
			if (tabIdx === 0) {
				ref.current?.scrollIntoView({ behavior: "smooth" });
				window.scroll({ top: 640, left: 0, behavior: "smooth" });
			} else if (tabIdx === 1) {
				ref1.current?.scrollIntoView({ behavior: "smooth" });
			} else if (tabIdx === 2) {
				ref2.current?.scrollIntoView({ behavior: "smooth" });
			}
			// Set a timeout or use event listener to detect the end of scrolling
			setTimeout(() => {
				resolve(); // Resolve the promise after completing the scrolling action
			}, 1000); // Adjust the timeout as needed
		});

		scrollingPromise.then(() => {
			setIsScrolling(false);
		});
	};

	const setInView = (inView, entry) => {
		if (inView && !isScrolling) {
			const observedSection = entry?.target?.querySelector('section');
			const observedElementId = observedSection?.id;
			setSubTabIndex(+observedElementId)
		}
	};

	useEffect(() => {
		window?.addEventListener("scroll", showChevron.bind(this));
		return () => {
			window?.removeEventListener("scroll", showChevron.bind(this));
		};
	}, []);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		handleClick(0)
	// 	}, 1000);
	// }, [foundArtwork, findArtwork, undiscoveredArtwork]);

	return (
		<div>
			<EventSubTab
				subTabHeader={foundArtwork?.length > 0 ? list : list2}
				handleClick={handleClick}
			/>
			<InView
				onChange={(inView, entry) => setInView(inView, entry)}
				threshold={[0, 1]}
			>
				<section className='page' id="0">
					<div ref={ref} className="relative lg:top-[-120px] top-[-220px]"></div>
					<VMFindArtwork handleClick={handleClick} />
				</section>
			</InView>
			<InView
				onChange={(inView, entry) => setInView(inView, entry)}
				threshold={[0, 1]}
			>
				<section className='page' id="1">
					<div ref={ref1} className="relative lg:top-[-120px] sm:top-[-220px] top-[-160px]"></div>
					<VMUndiscoveredArtwork handleClick={handleClick} />
				</section>
			</InView>
			<InView
				onChange={(inView, entry) => setInView(inView, entry)}
				threshold={[0, 1]}
			>
				{foundArtwork?.length > 0 &&
					<section className='page' id="2">
						<div ref={ref2} className="relative lg:top-[-120px] sm:top-[-220px] top-[-160px]"></div>
						<VMFoundArtwork handleClick={handleClick} />
					</section>}
			</InView>
		</div>
	)
}

export default EventTabPanel1