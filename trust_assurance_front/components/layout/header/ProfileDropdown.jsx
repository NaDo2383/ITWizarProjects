import Dropdown from '@/components/ui/dropdown/Dropdown'
import useJwtAuth from '@/features/user/auth/useJwtAuth'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
function ProfileDropdown(props) {
    const { isShow, setIsShowProfileDropdown } = props
    const { logoutUser } = useJwtAuth()
    const { push } = useRouter()

    const handleProfile = useCallback(() => {
        setIsShowProfileDropdown(false)
        push('/my-page')
    }, [])

    const handleLogout = useCallback(() => {
        setIsShowProfileDropdown(false)
        logoutUser()
        push("/")
    }, [])

    return (
        <Dropdown isShow={isShow}>
            <Ul>
                <Li onClick={handleProfile}>프로필</Li>
                <Li onClick={handleLogout}>로그아웃</Li>
            </Ul>
        </Dropdown>
    )
}

const Ul = styled.ul`
    display:flex;
    flex-direction:column;
    gap: 10px;
    padding: 10px;
    background: #232323;
    font-size: 16px;
    border-radius: 15px;
`
const Li = styled.li`
    cursor: pointer;
`


export default ProfileDropdown