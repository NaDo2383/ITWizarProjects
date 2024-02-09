import { ethers } from 'ethers'

const provider = typeof window !== 'undefined' && ( window.ethereum && new ethers.providers.Web3Provider(window.ethereum))

export { ethers, provider }