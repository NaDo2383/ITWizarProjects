const requestIp = require('request-ip');
import NextCors from "nextjs-cors";

export default async function getIp(req, res) {
    try {
        await NextCors(req, res, {
            methods: ["GET"],
            origin: "*",
            optionsSuccessStatus: 200,
        });
        const detectedIp = requestIp.getClientIp(req);
        res.status(200).json({
            ip: detectedIp.split("f:")[1]
        });
    } catch (err) {
        res.status(500).json({
            message: "failed"
        })
    }
}