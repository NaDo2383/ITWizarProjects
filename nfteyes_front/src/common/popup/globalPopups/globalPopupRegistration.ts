import dynamic from 'next/dynamic'
const AlertPopup = dynamic(() => import('./choices/AlertPopup'))
const DecisionPopup = dynamic(() => import('./choices/DecisionPopup'))
const InfoPopup = dynamic(() => import('./choices/InfoPopup'))
const AnalyzePopup = dynamic(() => import('./choices/AnalyzePopup'))
const LoginPopup = dynamic(() => import('common/auth/jwt/popups/ExampleLoginPopup'))

export const GLOBAL_POPUP_TYPES = {
    ALERT: 'ALERT',
    DECISION: 'DECISION',
    INFO: 'INFO',
    LOGIN: 'LOGIN',
    ANALYZE: 'ANALYZE',
}
export type GLOBAL_POPUP_TYPE = (typeof GLOBAL_POPUP_TYPES)[keyof typeof GLOBAL_POPUP_TYPES]
export type GLOBAL_POPUP_COMPONENTS_TYPE = { [key in GLOBAL_POPUP_TYPE]: React.ComponentType<any> }

export const GLOBAL_POPUP_COMPONENTS: GLOBAL_POPUP_COMPONENTS_TYPE = {
    [GLOBAL_POPUP_TYPES.ALERT]: AlertPopup,
    [GLOBAL_POPUP_TYPES.DECISION]: DecisionPopup,
    [GLOBAL_POPUP_TYPES.INFO]: InfoPopup,
    [GLOBAL_POPUP_TYPES.LOGIN]: LoginPopup,
    [GLOBAL_POPUP_TYPES.ANALYZE]: AnalyzePopup,
}
