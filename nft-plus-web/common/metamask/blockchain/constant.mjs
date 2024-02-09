export { default as abi } from "./TamtamAuctionTrader.abi";
export { default as licenseAbi } from "./TamtamLicense.abi.js";
export { default as eyesAbi } from "./eyes.abi.js";
export { default as adminAbi } from "./Tamtam.abi.js";
export { default as etdAbi } from "./abi.etd.js";
export { default as EYESTokenAbi } from "./EYESToken.abi.js";
export { default as TamtamEyesTraderAbi } from "./TamtamEyesAuctionTrader.abi.js";
// matic address
export const contractAddress = process.env.contractAddress;

// eyes address
export const eyesContractAddress = process.env.eyesContractAddress;

// main contract address
export const tamtamNftAddress = process.env.tamtamNftAddress;

// tamtam wallet
export const adminAddress = process.env.adminAddress;

// tamtam license address
export const tamtamAddress = process.env.tamtamAddress;

// ETD address s
export const etdAddress = process.env.etdAddress;

// EyesTrader
export const tamtamEyesTrader = process.env.tamtamEyesTrader;

// EYES TOKEN
export const eyesToken = process.env.eyesToken;
