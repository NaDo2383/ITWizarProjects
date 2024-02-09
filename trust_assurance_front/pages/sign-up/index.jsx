import { PopupProvider } from "@/common/popup/usePopupCtx"
import Layout from "@/components/layout/Layout"
import Form from "@/components/ui/form/Form"
import SignupForm from "@/features/user/form/SignupForm"
export default function Home() {

    return (
        <PopupProvider>
            {/* <Layout headerStyle={1} footerStyle={1}> */}
                <div className="tf-section-2 pt-60 widget-box-icon">
                    <div className="themesflat-container w920">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="heading-section-1">
                                    <h2 className="tf-title pb-16">회원가입</h2>
                                </div>
                            </div>
                            <Form>
                                <SignupForm />
                            </Form>
                        </div>
                    </div>
                </div>
            {/* </Layout> */}
        </PopupProvider>
    )
}