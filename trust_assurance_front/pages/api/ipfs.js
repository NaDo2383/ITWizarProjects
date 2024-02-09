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

function uploadFile(req) {
    const form = formidable()
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })
        })
    })
}

const handler = async (req, res) => {
    // console.log("req body: ", req)
    const data = await uploadFile(req)
    const { name, description } = data.fields
    const { mediaFile } = data.files
    try {
        const formData = new FormData()
        // const headers = {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk2MEEzNTgzNzkzMTdkM0QwQzU0NUZBQzc5MkZDRWE1M2Y1N2RlNTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NzY4NDkxNDkwNiwibmFtZSI6Im5hZG8ifQ.WJmuwiUipA1szODrfBf4b8qnfUOVTLPifHQMGrYN9-k`,
        // }

        formData.append("name", name[0])
        formData.append("image", mediaFile[0]) // number 123456 is immediately converted to a string "123456"
        formData.append("description", description[0]) // number 123456 is immediately converted to a string "123456"
        // const fileUploadRes = await axios.post("https://api.nft.storage/store", formData,

        // ?})

        const { data } = await axios.post("https://api.nft.storage/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk2MEEzNTgzNzkzMTdkM0QwQzU0NUZBQzc5MkZDRWE1M2Y1N2RlNTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NzY4NDkxNDkwNiwibmFtZSI6Im5hZG8ifQ.WJmuwiUipA1szODrfBf4b8qnfUOVTLPifHQMGrYN9-k`,
            },
        })

        return res.status(200).json({ cid: data.value.cid })
    } catch (err) {
        res.status(500).json({ message: "failed" })
    }
}

export default handler
