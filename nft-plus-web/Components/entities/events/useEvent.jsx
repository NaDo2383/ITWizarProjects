/**
 * @createdBy Phill Anderson 2022/2/27
 */
import { apis } from "utils/libs";
import useCrud from "common/axios/crud";
import { useEventContext } from "./useEventContext";
import { useEffect } from "react";
import { useGlobalContext } from "common/global/useGlobalContext";
import useAlertTranslation from "locale/useAlertTranslation";
import usePopup from "Components/ui/popup/usePopup";

function useEvent() {
	const { getModel, postModel } = useCrud();
	const {vmSuccessI18, vmAlreadyI18, vmNotArtworkI18} = useAlertTranslation()
	const { setGlobalLoading } = useGlobalContext();
	const { handleShowModal, MODAL_TYPES } = usePopup();
	const {
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
		setAdCodeResult,
		totalEvents,
		setTotalEvents,
		activeEventId,
		setActiveEventId,
		eventsLoading,
		setEventsLoading
	} = useEventContext();

	const getEvent = async (eventId) => {
		setGlobalLoading(true);
		try {
			const res = getModel(apis.events + "/" + eventId)
				.then((result) => {
					setEventDetail(result);
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setGlobalLoading(false);
				});
		} catch (e) { }
	};

	const getTotalEvent = async () => {
		setGlobalLoading(true)
		setEventsLoading(true)
		try {
			const res = getModel(apis.events)
				.then((result) => {
					setActiveEventId(result[0].id);
					setTotalEvents(result);
					getEvent(result[0].id);
					getAllEventArtworks(result[0].id);
					getUndiscoveredArtworks(result[0].id);
					getFoundArtworks(result[0].id);
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setGlobalLoading(false)
					setEventsLoading(false)
				});
		} catch (e) { }
	};

	const getAllEventArtworks = async (eventId) => {
		setGlobalLoading(true);
		try {
			const res = getModel(apis.findArtwork + `?projectId=${eventId}`)
				.then((result) => {
					setFindArtWork(result);
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setGlobalLoading(false);
				});
		} catch (e) { }
	};
	const getUndiscoveredArtworks = async (eventId) => {
		setGlobalLoading(true);
		try {
			const res = getModel(apis.undiscoveredArtwork + "?projectId=" + eventId + "&type=1")
				.then((result) => {
					setUndiscoveredArtWork(result);
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setGlobalLoading(false);
				});
		} catch (e) { }
	};
	const getFoundArtworks = async (eventId) => {
		setGlobalLoading(true);
		try {
			const res = getModel(apis.foundArtwork + eventId + "&type=2", true)
				.then((result) => {
					setFoundArtWork(result);
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setGlobalLoading(false);
				});
		} catch (e) { }
	};
	const getAirDropArtwork = async (adCode) => {
		setLoad(true);
		setGlobalLoading(true)
		try {
			const res = postModel(apis.airdrop + adCode, {}, true)
				.then((result) => {
					if (result.success) {
						setAdCodeResult(result);
						handleShowModal(MODAL_TYPES?.AD_CODE_3);
						setGlobalLoading(false)
					} else if (+result?.reason.code === 405) {
						alert("failed.air.dropped");
						setGlobalLoading(false)
					} else if (+result?.reason.code === 404) {
						setGlobalLoading(false)
						handleShowModal(MODAL_TYPES?.AD_CODE_1)
					} else if (+result?.reason.code === 400) {
						setGlobalLoading(false)
						handleShowModal(MODAL_TYPES?.AD_CODE_2);
					}
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					//setGlobalLoading(false)
					setLoad(false);
				});
		} catch (e) { }
	};

	// useEffect(() => {
	// 	getEvent()
	// 	getFoundArtworks();
	// },[activeEventId])


	return {
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
		getEvent,
		getAllEventArtworks,
		getUndiscoveredArtworks,
		getFoundArtworks,
		getAirDropArtwork,
		getTotalEvent,
		totalEvents,
		activeEventId,
		setActiveEventId,
		eventsLoading, 
		setEventsLoading
	};
}

export default useEvent;
