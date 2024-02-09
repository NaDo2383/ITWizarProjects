/**
 * @createdBy Phill Anderson 2022/12/27
 */
import useCommonTranslation from "locale/useCommonTranslation";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";

const ArtworkContext = createContext({});
const ArtworkProvider = ({ children }) => {
  const { byPopularityI18, byPriceI18, sortI18, newestI18 } =
		useCommonTranslation();
  const { locale, query } = useRouter();
  const [coverNotImageFile, setCoverNotImageFile] = useState();
  const [tenSecTemp, setTenSecTemp] = useState();
  const [recommendedArtworks, setRecommendedArtworks] = useState([]);
  const [mostLikedArtworks, setMostLikedArtworks] = useState([]);
  const [artworksByCatName, setArtworksByCatName] = useState([]);
  const [artworksByFavorited, setArtworksByFavorited] = useState([]);
  const [artworksByStocked, setArtworksByStocked] = useState([]);
  const [artworksByOnsale, setArtworksByOnsale] = useState([]);
  const [artworkCategories, setArtworkCategories] = useState([]);
  const [artworkRights, setArtworkRights] = useState([]);
  const [artworkUpdate, setArtworkUpdate] = useState([]);
  const [marketArts, setMarketArts] = useState(null);
  const [competitionArtworks, setCompetitionArtworks] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [artworkRandomIds, setArtworkRandomIds] = useState([]);
  const [marketArtQueryStr, setMarketArtQueryStr] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ownedArtworks, setOwnedArtworks] = useState([]);
  const [artworksPending, setArtworksPending] = useState([]);
  const [competitionId, setCompetitionId] = useState(0);
  const [filterTerm, setFilterTerm] = useState({
    checkOwnsArt: false,
    checkAllRights: false,
    currency: null
  });
  const [deletionArtwork, setDeletionArtwork] = useState({
    deletedPendingArtwork: null,
    deletedArtwork: false
  });

  const [artworkLoading, setArtworkLoading] = useState({
    recommendedArtLoading: false,
    mostLikedArtLoading: false,
    recentArtLoading: false,
    artworkCategoryLoading: false,
    artworkByCategoryLoading: false,
    artworksByFavoritedLoading: false,
    artworksByStockedLoading: false,
    artworksByOnsaleLoading: false,
    marketArtsLoading: false,
    mainArtworkLoading: false
  });
  
  const [artPagination, setArtPagination] = useState({
    page: 1,
    size: 8
  });
  const [ innerSelectedCompetition, setInnerSelectedCompetition ] = useState(null)
  
  const selectOptions = [
    {
      title: sortI18,
			value: "random",
			isShow: false
		},
		{
      title: newestI18,
			value: "minted_date,desc",
			isShow: false
		},
		{
			title: byPriceI18,
			value: "price,desc",
			isShow: false
		},
		{
      title: byPopularityI18,
			value: "like_count,desc",
			isShow: false
		}
	];
  const selectOptionsTab = [
    {
      title: "All",
			value: "minted_date,desc",
			isShow: false,
      categoryId: ""
		},
		{
      title: "디지털 아트",
			value: "minted_date,desc",
			isShow: false,
      categoryId: "1"
		},
		{
			title: "영상",
			value: "minted_date,desc",
			isShow: false,
      categoryId: "3"
		},
		{
      title: "NFT 작품",
			value: "minted_date,desc",
			isShow: false,
      categoryId: "6"
		},
    {
      title: "음원",
			value: "minted_date,desc",
			isShow: false,
      categoryId: "4"
		},
		{
			title: '사진',
			value: "minted_date,desc",
			isShow: false,
      categoryId: "2"
		},
		{
      title: "기타",
			value: "minted_date,desc",
			isShow: false,
      categoryId: "5"
		}
	];

  const [sortTerms, setSortTerms] = useState(selectOptions[query.sortID? +query.sortID :0]);

  const [sortTermsTab, setSortTermsTab] = useState(selectOptionsTab[query.sortTabID? +query.sortTabID :0]);
  
  useEffect(() => {
    setSortTerms((prev) => ({ ...prev, title: sortI18 }));
  }, [locale]);

  useEffect(() => {
    setSortTermsTab((prev) => ({ ...prev, title: "All" }));
  }, [locale]);

  return (
    <ArtworkContext.Provider
      value={{
        recommendedArtworks,
        setRecommendedArtworks,
        mostLikedArtworks,
        setMostLikedArtworks,
        artworkLoading,
        setArtworkLoading,
        artworkCategories,
        setArtworkCategories,
        artworksByCatName,
        setArtworksByCatName,
        artworkRights,
        setArtworkRights,
        artworksByFavorited,
        setArtworksByFavorited,
        artworksByStocked,
        setArtworksByStocked,
        artworksByOnsale,
        setArtworksByOnsale,
        artPagination,
        setArtPagination,
        marketArts,
        setMarketArts,
        artworkRandomIds,
        setArtworkRandomIds,
        marketArtQueryStr,
        setMarketArtQueryStr,
        selectedCategory,
        setSelectedCategory,
        filterTerm,
        setFilterTerm,
        sortTerms,
        setSortTerms,
        ownedArtworks,
        setOwnedArtworks,
        artworksPending,
        setArtworksPending,
        competitionArtworks,
        setCompetitionArtworks,
        competitions,
        setCompetitions,
        deletionArtwork,
        setDeletionArtwork,
        artworkUpdate,
        setArtworkUpdate,
        coverNotImageFile,
        setCoverNotImageFile,
        tenSecTemp,
        setTenSecTemp,
        selectOptions,
        selectOptionsTab,
        competitionId, 
        setCompetitionId,
        innerSelectedCompetition, 
        setInnerSelectedCompetition
      }}>
      {children}
    </ArtworkContext.Provider>
  );
};

const useArtworkContext = () => useContext(ArtworkContext);

export { ArtworkContext, ArtworkProvider, useArtworkContext };
