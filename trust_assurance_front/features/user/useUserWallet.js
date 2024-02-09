import { useCrud } from "@/common/axios/useCrud"

function useUserWallet() {
    const { postData } = useCrud()

    async function checkWallet(payload) { 
        try {
            const res = await postData('/user/wallet/check', {
                walletAddress: payload
            } )
            return res
        } catch(err) { 
            console.error(err)
        }
    } 

    async function getWalletAddress(payload) {
        try {
            const res = await postData('/user/wallet/get/address', payload)
        } catch(err) { 
            console.error(err)
        }
    }

    async function updateWalletAddress(payload) {
        try {
            const res = await postData('/user/wallet/update/address', payload)
            return res
        } catch(err) { 
            console.error(err)
        }
    } 
    return {
        updateWalletAddress,
        getWalletAddress,
        checkWallet,
    }
}

export default useUserWallet