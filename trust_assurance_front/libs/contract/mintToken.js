const axios = require("axios");
const Web3 = require("web3");

const web3 = new Web3(window.ethereum);

// get abi, address, account
let simple_abi;
let simpleNftAddress;
let account;

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        const cookieName = decodeURIComponent(cookie[0]);
        const cookieValue = decodeURIComponent(cookie[1]);
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

// mint token
export const mintToken = async (uri, metadata) => {
    if (simple_abi == null || simpleNftAddress == null) {
        // simple_abi set
        const accessToken = getCookie('access_token');
        console.log('accessToken : ', accessToken);
        await axios
            .post('/list/get/contracts', {
                name: 'simple_abi',
                chain: '0x5',
                accessToken: accessToken,
            })
            .then((res) => {
                simple_abi = JSON.parse(res.data.data.value);
            });
        // simpleNftAddress set
        await axios
            .post('/list/get/contracts', {
                name: 'simpleNftAddress',
                chain: '0x5',
                accessToken: accessToken,
            })
            .then((res) => {
                simpleNftAddress = res.data.data.value;
            });

        await axios
            .post('/user/wallet/get/address', {
                accessToken: accessToken,
            })
            .then((res) => {
                account = res.data.wallet_address;
                console.log('account : ', account);
            });
    }

    const contract = new web3.eth.Contract(simple_abi, simpleNftAddress);
    console.log('contract : ', contract);
    console.log('simple_abi : ', simple_abi)
    console.log('simpleNftAddress : ', simpleNftAddress)
    const totalSupply = await contract.methods.totalSupply().call();
    console.log('totalSupply:', totalSupply);

    console.log('uri:', uri);
    console.log('metadata:', metadata);
    console.log('account:', account);
    await contract.methods
        .mintNFT(uri, metadata)
        .send({
            gas: 3000000,
            from: account,
        })
        .on('receipt', function (receipt) {
            console.log('receipt', receipt);

            if (receipt.events.Transfer == 'undefined') {
                console.error('tokenId is not found');
                return;
            }

            const tokenId = receipt.events.Transfer.returnValues['tokenId'];
            console.log('appendList, tokenId', tokenId);
        })
        .on('error', function (err) {
            console.error('err : ', err);
        });
};

export default mintToken;
