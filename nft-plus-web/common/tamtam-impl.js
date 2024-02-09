import Web3 from 'web3';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { default as BN } from 'bn.js';
import { default as contractMetadata } from './abi.tamtam.json';

export async function tamtamContract(web3, address) {
    return new web3.eth.Contract(contractMetadata.abi, address);
}

export async function mintFee(contract) {
    return contract.methods.mintFee().call().then((str) => new BN(str));
}

export async function mintToken(
    contract,
    tokenOwner,
    workId,
    royalty,
    royaltyReceiver,
    uri,
    fee
) {
    const promise = contract.methods.mint(tokenOwner, workId, royalty, royaltyReceiver, uri)
        .send({ from: tokenOwner, value: fee.toString() });
        
    return new Promise((resolve, reject) => {
        promise.on('receipt', (receipt) => {
            if (receipt.events) {
                resolve(receipt.events.Transfer.returnValues.tokenId);
            } else {
                reject(new Error('this path assumed impossible'));
            }
        });
        promise.on('error', (error) => reject(error));
    });
}