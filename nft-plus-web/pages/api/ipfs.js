// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { uploadNft } from "common/metamask/blockchain/nft-storage.mjs";
import NextCors from "nextjs-cors";

export default async function ipfs(req, res) {
	const { works } = req.body;
	const datas = [];
	try {
		await NextCors(req, res, {
			methods: ["POST"],
			origin: "*",
			optionsSuccessStatus: 200
		});

		await Promise.all(
			works.map(async (work) => {
				const { url } = await uploadNft(
					work.path,
					work.name,
					work.description,
					work.properties
				);
				datas.push({ id: work.id, ipfs: url });
			})
		);

		res.status(200).json(datas);
	} catch (error) {
		res.status(400).json({
			message: error.message || "fails"
		});
	}
}
