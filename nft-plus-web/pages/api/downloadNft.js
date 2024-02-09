const axios = require('axios');

export default async function downLoadNft(req, res) {
    const { url } =  JSON.parse(req.body);
    let imageUrl = url;
    try {
        if(url?.startsWith("ipfs://")){
            let firstUrl = url?.startsWith("ipfs://") ? url.substring(7) : url
            const { data } = await axios.get("https://ipfs.io/ipfs/" + firstUrl)
            const nUrl = data["image"];
            imageUrl = nUrl.startsWith("ipfs://") ? "https://ipfs.io/ipfs/" + nUrl.substring(7) : nUrl
        } 
        res.status(200).json({ "url": imageUrl })
    } catch (err) {
        if (err.response) {
            res.status(err.response.status).json({
                message: err.data
            })
        } else {
            res.status(400).json({
                message: err.message
            })
        }
    }
}