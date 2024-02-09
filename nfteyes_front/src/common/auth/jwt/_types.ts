export type TLoggedUser = {
    id?: number
    username?: string
    nickname?: string
    token: string | null
    role?: string
}

export type TLoginUserForm = {
    email: string
    password: string
}
