// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File, toGatewayURL } from 'nft.storage'

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from 'mime'

// The 'fs' builtin module on Node.js provides access to the file system
import fs from 'fs'

// The 'path' module provides helpers for manipulating filesystem paths
import path from 'path'

import axios from 'axios'

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM3OTRERDdjNDBkRkFCYTc1NDc1Q0QyMEI4OGFmNmMyOTFEODczMDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTUzNzQwOTEwMCwibmFtZSI6InRlc3RrZXkifQ.97viaQ9xskd2cP2ZJOJ5bMn8BHMUp27nWZD4l1PGr2E'

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
async function storeNFT(imagePath, name, description) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    })
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath);
    const type = mime.getType(filePath)
    // return new File([content], path.basename(filePath), { type })
}


/**
 * The main entry point for the script that checks the command line arguments and
 * calls storeNFT.
 * 
 * To simplify the example, we don't do any fancy command line parsing. Just three
 * positional arguments for imagePath, name, and description
 */
export async function main(imagePath , name , description) {
    // const args = process.argv.slice(2);
    // if (args.length !== 3) {
    //     console.error(`usage: ${url} ${"dummy"} <image-path> <name> <description>`)
    //     process.exit(1)
    // }

    // const [imagePath, name, description] = args
    // const result = await storeNFT(imagePath, name, description)

    fileFromPath(imagePath)
}

// Don't forget to actually call the main function!
// We can't `await` things at the top level, so this adds
// a .catch() to grab any errors and print them to the console.
// main("C:/Users/User/Downloads/Avengers-Endgame.jpg" , "test" , "test")
//   .catch(err => {
//       console.error(err)
//       process.exit(1)
//   })

// fetch('ipfs://bafyreia5esdxnptjeeorcfyzbabkmqidv7ey3c4efhwbd4l6n7zb7ogcqm/metadata.json')
//     .then(res => res.json())

// const data = await axios.get("ipfs://bafyreia5esdxnptjeeorcfyzbabkmqidv7ey3c4efhwbd4l6n7zb7ogcqm/metadata.json");

/**
 * Token {
  ipnft: 'bafyreia5esdxnptjeeorcfyzbabkmqidv7ey3c4efhwbd4l6n7zb7ogcqm',
  url: 'ipfs://bafyreia5esdxnptjeeorcfyzbabkmqidv7ey3c4efhwbd4l6n7zb7ogcqm/metadata.json'
}
 */