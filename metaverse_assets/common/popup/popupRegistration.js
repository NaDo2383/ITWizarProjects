import dynamic from 'next/dynamic'

const LicenseAgreementPopup = dynamic(() =>
    import('features/asset/popup/LicenseAgreementPopup')
)
const AssetCheckUserPopup = dynamic(() =>
    import('features/asset/popup/AssetCheckUserPopup')
)
const ReportPopup = dynamic(() => import('features/asset/popup/ReportPopup'))

export const POPUP_TYPES = {
    LICENSE_AGREEMENT: 'LICENSE_AGREEMENT',
    ASSET_CHECK_USER: 'ASSET_CHECK_USER',
    REPORT_ASSET: 'ReportPopup',
}

export const POPUP_COMPONENTS = {
    [POPUP_TYPES.LICENSE_AGREEMENT]: LicenseAgreementPopup,
    [POPUP_TYPES.ASSET_CHECK_USER]: AssetCheckUserPopup,
    [POPUP_TYPES.REPORT_ASSET]: ReportPopup,
}
