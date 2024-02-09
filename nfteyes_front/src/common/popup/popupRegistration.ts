import dynamic from 'next/dynamic'
const TodoInfoPopup = dynamic(() => import('features/todo/popup/TodoInfoPopup'))
const UserInfoPopup = dynamic(() => import('features/user/popups/UserInfoPopup'))

export const POPUP_TYPES = {
    TODO_INFO: 'TODO_INFO',
    USER_INFO: 'USER_INFO',
}
export type POPUP_TYPE = (typeof POPUP_TYPES)[keyof typeof POPUP_TYPES]
export type POPUP_COMPONENTS_TYPE = { [key in POPUP_TYPE]: React.ComponentType<any> }

export const POPUP_COMPONENTS: POPUP_COMPONENTS_TYPE = {
    [POPUP_TYPES.TODO_INFO]: TodoInfoPopup,
    [POPUP_TYPES.USER_INFO]: UserInfoPopup,
}
