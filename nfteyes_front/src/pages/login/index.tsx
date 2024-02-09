import NextHead from 'common/seo/NextHead'
import Form from 'components/ui/form/Form'
import LoginForm from 'features/user/form/LoginForm'
import { SmallWrapper } from 'components/ui/containers/Wrapper'

function LoginPage() {
    // useEffect(() => {
    //     for (const key in CookieName) {
    //         removeCookie(CookieName[key])
    //     }
    // }, [])
    return (
        <>
            <NextHead title="Login || Nft Eyes" />
            <section className="relative h-screen">
                <SmallWrapper className="pt-220">
                    <h1 className="text-center pb-50">Sign In</h1>
                    <Form>
                        <LoginForm />
                    </Form>
                </SmallWrapper>
            </section>
        </>
    )
}

export default LoginPage
