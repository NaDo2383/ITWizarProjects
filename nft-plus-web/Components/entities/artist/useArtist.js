import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import { useRouter } from "next/router";
import { useState } from "react";
import { apis } from "utils/libs";
import { useArtistContext } from "./useArtistContext";
import { useGlobalContext } from "common/global/useGlobalContext";
import usePopup from "Components/ui/popup/usePopup";

const useArtist = () => {
  const { locale } = useRouter()
  const { getModel, postModel } = useCrud();
  const { calcMessage } = useMessageFactory();
  const [data, setData] = useState([]);
  const [artist, setArtist] = useState([]);
  const { artistList, setArtisList,  artistBanners, setArtistBanners, artistIntroduction, setArtistIntroduction } = useArtistContext()
  const [loading, setLoading] = useState(false);
  const { setGlobalLoading, setIsShowArtistSearchBar, authUser } = useGlobalContext()
  const [filterState, setFilterState] = useState({
    page: "0",
    stype : "",
    type : "",
    sort: "id,desc"
  });
  const router = useRouter();
  const { id } = router.query;
  const { MODAL_TYPES, handleShowModal } = usePopup(); 
  const lang = locale === 'en' ? 'en' : 'kr'
  async function getAuthorArts() {
    setLoading(true);
    try {
      const res = await getModel(
        apis.authorArtist +
          "/" +
          id +
          "?page=" +
          filterState.page +
          "&stype=" + filterState.stype +
          "&type=" + filterState.type +
          "&" +
          "sort=" +
          filterState.sort +
          (filterState.ownsArt ? "&" + "ownsArt=" + filterState.ownsArt : "") +
          (filterState.rights ? "&" + "rights=" + filterState.rights : "") +
          (filterState.currency ? "&" + "currency=" + filterState.currency : "")
        , true
      );
      setData(res?.result);
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoading(false);
    }
  }
  async function getListArts() {
    setLoading(true);
    try {
      const res = await getModel(
        apis.listedArtist +
          "/" +
          id +
          "?page=" +
          filterState.page +
          "&stype=" + filterState.stype +
          "&type=" + filterState.type +
          "&" +
          "sort=" +
          filterState.sort +
          (filterState.ownsArt ? "&" + "ownsArt=" + filterState.ownsArt : "") +
          (filterState.rights ? "&" + "rights=" + filterState.rights : "") +
          (filterState.currency ? "&" + "currency=" + filterState.currency : "")
        , true
          );
      setData(res?.result);
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoading(false);
    }
  }
  async function getHeartedArts() {
    setLoading(true);
    try {
      const res = await getModel(
        apis.heartedArtist +
          "/" +
          id +
          "?page=" +
          filterState.page +
          "&" +
          "sort=" +
          filterState.sort +
          (filterState.ownsArt ? "&" + "ownsArt=" + filterState.ownsArt : "") +
          (filterState.rights ? "&" + "rights=" + filterState.rights : "") +
          (filterState.currency ? "&" + "currency=" + filterState.currency : "")
          , true
          );
      setData(res?.result);
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoading(false);
    }
  }
  async function getArtist(artistId) {
    setLoading(true);
    try {
      const res = await getModel(apis.artist + "/" + artistId);
      setArtist(res);
    } catch (e) {
      const msg = calcMessage(e?.response?.status);
      return msg;
    } finally {
      setLoading(false);
    }
  }

  async function getArtists(queryString) {
    setGlobalLoading(true)
    try {
      const res = await getModel(apis.artist)
      setArtisList(res?.result)
      return res?.result
    } catch(e) {
      const msg = calcMessage(e?.response?.status)
      return msg
    } finally {
      setGlobalLoading(false)
    }
  }

  async function getArtistBanners(){
      try {
        const res = await getModel(`/about/artists?lang=${lang}`)
        setArtistBanners(res)
        return res
      }catch(e){
        const msg = calcMessage(e?.response?.status)
        return msg
      }
  }

  async function handleArtistHeart(id, likeState, setLikeState){
    if( !authUser ) {
			handleShowModal(MODAL_TYPES.LOGIN_POPUP)
			return
		}
    try {
      const { success, data  } = await postModel(`/about/artists/${id}/like`, null, true)
      success && setLikeState((prev) => ({isLiked: data.liked, likeCount: data.liked? prev.likeCount+1 : prev.likeCount-1}))
      return res
    }catch(e){
      const msg = calcMessage(e?.response?.status)
      return msg
    } 
}



async function getArtistIntroduction( id ){
  setGlobalLoading(true)
  setLoading(true)
  try {
    const res = await getModel(apis.artistIntroductionDetail + `/${id}?lang=${lang}`, true)
    setArtistIntroduction(res.result)
    return res
  }catch(e){
    const msg = calcMessage(e?.response?.status)
    return msg
  }  finally {
    setGlobalLoading(false);
    setLoading(false);
  }
}

function gotoArtistDetail(artistId) {
  router.push('/artist/' + artistId)
  setIsShowArtistSearchBar(false)
}

  return {
    gotoArtistDetail,
    getArtistBanners,
    getArtists,
    getAuthorArts,
    getHeartedArts,
    getListArts,
    data,
    loading,
    setFilterState,
    filterState,
    getArtist,
    setArtist,
    artist,
    artistList,
    handleArtistHeart,
    getArtistIntroduction,
    artistIntroduction, 
    setArtistIntroduction
  };
};

export default useArtist;
