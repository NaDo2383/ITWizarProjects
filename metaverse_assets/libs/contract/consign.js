const axios = require('axios')
const { Web3 } = require('web3')

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
    const cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=')
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
    const Web3 = new Web3(window.ethereum)
    const accessToken = getCookie('access_token')
    process.env.NODE_ENV !== 'production' && console.log('accessToken : ', accessToken)
    // simple_abi set
    await axios
        .post('/list/get/contracts', {
            name: 'simple_abi',
            chain: '0x5',
            accessToken: accessToken,
        })
        .then((res) => {
            simple_abi = JSON.parse(res.data.data.value)
            process.env.NODE_ENV !== 'production' &&
                console.log('simple_abi : ', simple_abi)
        })
    // media_abi set
    await axios
        .post('/list/get/contracts', {
            name: 'media_abi',
            chain: '0x5',
            accessToken: accessToken,
        })
        .then((res) => {
            media_abi = JSON.parse(res.data.data.value)
            process.env.NODE_ENV !== 'production' &&
                console.log('media_abi : ', media_abi)
        })
    // license_abi set
    await axios
        .post('/list/get/contracts', {
            name: 'copyRight_abi',
            chain: '0x5',
            accessToken: accessToken,
        })
        .then((res) => {
            copyright_abi = JSON.parse(res.data.data.value)
            process.env.NODE_ENV !== 'production' &&
                console.log('copyRight_abi : ', copyright_abi)
        })
    // copyRight_abi set
    await axios
        .post('/list/get/contracts', {
            name: 'license_abi',
            chain: '0x5',
            accessToken: accessToken,
        })
        .then((res) => {
            license_abi = JSON.parse(res.data.data.value)
            process.env.NODE_ENV !== 'production' &&
                console.log('license_abi : ', license_abi)
        })
    // simpleNftAddress set
    await axios
        .post('/list/get/contracts', {
            name: 'simpleNftAddress',
            chain: '0x5',
            accessToken: accessToken,
        })
        .then((res) => {
            simpleNftAddress = res.data.data.value
            process.env.NODE_ENV !== 'production' &&
                console.log('simple : ', simpleNftAddress)
        })
    // mediaNftAddress set
    await axios
        .post('/list/get/contracts', {
            name: 'mediaNftAddress',
            chain: '0x5',
            accessToken: accessToken,
        })
        .then((res) => {
            mediaNftAddress = res.data.data.value
            process.env.NODE_ENV !== 'production' &&
                console.log('media : ', mediaNftAddress)
        })
    // licenseNftAddress set
    await axios
        .post('/list/get/contracts', {
            name: 'licenseNftAddress',
            chain: '0x5',
            accessToken: accessToken,
        })
        .then((res) => {
            licenseNftAddress = res.data.data.value
            process.env.NODE_ENV !== 'production' &&
                console.log('license : ', licenseNftAddress)
        })
    // copyRightNftAddress set
    await axios
        .post('/list/get/contracts', {
            name: 'copyrightNftAddress',
            chain: '0x5',
            accessToken: accessToken,
        })
        .then((res) => {
            copyrightNftAddress = res.data.data.value
            process.env.NODE_ENV !== 'production' &&
                console.log('copyright : ', copyrightNftAddress)
        })
    await axios
        .post('/user/wallet/get/address', {
            accessToken: accessToken,
        })
        .then((res) => {
            account = res.data.wallet_address
            process.env.NODE_ENV !== 'production' && console.log('account : ', account)
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
    process.env.NODE_ENV !== 'production' &&
        console.log('setConsign', cancel, from, to, id)
    if (cancel) {
        await cancelConsign(from, id)
        process.env.NODE_ENV !== 'production' && console.log('cancel')
        return 'cancel'
    } else {
        await consign(tokenId, to)
        process.env.NODE_ENV !== 'production' && console.log('consign')
        return 'consign'
    }
}

// 위탁 취소
const cancelConsign = async (from, id) => {
    const mTokenId = id

    if (from !== 'media') {
        return
    }

    // set fromContract
    const mediaContract = new Web3.eth.Contract(media_abi, mediaNftAddress)
    // get nftAddress
    const nftAddress = await mediaContract.methods.NFTaddress(mTokenId).call()
    // set owner
    // const owner = await mediaContract.methods.ownerOf(nftAddress, mTokenId).call()
    // set tokenId
    // const nftId = await mediaContract.methods.tokenID(nftAddress, mTokenId).call()

    // unConsign 위탁취소
    await mediaContract.methods
        .unConsign(nftAddress, mTokenId)
        .send({
            gas: 3000000,
            from: account,
        })
        .on('receipt', async function (receipt) {
            process.env.NODE_ENV !== 'production' && console.log('receipt1', receipt)
        })
}

// 위탁하기
const consign = async (tokenId, to) => {
    if (to === 'media') await consignMedia(tokenId)
    if (to === 'copyright') await consignCopyright(tokenId)
    if (to === 'license') await consignLicense(tokenId)
}

// 미디어NFT로 위임하는 함수
const consignMedia = async (tokenId) => {
    process.env.NODE_ENV !== 'production' && console.log('consignMedia Start!!!')
    // set contract
    const simpleContract = new Web3.eth.Contract(simple_abi, simpleNftAddress)
    const mediaContract = new Web3.eth.Contract(media_abi, mediaNftAddress)
    // get token info
    const simpleOwner = await simpleContract.methods.ownerOf(tokenId).call()
    const simpleUri = await simpleContract.methods.tokenURI(tokenId).call()
    const simpleMetadata = await simpleContract.methods.metadata(tokenId).call()
    // get input data
    const media = JSON.parse(localStorage.getItem('mediaData'))
    const createrName = JSON.parse(localStorage.getItem('creatorNames'))
    const createrId = JSON.parse(localStorage.getItem('creatorIds'))
    const copyright = JSON.parse(localStorage.getItem('copyright'))
    // 사용한 localstorage 삭제
    localStorage.removeItem('mediaData')
    localStorage.removeItem('creatorNames')
    localStorage.removeItem('creatorIds')
    localStorage.removeItem('copyright')
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
    process.env.NODE_ENV !== 'production' && console.log(media)
    process.env.NODE_ENV !== 'production' && console.log(createrName)
    process.env.NODE_ENV !== 'production' && console.log(createrId)
    process.env.NODE_ENV !== 'production' && console.log(copyright)
    process.env.NODE_ENV !== 'production' && console.log('metadata:', metadata)
    // set account
    process.env.NODE_ENV !== 'production' && console.log('account!@!@:', account)
    // consign

    process.env.NODE_ENV !== 'production' &&
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
            .on('receipt', async function (receipt) {
                process.env.NODE_ENV !== 'production' && console.log('receipt1', receipt)
            })
            .on('error', async function (err) {
                console.error('error : ', err)
            })
            .then(async () => {
                await simpleContract.methods
                    .transferFrom(simpleOwner, mediaNftAddress, tokenId)
                    .send({
                        gas: 3000000,
                        from: account,
                    })
                    .on('receipt', async function (receipt) {
                        process.env.NODE_ENV !== 'production' &&
                            console.log('receipt2', receipt)
                        alert('위탁이 완료되었습니다.')
                    })
                    .on('error', async function (err) {
                        console.error(err)
                    })
            })
    } catch (error) {
        alert('위탁이 취소되었습니다.')
    }
}

// 저작권토큰으로 위임하는 함수
async function consignCopyright(mediaId) {
    process.env.NODE_ENV !== 'production' && console.log('consignCopyRight Start!!!')
    process.env.NODE_ENV !== 'production' && console.log('simple_abi : ', simple_abi)
    process.env.NODE_ENV !== 'production' && console.log('media_abi : ', media_abi)
    process.env.NODE_ENV !== 'production' &&
        console.log('simpleNftAddress : ', simpleNftAddress)
    process.env.NODE_ENV !== 'production' &&
        console.log('mediaNftAddress : ', mediaNftAddress)
    // set contract
    // const simpleContract = new Web3.eth.Contract(simple_abi, simpleNftAddress)
    const mediaContract = new Web3.eth.Contract(media_abi, mediaNftAddress)
    const copyrightContract = new Web3.eth.Contract(copyright_abi, copyrightNftAddress)
    // get token info
    const simpleTokenId = await mediaContract.methods
        .tokenID(simpleNftAddress, mediaId)
        .call()
    // const simpleOwner = await simpleContract.methods.ownerOf(simpleTokenId).call()
    // get input data
    const copyrightOwnerName = JSON.parse(localStorage.getItem('copyrightOwnerName'))
    const copyrightOwnerId = JSON.parse(localStorage.getItem('copyrightOwnerId'))
    const copyrightOwnerStake = JSON.parse(localStorage.getItem('copyrightOwnerStake'))
    const copyrightCheck = JSON.parse(localStorage.getItem('copyrigntCheck'))
    const copyrightType = JSON.parse(localStorage.getItem('copyrightType'))
    // const uncheckedType = JSON.parse(localStorage.getItem('uncheckedType'))
    // 사용한 localstorage 삭제
    localStorage.removeItem('copyrightOwnerName')
    localStorage.removeItem('copyrightOwnerId')
    localStorage.removeItem('copyrightOwnerStake')
    localStorage.removeItem('copyrigntCheck')
    localStorage.removeItem('copyrightType')
    localStorage.removeItem('uncheckedType')

    // consign 저작권 유형별로 각각 발행
    for (let i = 0; i < copyrightType.length; i++) {
        process.env.NODE_ENV !== 'production' && console.log(copyrightType[i])
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
            .on('receipt', async function (receipt) {
                process.env.NODE_ENV !== 'production' && console.log('receipt1', receipt)
            })
            .on('error', async function (err) {
                console.error(err)
            })
            .catch((err) => {
                process.env.NODE_ENV !== 'production' &&
                    console.log('Error Message : ', err.message)
            })
    }
}

// 라이센스토큰으로 위임하는 함수
async function consignLicense(copyrightId) {
    // set contract
    const copyrightContract = new Web3.eth.Contract(copyright_abi, copyrightNftAddress)
    const licenseContract = new Web3.eth.Contract(license_abi, licenseNftAddress)

    // get token info
    const mediaTokenId = await copyrightContract.methods.mediaTokenID(copyrightId).call()
    const tokenId = await copyrightContract.methods.tokenID(copyrightId).call()

    // get input data
    const copyrightOwnerName = JSON.parse(localStorage.getItem('ownerName'))
    const copyrightOwnerId = JSON.parse(localStorage.getItem('ownerId'))
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const licenseInfo = JSON.parse(localStorage.getItem('licenseInfo'))
    const constraints = localStorage.getItem('drmInfo')
    const copyrightCheck = JSON.parse(localStorage.getItem('copyrigntCheck'))

    process.env.NODE_ENV !== 'production' &&
        console.log('copyrightOwnerName : ', copyrightOwnerName)
    process.env.NODE_ENV !== 'production' &&
        console.log('copyrightOwnerId : ', copyrightOwnerId)
    process.env.NODE_ENV !== 'production' && console.log('userInfo : ', userInfo)
    process.env.NODE_ENV !== 'production' && console.log('licenseInfo : ', licenseInfo)
    process.env.NODE_ENV !== 'production' && console.log('constraints : ', constraints)
    process.env.NODE_ENV !== 'production' &&
        console.log('copyrigntCheck : ', copyrightCheck)

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
        .on('receipt', async function (receipt) {
            process.env.NODE_ENV !== 'production' && console.log('receipt1', receipt)
        })
        .on('error', async function (err) {
            console.error(err)
        })
        .then(async () => {
            // const licenseId = await licenseContract.methods.licenseTokenId(copyrightId).call()
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
