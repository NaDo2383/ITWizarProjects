import { PopupProvider } from '@/common/popup/usePopupCtx'
import Form from '@/components/ui/form/Form'
import LogoIcon from '@/components/ui/icon/LogoIcon'
import RecoverPasswordForm from '@/features/user/form/RecoverPasswordForm'
import ResetPasswordForm from '@/features/user/form/ResetPasswordForm'
import React from 'react'

function RecoverPage() {
  return (
    <PopupProvider>
      <div id="wrapper">
          <div id="page">
              <div className="section-single-page coming-soon">
                  {/* <LogoIcon />  */}
                  <Form>
                      <RecoverPasswordForm />
                  </Form>
              </div>
          </div>
      </div>
    </PopupProvider>
  )
}

export default RecoverPage