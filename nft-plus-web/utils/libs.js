export const apis = {
	home: "/",
	login: "/login",
	logout: "/logout",
	search: "/market?artworkName",
	notifcationCount: "/notifications/count",
	notifcation: "/notification/logs",
	fees: "/fees",
	userProfile: "/me",
	artworkDelete: "/artwork",
	userDeactivate: "/user ",
	notices: "/userguide/notices",
	notice: "/userguide/notice",
	noticesCategory: "/notice/categories",
	faqs: "/userguide/faqs",
	categorys: "/userguide/faq/categories",
	qna: "/userguide/qna",
	qnas: "/userguide/qnas",
	qnaCategory: "/userguide/qna/categories",
	createQna: "/userguide/qna",
	allArtworks: "/artworks",
	downloadNft: "/downloadNft",
	artwork: "/artwork",
	artworksRecent: "/artworks/recent",
	artworkCategories: "/artwork/categories",
	mostLikedArtworks: "/artworks/most/liked",
	recommendedArtworks: "/artworks/recommended",
	artworkCategoryByName: "/artworks/recent?category=",
	artRights: "/artwork/usage/rights",
	artworkUpdate: "/artwork/update",
	saveArtwork: "/artwork/register",
	searchArtwork: "/artworks/ids?searchword=",
	artworkDetail: "/artwork/detail",
	artworkUpdatePrice: "/artwork/updatePrice",
	artworkHeart: "/artwork/heart",
	artworkNotMarket: "/artwork/status/change/notmarket",
	artworkBuyRequest: "/artwork/sell-request/",
	artworkMarket: "/artwork/status/change/market",
	artworkRandomIds: "/artworks/ids",
	stockWorks: "/artwork/list/stock",
	onSaleArtworks: "/artwork/list/sell",
	heartedArtworks: "/artwork/list/hearted",
	sendhearth: "/artwork/heart",
	unSendHearth: "/artwork/unheart",
	artworksPending: "/artwork/list_pending",
	artworkMint: "/artwork/minting",
	artworkNotMint: "/artwork/notMinting",
	artworkMintDb: "/mint",
	// competition Artworks apis
	competitionDetail: "/competitions/",
	competitions: "/competitions",
	competitionsBanners: "/competition/banners",
	competitionSettings: "/competition/settings",
	//ownership apis
	ownershipLogList: "/ownership/log/list",
	ownershipLogRegister: "/ownership/log/register",
	// licenseRequest apis
	licenseRequestRegister: "/license/request/register",
	licenseRequestList: "/license/request/list",
	licensesPaid: "/license/request/list/paid",
	licenseIssuance: "fees/LICENSE_ISSUANCE?currency=",
	licenseApprove: "/license/request/approve",
	licenseDenyReason: "/license/request/deny/reason",
	licenseContractRegister: "/license/contract/register",
	//wallet apis
	wallet: "/wallets",
	//edit profile apis
	editProfileImg: "/user/update/profile/img",
	editProfileDesc: "/user/update/profile/desc",
	editProfilePassword: "/user/password/change",
	editProfile: "/user/profile",
	setDefaultProfileImg: "/user/image",
	setDefaultBannerImg: "/user/bg",
	setDefaultArtistImg: "/user/artist-img",
	// event
	event: "/events",
	eventDetail: "/events",
	airdrop: "/vm/ad/",
	findArtwork: "/vm/works",
	undiscoveredArtwork: "/vm/works",
	foundArtwork: "/vm/works?projectId=",
	verificationQr: "/getVerificationQr",
	verifyQr: "/verifyQr",
	otpVerify: "/otpVerify",
	cancelOtp: "/cancelOtp",
	// artist
	heartedArtist: "/art/hearted",
	listedArtist: "/art/list",
	authorArtist: "/art/author",
	artist: "/artist",
	notificationSettings: "/notifications",
	notificationSettingsLog: "/notification/logs",
	notificationSettingsCount: "/notifications/count",
	artistIntroductionDetail:"/about/artists",
	// serviceInfo
	serviceInfo: "/serviceInfo",
	privacyPolicy: "/serviceInfo/privacy",
	servicePolicy: "/serviceInfo/service",
	terms: "/serviceInfo/terms",
	ipinExist: "/check/ipinExist",
	emailVerify: "/email-verify",
	//banner apis
	topBanner: "/banners/top",
	bottomBanner: "/banners/bottom",
	//about page apis
	about: "/abouts",
	//auction
	auction: "/auction",
	//
	events: "/vm/projects",
	// vim
	topNotification: "/top/notification",
	userViews: "/userviews",
};

export const storages = {
	loggedUser: "user",
	userCredentials: "uc"
};

export const fileTypes = [
	"PNG",
	"GIF",
	"JPG",
	"JPEG",
	"MP3",
	"WAV",
	"MP4",
	"AVI",
	"MOV",
	"MPEG"
];

export const imgTypes = ["PNG", "GIF", "JPG", "JPEG"];

export const commonNotImageTypes = [
	"audio/mpeg",
	"audio/mp3",
	"audio/wav",
	"video/mp4",
	"video/avi",
	"video/quicktime"
];

export const bannedFileType = [
	"application/pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.ms-excel",
	"text/plain"
];
export const commonVideoTypes = ["video/mp4", "video/avi", "video/quicktime"];
export const commonAudioTypes = ["audio/mpeg", "audio/mp3", "audio/wav"];

export const videoTypes = ["MP4", "AVI", "MOV"];
export const audioTypes = ["MP3", "WAV"];

export const ARTWORK_STATUS = {
	ADMIN_PENDING: "ADMIN_PENDING",
	GASFEE_PENDING: "GASFEE_PENDING",
	MINTED: "MINTED",
	NFT_SALE: "NFT_SALE",
	NFT_NOT_SALE: "NFT_NOT_SALE",
	NFT_PRICE: "NFT_PRICE",
	NFT_SELLER: "NFT_SELLER",
	NFT_BUYER: "NFT_BUYER",
	LICENSE_PENDING: "LICENSE_PENDING",
	LICENSE_PAYMENT_PENDING: "LICENSE_PAYMENT_PENDING",
	LICENSE_DENIED: "LICENSE_DENIED",
	LICENSE_PAID: "LICENSE_PAID",
	ARTWORK_LIKE: "ARTWORK_LIKE",
	ARTWORK_SELL_REQUEST: "ARTWORK_SELL_REQUEST",
	ADMIN_DENIED: "ADMIN_DENIED",
	AUCTION_REGISTER: "AUCTION_REGISTER",
	AUCTION_EXPIRED: "AUCTION_EXPIRED",
	BID_ADDED: "BID_ADDED",
	BID_REGISTER: "BID_REGISTER",
	BID_WITHDRAW: "BID_WITHDRAW",
	AUCTION_COMPLETED: "AUCTION_COMPLETED",
	BID_SUCCESS: "BID_SUCCESS",
	ARTWORK_LIKE: "ARTWORK_LIKE",
};
