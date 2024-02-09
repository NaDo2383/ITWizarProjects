// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { uploadNft } from "common/metamask/blockchain/nft-storage.mjs";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
    const {path, name, description} = req.body;
    try {
        await NextCors(req, res, {
            methods: ["POST"],
            origin: "*",
            optionsSuccessStatus: 200,
        });
        const ipfs = await uploadNft(path, name, description, null);
        res.status(200).json(ipfs);
    } catch (error) {
        res.status(400).json({
            message: error.message || "fails",
        });
    }
}
