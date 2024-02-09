import Web3 from "web3"
import {
    simple_abi,
    media_abi,
    copyright_abi,
    license_abi,
    simpleNftAddress,
    mediaNftAddress,
    copyrightNftAddress,
    licenseNftAddress,
    account,
    getAbiAndAddress,
} from "./consign"

export const verify = async (tokenId, nftAddress) => {
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()
    console.log("simple_abi", simple_abi)
    console.log("simpleNftAddress: ", simpleNftAddress)
    console.log("nftAddress: ", nftAddress)
    const simpleContract = new web3.eth.Contract(simple_abi, nftAddress)
    const simpleUri = await simpleContract.methods.metadata(tokenId).call()
    console.log("simpleUri: ", simpleUri)
    if (!simpleUri) {
        return
    }
    return simpleUri
}

export const consignMedia = async (
    tokenId,
    metaData,
    cb,
    cb1,
    setLoading,
    setLoadingWithContract
) => {
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()
    console.log("consignMedia Start!!!")
    console.log("tokenId: ", tokenId)
    const simpleContract = new web3.eth.Contract(simple_abi, simpleNftAddress)
    const mediaContract = new web3.eth.Contract(media_abi, mediaNftAddress)
    const simpleOwner = await simpleContract.methods.ownerOf(tokenId).call()
    const simpleUri = await simpleContract.methods.tokenURI(tokenId).call()
    const simpleMetadata = await simpleContract.methods.metadata(tokenId).call()

    console.log({
        1: simpleNftAddress,
        2: tokenId,
        3: simpleUri,
        4: simpleMetadata,
        5: metaData?.media,
        6: metaData?.createrInfo?.createrName,
        7: metaData?.createrInfo?.createrID,
        8: [false, false],
    })

    try {
        await mediaContract.methods
            .consign(
                simpleNftAddress,
                tokenId,
                simpleUri,
                simpleMetadata,
                metaData?.media,
                metaData?.createrInfo?.createrName,
                metaData?.createrInfo?.createrID,
                [false, false]
            )
            .send({
                gas: 3000000,
                from: account,
            })
            .on("receipt", async function (receipt) {
                console.log("receipt1", receipt)
                cb1({
                    status: "successful",
                    newId: receipt.events.consignNFT.returnValues.tokenId,
                })
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
                        cb({
                            status: "successful",
                            consignedNFTAdress: receipt.events.Transfer.address,
                        })
                    })
                    .on("error", async function (err) {
                        console.error(err)
                        cb({ status: "failed" })
                    })
            })
    } catch (error) {
        console.error(error)
        cb({ status: "failed" })
        alert("위탁이 취소되었습니다.")
    } finally {
        setLoadingWithContract(false)
        setLoading(false)
    }
}
//here is newmin
export const mintMedia = async (metaData, cb, setLoading) => {
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()
    console.log("mintMedia Start!!!")
    console.log("media_abi: ", media_abi)
    console.log("mediaNftAddress: ", mediaNftAddress)
    const mediaNFT = new web3.eth.Contract(media_abi, mediaNftAddress)
    const totalSupply = await mediaNFT.methods.totalSupply().call()
    const mediaContract = new web3.eth.Contract(media_abi, mediaNftAddress)
    console.log("totalSupply: ", totalSupply)
    console.log("totalSupply type: ", typeof totalSupply)
    console.log("consign payload: ", {
        1: mediaNftAddress,
        2: Number(totalSupply) + 1,
        3: metaData?.image,
        4: "test",
        5: metaData?.media,
        6: metaData?.createrName,
        7: metaData?.createrID,
        8: [false, false],
    })
    try {
        await mediaContract.methods
            .consign(
                mediaNftAddress,
                Number(totalSupply) + 1,
                metaData?.image,
                "test",
                metaData?.media,
                metaData?.createrName,
                metaData?.createrID,
                [false, false]
            )
            .send({
                gas: 3000000,
                from: account,
            })
            .on("receipt", async function (receipt) {
                console.log("receipt1", receipt)
                const res = { receipt: receipt, code: "succcessful" }
                cb({ ...res, newId: Number(totalSupply) + 1 })
            })
            .on("error", async function (err) {
                console.error("error : ", err)
            })
    } catch (error) {
        console.error(error)
        console.log(error)
        alert("위탁이 취소되었습니다.")
        return
    } finally {
        setLoading(false)
    }
}

export async function consignCopyright(payload, cb, setLoading) {
    console.log(payload)
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()
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
    console.log(copyrightContract)
    // const simpleTokenId = await mediaContract.methods
    //     .tokenID(mediaNftAddress, payload.mediaId)
    //     .call()
    // get input data
    const {
        mediaId,
        copyrightType,
        copyrightOwnerName,
        copyrightOwnerId,
        copyrightOwnerStake,
    } = payload

    console.log("payload: ", {
        1: payload.mediaId,
        2: payload.srcTokenId,
        3: copyrightOwnerName,
        4: copyrightOwnerId,
        5: copyrightOwnerStake,
        6: copyrightType,
        7: [false, false],
    })
    // consign 저작권 유형별로 각각 발행
    for (let i = 0; i < copyrightType.length; i++) {
        await copyrightContract.methods
            .consign(
                payload.mediaId,
                payload.srcTokenId,
                copyrightOwnerName,
                copyrightOwnerId,
                copyrightOwnerStake,
                copyrightType[i],
                [false, false]
            )
            .send({
                gas: 3000000,
                from: account,
            })
            .on("receipt", async function (receipt) {
                console.log("receipt1", receipt)
                cb({ code: "successfully" })
            })
            .on("error", async function (err) {
                console.error(err)
            })
            .catch((err) => {
                console.log("Error Message : ", err.message)
            })
    }

    setLoading(false)
}

export async function consignLicense(copyrightId, payload, cb, setLoading) {
    console.log("copyrightId: ", copyrightId)
    console.log("payload: ", payload)
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()
    // set contract
    const copyrightContract = new web3.eth.Contract(copyright_abi, copyrightNftAddress)
    const licenseContract = new web3.eth.Contract(license_abi, licenseNftAddress)

    // get token info
    const mediaTokenId = await copyrightContract.methods.mediaTokenID(copyrightId).call()
    const tokenId = await copyrightContract.methods.tokenID(copyrightId).call()

    // get input data
    const { copyrightOwnerName, copyrightOwnerId, userInfo, licenseInfo } = payload

    console.log({
        1: copyrightId,
        2: mediaTokenId,
        3: tokenId,
        4: copyrightOwnerName,
        5: copyrightOwnerId,
        6: userInfo,
        7: "Available only in Korea, not under 12 years old",
        8: [payload.licenseInfo, ""],
        9: [false, false],
    })

    const price = Math.pow(10, 18) * payload.price
    // consign
    await licenseContract.methods
        .consign(
            copyrightId,
            +mediaTokenId,
            +tokenId,
            copyrightOwnerName,
            copyrightOwnerId,
            userInfo,
            "Available only in Korea, not under 12 years old",
            [licenseInfo, ""],
            [false, false]
        )
        .send({
            gas: 3000000,
            from: account,
            value: price,
        })
        .on("receipt", async function (receipt) {
            console.log("receipt1", receipt)
            cb({ status: "successful" })
        })
        .on("error", async function (err) {
            console.error(err)
            cb({ status: "faied" })
        })
        .then(async () => {
            const licenseId = await licenseContract.methods
                .licenseTokenId(copyrightId)
                .call()
            await licenseContract.methods.findToken(copyrightId).call()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
}

export const cancelConsign = async (id, consignedNftAddress, cb) => {
    const mTokenId = id
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()

    // set fromContract
    const mediaContract = new web3.eth.Contract(media_abi, mediaNftAddress)
    // get nftAddress
    const nftAddress = await mediaContract.methods.NFTaddress(mTokenId).call()
    // set owner
    const owner = await mediaContract.methods.ownerOf(nftAddress, mTokenId).call()
    // set tokenId
    const nftId = await mediaContract.methods.tokenID(nftAddress, mTokenId).call()
    console.log("consignedNftAddress", consignedNftAddress)
    console.log({
        1: mTokenId,
        2: nftAddress,
    })

    // unConsign 위탁취소
    await mediaContract.methods
        .unConsign(nftAddress, mTokenId)
        .send({
            gas: 3000000,
            from: account,
        })
        .on("receipt", async function (receipt) {
            console.log("receipt1", receipt)
            cb({ status: "successful" })
        })
        .catch((err) => {
            cb({ status: "failed" })
            console.log("Error Message : ", err)
        })
}
