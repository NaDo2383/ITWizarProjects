const Web3 = require('web3')

import {
    simple_abi,
    media_abi,
    simpleNftAddress,
    mediaNftAddress,
    account,
    getAbiAndAddress,
} from './consign'

export const verify = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()
    process.env.NODE_ENV !== 'production' && console.log('simple_abi', simple_abi)
    process.env.NODE_ENV !== 'production' &&
        console.log('simpleNftAddress', simpleNftAddress)
    const simpleContract = new web3.eth.Contract(simple_abi, simpleNftAddress)
    const simpleUri = await simpleContract.methods.metadata(tokenId).call()
    process.env.NODE_ENV !== 'production' && console.log('simpleUri', simpleUri)
    return simpleUri
}

export const consignMedia = async (tokenId, metaData) => {
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()
    process.env.NODE_ENV !== 'production' && console.log('consignMedia Start!!!')
    const simpleContract = new web3.eth.Contract(simple_abi, simpleNftAddress)
    const mediaContract = new web3.eth.Contract(media_abi, mediaNftAddress)
    const simpleOwner = await simpleContract.methods.ownerOf(tokenId).call()
    const simpleUri = await simpleContract.methods.tokenURI(tokenId).call()
    const simpleMetadata = await simpleContract.methods.metadata(tokenId).call()
    // const metadata = JSON.stringify(metaData)
    process.env.NODE_ENV !== 'production' &&
        console.log('simpleNftAddress:', simpleNftAddress)
    process.env.NODE_ENV !== 'production' && console.log('tokenId:', tokenId)
    process.env.NODE_ENV !== 'production' && console.log('simpleUri:', simpleUri)
    process.env.NODE_ENV !== 'production' &&
        console.log('simpleMetadata:', simpleMetadata)
    process.env.NODE_ENV !== 'production' &&
        console.log('metaData?.media:', metaData?.media)
    process.env.NODE_ENV !== 'production' &&
        console.log(
            'metaData?.createrInfo?.createrName:',
            metaData?.createrInfo?.createrName
        )
    process.env.NODE_ENV !== 'production' &&
        console.log('metaData?.createrInfo?.createrID:', metaData?.createrInfo?.createrID)
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
        console.error(error)
        alert('위탁이 취소되었습니다.')
    }
}

export const mintMedia = async (metaData) => {
    const web3 = new Web3(window.ethereum)
    await getAbiAndAddress()
    process.env.NODE_ENV !== 'production' && console.log('consignMedia Start!!!')
    const simpleContract = new web3.eth.Contract(simple_abi, simpleNftAddress)
    const totalSupply = await simpleContract.methods.totalSupply().call()
    process.env.NODE_ENV !== 'production' && console.log('totalSupply:', totalSupply)
    const mediaContract = new web3.eth.Contract(media_abi, mediaNftAddress)
    // const simpleOwner = await simpleContract.methods.ownerOf(totalSupply + 1).call()
    const simpleUri = await simpleContract.methods.tokenURI(totalSupply + 1).call()
    // const simpleMetadata = await simpleContract.methods.metadata(totalSupply + 1).call()
    process.env.NODE_ENV !== 'production' &&
        console.log('simpleNftAddress:', simpleNftAddress)
    process.env.NODE_ENV !== 'production' && console.log('tokenId:', totalSupply + 1)
    process.env.NODE_ENV !== 'production' && console.log('simpleUri:', simpleUri)
    process.env.NODE_ENV !== 'production' && console.log('mediaInfo:', metaData?.media)
    process.env.NODE_ENV !== 'production' &&
        console.log('creatorNames:', metaData?.createrInfo?.createrName)
    process.env.NODE_ENV !== 'production' &&
        console.log('creatorIds:', metaData?.createrInfo?.createrID)
    try {
        await mediaContract.methods
            .consign(
                simpleNftAddress,
                totalSupply + 1,
                simpleUri,
                metaData?.media,
                metaData?.createrInfo?.createrName,
                metaData?.createrInfo?.createrID,
                [false, false]
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
    } catch (error) {
        console.error(error)
        alert('위탁이 취소되었습니다.')
    }
}
