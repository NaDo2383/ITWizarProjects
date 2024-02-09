import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { readFileSync } from "fs";

export const config = {
	api: {
		bodyParser: false
	}
};

const readFile = (req, saveLocally) => {
	const options = {};
	if (saveLocally) {
		options.uploadDir = path.join(process.env.UPLOAD_PATH);
		options.filename = (name, ext, path, form) => {
			return Date.now().toString() + "_" + path.originalFilename;
		};
	}
	options.maxFileSize = 7000 * 1024 * 1024;
	const form = formidable(options);
	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) reject(err);
			resolve({ fields, files });
		});
	});
};

const handler = async (req, res) => {
	try {
		await fs.readdir(path.join(process.env.UPLOAD_PATH));
	} catch (error) {
		fs.mkdir(process.env.UPLOAD_PATH, { recursive: true });
	}

	try {
		let data = await readFile(req, true);
		const file = data.files.file;
		const isVideo = file?.mimetype.includes("video/");
		const url = isVideo ? "videoslice" : "audioslice";
		const fetchOption = {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({newPath : file.newFilename})
		}
	
		const result = await fetch(`${process.env.MULTIMEDIA_FILE_NORMALIZER_SERVICE_HOST}/${url}`, fetchOption);
		const response = await result.json();
		const outputFile = response.data;
		const gifData = await readFileSync(`${process.env.UPLOAD_PATH}/${outputFile}`);
		
		res.setHeader("Content-Type", isVideo ? "video/mp4" : "audio/mp3");
		if(isVideo){
			res.send(
				"data:video/mp4;base64," + Buffer.from(gifData).toString("base64")
			);
		} else {
			res.send(
				"data:audio/mp3;base64," + Buffer.from(gifData).toString("base64")
			);
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({ message : 'failed'})
	}
};

export default handler;
