import useCrud from "common/axios/crud";
import { useGlobalContext } from "common/global/useGlobalContext";
import useMessageFactory from "common/message/useMessageFactory";
import React, { useState } from "react";
import { apis } from "utils/libs";
import { useArtworkContext } from "../artwork/useArtworkContext";

function useCompetition() {
  const [banners, setBanners] = useState([]);
  const { 
    setGlobalLoading, 
    competitionSettings, 
    setCompetitionSettings ,
    setGlobalItems
  } = useGlobalContext();
  const { getModel, postModel } = useCrud();
  const { calcMessage } = useMessageFactory();
  const {
    competitionArtworks,
    setCompetitionArtworks,
    artPagination,
    setArtPagination,
    competitions,
    setCompetitions,
    competitionId, 
    setCompetitionId,
    innerSelectedCompetition, 
    setInnerSelectedCompetition
  } = useArtworkContext();

  function setCompetitionIntoGlobalItems(competition) {
    setGlobalItems((prev) => ({
      ...prev,
      competitions: {
        ...prev.competitions,
        selectedCompetition: competition
      }
    }))
  }

  function setSortCompetitionIntoGlobalItems(sortObject) {
    setGlobalItems((prev) => ({
      ...prev,
      competitions: {
        ...prev.competitions,
        selectedSortCompetition: sortObject
      }
    }))
  }

  async function getCompetitions() {
    setGlobalLoading(true);
    try {
      const res = await getModel(apis.competitions);
      setCompetitions(res);
      setCompetitionId(res?.result[0].id);
      setInnerSelectedCompetition(res?.result[0]);
      return res?.result;
    } catch (e) {
      if (e?.response.status) {
        return calcMessage(e?.response.status);
      }
      throw new Error(e);
    } finally {
      setGlobalLoading(false);
    }
  }
  async function getCompetitionsBanners() {
    try {
      const res = await getModel(apis.competitionsBanners);
      setBanners(res);
      return res?.result;
    } catch (e) {
      if (e?.response.status) {
        return calcMessage(e?.response.status);
      }
      throw new Error(e);
    }
  }

  async function getCompetitionArtworks(data ,isProtected = false) {
    setGlobalLoading(true);
    try {
      const res = await postModel(apis.allArtworks, data, isProtected);
      setCompetitionArtworks(res?.data);
      return res?.result;
    } catch (e) {
      if (e?.response.status) {
        return calcMessage(e?.response.status);
      }
      console.error(e);
    } finally {
      setGlobalLoading(false);
    }
  }

  async function getCompetitionSettings() {
        setGlobalLoading(true)
    try {
      const res = await getModel(apis.competitionSettings)
      setCompetitionSettings(res?.result)
      return res
    } catch(e) {
      console.error(e)
      if(e?.response.status) {
        return calcMessage(e?.response.status)
      }
    } finally {
        setGlobalLoading(false)
    }
  }

  return {
    setSortCompetitionIntoGlobalItems,
    setCompetitionIntoGlobalItems,
    competitionArtworks,
    getCompetitions,
    artPagination,
    setArtPagination,
    competitions,
    getCompetitionArtworks,
    getCompetitionsBanners,
    banners,
    competitionSettings, 
    getCompetitionSettings,
    competitionId, 
    setCompetitionId,
    innerSelectedCompetition, 
    setInnerSelectedCompetition
  };
}

export default useCompetition;
