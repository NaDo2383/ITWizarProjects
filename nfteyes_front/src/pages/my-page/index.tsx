import Form from 'components/ui/form/Form'
import { SmallWrapper } from 'components/ui/containers/Wrapper'
import AccountSettingForm from '../../features/user/form/AccountSettingForm'
import ProtectedPage from 'common/auth/jwt/ProtectedPage'

function MyPage() {
    // useEffect(() => {
    //     for (const key in CookieName) {
    //         removeCookie(CookieName[key])
    //     }
    // }, [])
    return (
        <ProtectedPage>
            <section className="relative">
                <SmallWrapper className="mt-[80px] mb-[110px]">
                    <h1 className="text-center">Account Setting</h1>
                    <Form>
                        <AccountSettingForm />
                    </Form>
                </SmallWrapper>
            </section>
        </ProtectedPage>
    )
}

export default MyPage
