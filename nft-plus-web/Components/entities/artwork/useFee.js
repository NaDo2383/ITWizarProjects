/**
 * @createdBy Phill Anderson 2022/3/2
 */
import useCrud from 'common/axios/crud'
import { useState } from 'react'
import { apis } from 'utils/libs'
import useMetaNetwork from 'common/metamask/useMetaNetwork'
import usePopup from 'Components/ui/popup/usePopup'
import useMintEyes from 'common/metamask/eyes/useMintEyes'
import useMintMatic from 'common/metamask/matic/useMintMatic'
import useTradeEyes from 'common/metamask/eyes/useTradeEyes'
import useTradeMatic from 'common/metamask/matic/useTradeMatic'
import useCurrency from 'common/metamask/useCurrency'

function useFee() {
    const { getModel } = useCrud()
    const [ feeObject , setFeeObject ] = useState({
        feeDetail : null,
        feeList: []
    })
    const { getNetwork } = useMetaNetwork();
    const { getMintFeeEyes } = useMintEyes();
    const { getMintFeeMatic } = useMintMatic();
    const { getEyesLicenseFeeRate, getEyesResaleFeeRate, getEyesSaleFeeRate } = useTradeEyes();
    const { getMaticLicenseFeeRate, getMaticResaleFeeRate, getMaticSaleFeeRate } = useTradeMatic();
    const {  toEthers } = useCurrency();
    const {
		MODAL_TYPES,
        globalModalState,
        handleShowModal,
	} = usePopup();

    async function getAllFees(currency) {
        try { 
            const res = await getModel(apis.fees + `?currency=${currency}`)
            setFeeObject( (prev) => ({ ...prev, feeList: res?.result }))
            return res?.result
        } catch(e) {
            const msg = calcMessage(e?.response.status)
            return msg
        }
    }

    async function getFee(name, currency, callback=null){
        const chainId =
        currency === "EYES"
            ? process.env.ETH_CHAIN_ID
            : process.env.MATIC_CHAIN_ID;
        const currentNetworkId = await getNetwork();
        if (chainId !== currentNetworkId) {
            const modalType = chainId === process.env.ETH_CHAIN_ID ? MODAL_TYPES.SWITCHETHERIUMNET : MODAL_TYPES.SWITCHMAINNET;
            globalModalState?.showSwitchNetworkModal ? globalModalState?.showSwitchNetworkModal(modalType) : handleShowModal(modalType, { callback  });
            return { failure : 'switchnetwork' };
        }
        
        if (currentNetworkId === "메타마스크를 설치해주세요.") {
            return { failure : 'plsInstallMetamaskInBrowserI18' };
        }
        let res;
        if(name === 'ARTWORK_REGISTRATION'){
            if(currency === "EYES"){
                const {result, failure} =  await getMintFeeEyes();
                if(failure){
                    return { failure }
                }
                res = toEthers(result._hex);
            } else {
                const {result, failure} =  await getMintFeeMatic();
                if(failure){
                    return { failure }
                }
                res = toEthers(result._hex);
            }
        } else  if(name === 'LICENSE_ISSUANCE'){
            if(currency === "EYES"){
                const {result, failure} =  await getEyesLicenseFeeRate();
                if(failure){
                    return { failure }
                }
                res = result._hex / 10;
            } else {
                const {result, failure} =  await getMaticLicenseFeeRate();
                if(failure){
                    return { failure }
                }
                res = result._hex / 10;
            }
        }  else  if(name === 'SALE'){
            if(currency === "EYES"){
                const {result, failure} =  await getEyesSaleFeeRate();
                if(failure){
                    return { failure }
                }
                res = result / 10;
            } else {
                const {result, failure} =  await getMaticSaleFeeRate();
                if(failure){
                    return { failure }
                }
                res = result / 10;
            }
        }  else  if(name === 'RESALE'){
            if(currency === "EYES"){
                const {result, failure} =  await getEyesResaleFeeRate();
                if(failure){
                    return { failure }
                }
                res = result / 10;
            } else {
                const {result, failure} =  await getMaticResaleFeeRate();
                if(failure){
                    return { failure }
                }
                res = result / 10;
            }
        }
        return { result : res }
    }; 
  
    return {
        getAllFees, 
        getFee, 
        feeObject
    }
}

export default useFee