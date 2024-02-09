import { useGlobalCtx } from "@/common/global/useGlobalCtx"
import { PopupProvider } from "@/common/popup/usePopupCtx"
import Layout from "@/components/layout/Layout"
import Form from "@/components/ui/form/Form"
import LoginForm from "@/features/user/form/LoginForm"
import { useRouter } from "next/navigation"
export default function Login() {
    const { push } = useRouter()
    const { authState } = useGlobalCtx()

    if(authState) {
        push('/')
        return null
    }
    return (
        <div className="tf-section-2 pt-60 widget-box-icon">
            <div className="themesflat-container w920">
                <div className="row">
                    <Form>
                        <LoginForm />
                     </Form>
                </div>
            </div>
        </div>
    )
}