const axios = require('axios');

export default async function handler(req, res) {
    try {
        const { data } =  await axios.post(`${process.env.trustVerificationUrl}/trust_veri_corp_api/trustCertificateCorp`, req.body, {
            headers: {
            Authentication: `${process.env.trustVerificationKey}`,
            },
          });
          res.status(200).json(data)
    
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