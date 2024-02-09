import dynamic from 'next/dynamic'

const LicensePurchasingPopup = dynamic(()=> import('../../features/artwork/popups/LicensePurchasingPopup'))
const SelectMediaNFTRegistrationPopup = dynamic(() => import('../../features/artwork/popups/SelectMediaNFTRegistrationPopup'))
const CreateNewNFTPopup = dynamic(() => import('../../features/artwork/popups/CreateNewNFTPopup'))
const TermsOfUsePopup = dynamic(()=> import('../../features/artwork/popups/TermsOfUsePopup'))
const NFTConsignmentPopup = dynamic(()=> import('../../features/artwork/popups/NFTConsignmentPopup'))
const ConsignmentPopup = dynamic(()=> import('../../features/artwork/popups/ConsignmentPopup'))
const LicenseMintPopup = dynamic(()=> import('../../features/artwork/popups/LicenseMintPopup'))
const RegisterTicketSalesPopup = dynamic(()=> import('../../features/artwork/popups/RegisterTicketSalesPopup'));
const WalletListPopup = dynamic(()=> import('features/user/popups/WalletListPopup'));
const ShowMedia = dynamic(()=> import('../../features/artwork/popups/ShowMedia'));

export const POPUP_TYPES = {
    USER_INFO: 'USER_INFO',
    LOGIN: 'LOGIN',
    LICENSEPURCHASE: 'LicensePurchasingPopup',
    SELECT_NFT_REGISTER_METHOD: 'SelectMediaNFTRegistrationPopup',    
    CREATE_NEW_NFT: 'CreateNewNFT',    
    SELECT_NFT_REGISTER_METHOD: 'SelectMediaNFTRegistration',    
    TERMS_USE: 'TermsOfUse',
    NFT_CONSIGNMENT: 'NFTConsignment',
    CONSIGNMENT:"ConsignmentPopup",
    LICENSE_MINT:"LicenseMintPopup",
    REGISTER_TICKET_SALES:"RegisterTicketSalesPopup",
    WALLET_LIST: "WalletListPopup",
    SHOW_MEDIA: 'ShowMedia'
}

export const POPUP_COMPONENTS = {
    [POPUP_TYPES.LICENSEPURCHASE]: LicensePurchasingPopup,
    [POPUP_TYPES.SELECT_NFT_REGISTER_METHOD]: SelectMediaNFTRegistrationPopup,
    [POPUP_TYPES.CREATE_NEW_NFT]: CreateNewNFTPopup,
    [POPUP_TYPES.TERMS_USE]: TermsOfUsePopup,
    [POPUP_TYPES.NFT_CONSIGNMENT]: NFTConsignmentPopup,
    [POPUP_TYPES.CONSIGNMENT]: ConsignmentPopup,
    [POPUP_TYPES.LICENSE_MINT]: LicenseMintPopup,
    [POPUP_TYPES.REGISTER_TICKET_SALES]: RegisterTicketSalesPopup,
    [POPUP_TYPES.WALLET_LIST]: WalletListPopup,
    [POPUP_TYPES.SHOW_MEDIA]: ShowMedia,
}
