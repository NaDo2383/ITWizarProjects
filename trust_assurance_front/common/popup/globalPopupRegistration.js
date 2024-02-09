import dynamic from "next/dynamic"
const AlertPopup = dynamic(() => import("./globalPopups/AlertPopup"))
const DecisionPopup = dynamic(() => import("./globalPopups/DecisionPopup"))
const InfoPopup = dynamic(() => import("./globalPopups/InfoPopup"))
const VerficationComplete = dynamic(() =>
    import("./globalPopups/VerificationSuccessPopup")
)

export const GLOBAL_POPUP_TYPES = {
    ALERT: "ALERT",
    DECISION: "DECISION",
    INFO: "INFO",
    VERIFICATION_COMPLETE: "VerficationComplete",
}

export const GLOBAL_POPUP_COMPONENTS = {
    [GLOBAL_POPUP_TYPES.ALERT]: AlertPopup,
    [GLOBAL_POPUP_TYPES.DECISION]: DecisionPopup,
    [GLOBAL_POPUP_TYPES.INFO]: InfoPopup,
    [GLOBAL_POPUP_TYPES.VERIFICATION_COMPLETE]: VerficationComplete,
}
