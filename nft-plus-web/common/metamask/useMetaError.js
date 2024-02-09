import useAlertTranslation from 'locale/useAlertTranslation'

function useMetaErrorFactory() {
     const { registerYourWalletI18 } = useAlertTranslation()   
    async function calcWalletError(errMessage) {
        switch(errMessage) {
            case 'notFound': {
                alert()
            }
            default: {
                return
            }
        }
    }
    
    return {
        calcWalletError
    }
}

export default useMetaErrorFactory