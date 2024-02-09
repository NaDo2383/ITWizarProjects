import Web3 from "web3"

const axios = require("axios")

// abi
let simple_abi
let media_abi
let copyright_abi
let license_abi

// contract address
let simpleNftAddress
let mediaNftAddress
let copyrightNftAddress
let licenseNftAddress

// get account
let account

function getCookie(name) {
    const cookies = document.cookie.split("; ")
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=")
        const cookieName = decodeURIComponent(cookie[0])
        const cookieValue = decodeURIComponent(cookie[1])
        if (cookieName === name) {
            return cookieValue
        }
    }
    return null
}

// get abi and address from server
export const getAbiAndAddress = async () => {
    const web3 = new Web3(window.ethereum)
    var accessToken = getCookie("access_token")
    console.log("accessToken: ", accessToken)
    if (!accessToken) {
        const refreshToken = getCookie("refresh_token")
        console.log("refreshToken: ", refreshToken)
        if (!refreshToken) {
            alert("sign in again")
            return
        } else {
            await axios
                .post("/api/user/reflashToken", {
                    reflashToken: refreshToken,
                })
                .then((res) => {
                    accessToken = res.data.accessToken
                    console.log("accessToken2: ", res.data.accessToken)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    console.log("accessToken1: ", accessToken)
    // simple_abi set
    await axios
        .post("/api/list/get/contracts", {
            name: "simple_abi",
            chain: "0x539",
            accessToken: accessToken,
        })
        .then((res) => {
            simple_abi = JSON.parse(res.data.data.value)
            console.log("simple_abi : ", simple_abi)
        })
        .catch((err) => {
            console.log(err)
        })
    // media_abi set
    await axios
        .post("/api/list/get/contracts", {
            name: "media_abi",
            chain: "0x539",
            accessToken: accessToken,
        })
        .then((res) => {
            media_abi = JSON.parse(res.data.data.value)
            console.log("media_abi : ", media_abi)
        })
        .catch((err) => {
            console.log(err)
        })
    // license_abi set
    await axios
        .post("/api/list/get/contracts", {
            name: "copyRight_abi",
            chain: "0x539",
            accessToken: accessToken,
        })
        .then((res) => {
            copyright_abi = JSON.parse(res.data.data.value)
            console.log("copyRight_abi : ", copyright_abi)
        })
        .catch((err) => {
            console.log(err)
        })
    // copyRight_abi set
    await axios
        .post("/api/list/get/contracts", {
            name: "license_abi",
            chain: "0x539",
            accessToken: accessToken,
        })
        .then((res) => {
            license_abi = JSON.parse(res.data.data.value)
            console.log("license_abi : ", license_abi)
        })
        .catch((err) => {
            console.log(err)
        })
    // simpleNftAddress set
    await axios
        .post("/api/list/get/contracts", {
            name: "simpleNftAddress",
            chain: "0x539",
            accessToken: accessToken,
        })
        .then((res) => {
            simpleNftAddress = res.data.data.value
            console.log("simple : ", simpleNftAddress)
        })
        .catch((err) => {
            console.log(err)
        })
    // mediaNftAddress set
    await axios
        .post("/api/list/get/contracts", {
            name: "mediaNftAddress",
            chain: "0x539",
            accessToken: accessToken,
        })
        .then((res) => {
            mediaNftAddress = res.data.data.value
            console.log("media : ", mediaNftAddress)
        })
        .catch((err) => {
            console.log(err)
        })
    // licenseNftAddress set
    await axios
        .post("/api/list/get/contracts", {
            name: "licenseNftAddress",
            chain: "0x539",
            accessToken: accessToken,
        })
        .then((res) => {
            licenseNftAddress = res.data.data.value
            console.log("license : ", licenseNftAddress)
        })
        .catch((err) => {
            console.log(err)
        })
    // copyRightNftAddress set
    await axios
        .post("/api/list/get/contracts", {
            name: "copyrightNftAddress",
            chain: "0x539",
            accessToken: accessToken,
        })
        .then((res) => {
            copyrightNftAddress = res.data.data.value
            console.log("copyright : ", copyrightNftAddress)
        })
        .catch((err) => {
            console.log(err)
        })
    await axios
        .post("/api/user/wallet/get/address", {
            accessToken: accessToken,
        })
        .then((res) => {
            account = res.data.wallet_address
            console.log("account : ", account)
        })
        .catch((err) => {
            console.log(err)
        })
}

// 위탁 설정/취소
// id parametr n NFT Token ID yum shig bn.
// from parametr n "media", "copyright", "license" gesn enum avah yum shig bn.
// to parametr n "media", "copyright", "license" gesn enum avah yum shig bn.
// cancel boolean yum shig bn.
export const setConsign = async (cancel, from, to, id) => {
    if (
        simple_abi == null ||
        media_abi == null ||
        license_abi == null ||
        copyright_abi == null ||
        simpleNftAddress == null ||
        mediaNftAddress == null ||
        licenseNftAddress == null ||
        copyrightNftAddress == null ||
        account == null
    ) {
        await getAbiAndAddress()
    }
    const tokenId = Number(id)
    console.log("setConsign", cancel, from, to, id)
    if (cancel) {
        await cancelConsign(from, id)
        console.log("cancel")
        return "cancel"
    } else {
        await consign(tokenId, to)
        console.log("consign")
        return "consign"
    }
}

// 위탁 취소
const cancelConsign = async (from, id) => {
    const mTokenId = id

    if (from !== "media") {
        return
    }

    // set fromContract
    const mediaContract = new web3.eth.Contract(media_abi, mediaNftAddress)
    // get nftAddress
    const nftAddress = await mediaContract.methods.NFTaddress(mTokenId).call()
    // set owner
    const owner = await mediaContract.methods.ownerOf(nftAddress, mTokenId).call()
    // set tokenId
    const nftId = await mediaContract.methods.tokenID(nftAddress, mTokenId).call()

    // unConsign 위탁취소
    await mediaContract.methods
        .unConsign(nftAddress, mTokenId)
        .send({
            gas: 3000000,
            from: account,
        })
        .on("receipt", async function (receipt) {
            console.log("receipt1", receipt)
        })
}

// 위탁하기
const consign = async (tokenId, to) => {
    if (to === "media") await consignMedia(tokenId)
    if (to === "copyright") await consignCopyright(tokenId)
    if (to === "license") await consignLicense(tokenId)
}

// 미디어NFT로 위임하는 함수
const consignMedia = async (tokenId) => {
    console.log("consignMedia Start!!!")
    // set contract
    const simpleContract = new web3.eth.Contract(simple_abi, simpleNftAddress)
    const mediaContract = new web3.eth.Contract(media_abi, mediaNftAddress)
    // get token info
    const simpleOwner = await simpleContract.methods.ownerOf(tokenId).call()
    const simpleUri = await simpleContract.methods.tokenURI(tokenId).call()
    const simpleMetadata = await simpleContract.methods.metadata(tokenId).call()
    // get input data
    const media = JSON.parse(localStorage.getItem("mediaData"))
    const createrName = JSON.parse(localStorage.getItem("creatorNames"))
    const createrId = JSON.parse(localStorage.getItem("creatorIds"))
    const copyright = JSON.parse(localStorage.getItem("copyright"))
    // 사용한 localstorage 삭제
    localStorage.removeItem("mediaData")
    localStorage.removeItem("creatorNames")
    localStorage.removeItem("creatorIds")
    localStorage.removeItem("copyright")
    // set metadata
    const metadata = JSON.stringify({
        NFTID: tokenId,
        mediaInfo: {
            mediaName: media[0],
            mediaDescription: media[1],
            mediaURL: media[2],
            mediaHash: media[3],
            mediaDNA: media[4],
        },
        createrInfo: {
            createrName: createrName,
            createrID: createrId,
        },
        copyrightInfo: {
            violateCopyright: copyright[0],
            reportCopyright: copyright[1],
        },
    })
    console.log(media)
    console.log(createrName)
    console.log(createrId)
    console.log(copyright)
    console.log("metadata:", metadata)
    // set account
    console.log("account!@!@:", account)
    // consign

    console.log(
        simpleNftAddress,
        tokenId,
        simpleUri,
        simpleMetadata,
        media,
        createrName,
        createrId,
        copyright
    )
    try {
        await mediaContract.methods
            .consign(
                simpleNftAddress,
                tokenId,
                simpleUri,
                simpleMetadata,
                media,
                createrName,
                createrId,
                copyright
            )
            .send({
                gas: 3000000,
                from: account,
            })
            .on("receipt", async function (receipt) {
                console.log("receipt1", receipt)
            })
            .on("error", async function (err) {
                console.error("error : ", err)
            })
            .then(async () => {
                await simpleContract.methods
                    .transferFrom(simpleOwner, mediaNftAddress, tokenId)
                    .send({
                        gas: 3000000,
                        from: account,
                    })
                    .on("receipt", async function (receipt) {
                        console.log("receipt2", receipt)
                        alert("위탁이 완료되었습니다.")
                    })
                    .on("error", async function (err) {
                        console.error(err)
                    })
            })
    } catch (error) {
        alert("위탁이 취소되었습니다.")
    }
}

// 저작권토큰으로 위임하는 함수
async function consignCopyright(mediaId) {
    console.log("consignCopyRight Start!!!")
    console.log("simple_abi : ", simple_abi)
    console.log("media_abi : ", media_abi)
    console.log("simpleNftAddress : ", simpleNftAddress)
    console.log("mediaNftAddress : ", mediaNftAddress)
    // set contract
    const simpleContract = new web3.eth.Contract(simple_abi, simpleNftAddress)
    const mediaContract = new web3.eth.Contract(media_abi, mediaNftAddress)
    const copyrightContract = new web3.eth.Contract(copyright_abi, copyrightNftAddress)
    // get token info
    const simpleTokenId = await mediaContract.methods
        .tokenID(simpleNftAddress, mediaId)
        .call()
    const simpleOwner = await simpleContract.methods.ownerOf(simpleTokenId).call()
    // get input data
    const copyrightOwnerName = JSON.parse(localStorage.getItem("copyrightOwnerName"))
    const copyrightOwnerId = JSON.parse(localStorage.getItem("copyrightOwnerId"))
    const copyrightOwnerStake = JSON.parse(localStorage.getItem("copyrightOwnerStake"))
    const copyrightCheck = JSON.parse(localStorage.getItem("copyrigntCheck"))
    const copyrightType = JSON.parse(localStorage.getItem("copyrightType"))
    const uncheckedType = JSON.parse(localStorage.getItem("uncheckedType"))
    // 사용한 localstorage 삭제
    localStorage.removeItem("copyrightOwnerName")
    localStorage.removeItem("copyrightOwnerId")
    localStorage.removeItem("copyrightOwnerStake")
    localStorage.removeItem("copyrigntCheck")
    localStorage.removeItem("copyrightType")
    localStorage.removeItem("uncheckedType")

    // consign 저작권 유형별로 각각 발행
    for (let i = 0; i < copyrightType.length; i++) {
        console.log(copyrightType[i])
        await copyrightContract.methods
            .consign(
                mediaId,
                simpleTokenId,
                copyrightOwnerName,
                copyrightOwnerId,
                copyrightOwnerStake,
                copyrightType[i],
                copyrightCheck
            )
            .send({
                gas: 3000000,
                from: account,
            })
            .on("receipt", async function (receipt) {
                console.log("receipt1", receipt)
            })
            .on("error", async function (err) {
                console.error(err)
            })
            .catch((err) => {
                console.log("Error Message : ", err.message)
            })
    }
}

// 라이센스토큰으로 위임하는 함수
async function consignLicense(copyrightId) {
    // set contract
    const copyrightContract = new web3.eth.Contract(copyright_abi, copyrightNftAddress)
    const licenseContract = new web3.eth.Contract(license_abi, licenseNftAddress)

    // get token info
    const mediaTokenId = await copyrightContract.methods.mediaTokenID(copyrightId).call()
    const tokenId = await copyrightContract.methods.tokenID(copyrightId).call()

    // get input data
    const copyrightOwnerName = JSON.parse(localStorage.getItem("ownerName"))
    const copyrightOwnerId = JSON.parse(localStorage.getItem("ownerId"))
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const licenseInfo = JSON.parse(localStorage.getItem("licenseInfo"))
    const constraints = localStorage.getItem("drmInfo")
    const copyrightCheck = JSON.parse(localStorage.getItem("copyrigntCheck"))

    console.log("copyrightOwnerName : ", copyrightOwnerName)
    console.log("copyrightOwnerId : ", copyrightOwnerId)
    console.log("userInfo : ", userInfo)
    console.log("licenseInfo : ", licenseInfo)
    console.log("constraints : ", constraints)
    console.log("copyrigntCheck : ", copyrightCheck)

    // consign
    await licenseContract.methods
        .consign(
            copyrightId,
            mediaTokenId,
            tokenId,
            copyrightOwnerName,
            copyrightOwnerId,
            userInfo,
            constraints,
            licenseInfo,
            copyrightCheck
        )
        .send({
            gas: 3000000,
            from: account,
        })
        .on("receipt", async function (receipt) {
            console.log("receipt1", receipt)
        })
        .on("error", async function (err) {
            console.error(err)
        })
        .then(async () => {
            const licenseId = await licenseContract.methods
                .licenseTokenId(copyrightId)
                .call()
            await licenseContract.methods.findToken(copyrightId).call()
        })
}

export {
    simple_abi,
    media_abi,
    copyright_abi,
    license_abi,
    simpleNftAddress,
    mediaNftAddress,
    copyrightNftAddress,
    licenseNftAddress,
    account,
}
export default setConsign
