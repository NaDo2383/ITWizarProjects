/**
 * @createdBy Phill Anderson 2022/12/27
 */
import { useRouter } from "next/router";
import React, { createContext, useState, useContext } from "react";

const EventContext = createContext({});
const EventProvider = ({ children }) => {
	const { locale } = useRouter();
	const [load, setLoad] = useState(false);
	const [eventDetail, setEventDetail] = useState({ intro: "" });
	const [findArtwork, setFindArtWork] = useState([]);
	const [undiscoveredArtwork, setUndiscoveredArtWork] = useState([]);
	const [foundArtwork, setFoundArtWork] = useState([]);
	const [adCodeResult, setAdCodeResult] = useState({});
	const [totalEvents, setTotalEvents] = useState({});
	const [activeEventId, setActiveEventId] = useState();
	const [limitStrVMAllNFT, setLimitStrVMAllNFT] = useState(false)
	const [limitStrVMundiscoveredNFT, setLimitStrVMundiscoveredNFT] = useState(false)
	const [limitStrVMfoundNFT, setLimitStrVMfoundNFT] = useState(false)
	const [eventsLoading, setEventsLoading] = useState(true)

	return (
		<EventContext.Provider
			value={{
				eventDetail,
				setEventDetail,
				findArtwork,
				setFindArtWork,
				undiscoveredArtwork,
				setUndiscoveredArtWork,
				foundArtwork,
				setFoundArtWork,
				locale,
				load,
				setLoad,
				adCodeResult,
				setAdCodeResult,
				totalEvents,
				setTotalEvents,
				activeEventId,
				setActiveEventId,
				limitStrVMAllNFT,
				setLimitStrVMAllNFT,
				limitStrVMundiscoveredNFT,
				setLimitStrVMundiscoveredNFT,
				limitStrVMfoundNFT,
				setLimitStrVMfoundNFT,
				eventsLoading, 
				setEventsLoading
			}}>
			{children}
		</EventContext.Provider>
	);
};

const useEventContext = () => useContext(EventContext);

export { EventContext, EventProvider, useEventContext };
