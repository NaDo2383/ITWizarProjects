import dynamic from 'next/dynamic'
const AlertPopup = dynamic(() => import('./choices/AlertPopup'))
const DecisionPopup = dynamic(() => import('./choices/DecisionPopup'))
const InfoPopup = dynamic(() => import('./choices/InfoPopup'))
const ChangeNetworkPopup = dynamic(() => import('common/web3/popups/ChangeNetworkPopup'))

export const GLOBAL_POPUP_TYPES = {
    ALERT: 'ALERT',
    DECISION: 'DECISION',
    INFO: 'INFO',
    CHANGE_NETWORK: 'CHANGE_NETWORK',
}

export const GLOBAL_POPUP_COMPONENTS = {
    [GLOBAL_POPUP_TYPES.ALERT]: AlertPopup,
    [GLOBAL_POPUP_TYPES.DECISION]: DecisionPopup,
    [GLOBAL_POPUP_TYPES.INFO]: InfoPopup,
    [GLOBAL_POPUP_TYPES.CHANGE_NETWORK]: ChangeNetworkPopup,
}
