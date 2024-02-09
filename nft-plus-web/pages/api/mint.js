const axios = require('axios');

export default async function handler(req, res) {
    // https://energy.lsware.com:9004/v2/nfts
    // http://3.38.53.55:9004/v2/nfts
    try {
        await axios.post(process.env.eyesUrl + '/nfts', req.body);
        res.status(200).json({
            message: 'success'
        })
    } catch (err) {
        if(err.response){
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