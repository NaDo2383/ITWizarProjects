const axios = require('axios');

export default async function handler(req, res) {
    axios.post(process.env.eyesUrl + '/licenses', req.body)
        .then(response => {
            if(response.status === 200){
                res.status(200).json({
                    message: 'success'
                })
            }
        })
        .catch(err => {
            if(err.response){
                res.status(err.response.status).json({
                    message: err.data
                })
            } else {
                res.status(400).json({
                    message: err.message
                })
            }
        })
}