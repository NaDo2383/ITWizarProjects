// const formidable = require("formidable");
// const path = require("path");
import formidable from "formidable"
import path from "path"
import { readFileSync } from "fs"
import axios from "axios"
export const config = {
    api: {
        bodyParser: false,
    },
}

function uploadFile(req, saveLocally) {
    const options = {}
    if (saveLocally) {
        options.uploadDir = path.join(process.env.UPLOAD_PATH)
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename
        }
    }
    options.maxFileSize = 7000 * 1024 * 1024
    const form = formidable(options)
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })
        })
    })
}

// function getDataFromStream(url) {
//     return axios({
//         url: url,
//         method: 'GET',
//         onDownloadProgress: progressEvent => {
//            const dataChunk = progressEvent.currentTarget.response;
//            console.log("CHUNK: " + dataChunk);
//            // dataChunk contains the data that have been obtained so far (the whole data so far)..
//            // So here we do whatever we want with this partial data..
//            // In my case I'm storing that on a redux store that is used to
//            // render a table, so now, table rows are rendered as soon as
//            // they are obtained from the endpoint.
//         }
//     }).then(({ data }) => Promise.resolve(data));
// }

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const handler = async (req, res) => {
    try {
        const data = await uploadFile(req, true)
        console.log(data)
        const file = data?.files?.mediaFile[0]
        const fileName = file?.newFilename
        const description = data?.fields?.description[0]
        const mediaName = data?.fields?.name[0]

        if (file?.mimetype.includes("image/")) {
            const ipFsOptions = {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    path: fileName,
                    name: mediaName,
                    description: description,
                }),
            }

            const ipFsRes = await fetch(
                `http://${process.env.IPFS_API}/ipfs`,
                ipFsOptions
            )
            const result = await ipFsRes.json()
            const metadataUrl = result.url.replace("ipfs://", "https://ipfs.io/ipfs/")
            let attempt = 0
            let imageUrl = null
            while (attempt < 5) {
                try {
                    await sleep(1000 * 30)
                    const { data } = await axios.get(metadataUrl.trim())
                    imageUrl = data.image.replace("ipfs://", "https://ipfs.io/ipfs/")
                    break
                } catch (ex) {
                    console.log("exception: ", JSON.stringify(ex))
                }
                attempt += 1
            }
            const result2 = {
                ...result,
                image: imageUrl,
            }

            res.status(200).json({
                message: "successfully uploaded file",
                ipfs: result2 || null,
            })
        } else {
            const isVideo = file?.mimetype.includes("video/")
            const url = isVideo ? "videoslice" : "audioslice"

            const ipFsOptions = {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    path: fileName,
                    name: mediaName,
                    description: description,
                }),
            }

            const ipFsRes = await fetch(
                `http://${process.env.IPFS_API}/ipfs`,
                ipFsOptions
            )
            const result = await ipFsRes.json()

            const fileNormalizerOptions = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newPath: fileName }),
            }

            const fileNormalizerResult = await fetch(
                `http://${process.env.MULTIMEDIA_FILE_NORMALIZER_SERVICE_HOST}/${url}`,
                fileNormalizerOptions
            )

            const fileNormalizerRes = await fileNormalizerResult.json()
            const outputFile = fileNormalizerRes.data
            const gifData = await readFileSync(`${process.env.UPLOAD_PATH}/${outputFile}`)

            res.setHeader("Content-Type", isVideo ? "video/mp4" : "audio/mp3")
            if (isVideo) {
                res.status(200).json({
                    message: "successfully uploaded file",
                    ipfs: result || null,
                    data:
                        "data:video/mp4;base64," +
                        Buffer.from(gifData).toString("base64"),
                })
            } else {
                res.status(200).json({
                    message: "successfully uploaded file",
                    ipfs: result || null,
                    data:
                        "data:audio/mp3;base64," +
                        Buffer.from(gifData).toString("base64"),
                })
            }
        }
    } catch (err) {
        res.status(500).json({ message: "failed" })
    }
}

export default handler
