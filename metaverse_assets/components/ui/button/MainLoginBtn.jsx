import { useRouter } from 'next/router'
import Button from './Button'
import { BiUserCircle } from 'react-icons/bi'
import styled from 'styled-components'
function MainLoginBtn() {
    const { push } = useRouter()
    return (
        <MainLoginBtnWrapper>
            <Button onClick={() => push('/login')} width={150}>
                <BiUserCircle fontSize={20} />
                <span>login</span>
            </Button>
        </MainLoginBtnWrapper>
    )
}

const MainLoginBtnWrapper = styled.div`
    @media (max-width: 990px) {
        display: none;
    }
`

export default MainLoginBtn
