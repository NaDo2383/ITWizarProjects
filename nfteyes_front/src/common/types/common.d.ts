declare type JsxChildren = {
    children: JSX.Element[] | JSX.Element | React.ReactNode | string
}

declare type TMENU = {
    text: string
    href: string
}

declare type TButton = {
    onClick: (e?: any) => any
    text?: string
    isActive?: boolean
    disabled?: boolean
}

declare type TFormElement = {
    id?: string
    name: string
    placeholder?: string
    required?: boolean
    value?: string
    className?: string
    disabled?: boolean
    onChange?: (e: any, isCheckbox?: boolean) => void
    onClick?: () => void
}

declare type TError = {
    response: {
        status: number
    }
}

declare type TShape = {
    width: number
    height: number
}

declare type TCrud = {
    type: 'ADD' | 'DELETE' | 'EDIT' | 'GET'
}

declare type TPaginatedState<T> = {
    result: T
    success?: boolean
    pagination?: IPaginate
}

declare interface Window {
    ethereum?: any
}

declare type TScroll = {
    scrollWidth: number
    scrollHeight: number
}
