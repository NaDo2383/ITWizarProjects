import React from 'react'
import LogoIcon from '@/components/ui/icon/LogoIcon'
import ResetPasswordForm from '@/features/user/form/ResetPasswordForm'
import styled from 'styled-components'
import Form from '@/components/ui/form/Form'
import { PopupProvider } from '@/common/popup/usePopupCtx'
function ResetPassword() {
  return (
    <PopupProvider>
      <ResetPasswordWrapper>
              <div id="wrapper">
                  <div id="page">
                      <div className="section-single-page coming-soon">
                          <Form>
                              <ResetPasswordForm />
                          </Form>
                      </div>
                  </div>
              </div>
      </ResetPasswordWrapper>
    </PopupProvider>
  )
}

const ResetPasswordWrapper = styled.div`
  
`
export default ResetPassword