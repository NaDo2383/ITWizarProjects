// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios')
export default function handler(req, res) {
    // const generatedPayload = JSON.parse(req.body.data)
    axios
        .get('http://180.210.82.249:3000/api/asset/vnv/verifyVP/', {
            data: { VP: JSON.parse(req.body.data) },
        })
        .then((data) => {
            res.status(200).json(data.data)
        })
        .catch((e) => {
            console.error('aldaa:', e)
            res.status(500).json({ message: 'internal server error' })
        })
}
