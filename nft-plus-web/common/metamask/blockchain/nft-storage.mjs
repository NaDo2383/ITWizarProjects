// Import the NFTStorage class and File constructor from the 'nft.storage' package
import {NFTStorage, File} from "nft.storage";
import {fileTypeFromBuffer} from "file-type";
import path from "path";
import axios from "axios";
// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
async function storeNFT(imagePath, name, description, properties = null) {
    // load the file from disk
    const image = await fileFromPath(imagePath);

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({token: NFT_STORAGE_KEY});

    // call client.store, passing in the image & metadata
    const data = {
        image,
        name,
        description
    }
    if(properties){
        data.properties = properties;
    }
    return nftstorage.store(data);
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath) {
    const response = await axios.get(filePath, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");
    const type = await fileTypeFromBuffer(buffer);
    return new File([buffer], path.basename(filePath), {type: type.mime});
};


export async function uploadNft(imagePath, name, description, properties) {
    const result = await storeNFT(imagePath, name, description, properties);
    return result;
};

// uploadNft("https://vabsaga.com/wp-content/uploads/2022/03/Marvels-Avengers-postpones-new-update.png", "avengers", "ansemble")