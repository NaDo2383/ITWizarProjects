/**
 * @createdBy Phill Anderson 2022/02/27
 */
import useAlertTranslation from 'locale/useAlertTranslation';
import useCommonTranslation from 'locale/useCommonTranslation';

function useMessageFactory() {
    const { loginCredentialErrorI18, networkErrorI18, nerrorI18 }  = useCommonTranslation()
    const { walletBalanceLowI18 } = useAlertTranslation()
    const calcMessage = (statusCode) => {
        switch(statusCode) {
            case 400:  return { code: statusCode, msg: nerrorI18}; 
            case 401: return { code: statusCode, msg: nerrorI18}; 
            case 404: return { code: statusCode, msg: nerrorI18 };
            case 405: return { code: statusCode, msg:loginCredentialErrorI18 }; 
            case 500: return { code: statusCode, msg: networkErrorI18};
            default: return { code: statusCode, msg: nerrorI18}
        }
    }

    const calcMetamaskMessage = (error) => {
        if(error.data) {
            console.error( 'metamask error: ', error.data )
            if(error.data.message.includes("insufficient funds")) {
                return walletBalanceLowI18
            }
            return 'failed'
        }
        if(error.message === "MetaMask Tx Signature: User denied transaction signature.") {
            return 'cancelled'
        }
        return 'failed'
    }
  return { calcMessage, calcMetamaskMessage }
}
export default useMessageFactory
